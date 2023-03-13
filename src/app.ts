import modulesToLoad from '../modules.json' assert { type: 'json' };

import { ApplicationFactory } from './core/module-factory.js';

async function bootstrap() {
  await ApplicationFactory.init();
  await ApplicationFactory.create(modulesToLoad);
}
bootstrap();
