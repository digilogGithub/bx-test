import {log} from '../basic'

function add10(a, callback) {
    setTimeout(() => callback(a + 10), 1000);
}

// add10(5, res => {
//     log(res);
// });
//
// add10(5, res => {
//     add10(res, res => {
//         add10(res, res => {
//             log(res);
//         });
//     });
// });
//
// const callbackAdd = add10(5, res => {
//     add10(res, res => {
//         add10(res, res => {
//             log(res);
//         });
//     });
// });
// log('callbackAdd', callbackAdd)

function add20(a) {
    return new Promise(resolve => setTimeout(() => resolve(a + 20), 500)) //return important
}

// add20(5).then(log)
//
// add20(5)
//     .then(add20)
//     .then(add20)
//     .then(log)

/*const promiseAdd = add20(5)
    .then(add20)
    .then(add20)

log('promiseAdd', promiseAdd)

promiseAdd.then(a => a - 40).then(log);*/

const delay100 = a => new Promise(resolve => setTimeout(() => resolve(a), 500))

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);
const add5 = a => a + 5;

// const re = go1(10, add5)
// log(re)
//
// const pre = go1(delay100(10), add5);
// pre.then(log)
// log(go1(10, add5))
// go1(go1(10, add5), log);
// go1(go1(delay100(10), add5), log)

const g = a => a + 1;
const f = a => a * a;

log(f(g(1)))
log(f(g()))
