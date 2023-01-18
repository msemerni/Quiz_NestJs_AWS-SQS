import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CreateStatisticsDto } from "../dto/create-statistics.dto";

export type StatisticsDocument = Statistic & Document;

@Schema({ versionKey: false })
export class Statistic {
  // @Prop()
  // statistics: CreateStatisticsDto
  @Prop()
  user: CreateStatisticsDto;
  @Prop()
  answers: CreateStatisticsDto;
};

export const StatisticsSchema = SchemaFactory.createForClass(Statistic);
