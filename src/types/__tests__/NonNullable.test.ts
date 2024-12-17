import { NonNullable } from '../NonNullable';
import { expectType } from './test-utils';

describe('NonNullable', () => {
  it('should remove null and undefined from object properties', () => {
    type Input = {
      id: number | null;
      name: string | undefined;
      email: string | null | undefined;
    };

    type Result = NonNullable<Input>;
    type Expected = {
      id: number;
      name: string;
      email: string;
    };

    expectType<Result, Expected>(true);
  });

  it('should handle nested objects', () => {
    type Input = {
      user: {
        id: number | null;
        profile: {
          name: string | undefined;
          age: number | null;
        } | null;
      };
    };

    type Result = NonNullable<Input>;
    type Expected = {
      user: {
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
      items: (string | null | undefined)[];
      matrix: (number | null)[][];
    };

    type Result = NonNullable<Input>;
    type Expected = {
      items: string[];
      matrix: number[][];
    };

    expectType<Result, Expected>(true);
  });

  it('should handle optional properties', () => {
    type Input = {
      required: string;
      optional?: number | null;
    };

    type Result = NonNullable<Input>;
    type Expected = {
      required: string;
      optional: number;
    };

    expectType<Result, Expected>(true);
  });
});
