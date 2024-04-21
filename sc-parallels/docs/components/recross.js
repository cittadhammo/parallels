import fs from 'fs';
import leaves from '../data/leavesWithParallels.json' assert { type: 'json' };


function fixParallelsReference(leaves) {
    // Helper function to remove duplicates from an array
    function removeDuplicates(array) {
        return [...new Set(array)];
    }

    let lim = 0

    // Loop through each item in the root array

    leaves.forEach((d) => {
        if (true || lim < 1) {
            lim++
            d.parallelsInSuttaPtiaka = [];
            d.parallels.forEach(p => {
                let isLeaf = leaves.find(leaf => leaf.facro == p)
                if (!isLeaf) isLeaf = leaves.filter(leaf => leaf.range).find(leaf => (leaf.range[0] < p && p < leaf.range[1]))
                //console.log(isLeaf)
                if (isLeaf && isLeaf.facro != d.facro) d.parallelsInSuttaPtiaka = removeDuplicates([...d.parallelsInSuttaPtiaka, isLeaf.facro]);
                //console.log(d)
            })
        }
    });

    return leaves;
}
const updatedRoot = fixParallelsReference(leaves);

// Write the updatedRoot array to a JSON file
fs.writeFile('../data/leavesWithFixParallels.json', JSON.stringify(updatedRoot, null, 2), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});
