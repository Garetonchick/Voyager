async function smeltCopperOre(bot) {
  // Check if we already have copper ingot
  if (bot.inventory.items().some(item => item.name === 'copper_ingot')) {
    bot.chat("Already have copper ingot");
    return;
  }

  // Check if we have raw_copper
  if (!bot.inventory.items().some(item => item.name === 'raw_copper')) {
    bot.chat("No raw_copper available");
    return;
  }

  // Check if we have a furnace
  if (!bot.inventory.items().some(item => item.name === 'furnace')) {
    bot.chat("Need to craft a furnace");
    // Check cobblestone count
    if (bot.inventory.items().filter(item => item.name === 'cobblestone').length < 8) {
      bot.chat("Need to mine more cobblestone");
      await mineBlock(bot, "stone", 8);
    }
    // Place crafting table if not already placed
    const craftingTableBlock = bot.findBlock({
      matching: mcData.blocksByName.crafting_table.id,
      maxDistance: 32
    });
    if (!craftingTableBlock) {
      bot.chat("Placing crafting table");
      await placeItem(bot, "crafting_table", bot.entity.position.offset(1, 0, 0));
    }
    // Craft furnace
    bot.chat("Crafting furnace");
    await craftItem(bot, "furnace", 1);
  }

  // Place furnace
  bot.chat("Placing furnace");
  await placeItem(bot, "furnace", bot.entity.position.offset(1, 0, 0));

  // Smelt raw_copper
  bot.chat("Smelting raw_copper into copper_ingot");
  await smeltItem(bot, "raw_copper", "coal", 1);

  // Verify
  if (bot.inventory.items().some(item => item.name === 'copper_ingot')) {
    bot.chat("Successfully smelted copper_ingot");
  } else {
    bot.chat("Failed to smelt copper_ingot");
  }
}