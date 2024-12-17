import { NestedOmit } from '../NestedOmit';
import { expectType } from './test-utils';

describe('NestedOmit', () => {
  it('should remove property from all levels', () => {
    type Input = {
      id: number;
      name: string;
      settings: {
        id: number;
        theme: string;
      };
    };

    type Result = NestedOmit<Input, 'id'>;
    type Expected = {
      name: string;
      settings: {
        theme: string;
      };
    };

    expectType<Result, Expected>(true);
  });

  it('should handle deeply nested objects', () => {
    type Input = {
      id: number;
      user: {
        id: number;
        profile: {
          id: number;
          name: string;
          settings: {
            id: number;
            theme: string;
          };
        };
      };
    };

    type Result = NestedOmit<Input, 'id'>;
    type Expected = {
      user: {
        profile: {
          name: string;
          settings: {
            theme: string;
          };
        };
      };
    };

    expectType<Result, Expected>(true);
  });

  it('should handle arrays', () => {
    type Input = {
      id: number;
      items: Array<{
        id: number;
        name: string;
      }>;
    };

    type Result = NestedOmit<Input, 'id'>;
    type Expected = {
      items: Array<{
        name: string;
      }>;
    };

    expectType<Result, Expected>(true);
  });

  it('should handle non-existent properties', () => {
    type Input = {
      name: string;
      age: number;
    };

    type Result = NestedOmit<Input, 'id'>;
    type Expected = {
      name: string;
      age: number;
    };

    expectType<Result, Expected>(true);
  });
});
