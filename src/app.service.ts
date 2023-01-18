import { Injectable } from '@nestjs/common';
require('dotenv').config();

const { APP_NAME } = process.env;

@Injectable()
export class AppService {
  getMainPage(): string {
    return APP_NAME;
  }
}
