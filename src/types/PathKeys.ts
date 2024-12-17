/**
 * Gets all possible dot-notation paths in an object type.
 * Useful for type-safe access to nested object properties.
 * 
 * @example
 * ```typescript
 * interface User {
 *   name: string;
 *   profile: {
 *     age: number;
 *     address: {
 *       city: string;
 *     }
 *   }
 * }
 * 
 * type Paths = PathKeys<User>;
 * // 'name' | 'profile' | 'profile.age' | 'profile.address' | 'profile.address.city'
 * ```
 */
type Primitive = string | number | boolean | null | undefined | symbol | bigint | Function;

export type PathKeys<T> = T extends Primitive
  ? never
  : T extends any[]
  ? never
  : T extends object
  ? {
      [K in keyof T & string]: T[K] extends Primitive | any[]
        ? K
        : K | `${K}.${PathKeys<T[K]>}`;
    }[keyof T & string]
  : never;
