import { Nullable } from '../Nullable';
import { expectType } from './test-utils';

describe('Nullable', () => {
  it('should make all properties nullable', () => {
    type Input = {
      id: number;
      name: string;
      email: string;
    };

    type Result = Nullable<Input>;
    type Expected = {
      id: number | null;
      name: string | null;
      email: string | null;
    };

    expectType<Result, Expected>(true);

    // Runtime test
    const test: Result = {
      id: null,
      name: 'test',
      email: null,
    };
    expect(test).toEqual({ id: null, name: 'test', email: null });
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

    type Result = Nullable<Input>;
    type Expected = {
      user: {
        id: number;
        profile: {
          name: string;
          age: number;
        };
      } | null;
    };

    expectType<Result, Expected>(true);
  });

  it('should handle arrays', () => {
    type Input = {
      items: string[];
      counts: number[];
    };

    type Result = Nullable<Input>;
    type Expected = {
      items: string[] | null;
      counts: number[] | null;
    };

    expectType<Result, Expected>(true);
  });

  it('should handle already nullable types', () => {
    type Input = {
      id: number | null;
      name: string | null;
    };

    type Result = Nullable<Input>;
    type Expected = {
      id: number | null;
      name: string | null;
    };

    expectType<Result, Expected>(true);
  });
});
