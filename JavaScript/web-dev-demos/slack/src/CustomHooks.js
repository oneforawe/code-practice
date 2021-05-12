import {useEffect, useState} from "react";
import {channels, generatePeople, generateSelf} from './data-basic';
import {generateChatThreadsData} from './data-chats';


/* Use with complex states (arrays/objects, rather than strings/numbers/etc) */
//function useStickyState(key = "sticky", initialValue = undefined, emptyValue) {
function useStickyState(
  key = "sticky", 
  initialValue = undefined,
  setNewPeopleInit,
  setNewChatInit,
) {
  // sticky = stored, reused after refresh or leaving & coming back to webpage
  // a key-value pair in localStorage object stores the sticky state value
  const [value, setValue] = useState(() => {
    const storedValue = window.localStorage.getItem(key);
    return (storedValue === null) ? initialValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const resetValueChat = (threadsType, threadID, displayName) => {
    setValue({...initialValue, threadsType, threadID, displayName});
  };

  const reGenValue = () => {
  //const reGenValue = (channels, people, self, chatThreadsDataNew) => {
    //window.localStorage.removeItem(key);  // can delete this?
    let self = generateSelf();
    let people = generatePeople();
    let chatThreadsData = generateChatThreadsData(self, channels, people);
    setValue(currValue => ({
      ...currValue,
      chatThreadsData,
      people,
      self,
    }));
    setNewPeopleInit([self, people]);
    setNewChatInit(chatThreadsData);
  };

  // const clearValue = () => {
  //   setValue(emptyValue);
  // };

  //return [value, setValue, resetValue, clearValue];
  return [value, setValue, resetValueChat, reGenValue];
};


function useStickyInitialState(key = "sticky", initialValue = undefined) {
  // sticky = stored, reused after refresh or leaving & coming back to webpage
  // a key-value pair in localStorage object stores the sticky state value
  const [value, setValue] = useState(() => {
    const storedValue = window.localStorage.getItem(key);
    return (storedValue === null) ? initialValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};


export {useStickyState, useStickyInitialState};