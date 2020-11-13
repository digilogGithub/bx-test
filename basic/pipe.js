import {go} from './go.js';

export const pipe = (f, ...fns) => (...args) => go(f(...args), ...fns)
