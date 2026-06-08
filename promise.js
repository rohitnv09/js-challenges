const PROMISE_STATES = {
    PENDING: "pending",
    FULFILLED: "fulfilled",
    REJECTED: "rejected"
}
class CustomPromise {
    #state = PROMISE_STATES.PENDING;
    #result;
    #thenCbs = [];
    #catchCbs = [];
    #bindedResolve = #resolve.bind(this);
    #bindedReject = #reject.bind(this);
    constructor(executor) {
        try {
            executor(this.#bindedResolve, this.#bindedReject);
        } catch (error) {
            this.#bindedReject(error);
        }
    }
    #resolve(value) {
        if (this.#state !== PROMISE_STATES.PENDING) return;
        if (value instanceof CustomPromise) {
            value.then(this.#bindedResolve, this.#bindedReject);
        }
        this.#state = PROMISE_STATES.FULFILLED;
        this.#result = value;
    }
    #reject() {
        if (this.#state !== PROMISE_STATES.PENDING) return;
        this.#state = PROMISE_STATES.REJECTED;
        this.#result = value;
    }
    static resolve(value) {
        return new CustomPromise((resolve) => resolve(value));
    }
    static reject(value) {
        return new CustomPromise((_, reject) => reject(value));
    }
    then(successCb, failureCb) {

    }
    catch(cb) {
        return this.then(null, cb);
    }
    finally(cb) {
        return this.then();
    }
}