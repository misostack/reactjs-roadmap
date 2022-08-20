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

## 6.How to pass props through many levels in React?

1. 1st way : Define required props for all parent components
2. 2nd way : Using context

```tsx
import React from 'react';
import { COLORS } from './Tag';

type ContextExampleProps = {
  color: string;
};
type ContextExampleState = {
  level: number;
  color: string;
};
type LevelProps = {
  level: number;
};
type LevelState = {
  number: number;
};
const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(h => {
  if (h === 'h1') {
    return <h1>Heading 1</h1>;
  }
  if (h === 'h2') {
    return <h2>Heading 2</h2>;
  }
  if (h === 'h3') {
    return <h3>Heading 3</h3>;
  }
  if (h === 'h4') {
    return <h4>Heading 4</h4>;
  }
  if (h === 'h5') {
    return <h5>Heading 5</h5>;
  }
  if (h === 'h6') {
    return <h6>Heading 6</h6>;
  }
  return '';
});

const ExampleContext = React.createContext({ color: 'green' });

export class LevelA extends React.Component<LevelProps, LevelState> {
  constructor(props: LevelProps) {
    super(props);
    this.state = {
      number: props.level
    };
  }

  render(): React.ReactNode {
    const { number } = this.state;
    const { color } = this.context as { color: string };
    return (
      <>
        <div className={`bg-${color}-400`}>{HEADINGS[number]}</div>
        {number < HEADINGS.length ? <LevelA level={number + 1} /> : ''}
      </>
    );
  }
}

LevelA.contextType = ExampleContext;

export class ContextExample extends React.Component<
  ContextExampleProps,
  ContextExampleState
> {
  constructor(props: ContextExampleProps) {
    super(props);
    this.state = {
      level: 0,
      color: props.color
    };
  }

  componentDidMount() {
    setInterval(() => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.setState({
        color
      });
    }, 1000);
  }

  render(): React.ReactNode {
    const { level, color } = this.state;
    return (
      <ExampleContext.Provider value={{ color }}>
        <p>{color}</p>
        <LevelA level={level} />
      </ExampleContext.Provider>
    );
  }
}

ContextExample.contextType = ExampleContext;
```

## 7. How do you conditionally render components?

```tsx
import React from 'react';

const MENUS = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'About us',
    link: '/about-us',
    childrens: [
      { title: 'Our Vision', link: '/our-vision' },
      { title: 'The difference', link: '/the-difference' },
      { title: 'Our Top Assets', link: '/our-top-assets' },
      { title: 'Our Offices', link: '/our-offices' }
    ]
  },
  { title: 'Contact', link: '/contact' },
  { title: 'Case Studies', link: '/case-studies' },
  { title: 'Studio', link: '/studio' },
  { title: 'Posts & News', link: '/posts-and-news' },
  { title: 'Careers', link: '/careers' }
];

interface MenuItemProps {
  title: string;
  link: string;
  childrens?: Array<MenuItemProps>;
}

class MenuItem extends React.Component<{ item: MenuItemProps }> {
  render(): React.ReactNode {
    const { title, link, childrens } = this.props.item;
    // eslint-disable-next-line multiline-ternary
    const subMenu = childrens ? (
      <ul style={{ paddingLeft: '20px' }}>
        {childrens.map(item => (
          <MenuItem key={item.title} item={item} />
        ))}
      </ul>
    ) : (
      ''
    );
    return (
      <>
        <li>
          <a href={link}>{title}</a>
          {subMenu}
        </li>
      </>
    );
  }
}

export class MultiLevelMenuExample extends React.Component<
  any,
  { menu: Array<MenuItemProps> }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      menu: MENUS
    };
  }

  render(): React.ReactNode {
    console.log(this.state.menu);
    const { menu } = this.state;
    return (
      <ul>
        {menu.map(item => (
          <MenuItem key={item.title} item={item} />
        ))}
      </ul>
    );
  }
}
```

## 8. State Update is Synchronous or Asynchoronous?

> State Update is Asynchoronous
> React may batch multiple setState calls into a single update for performance(the last wins). Because props and state may be updated asynchronously, you should not rely on their values for calculating the next state.

```tsx
import React from 'react';

type LifeCycleExampleProps = {
  [key: string]: any;
};

type LifeCycleExampleState = {
  [key: string]: any;
};

export class LifeCycleExample extends React.Component<
  LifeCycleExampleProps,
  LifeCycleExampleState
> {
  timerId: any;

  constructor(props: LifeCycleExampleProps) {
    super(props);
    this.state = {
      time: new Date(),
      timerObject: {
        count: 0
      }
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({
        time: new Date()
      });
      const { timerObject } = this.state;
      timerObject.count += 1;
    }, 1000);
  }

  render(): React.ReactNode {
    const { time } = this.state;
    return (
      <>
        <div>
          <h3>LifeCycleExample</h3>
          <Timer time={time} count={this.state.timerObject.count} />
        </div>
      </>
    );
  }
}
type TimerProps = {
  time: Date;
  count: number;
};
const Timer = (props: TimerProps) => {
  const { time, count } = props;
  return (
    <>
      <p>{time.toString()}</p>
      <p>{count}</p>
    </>
  );
};
```

```tsx
import React from 'react';

type LifeCycleExampleProps = {
  [key: string]: any;
};

type LifeCycleExampleState = {
  [key: string]: any;
};

export class LifeCycleExample extends React.Component<
  LifeCycleExampleProps,
  LifeCycleExampleState
> {
  timerId: any;

  constructor(props: LifeCycleExampleProps) {
    super(props);
    this.state = {
      time: new Date(),
      timerObject: {
        count: 0
      }
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({
        timerObject: {
          count: this.state.timerObject.count + 1
        }
      });
      this.setState({
        timerObject: {
          count: this.state.timerObject.count + 2
        }
      });
      this.setState({
        timerObject: {
          count: this.state.timerObject.count + 3
        }
      });
    }, 1000);
  }

  render(): React.ReactNode {
    const { time } = this.state;
    return (
      <>
        <div>
          <h3>LifeCycleExample</h3>
          <Timer time={time} count={this.state.timerObject.count} />
        </div>
      </>
    );
  }
}
type TimerProps = {
  time: Date;
  count: number;
};
const Timer = (props: TimerProps) => {
  const { time, count } = props;
  return (
    <>
      <p>{time.toString()}</p>
      <p>{count}</p>
    </>
  );
};
```

## 9.How to bind methods or event handlers in JSX callbacks?

## 10. What is Synthetic Events in React?

> In order to work as a cross-browser application, React has created a wrapper same as the native browser in order to avoid creating multiple implementations for multiple methods for multiple browsers, creating common names for all events across browsers.

> Does this code work good for cross browsers?

```tsx
import React from 'react';

export class SyntheticEventExample extends React.Component<
  any,
  { x: number; y: number }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    };
  }

  updateMousePointer = (e: MouseEvent) => {
    this.setState({ x: e.x, y: e.y });
  };

  componentDidMount() {
    window.addEventListener('mousemove', this.updateMousePointer);
  }

  render(): React.ReactNode {
    const { x, y } = this.state;
    return (
      <>
        <p>
          X: {x} Y: {y}
        </p>
      </>
    );
  }
}
```
