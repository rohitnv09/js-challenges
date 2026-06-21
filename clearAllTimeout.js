/*

JavaScript has a setTimeout and clearTimeout(timerId) inbuilt method, clearTimeout clears the setTimeout whose id is provided.

Implement a custom clearAllTimeout method that will clear / stop all the setTimeouts.

Create an custom object MY_TIMERS that will have two methods setTimeout and clearAllTimeout. setTimeout  will work as an normal setTimeout and we can create any count of it. Invoking clearAllTimeout should clear/stop all the existing setTimeouts.

Input:
const id = MY_TIMERS.setTimeout(() => {console.log("hello")}, 1000);
const id2 = MY_TIMERS.setTimeout(() => {console.log("hello")}, 2000);

console.log(id, id2);

// Clears all the timers
MY_TIMERS.clearAllTimeout();
// No log should be printed

Output:
13, 14 //timeoutId
*/

const MY_TIMERS = {
    ids: [],
    setTimeout(fn, delay) {
        const id = globalThis.setTimeout(fn, delay);
        this.ids.push(id);
        return id;
    },
    clearAllTimeout() {
        this.ids.forEach((id) => {
            clearTimeout(id);
        });
        this.ids = [];
    }
}

const id = MY_TIMERS.setTimeout(() => { console.log("hello") }, 1000);
const id2 = MY_TIMERS.setTimeout(() => { console.log("hello") }, 2000);

console.log(id, id2);

MY_TIMERS.clearAllTimeout();