class Calculator {
    total = 0;
    constructor() { }
    add(v) {
        this.total = this.total + v;
        return this;
    }
    subtract(v) {
        this.total = this.total - v;
        return this;
    }
    divide(v) {
        this.total = this.total / v;
        return this;
    }
    multiply(v) {
        this.total = this.total * v;
        return this;
    }
}

// const calculator = new Calculator();

const calculator = {
    total: 0,
    add(v) {
        this.total += v;
        return this;
    },
    subtract(v) {
        this.total -= v;
        return this;
    },
    divide(v) {
        this.total /= v;
        return this;
    },
    multiply(v) {
        this.total *= v;
        return this;
    }
}

calculator
    .add(10)
    .subtract(2)
    .divide(2)
    .multiply(5);

console.log(calculator.total);

