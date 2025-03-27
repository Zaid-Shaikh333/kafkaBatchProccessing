import { Kafka } from 'kafkajs';
import { kafkaConfig } from '../config/kafkaConfig';
import  { logger } from '../utils/logger';

const kafkaConsumer = new Kafka({
    clientId: kafkaConfig.clientId,
    brokers: [kafkaConfig.brokers],
})

const consumer = kafkaConsumer.consumer({
    groupId: kafkaConfig.groupId
})

const connectConsumer = async () => {
    try {
        await consumer.connect();
        logger.info('Connected to kafka batch consumer');
    } catch (err) {
        logger.error(`Error connecting to kafka batch consumer: ${err}`);
    }
}

const consumeMessages = async () => {
    try {
        await consumer.subscribe({
            topic: kafkaConfig.topic,
            fromBeginning: true
        })

        await consumer.run({
            eachMessage: async ({message}) => {
                const data = JSON.parse(message.value.toString());
                logger.info(`Data received: ${data}`);
            }
        })
    } catch (error) {
        logger.error(`Error with consumer: ${error}`);
    }
}

consumeMessages();