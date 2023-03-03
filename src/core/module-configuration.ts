//Structure required for the configuration file of a module
export interface ModuleConfiguration {
  name: string;
  version: string;
  loadAtStart?: boolean;
  isolated?: boolean;
  peer?: Array<string>;
  author?: string;
}
