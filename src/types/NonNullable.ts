/**
 * Makes all properties in an object non-nullable (removes null and undefined)
 * Works recursively on nested objects and arrays
 * 
 * @example
 * type User = {
 *   name: string | null;
 *   age: number | undefined;
 *   address?: {
 *     street: string | null;
 *     city: string | undefined;
 *   };
 * };
 * 
 * type RequiredUser = NonNullable<User>;
 * // Result:
 * // {
 * //   name: string;
 * //   age: number;
 * //   address: {
 * //     street: string;
 * //     city: string;
 * //   };
 * // }
 */
export type NonNullable<T> = T extends object
  ? T extends Array<infer U>
    ? Array<NonNullable<U>>
    : {
        [P in keyof T]-?: NonNullable<NonNullable<T[P]>>;
      }
  : T extends null | undefined
  ? never
  : T;
