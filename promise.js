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
    #runCallbacks() {
        if (this.#state === PROMISE_STATES.FULFILLED) {
            this.#thenCbs.forEach((cb) => {
                cb(this.#result)
            });
            this.#thenCbs = [];
        }
        if (this.#state === PROMISE_STATES.FULFILLED) {
            this.#catchCbs.forEach((cb) => {
                cb(this.#result)
            });
            this.#catchCbs = [];
        }
    }
    #resolve(value) {
        if (this.#state !== PROMISE_STATES.PENDING) return;
        if (value instanceof CustomPromise) {
            value.then(this.#bindedResolve, this.#bindedReject);
        }
        this.#state = PROMISE_STATES.FULFILLED;
        this.#result = value;
        this.#runCallbacks();
    }
    #reject() {
        if (this.#state !== PROMISE_STATES.PENDING) return;
        this.#state = PROMISE_STATES.REJECTED;
        this.#result = value;
        this.#runCallbacks();
    }
    static resolve(value) {
        return new CustomPromise((resolve) => resolve(value));
    }
    static reject(value) {
        return new CustomPromise((_, reject) => reject(value));
    }
    then(successCb, failureCb) {
        return new CustomPromise((resolve, reject) => {
            this.#thenCbs.push((result) => {
                if (successCb == null) {
                    resolve(result);
                    return;
                }
                try {
                    resolve(successCb(result));
                } catch (error) {
                    reject(error);
                }
            });
            this.#catchCbs.push((result) => {
                if (failureCb == null) {
                    reject(result);
                    return;
                }
                try {
                    resolve(successCb(result));
                } catch (error) {
                    reject(error);
                }
            });
        });
        this.#runCallbacks();
    }
    catch(cb) {
        return this.then(null, cb);
    }
    finally(cb) {
        return this.then((result) => {
            cb();
            return result;
        }, (reason) => {
            cb();
            throw reason;
        });
    }
}