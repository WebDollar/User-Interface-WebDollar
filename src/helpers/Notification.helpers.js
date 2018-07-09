let Vue = null;

class Notification{

    setVueInstance (instance) { Vue = instance }

    addAlert(statusId, statusType, title, statusMessage, timeoutDelete, href){

//                 this.alertUniqueIds += 1;
//
//                 let alert = {
//                     statusUniqueId: this.alertUniqueIds,
//                     statusId: statusId,
//                     statusType: statusType,
//                     statusMessage: statusMessage,
//                     statusHref: href,
//                 };
//
//                 this.alerts.push(alert);
//
//                 if (typeof timeoutDelete === "number")
//                    setTimeout(()=>{
//
//                        for (let i=0; i<this.alerts.length; i++)
//                            if (this.alerts[i] === alert)
//                                this.alerts[i].splice(i,1);
//                    }, timeoutDelete)


        Vue.$notify({
            group: 'important',
            title: title,
            text: statusMessage,
            type: statusType,
            duration: timeoutDelete,
            speed: 2000,
            data: {id:statusId}
        })

    }

    deleteAlert(arrayStatusId){

        // if (!Array.isArray(arrayStatusId)) arrayStatusId = [arrayStatusId];
        //
        // for (let i=0; i<arrayStatusId.length; i++)
        //
        //     for (let j=this.alerts.length-1; j>=0; j--)
        //         if (this.alerts[j].statusId === arrayStatusId[i] ){
        //             this.alerts.splice(j,1);
        //             break;
        //         }


    }

    checkIfExistsAlert(statusId){

        // for (let j=this.alerts.length-1; j>=0; j--)
        //     if (this.alerts[j].statusId === statusId )
        //         return true;
        //
        // return false;

    }

}

export default new Notification();