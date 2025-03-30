async function mineLapisOre(bot) {
  // Check if we already have lapis lazuli
  if (bot.inventory.items().some(item => item.name === 'lapis_lazuli')) {
    bot.chat("Already have lapis lazuli");
    return;
  }

  // Mine 1 lapis_ore
  bot.chat("Mining lapis ore");
  await mineBlock(bot, "lapis_ore", 1);

  // Verify
  if (bot.inventory.items().some(item => item.name === 'lapis_lazuli')) {
    bot.chat("Successfully mined lapis ore and got lapis lazuli");
  } else {
    bot.chat("Failed to mine lapis ore");
  }
}