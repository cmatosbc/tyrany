/**
 * Extracts the type that a Promise resolves to
 * Useful when working with async functions and Promise chains
 * 
 * @example
 * type StringPromise = Promise<string>;
 * type ExtractedType = PromiseType<StringPromise>;
 * // Result: string
 * 
 * // Works with nested promises too:
 * type NestedPromise = Promise<Promise<number>>;
 * type ExtractedNestedType = PromiseType<NestedPromise>;
 * // Result: number
 */
export type PromiseType<T> = T extends Promise<infer U> ? U : T;
