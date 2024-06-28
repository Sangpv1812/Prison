/********  utility functions. ********/
/******** do not delete these utility functions. ********/
function limitVlaue(val, min, max) {
    return val < min ? min : (val > max ? max : val);
}
/*
currentlevel: current level,
maxLevel: max level of the enchant,
min: minimum chance rate
max: maximum chance rate
*/

function constant(currentLevel, maxLevel, min, max) {
    return max;
}

function linear(currentLevel, maxLevel, min, max) {
    maxLevel = maxLevel == 0 ? 1 : maxLevel;
    var chance = min + (currentLevel/maxLevel) * (max - min);
    return limitVlaue(chance, 0.0, 1.0);
}

function range_step(currentLevel, maxLevel, min, max) {
    var additional;
    if (currentLevel < 5)        // level 0 - 4
        additional = 0.10;
    else if (currentLevel < 10)  // level 5 - 9
        additional = 0.25;
    else                 // level 10 and above
        additional = 0.553;
    return limitVlaue((min + additional), 0.0, 1.0);
}
