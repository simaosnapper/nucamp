const rect = require('./rectangle');
const { response } = require('express');

function solveRect(l, w) {
    console.log(`Solving for rectange with dimensions ${l}, ${w}`);
    rect(l, w, (err, rect) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(`Area of rectangle with dimensions ${l}, ${w} is: ${rect.area(l, w)}`);
            console.log(`Perimeter of rectangle with dimensions ${l}, ${w} is', ${rect.perimeter(l, w)}`);
        }
        console.log('This statement is logged after the call to rect()');
    });
}

callback() {

}

function someFunc(callback) {
    let otherCounter = 2;
    let counter = 1;
    setTimeout(() => {
        callback();
    }, 1000)
}

const otherFunc = someFunc(callback);


solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(-3, 5);
