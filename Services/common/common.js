

let util = require('../../Utilities/util');
var FCM = require('fcm-node');
// $ npm install fcm-node

module.exports = (() => {

    return {

        /**
         * @method sendNotification to send push notification
         * @param {object} data //request
         * @param {object} cb //callback
         * @return {obj} //return user exp
         */ 
        sendNotification : (Arr) => {
            //console.log('Notification start');
            //var serverKey = 'AAAA9nePTYw:APA91bHE8AvEmNZSX-Iv04SSkBo-aZB5Dgc3Pvn5u9UPKwPJBIg07soCz72eLX-ejkmkE3sdbTjfAXNpcX3krEyuRrH06eIhQY-TNBZDoTsLAx5Rva86hZTadiCPlluUyVszI6z3qGvj'
            //var serverKey = 'AAAATh5Ct04:APA91bFyWm_1UlZjuhPxme67m9itaVqWCystgfQJLHjpdH6Bm5tZBToOyW9XhrNpPYX49NuqJzFoJnEy35Sq0wPojbRZroQ7AU8QEcJ2Dl35kg0wgWCVU9GvC9Pf44OViYXGQJgYQ7ft';
            var serverKey = 'AAAAYAaQl-Q:APA91bFtl5i745sFHXJ0OVNbRHG8CKoyq5H69jTCElEly66a454boKZJDCkfPurNBFQm1K2MtQuDHa6PXKKy2Xe38UN0XZ1Sc2F5VDFzaPxT4_tW31Jgr4QBNghpavoyl3vpS8tj6NkD';
            var fcm = new FCM(serverKey);
         
            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: Arr.deviceId, //device token
                collapse_key: 'your_collapse_key',
                
                notification: {
                    title: Arr.payload.title,   
                    body: Arr.payload.message,
                    data: Arr.payload.data,
                    message: Arr.payload.message,
                    type: Arr.messageType,
                    click_action: "fcm.ACTION.HELLO"
                },
                data: {  //you can send only notification or only data(or include both)
                    message: Arr.payload.message,
                    type: Arr.messageType,
                    title: Arr.payload.title,
                    data: Arr.payload.data
                }
            };
            //console.log(message);
            if(Arr.deviceType == "ios"){
               delete  message.data;
            }else if(Arr.deviceType == "android"){
                delete  message.notification;
            }
            //console.log(message);
            fcm.send(message, function(err, response){
                if (err) {
                    console.log("Something has gone wrong!", err);
                } else {
                    console.log("Successfully sent with response: ", response); 
                    //cb(null, true);
                }
            });
        }
    }
})();