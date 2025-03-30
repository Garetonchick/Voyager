async function smeltRawCopper(bot) {
  // Check if we have raw_copper
  if (!bot.inventory.items().some(item => item.name === 'raw_copper')) {
    bot.chat("No raw_copper available");
    return;
  }

  // Check if we have fuel (coal)
  if (!bot.inventory.items().some(item => item.name === 'coal')) {
    bot.chat("No coal available for fuel");
    return;
  }

  // Check if we have furnace
  if (!bot.inventory.items().some(item => item.name === 'furnace')) {
    bot.chat("No furnace available");
    return;
  }

  // Place furnace
  bot.chat("Placing furnace");
  await placeItem(bot, "furnace", bot.entity.position.offset(1, 0, 0));

  // Smelt raw_copper
  bot.chat("Smelting raw_copper into copper_ingot");
  await smeltItem(bot, "raw_copper", "coal", 1);

  // Verify
  const copperIngotCount = bot.inventory.items().filter(item => item.name === 'copper_ingot').length;
  if (copperIngotCount > 1) {
    bot.chat(`Successfully smelted copper_ingot. Now have ${copperIngotCount} copper_ingots`);
  } else {
    bot.chat("Failed to smelt copper_ingot");
  }
}