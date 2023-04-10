// import a json file using esnext module syntax
import * as dotenv from 'dotenv';
import modules from '../modules.json';
import { ApplicationFactory } from './core/module-factory';
dotenv.config();

async function bootstrap() {
  const app = new ApplicationFactory();
  await app.create(modules);
  await app.init();
}
bootstrap();
