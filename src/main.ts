import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

const { PORT, APP_NAME } = process.env;
const port = PORT || 3001;

const startApp = async () => {
  try {
    const app = await NestFactory.create(AppModule, { abortOnError: false });
    await app.listen(PORT);
    console.log(`${APP_NAME} listen on port: ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}

startApp();
