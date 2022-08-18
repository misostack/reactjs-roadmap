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
