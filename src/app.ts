import modules from '../modules.json';
import { ApplicationFactory } from './core/module-factory';
async function bootstrap() {
  const app = await ApplicationFactory.create(modules);
}
bootstrap();
