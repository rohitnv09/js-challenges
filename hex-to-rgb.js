/*
Input:
"#ff33ff"

Output:
{
  "r": 255,
  "g": 51,
  "b": 255
}
*/

const MAPPING = {
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15
}

const hexas = ["a", "b", "c", "d", "e", "f"];

function convertHexToRGB(hex) {
    if (!hex || typeof hex !== "string") throw new Error("Input must be a valid stirng");
    hex = hex.toLowerCase();
    const arr = [...hex].reduce((acc, char, index) => {
        if (index === 0) return acc;
        if (index % 2 === 1) acc.push(char);
        else acc[acc.length - 1] += char;
        return acc;
    }, []);

    function helper(s) {
        const lsb = hexas.includes(s[1]) ? MAPPING[s[1]] : parseInt(s[1]);
        const msb = hexas.includes(s[0]) ? MAPPING[s[0]] : parseInt(s[0]);

        return (msb * 16) + lsb;
    }

    return {
        r: helper(arr[0]),
        g: helper(arr[1]),
        b: helper(arr[2])
    };
}
const result = convertHexToRGB("#fF33ff");
console.log(result);