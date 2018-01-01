import Address from "./address/Address.js";
import AddressDOM from "./address/Address-DOM.js";
import WalletDOM from "./Wallet-DOM"

class Wallet {

    constructor(){

        this._walletText = '';
        this._walletOpened = false;
        this._walletsAddresses = [];

    }

    initializeWallet(){

        WebDollar.Blockchain.Wallet.emitter.on("wallet-address-changes", (address)=>{
            this.addNewAddress(address);
        });

        WebDollar.Blockchain.Wallet.emitter.on("wallet-changes", ()=>{
            this.loadAllWallets();
        })

    }

    setWalletText(newText){
        this._walletText = newText;

        let walletButtonText = document.querySelectorAll("#walletButtonText spanWalletText");
        walletButtonText.children[1].innerHTML = this._walletText;
    }

    setWalletOpened(newWalletStatus){

        this._walletOpened = newWalletStatus;

        let walletButtonElement = document.getElementById("walletButton");
        let walletMenuElement = document.getElementById("walletMenu");

        let walletButtonImage = document.querySelectorAll("#walletButtonText i");

        if (this._walletOpened ){
            walletButtonElement.style.marginBottom = '375px';
            walletMenuElement.style.marginBottom = '26px';
            walletButtonImage.className = "fa fa-chevron-down";
        } else {
            walletButtonElement.style.marginBottom = '30px';
            walletMenuElement.style.marginBottom = '-320px';
            walletButtonImage.className = "fa fa-chevron-up";
        }

    }

    openWallet(){
        this.setWalletOpened(true)
    }

    closeWallet(){
        this.setWalletOpened(false)
    }

    toggleWallet(){
        this.setWalletOpened(!this._walletOpened)
    }


    addNewAddress(address){

        if (address === null || address === undefined) return false;

        for (let i=0; i<this._walletsAddresses.length; i++)
            if (address.toString() === this._walletsAddresses.toString()){
                return false;
            }

        this._walletsAddresses.push(address);

        //it should only add this new address
        WalletDOM.refreshWalletList(this._walletsAddresses);
    }

    deleteAddress(address){

        if (address === null || address === undefined) return false;

        for (let i=0; i<this._walletsAddresses.length; i++)
            if (address.toString() === this._walletsAddresses.toString()){
                this._walletsAddresses.splice(i,1);
                WalletDOM.refreshWalletList(this._walletsAddresses);
                return true;
            }

        return false;
    }

    loadAllWallets(){

        this._walletsAddresses = [];

        for (let i=0; i<WebDollar.Blockchain.Wallet.addresses.length; i++)
            this._walletsAddresses.push(WebDollar.Blockchain.Wallet.addresses[i].address);

        return WalletDOM.refreshWalletList(this._walletsAddresses);

    }

}


export default new Wallet();