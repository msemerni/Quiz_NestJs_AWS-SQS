import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateStatisticsDto } from './dto/create-statistics.dto';
import { StatisticsService } from './statistics.service';
import { Statistic } from './schemas/statistics.schema';
import * as SQSService from "./sqs/sqs-handle-msg-service";

@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {
	};

	@Get()
	@HttpCode(HttpStatus.OK)
	async getStatistics(): Promise<Statistic[]> {
		const allStatistics: Statistic[] = await this.statisticsService.getAllStatistics();
		
		return allStatistics;
	};

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async saveStatistics(): Promise<Statistic | string> {
		const message = await SQSService.getDataFromAWSQueue();

		if (!message.Messages) {
			return "No Messages";
		};

		const msg: CreateStatisticsDto = JSON.parse(message.Messages[0].Body);
		const newStatistics: Statistic = await this.statisticsService.saveOneStatistics(msg);

		SQSService.deleteDataFromAWSQueue(message);

		return newStatistics;
	};
};
