import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    "^@/components(.*)$": "<rootDir>/components/$1",
  },
};
export default config;
