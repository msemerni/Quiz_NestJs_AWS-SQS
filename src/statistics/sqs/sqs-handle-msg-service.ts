//// FOR REST:
import * as AWS from 'aws-sdk';
import { AWSError, SQS } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { config } from './config';

AWS.config.update({ region: 'eu-central-1' });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const queueURL: string = config.STATISTICS_QUEUE_URL;

const getDataFromAWSQueue = async (): Promise<PromiseResult<AWS.SQS.ReceiveMessageResult, AWS.AWSError>> => {
  const params = {
    AttributeNames: [
      "SentTimestamp"
    ],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: ["All"],
    QueueUrl: queueURL,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0,
    // ReceiveMessageWaitTimeSeconds: 20
  };
  const message = await sqs.receiveMessage(params).promise();
  
  return message;
}

const deleteDataFromAWSQueue = (data: PromiseResult<SQS.ReceiveMessageResult, AWSError>): void => {
  const deleteParams = {
    QueueUrl: queueURL,
    ReceiptHandle: data.Messages[0].ReceiptHandle
  };

  sqs.deleteMessage(deleteParams, (err, data) => {
    if (err) {
      console.log("Delete Error", err);
    } else {
      console.log("Message Deleted", data);
    }
  });
}

export { getDataFromAWSQueue, deleteDataFromAWSQueue };
