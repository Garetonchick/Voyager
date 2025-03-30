async function craftIronPickaxe(bot) {
  // Check if we already have an iron pickaxe
  if (bot.inventory.items().some(item => item.name === 'iron_pickaxe')) {
    bot.chat("Already have an iron pickaxe");
    return;
  }

  // Check materials needed
  const ironIngotsNeeded = 3 - bot.inventory.items().filter(item => item.name === 'iron_ingot').length;
  const sticksNeeded = 2 - bot.inventory.items().filter(item => item.name === 'stick').length;

  // Get missing iron ingots
  if (ironIngotsNeeded > 0) {
    bot.chat(`Need ${ironIngotsNeeded} more iron ingots`);

    // Mine iron ore
    await mineBlock(bot, "iron_ore", ironIngotsNeeded);

    // Place furnace if we don't have one placed
    if (!bot.findBlock({
      matching: mcData.blocksByName.furnace.id,
      maxDistance: 32
    })) {
      await placeItem(bot, "furnace", bot.entity.position.offset(1, 0, 0));
    }

    // Smelt raw iron
    await smeltItem(bot, "raw_iron", "coal", ironIngotsNeeded);
  }

  // Get missing sticks
  if (sticksNeeded > 0) {
    bot.chat(`Need ${sticksNeeded} more sticks`);

    // Place crafting table if we don't have one placed
    if (!bot.findBlock({
      matching: mcData.blocksByName.crafting_table.id,
      maxDistance: 32
    })) {
      await placeItem(bot, "crafting_table", bot.entity.position.offset(1, 0, 0));
    }

    // Craft sticks from planks
    await craftItem(bot, "stick", Math.ceil(sticksNeeded / 4));
  }

  // Now craft the iron pickaxe
  bot.chat("Crafting iron pickaxe");
  await craftItem(bot, "iron_pickaxe", 1);

  // Verify
  if (bot.inventory.items().some(item => item.name === 'iron_pickaxe')) {
    bot.chat("Successfully crafted iron pickaxe!");
  } else {
    bot.chat("Failed to craft iron pickaxe");
  }
}