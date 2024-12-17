import { DeepPartial } from '../DeepPartial';
import { expectType } from './test-utils';

describe('DeepPartial', () => {
  it('should make all properties optional', () => {
    type Input = {
      id: number;
      name: string;
      email: string;
    };

    type Result = DeepPartial<Input>;
    type Expected = {
      id?: number;
      name?: string;
      email?: string;
    };

    expectType<Result, Expected>(true);
  });

  it('should handle nested objects', () => {
    type Input = {
      user: {
        id: number;
        profile: {
          name: string;
          age: number;
        };
      };
    };

    type Result = DeepPartial<Input>;
    type Expected = {
      user?: {
        id?: number;
        profile?: {
          name?: string;
          age?: number;
        };
      };
    };

    expectType<Result, Expected>(true);
  });

  it('should handle arrays', () => {
    type Input = {
      items: string[];
      matrix: number[][];
      objects: Array<{ id: number; name: string }>;
    };

    type Result = DeepPartial<Input>;
    type Expected = {
      items?: string[];
      matrix?: number[][];
      objects?: Array<{
        id?: number;
        name?: string;
      }>;
    };

    expectType<Result, Expected>(true);
  });

  it('should handle primitive types', () => {
    type Input = string;
    type Result = DeepPartial<Input>;
    type Expected = string;

    expectType<Result, Expected>(true);
  });
});
