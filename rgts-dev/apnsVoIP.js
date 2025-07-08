const apn = require('apn');
const options = {
  token: {
    key: "./certificate/AuthKey_7F78XHXW4A.p8", // Path to your .p8 file
    keyId: "7F78XHXW4A", // Key ID from Apple Developer account
    teamId: "8A7875C6J9", // Team ID from Apple Developer account
  },
  production: false, // Set to true if sending to production environment
};

const apnProvider = new apn.Provider(options);

// Function to send VoIP notification
exports.sendVoipPush = async (req, res, next) => {
  const {deviceToken,notifySendTime,quickcall,receiver,aps,
    autocall,call_duration,channelName,sender,bookingId} = req.body;

  // Validate input
  if (!deviceToken || !receiver || !sender) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const notification = new apn.Notification({
    topic: "com.svoncoms.venting.voip", // Your app's bundle ID
    badge: aps?.badge || 0,
    sound: aps?.sound || "default",
    mutableContent:1,
    alert: {title: "Incoming Call",body: "You have a new call"},
    payload: {aps,notifySendTime,quickcall,receiver,autocall,call_duration,channelName,sender,bookingId},
  });

  // Send the notification
  try {
    const result = await apnProvider.send(notification, deviceToken);
    res.status(200).json({
      message: "VoIP notification sent successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to send notification",
      details: error.message,
    });
  }
};



