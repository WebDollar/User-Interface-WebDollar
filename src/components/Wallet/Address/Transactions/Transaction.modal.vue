<template>

    <div v-if="this.address !== null && this.address !== undefined">

        <Modal title="Wallet Adress" ref="modal">

            <div slot="content">

                <div class="twoColums">

                    <div class="section">

                        <div style="font-size: 20px">
                            Adress
                        </div>

                        <b style="color:gray" id="walletID">{{this.address.toString()}}</b>

                        <div class="copyToClipboard" @click="this.copyToClipboard()">
                            Copy to Clipboard
                        </div>

                    </div>

                    <div class="section">

                        <div style="font-size: 20px">
                            Balance
                        </div>

                        <b class="ballance" style="color:gray">0.0 WEBD</b>

                    </div>

                </div>

                <div class="adressActions">
                    <div class="actionButton activeActionButton">
                        Transfer
                    </div>
                    <div class="actionButton">
                        Buy
                    </div>
                    <div class="actionButton">
                        Sell
                    </div>
                </div>

                <form class="transfer">

                    <p class="title">Transfer WBD</p>

                    <input class="adress" placeholder="Recipient Adress"/>
                    <!--{{this.toAddress||''.toString() }}-->

                    <input class="amount" placeholder="WBD Amount"/>
                    <!--{{this.toAmount||0.0.toString() }}-->

                    <button type="submit" class="button">
                        SEND WBD
                    </button>
                </form>

            </div>


        </Modal>

    </div>

</template>

<script>

    import Modal from "components/UI/modal/Modal.vue"

    export default{

        props:{

            address: {default: null},
            toAddress: {default: null},
            toAmount: {default: 0.0},

        },

        components:{

            "Modal":Modal,

        },

        methods:{

            closeModal(){
                this.$refs['modal'].closeModal();
            },

            showModal(){
                this.$refs['modal'].showModal();
            },

            copyToClipboard(){
                var copyText = document.getElementById("walletID").innerHTML;
                copyText.select();
                document.execCommand("Copy");
                alert("Copied the text: " + copyText.value);
            }

        }

    }

</script>

