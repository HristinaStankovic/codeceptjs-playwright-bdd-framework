/// <reference types='codeceptjs' />

declare function inject(): {
  I: CodeceptJS.I;
  [key: string]: any;
};

// Cucumber step definitions - globalne deklaracije
declare const Given: (pattern: string | RegExp, callback: (...args: any[]) => void | Promise<void>) => void;
declare const When: (pattern: string | RegExp, callback: (...args: any[]) => void | Promise<void>) => void;
declare const Then: (pattern: string | RegExp, callback: (...args: any[]) => void | Promise<void>) => void;
declare const And: (pattern: string | RegExp, callback: (...args: any[]) => void | Promise<void>) => void;
declare const But: (pattern: string | RegExp, callback: (...args: any[]) => void | Promise<void>) => void;
