async function craftIronSword(bot) {
  // Check if we already have an iron sword
  if (bot.inventory.items().some(item => item.name === 'iron_sword')) {
    bot.chat("Already have an iron sword");
    return;
  }

  // Place crafting table
  bot.chat("Placing crafting table");
  await placeItem(bot, "crafting_table", bot.entity.position.offset(1, 0, 0));

  // Craft iron sword
  bot.chat("Crafting iron sword");
  await craftItem(bot, "iron_sword", 1);

  // Verify
  if (bot.inventory.items().some(item => item.name === 'iron_sword')) {
    bot.chat("Successfully crafted iron sword!");
  } else {
    bot.chat("Failed to craft iron sword");
  }
}