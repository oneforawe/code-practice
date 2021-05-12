const displayWinMessage = () => {
  win.classList.remove('hidden');
};

const removeWinMessage = () => {
  win.classList.add('hidden');
};

const isOpen = (element) => {
  isHidden = element.classList.contains('hidden');
  if (isHidden) return false;
  else return true;
};

const openBox = (element) => {
  element.classList.remove('hidden');
  isOpenState = {anyBox: true, infoBox: (element === help), controlBox: (element === menu)};
};

const closeBox = (element) => {
  element.classList.add('hidden');
  isOpenState = {anyBox: false, infoBox: false, controlBox: false};
};

