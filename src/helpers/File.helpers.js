const fs = require('browserify-fs');

class FileHelpers{

    constructor(){

    }

    readFileSync(fileName){

        return new Promise((resolve)=>{

            fs.readFile(fileName, function(err, data){

                console.log(err, data);

                resolve(data.toString());
            });

        })

    }

}

export default new FileHelpers();