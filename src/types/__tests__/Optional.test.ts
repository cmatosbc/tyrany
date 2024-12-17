import { Optional } from '../Optional';
import { expectType } from './test-utils';

describe('Optional', () => {
  it('should make all properties optional', () => {
    type Input = {
      id: number;
      name: string;
      email: string;
    };

    type Result = Optional<Input>;
    type Expected = {
      id?: number;
      name?: string;
      email?: string;
    };

    expectType<Result, Expected>(true);

    // Runtime test
    const test: Result = {};
    expect(test).toEqual({});
  });

  it('should handle nested objects', () => {
    type Input = {
      user: {
        id: number;
        profile: {
          name: string;
          age: number;
        };
      };
    };

    type Result = Optional<Input>;
    type Expected = {
      user?: {
        id: number;
        profile: {
          name: string;
          age: number;
        };
      };
    };

    expectType<Result, Expected>(true);
  });

  it('should handle arrays', () => {
    type Input = {
      items: string[];
      counts: number[];
    };

    type Result = Optional<Input>;
    type Expected = {
      items?: string[];
      counts?: number[];
    };

    expectType<Result, Expected>(true);
  });

  it('should handle primitive types', () => {
    type Input = string;
    type Result = Optional<Input>;
    type Expected = string;

    expectType<Result, Expected>(true);
  });
});
