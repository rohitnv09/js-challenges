
function throttle(fn, delay, options = {}) {
    const { isTrailing = false, isLeading = false } = options || {};
    if (!isTrailing && !isLeading) return fn;
    let timerId = null;
    let flag = false;
    return function (...args) {
        if (timerId) {
            flag = true;
            return;
        }
        if (isTrailing && !isLeading) flag = true;
        const context = this == null ? globalThis : Object(this);
        if (isLeading) fn.apply(context, args);
        timerId = setTimeout(() => {
            if (isTrailing && flag) fn.apply(context, args);
            timerId = null;
            flag = false;
        }, delay);
    }
}