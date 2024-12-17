import { DeepReadonly } from '../DeepReadonly';
import { expectType } from './test-utils';

describe('DeepReadonly', () => {
  it('should make all properties readonly at all levels', () => {
    type Input = {
      name: string;
      age: number;
      settings: {
        theme: string;
        notifications: {
          email: boolean;
        };
      };
    };

    type Expected = {
      readonly name: string;
      readonly age: number;
      readonly settings: {
        readonly theme: string;
        readonly notifications: {
          readonly email: boolean;
        };
      };
    };

    // Type-level test
    expectType<DeepReadonly<Input>, Expected>(true);

    // Runtime test to demonstrate usage
    const input: DeepReadonly<Input> = {
      name: 'John',
      age: 30,
      settings: {
        theme: 'dark',
        notifications: {
          email: true,
        },
      },
    };

    // These should cause TypeScript errors (uncomment to test):
    // input.name = 'Jane';
    // input.settings.theme = 'light';
    // input.settings.notifications.email = false;

    // Assert the structure is maintained
    expect(input).toEqual({
      name: 'John',
      age: 30,
      settings: {
        theme: 'dark',
        notifications: {
          email: true,
        },
      },
    });
  });

  it('should handle arrays correctly', () => {
    type Input = {
      items: { id: number; value: string }[];
    };

    type Expected = {
      readonly items: readonly {
        readonly id: number;
        readonly value: string;
      }[];
    };

    expectType<DeepReadonly<Input>, Expected>(true);
  });

  it('should handle primitive types', () => {
    type Input = string;
    type Result = DeepReadonly<Input>;
    
    // Primitive types should remain unchanged
    expectType<Result, string>(true);
  });
});
