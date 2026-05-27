// call polyfill

Function.prototype.customCall = function (context, ...args) {
    if (typeof this !== "function") throw new Error("Not callable on non function");
    const sanitisedContext = context == null ? globalThis : Object(context);
    const id = Symbol();
    sanitisedContext[id] = this;
    try {
        return sanitisedContext[id](...args);
    } finally {
        delete sanitisedContext[id];
    }
}

function hi(name, loc) {
    return `hello hi: ${this.name} - ${name} - ${loc}`;
}
const obj = {
    name: "Rohit"
}

console.log(hi.call(function () { }, "R9", "noida"));