const connectionManager = require('../config/activemq-config');

const receiveMessage = (queueName, messageHandler) => {
  connectionManager.connect((error, client, reconnect) => {
    if (error) {
      console.error('Could not connect to ActiveMQ:', error.message);
      reconnect();
      return;
    }

    const subscribeHeaders = {
      destination: queueName,
      ack: 'client-individual',
      'activemq.prefetchSize': 1,
    };

    client.subscribe(subscribeHeaders, (error, message) => {
      if (error) {
        console.error('Error subscribing to ActiveMQ:', error.message);
        return;
      }

      const messageText = message.readString('utf-8');
      const messageHeaders = message.headers;

      messageHandler(messageText, messageHeaders);

      client.ack(message);
    });
  });
};

module.exports = receiveMessage;
