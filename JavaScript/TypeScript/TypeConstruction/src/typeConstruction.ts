type Digits = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type UpperCaseHexaDecLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
type LowerCaseHexaDecLetter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f';

type UpperCaseHexaDecChar = Digits | UpperCaseHexaDecLetter;
type LowerCaseHexaDecChar = Digits | LowerCaseHexaDecLetter;

// For a proper CSS Color type, I need six characters.
// I can construct up to four characters, but at five typescript can't handle it anymore.
type CssColorUpper =
  //`#${UpperCaseHexaDecChar}${UpperCaseHexaDecChar}${UpperCaseHexaDecChar}${UpperCaseHexaDecChar}${UpperCaseHexaDecChar}${UpperCaseHexaDecChar}`;
  //`#${UpperCaseHexaDecChar}${UpperCaseHexaDecChar}${UpperCaseHexaDecChar}${UpperCaseHexaDecChar}${UpperCaseHexaDecChar}`;
  `#${UpperCaseHexaDecChar}${UpperCaseHexaDecChar}${UpperCaseHexaDecChar}${UpperCaseHexaDecChar}`;

// type CssColorLower =
//   `#${LowerCaseHexaDecChar}${LowerCaseHexaDecChar}${LowerCaseHexaDecChar}${LowerCaseHexaDecChar}${LowerCaseHexaDecChar}${LowerCaseHexaDecChar}`;

//type CssColor = CssColorUpper | CssColorLower;

type NoteColor =
  'turquoise' | 'greenishYellow' | 'darkPink' | 'pink' |
  'orange' | 'hotPink' | 'skyBlue' | 'yellowishGreen' |
  'red' | 'lightYellow' | 'lightPurple' | 'faintBlue' |
  'lightGreen' | 'faintGreen' | 'gold' | 'lightBlue';

type ColorNameMap<T> = { [color in NoteColor]: T };

const colorNameToCode: ColorNameMap<CssColorUpper> = {
  //'turquoise': '#71CAC4',
  'turquoise': '#71CA',              // up to four characters works
  //'greenishYellow': '#E2E647',
  'greenishYellow': '#E2E64',
  'darkPink': '#F3778F',
  'pink': '#F49EBB',
  'orange': '#FBAD4B',
  'hotPink': '#EF67A5',
  'skyBlue': '#51C5EA',
  'yellowishGreen': '#B5D663',
  'red': '#F0595E',
  'lightYellow': '#FFFF99',
  'lightPurple': '#CC9CC6',
  'faintBlue': '#B0CDEB',
  'lightGreen': '#78C47A',
  'faintGreen': '#CFE3D8',
  'gold': '#FFD81B',
  'lightBlue': '#9DBDE3',
}

function getColorCodeFromName (colorName: NoteColor) {
  return colorNameToCode[colorName];
}