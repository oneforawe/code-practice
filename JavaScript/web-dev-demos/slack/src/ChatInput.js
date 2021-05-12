import {useState, useEffect} from 'react';


const ChatInput = ({
  state,
  threadsDataType,
  threadIndex,
  threadData,
  setSlackState,
  resetSlackChat,
  reGenSlackChat,
}) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    const reGenButton = document.querySelector('button[type="button"]');
    reGenButton.addEventListener('click', reGenSlackChat);
    // clean-up for when ChatInput component unmounts
    return () => {
      reGenButton.removeEventListener('click', reGenSlackChat);
    };
  }, []); // empty dependency array => run once, on mounting

  const handleSubmit = (
    e, threadsDataType, threadIndex, threadData, setSlackState
  ) => {
    e.preventDefault();
    let timeObj = new Date();
    let newMsg = {
      msgID: threadData.length,
      senderID: 0,
      timeStamp: timeObj.toString(),
      text: input 
    };
    setSlackState(currState => {
      let threadsLength = currState.chatThreadsData[threadsDataType].length;
      return (
        {
          ...currState,
          chatThreadsData:
          {
            ...currState.chatThreadsData,
            [threadsDataType]:
              [
                ...currState.chatThreadsData[threadsDataType].slice(0, threadIndex),
                {
                  id: threadIndex,
                  data: [...currState.chatThreadsData[threadsDataType][threadIndex].data, newMsg]
                },
                ...currState.chatThreadsData[threadsDataType].slice(threadIndex + 1, threadsLength)
              ]
          }
        }
      );
    });
    setInput('');
  };

  const handleReset = (e, state) => {
    let {threadsType, threadID, displayName} = state;
    resetSlackChat(threadsType, threadID, displayName);
    setInput('');
  };

  return (
    <div className="input-container">
      <form
        onSubmit={e => handleSubmit(
          e, threadsDataType, threadIndex, threadData, setSlackState)}
        onReset={e => handleReset(e, state)}
      >
        <input
          type="text"
          className="input"
          placeholder={`Type and press ` +
            `enter to send a message to ${state.displayName}.`}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="reset">ReSet All</button>
        <button type="button">ReGen All</button>
      </form>
    </div>
  );
};


export default ChatInput;