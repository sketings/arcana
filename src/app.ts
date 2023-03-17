// import a json file using esnext module syntax
import modulesToLoad from '../modules.json';
import { ApplicationFactory } from './core/module-factory';

async function bootstrap() {
  const app = new ApplicationFactory();
  await app.create(modulesToLoad);
  await app.init();
}
bootstrap();
