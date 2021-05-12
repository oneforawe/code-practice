import { useEffect } from "react";

const ChatPane = ({state, threadData}) => {
  const suggestChat = () => (
    <div className="suggest-chat">Feel free to get the chat going!</div>
  );

  useEffect(() => {
    if (threadData.length > 0) {
      let lastMsgID = threadData.length - 1;
      document.querySelector(`#msg-${lastMsgID}`).scrollIntoView();
    };
  }, [threadData]);

  let welcomeMessage = '';
  if (state.threadsType === 'channel') {
    welcomeMessage = `Welcome to the ${state.displayName} channel.`
  };
  if (state.threadsType === 'direct') {
    welcomeMessage = `Welcome to your direct chat with ${state.displayName}.`
  };

  return (
    <div className="ChatPane">
      {(threadData.length === 0) ? suggestChat() : null }
      {threadData.slice().reverse().map( message => {
        let person =
          (message.senderID === 0) ? state.self[0] : state.people[message.senderID - 1];
        let letter = person.name[0];
        let style = {
          background: `${person.color}`
        };
        return (
          <div key={message.msgID} id={`msg-${message.msgID}`} className="message">
            <div className="message-imagebox" style={style}>{letter}</div>
            <div className="message-right">
              <div className="message-head">
                <div className="message-sender">{person.name}</div>
                <div className="message-time">{message.timeStamp}</div>
              </div>
              <div>{message.text}</div>
            </div>
          </div>
        );
      })}
      <div className="channel-welcome">
        {welcomeMessage}
      </div>
    </div>
  );
};


export default ChatPane;