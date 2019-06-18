// Your task in this Kata is to emulate text justification in monospace font. 
// You will be given a single-lined text and the expected justification width. 
//The longest word will never be greater than this width.

// Here are the rules:

// Use spaces to fill in the gaps between words.
// Each line should contain as many words as possible.
// Use '\n' to separate lines.
// Gap between words can't differ by more than one space.
// Lines should end with a word not a space.
// '\n' is not included in the length of a line.
// Large gaps go first, then smaller ones ('Lorem--ipsum--dolor--sit-amet,' (2, 2, 2, 1 spaces)).
// Last line should not be justified, use only one space between words.
// Last line should not contain '\n'
// Strings with one word do not need gaps ('somelongword\n').
// Example with width=30:

// Lorem  ipsum  dolor  sit amet,
// consectetur  adipiscing  elit.
// Vestibulum    sagittis   dolor
// mauris,  at  elementum  ligula
// tempor  eget.  In quis rhoncus
// nunc,  at  aliquet orci. Fusce
// at   dolor   sit   amet  felis
// suscipit   tristique.   Nam  a
// imperdiet   tellus.  Nulla  eu
// vestibulum    urna.    Vivamus
// tincidunt  suscipit  enim, nec
// ultrices   nisi  volutpat  ac.
// Maecenas   sit   amet  lacinia
// arcu,  non dictum justo. Donec
// sed  quam  vel  risus faucibus
// euismod.  Suspendisse  rhoncus
// rhoncus  felis  at  fermentum.
// Donec lorem magna, ultricies a
// nunc    sit    amet,   blandit
// fringilla  nunc. In vestibulum
// velit    ac    felis   rhoncus
// pellentesque. Mauris at tellus
// enim.  Aliquam eleifend tempus
// dapibus. Pellentesque commodo,
// nisi    sit   amet   hendrerit
// fringilla,   ante  odio  porta
// lacus,   ut   elementum  justo
// nulla et dolor.
// Also you can always take a look at how justification works in your text editor or directly in HTML (css: text-align: justify).

// Have fun :)

// /**
//  * @param {String} str - inital string
//  * @param {Number} len - line length
//  */
const justify = function (str, len) {
    // validation
    if (!str) { return [] };

    // initialize
    let lineList = [];
    let newLine = '';
    let wordList = str.split(' ');
    for (let i = 0; i < wordList.length; i++) {

        if (newLine.length + wordList[i].length > len) {  // max line length reached w/o word split
            newLine = formatLine(newLine, len);           // add spaces and /n  
            lineList.push(newLine);
            newLine = wordList[i] + ' ';                  // start next new line
        } else {
            newLine += wordList[i] + ' ';                 // build up output line
        };
    };

    lineList.push(newLine.trim());

    return lineList.join('')

    function formatLine(line, len) {
        line = line.trim();
        const space = ' ';
        let addSpaceCount = len - line.length;                          // number spaces that need to be added
        let gaps = line.match(/[ ]/g);                                  // array of exisiting spaces between words
        gaps = gaps ? gaps : []
        let defaultGap = Math.floor(addSpaceCount / gaps.length) + 1;   // number of spaces needed between every word
        let extraSpacesToAdd = (addSpaceCount % gaps.length);           // number of spaces to spread from left to right
        line = line
            .split('')          // array of characters in word
            .map(char => {      // add additional spaces
                if (char == ' ') {
                    numberOfSpaces = extraSpacesToAdd > 0 ? defaultGap + 1 : defaultGap;
                    extraSpacesToAdd -= 1;
                    return space.repeat(numberOfSpaces);      // add number of spaces needed
                } else {
                    return char;
                }
            })
            .join('')           // change back into string

        return line.concat('\n');
    };
};
let test = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis dolor mauris, at elementum ligula tempor eget. In quis rhoncus nunc, at aliquet orci. Fusce at dolor sit amet felis suscipit tristique. Nam a imperdiet tellus. Nulla eu vestibulum urna. Vivamus tincidunt suscipit enim, nec ultrices nisi volutpat ac. Maecenas sit amet lacinia arcu, non dictum justo. Donec sed quam vel risus faucibus euismod. Suspendisse rhoncus rhoncus felis at fermentum. Donec lorem magna, ultricies a nunc sit amet, blandit fringilla nunc. In vestibulum velit ac felis rhoncus pellentesque. Mauris at tellus enim. Aliquam eleifend tempus dapibus. Pellentesque commodo, nisi sit amet hendrerit fringilla, ante odio porta lacus, ut elementum justo nulla et dolor.'
let test1 = '123456789012345678901234567890123';
let test2 = ''
// test1 = 'a';
console.log(justify(test, 30))