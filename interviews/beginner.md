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
