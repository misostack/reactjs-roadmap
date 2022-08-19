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

  updateMousePointerTouch = (event: TouchEvent) => {
    this.setState({ x: event.touches[0].clientX, y: event.touches[0].clientY });
  };

  componentDidMount() {
    window.addEventListener('mousemove', this.updateMousePointer);
    window.addEventListener('touchmove', this.updateMousePointerTouch);
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
