---
toc: false
---

# Prompt in phind.com

> I have a array (size 6725) of parallels of the kind:

	sag	sn4.25						
	sag	an10.26	sn4.25					
	uv1	t213.1	uv-kg1	t212.1					
	dhp21	gdhp115	ja520	pdhp14	t210.10	t212.4	t213.4	uv4	sag	uv-kg4	uvs4									
	dhp349	t210.32	t212.3	t213.3	uv3	sag	uv-kg3											uv-kg3	uv3	t212.3	t213.3	dhp337				
	uv5	dhp217	t210.24	t212.6	t213.5	sag	uv-kg5	uvs5						
	uv9	t210.17	t212.10	t213.9	sag	uv-kg9	uvs9

> parallels are array contain two or more items.

> I have an array called root of size 1119 of items. item in root are either of the form "sag" or "sn4.25" or they can be of the form "js520-525" (with a dash representing a range of item, from "js520" to "js525"). 

> Note that item in parallels are never range, they are single items)

> We want to loop through all the item in root and check if they are contains in a parrallel. If they are,  we want to add all the items of the found parallel to the item we are looping. We dont want duplicte. 

> Can you give me that function in js

## Reply

```js echo run=false
function addParallelItems(root, parallels) {
 // Helper function to remove duplicates from an array
 function removeDuplicates(array) {
    return [...new Set(array)];
 }

 // Loop through each item in the root array
 root.forEach((item, index) => {
    // Check if the item is a range
    if (item.includes('-')) {
      const [start, end] = item.split('-');
      // Loop through each parallel
      parallels.forEach(parallel => {
        // Check if any item in the parallel is within the range
        parallel.forEach(parallelItem => {
          if (parallelItem >= start && parallelItem <= end) {
            // Add the parallel items to the root item, ensuring no duplicates
            root[index] = removeDuplicates([...root[index], ...parallel]);
          }
        });
      });
    } else {
      // If the item is not a range, directly check for its presence in parallels
      parallels.forEach(parallel => {
        if (parallel.includes(item)) {
          // Add the parallel items to the root item, ensuring no duplicates
          root[index] = removeDuplicates([...root[index], ...parallel]);
        }
      });
    }
 });

 return root;
}

// Example usage
const root = ['sag', 'sn4.25', 'js520-525'];
const parallels = [
 ['sag', 'sn4.25'],
 ['uv1', 't213.1', 'uv-kg1', 't212.1'],
 ['dhp21', 'gdhp115', 'ja520', 'pdhp14', 't210.10', 't212.4', 't213.4', 'uv4', 'sag', 'uv-kg4', 'uvs4'],
 // Add more parallels as needed
];

const updatedRoot = addParallelItems(root, parallels);
console.log(updatedRoot);
```