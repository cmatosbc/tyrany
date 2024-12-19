import { IntersectKeys } from '../..';
import { expectType } from './test-utils';

describe('IntersectKeys', () => {
  it('should extract common keys between two types', () => {
    type TypeA = {
      name: string;
      age: number;
      email: string;
    };

    type TypeB = {
      name: string;
      age: number;
      phone: string;
    };

    type Expected = 'name' | 'age';

    // Type-level test
    expectType<IntersectKeys<TypeA, TypeB>, Expected>({} as any);
  });

  it('should handle types with no common keys', () => {
    type TypeA = {
      email: string;
      username: string;
    };

    type TypeB = {
      phone: number;
      address: string;
    };

    // Type-level test
    expectType<IntersectKeys<TypeA, TypeB>, never>({} as any);
  });

  it('should handle types with all common keys', () => {
    type TypeA = {
      id: number;
      name: string;
    };

    type TypeB = {
      id: string; // Different type but same key
      name: number; // Different type but same key
    };

    type Expected = 'id' | 'name';

    // Type-level test
    expectType<IntersectKeys<TypeA, TypeB>, Expected>({} as any);
  });

  it('should work with nested object types', () => {
    type TypeA = {
      user: {
        id: number;
        profile: {
          avatar: string;
        };
      };
      settings: boolean;
    };

    type TypeB = {
      user: {
        id: string;
        profile: {
          theme: string;
        };
      };
      settings: string;
    };

    type Expected = 'user' | 'settings';

    // Type-level test
    expectType<IntersectKeys<TypeA, TypeB>, Expected>({} as any);
  });
});
