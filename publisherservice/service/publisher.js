let amqplib = require("amqplib")
const dotenv = require('dotenv')

const publisher = async (msg) => {
    dotenv.config()
    const connect = await amqplib.connect(process.env.RABBITMQ_URL);
    const channel = await connect.createChannel();

    const exchange  = "RABBITMQ_EXCHANGE";

    await channel.assertExchange(exchange, 'fanout', { durable: false });
    await channel.publish(exchange, '', Buffer.from(JSON.stringify(msg)));
    await connect.close();
};

module.exports = publisher
