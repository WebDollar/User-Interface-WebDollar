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


    export default{

        components:{

            "NetworkNativeMapCanvas": NetworkNativeMapCanvas,
            "NetworkNativeMapDialog": NetworkNativeMapDialog,

        },

        mounted() {

            if (typeof window === "undefined") return;

            this._markers = [];
            this._markerMyself = null;

            this.createMap();
            //this.createTestConnections();
        },

        methods:{

            createMap(){

                if (typeof window === 'undefined') return;

                let mapSelector = ' svg.WebDollarNativeMap';

                this._mapElem = document.querySelector(mapSelector);
                if (this._mapElem === null){
                    throw "map is not specified. Invalid selector"+mapSelector+". Try  svg.WebDollarNativeMap";
                }

                this._circleMap = new CircleMap(this._mapElem);

                this._mapElem.onmousemove = e => this._mapHighlight(e);

                this._circles = new Circles();

                this.initialize();
            },

            async initialize(){


                WebDollar.Node.NodesList.emitter.on("nodes-list/connected", async (nodesListObject) => {

                    let geoLocation = await nodesListObject.socket.node.sckAddress.getGeoLocation();

                    this._addMarker(geoLocation, nodesListObject.socket);

                } );

                WebDollar.Node.NodesList.emitter.on("nodes-list/disconnected", async (nodesListObject) => {

                    //deleting the marker
                    let markerIndex = this._findMarkerIndexBySocket(nodesListObject.socket);

                    if (markerIndex !== -1) this._removeMarker(this._markers[markerIndex])
                });

                //Waitlist p2p
                WebDollar.Node.NodesWaitlist.emitter.on("waitlist/new-node", async (nodesWaitlistObject)=>{

                    let geoLocation = await nodesWaitlistObject.sckAddresses[0].getGeoLocation();

                    this._addMarker(geoLocation, nodesWaitlistObject);

                });

                WebDollar.Node.NodesWaitlist.emitter.on("waitlist/delete-node", async (nodesWaitlistObject)=>{

                    //deleting the marker
                    let markerIndex = this._findMarkerIndexBySocket(nodesWaitlistObject);

                    if (markerIndex !== -1) this._removeMarker(this._markers[markerIndex])
                });

                await this._showMyself();

            },

            async _showMyself(){
                let geoLocation = await WebDollar.Applications.GeoHelper.getLocationFromAddress('', true);

                this._addMarker( geoLocation, 'myself');
            },

            _addMarker(geoLocation, socket){

                let marker = {
                    socket: socket,
                    desc: this._getInfoWindowContent(geoLocation, socket),
                };


                this._markers.push(marker);

                if (socket === "myself") this.highlightMe(marker); else
                if (socket === "fake") this.highlightConnectedPeer(marker);
                else
                    this.highlightConnectedPeer(marker)

            },

            highlightMe(marker){

                this._markerMyself = marker;

                let cell = this._circleMap.getCellByLocation(marker.desc.pos.lat, marker.desc.pos.lng);
                if (cell) {
                    marker.cell = cell;

                    this._circleMap.highlightCell(cell, 'peer-own', marker.desc, marker.desc.uuid);

                    this._circles.inc(cell);

                    //add links to current nodes
                    for (let i = 0; i< this._markers.length; i++)
                        if (this._markers[i] !== marker && this._markers[i].status === "connected")
                            this._circleMap.addLink(cell, this._markers[i].cell);

                    this._circleMap.putCellOnTop(cell);

                }
            },

            highlightConnectedPeer(marker){

                let cell = this._circleMap.getCellByLocation(marker.desc.pos.lat, marker.desc.pos.lng);
                if (cell) {

                    marker.cell = cell;

                    let cellClass;

                    if (marker.desc.nodeType === "myself") cellClass = "peer-own"; else
                    if (marker.desc.nodeType === "browser") cellClass = "peer-connected-browser";
                    if (marker.desc.nodeType === "terminal") cellClass = "peer-connected-terminal";

                    this._circleMap.highlightCell(cell, cellClass , marker.desc, marker.desc.uuid);

                    this._circles.inc(cell);

                    //add links to the myselfMarker
                    if (marker.desc.status === "connected")
                        if (this._markerMyself !== null && this._markerMyself !== undefined && this._markerMyself !== marker)
                            this._circleMap.addLink(cell, this._markerMyself.cell);

                    this._circleMap.putCellOnTop(cell);

                }
            },


            _getInfoWindowContent(geoLocation, socket){

                let address = '', nodeType = '', status = "node", nodeProtocol = '', nodeIndex=0, uuid='';

                if (geoLocation === undefined)
                    geoLocation = {};

                if (socket === 'myself') {
                    status = "connected";
                    address = geoLocation.address;
                    uuid = '0';
                    nodeType = "myself";
                } else if (socket === 'fake') {
                    address = geoLocation.country;
                    uuid = geoLocation.city;

                    if (Math.floor(Math.random() * 2) === 0) status = "connected";
                    else status = "not connected";

                    if (Math.floor(Math.random() * 2) === 0) nodeType = "browser";
                    else nodeType = "terminal"

                } else if (typeof socket === "object" && socket.node !== undefined && socket.node.protocol !== undefined && socket.node.protocol.helloValidated) {
                    address = socket.node.sckAddress.toString();
                    uuid = socket.node.sckAddress.uuid;

                    status = "connected";

                    switch (socket.node.type) {
                        case 'client':
                            nodeType = 'terminal';
                            break;
                        case 'server' :
                            nodeType = 'terminal';
                            break;
                        case 'webpeer' :
                            nodeType = 'browser';
                            break;
                    }

                    nodeProtocol = socket.node.type;
                    nodeIndex = socket.node.index;
                }
                else if (socket instanceof WebDollar.Node.NodesWaitlist.NodesWaitlistObject) { //its a waitlist

                    address = socket.sckAddresses[0].toString();
                    uuid = socket.sckAddresses[0].uuid;

                    switch (socket.type) {
                        case WebDollar.Node.NodesWaitlist.NODES_WAITLIST_OBJECT_TYPE.WEB_RTC_PEER:
                            nodeType = 'browser';
                            break;
                        case WebDollar.Node.NodesWaitlist.NODES_WAITLIST_OBJECT_TYPE.NODE_PEER_TERMINAL_SERVER:
                            nodeType = 'terminal';
                            break;
                    }

                    status = "not connected";
                    nodeProtocol = nodeType;
                    nodeIndex = -1;
                }

                let position = {lat: geoLocation.lat||0, lng: geoLocation.lng||0};

                return {
                    status: status,
                    city: geoLocation.city||'',
                    country: geoLocation.country||'',
                    address: address,
                    uuid: uuid||nodeIndex,
                    protocol: nodeProtocol,
                    isp: geoLocation.isp||'',
                    pos: position,
                    nodeType: nodeType,
                }

            },

            _mapHighlight(e) {

                if (e.target.data) {
                    const data = e.target.data;
                    this.$refs['refDialog'].show(data);
                } else
                    this.$refs['refDialog'].hide();

            },

            _removeMarker(marker){

                if (marker.cell !== undefined && marker.cell !== null) {

                    // Only remove highlight if there are no more peers on this cell.
                    if (this._circles.del(marker.cell) === 0) {
                        // Either change class if there are still known peers there.
                        if (this._circles.get(marker.cell) > 0) {
                            this._circleMap.highlightCell(marker.cell, 'peer-connected-browser', undefined, marker.desc.uuid);
                        }
                        // Or remove class at all.
                        else
                            this._circleMap.unhighlightCell(marker.cell, marker.desc.uuid);

                        if (this._markerMyself !== marker && this._markerMyself !== null)
                            this._circleMap.removeLink(this._markerMyself.cell, marker.cell);
                    }

                }

                //delete marker from the list
                for (let i=0; i<this._markers.length; i++)
                    if (this._markers[i] === marker) {
                        this._markers.splice(i, 1);
                        break;
                    }

            },

            createTestConnections(){

                let mapsTester = new MapsTester(this);
                mapsTester.testConnections();

            },

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

                this._circleMap.highlightCell(cell1, 'known-peer', data, 1);
                this._circleMap.highlightCell(cell2, 'own-peer', data, 2);
                this._circleMap.highlightCell(cell3, 'own-peer', data, 3);
                this._circleMap.highlightCell(cell4, 'own-peer', data, 4);

            },

            _findMarkerIndexBySocket(socket){

                for (let i=0; i< this._markers.length; i++ )
                    if (this._markers[i].socket === socket)
                        return i;

                return -1;

            },

        },



    }

</script>


