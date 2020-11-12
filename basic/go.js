import {reduce} from './reduce.js';

export const go = (...args) => reduce((a, f) => f(a), args);
