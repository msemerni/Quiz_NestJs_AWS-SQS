import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatisticsModule } from './statistics/statistics.module';
import { ConsumerModule } from './statistics/sqs/consumer.module';
require('dotenv').config();

const { DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE } = process.env;
const dbOptions: {[key: string]: any} = { useNewUrlParser: true };
const dbConnectionUrl: string = `${DB_CONNECTION}://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

@Module({
  imports: [
    StatisticsModule,
    MongooseModule.forRoot(dbConnectionUrl, dbOptions),
    ConsumerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
}
