async function smeltRawIron(bot) {
  // Check if we already have iron_ingot
  if (bot.inventory.items().some(item => item.name === 'iron_ingot')) {
    bot.chat("Already have iron_ingot");
    return;
  }

  // Check if we have raw_iron
  if (!bot.inventory.items().some(item => item.name === 'raw_iron')) {
    bot.chat("No raw_iron available");
    return;
  }

  // Check if we have furnace
  if (!bot.inventory.items().some(item => item.name === 'furnace')) {
    bot.chat("No furnace available");
    return;
  }

  // Check if we have fuel (coal)
  if (!bot.inventory.items().some(item => item.name === 'coal')) {
    bot.chat("No coal available for fuel");
    return;
  }

  // Place furnace
  bot.chat("Placing furnace");
  await placeItem(bot, "furnace", bot.entity.position.offset(1, 0, 0));

  // Smelt raw_iron
  bot.chat("Smelting raw_iron into iron_ingot");
  await smeltItem(bot, "raw_iron", "coal", 1);

  // Verify
  if (bot.inventory.items().some(item => item.name === 'iron_ingot')) {
    bot.chat("Successfully smelted iron_ingot");
  } else {
    bot.chat("Failed to smelt iron_ingot");
  }
}