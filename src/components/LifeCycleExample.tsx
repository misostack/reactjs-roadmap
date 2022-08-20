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
  // phases
  // Mounting
  // These methods are called in the following order when an instance of a component is being created and inserted into the DOM:
  // constructor, static getDerivedStateFromProps, render, componentDidMount
  // Updating
  // An update can be caused by changes to **props** or **state**. These methods are called in the following order when a component is being re-rendered:
  // - static getDerivedStateFromProps(), shouldComponentUpdate, render, getSnapshotBeforeUpdate, componentDidUpdate
  // Unmounting
  // This method is called when a component is being removed from the DOM:
  // - componentWillUnmount()
  // Error Handling
  // These methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.
  // - static getDerivedStateFromError(), componentDidCatch()
  // Each component also provides some other APIs:
  // - setState, forceUpdate
  // Class Properties
  // - defaultProps, displayName
  // Instance Properties
  // - props, state

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
        time: new Date(),
        timerObject: {
          count: this.state.timerObject.count + 1
        }
      });
      console.log('this.state.timerObject.count', this.state.timerObject.count);
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
