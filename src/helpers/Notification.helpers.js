let Vue = null;

class Notification{

    setVueInstance (instance) { Vue = instance }

    addAlert(statusId, statusType, title, statusMessage, timeoutDelete, href){

        Vue.$notify({
            group: (statusId === undefined) ? 'all' : statusId,
            title: title,
            text: statusMessage,
            type: statusType,
            duration: timeoutDelete,
            speed: 2000,
            data: {id:statusId}
        })

    }

    deleteAlert(arrayStatusId){

        Vue.$notify({
            group: arrayStatusId,
            clean: true
        })

    }

}

export default new Notification();