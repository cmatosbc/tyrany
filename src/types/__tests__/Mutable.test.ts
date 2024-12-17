import { Mutable } from '../Mutable';
import { expectType } from './test-utils';

describe('Mutable', () => {
  it('should remove readonly from properties', () => {
    type Input = {
      readonly id: number;
      readonly name: string;
    };

    type Result = Mutable<Input>;
    type Expected = {
      id: number;
      name: string;
    };

    expectType<Result, Expected>(true);

    // Runtime test
    const test: Result = {
      id: 1,
      name: 'test',
    };
    test.id = 2; // Should be allowed
    test.name = 'updated'; // Should be allowed
    expect(test).toEqual({ id: 2, name: 'updated' });
  });

  it('should handle nested objects', () => {
    type Input = {
      readonly user: {
        readonly id: number;
        readonly profile: {
          readonly name: string;
        };
      };
    };

    type Result = Mutable<Input>;
    type Expected = {
      user: {
        id: number;
        profile: {
          name: string;
        };
      };
    };

    expectType<Result, Expected>(true);
  });

  it('should handle arrays', () => {
    type Input = {
      readonly items: readonly string[];
    };

    type Result = Mutable<Input>;
    type Expected = {
      items: string[];
    };

    expectType<Result, Expected>(true);
  });

  it('should handle primitive types', () => {
    type Input = readonly string[];
    type Result = Mutable<Input>;
    type Expected = string[];

    expectType<Result, Expected>(true);
  });
});
