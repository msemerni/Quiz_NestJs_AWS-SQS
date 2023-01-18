import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageHandler } from './messageHandler';
import * as AWS from 'aws-sdk';
import { StatisticsModule } from '../statistics.module';
import { config } from './config';

AWS.config.update({
  region: config.AWS_REGION,
  accessKeyId: config.ACCESS_KEY_ID,
  secretAccessKey: config.SECRET_ACCESS_KEY,
});

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: config.STATISTICS_QUEUE,
          queueUrl: config.STATISTICS_QUEUE,
          region: config.AWS_REGION,
        },
      ],
      producers: [],
    }),
    StatisticsModule
  ],
  controllers: [],
  providers: [MessageHandler],
})

export class ConsumerModule {
};
