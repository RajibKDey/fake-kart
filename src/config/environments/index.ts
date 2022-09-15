import { IConfig } from "../types";
import { devConfig } from "./development";
// import { productionConfig } from "./production";
// import { stagingConfig } from "./staging";

const config = {} as IConfig;
const host = window.location.host;

switch (host) {
    // case "":
    //     Object.assign(config, productionConfig);
    //     break;

    // case "":
    //     Object.assign(config, stagingConfig);
    //     break;

    case "http://localhost:3000":
    default:
        Object.assign(config, devConfig);
        break;
};

export { config };