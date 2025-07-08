const firebase = require("firebase-admin");
var moment = require('moment-timezone');
var utcTime = moment.utc().format("DD-MM-YYYY HH:mm:ss");

// Replace with your Firebase server key
const serviceAccount = require('./../config/serviceAccountKey.json');

// Initialize the Firebase Admin SDK
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
});

exports.sendCallNotification = async (title, body, type, token, payload) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    data: {
      receiver_id: String(payload?.receiver?.id || ''),
      receiver_name: String(payload?.receiver?.name || ''),
      body: String(""),
      sender_id: String(payload?.sender?.id || ''),
      title: String(""),
      click_action: String(""),
      receiver_image: String(payload?.receiver?.image || ''),
      sender_name: String(payload?.sender?.name || ''),
      sender_image: String(payload?.sender?.image || ''),
      notifcationType: String("ringing"),
      bookingId: String(payload?.bookingId || ''),
      call_duration: String(payload?.call_duration || ''),
      quickcall: String("false"),
      autocall: String(payload?.autocall || "false"),
      notifySendTime: moment.utc().format("DD-MM-YYYY HH:mm:ss").toString()
    },
    android: {
      priority: "high",
    },
    token: token // Ensure only one of `topic`, `token`, or `condition` is used
  };

  try {
    const response = await firebase.messaging().send(message);
  } catch (error) {
    console.error('Error sending call notification:', error);
  }
};

exports.sendNotification = async (title,body,type='',token,receiver='',sender='',clickAction='') => {
  if(token){
    const message = {
      notification: {
        title: title,
        body: body,
      },
      data: {
        click_action:clickAction,
        notifcationType: type,
        receiver: JSON.stringify(receiver),
        sender: JSON.stringify(sender),
        title: title,
        body: body,
        sound: "default",
        notifySendTime:moment.utc().format("DD-MM-YYYY HH:mm:ss")
      },
      android: {
        priority: "high",
        notification: {
          sound: "default",
          click_action:clickAction,
        }
      },
      apns: {
          payload: {
              aps: {
                  sound: "customNotificationTone.wav"
              }
          }
      },
      token: token
    };
  
    // Send the message
    firebase.messaging().send(message).then((response) => {
        console.log('Push notification sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending push notification:', error);
      }
    );
  }else{
    console.log('token not exist - function :sendNotification')
  }
  
}

exports.sendNotificationIos = async (title,body,type='',token,receiver='',sender='',clickAction='') => {
  if(token){
    console.log('sendNotification - function called');
    const message = {
      notification: {
        title: title,
        body: body,
      },
      data: {
        click_action:clickAction,
        notifcationType: type,
        receiver: JSON.stringify(receiver),
        sender: JSON.stringify(sender),
        title: title,
        body: body,
        sound: "default",
        notifySendTime:moment.utc().format("DD-MM-YYYY HH:mm:ss")
      },
      android: {
        priority: "high",
        notification: {
          sound: "default",
          click_action:clickAction,
        }
      },
      apns: {
          payload: {
              aps: {
                  sound: "customNotificationTone.wav"
              }
          }
      },
      token: token,
      
    };
  
    // Send the message
    firebase.messaging().send(message).then((response) => {
        console.log('Push notification sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending push notification:', error);
      }
    );
  }else{
    console.log('token not exist - function :sendNotification')
  }
  
}

exports.sendNotificationAndroiod = async (title,body,type='',token,receiver='',sender='',clickAction='') => {
  if(token){
    const message = {
        // notification: {
        //   title: title,
        //   body: body,
        // },
        data:{
          click_action: clickAction,
          notifcationType: String(type),            // Convert to string
          title: String(title),                     // Convert to string
          body: String(body),                       // Convert to string
          receiver: JSON.stringify(receiver),       // Object converted to string
          sender_name: JSON.stringify(sender),      // Object converted to string
          quickcall: String(false),                 // Boolean converted to string
          autocall: String(false),  
          notifySendTime:moment.utc().format("DD-MM-YYYY HH:mm:ss")
      },
      android: {
        priority: "high",
        
        // notification: {
        //   sound: "default",
        //   click_action:clickAction,
        // }
      },
      token: token,
    }
    
    firebase.messaging().send(message).then((response) => {
      console.log('ll notification sent successfully:', response);
    })
    .catch((error) => {
      console.error('Error sending topic 3 message:', error);
    });
  }else{
    console.log('token not exist - function :sendNotification')
  }
}

exports.notifyStopRingingByToken = async (title,body,notificationType,bookingId,token) => {
  console.log('notifyStopRingingByToken - stop rining');
  const message = {
    notification: {
      title: title,
      body: body,
    },
    data: {
      click_action: "",
      notifcationType: notificationType,
      title: title,
      body: body,
      bookingId:bookingId,
      sound: "default",
      notifySendTime:moment.utc().format("DD-MM-YYYY HH:mm:ss"),
      shouldPresent:'true',
    },
    android: {
      priority: "high",
      notification: {
        sound: "default"
      }
    },
    apns: {
        payload: {
            aps: {
                sound: "customNotificationTone.wav",
                "content-available":1
            }
        }
    },
    token: token
  };

 // Send the message
    firebase.messaging().send(message).then((response) => {
      console.log('Push notification sent successfully:', response);
    })
    .catch((error) => {
      console.error('Error sending push notification:', error);
    }
  )  
}

exports.notifyStopRingingByTokenAndroid = async (title,body,notificationType,bookingId,token) => {
  console.log('notifyStopRingingByToken android - stop rining');
   
    var message = {
      // notification: {
      //   title: title,
      //   body: body,
      // },
      data:{
        click_action:'',
        notifcationType: notificationType || '',
        title: title,
        body: body,
        bookingId:bookingId,
        notifySendTime:moment.utc().format("DD-MM-YYYY HH:mm:ss")
    },
    android: {
      priority: "high",
    },
    token: token
  }

    firebase.messaging().send(message).then((response) => {
      console.log('call stop notification sent successfully:', response);
    })
    .catch((error) => {
      console.error('Error sending topic message:', error);
    });
}

// send notification for a ringin stop for all listner which is subscribed Venting  topic
exports.notifyStopRinging = async(title,body,notificationType,bookingId)=>{
  const message = {
    notification: {
      title: title,
      body: body,
    },
    data: {
      click_action: "",
      notifcationType: notificationType,
      title: title,
      body: body,
      bookingId:bookingId,
      sound: "default",
      shouldPresent:'true',
      notifySendTime:moment.utc().format("DD-MM-YYYY HH:mm:ss"),
    },
    android: {
      priority: "high",
      notification: {
        sound: "default",
        click_action: "",
      }
    },
    apns: {
        payload: {
            aps: {
              sound:"customNotificationTone.wav",
              "content-available":1,
              "priority":10
            },
            
        }
    },
    topic: 'Venting', // Replace with the topic you want to send to

  };

  // Send the message to the topic.
  firebase.messaging().send(message)
    .then((response) => {
      console.log('Topic message sent ios:', response);
    })
    .catch((error) => {
      console.error('Error sending topic message:', error);
    });
}


// send notification for a ringin stop for all listner which is subscribed Venting Android  topic
exports.notifyStopRingingAndroid = async(title,body,notificationType,bookingId)=>{
  console.log('notifyStopRingingAndroid')
  var options = {
    // notification: {
    //   title: title,
    //   body: body,
      
    // },
    data:{
      click_action:'',
      notifcationType: notificationType || '',
      title: title,
      body: body,
      bookingId:bookingId,
      notifySendTime:moment.utc().format("DD-MM-YYYY HH:mm:ss")
    },
    android: {
      priority: "high",
    },
    topic: 'Venting_Android'
  }

  firebase.messaging().send(options)
    .then((response) => {
      console.log('Topic message sent andoid:', response);
    })
    .catch((error) => {
      console.error('Error sending topic message:', error);
    });
}



exports.notify = async(title,body,notificationType,topic)=>{
  const message = {
    notification: {
      title: title,
      body: body,
     
    },
    data: {
      click_action: "",
      notifcationType: notificationType,
      title: title,
      body: body,
      sound: "default",
      shouldPresent:'true',
      notifySendTime:moment.utc().format("DD-MM-YYYY HH:mm:ss"),
    },
    android: {
      priority: "high",
      notification: {
        sound: "default",
        click_action: "",
      }
    },
    apns: {
        payload: {
            aps: {
                sound: "customNotificationTone.wav",
                "content-available":1
            }
        }
    },
    topic: topic, 
  };

  // Send the message to the topic.
  firebase.messaging().send(message)
    .then((response) => {
      console.log('notify sent ios:', response);
    })
    .catch((error) => {
      console.error('Error sending topic message:', error);
    });
}


// send
exports.notifyAndroid = async(title,body,notificationType,topic)=>{
  const message = {
    notification: {
      title: title,
      body: body,
      
    },
    data: {
      click_action: "",
      notifcationType: notificationType || '',
      title: title,
      body: body,
      notifySendTime:moment.utc().format("DD-MM-YYYY HH:mm:ss"),
    },
    android: {
      priority: "high",
      notification: {
        sound: "default",
        click_action: "",
      }
    },
    topic: topic, 
  };

  // Send the message to the topic.
  firebase.messaging().send(message)
    .then((response) => {
      console.log('Notify sent andoid:', response);
    })
    .catch((error) => {
      console.error('Error sending 1 topic message:', error);
    });
}


exports.callNotificationAndroid = async(title,body,data,token)=>{
  console.log('--->',data)
  if(token){
    const message = {
     
      data: data,
      android: {
        priority: "high"
      },
      token: token, 
    };
  
    // Send the message to the topic.
    firebase.messaging().send(message)
      .then((response) => {
        console.log('call notification sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error call notification sent successfully:', error);
      });
  }
}

exports.callNotificationIOS = async(title,body,data,token)=>{
  if(token){
    const message = {
      notification: {
        title: title,
        body: body,
      },
      data: data,
      apns: {
          payload: {
              aps: {
                  sound: "customNotificationTone.wav",
                  "content-available":1,
                  "priority":10
              }
          }
      },
      token: token, 
    };

    // Send the message to the topic.
    firebase.messaging().send(message)
      .then((response) => {
        console.log('call notification sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error call notification sent successfully:', error);
      });
  }
}




  
  