import { AsyncReturnType } from '../AsyncReturnType';
import { expectType } from './test-utils';

describe('AsyncReturnType', () => {
  it('should extract type from async function', () => {
    type Input = () => Promise<string>;
    type Result = AsyncReturnType<Input>;
    type Expected = string;

    expectType<Result, Expected>(true);
  });

  it('should handle complex return types', () => {
    interface User {
      id: number;
      name: string;
      roles: string[];
    }

    type Input = () => Promise<User>;
    type Result = AsyncReturnType<Input>;
    type Expected = User;

    expectType<Result, Expected>(true);
  });

  it('should handle union types', () => {
    type Input = () => Promise<string | number>;
    type Result = AsyncReturnType<Input>;
    type Expected = string | number;

    expectType<Result, Expected>(true);
  });

  it('should handle void return type', () => {
    type Input = () => Promise<void>;
    type Result = AsyncReturnType<Input>;
    type Expected = void;

    expectType<Result, Expected>(true);
  });
});
