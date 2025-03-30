async function craftOakPlanks(bot) {
  // Check if we have oak logs
  if (bot.inventory.count(mcData.itemsByName.oak_log.id) < 1) {
    bot.chat("Need to collect oak logs first");
    await mineWoodLog(bot);
  }

  // Place crafting table
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);
  bot.chat("Placed crafting table");

  // Craft oak planks
  await craftItem(bot, "oak_planks", 1); // 1 recipe makes 4 planks
  bot.chat("Crafted 4 oak planks");

  // Verify
  const planksCount = bot.inventory.count(mcData.itemsByName.oak_planks.id);
  if (planksCount >= 4) {
    bot.chat("Successfully crafted 4 oak planks!");
  } else {
    bot.chat("Failed to craft 4 oak planks");
  }
}