import React, { useEffect, useMemo, useState } from 'react';

const Message = ({ initialColor }: { initialColor: string }) => {
  const [color, setColor] = useState(initialColor);
  const className = `bg-${color}-500`;

  useEffect(() => {
    // update State
    setColor(initialColor);
  }, [initialColor]);
  return (
    <>
      <h3 className={className}>Principle 3: Avoid Redundant State</h3>
      <button
        className={className}
        onClick={() => {
          color === 'green' ? setColor(initialColor) : setColor('green');
        }}
      >
        Switch Color
      </button>
    </>
  );
};

export default function StateStructurePrinciples() {
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
