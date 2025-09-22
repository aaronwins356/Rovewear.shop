declare module "@testing-library/react" {
  export const renderHook: any;
  export const act: any;
}

declare module "@testing-library/jest-dom";

declare module "@playwright/test" {
  export const test: any;
  export const expect: any;
  export function defineConfig(config: Record<string, unknown>): Record<string, unknown>;
}

declare module "jest" {
  export interface Config {
    preset?: string;
    testEnvironment?: string;
    [key: string]: unknown;
  }
}

declare const describe: any;
declare const it: any;
declare const expect: any;
