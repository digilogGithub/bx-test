import {curry} from './curry.js';
import {map} from './map.js';
import {filter} from './filter.js';
import {take} from './take.js';
import {reduce} from './reduce.js';
import {go} from './go.js'
import {pipe} from './pipe.js'
import {pTest} from './pTest.js'

const log = console.log;
const add = curry((a, b) => a + b);
export {log, add, curry, reduce, take, pipe, map, go, filter, pTest}
