class Wallet {

    constructor(){

        this._walletText = '';
        this._walletOpened = false;

    }

    setWalletOpened(newWalletStatus){

        this._walletOpened = newWalletStatus;

    }

    openWallet(){
        this.setWalletOpened(true)
    }

    closeWallet(){
        this.setWalletOpened(false)
    }

}


export default new Wallet();