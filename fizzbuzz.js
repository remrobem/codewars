function fizzbuzz1() {

    for (i = 1; i <= 100; i++) {
        if (!(i % 15)) {
            console.log(`${i}: FizzBuzz`);
        } else {
            if (!(i % 3)) {
                console.log(`${i}: Fizz`);
            } else {
                if (!(i % 5)) {
                    console.log(`${i}: Buzz`);
                };
            };
        };
    };
};

function fizzbuzz2() {

    let response = [];
    for (i = 1; i <= 100; i++) {
        let fizzbuzz = '';
        if (!(i % 3)) {
            fizzbuzz += 'Fizz'
        };
        if (!(i % 5)) {
            fizzbuzz += 'Buzz'
        };
        if (fizzbuzz) {
            response.push({number:i , fizzbuzz})
        }
    };
    return response;
};

function fizzbuzz3() {
    response = [];
    for (number = 1; number <= 100; number++) {
        let fizzbuzz = ( (!(number % 3) ? 'Fizz' : '' ) + (!(number % 5) ? 'Buzz' : '') );
        if (fizzbuzz) {
            response.push({number,fizzbuzz})
        };
    };
    return response;
};

console.log('fizzbuzz1');
fizzbuzz1();
console.log('fizzbuzz2');
console.log(fizzbuzz2());
console.log('fizzbuzz3');
console.log(fizzbuzz3());