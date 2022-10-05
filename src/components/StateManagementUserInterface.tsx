import React, { useState } from 'react';
interface LightBulbProps {
  id: number;
  status: 'on' | 'off';
}
interface LightBulbStates {
  lightBulbs: LightBulbProps[];
  powerStatus: 'on' | 'off';
}

interface PowerSwitchProps {
  status: 'on' | 'off';
  switchPowerState: (status: 'on' | 'off') => void;
}

const PowerSwitch = (props: PowerSwitchProps) => {
  const { status, switchPowerState } = props;
  const iconName = status === 'on' ? 'toggle_on' : 'toggle_off';
  const oppositeStatus = status === 'on' ? 'off' : 'on';
  return (
    <button
      className="text-center"
      onClick={() => {
        switchPowerState(oppositeStatus);
      }}
    >
      <span className="material-icons-outlined md-48">{iconName}</span>
      <br />
      {status.toUpperCase()}
    </button>
  );
};

const LightBulb = (
  props: LightBulbProps & {
    switchBulbState: (id: number, status: 'on' | 'off') => void;
  }
) => {
  const { id, status } = props;
  const className =
    status === 'on' ? 'material-icons-outlined' : 'material-icons';
  const oppositeStatus = status === 'on' ? 'off' : 'on';
  return (
    <div className="text-center">
      <h2 className="m-4">{id}</h2>
      <button
        onClick={() => {
          props.switchBulbState(id, oppositeStatus);
        }}
        id={`${id}`}
        className={className}
      >
        lightbulb
      </button>
    </div>
  );
};

export default function StateManagementUserInterface() {
  const initialStates: LightBulbStates = {
    lightBulbs: [
      { id: 1, status: 'off' },
      { id: 2, status: 'off' },
      { id: 3, status: 'off' },
      { id: 4, status: 'off' },
      { id: 5, status: 'off' },
      { id: 6, status: 'off' }
    ],
    powerStatus: 'off'
  };
  // define states
  const [lightBulbStates, setLightBulbStates] = useState(
    initialStates.lightBulbs
  );
  const [powerStatus, setPowerStatus] = useState(initialStates.powerStatus);
  // define actions
  const switchBulbState = (bulbId: number, newStatus: 'on' | 'off') => {
    // clone
    const targetBulbIndex = lightBulbStates.findIndex(b => b.id === bulbId);
    const newLightBulbStates = [...lightBulbStates];
    newLightBulbStates[targetBulbIndex].status = newStatus;
    // update status
    setLightBulbStates(newLightBulbStates);
  };
  const switchPowerState = () => {
    setPowerStatus(powerStatus === 'on' ? 'off' : 'on');
  };

  return (
    <div className="container">
      <h1>StateManagementUserInterface</h1>
      <div className="my-2">
        <PowerSwitch
          status={powerStatus}
          switchPowerState={switchPowerState}
        ></PowerSwitch>
      </div>
      <div className="grid grid-cols-6">
        {lightBulbStates.map(bulb => (
          <LightBulb
            switchBulbState={switchBulbState}
            key={bulb.id}
            id={bulb.id}
            status={powerStatus === 'off' ? 'off' : bulb.status}
          />
        ))}
      </div>
    </div>
  );
}
