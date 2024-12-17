# Tyrany

A comprehensive collection of TypeScript utility types designed to enhance your type-safe development experience.

## Installation

```bash
npm install tyrany
# or
yarn add tyrany
# or
pnpm add tyrany
```

## Utility Types

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
    notifications: true
  },
  posts: [{ id: 1, title: "Hello" }]
};

// TypeScript Error: Cannot modify readonly property
user.settings.theme = "light"; // Error
user.posts[0].title = "Updated"; // Error
```

### Exact<T>
Ensures that an object type only allows the exact properties defined, preventing excess properties.

```typescript
interface UserInput {
  name: string;
  age: number;
}

type ExactUserInput = Exact<UserInput>;

// TypeScript Error: Object literal may only specify known properties
const input: ExactUserInput = {
  name: "John",
  age: 30,
  extra: true // Error: excess property
};
```

### ExtractArrayType<T>
Extracts the type of elements from an array type.

```typescript
type StringArray = string[];
type NumberArray = Array<number>;
type UserArray = Array<{ id: number; name: string }>;

type String = ExtractArrayType<StringArray>; // string
type Number = ExtractArrayType<NumberArray>; // number
type User = ExtractArrayType<UserArray>; // { id: number; name: string }

// Practical example with mapped types
function transformArray<T>(array: T[], transform: (item: ExtractArrayType<T[]>) => string): string[] {
  return array.map(transform);
}
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
    notifications: true
  }
};

// Now properties can be modified
user.id = 2;
user.settings.theme = "light";
```

### NestedOmit<T, K>
Removes a property deeply from an object type and its nested objects.

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

// Removes all 'id' properties at any level
type CleanResponse = NestedOmit<ApiResponse, 'id'>;

// Result:
// {
//   data: {
//     user: {
//       name: string;
//     };
//     metadata: {
//       timestamp: number;
//     };
//   };
// }
```

### NonNullable<T>
Removes null and undefined from object properties.

```typescript
interface FormData {
  name: string | null;
  email: string | undefined;
  age: number | null;
  bio?: string;
}

type RequiredFormData = NonNullable<FormData>;

// Result:
// {
//   name: string;
//   email: string;
//   age: number;
//   bio: string;
// }
```

### Nullable<T>
Makes all properties in a type nullable (null | undefined).

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type NullableUser = Nullable<User>;

// Useful for partial updates
const userUpdate: NullableUser = {
  id: 1,
  name: null, // Will clear the name
  email: undefined // Will not update the email
};
```

### Optional<T>
Makes all properties in a type optional.

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

type ProductUpdate = Optional<Product>;

// All fields are optional
const update: ProductUpdate = {
  price: 29.99,
  description: "Updated description"
  // Other fields can be omitted
};
```

### PartialKeys<T, K>
Makes specific keys of an object type optional while keeping others required.

```typescript
interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  tags: string[];
}

// Make only 'tags' and 'author' optional
type DraftArticle = PartialKeys<Article, 'tags' | 'author'>;

const draft: DraftArticle = {
  id: 1,
  title: "TypeScript Tips",
  content: "...",
  // tags and author are optional
};
```

### PromiseType<T>
Extracts the type that a Promise resolves to.

```typescript
async function fetchUser() {
  return { id: 1, name: "John" };
}

type FetchUserPromise = ReturnType<typeof fetchUser>;
type User = PromiseType<FetchUserPromise>;

// Useful for API response handling
async function processUser(promise: Promise<unknown>) {
  const user = await promise;
  const typedUser = user as PromiseType<typeof promise>;
  // typedUser is now properly typed
}
```

### RequireAtLeastOne<T>
Makes all properties optional but requires at least one property to be present.

```typescript
interface SearchCriteria {
  name: string;
  email: string;
  phone: string;
  id: number;
}

type SearchQuery = RequireAtLeastOne<SearchCriteria>;

// Valid queries
const byName: SearchQuery = { name: "John" };
const byEmailAndPhone: SearchQuery = { email: "john@example.com", phone: "123456" };

// TypeScript Error: At least one property must be present
const empty: SearchQuery = {}; // Error
```

### UnionToIntersection<T>
Converts a union type to an intersection type.

```typescript
type User = { id: number; name: string };
type Timestamps = { createdAt: Date; updatedAt: Date };
type Metadata = { version: number; isActive: boolean };

type UserUnion = User | Timestamps | Metadata;
type FullUser = UnionToIntersection<UserUnion>;

// Result:
// {
//   id: number;
//   name: string;
//   createdAt: Date;
//   updatedAt: Date;
//   version: number;
//   isActive: boolean;
// }
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.
