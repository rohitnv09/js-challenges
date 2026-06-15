// Input:
// {
//   a : {
//     b : (a,b,c) => a+b+c,
//     c : (a,b,c) => a+b-c,
//   },
//   d : (a,b,c) => a-b-c
// }

// const output = pipe(obj)(1,1,1);
// console.log(output);

// Output:
// {
//   a : {
//     b : 3,
//     c : 1
//   },
//   d: -1
// }

const obj = {
    a: {
        b: (a, b, c) => a + b + c,
        c: (a, b, c) => a + b - c,
    },
    d: (a, b, c) => a - b - c
};

const output = pipe(obj)(1, 1, 1);
console.log(output);

function pipe(obj) {
    return function (...args) {
        const result = {};
        function helper(o, r) {
            for (const [key, value] of Object.entries(o)) {
                if (typeof value === "function") {
                    const val = value(...args);
                    r[key] = val;
                } else if (typeof value === "object") {
                    r[key] = {};
                    helper(value, r[key]);
                } else {
                    r[key] = value;
                }
            }
        }
        helper(obj, result);
        return result;
    }
}