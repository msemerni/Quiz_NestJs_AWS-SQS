import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStatisticsDto } from './dto/create-statistics.dto';
import { Statistic, StatisticsDocument } from './schemas/statistics.schema';
import { Model } from 'mongoose';

@Injectable()
export class StatisticsService {
  constructor(@InjectModel(Statistic.name)private statisticsModel: Model<StatisticsDocument>){
  };

  async getAllStatistics(): Promise<Statistic[]>{
    return this.statisticsModel.find().exec();
  };

  async saveOneStatistics(statisticsDto: CreateStatisticsDto): Promise<Statistic> {
    const newStatistics: StatisticsDocument = new this.statisticsModel(statisticsDto);
    return newStatistics.save();
  };
};
