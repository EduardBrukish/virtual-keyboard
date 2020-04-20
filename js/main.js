const keyboardLayout = {
  eng: [['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ['[', '{'], [']', '}'], ['\\', '|'], 'Del', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', [';', ':'], ['\'', '"'], 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', [',', '<'], ['.', '>'], ['/', '?'], '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'],
  rus: ['ё', ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', ['\\', '/'], 'Del', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ['.', ','], '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'],
};
const functionalKeys = {
  Backspace: true,
  Tab: true,
  Del: true,
  CapsLock: true,
  Enter: true,
  Shift: true,
  Ctrl: true,
  Alt: true,
};
const keyCodes = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8, 9, 81, 87, 69,
  82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46, 20, 65, 83, 68, 70, 71, 72, 74, 75, 76,
  186, 222, 13, 16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 16, 17, 91, 18, 32, 18,
  37, 40, 39, 17];
const body = document.querySelector('body');
const wrapper = document.createElement('div');
const outputText = document.createElement('textarea');
const keyboard = document.createElement('div');
const shiftButtonKeyCode = 16;
const secondOfDuplicatedButtons = 2;
let language = 'eng';
let ctrlTarget = false;
let altTarget = false;
let shiftTarget = 0;
let uppercase = false;

function insertKeyboardLayout(layout) {
  const buttons = [...keyboard.querySelectorAll('.key')];

  for (let i = 0; i < layout.length; i += 1) {
    if (Array.isArray(layout[i])) {
      const layoutElementValue = layout[i][0];
      buttons[i].innerText = layoutElementValue;
    } else if (uppercase && layout[i].length === 1) {
      buttons[i].innerText = layout[i].toUpperCase();
    } else { buttons[i].innerText = layout[i]; }
    switch (true) {
      case (layout[i] === 'Backspace' || layout[i] === 'Enter' || layout[i] === 'Shift' || layout[i] === 'CapsLock'):
        buttons[i].classList.add('wide-key');
        break;
      case (layout[i] === 'Tab' || layout[i] === 'Alt'):
        buttons[i].classList.add('middle-key');
        break;
      case (layout[i] === ' '):
        buttons[i].classList.add('space-key');
        break;
      default: break;
    }
  }
}

function drawKeyboard(keys) {
  for (let i = 0; i < keys.length; i += 1) {
    const key = document.createElement('p');
    key.classList.add('key');
    key.setAttribute('data-key-code', keyCodes[i]);
    keyboard.append(key);
  }
  insertKeyboardLayout(keyboardLayout[language]);
}

function keyboardInit() {
  wrapper.classList.add('wrapper');
  body.append(wrapper);
  outputText.classList.add('output');
  wrapper.append(outputText);
  keyboard.classList.add('keyboard');
  wrapper.append(keyboard);
  const annotation = document.createElement('p');
  annotation.classList.add('annotation');
  annotation.innerText = 'Keyboard was created in Windows OS. To switch the language use: Ctrl + Alt';
  wrapper.append(annotation);

  if (!localStorage.language) {
    localStorage.setItem('language', 'eng');
  } else { language = localStorage.language; }

  drawKeyboard(keyboardLayout[language]);
}

function showOutput(value) {
  outputText.setRangeText(value, outputText.selectionStart, outputText.selectionEnd, 'end');
  outputText.focus();
}

const keyEvents = {
  shift() {
    const buttons = [...keyboard.querySelectorAll('.key')];
    shiftTarget = (shiftTarget === 0) ? 1 : 0;
    for (let i = 0; i < buttons.length; i += 1) {
      if (Array.isArray(keyboardLayout[language][i])) {
        buttons[i].innerText = keyboardLayout[language][i][shiftTarget];
      } else if (buttons[i].innerText.length === 1 && !uppercase) {
        buttons[i].innerText = keyboardLayout[language][i].toUpperCase();
      } else if (buttons[i].innerText.length === 1 && uppercase) {
        buttons[i].innerText = keyboardLayout[language][i].toLowerCase();
      } else { buttons[i].innerText = keyboardLayout[language][i]; }
    }
    uppercase = !uppercase;
  },

  capslock() {
    const keys = [...keyboard.querySelectorAll('.key')];
    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i].innerText.length === 1 && !uppercase) {
        keys[i].innerText = keys[i].innerText.toUpperCase();
      } else if (keys[i].innerText.length === 1 && uppercase) {
        keys[i].innerText = keys[i].innerText.toLowerCase();
      } else { keys[i].innerText = keyboardLayout[language][i]; }
    }
    uppercase = !uppercase;
  },

  alt() {
    altTarget = true;
    if (ctrlTarget) {
      language = (language === 'eng') ? 'rus' : 'eng';
      insertKeyboardLayout(keyboardLayout[language]);
      localStorage.language = language;
    }
  },

  ctrl() {
    ctrlTarget = true;
    if (altTarget) {
      language = (language === 'eng') ? 'rus' : 'eng';
      insertKeyboardLayout(keyboardLayout[language]);
      localStorage.language = language;
    }
  },

  space() {
    showOutput(' ');
  },

  enter() {
    showOutput('\n');
  },

  tab() {
    showOutput('\t');
  },

  del() {
    if (outputText.value.length === outputText.selectionEnd
      && outputText.selectionEnd === outputText.selectionStart) return;
    if (outputText.value.length !== outputText.selectionEnd
      && outputText.selectionEnd === outputText.selectionStart) {
      outputText.setRangeText('', outputText.selectionStart, outputText.selectionEnd + 1, 'end');
    } else { showOutput(''); }
  },

  backspace() {
    if (outputText.selectionStart === 0 && outputText.selectionEnd === outputText.selectionStart) {
      return;
    }
    if (outputText.selectionEnd === outputText.selectionStart) {
      outputText.setRangeText('', outputText.selectionStart - 1, outputText.selectionEnd, 'end');
    } else { showOutput(''); }
  },

  default(activeKeyValue) { showOutput(activeKeyValue); },
};

function keyTarget(activeKeyValue) {
  if (activeKeyValue === 'Win') return;
  if (!activeKeyValue) {
    keyEvents.space();
  } else if (functionalKeys[activeKeyValue]) {
    keyEvents[activeKeyValue.toLowerCase()]();
  } else { keyEvents.default(activeKeyValue); }
}

function eventEnd(activeKeyValue) {
  switch (true) {
    case (activeKeyValue === 'Shift'):
      keyEvents.shift();
      break;
    case (activeKeyValue === 'Alt'):
      altTarget = false;
      break;
    case (activeKeyValue === 'Ctrl'):
      ctrlTarget = false;
      break;
    default:
      break;
  }
}

function mouseEvent(event) {
  if (!event.target.classList.contains('key')) return;
  if (event.target.innerText === 'CapsLock') {
    event.target.classList.toggle('active-key');
  }
  keyTarget(event.target.innerText);
}

function endMouseEvent(event) {
  eventEnd(event.target.innerText);
}

function keyboardEvent(event) {
  if (!keyCodes.includes(event.keyCode)) return;
  event.preventDefault();
  const repeatShift = event.repeat;
  if (repeatShift && event.keyCode === shiftButtonKeyCode) return;
  let activeKeyValue;
  if (event.location === secondOfDuplicatedButtons) {
    const activeKey = keyboard.querySelectorAll(`.key[data-key-code="${event.keyCode}"]`);
    activeKey[1].classList.add('active-key');
    activeKeyValue = activeKey[1].innerText;
  } else {
    const activeKey = keyboard.querySelector(`.key[data-key-code="${event.keyCode}"]`);
    if (event.key === 'CapsLock') { activeKey.classList.toggle('active-key'); } else {
      activeKey.classList.add('active-key');
    }
    activeKeyValue = activeKey.innerText;
  }
  keyTarget(activeKeyValue);
}

function endKeyboardEvent(event) {
  if (event.key === 'CapsLock' || !keyCodes.includes(event.keyCode)) return;
  let activeKeyValue;
  if (event.location === secondOfDuplicatedButtons) {
    const activeKey = keyboard.querySelectorAll(`.key[data-key-code="${event.keyCode}"]`);
    activeKey[1].classList.remove('active-key');
    activeKeyValue = activeKey[1].innerText;
  } else {
    const activeKey = keyboard.querySelector(`.key[data-key-code="${event.keyCode}"]`);
    activeKey.classList.remove('active-key');
    activeKeyValue = activeKey.innerText;
  }
  eventEnd(activeKeyValue);
}
document.addEventListener('keydown', keyboardEvent);
document.addEventListener('keyup', endKeyboardEvent);
keyboard.addEventListener('mousedown', mouseEvent);
keyboard.addEventListener('mouseup', endMouseEvent);

keyboardInit();
