/**
 * Extracts the return type of an async function, removing the Promise wrapper.
 * 
 * @example
 * ```typescript
 * async function fetchUser() {
 *   return { id: 1, name: 'John' };
 * }
 * 
 * type User = AsyncReturnType<typeof fetchUser>; // { id: number; name: string; }
 * ```
 */
export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : never;
