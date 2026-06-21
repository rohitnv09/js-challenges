/* 
Input:
{
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
       L: 56
    },
    Q: [1, 2]
   }   
}

Output:
{
  "A": "12"
  "B": 23,
  "C.O.L": 56,
  "C.P": 23,
  "C.Q.0": 1,
  "C.Q.1": 2,
}
*/

const obj = {
    A: "12",
    B: 23,
    C: {
        P: 23,
        O: {
            L: 56
        },
        Q: [1, 2]
    }
};

function flattenObject(obj, path, result) {
    if (obj == null || typeof obj !== "object") {
        result[path] = obj;
        return result;
    }
    for (const [key, value] of Object.entries(obj)) {
        const newPath = path ? `${path}.${key}` : key;
        result = flattenObject(value, newPath, result);
    }
    return result;
}

// function flattenObject(obj) {
//     if (typeof obj !== "object" || obj == null) return obj;
//     const result = {};
//     const prefixList = [];
//     function helper(object) {
//         for (const [key, value] of Object.entries(object)) {
//             if (typeof value === "object" && value != null) {
//                 prefixList.push(key);
//                 helper(value);
//                 prefixList.pop();
//             } else {
//                 prefixList.push(key);
//                 result[prefixList.join(".")] = value;
//                 prefixList.pop();
//             }
//         }
//     }
//     helper(obj);
//     return result;
// }

console.log(flattenObject(obj, "", {}));