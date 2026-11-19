# Tyrany

[![Node.js CI](https://github.com/cmatosbc/tyrany/actions/workflows/node.js.yml/badge.svg)](https://github.com/cmatosbc/tyrany/actions/workflows/node.js.yml)

**A collection of practical TypeScript utility types for safer, more expressive code.**

Tyrany includes a small set of focused async helpers alongside general-purpose object and union types:

- [`Try<T, E>`](#tryt-e) — model success and failure with exhaustive, discriminated branches.
- [`AsyncReturnType<T>`](#asyncreturntypet) — extract the resolved value type of an async function.
- [`PromiseType<T>`](#promisetypet) — unwrap a promise type without manual conditional inference.

## Installation

```bash
npm install tyrany
# or
yarn add tyrany
# or
pnpm add tyrany
```

```typescript
import {
  Try,
  AsyncReturnType,
  PromiseType,
} from "tyrany";
```

## Featured: async result types

### `Try<T, E>`

Represent an operation that can succeed or fail instead of throwing or using ambiguous values:

```typescript
import type { Try } from "tyrany";

interface User {
  id: number;
  name: string;
}

async function fetchUser(id: number): Promise<Try<User, Error>> {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      return {
        success: false,
        error: new Error(`Request failed with status ${response.status}`),
      };
    }

    const user = await response.json() as User;
    return { success: true, value: user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}

const result = await fetchUser(1);

if (result.success) {
  // `result.value` is a User here.
  console.log(result.value.name);
} else {
  // `result.error` is an Error here.
  console.error(result.error.message);
}
```

TypeScript narrows the result using the literal `success` field, so success and failure cannot accidentally access each other's data.

### `AsyncReturnType<T>`

Extract the resolved value of an async function:

```typescript
import type { AsyncReturnType } from "tyrany";

async function fetchUser() {
  return {
    id: 1,
    name: "John",
    roles: ["admin"],
  };
}

type User = AsyncReturnType<typeof fetchUser>;
// {
//   id: number;
//   name: string;
//   roles: string[];
// }

async function loadCount(): Promise<number> {
  return 42;
}

type Count = AsyncReturnType<typeof loadCount>;
// number
```

### `PromiseType<T>`

Extract the resolved type directly from a promise:

```typescript
import type { PromiseType } from "tyrany";

const userPromise: Promise<{ id: number; name: string }> = Promise.resolve({
  id: 1,
  name: "John",
});

type User = PromiseType<typeof userPromise>;
// { id: number; name: string }

// Works for nested promises too.
type NestedResult = PromiseType<Promise<Promise<number>>>;
// number
```

> On modern TypeScript, built-in `Awaited<T>` is a more general alternative for promise unwrapping:
> `type User = Awaited<typeof userPromise>`. Use it by default unless you specifically prefer the `PromiseType` name.

## Utility types

### DeepPartial<T>

Makes all properties in a type optional recursively, including nested objects and arrays.

```typescript
interface Config {
  server: {
    port: number;
    host: string;
    ssl: {
      enabled: boolean;
      cert: string;
    };
  };
  database: {
    url: string;
    timeout: number;
  };
}

// Partial configuration where any property can be omitted
 type PartialConfig = DeepPartial<Config>;

const config: PartialConfig = {
  server: {
    port: 3000,
    // host and ssl can be omitted
  },
  // database can be omitted
};
```

### DeepReadonly<T>

Makes all properties in a type readonly recursively, including nested objects and arrays.

```typescript
interface User {
  id: number;
  name: string;
  settings: {
    theme: string;
    notifications: boolean;
  };
  posts: Array<{
    id: number;
    title: string;
  }>;
}

// All properties become readonly, including nested objects
 type ReadonlyUser = DeepReadonly<User>;

const user: ReadonlyUser = {
  id: 1,
  name: "John",
  settings: {
    theme: "dark",
    notifications: true,
  },
  posts: [{ id: 1, title: "Hello" }],
};

// TypeScript error: cannot modify readonly property
// user.settings.theme = "light";
// user.posts[0].title = "Updated";
```

### Exact<T>

Ensures that an object type only allows the exact properties defined, preventing excess properties.

```typescript
interface UserInput {
  name: string;
  age: number;
}

type ExactUserInput = Exact<UserInput>;

const input: ExactUserInput = {
  name: "John",
  age: 30,
  // extra: true // TypeScript error: excess property
};
```

### ExtractArrayType<T>

Extracts the element type from an array type.

```typescript
type String = ExtractArrayType<string[]>;
// string

type Number = ExtractArrayType<Array<number>>;
// number

type User = ExtractArrayType<Array<{ id: number; name: string }>>;
// { id: number; name: string }
```

### Mutable<T>

Removes readonly modifiers from all properties in a type.

```typescript
interface ReadonlyUser {
  readonly id: number;
  readonly name: string;
  readonly settings: readonly {
    readonly theme: string;
    readonly notifications: boolean;
  };
}

type MutableUser = Mutable<ReadonlyUser>;

const user: MutableUser = {
  id: 1,
  name: "John",
  settings: {
    theme: "dark",
    notifications: true,
  },
};

user.id = 2;
user.settings.theme = "light";
```

### NestedOmit<T, K>

Removes matching properties recursively from an object type.

```typescript
interface ApiResponse {
  id: string;
  data: {
    id: string;
    user: {
      id: string;
      name: string;
    };
    metadata: {
      id: string;
      timestamp: number;
    };
  };
}

type CleanResponse = NestedOmit<ApiResponse, "id">;
// {
//   data: {
//     user: { name: string };
//     metadata: { timestamp: number };
//   };
// }
```

### NonNullable<T>

Removes `null` and `undefined` from object properties.

```typescript
interface FormData {
  name: string | null;
  email: string | undefined;
  age: number | null;
  bio?: string;
}

type RequiredFormData = NonNullable<FormData>;
```

### Nullable<T>

Makes every property in a type nullable with `null | undefined`.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type NullableUser = Nullable<User>;

const userUpdate: NullableUser = {
  id: 1,
  name: null,
  email: undefined,
};
```

### Optional<T>

Makes every property in a type optional.

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
}

type ProductUpdate = Optional<Product>;

const update: ProductUpdate = {
  price: 29.99,
};
```

### PartialKeys<T, K>

Makes selected keys optional while keeping all other keys required.

```typescript
interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  tags: string[];
}

type DraftArticle = PartialKeys<Article, "tags" | "author">;

const draft: DraftArticle = {
  id: 1,
  title: "TypeScript tips",
  content: "...",
};
```

### PathKeys<T>

Gets dot-notation paths from an object type.

```typescript
interface User {
  name: string;
  profile: {
    age: number;
    address: {
      city: string;
      country: string;
    };
  };
}

type UserPath = PathKeys<User>;
// "name" | "profile" | "profile.age" | "profile.address" |
// "profile.address.city" | "profile.address.country"
```

### PickByType<T, V>

Picks properties whose values are assignable to `V`.

```typescript
interface User {
  id: number;
  name: string;
  isAdmin: boolean;
}

type StringProperties = PickByType<User, string>;
// { name: string }

type NumberProperties = PickByType<User, number>;
// { id: number }
```

### PickByValue<T, V>

Picks properties with exact value matching.

```typescript
interface Config {
  port: number;
  host: string;
  debug: boolean;
  timeout: number;
}

type StringSettings = PickByValue<Config, string>;
// { host: string }

type NumberSettings = PickByValue<Config, number>;
// { port: number; timeout: number }
```

### RequireAtLeastOne<T>

Makes every property optional but requires at least one property to be present.

```typescript
interface SearchCriteria {
  name: string;
  email: string;
  phone: string;
  id: number;
}

type SearchQuery = RequireAtLeastOne<SearchCriteria>;

const byName: SearchQuery = { name: "John" }; // valid
const byEmail: SearchQuery = { email: "john@example.com" }; // valid

// const empty: SearchQuery = {}; // error: at least one property required
```

### UnionToArray<T>

Converts a union type into the corresponding array types.

```typescript
type Status = "pending" | "active" | "completed";
type StatusArray = UnionToArray<Status>;
// ("pending")[] | ("active")[] | ("completed")[]

type Numbers = 1 | 2 | 3;
type NumberArray = UnionToArray<Numbers>;
// (1)[] | (2)[] | (3)[]
```

### UnionToIntersection<T>

Converts a union type to an intersection type.

```typescript
type User = { id: number; name: string };
type Timestamps = { createdAt: Date; updatedAt: Date };
type Metadata = { version: number; isActive: boolean };

type Combined = UnionToIntersection<User | Timestamps | Metadata>;
// {
//   id: number;
//   name: string;
//   createdAt: Date;
//   updatedAt: Date;
//   version: number;
//   isActive: boolean;
// }
```

### IntersectKeys<T, U>

Extracts common keys between two types.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface Employee {
  id: string;
  name: number;
  department: string;
}

type CommonKeys = IntersectKeys<User, Employee>;
// "id" | "name"
```

### DeepFreeze<T>

Makes all properties deeply readonly, including nested objects and arrays.

```typescript
interface User {
  name: string;
  settings: {
    theme: string;
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
  tags: string[];
}

type FrozenUser = DeepFreeze<User>;

const user: FrozenUser = {
  name: "John",
  settings: {
    theme: "dark",
    notifications: {
      email: true,
      push: false,
    },
  },
  tags: ["admin", "user"],
};

// user.name = "Jane"; // error
// user.settings.theme = "light"; // error
// user.tags.push("guest"); // error
```

### Diff<T, U>

Excludes properties of `U` from `T`.

```typescript
interface A {
  x: number;
  y: string;
}

interface B {
  y: string;
}

type Result = Diff<A, B>;
// { x: number }
```

## Contributing

Contributions are welcome. Please submit a pull request with tests for new or changed utility types.

## License

MIT License — see [LICENSE](LICENSE) for details.
