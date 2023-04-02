let amqplib = require("amqplib")
const dotenv = require('dotenv')
dotenv.config()

const publisher = async (msg) => {
    const connect = await amqplib.connect(process.env.RABBITMQ_URL);
    const channel = await connect.createChannel();

    const exchange  = process.env.RABBITMQ_EXCHANGE;

    await channel.assertExchange(exchange, 'fanout', { durable: false });
    await channel.publish(exchange, '', Buffer.from(JSON.stringify(msg)));
};

module.exports = publisher
