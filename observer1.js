/*
Create a simple Observable class that implements the observer pattern. The class should:

Allow subscribing to data changes via a subscribe method
Notify all subscribers when data changes via a notify method
Allow unsubscribing from updates
Maintain a list of subscriber callbacks
*/

class Observable {
    constructor() {
        this.map = {};
    }
    subscribe(cb) {
        // cb can be a function expression / arrow function
        const id = crypto.randomUUID();
        this.map[id] = cb;
        const method = this.#unsub.bind(this);
        this.map[id].unsubscribe = function () {
            method(id);
        }
        return this.map[id];
    }
    #unsub(id) {
        delete this.map[id];
    }
    notify(value) {
        Object.keys(this.map).forEach((key) => {
            const fn = this.map[key];
            fn(value);
        });
    }
}

const observable = new Observable();

// Subscribe to changes
const subscription = observable.subscribe(data => {
    console.log('Received:', data);
});

// Notify subscribers
observable.notify('Hello!'); // logs: "Received: Hello!"

// Unsubscribe
subscription.unsubscribe();

// No longer logs anything
observable.notify('Hello again!');