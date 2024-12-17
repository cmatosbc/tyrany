import { expectType } from './test-utils';
import type { PickByValue } from '../PickByValueType';

describe('PickByValue', () => {
  type TestType = {
    name: string;
    age: number;
    isActive: boolean;
    email: string;
    count: number;
  };

  it('should pick string properties', () => {
    type Result = PickByValue<TestType, string>;
    expectType<Result, { name: string; email: string }>({} as any);
  });

  it('should pick number properties', () => {
    type Result = PickByValue<TestType, number>;
    expectType<Result, { age: number; count: number }>({} as any);
  });

  it('should pick boolean properties', () => {
    type Result = PickByValue<TestType, boolean>;
    expectType<Result, { isActive: boolean }>({} as any);
  });

  it('should return empty object when no properties match', () => {
    type Result = PickByValue<TestType, RegExp>;
    expectType<Result, {}>({} as any);
  });

  it('should work with union types', () => {
    type Result = PickByValue<TestType, string | number>;
    expectType<Result, { name: string; email: string; age: number; count: number }>({} as any);
  });

  it('should work with literal types', () => {
    type WithLiterals = {
      type: 'user';
      role: 'admin' | 'user';
      id: number;
    };
    type Result = PickByValue<WithLiterals, 'user'>;
    expectType<Result, { type: 'user' }>({} as any);
  });
});
