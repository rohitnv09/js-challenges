Promise.myAllSettled = function (list) {
    if (!Array.isArray(list)) return Promise.reject("the input should be an array");
    let left = list.length;
    if (left === 0) return Promise.resolve([]);
    const ans = [];
    return new Promise((res) => {
        list.forEach(async (p, i) => {
            try {
                const result = await p;
                ans[i] = {value: result, state: "fulfilled"};
            } catch (error) {
                ans[i] = {value: error, state: "rejected"};
            } finally {
                left--;
                if (left === 0) res(ans);
            }
        });
    });
}