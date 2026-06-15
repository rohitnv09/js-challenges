// Cumulative Curry Sum

// Implement a function curry() that returns another function. 
// Each time the returned function is invoked with a number, it should add that number to a running total and return the updated sum.

// The running total must be preserved across multiple calls.

const sum = curry();
console.log(sum(5)); // 5
console.log(sum(3)); // 8
console.log(sum(4)); // 12
console.log(sum(0)); // 12

function curry() {
    let total = 0;
    return function (num) {
        total += num;
        return total;
    }
}