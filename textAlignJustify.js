

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

const justify = function (str, len) {

    let words = str.split(' ');     // get str into a word array

    let lines = words.reduce(function (linesAccum, word) {                      // build array of formatted lines

        word = word.length > len ? 'ERROR' : word;                              // word too long

        if (linesAccum[linesAccum.length - 1].length + word.length > len) {     // max line length reached w/o word split
            line = formatLine(linesAccum[linesAccum.length - 1], len);           // add spaces and /n to "full" line f                                                  
            linesAccum[linesAccum.length - 1] = line;                           // update last entry in accumulator
            line = word + ' ';                                                  // initialize the next entry in accumulator array
            linesAccum.push(line);                                              // add new entry in accumulator array
        } else {
            linesAccum[linesAccum.length - 1] += word + ' ';                    // update last entry in accumulator with word
        };

        return linesAccum;

    }, [''])

    return lines.join('').trim();      // return sting of all the lines
};

function formatLine(line, len) {
    line = line.trim();
    let regex = /\s+/g;                 // returns all space strings - multiple spaces returned as 1 string
    let lineLength = line.length;

    if (line.includes(' ')) {
        while (lineLength < len) {              // controls multiple passes over line when prior passes did not meet len requirement
            line = line.replace(regex, function (space) {
                lineLength++;                                       // adding a space, so increase length counter
                return lineLength <= len ? space += ' ' : space;    // only add space if len not yet exceeded
            })
        };
    };
    return line.concat('\n');
};


let test = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis dolor mauris, at elementum ligula tempor eget. In quis rhoncus nunc, at aliquet orci. Fusce at dolor sit amet felis suscipit tristique. Nam a imperdiet tellus. Nulla eu vestibulum urna. Vivamus tincidunt suscipit enim, nec ultrices nisi volutpat ac. Maecenas sit amet lacinia arcu, non dictum justo. Donec sed quam vel risus faucibus euismod. Suspendisse rhoncus rhoncus felis at fermentum. Donec lorem magna, ultricies a nunc sit amet, blandit fringilla nunc. In vestibulum velit ac felis rhoncus pellentesque. Mauris at tellus enim. Aliquam eleifend tempus dapibus. Pellentesque commodo, nisi sit amet hendrerit fringilla, ante odio porta lacus, ut elementum justo nulla et dolor.'
let test1 = '123456789012345678901234567890123';
let test2 = ''
// test1 = 'a';
console.log(justify(test, 30))