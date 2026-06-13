function sampler(fn, count, isStart) {
    if (count <= 1) count = 1;
    let remaining = count;
    let result;
    return function (...args) {
        if (count <= 1) {
            result = fn.apply(globalThis, args);
            return result;
        }
        if (isStart) {
            if (remaining === count) {
                remaining--;
                result = fn.apply(globalThis, args);
            } else if (remaining > 1) {
                remaining--;
            } else {
                remaining = count;
            }
            return result;
        } else {
            if (remaining > 1) {
                remaining--;
            } else {
                remaining = count;
                result = fn.apply(globalThis, args);
            }
            return result;
        }
    }
}

function logger() {
    console.log("hey");
}

const f = sampler(logger, 4);
f();
f();
f();
f(); // logged
f();
f();
f();
f(); // logged
f();
f();