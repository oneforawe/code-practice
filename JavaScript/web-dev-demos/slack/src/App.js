import {useStickyState, useStickyInitialState} from './CustomHooks';
import {channels, generatePeople, generateSelf} from './data-basic';
import {generateChatThreadsData} from './data-chats';
import ChatPane from './ChatPane';
import ChatInput from './ChatInput';


function App() {
  /* Need to generate initial incarnations of self, people, and chatThreadsData
     for the initialState in useStickyState.  No need to use the setting funcs. */
  const [[selfInit, peopleInit], setNewPeopleInit] = useStickyInitialState(
    "state-for-slack-mockup-initial-people",
    [generateSelf(), generatePeople()]
  );
  const [chatThreadsDataInit, setNewChatInit] = useStickyInitialState(
    "state-for-slack-mockup-initial-chat",
    generateChatThreadsData(selfInit, channels, peopleInit)
  );
  const [state, setSlackState, resetSlackChat, reGenSlackChat] = useStickyState(
    'state-for-slack-mockup',
    {
      threadsType: 'channel',
      threadID: 1,
      displayName: '# general',
      chatThreadsData: chatThreadsDataInit,
      channels: channels,
      people: peopleInit,
      self: selfInit,
    },
    setNewPeopleInit,
    setNewChatInit,
  );

  return (
    <div className="App">
      <Nav
        state={state}
        setSlackState={setSlackState}/>
      <Content
        state={state}
        setSlackState={setSlackState}
        resetSlackChat={resetSlackChat}
        reGenSlackChat={reGenSlackChat}/>
    </div>
  );
};


function Nav({state, setSlackState}) {
  return (
    <div className="Nav">
      <h1>Channels</h1>
        <div className="threads">
          <ThreadsLinks
            state={state}
            setSlackState={setSlackState}
            linkedThreadsType="channel"/>
        </div>
      <h1>People</h1>
        <div className="threads">
          <ThreadsLinks
            state={state}
            setSlackState={setSlackState}
            linkedThreadsType="direct"/>
        </div>
    </div>
  );
};

const ThreadsLinks = ({
  state,
  setSlackState,
  linkedThreadsType
}) => {
  let threadsInfo;
  if (linkedThreadsType === 'channel') threadsInfo = state.channels;
  if (linkedThreadsType === 'direct')  threadsInfo = state.people;
  return (
    <>
      {threadsInfo.map((threadInfo) => {
        let ifSelected =
          (linkedThreadsType === state.threadsType &&
            threadInfo.id === state.threadID) ? " selected" : "";
        return (
          <div
            key={threadInfo.id}
            className={'thread-link ' +
              `${linkedThreadsType} id-${threadInfo.id}${ifSelected}`}
            onClick={() =>
              selectThread(state, setSlackState, linkedThreadsType, threadInfo)}
          >
            <span className="thread-name">
              {threadInfo.displayName}
            </span>
          </div>
        );
      })}
    </>
  );
};

const selectThread = (state, setSlackState, selectedType, selectedInfo) => {
  if (selectedType !== state.threadsType || selectedInfo.id !== state.threadID) {
    let oldThread =
      document.querySelector(`.${state.threadsType}.id-${state.threadID}`);
    oldThread.classList.remove("selected");
    setSlackState( currState => ({
      ...currState,
      threadsType: selectedType,
      threadID: selectedInfo.id,
      displayName: selectedInfo.displayName
    }) );
  };
};


function Content({state, setSlackState, resetSlackChat, reGenSlackChat}) {
  // use state to get the correct chat thread
  let threadsDataType = `${state.threadsType}ThreadsData`;
  let threadIndex = state.threadID - 1;
  let currentThreadData =
    state.chatThreadsData[threadsDataType][threadIndex].data;

  return (
    <div className="Content">
      <ChatPane
        state={state}
        threadData={currentThreadData}/>
      <ChatInput
        state={state}
        threadsDataType={threadsDataType}
        threadIndex={threadIndex}
        threadData={currentThreadData}
        setSlackState={setSlackState}
        resetSlackChat={resetSlackChat}
        reGenSlackChat={reGenSlackChat}/>
    </div>
  );
};


export default App;