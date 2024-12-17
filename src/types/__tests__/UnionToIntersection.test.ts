import { UnionToIntersection } from '../UnionToIntersection';
import { expectType } from './test-utils';

describe('UnionToIntersection', () => {
  it('should convert union of objects to intersection', () => {
    type A = { a: string };
    type B = { b: number };
    type C = { c: boolean };

    type Union = A | B | C;
    type Result = UnionToIntersection<Union>;
    type Expected = { a: string } & { b: number } & { c: boolean };

    expectType<Result, Expected>(true);

    // Runtime test to demonstrate usage
    const value: Result = {
      a: 'test',
      b: 42,
      c: true,
    };

    expect(value).toEqual({
      a: 'test',
      b: 42,
      c: true,
    });
  });

  it('should handle function types correctly', () => {
    type F1 = (a: string) => void;
    type F2 = (b: number) => void;
    type Union = F1 | F2;
    
    type Result = UnionToIntersection<Union>;
    type Expected = ((a: string) => void) & ((b: number) => void);
    expectType<Result, Expected>(true);
    
    const fn: Result = ((x: string | number) => {}) as Result;
    expect(typeof fn).toBe('function');
  });

  it('should handle primitive unions', () => {
    type Union = string | number;
    type Result = UnionToIntersection<Union>;
    type Expected = never;
    
    expectType<Result, Expected>(true);
  });
});
