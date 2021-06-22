const amqp = require('amqplib/callback_api');
const URL = 'amqp://localhost'
const EXCHANGE_NAME = 'requests'
const EXCHANGE_TYPE = 'direct'

module.exports = () => {
    amqp.connect(URL, (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel(async (error1, channel) => {
            if(error1)
                throw error1
            channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
            await channel.prefetch(1)
            global.channel = channel
        })
    });
}

