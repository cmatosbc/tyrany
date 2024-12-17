import { PromiseType } from '../PromiseType';
import { expectType } from './test-utils';

describe('PromiseType', () => {
  it('should extract type from Promise', () => {
    type Input = Promise<string>;
    type Result = PromiseType<Input>;
    type Expected = string;

    expectType<Result, Expected>(true);
  });

  it('should handle nested Promises', () => {
    type Input = Promise<Promise<number>>;
    type Result = PromiseType<Input>;
    type Expected = Promise<number>;

    expectType<Result, Expected>(true);
  });

  it('should handle non-Promise types', () => {
    type Input = string;
    type Result = PromiseType<Input>;
    type Expected = string;

    expectType<Result, Expected>(true);
  });

  it('should handle Promise with complex types', () => {
    type ComplexType = {
      id: number;
      data: {
        name: string;
        items: string[];
      };
    };

    type Input = Promise<ComplexType>;
    type Result = PromiseType<Input>;
    type Expected = ComplexType;

    expectType<Result, Expected>(true);
  });

  it('should handle Promise with union types', () => {
    type Input = Promise<string | number>;
    type Result = PromiseType<Input>;
    type Expected = string | number;

    expectType<Result, Expected>(true);
  });
});
