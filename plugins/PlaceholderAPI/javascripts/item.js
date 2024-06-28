
var vbukkit = org.bukkit.Bukkit;

if (args.length === 1) {
    var arg = args[0].split("_");
}
var playerArg = arg[1];
var player = vbukkit.getPlayer(playerArg);

if (player !== null) {
    var invItems = player.getInventory().getContents();
}

var mat;
var data = '0';
var amt = 1;
var name;
var lore;

var hasitemv = 'no';
var matchlores = 0;
var slot;

function checkItem() {

    if ( arg.length === 3 ) {
        mat = arg[2].replace("mat: ", "");
    } else if ( arg.length === 4 ) {
        mat = arg[2].replace("mat: ", "");
        data = arg[3].replace("data: ", "");
    } else if ( arg.length === 5 ) {
        mat = arg[2].replace("mat: ", "");
        data = arg[3].replace("data: ", "");
        amt = arg[4].replace("amt: ", "");
    } else if ( arg.length === 6 ) {
        mat = arg[2].replace("mat: ", "");
        data = arg[3].replace("data: ", "");
        amt = arg[4].replace("amt: ", "");
        name = arg[5].replace("name: ", "");
    } else if ( arg.length === 7 ) {
        mat = arg[2].replace("mat: ", "");
        data = arg[3].replace("data: ", "");
        amt = arg[4].replace("amt: ", "");
        name = arg[5].replace("name: ", "");
        lore = arg[6].replace("lore: ", "").split("|");
    }

    for ( s = 0; s < invItems.length; s++ ) {
        if ( invItems[s] !== null ) {
            if ( lore !== undefined && invItems[s].getItemMeta().hasLore() === false ) {
                    hasitemv = 'no';
            } else if ( lore !== undefined ) {
                if ( invItems[s].getType().toString() === mat || invItems[s].getTypeId() === parseInt(mat) ) {
                    if ( invItems[s].getData().toString().match(/\d+/)[0] === data ) {
                        if ( invItems[s].getAmount() >= parseInt(amt) ) {
                            if ( invItems[s].getItemMeta().getDisplayName() === name ) {
                                for ( l = 0; l < lore.length; l++ ) {
                                    if ( invItems[s].getItemMeta().getLore()[l] === lore[l] ) {
                                        matchlores++;
                                    }
                                }
                                }
                            }
                        }
                    }
                    if ( matchlores === lore.length ) {
                        hasitemv = 'yes';
                        slot = s;
                    }
                } else if ( name !== undefined ) {
                    if ( invItems[s].getType().toString() === mat || invItems[s].getTypeId() === parseInt(mat) ) {
                        if ( invItems[s].getData().toString().match(/\d+/)[0] === data ) {
                            if ( invItems[s].getAmount() >= parseInt(amt) ) {
                                if ( invItems[s].getItemMeta().getDisplayName() === name ) {
                                    hasitemv = 'yes';
                                    slot = s;
                                }
                            }
                        }
                    }
                } else {
                    if ( invItems[s].getType().toString() === mat || invItems[s].getTypeId() === parseInt(mat) ) {
                        if ( invItems[s].getData().toString().match(/\d+/)[0] === data ) {
                            if ( invItems[s].getAmount() >= parseInt(amt) ) {
                                hasitemv = 'yes';
                                slot = s;
                            }
                        }
                    }
                }
            }
        }
        return hasitemv;
}

function removeItem() {
    if ( checkItem() === 'yes' ) {
        if ( invItems[slot].getAmount() >= parseInt(amt) ) {
            var newAMT = invItems[slot].getAmount() - parseInt(amt);
            invItems[slot].setAmount(newAMT);
            return '&aItem removed successfully';
        }
    } else {
        return "&7" + playerArg + " &cdoesn't have the item.";
    }
}

function run() {

    if (args.length === 0 || args.length > 1 || arg.length === 1 || arg.length === 2 || arg[0].toUpperCase() !== 'CHECK' && arg[0].toUpperCase() !== 'REMOVE') {
        return "&cInvalid syntax. &7javascript_item_check/remove_[PLAYER]_mat: [MATERIAL/ID]_data: [DATA]_amt: [AMOUNT]_name: [DISPLAYNAME]_lore: [LORE]";
    } else if (arg[0].toUpperCase() === 'CHECK' && player !== null) {
        return checkItem();
    } else if (arg[0].toUpperCase() === 'REMOVE' && player !== null) {
        return removeItem();
    } else if (player === null) {
        return '&7' + playerArg + ' &cIs not online.'
    }
}

run();