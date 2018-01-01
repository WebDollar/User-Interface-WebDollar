import Address from "./address/Address.js";
import AddressDOM from "./address/Address-DOM.js";

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

    /*
        It will refresh the wallet list by adding new elements
     */
    refreshWalletList(){

        let allWallets = document.getElementById("allWalets");

        //remove previous elements

        while (allWallets.firstChild)
            allWallets.removeChild(allWallets.firstChild);

        for (let i=0; i<this._walletsAddresses.length; i++){
            AddressDOM.addHTML(allWallets, this._walletsAddresses[i]);
        }

    }

    addNewAddress(address){

        if (address === null || address === undefined) return false;

        for (let i=0; i<this._walletsAddresses.length; i++)
            if (address.toString() === this._walletsAddresses.toString()){
                return false;
            }

        this._walletsAddresses.push(address);

        //it should only add this new address
        this.refreshWalletList();
    }

    deleteAddress(address){

        if (address === null || address === undefined) return false;

        for (let i=0; i<this._walletsAddresses.length; i++)
            if (address.toString() === this._walletsAddresses.toString()){
                this._walletsAddresses.splice(i,1);
                this.refreshWalletList();
                return true;
            }

        return false;
    }

    loadAllWallets(){

        this._walletsAddresses = [];

        for (let i=0; i<WebDollar.Blockchain.Wallet.addresses.length; i++)
            this._walletsAddresses.push(WebDollar.Blockchain.Wallet.addresses[i].address);

        return this.refreshWalletList();

    }

}


export default new Wallet();