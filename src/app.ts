// import a json file using esnext module syntax
import { modules } from '../modules';
import { ApplicationFactory } from './core/module-factory';

async function bootstrap() {
  const app = new ApplicationFactory();
  await app.create(modules);
  await app.init();
}
bootstrap();
