/**
 * Makes all properties in an object (and its nested objects) readonly
 * 
 * @example
 * type User = {
 *   name: string;
 *   settings: {
 *     theme: string;
 *   };
 * };
 * 
 * type ReadonlyUser = DeepReadonly<User>;
 * // Result:
 * // {
 * //   readonly name: string;
 * //   readonly settings: {
 * //     readonly theme: string;
 * //   };
 * // }
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
