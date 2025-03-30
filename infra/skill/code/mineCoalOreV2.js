async function mineCoalOre(bot) {
  // Check if we already have coal
  if (bot.inventory.items().some(item => item.name === 'coal')) {
    bot.chat("Already have coal");
    return;
  }

  // Mine 1 coal_ore
  bot.chat("Mining coal ore");
  await mineBlock(bot, "coal_ore", 1);

  // Verify
  if (bot.inventory.items().some(item => item.name === 'coal')) {
    bot.chat("Successfully mined coal");
  } else {
    bot.chat("Failed to mine coal");
  }
}