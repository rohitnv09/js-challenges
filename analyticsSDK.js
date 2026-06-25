/*
Implement an analytics SDK that exposes log events, 
it takes in events and queues them, and then starts sending the events. 
The SDK should adhere the following properties.

Send each event after a delay of 1 second and this logging fails every n % 5 times.
Send the next event only after the previous one resolves.
When the failure occurs attempt a retry.

Input:
const sdk = new SDK();

sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7");
sdk.logEvent("event 8");
sdk.logEvent("event 9");
sdk.logEvent("event 10");

sdk.send();

Output:
"Analytics sent event 1"
"Analytics sent event 2"
"Analytics sent event 3"
"Analytics sent event 4"
"-----------------------"
"Failed to send event 5"
"Retrying sending event 5"
"-----------------------"
"Analytics sent event 5"
"Analytics sent event 6"
"Analytics sent event 7"
"Analytics sent event 8"
"-----------------------"
"Failed to send event 9"
"Retrying sending event 9"
"-----------------------"
"Analytics sent event 9"
"Analytics sent event 10"
*/


class SDK {
    constructor() {
        this.queue = [];
    }
    logEvent(e) {
        this.queue.push((shouldResolve) => new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldResolve) resolve(e);
                else reject(e);
            }, 1000)
        }));
    }
    async send() {
        let i = 1;
        while (this.queue.length) {
            const task = this.queue.shift();
            const shouldResolve = (i % 5) !== 0;
            i++;
            try {
                const res = await task(shouldResolve);
                console.log(`Analytics sent ${res}`);
            } catch (error) {
                console.log("-----------------------");
                console.log(`Failed to send ${error}`);
                console.log(`Retrying sending ${error}`);
                console.log("-----------------------");
                const res = await task(true);
                console.log(`Analytics sent ${res}`);
            }
        }
    }
}

const sdk = new SDK();

sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7");
sdk.logEvent("event 8");
sdk.logEvent("event 9");
sdk.logEvent("event 10");

sdk.send();
