import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { Statistic, StatisticsSchema } from './schemas/statistics.schema';

@Module({
  providers: [StatisticsService],
  controllers: [StatisticsController],
  imports: [
    MongooseModule.forFeature([
      {name: Statistic.name, schema: StatisticsSchema}
    ])
  ],
  exports: [StatisticsService],
})

export class StatisticsModule {
};
