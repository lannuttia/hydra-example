# Node.js ActiveMQ Example

This is a sample Node.js application that demonstrates how to send and receive messages from an ActiveMQ message broker using the stompit package.

## Prerequisites
Before you can run this application, you'll need to have the following software installed on your machine:

Node.js
Docker (optional, if you want to run ActiveMQ in a container)

## Installation
To install the dependencies for this application, run the following command:
```
npm install
```

## Configuration
To configure the application, create a file called .env in the root directory of the project, and set the following variables:

**ACTIVEMQ_HOST** - the hostname or IP address of the ActiveMQ broker\
**ACTIVEMQ_PORT** - the port number to connect to (default is 61613 for STOMP over TCP)\
**ACTIVEMQ_USERNAME** - the username to use for authentication (if required)\
**ACTIVEMQ_PASSWORD** - the password to use for authentication (if required)

You can copy the .env.example file and modify the values to match your environment.

If you want to use a different connection protocol, such as SSL or failover, you can modify the activemq-config.js file to customize the connection options.

## Usage
To run the application, use the following command:
```
npm run dev
```
This will start the application in development mode using nodemon, which will automatically restart the application whenever you make changes to the code.

The application consists of two parts:

producer.js - a script that sends a JSON message to the myQueue queue
consumer.js - a script that listens for messages on the myQueue queue and prints them to the console

You can run each script individually by using the following commands:
```
npm run producer
npm run consumer
```
