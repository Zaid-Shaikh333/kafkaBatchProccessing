import { Kafka } from 'kafkajs';
import { kafkaConfig } from '../config/kafkaConfig.js';
import logger from '../config/logger.js';

const kafkaProducerClient = new Kafka({
    clientId: kafkaConfig.clientId,
    brokers: kafkaConfig.brokers,
})

const producer = kafkaProducerClient.producer();

const connectProducer = async () => {
    try {
        await producer.connect();
        logger.info('Connected to Kafka producer');
    } catch (error) {
        logger.error(`Error connecting to Kafka producer: ${error}`);
    }
}

const produceMessages = async (messages) => {
    try {
        connectProducer();
        for(let index = 0; index < 1000; index++) {
            await producer.send({
                topic: kafkaConfig.topic,
                messages: [{
                    key: `key-${index}`,
                    value: JSON.stringify(`Producing message with value ${index}`),
                    partition: index%5,
                    offset: index,
                }],
            });
        }
    } catch (error) {
        logger.error(`Error producing messages: ${error}`);
    } finally {
        await producer.disconnect();
        logger.info('Disconnected from Kafka producer');
    }
};

produceMessages();