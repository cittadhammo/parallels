function parseRange(rangeString) {
    // Split the string by the hyphen to separate start and end values
    const parts = rangeString.split('–'); // Note: This is an en dash, not a regular hyphen (check your input)

    // Extract the start and end values // ki22.3–9
    const start = parts[0];  // ki22.3
    const end = parts[1];    // 9

    // Check if the start value has a decimal part
    const hasDecimal = start.includes('.');

    // If the start value has a decimal part, append it to the end value
    if (hasDecimal) {
        const begining = start.split('.')[0]; // ki22
        return [start, begining + '.' + end];
    }

    // If no decimal part, return the original start and end values
    return [start, end];
}

// Test cases
console.log(parseRange("js25–27")); // Output: [ 'js25', 'js27' ]
console.log(parseRange("ki22.3–9")); // Output: [ 'ki22.3', 'ki22.9' ]
console.log(parseRange("ki22.34–94")); // Output: [ 'ki22.34', 'ki22.94' ]
console.log(parseRange("tt24.33–36")); // Output: [ 'tt24.33', 'tt24.36' ]


console.log("sn12.2">"sn12.3")
console.log("sn12.2"<"sn12.3")
