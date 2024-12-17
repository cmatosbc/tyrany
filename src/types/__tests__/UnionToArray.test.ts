import { expectType } from './test-utils';
import type { UnionToArray } from '../UnionToArray';

describe('UnionToArray', () => {
  it('should convert string literal union to array', () => {
    type Colors = 'red' | 'blue' | 'green';
    type Result = UnionToArray<Colors>;
    type Expected = ('red')[] | ('blue')[] | ('green')[];
    expectType<Result, Expected>({} as any);
  });

  it('should convert number literal union to array', () => {
    type Numbers = 1 | 2 | 3;
    type Result = UnionToArray<Numbers>;
    type Expected = (1)[] | (2)[] | (3)[];
    expectType<Result, Expected>({} as any);
  });

  it('should handle mixed type unions', () => {
    type Mixed = string | number | boolean;
    type Result = UnionToArray<Mixed>;
    type Expected = string[] | number[] | boolean[];
    expectType<Result, Expected>({} as any);
  });

  it('should handle single type', () => {
    type Single = string;
    type Result = UnionToArray<Single>;
    expectType<Result, string[]>({} as any);
  });

  it('should handle never type', () => {
    type Result = UnionToArray<never>;
    expectType<Result, never>({} as any);
  });

  it('should handle object types', () => {
    type Objects = { id: number } | { name: string };
    type Result = UnionToArray<Objects>;
    type Expected = ({ id: number })[] | ({ name: string })[];
    expectType<Result, Expected>({} as any);
  });
});
