/**
 * Creates a type that requires at least one of the specified properties
 * Useful when you need to ensure at least one property is provided
 * 
 * @example
 * type ContactInfo = {
 *   email: string;
 *   phone: string;
 *   address: string;
 * };
 * 
 * type ContactForm = RequireAtLeastOne<ContactInfo>;
 * // This is valid:
 * const contact1: ContactForm = { email: "user@example.com" };
 * const contact2: ContactForm = { phone: "123-456-7890", address: "123 Main St" };
 * 
 * // This will error:
 * const contact3: ContactForm = {}; // Error: At least one property must be provided
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Omit<T, Keys> & { [K in Keys]?: T[K] } & {
    [K in Keys]: Pick<T, K>
  }[Keys];
