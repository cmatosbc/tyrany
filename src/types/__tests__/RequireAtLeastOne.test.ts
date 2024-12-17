import { RequireAtLeastOne } from '../RequireAtLeastOne';
import { expectType } from './test-utils';

describe('RequireAtLeastOne', () => {
  it('should require at least one property', () => {
    type Input = {
      email: string;
      phone: string;
      address: string;
    };

    // Valid cases
    const test1: RequireAtLeastOne<Input> = {
      email: 'test@example.com'
    };

    const test2: RequireAtLeastOne<Input> = {
      email: 'test@example.com',
      phone: '123-456-7890',
      address: '123 Main St'
    };

    expect(test1.email).toBe('test@example.com');
    expect(test2.email).toBe('test@example.com');
    expect(test2.phone).toBe('123-456-7890');
    expect(test2.address).toBe('123 Main St');

    type Result = RequireAtLeastOne<Input>;
    type Expected = {
      email?: string;
      phone?: string;
      address?: string;
    } & (
      | { email: string }
      | { phone: string }
      | { address: string }
    );

    expectType<Result, Expected>(true);
  });

  it('should work with specific keys', () => {
    type Input = {
      id: number;
      name: string;
      email: string;
    };

    type Result = RequireAtLeastOne<Input, 'name' | 'email'>;
    type Expected = {
      id: number;
      name?: string;
      email?: string;
    } & (
      | { name: string }
      | { email: string }
    );

    expectType<Result, Expected>(true);
  });

  it('should handle single property types', () => {
    type Input = {
      value: string;
    };

    type Result = RequireAtLeastOne<Input>;
    type Expected = {
      value: string;
    };

    expectType<Result, Expected>(true);

    const test: Result = { value: 'test' };
    expect(test.value).toBe('test');
  });
});
