import fs from 'fs';
import root from '../data/leaves.json' assert { type: 'json' };
import parallels from '../data/parallels.json' assert { type: 'json' };


function addParallelItems(root, parallels) {
    // Helper function to remove duplicates from an array
    function removeDuplicates(array) {
        return [...new Set(array)];
    }

    // Loop through each item in the root array
    root.forEach((d) => {
        const item = d.facro;
        // Check if the item is a range
        if (item?.includes('-')) {
            const [start, end] = item.split('-');
            // Loop through each parallel
            parallels.forEach(parallel => {
                // Check if any item in the parallel is within the range
                parallel?.forEach(parallelItem => {
                    if (parallelItem >= start && parallelItem <= end) {
                        // Add the parallel items to the root item, ensuring no duplicates
                        d.parallels = removeDuplicates([...d.parallels, ...parallel]);
                    }
                });
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
