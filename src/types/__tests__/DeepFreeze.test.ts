import { DeepFreeze } from '../..';
import { expectType } from './test-utils';

describe('DeepFreeze', () => {
  it('should make all properties readonly at all levels', () => {
    type Input = {
      name: string;
      settings: {
        theme: string;
        preferences: {
          notifications: boolean;
          language: string;
        };
      };
      tags: string[];
    };

    type Expected = {
      readonly name: string;
      readonly settings: {
        readonly theme: string;
        readonly preferences: {
          readonly notifications: boolean;
          readonly language: string;
        };
      };
      readonly tags: readonly string[];
    };

    // Type-level test
    expectType<DeepFreeze<Input>, Expected>({} as any);

    // Runtime test to demonstrate usage
    const input: DeepFreeze<Input> = {
      name: 'John',
      settings: {
        theme: 'dark',
        preferences: {
          notifications: true,
          language: 'en',
        },
      },
      tags: ['user', 'admin'],
    };

    // These should cause TypeScript errors (uncomment to test):
    // input.name = 'Jane';
    // input.settings.theme = 'light';
    // input.settings.preferences.notifications = false;
    // input.tags.push('guest');

    // Assert the structure is maintained
    expect(input).toEqual({
      name: 'John',
      settings: {
        theme: 'dark',
        preferences: {
          notifications: true,
          language: 'en',
        },
      },
      tags: ['user', 'admin'],
    });
  });

  it('should handle primitive types', () => {
    type Input = string;
    type Expected = string;

    // Primitive types should remain unchanged
    expectType<DeepFreeze<Input>, Expected>({} as any);
  });

  it('should handle array types', () => {
    type Input = {
      items: Array<{ id: number; value: string }>;
    };

    type Expected = {
      readonly items: ReadonlyArray<{
        readonly id: number;
        readonly value: string;
      }>;
    };

    expectType<DeepFreeze<Input>, Expected>({} as any);
  });

  it('should handle empty objects', () => {
    type Input = {};
    type Expected = {};

    expectType<DeepFreeze<Input>, Expected>({} as any);
  });
});
