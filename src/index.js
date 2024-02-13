const dotenv = require('dotenv');
const sendMessage = require ("./utils/producer");
const receiveMessage = require("./utils/consumer");

dotenv.config();

const queueName = process.env.QUEUE_NAME;

const message = 'Hello from NodeJS';

const sendHeader = {
    destination: queueName,
    'contentType': 'text/html',
    'contentLength': Buffer.byteLength(message.length)
}

sendMessage(queueName, message, sendHeader);

const handleMessage = (messageText, messageHeaders) => {
    console.log('Received message:', messageText);
    console.log('Message headers:', messageHeaders);
  };
  
receiveMessage(queueName, handleMessage);
  
