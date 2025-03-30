async function obtainWoodLog(bot) {
  // Check inventory first
  if (bot.inventory.count(mcData.itemsByName.jungle_log.id) > 0) {
    bot.chat("Already have a jungle log");
    return;
  }

  // Find the jungle log from nearby blocks
  const logBlock = bot.findBlock({
    matching: mcData.blocksByName.jungle_log.id,
    maxDistance: 32
  });
  if (!logBlock) {
    bot.chat("No jungle log found nearby");
    return;
  }

  // Mine the jungle log
  bot.chat("Found jungle log, mining...");
  await mineBlock(bot, "jungle_log", 1);

  // Verify
  if (bot.inventory.count(mcData.itemsByName.jungle_log.id) > 0) {
    bot.chat("Successfully obtained 1 jungle log!");
  } else {
    bot.chat("Failed to obtain jungle log");
  }
}