function debounce(fn, delay, isTrailing = true, isLeading) {
    let timerId = null;
    let flag = false;
    return function (...args) {
        const context = this == null ? globalThis : Object(this);
        if (!timerId && isLeading) {
            fn.apply(context, args);
        } else {
            flag = true;
        }
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            if (isTrailing && flag) fn.apply(context, args);
            timerId = null;
            flag = false;
        }, delay);
    }
}

