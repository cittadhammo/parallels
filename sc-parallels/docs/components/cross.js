import fs from 'fs';
import root from '../data/leaves.json' assert { type: 'json' };
import parallels from '../data/parallels.json' assert { type: 'json' };


function addParallelItems(root, parallels) {
    // Helper function to remove duplicates from an array
    function removeDuplicates(array) {
        return [...new Set(array)];
    }

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
        const begining = start.split(/\d/)[0]; // ki22
        return [start, begining+end];
    }

    // Loop through each item in the root array
    root.forEach((d) => {
        const item = d.facro;
        // Check if the item is a range
        if (item?.includes('–')) {
            const [start, end] = parseRange(item);
            d.range = [start, end] 
            // Loop through each parallel
            parallels.forEach(parallel => {
                // Check if any item in the parallel is within the range
                if (parallel >= start && parallel <= end) {
                    // Add the parallel items to the root item, ensuring no duplicates
                    d.parallels = removeDuplicates([...d.parallels, ...parallel]);
                }
            });
        } else {
            // If the item is not a range, directly check for its presence in parallels
            parallels?.forEach(parallel => {
                if (parallel?.includes(item)) {
                    // Add the parallel items to the root item, ensuring no duplicates
                    d.parallels = removeDuplicates([...d.parallels, ...parallel]);
                }
            });
        }
    });

    return root;
}
const updatedRoot = addParallelItems(root, parallels);

// Write the updatedRoot array to a JSON file
fs.writeFile('../data/leavesWithParallels.json', JSON.stringify(updatedRoot, null, 2), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});
