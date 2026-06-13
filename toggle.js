let hello = toggle("hello");
console.log(hello()) // "hello";
console.log(hello()) // "hello";


let onOff = toggle("on", "off");
console.log(onOff()) // "on"
onOff.reset();
console.log(onOff()) // "off"
console.log(onOff()) // "on"


function toggle(...args) {
    if (args.length === 0) throw new Error("Need atleast 1 arguement");
    let currentIndex = 0;
    function next() {
        const output = args[currentIndex];
        currentIndex = (currentIndex + 1) % args.length;
        return output;
    }
    next.reset = function () {
        currentIndex = 0;
    }
    return next;
}