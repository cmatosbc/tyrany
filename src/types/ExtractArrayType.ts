/**
 * Extracts the type of elements in an array type
 * Useful when working with array types and you need the element type
 * 
 * @example
 * type StringArray = string[];
 * type ElementType = ExtractArrayType<StringArray>;
 * // Result: string
 * 
 * type UserArray = Array<{ id: number; name: string }>;
 * type User = ExtractArrayType<UserArray>;
 * // Result: { id: number; name: string }
 */
export type ExtractArrayType<T> = T extends (infer U)[] ? U : never;
