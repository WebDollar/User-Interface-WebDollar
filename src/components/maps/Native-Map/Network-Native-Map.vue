<template>

    <div>
        <NetworkNativeMapCanvas />
        <NetworkNativeMapDialog ref="refDialog" />
    </div>

</template>

<script>

    import CircleMap from "./helpers/Circle-Map";
    import Circles from "./helpers/Circles";
    import MapsTester from "./../Maps.tester";


    import NetworkNativeMapCanvas from "./res/Network-Native-Map-Canvas.vue"
    import NetworkNativeMapDialog from "./res/dialog/Network-Native-Map-Dialog.vue"
    const uuid = require('uuid');

    export default{

        components:{

            "NetworkNativeMapCanvas": NetworkNativeMapCanvas,
            "NetworkNativeMapDialog": NetworkNativeMapDialog,

        },

        mounted() {

            if (typeof window === "undefined") return;

            this._nodes = [];
            this._links = [];

            this._connections = [];
            this._selfNode= null;
            this._currentPool = {};
            this._waitListIndex = 0;

            this._currentCenter = null;
            this._waitingForPoolOwner = true;

            this.createMap();

        },

        methods:{

            _createTestConnectionsManual(){
                let cell1 = this._circleMap.getCellByLocation(66.160507,  -153.369141);
                let cell2 = this._circleMap.getCellByLocation(73.500823,  -21.755973);
                let cell3 = this._circleMap.getCellByLocation(-28.083,  23.044);
                let cell4 = this._circleMap.getCellByLocation(-20.72,  127.10);

                let data = {
                    status: status,
                    city: "Bucharest",
                    country: "RO",
                    protocol: "peer",
                    addr: "76.44.22.11"
                };

                this._circleMap.addLink(cell1, cell2);
                this._circleMap.addLink(cell2, cell3);
                this._circleMap.addLink(cell3, cell4);

                this._circleMap.highlightCell(cell1, "peer-connected-browser", data, 1);
                this._circleMap.highlightCell(cell2, "peer-connected-terminal", data, 2);
                this._circleMap.highlightCell(cell3, "peer-network-member", data, 3);
                this._circleMap.highlightCell(cell4, "peer-network-member", data, 4);
            },

            createMap(){

                if (typeof window === 'undefined') return;

                let mapSelector = ' svg.WebDollarNativeMap';

                this._mapElem = document.querySelector(mapSelector);
                if (this._mapElem === null)
                    throw "map is not specified. Invalid selector"+mapSelector+". Try  svg.WebDollarNativeMap";

                this._circleMap = new CircleMap(this._mapElem);

                this._mapElem.onmousemove = e => this._mapHighlight(e);

                this._circles = new Circles();

                this.initialize();

            },

            _mapHighlight(e) {

                if (e.target.data) {
                    const data = e.target.data;
                    this.$refs['refDialog'].show(data);
                } else
                    this.$refs['refDialog'].hide();

            },

            removeAllLinks(){

                for(let i=0;i<this._links.length;i++)
                    this.removeLink(this._links[i].start,this._links[i].stop);

                this._links = [];

            },

            removeNodeLinks(node){

                let cell = this._circleMap.getCellByLocation(node.lat, node.lng);

                for(let i=0;i<this._links.length;i++)
                    if(this._links[i].start === cell || this._links[i].stop === cell){
                        this.removeLink(this._links[i].start,this._links[i].stop);
                        this._links.splice(i,1);
                    }

            },

            async initialize(){

                await this._showMyself();

                WebDollar.Node.NodesList.emitter.on("nodes-list/connected", async (newConnection) => {

                    await this.nodeConnected(newConnection);

                });

                WebDollar.Node.NodesList.emitter.on("nodes-list/disconnected", async (nodesListObject) => {

                    await this.nodeDisconnected(nodesListObject)

                });

                WebDollar.Node.NodesWaitlist.emitter.on("waitlist/new-node", async (nodesWaitlistObject)=>{

                    await this.nodeConnected(nodesWaitlistObject);

                });

                WebDollar.Node.NodesWaitlist.emitter.on("waitlist/delete-node", async (nodesWaitlistObject)=>{

                    await this.nodeDisconnected(nodesWaitlistObject)

                });

                WebDollar.StatusEvents.on("miner-pool/settings", async ()=>{

                    if(WebDollar.Blockchain.MinerPoolManagement._minerPoolStarted){

                        this._waitingForPoolOwner=true;

                        if(this._currentPool.name === undefined || this._currentPool.name === null){

                            this.disconnectFromAllNodes();
                            this.removeAllLinks();
                            this._currentPool.name = WebDollar.Blockchain.MinerPoolManagement.minerPoolSettings.poolName;

                            return;

                        }else{

                            if(this._currentPool.name !== WebDollar.Blockchain.MinerPoolManagement.minerPoolSettings.poolName){

                                this.disconnectFromAllNodes();
                                this.removeAllLinks();
                                this._currentPool.node = undefined;
                                this._currentPool.name = WebDollar.Blockchain.MinerPoolManagement.minerPoolSettings.poolName;

                                return;

                            }

                        }

                    }else{

                        this._waitingForPoolOwner=false;
                        this._currentPool.name = undefined;
                        this._currentPool.node = undefined;
                        this.removeAllLinks();
                        this.disconnectFromAllNodes();

                    }

                });
//

            },

            addHilightNode(newConnection, cellClass){

                if (newConnection.cell) {

                    if (newConnection === this._selfNode)
                        this._selfNode.cell = newConnection.cell;

                    this._circleMap.highlightCell(newConnection.cell, cellClass , newConnection.desc, newConnection.uuid);
                    this._circles.inc(newConnection.cell);

                    this._circleMap.putCellOnTop(newConnection.cell);

                }

            },

            removeHilightNode(newConnection){

                if (newConnection.cell !== undefined && newConnection.cell !== null) {

                    // Only remove highlight if there are no more peers on this cell.
                    if (this._circles.del(newConnection.cell) === 0) {

                        // Either change class if there are still known peers there.
                        if (this._circles.get(newConnection.cell) > 0) {
                            this._circleMap.highlightCell(newConnection.cell, 'peer-network-member', undefined, newConnection.uuid);
                        }

                        // Or remove class at all.
                        else
                            this._circleMap.unhighlightCell(newConnection.cell, newConnection.uuid);

                        if (this._selfNode !== marker && this._selfNode !== null)
                            this._circleMap.removeLink(this._selfNode.cell, marker.cell);
                    }

                }

                //delete marker from the list
                for(var i=0;i<this._nodes.length;i++)
                    if(this._nodes[i]===newConnection)
                        this._nodes.splice(i,1);

                //this._circles.del(cell);

            },

            disconnectFromAllNodes(){

                for(var i=0;i<this._nodes.length;i++){

                    if ( this._nodes[i].cell !== undefined &&  this._nodes[i].cell !== null) {

                        if( this._nodes[i].cell !== this._selfNode.cell ){
                            this._circleMap.unhighlightCell(this._nodes[i].cell, this._nodes[i].uuid);
                            this._circleMap.highlightCell(this._nodes[i].cell, 'peer-network-member', undefined, this._nodes[i].uuid);
                        }

                    }

                }

            },

            addLink(firstConnection,secondConnection){

                let firstCell = this._circleMap.getCellByLocation(firstConnection.lat, firstConnection.lng);
                let secondCell = this._circleMap.getCellByLocation(secondConnection.lat, secondConnection.lng);

                this._circleMap.addLink(firstCell, secondCell);

            },

            removeLink(firstConnection,secondConnection){

                let firstCell = this._circleMap.getCellByLocation(firstConnection.lat, firstConnection.lng);
                let secondCell = this._circleMap.getCellByLocation(secondConnection.lat, secondConnection.lng);

                this._circleMap.removeLink(firstCell, secondCell);

            },

            async _showMyself(){

                this._selfNode = await WebDollar.Applications.GeoHelper.getLocationFromAddress('', true);
                this._selfNode.cell = this._circleMap.getCellByLocation(this._selfNode.lat, this._selfNode.lng);
                this._selfNode.desc = 'You';

                this.addHilightNode( this._selfNode, 'peer-own' );

            },

            async nodeConnected(newConnection){

                let nodeParams = await this.processNode(newConnection);
                this._nodes.push(nodeParams);

                if(this._waitingForPoolOwner===true &&  WebDollar.Blockchain.MinerPoolManagement._minerPoolStarted===true){

                    this.addHilightNode( nodeParams , "peer-connected-terminal" );

                    this._currentPool.node = nodeParams;

                    this.addLink(this._selfNode,this._currentPool.node);
                    this._links.push({
                        start: this._selfNode,
                        stop: this._currentPool.node
                    });

                    this._waitingForPoolOwner=false;

                }else{

                    let startLink;

                    if(nodeParams.connected){

                        if(WebDollar.Blockchain.MinerPoolManagement._minerPoolStarted){
                            startLink = this._currentPool.node;
                            this.addHilightNode( nodeParams , "peer-connected-browser" );
                        }else{
                            startLink = this._selfNode;
                            this.addHilightNode( nodeParams , "peer-connected-terminal" );
                        }

                        this.addLink(startLink,nodeParams);
                        this._links.push({
                            start: startLink,
                            stop: nodeParams
                        })

                    }else{

                        if(WebDollar.Blockchain.MinerPoolManagement._minerPoolStarted){
                            startLink = this._currentPool.node;
                            this.addHilightNode( nodeParams , "peer-connected-browser" );

                            this.addLink(startLink,nodeParams);
                            this._links.push({
                                start: startLink,
                                stop: nodeParams
                            })
                        }
                        else{
                            this.addHilightNode( nodeParams , "peer-network-member" );
                        }

                    }

                }

            },

            async nodeDisconnected(node){

                let foundNode;

                if(node.socket!==undefined || node.socket!==null)
                    foundNode = this.findNodeByIndex(node.socket.node.sckAddress);
                else
                    foundNode = this.findNodeByIndex(node.sckAddresses[0]);

                if (foundNode !== -1){

                    this.removeHilightNode(this._nodes[foundNode]);
                    this.removeNodeLinks(this._nodes[foundNode]);

                }

            },

            async processNode(node){

                let nodeParams;

                if(node.socket === null || node.socket === undefined){
                    nodeParams = await node.sckAddresses[0].geoLocation;
                    nodeParams.socket = node.sckAddresses[0];
                    nodeParams.uuid = 'waitListUUID'+this._waitListIndex;
                    this._waitListIndex++;
                    nodeParams.cell = this._circleMap.getCellByLocation(nodeParams.lat, nodeParams.lng);
                    nodeParams.desc = '';
                    nodeParams.connected = false
                }
                else{
                    nodeParams = await node.socket.node.sckAddress.geoLocation;
                    nodeParams.socket = node.socket.node.sckAddress;
                    nodeParams.uuid = node.socket.node.sckAddress.uuid;
                    nodeParams.cell = this._circleMap.getCellByLocation(nodeParams.lat, nodeParams.lng);
                    nodeParams.desc = '';
                    nodeParams.connected = true
                }

                return nodeParams;

            },

            findNodeByIndex(node){

                for (let i=0; i< this._nodes.length; i++ )
                    if (this._nodes[i].socket === node)
                        return i;

                return -1;

            },

        },

    }

</script>


