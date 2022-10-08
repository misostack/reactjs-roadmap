import React, { useMemo, useState } from 'react';

const Message = (props: { initialColor: string }) => {
  const className = `bg-${props.initialColor}-500`;

  return (
    <>
      <h3 className={className}>Principle 3: Avoid Redundant State</h3>
    </>
  );
};

export default function StateStructurePrinciple3() {
  const [defaultColor, setDefaultColor] = useState('blue');
  const supportedColors = useMemo(() => {
    return ['blue', 'red', 'yellow', 'pink'];
  }, []);
  return (
    <div className="container">
      <h1>StateStructurePrinciples</h1>
      <Message initialColor={defaultColor}></Message>
      <select
        className="px-4 py-3 rounded-full"
        onChange={e => setDefaultColor(e.target.value)}
      >
        {supportedColors.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
