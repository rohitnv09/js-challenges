/*
Showcase a working demo of method chaining in JavaScript by implementing the following example.
Input:
computeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();

Output:
143545000
*/

function computeAmount() {
    let result = 0;
    function value() {
        return result;
    }
    function crore(val) {
        result += val * 10000000;
        return this;
    }
    function lacs(val) {
        result += val * 100000;
        return this;
    }
    function thousand(val) {
        result += val * 1000;
        return this;
    }
    return {
        lacs,
        crore,
        thousand,
        value
    }
}

console.log(computeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value()); //143545000