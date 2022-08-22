import React, { useState } from 'react';
type StateArrayExampleValues = Array<number>;
type StateArrayExampleProps = {
  values?: StateArrayExampleValues;
};

export const StateArrayExample = (
  props: StateArrayExampleProps = { values: [] }
) => {
  const [numbers, setNumbers] = useState<StateArrayExampleValues>([
    ...(props.values || [])
  ]);

  const addNumber = () => {
    setNumbers(previousState => {
      return [...previousState, Math.floor(Math.random() * 1000)];
    });
  };
  const removeNumber = (idx: number) => {
    setNumbers(previousState => {
      const newState = [...previousState];
      newState.splice(idx, 1);
      return [...newState];
    });
  };
  return (
    <>
      <button onClick={addNumber}>Add number</button>
      <ul>
        {numbers.map((n, idx) => (
          <li key={n}>
            {n} -{' '}
            <button
              onClick={() => {
                removeNumber(idx);
              }}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
