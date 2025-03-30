async function smeltRawIron(bot) {
  // Check if we have required items
  if (!bot.inventory.items().some(item => item.name === 'raw_iron')) {
    bot.chat("No raw_iron available");
    return;
  }
  if (!bot.inventory.items().some(item => item.name === 'furnace')) {
    bot.chat("No furnace available");
    return;
  }
  if (!bot.inventory.items().some(item => item.name === 'coal')) {
    bot.chat("No coal available for fuel");
    return;
  }

  // Place furnace
  bot.chat("Placing furnace...");
  await placeItem(bot, "furnace", bot.entity.position.offset(1, 0, 0));

  // Smelt raw_iron
  bot.chat("Smelting raw_iron into iron_ingot...");
  await smeltItem(bot, "raw_iron", "coal", 1);

  // Verify result
  if (bot.inventory.items().some(item => item.name === 'iron_ingot')) {
    bot.chat("Successfully smelted iron_ingot!");
  } else {
    bot.chat("Failed to smelt iron_ingot");
  }
}