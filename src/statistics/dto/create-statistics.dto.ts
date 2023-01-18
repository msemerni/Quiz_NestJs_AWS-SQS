import { ObjectId } from "mongodb";

export interface IDBUser extends Document {
  readonly _id: ObjectId,
  readonly login: string,
  readonly nick?: string,
};

export interface CreateStatisticsDtoArr {
  readonly id: string;
  readonly title: string;
  readonly userAnswer: string;
  readonly correctAnswer: string;
  readonly isCorrectAnswer: boolean;
};

export class CreateStatisticsDto {
  readonly user: IDBUser;
  readonly answers: CreateStatisticsDtoArr;
};
