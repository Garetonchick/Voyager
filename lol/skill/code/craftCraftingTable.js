async function craftCraftingTable(bot) {
  // Check if we have enough oak planks
  const planksCount = bot.inventory.count(mcData.itemsByName.oak_planks.id);
  if (planksCount < 4) {
    bot.chat("Not enough oak planks to craft a crafting table");
    return;
  }

  // Craft the crafting table
  bot.chat("Crafting a crafting table...");
  await craftItem(bot, "crafting_table", 1);

  // Verify
  const craftingTableCount = bot.inventory.count(mcData.itemsByName.crafting_table.id);
  if (craftingTableCount >= 1) {
    bot.chat("Successfully crafted a crafting table!");
  } else {
    bot.chat("Failed to craft a crafting table");
  }
}