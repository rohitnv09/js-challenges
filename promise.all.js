Promise.myAll = function (list) {
    if (!Array.isArray(list)) return Promise.reject("the input should be an array");
    let left = list.length;
    if (left === 0) return Promise.resolve([]);
    const ans = [];
    return new Promise((res, rej) => {
        list.forEach(async (p, i) => {
            try {
                const result = await p;
                ans[i] = result;
            } catch (error) {
                rej(error);
                return;
            } finally {
                left--;
                if (left === 0) res(ans);
            }
        });
    });
}