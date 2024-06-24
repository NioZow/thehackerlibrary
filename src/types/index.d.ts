declare global {
  export interface AsyncVoidFunction {
    (): Promise<void>;
  }
}

export default global;
