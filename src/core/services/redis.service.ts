import { Freeze } from '../decorator/app.decorator';

@Freeze
export class RedisService {
  // TODO: setup a redis client
  init() {
    console.log('RedisService.init()');
  }
}
