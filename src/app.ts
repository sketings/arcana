import modulesToLoad from '../modules.json';
import { ApplicationFactory } from './core/module-factory.js';

async function bootstrap() {
  await ApplicationFactory.init();
  await ApplicationFactory.create(modulesToLoad);
}
bootstrap();
