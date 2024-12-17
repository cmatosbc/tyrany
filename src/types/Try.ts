/**
 * Try.ts
 * 
 * This file contains a utility type `Try` that represents a value that can either be 
 * a successful result of type `T` or an error of type `E`.
 * 
 * @template T - The type of the successful result.
 * @template E - The type of the error.
 * 
 * @example
 * // Example usage
 * type Result = Try<string, Error>;
 * 
 * // Result can be either a string or an Error
 * const success: Result = "Success";
 * const failure: Result = new Error("Something went wrong");
 */

export type Try<T, E> = { success: true; value: T } | { success: false; error: E };
