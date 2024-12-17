/**
 * Makes all properties in a type optional
 * Similar to Partial<T> but more explicit in naming
 * 
 * @example
 * type User = {
 *   id: number;
 *   name: string;
 *   email: string;
 * };
 * 
 * type OptionalUser = Optional<User>;
 * // Result:
 * // {
 * //   id?: number;
 * //   name?: string;
 * //   email?: string;
 * // }
 */
export type Optional<T> = {
  [P in keyof T]?: T[P];
};
