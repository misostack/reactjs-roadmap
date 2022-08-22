import React, { ChangeEvent, useState } from 'react';

type StateCheckboxListExampleProps = {
  values?: string[];
  options?: {
    text: string;
    value: string;
  }[];
};
export const StateCheckboxListExample = (
  props: StateCheckboxListExampleProps
) => {
  const { values, options } = props;
  const initialCheckedValue: { [key: string]: boolean } = {};
  options?.map(o => {
    initialCheckedValue[`${o.value}`] = values
      ? values?.includes(o.value)
      : false;
    return o;
  });
  const isChecked = (val: string) => {
    return checkedValues[val];
  };
  const [checkedValues, setCheckedValues] = useState<{
    [key: string]: boolean;
  }>(initialCheckedValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setCheckedValues(previousState => ({
      ...previousState,
      [selectedValue]: !previousState[selectedValue]
    }));
  };
  return (
    <>
      <p>{JSON.stringify(checkedValues)}</p>
      {options &&
        options.map(option => (
          <label key={option.value}>
            <input
              type="checkbox"
              value={option.value}
              onChange={handleChange}
              checked={isChecked(option.value)}
            />
            {option.text}
          </label>
        ))}
    </>
  );
};
