import { logLevelsEnum } from './logger.enum';

export class Logger {
  static log(message: string) {
    this.printMessage(message, logLevelsEnum.LOG);
  }
  static error(message: string) {
    this.printMessage(message, logLevelsEnum.ERROR);
  }
  static warn(message: string) {
    this.printMessage(message, logLevelsEnum.WARN);
  }
  static debug(message: string) {
    this.printMessage(message, logLevelsEnum.DEBUG);
  }
  static verbose(message: string) {
    this.printMessage(message, logLevelsEnum.VERBOSE);
  }

  static printMessage(message: string, color: logLevelsEnum) {
    // TODO: setup a logger
  }
}
