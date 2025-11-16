import { actor } from 'codeceptjs';

export default actor({

  say(msg: string) {
    console.log(msg);
  },

  assertEqual(actual: any, expected: any, msg?: string) {
    if (actual !== expected) {
      throw new Error(msg || `Assertion failed: ${actual} != ${expected}`);
    }
  },

  assertDeepEqual(actual: any, expected: any, msg?: string) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(msg || `Deep equality failed`);
    }
  },

  assert(condition: boolean, msg?: string) {
    if (!condition) {
      throw new Error(msg || `Assertion failed`);
    }
  }

});
