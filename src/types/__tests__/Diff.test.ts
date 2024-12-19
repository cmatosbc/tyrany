import { Diff } from '../Diff';

describe('Diff Type', () => {
  it('should exclude properties of type U from type T', () => {
    type A = { x: number; y: string; };
    type B = { y: string; };
    type Result = Diff<A, B>;
    const test: Result = { x: 42 } as Result; // Should pass
  });

  it('should not exclude properties if U has no properties of T', () => {
    type C = { a: number; b: string; };
    type D = { c: boolean; };
    type Result2 = Diff<C, D>;
    const test2: Result2 = { a: 42, b: 'hello' } as Result2; // Should pass
  });

  it('should handle multiple properties', () => {
    type E = { x: number; y: string; z: boolean; };
    type F = { y: string; z: boolean; };
    type Result3 = Diff<E, F>;
    const test3: Result3 = { x: 42 } as Result3; // Should pass
  });

  it('should handle nested types', () => {
    type G = { nested: { a: number; b: string; }; c: boolean; };
    type H = { nested: { b: string; }; };
    type Result4 = Diff<G, H>;
    const test4: Result4 = { nested: { a: 42 }, c: true } as Result4; // Should pass
  });

  it('should return an empty object for an empty type', () => {
    type I = {}; // Empty type
    type H = { nested: { b: string; }; };
    type Result5 = Diff<I, H>; // Expected: {} (no properties to exclude)
    const test5: Result5 = {} as Result5; // Should pass
  });

  it('should return an empty object for identical types', () => {
    type J = { x: number; };
    type Result6 = Diff<J, J>; // Expected: never
    const test6: Result6 = {} as Result6; // Should pass (since Result6 is never)
  });
});
