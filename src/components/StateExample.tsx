import React from 'react';
import { PropExample } from './PropExample';

export class Example {
  private title?: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private description!: string;

  constructor(title: string) {
    this.title = title;
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  toJSON() {
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
    const { example } = this.state as { example: Example };
    return (
      <>
        <PropExample example={example}></PropExample>
      </>
    );
  }
}
