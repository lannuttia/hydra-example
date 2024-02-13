const stompit = require('stompit');
const dotenv = require('dotenv');
const fs = require("fs")

dotenv.config();

const activemqConfig = {
  host: process.env.ACTIVEMQ_HOSTNAME,
  port: process.env.ACTIVEMQ_PORT,
  connectHeaders: {
    host: '/',
    login: process.env.ACTIVEMQ_USERNAME,
    passcode: process.env.ACTIVEMQ_PASSWORD,
  },
  maxReconnects: 10,
  connectOptions: {
    timeout: 10000,
  },
};

const failoverConfig = {
  maxReconnects: 3,
  initialReconnectDelay: 1000,
  maxReconnectDelay: 30000,
  randomize: true,
  useExponentialBackOff: true,
  maxRetryTime: 300000,
};

const sslOptions = {
    key: fs.readFileSync(process.env.CLIENT_KEY_PATH),
    cert: fs.readFileSync(process.env.CLIENT_CERT_PATH),
    ca: fs.readFileSync(process.env.CA_CERT_PATH),
    rejectUnauthorized: true,
  };

const connectionManager = new stompit.ConnectFailover([
  Object.assign({}, activemqConfig, {
    ssl: true,
    connectOptions: Object.assign({}, activemqConfig.connectOptions, {ssl: sslOptions}),
  }),
  Object.assign({}, activemqConfig, {
    ssl: false,
  }),
], failoverConfig);

module.exports = connectionManager;
