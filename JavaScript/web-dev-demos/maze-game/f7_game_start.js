isGameWon = false;

let isInfoBoxOpen = help.classList.contains('hidden');
let isControlBoxOpen = menu.classList.contains('hidden');
let isAnyBoxOpen = (isInfoBoxOpen || isControlBoxOpen);
isOpenState = {
  anyBox: isAnyBoxOpen,
  infoBox: isInfoBoxOpen,
  controlBox: isControlBoxOpen
};
// By design, only one box should be open at a time.