import modulesToLoad from '../modules.json';
import { ApplicationFactory } from './core/module-factory';
async function bootstrap() {
  const app = ApplicationFactory;
  const modules = await ApplicationFactory.create(modulesToLoad);
  // const logger: Logger = app._event.publish('system_logger')
  // logger.log('coucou')
}
bootstrap();
