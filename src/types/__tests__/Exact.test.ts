import { Exact } from '../Exact';
import { expectType } from './test-utils';

describe('Exact', () => {
  it('should only allow exact properties', () => {
    type Input = {
      name: string;
      age: number;
    };

    type Result = Exact<Input>;
    type Expected = {
      name: string;
      age: number;
    };

    expectType<Result, Expected>(true);

    // Runtime test
    const validUser: Result = {
      name: 'John',
      age: 30,
    };
    expect(validUser).toEqual({ name: 'John', age: 30 });

    // TypeScript should error on this:
    // const invalidUser: Result = {
    //   name: 'John',
    //   age: 30,
    //   extra: true,
    // };
  });

  it('should handle empty objects', () => {
    type Input = {};
    type Result = Exact<Input>;
    type Expected = {};

    expectType<Result, Expected>(true);
  });

  it('should handle nested objects', () => {
    type Input = {
      user: {
        name: string;
        age: number;
      };
    };

    type Result = Exact<Input>;
    type Expected = {
      user: {
        name: string;
        age: number;
      };
    };

    expectType<Result, Expected>(true);
  });

  it('should handle arrays', () => {
    type Input = {
      items: string[];
    };

    type Result = Exact<Input>;
    type Expected = {
      items: string[];
    };

    expectType<Result, Expected>(true);
  });
});
