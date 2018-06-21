class BrowserHelpers{

    static addEvent (object, type, callback) {
        if (object === null || typeof(object) === 'undefined') return;
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
        } else if (object.attachEvent) {
            object.attachEvent("on" + type, callback);
        } else {
            object["on"+type] = callback;
        }
    }

    static formatMoneyNumber(n, decimals=0) {

        n = parseInt(n);

        let number = parseInt(n/WebDollar.Applications.CoinsHelper.WEBD);
        let decimalNumber = BrowserHelpers._getNumberRest(n);

        if(number<100) decimals=4;
        if(number>99999) decimals=0;

        return BrowserHelpers._formatIntNumber(number)+'.'+BrowserHelpers._getFirstDigits(decimalNumber,decimals);
    }

    static _formatIntNumber(number){

        return number.toString().replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });

    }

    static _getNumberRest(number){

        return number % WebDollar.Applications.CoinsHelper.WEBD;

    }

    static _getFirstDigits(number,decimals){

        let decimalsVerifier = Math.pow(10,decimals);
        let newNumber = '';

        if(number<10){

            newNumber='000'+number.toString();

        }else if(number<100){

            newNumber='00'+number.toString();

        }else if(number<1000){

            newNumber='0'+number.toString();

        }else if(number<10000){

            newNumber=''+number.toString();

        }

        return newNumber.substring(0,decimals);

    }


}

export default BrowserHelpers;