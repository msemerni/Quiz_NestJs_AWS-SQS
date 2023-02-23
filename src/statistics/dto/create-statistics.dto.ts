import { ObjectId } from "mongodb";

export interface IDBUser extends Document {
  readonly _id: ObjectId,
  readonly login: string,
  readonly nick?: string,
};

export interface CreateStatisticsDtoArr {
  readonly user: IDBUser;
  readonly correctAnswers: number;
  readonly isAnsweredCurrentQuestion: boolean;
  readonly totalResponseTime: number;
};

export class CreateStatisticsDto {
  readonly gameID: string;
  readonly totalQuestionsCount: number;
  readonly statistics: Array<CreateStatisticsDtoArr>;
};
