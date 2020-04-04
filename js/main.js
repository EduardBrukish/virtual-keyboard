const keyboardLayout = {
    eng: [['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ['[', '{'], [']', '}'], ['\\', '|'], 'Del', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', [';', ':'], ['\'', '"'], 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', [',', '<'], ['.', '>'], ['/', '?'], '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'],
    rus: ['ё', ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', ['\\', '/'], 'Del', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ['.', ','], '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'],
};
const functionalKeys = ['Backspace', 'Tab', 'Del', 'CapsLock', 'Enter', 'Shift', 'Ctrl', 'Alt'];
const keyCodes = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8, 9, 81, 87, 69,
    82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46, 20, 65, 83, 68, 70, 71, 72, 74, 75, 76,
    186, 222, 13, 16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 16, 17, 91, 18, 32, 18,
    37, 40, 39, 17];
const body = document.querySelector('body');
const wrapper = document.createElement('div');
const outputText = document.createElement('textarea');
const keyboard = document.createElement('div');
const keyEvents = {
    shift() {
        if (shiftTarget) return;
        imitateShift();
    },

    capslock() {
        imitateCapsLock();
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
        showKeyboardOutput(' ');
    },

    enter() {
        showKeyboardOutput('\n');
    },

    tab() {
        showKeyboardOutput('\t');
    },

    del() {
        if (outputText.value.length === outputText.selectionEnd
            && outputText.selectionEnd === outputText.selectionStart) return;
        if (outputText.value.length !== outputText.selectionEnd
            && outputText.selectionEnd === outputText.selectionStart) {
            outputText.setRangeText('', outputText.selectionStart, outputText.selectionEnd + 1, 'end');
        } else { showKeyboardOutput(''); }
    },

    backspace() {
        if (outputText.selectionStart === 0 && outputText.selectionEnd === outputText.selectionStart) {
            return;
        }
        if (outputText.selectionEnd === outputText.selectionStart) {
            outputText.setRangeText('', outputText.selectionStart - 1, outputText.selectionEnd, 'end');
        } else { showKeyboardOutput(''); }
    },

    default(activeKeyValue) { showKeyboardOutput(activeKeyValue); },
};
let language = 'eng';
let ctrlTarget = false;
let altTarget = false;
let shiftTarget = 0;
let uppercase = false;

function keyboardInit() {
    wrapper.classList.add('wrapper');
    body.append(wrapper);
    outputText.classList.add('output');
    wrapper.append(outputText);
    keyboard.classList.add('keyboard');
    wrapper.append(keyboard);

    if (!localStorage.language) {
        localStorage.setItem('language', 'eng');
    } else { language = localStorage.language; }

    drawKeyboard(keyboardLayout[language]);
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

function insertKeyboardLayout(layout) {
    const buttons = [...keyboard.querySelectorAll('.key')];

    for (let i = 0; i < layout.length; i += 1) {
        if (Array.isArray(layout[i])) {
            buttons[i].innerText = layout[i][0];
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

keyboardInit();