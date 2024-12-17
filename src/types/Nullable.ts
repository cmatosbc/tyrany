/**
 * Makes all properties in a type nullable (can be null)
 * Useful when dealing with partial data or optional fields
 * 
 * @example
 * type User = {
 *   id: number;
 *   name: string;
 *   email: string;
 * };
 * 
 * type NullableUser = Nullable<User>;
 * // Result:
 * // {
 * //   id: number | null;
 * //   name: string | null;
 * //   email: string | null;
 * // }
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
