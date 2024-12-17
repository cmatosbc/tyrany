/**
 * Converts a union type to an intersection type
 * Useful when you want to combine multiple types into one type that has all properties
 * 
 * @example
 * type A = { a: string };
 * type B = { b: number };
 * type Union = A | B;
 * type Intersection = UnionToIntersection<Union>;
 * // Result: { a: string } & { b: number }
 */
export type UnionToIntersection<U> =
  (U extends any ? (x: U) => any : never) extends (x: infer R) => any
    ? R
    : never;
