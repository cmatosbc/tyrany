/**
 * Removes readonly modifier from all properties in a type
 * Useful when you need to modify properties of a readonly type
 * 
 * @example
 * type ReadonlyUser = {
 *   readonly id: number;
 *   readonly name: string;
 * };
 * 
 * type MutableUser = Mutable<ReadonlyUser>;
 * // Result:
 * // {
 * //   id: number;
 * //   name: string;
 * // }
 */
export type Mutable<T> = T extends readonly any[]
  ? T extends readonly (infer U)[]
    ? U[]
    : never
  : {
      -readonly [P in keyof T]: T[P] extends object
        ? Mutable<T[P]>
        : T[P];
    };
