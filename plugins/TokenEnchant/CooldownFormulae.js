/********  utility functions. ********/
/******** do not delete these utility functions. ********/
function limitVlaue(val, min, max) {
    return val < min ? min : (val > max ? max : val);
}

/*
currentlevel: current enchantment level,
maxLevel: maximum level of enchantment.
minCool: minimum cooldown value.
maxCool: maximum cooldown value. (this value should be the longest cooldown).
*/

function constant(currentLevel, maxLevel, minCool, maxCool) {
    return maxCool;
}

function linear_decent(currentLevel, maxLevel, minCool, maxCool) {
    if (maxLevel == 1) {
        return constant(currentLevel, maxLevel, minCool, maxCool);
    }
    var slope = (minCool - maxCool) / (maxLevel - 1);
    var intercect =  maxCool - slope;
    return slope * currentLevel + intercect;
}

function step(currentLevel, maxLevel, minCool, maxCool) {
    var additional;
    if (currentLevel < 5)        // level 0 - 4
        additional = 50;
    else if (currentLevel < 10)  // level 5 - 9
        additional = 20;
    else                 // level 10 and above
        additional = 50;
    return minCool + additional;
}