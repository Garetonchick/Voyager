async function mineCoalOre(bot) {
  // Check if we already have coal (though task requires mining 1 more)
  if (bot.inventory.items().some(item => item.name === 'coal')) {
    bot.chat("Already have coal, but mining 1 more as requested");
  }

  // Mine 1 coal_ore
  bot.chat("Mining coal ore");
  await mineBlock(bot, "coal_ore", 1);

  // Verify
  const coalCount = bot.inventory.items().filter(item => item.name === 'coal').length;
  if (coalCount > 1) {
    bot.chat(`Successfully mined coal. Now have ${coalCount} coal`);
  } else {
    bot.chat("Failed to mine coal");
  }
}