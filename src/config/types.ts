export const enum processEnvEnum {
    production = 'production',
    staging = 'staging',
    development = 'development'
};

export interface IConfig {
    host: string;
};