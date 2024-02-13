const connectionManager = require('../config/activemq-config');

 const sendMessage = (queueName, message, sendHeaders) => {
  connectionManager.connect((error, client, reconnect) => {
    if (error) {
      console.error('Could not connect to ActiveMQ:', error.message);
      reconnect();
      return;
    }

    const frame = client.send(sendHeaders);
    frame.write(message);
    frame.end();

    console.log("Sending message to " + queueName);
    
    client.disconnect();
  });
};

module.exports = sendMessage;
