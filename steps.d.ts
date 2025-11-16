/// <reference types='codeceptjs' />

type CustomSteps = typeof import('./steps_file').default;
type PW = CodeceptJS.Playwright;
type REST = CodeceptJS.REST;

declare namespace CodeceptJS {

  interface SupportObject {
    I: I;
    Playwright: PW;
    REST: REST;
    current: any;
  }

  interface I extends PW, REST, CustomSteps {
    // Playwright metode
    amOnPage(url: string): Promise<void>;
    click(locator: string | object, context?: string | object): Promise<void>;
    fillField(field: string | object, value: string): Promise<void>;
    see(text: string, context?: string | object): Promise<void>;
    dontSee(text: string, context?: string | object): Promise<void>;
    seeElement(locator: string | object): Promise<void>;
    grabTextFrom(locator: string | object): Promise<string>;
    grabTextFromAll(locator: string | object): Promise<string[]>;
    grabNumberOfVisibleElements(locator: string | object): Promise<number>;
    selectOption(field: string | object, option: string | object): Promise<void>;
    waitForText(text: string, context?: string | object): Promise<void>;
    waitForElement(locator: string | object): Promise<void>;
    waitForNumberOfVisibleElements(locator: string | object, count: number): Promise<void>;
    wait(seconds: number): Promise<void>;
    dontSeeElement(locator: string | object): Promise<void>;
    
    // REST API metode
    sendGetRequest(url: string, headers?: object): Promise<any>;
    sendPostRequest(url: string, payload?: object, headers?: object): Promise<any>;
    sendPutRequest(url: string, payload?: object, headers?: object): Promise<any>;
    sendDeleteRequest(url: string, headers?: object): Promise<any>;
    sendPatchRequest(url: string, payload?: object, headers?: object): Promise<any>;
    
    // Assertion metode
    assertEqual(actual: any, expected: any, message?: string): void;
    assertDeepEqual(actual: any, expected: any, message?: string): void;
    assert(condition: boolean, message?: string): void;
    
    // Debug metode
    say(message: string): void;
  }

  interface ScenarioConfig {
    (title: string, fn: (I: I, current: any) => void): any;
  }

  namespace Translation {
    interface Actions {}
  }
}
