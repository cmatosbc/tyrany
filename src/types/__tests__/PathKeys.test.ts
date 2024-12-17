import { PathKeys } from '../PathKeys';
import { expectType } from './test-utils';

describe('PathKeys', () => {
  it('should handle flat objects', () => {
    interface FlatObject {
      id: number;
      name: string;
    }

    type Result = PathKeys<FlatObject>;
    type Expected = 'id' | 'name';

    expectType<Result, Expected>(true);
  });

  it('should handle nested objects', () => {
    interface NestedObject {
      user: {
        id: number;
        profile: {
          name: string;
        };
      };
    }

    type Result = PathKeys<NestedObject>;
    type Expected = 'user' | 'user.id' | 'user.profile' | 'user.profile.name';

    expectType<Result, Expected>(true);
  });

  it('should handle arrays as leaf nodes', () => {
    interface WithArray {
      id: number;
      items: string[];
      nested: {
        tags: string[];
        meta: {
          flags: boolean[];
        };
      };
    }

    type Result = PathKeys<WithArray>;
    type Expected = 'id' | 'items' | 'nested' | 'nested.tags' | 'nested.meta' | 'nested.meta.flags';

    expectType<Result, Expected>(true);
  });

  it('should handle optional properties', () => {
    interface WithOptional {
      required: string;
      optional?: {
        value: number;
      };
    }

    type Result = PathKeys<WithOptional>;
    type Expected = 'required' | 'optional' | 'optional.value';

    expectType<Result, Expected>(true);
  });

  it('should handle methods as leaf nodes', () => {
    interface WithMethods {
      id: number;
      getName(): string;
      profile: {
        getAge(): number;
        address: string;
      };
    }

    type Result = PathKeys<WithMethods>;
    type Expected = 'id' | 'getName' | 'profile' | 'profile.getAge' | 'profile.address';

    expectType<Result, Expected>(true);
  });

  it('should handle complex nested structure', () => {
    interface Complex {
      user: {
        profile: {
          name: string;
          address: {
            street: string;
            city: string;
            country: {
              code: string;
              name: string;
            };
          };
        };
        settings: {
          theme: string;
          notifications: {
            email: boolean;
            push: boolean;
          };
        };
      };
    }

    type Result = PathKeys<Complex>;
    type Expected = 
      | 'user'
      | 'user.profile'
      | 'user.profile.name'
      | 'user.profile.address'
      | 'user.profile.address.street'
      | 'user.profile.address.city'
      | 'user.profile.address.country'
      | 'user.profile.address.country.code'
      | 'user.profile.address.country.name'
      | 'user.settings'
      | 'user.settings.theme'
      | 'user.settings.notifications'
      | 'user.settings.notifications.email'
      | 'user.settings.notifications.push';

    expectType<Result, Expected>(true);
  });
});
