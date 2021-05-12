import {useEffect, useState} from "react";


/* Use with complex states (arrays/objects, rather than strings/numbers/etc) */
function useStickyState(key = "sticky", initialValue = undefined, emptyValue) {
  // sticky = stored, reused after refresh or leaving & coming back to webpage
  // a key-value pair in localStorage object stores the sticky state value
  const [value, setValue] = useState(() => {
    const storedValue = window.localStorage.getItem(key);
    return (storedValue === null) ? initialValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const resetValue = () => {
    setValue(initialValue);
  };

  // const clearValue = () => {
  //   setValue(emptyValue);
  // };

  //return [value, setValue, resetValue, clearValue];
  return [value, setValue, resetValue];
};


export {useStickyState};