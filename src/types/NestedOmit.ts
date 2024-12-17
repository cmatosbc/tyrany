/**
 * Removes a property deeply from an object type and its nested objects
 * Similar to Omit but works on nested properties as well
 * 
 * @example
 * type User = {
 *   id: number;
 *   name: string;
 *   settings: {
 *     id: number;
 *     theme: string;
 *   };
 * };
 * 
 * type UserWithoutIds = NestedOmit<User, 'id'>;
 * // Result:
 * // {
 * //   name: string;
 * //   settings: {
 * //     theme: string;
 * //   };
 * // }
 */
export type NestedOmit<T, K extends string | number | symbol> = T extends object
  ? T extends Array<infer U>
    ? Array<NestedOmit<U, K>>
    : {
        [P in keyof T as P extends K ? never : P]: T[P] extends object
          ? NestedOmit<T[P], K>
          : T[P];
      }
  : T;
