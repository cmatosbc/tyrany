/**
 * Makes all properties in an object optional recursively
 * Works with nested objects and arrays
 * 
 * @example
 * type User = {
 *   name: string;
 *   age: number;
 *   address: {
 *     street: string;
 *     city: string;
 *     country: string;
 *   };
 *   hobbies: string[];
 * };
 * 
 * type PartialUser = DeepPartial<User>;
 * // Result:
 * // {
 * //   name?: string;
 * //   age?: number;
 * //   address?: {
 * //     street?: string;
 * //     city?: string;
 * //     country?: string;
 * //   };
 * //   hobbies?: Array<string | undefined>;
 * // }
 */
export type DeepPartial<T> = T extends object
  ? T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : { [P in keyof T]?: DeepPartial<T[P]> }
  : T;
