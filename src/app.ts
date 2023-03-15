// import a json file using esnext module syntax
import modulesToLoad from '../modules.json';
import { ApplicationFactory } from './core/module-factory';

async function bootstrap() {
  await ApplicationFactory.init();
  await ApplicationFactory.create(modulesToLoad);
}
bootstrap();
