import { ApplicationFactory } from './core/module-application';

async function bootstrap() {
  const app = await ApplicationFactory.create();
}
bootstrap();
