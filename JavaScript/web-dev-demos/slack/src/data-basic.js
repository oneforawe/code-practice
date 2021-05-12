import randInt from './utils';


const generateChannels = () => {
  let channels = [
    { id: 1, name: "general" },
    { id: 2, name: "help" },
    { id: 3, name: "react" },
    { id: 4, name: "redux" },
    { id: 5, name: "webpack" },
    { id: 6, name: "react-router" },
    { id: 7, name: "typescript" },
  ];

  channels = addDisplayNames(channels, "# ");
  return channels;
}

const generatePeople = () => {
  let people = [
    { id: 1, name: "Jan", email: "test1@test.com",
      passcheck: "4afa87aaf9716a8e622cb36559ca9f13cb0c6d2b434d35562682f694df77b829fccf2bcddd3e5ec45aaf775485b4d27ba9fe878f15e0d39df70e9784c829bab9.ed950e14316994a6"
    },
    { id: 2, name: "Shiloh", email: "test2@test.com",
      passcheck: "c56341369ab97fcc52d1c996094d7b667cabbb4e3383fbdbdeaf212e44cc4625f5a72f5eedd96e503b176e5a993a8405443c4fa560e3ae399d1fbe3a7819ba64.f04d3ff4a7599235"
    },
    { id: 3, name: "Chris", email: "test3@test.com",
      passcheck: "8001c38df45a75f71e0b9b505a33f4255c6901d2afcd5e43642793f9b7ea3bb299ba066d506a86253c31e109082e25433f34f9cb50bcff25e54d32eebefe0740.74a42bedf3b29503"
    },
    { id: 4, name: "Dakota", email: "test5@test.com",
      passcheck: "e957292413be7d287c4c57a156a8132dd703157c1b99bc072e74f03cfef170173a73f3e6e1e6cdcb7c794683c817f388dbcd2ed8acab962b7681d9bf4d944786.2c2ceed01d756e20"
    },
    { id: 5, name: "Pat", email: "test6@test.com",
      passcheck: "6e79d518456c320467d27ddc871281978b3437e158c3be0e50778eb2ccaaad5593573f0013010a75b81bc9f3a6d63e72fafbb2c9026f0c119e995391041b6e2f.380c9497ddf720bd"
    },
    { id: 6, name: "Jamie", email: "test7@test.com",
      passcheck: "b9778d41c98372a5ae342c9877270015f9a4a71143abf72b53e3742ceaf50f89782d5924b3bd97cfc3579decf9a38ca478101ceecedf9e6e29c641267bc42afc.24a82adb3d84420e"
    },
  ];

  people = addDisplayNames(people, "");
  people = addPersonalColors(people);

  return people;
};

const generateSelf = () => {
  let self = [
    { id: 0, name: "Me", email: "me@self.com",
      passcheck: "gobbledegook"
    }
  ];

  self = addDisplayNames(self, "");
  self = addPersonalColors(self);

  return self;
};


const addDisplayNames = (array, prefixSymbol) => {
  return array.map( thread =>
    ({...thread, displayName: `${prefixSymbol}${thread.name}`}) );
};

const addPersonalColors = (people) => {
  const randColorNum = () => randInt(255);
  const randColor = () => {
    return `rgb(${randColorNum()}, ${randColorNum()}, ${randColorNum()})`;
  };
  return people.map( person =>
    ({...person, color: randColor()}) );
};


let channels = generateChannels();


export {channels, generatePeople, generateSelf};