async function smeltRawIron(bot) {
  // Check if we have raw_iron
  if (!bot.inventory.items().some(item => item.name === 'raw_iron')) {
    bot.chat("No raw_iron available");
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

  // Smelt raw_iron
  bot.chat("Smelting raw_iron into iron_ingot");
  await smeltItem(bot, "raw_iron", "coal", 1);

  // Verify
  const ironIngotCount = bot.inventory.items().filter(item => item.name === 'iron_ingot').length;
  bot.chat(`Successfully smelted iron_ingot. Now have ${ironIngotCount} iron_ingots`);
}