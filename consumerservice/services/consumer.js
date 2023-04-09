let amqplib = require("amqplib")
const dotenv = require('dotenv')
dotenv.config()

const msgConsumer = async (msgCallback) => {
    const connect = await amqplib.connect(process.env.RABBITMQ_URL);
    const channel = await connect.createChannel();

    const exchange  = process.env.RABBITMQ_EXCHANGE;

    await channel.assertExchange(exchange, 'fanout', { durable: false });
    await channel.assertQueue("consumer",{ exclusive: false});
    await channel.bindQueue("consumer", exchange, "");

    await channel.consume("consumer", message => {
        let msg = JSON.parse(message.content);

        console.log(`Received: ${msg} `);
        channel.ack(message);
        msgCallback(msg);
    });
}

module.exports = { msgConsumer }
