import { SYSTEM } from '../constant';
import { Freeze } from '../decorator/app.decorator';
import { ModuleEventsType } from '../events/module-events';
import { Module } from '../module';
import { logLevelsEnum } from './logger.enum';

@Freeze
export class Logger {
  log(message: string) {
    this.printMessage(message, logLevelsEnum.LOG);
  }
  error(message: string) {
    this.printMessage(message, logLevelsEnum.ERROR);
  }
  warn(message: string) {
    this.printMessage(message, logLevelsEnum.WARN);
  }
  debug(message: string) {
    this.printMessage(message, logLevelsEnum.DEBUG);
  }
  verbose(message: string) {
    this.printMessage(message, logLevelsEnum.VERBOSE);
  }

  printMessage(message: string, color: logLevelsEnum) {
    // TODO: setup a logger
    console.log(`${message} - ${color}`);
  }

  static init(event: ModuleEventsType) {
    event.subscribe(`${SYSTEM.SYSTEM_METHOD}:logger`, new this(), {
      name: SYSTEM.SYSTEM_METHOD
    } as Module);
  }
}
