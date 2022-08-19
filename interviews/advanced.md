## 1. What are hooks in React?

## 2. What is custom hook in React?

```tsx
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine

import React, { useEffect, useState } from 'react';

export const useNetworkStatus = (defaultStatus: boolean) => {
  const [isOnline, setIsOnline] = useState(defaultStatus);
  // first time
  useEffect(() => {
    const handleNetworkStatusChange = (status: string) => {
      if (status === 'online') {
        return setIsOnline(true);
      }
      // otherwise
      setIsOnline(false);
    };
    window.addEventListener('offline', e => {
      handleNetworkStatusChange('offline');
    });
    window.addEventListener('online', e => {
      handleNetworkStatusChange('online');
    });

    return () => {};
  }, []);

  return isOnline;
};

export const StateUpdateExample = () => {
  // create state
  const isOnline = useNetworkStatus(navigator.onLine);

  return (
    <>
      <h1>Your network is {isOnline ? 'online' : 'offline'}</h1>
    </>
  );
};
```
