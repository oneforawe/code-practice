import randInt from './utils';


const generateChatThreadsData = (self, channels, people) => {
  let chatThreadsData = {
    channelThreadsData: channels.map(channel => ({id: channel.id, data: []})),
    directThreadsData:  people.map(channel => ({id: channel.id, data: []}))
  };

  channels.forEach( (channel, index) => {
    chatThreadsData.channelThreadsData[index].data =
      randMsgsForAThread(self, people);
  });

  people.forEach( (person, index) => {
    chatThreadsData.directThreadsData[index].data =
      randMsgsForAThread(self, [person]);
  });

  return chatThreadsData;
};

const randMsgsForAThread = (self, people) => {
  /* Note: All I need in each msg is msgID sender-id, timestamp, message. */
  // Let's generate no more than 22 messages
  let numberOfMessages = randInt(22);
  let messages = [];
  let ids = [self[0].id, ...people.map(person => person.id)];
  let numberOfPeople = ids.length;
  let timeObj = new Date();
  for (let i = 0; i < numberOfMessages; i++) {
    let randIndex = randInt(numberOfPeople - 1)
    let newMsg = {
      msgID: i,
      senderID: ids[randIndex],
      timeStamp: timeObj.toString(),
      text: randMsg()
    };
    messages.push(newMsg);
  }
  return messages;
};

const randMsg = () => {
  let msgOptions = [
    "Nice to meet you!",
    "Oh, no, you go first.",
    "Thank you. You're too kind.",
    "The reports have been submitted, five weeks ahead of schedule.",
    "Did you know that we've had 2000% growth over the past year?",
    "Accusamus tempora nesciunt cum at laboriosam esse, eaque animi " +
      "doloribus suscipit, soluta corporis veritatis corrupti inventore.  " +
      "Cum nostrum officia nihil quia doloribus?",
    "I just wanted to jump in this chat and congratulate everyone again on " +
      "last week's delivery.",
    "Facilis eos quos natus ipsam nisi maiores sequi, odio cum vel ea.  " +
      "Adipisci rem repudiandae a sed debitis!  Eaque repudiandae expedita " +
      "distinctio asperiores, excepturi facilis ipsam!  Illo, distinctio " +
      "molestiae ullam possimus sint dolor quo praesentium, unde asperiores " +
      "adipisci, assumenda ipsam deleniti animi?",
    "Would you like to get back to what you were saying about how this is " +
      "your dream job?",
    "Hold on, let me go open the gate; our customers sent a truck load of " +
      "roses, doughnuts, and kittens just to thank us all!",
    "That's why I love this place.  Could it get any better?",
    "I just made another sale. It's just too easy!",
  ];
  let numOfOptions = msgOptions.length;

  return msgOptions[randInt(numOfOptions - 1)];
};


export {generateChatThreadsData};