/**
 * Creates a type that only allows the exact properties defined in the type
 * Useful for preventing excess properties in object literals
 * 
 * @example
 * type User = Exact<{
 *   name: string;
 *   age: number;
 * }>;
 * 
 * // This will error:
 * const user: User = {
 *   name: "John",
 *   age: 30,
 *   extra: true // Error: Object literal may only specify known properties
 * };
 */
export type Exact<T> = T extends any[]
  ? T
  : T extends object
  ? {
      [K in keyof T]: Exact<T[K]>;
    } & { [K in keyof T]: T[K] }
  : T;
