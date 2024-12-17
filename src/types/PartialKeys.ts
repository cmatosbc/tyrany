/**
 * Makes specific keys of an object type optional while keeping others required
 * 
 * @example
 * type User = {
 *   id: number;
 *   name: string;
 *   email: string;
 * };
 * 
 * type UserWithOptionalContact = PartialKeys<User, 'email' | 'name'>;
 * // Result:
 * // {
 * //   id: number;
 * //   name?: string;
 * //   email?: string;
 * // }
 */
export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
