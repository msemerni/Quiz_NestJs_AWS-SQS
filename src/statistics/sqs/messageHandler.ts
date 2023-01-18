import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { StatisticsService } from '../statistics.service';
import { Statistic } from '../schemas/statistics.schema';
import { CreateStatisticsDto } from '../dto/create-statistics.dto';
import { config } from './config';

// console.log('config.AWS', config);
@Injectable()
export class MessageHandler {
  constructor(private readonly statisticsService: StatisticsService) { 
  };
  @SqsMessageHandler(config.STATISTICS_QUEUE, false)
  async handleMessage(message: AWS.SQS.Message) {
    const obj: CreateStatisticsDto = JSON.parse(message.Body);
    const newStatistics: Statistic = await this.statisticsService.saveOneStatistics(obj);

    if (newStatistics) {
      message.ReceiptHandle;
    };
  };
};
