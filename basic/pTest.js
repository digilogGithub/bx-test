export const pTest = (name, repeat, f) => {
    console.time(name);
    while(repeat--) f();
    console.timeEnd(name);
};
