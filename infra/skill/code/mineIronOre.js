async function mineIronOre(bot) {
  // Check if we already have iron_ore or raw_iron
  if (bot.inventory.items().some(item => item.name === 'iron_ore')) {
    bot.chat("Already have iron_ore");
    return;
  }
  if (bot.inventory.items().some(item => item.name === 'raw_iron')) {
    bot.chat("Already have raw_iron from iron_ore");
  }

  // Mine 1 iron_ore
  bot.chat("Mining iron_ore");
  await mineBlock(bot, "iron_ore", 1);

  // Verify
  if (bot.inventory.items().some(item => item.name === 'raw_iron')) {
    bot.chat("Successfully mined iron_ore and got raw_iron");
  } else {
    bot.chat("Failed to mine iron_ore");
  }
}