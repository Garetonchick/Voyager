async function mineCoalOre(bot) {
  // Check if we already have coal (just for logging)
  if (bot.inventory.items().some(item => item.name === 'coal')) {
    bot.chat("Already have some coal, mining 1 more");
  }

  // Mine 1 coal_ore
  bot.chat("Mining coal ore");
  await mineBlock(bot, "coal_ore", 1);

  // Verify we have at least 1 coal
  const hasCoal = bot.inventory.items().some(item => item.name === 'coal');
  if (hasCoal) {
    bot.chat("Successfully mined coal");
  } else {
    bot.chat("Failed to mine coal");
  }
}