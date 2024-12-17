import { ExtractArrayType } from '../ExtractArrayType';
import { expectType } from './test-utils';

describe('ExtractArrayType', () => {
  it('should extract type from array', () => {
    type StringArray = string[];
    type NumberArray = Array<number>;
    type ObjectArray = Array<{ id: number; name: string }>;

    // Test primitive arrays
    type StringResult = ExtractArrayType<StringArray>;
    type NumberResult = ExtractArrayType<NumberArray>;
    
    expectType<StringResult, string>(true);
    expectType<NumberResult, number>(true);

    // Test object array
    type ObjectResult = ExtractArrayType<ObjectArray>;
    type Expected = { id: number; name: string };
    
    expectType<ObjectResult, Expected>(true);

    // Runtime test to demonstrate usage
    const arr: ObjectArray = [{ id: 1, name: 'test' }];
    const item: ObjectResult = arr[0];
    
    expect(item.id).toBe(1);
    expect(item.name).toBe('test');
  });

  it('should handle nested arrays', () => {
    type NestedArray = number[][];
    type Result = ExtractArrayType<NestedArray>;
    type Expected = number[];
    
    expectType<Result, Expected>(true);

    // Runtime test
    const arr: NestedArray = [[1, 2], [3, 4]];
    const item: Result = arr[0];
    
    expect(Array.isArray(item)).toBe(true);
    expect(item).toEqual([1, 2]);
  });

  it('should handle non-array types', () => {
    type NonArray = string;
    type Result = ExtractArrayType<NonArray>;
    type Expected = never;
    
    expectType<Result, Expected>(true);
  });

  it('should handle union array types', () => {
    type UnionArray = Array<string | number>;
    type Result = ExtractArrayType<UnionArray>;
    type Expected = string | number;
    
    expectType<Result, Expected>(true);

    // Runtime test
    const arr: UnionArray = ['test', 42];
    const item1: Result = arr[0];
    const item2: Result = arr[1];
    
    expect(typeof item1).toBe('string');
    expect(typeof item2).toBe('number');
  });
});
