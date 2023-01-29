const charAmtRange = document.getElementById('charAmtRange')
const charAmtNumber = document.getElementById('charAmtNumber')

const includeUpperCaseElement = document.getElementById('includeUpperCase')
const includeNumbersElement = document.getElementById('includeNumbers')
const includeSymbolsElement = document.getElementById('includeSymbols')
const passwordDisplayElement = document.getElementById('passwordDisplay')
const form = document.getElementById('passwordGeneratorForm')

const copyButtonElement = document.getElementById('copyButton')

/* Event listener for the form submission */
form.addEventListener('submit', e => {
    e.preventDefault()

    const charAmt = charAmtNumber.value
    const includeUpperCase = includeUpperCaseElement.checked
    const includeNumbers = includeNumbersElement.checked
    const includeSymbols = includeSymbolsElement.checked

    const password = generatePassword(charAmt, includeUpperCase, includeNumbers, includeSymbols)
    passwordDisplayElement.value = password
});

/* Event listener for the form reset */
form.addEventListener('reset', e => {
    e.preventDefault()
    charAmtRange.value = '10'
    charAmtNumber.value = '10'
    includeUpperCaseElement.checked = false
    includeNumbersElement.checked = false
    includeSymbolsElement.checked = false
    passwordDisplayElement.value = ''
});

/* Arrays of Character Codes */
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
    arrayFromLowToHigh(58, 64)
).concat(
    arrayFromLowToHigh(91, 96)
).concat(
    arrayFromLowToHigh(123, 126)
)

function arrayFromLowToHigh(low, high) {
    const array = []
    for (let i = low; i <= high; i++) {
        array.push(i)
    }
    return array
}

/* Generate Password Function */
function generatePassword(charAmt, includeUpperCase, includeNumbers, includeSymbols) {
    /* charCodes is an array containing all 'character codes' we are allowed to use in this password */
    let charCodes = LOWERCASE_CHAR_CODES
    if (includeUpperCase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)

    /* passwordCharacters is an array containing all 'characters' chosen for this password */
    const passwordCharacters = []
    for (let i = 0; i < charAmt; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(characterCode))
    }
    return passwordCharacters.join('') /* Essentially turns our array into a string */
}

/* Syncing range and number inputs together */
charAmtRange.addEventListener('input', syncCharAmt)
charAmtNumber.addEventListener('input', syncCharAmt)

function syncCharAmt(e) {
    const value = e.target.value
    charAmtRange.value = value
    charAmtNumber.value = value
}

/* Adding functionality to copy button */
copyButtonElement.addEventListener('click', () => {
    var copyText = document.getElementById("passwordDisplay")
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(copyText.value);
})