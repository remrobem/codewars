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
    // if (!str) { return '' };    // validate str exists

    let words = str.split(' ');     // get str into a word array

    let lines = words.reduce(function (linesAccum, word) {                    // build array of formatted lines
        if (linesAccum[linesAccum.length - 1].length + word.length > len) {   // max line length reached w/o word split
            newLine = formatLine(linesAccum[linesAccum.length - 1], len);     // add spaces and /n to "full" line
            linesAccum[linesAccum.length - 1] = newLine;                      // update last entry in accumulator
            newLine = word + ' ';                                             // initialize the next entry in accumulator array
            linesAccum.push(newLine);                                         // add new entry in accumulator array
        } else {
            linesAccum[linesAccum.length - 1] += word + ' ';                  // update last entry in accumulator
        };

        return linesAccum;
    }, [''])

    return lines.join('');

    function formatLine(line, len) {
        line = line.trim();
        let addSpaceCount = len - line.length;                                  // how many spaces to add      
        let exisitingSpaceCount = line.match(/[ ]/g).length;                    // how many exiting spaces in the line
        let defaultSpacesToAdd = Math.floor(addSpaceCount / exisitingSpaceCount) + 1;   // number of spaces needed between every word
        let extraSpacesToAdd = (addSpaceCount % exisitingSpaceCount);           // number of additional spaces to spread from left to right
        line = line
            .split('')          // array of characters in word
            .map(char => {      // add additional spaces
                if (char == ' ') {
                    numberOfSpaces = extraSpacesToAdd > 0 ? defaultSpacesToAdd + 1 : defaultSpacesToAdd;    // add extra space if needed
                    extraSpacesToAdd -= 1;                                                  // decrement extra spaces to add 
                    return ' '.repeat(numberOfSpaces);                                      // add number of spaces needed to existing space
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
console.log(justify(test1, 30))