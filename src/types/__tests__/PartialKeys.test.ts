import { PartialKeys } from '../PartialKeys';
import { expectType } from './test-utils';

describe('PartialKeys', () => {
  it('should make specific keys optional', () => {
    type Input = {
      id: number;
      name: string;
      email: string;
    };

    type Result = PartialKeys<Input, 'name' | 'email'>;
    type Expected = {
      id: number;
      name?: string;
      email?: string;
    };

    expectType<Result, Expected>(true);

    // Runtime test
    const test1: Result = { id: 1 };
    const test2: Result = { id: 1, name: 'test' };
    const test3: Result = { id: 1, name: 'test', email: 'test@example.com' };

    expect(test1).toEqual({ id: 1 });
    expect(test2).toEqual({ id: 1, name: 'test' });
    expect(test3).toEqual({ id: 1, name: 'test', email: 'test@example.com' });
  });

  it('should handle single key', () => {
    type Input = {
      id: number;
      name: string;
      email: string;
    };

    type Result = PartialKeys<Input, 'email'>;
    type Expected = {
      id: number;
      name: string;
      email?: string;
    };

    expectType<Result, Expected>(true);
  });

  it('should handle all keys', () => {
    type Input = {
      id: number;
      name: string;
      email: string;
    };

    type Result = PartialKeys<Input, keyof Input>;
    type Expected = {
      id?: number;
      name?: string;
      email?: string;
    };

    expectType<Result, Expected>(true);
  });

  it('should handle no keys', () => {
    type Input = {
      id: number;
      name: string;
      email: string;
    };

    type Result = PartialKeys<Input, never>;
    type Expected = {
      id: number;
      name: string;
      email: string;
    };

    expectType<Result, Expected>(true);
  });
});
