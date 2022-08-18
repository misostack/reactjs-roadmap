import React from 'react';

import { Example } from './StateExample';

type PropExampleProps = {
  example: Example;
};

export class PropExample extends React.Component<
  PropExampleProps,
  { example: Example }
> {
  public static propTypes = {};
  constructor(props: { example: Example }) {
    super(props);
    this.state = {
      example: props.example
    };
  }

  render() {
    const { example } = this.state;
    return (
      <>
        <p>{example.toString()}</p>
      </>
    );
  }
}
