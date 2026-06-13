function flatten(list, d) {
    if (!Array.isArray(list)) return list;
    const output = [];
    function helper(arr, d) {
        if (d === 0) {
            output.push(...arr);
            return;
        }
        for (const el of arr) {
            if (Array.isArray(el)) helper(el, d - 1);
            else output.push(el);
        }
    }
    helper(list, d);
    return output;
}
const input = [1,[2],[3,[4]]];

console.log(flatten(input));