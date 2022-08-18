# Interview Questions for Beginner

## 1. How to create components in React?

There are 2 ways to create a component:

**Functional Components**

> It is the simplest way to create a component. It uses pure Javascript functions that accept props and returns a React element.

```jsx
function helloCandidate({ name }) {
  return <h1>{`Hello ${name}!`}</h1>;
}
```

**Class Components**

> On the other hand, uses ES6 class to define a component. The same function component can be rewritten as the following class component

```jsx
class Welcome extends React.Component {
  render() {
    const { name } = this.props;
    return <h1>{`Hello ${name}!`}</h1>;
  }
}
```

## 2.What are states in React?

> State is an object that contain information local to the component that may change over the lifetime of the component

```jsx
import React from 'react';

class Example {
  private title: string;
  private createdAt: Date;
  private updatedAt: Date;
  private description!: string;

  constructor(title: string) {
    this.title = title;
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  toString() {
    return JSON.stringify(this);
  }

  setDescription(description: string) {
    this.description = description;
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  setTitle(title: string) {
    this.title = title;
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }
}

export class StateExample extends React.Component {
  constructor(props: any) {
    super(props);
    // you should init your state here
    const example = new Example('State Example');
    this.state = {
      now: new Date(),
      example
    };
  }

  componentDidMount() {
    // let's do some change on state
    const { example } = this.state as { example: any };
    setInterval(() => {
      example.setTitle(`State Example ${new Date().toString()}`);
      example.setDescription('loirem aispasd asdads');
      const now = new Date(2022, 7, 18, 12, 0, 0);
      this.setState({ now });
    }, 1000);
  }

  render() {
    const { example } = this.state as { example: any };
    return <>{example.toString()}</>;
  }
}

```

## 3.What are props in React?

> Props are one of the most basic ways of passing data between components in ReactJS.

When building an application, you often end up with building a component tree with a hierarchy of components. Oftentimes, you will need to pass the data between components as you go down the tree. These are where props come into play.

In other hand, Props are component's inputs. They can be in the form of a single value or an object containing a set of values that are passed from a parent component to a child component.

## 4. How to validate props in React?

```bash
npm i prop-types
npm i @types/prop-types --save-dev
```

- [Example for prop-types](https://www.npmjs.com/package/prop-types)

But it is javascript with typescript you just need

## 5.Useful cheatsheet for prop type with typescript

```ts
type AppProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** array of a type! */
  names: string[];
  /** string literals to specify exact string values, with a union type to join them together */
  status: 'waiting' | 'success';
  /** any object as long as you dont use its properties (NOT COMMON but useful as placeholder) */
  obj: object;
  obj2: {}; // almost the same as `object`, exactly the same as `Object`
  /** an object with any number of properties (PREFERRED) */
  obj3: {
    id: string;
    title: string;
  };
  /** array of objects! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  /** a dict object with any number of properties of the same type */
  dict1: {
    [key: string]: MyTypeHere;
  };
  dict2: Record<string, MyTypeHere>; // equivalent to dict1
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function;
  /** function that doesn't take or return anything (VERY COMMON) */
  onClick: () => void;
  /** function with named prop (VERY COMMON) */
  onChange: (id: number) => void;
  /** function type syntax that takes an event (VERY COMMON) */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** alternative function type syntax that takes an event (VERY COMMON) */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** an optional prop (VERY COMMON!) */
  optional?: OptionalType;
};
```

> Relevant for components that accept other React components as props.

```ts
export declare interface AppProps {
  children?: React.ReactNode; // best, accepts everything React can render
  childrenElement: JSX.Element; // A single React element
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
  //  more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  props: Props & React.ComponentPropsWithoutRef<'button'>; // to impersonate all the props of a button element and explicitly not forwarding its ref
  props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>; // to impersonate all the props of MyButtonForwardedRef and explicitly forwarding its ref
}
```

### Types or Interfaces?

You can use either Types or Interfaces to type Props and State, so naturally the question arises - which do you use?

- Always use interface for public API's definition when authoring a library or 3rd party ambient type definitions, as this allows a consumer to extend them via declaration merging if some definitions are missing.

- Consider using type for your React Component Props and State, for consistency and because it is more constrained.
