import dotenv from 'dotenv';
dotenv.config();

export const kafkaConfig = {
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKERS],
    groupId: process.env.KAFKA_GROUP_ID,
    topic: process.env.KAFKA_TOPIC,
}