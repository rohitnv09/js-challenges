/*
CHALLENGE:

In this question, we have to implement a utility called pipe that takes n functions as input and returns a function that can be invoked to
compute the final result by invoking each input function and providing the previous function's output as an argument.

Syntax:
pipe(fnl, fn2, fn3, .... n)(input);

Arguments:
A list of input functions to be executed

Returns:
A function that can be invoked to compute the final value

Example:
const getName = (object) => object.name;
const makeUpperCase = (string) => string.toUpperCase();
const slice = (string) => string.slice(0, 3);

const method = pipe(getName, makeUpperCase, slice);

const value = method({ name: 'devtools' });

console.log(value);
*/


// Solution

const getName = (object) => object.name;
const makeUpperCase = (string) => string.toUpperCase();
const slice = (string) => string.slice(0, 3);

function pipe(...fns){
    return function(arg){
        return fns.reduce((accumulator, fn) => {
            return fn(accumulator);
        }, arg);
    }
}

const method = pipe(getName, makeUpperCase, slice);

const value = method({ name: 'Anime' });

console.log(value);