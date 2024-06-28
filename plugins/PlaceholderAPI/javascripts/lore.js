var player = BukkitPlayer;
var item = player.getInventory().getItemInHand();
var lore = null;

function itemlore() {

    if (item == null || item.getType() == "AIR") {
        return "";
    }

    if (item.hasItemMeta() && item.getItemMeta().hasLore()) {
        lore = item.getItemMeta().getLore();
    }

    if (lore == null) {
        return "";
    }

    if (args.length == 1) {
        var index = parseInt(args[0]) - 1;
        if (isNaN(index)) {
            return "invalid index";
        } else {
            if (lore.length > index) {
                return lore[index];
            }
            return "";
        }
    } else {
        return lore.toString().replace(/^\[/, "").replace(/.$/,"").replace(/, /g, '\n');
    }
}

itemlore();