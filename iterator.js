/*

Create an iterator method that accepts an array and returns a new method, 
that will return the next array value on each invocation.

const iterator = helper([1, 2, "hello"]);

console.log(iterator.next()); // 1
console.log(iterator.next()); // 2
console.log(iterator.done()); // false
console.log(iterator.next()); // "hello"
console.log(iterator.done()); // true
console.log(iterator.next()); // "null"

*/

function helper(list) {
    if (list == null) throw new Error("first argument must be a valid list/collection/iteratable");
    let o = Object(list);
    let keys = Object.keys(o);
    let i = 0;
    function next() {
        if (this.done()) return null;
        const currentKey = keys[i++];
        const value = o[currentKey];
        return value;
    }
    function done() {
        return i >= keys.length;
    }
    return {
        done, next
    }
}

const iterator = helper([1, 2, "hello"]);

console.log(iterator.next()); // 1
console.log(iterator.next()); // 2
console.log(iterator.done()); // false
console.log(iterator.next()); // "hello"
console.log(iterator.done()); // true
console.log(iterator.next()); // "null"