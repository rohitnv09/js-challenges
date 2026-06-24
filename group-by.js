/*
Write the polyfill for the groupBy() method that accepts a collection and iteratee as 
arguments and returns the object that has grouped the collection values using iteratee as the key.
Note - Here the iteratee can be a function or a property.

Input:

groupBy([6.1, 4.2, 6.3], Math.floor);

groupBy(["one", "two", "three"], "length");


Output:

// { 6: [6.1, 6.3], 4: [4.2] }

// { 3: ['one', 'two'], 5: ['three'] }

*/

function groupBy(list, itr) {
    const result = {};
    list.forEach((item) => {
        const processedValue = typeof itr === "function" ? itr(item) : item[itr];
        if (!result[processedValue]) result[processedValue] = [];
        result[processedValue].push(item);
    });
    return result;
}

console.log(groupBy([6.1, 4.2, 6.3], Math.floor)); // { 6: [6.1, 6.3], 4: [4.2] }

console.log(groupBy(["one", "two", "three"], "length")); // { 3: ['one', 'two'], 5: ['three'] }