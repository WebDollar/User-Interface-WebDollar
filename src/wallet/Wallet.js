class Wallet {

    constructor(){

        this._walletText = '';
        this._walletOpened = false;

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

}


export default new Wallet();