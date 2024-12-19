/**
 * Creates a deeply readonly version of a type, making all properties and nested objects immutable.
 * 
 * @template T - The type to make deeply readonly
 * @returns A new type with all properties and nested objects marked as readonly
 * 
 * @example
 * ```typescript
 * interface User {
 *   name: string;
 *   settings: {
 *     theme: string;
 *     notifications: boolean;
 *   };
 * }
 * 
 * type FrozenUser = DeepFreeze<User>;
 * // Result:
 * // {
 * //   readonly name: string;
 * //   readonly settings: {
 * //     readonly theme: string;
 * //     readonly notifications: boolean;
 * //   };
 * // }
 * ```
 */
export type DeepFreeze<T> = { readonly [P in keyof T]: T[P] extends object ? DeepFreeze<T[P]> : T[P]; };