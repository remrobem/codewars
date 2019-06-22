

// Your task in order to complete this Kata is to write a function which formats a duration, given as a number of seconds, in a human-friendly way.

// The function must accept a non-negative integer. 
// If it is zero, it just returns "now". Otherwise, the duration is expressed as a combination of years, days, hours, minutes and seconds.

// It is much easier to understand with an example:

// formatDuration(62)    // returns "1 minute and 2 seconds"
// formatDuration(3662)  // returns "1 hour, 1 minute and 2 seconds"
// For the purpose of this Kata, a year is 365 days and a day is 24 hours.

// Note that spaces are important.

// Detailed rules
// The resulting expression is made of components like 4 seconds, 1 year, etc. 
// In general, a positive integer and one of the valid units of time, separated by a space. 
// The unit of time is used in plural if the integer is greater than 1.

// The components are separated by a comma and a space (", "). 
// Except the last component, which is separated by " and ", just like it would be written in English.

// A more significant units of time will occur before than a least significant one. 
// Therefore, 1 second and 1 year is not correct, but 1 year and 1 second is.

// Different components have different unit of times. So there is not repeated units like in 5 seconds and 1 second.

// A component will not appear at all if its value happens to be zero. Hence, 1 minute and 0 seconds is not valid, but it should be just 1 minute.

// A unit of time must be used "as much as possible". 
// It means that the function should not return 61 seconds, but 1 minute and 1 second instead. 
// Formally, the duration specified by of a component must not be greater than any valid more significant unit of time.

// Test.assertEquals(formatDuration(1), "1 second");
// Test.assertEquals(formatDuration(62), "1 minute and 2 seconds");
// Test.assertEquals(formatDuration(120), "2 minutes");
// Test.assertEquals(formatDuration(3600), "1 hour");
// Test.assertEquals(formatDuration(3662), "1 hour, 1 minute and 2 seconds");

function formatDuration(seconds) {

    if (!seconds) {
        return 'now'
    };

    const secondsPerMinute = 60;
    const secondsPerHour = 60 * 60;
    const secondsPerDay = 3600 * 24;
    const secondsPerYear = 3600 * 24 * 365;


    const years = Math.floor(seconds / secondsPerYear);
    const days = Math.floor((seconds % secondsPerYear) / secondsPerDay);
    const hours = Math.floor(((seconds % secondsPerYear) % secondsPerDay) / secondsPerHour);
    const minutes = Math.floor((((seconds % secondsPerYear) % secondsPerDay) % secondsPerHour) / secondsPerMinute);
    const secondsLeft = Math.floor((((seconds % secondsPerYear) % secondsPerDay) % secondsPerHour) % secondsPerMinute);

    durations = [];
    buildString(years, 'year');
    buildString(days, 'day');
    buildString(hours, 'hour');
    buildString(minutes, 'minute');
    buildString(secondsLeft, 'second');

    let durationString = durations.join(', ');
    const lastComma = durationString.lastIndexOf(',');
    return lastComma >= 0 ? durationString.substring(0, lastComma) + ' and' + durationString.substring(lastComma + 1) : durationString;

};

function buildString(value, text) {
    let durationString = value ? value == 1 ? `${value} ${text}` : `${value} ${text}s` : '';
    if (durationString) { durations.push(durationString) };
};

console.log(formatDuration(0));
console.log(formatDuration(1));
console.log(formatDuration(62));
console.log(formatDuration(120));
console.log(formatDuration(3600));
console.log(formatDuration(3663));
console.log(formatDuration(31996000));
console.log(formatDuration(91996000));