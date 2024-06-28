/*
base: base price set in price: option,
current: current level,
next: target level,
*/

function constant(base, current, next) {
    return base;
}

function constant_diff(base, current, next) {
    return base * (next - current);
}

function linear_diff(base, current, next) {
    var ret = 0;
    current++;
    next++;
    for (var i = current; i < next; i++) {
        ret += (i * base);
    }
    return ret;
}

function exponential1(base, current, next) {
    var ret = 0;
    for (var i = current; i < next; i++) {
        ret += base * Math.pow(i, 1.8);
    }
    return ret;
}

function power2(base, current, next) {
    var ret = 0;
    for (var i = current; i < next; i++) {
        ret += base * Math.pow(2, i);
    }
    return ret;
}

function step(base, current, next) {
    var unit_cost;
    if (next < 5)        // level 0 - 4
        unit_cost = 10;
    else if (next < 10)  // level 5 - 9
        unit_cost = 20;
    else                 // level 10 and above
        unit_cost = 50;
    return (next - current) * unit_cost;
}
