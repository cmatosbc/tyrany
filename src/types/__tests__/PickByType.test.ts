import { expectType } from './test-utils';
import type { PickByType } from '../PickByType';

describe('PickByType', () => {
  type TestType = {
    name: string;
    age: number;
    isActive: boolean;
    tags: string[];
    meta: {
      created: Date;
      updated: Date;
    };
  };

  it('should pick string properties', () => {
    type Result = PickByType<TestType, string>;
    expectType<Result, { name: string }>({} as any);
  });

  it('should pick number properties', () => {
    type Result = PickByType<TestType, number>;
    expectType<Result, { age: number }>({} as any);
  });

  it('should pick boolean properties', () => {
    type Result = PickByType<TestType, boolean>;
    expectType<Result, { isActive: boolean }>({} as any);
  });

  it('should pick array properties', () => {
    type Result = PickByType<TestType, string[]>;
    expectType<Result, { tags: string[] }>({} as any);
  });

  it('should pick object properties', () => {
    type Result = PickByType<TestType, { created: Date; updated: Date }>;
    expectType<Result, { meta: { created: Date; updated: Date } }>({} as any);
  });

  it('should return empty object when no properties match', () => {
    type Result = PickByType<TestType, RegExp>;
    expectType<Result, {}>({} as any);
  });
});
