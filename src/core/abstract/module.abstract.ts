export abstract class AbstractModule {
  public async startModule(): Promise<any> {}
  public async stopModule(): Promise<any> {}
}
