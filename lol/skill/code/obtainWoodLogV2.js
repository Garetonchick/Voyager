async function obtainWoodLog(bot) {
  // List of acceptable log types
  const logTypes = ["oak_log", "birch_log", "spruce_log", "jungle_log", "acacia_log", "dark_oak_log", "mangrove_log"];

  // Check inventory first
  for (const type of logTypes) {
    if (bot.inventory.count(mcData.itemsByName[type]?.id) > 0) {
      bot.chat("Already have a wood log");
      return;
    }
  }

  // Find the nearest log block
  let logBlock = null;
  for (const type of logTypes) {
    logBlock = bot.findBlock({
      matching: mcData.blocksByName[type]?.id,
      maxDistance: 32
    });
    if (logBlock) break;
  }

  // If no log found nearby, explore to find one
  if (!logBlock) {
    const randomDirection = new Vec3(Math.floor(Math.random() * 3) - 1,
    // -1, 0, or 1
    0, Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
    );
    logBlock = await exploreUntil(bot, randomDirection, 60, () => {
      for (const type of logTypes) {
        const block = bot.findBlock({
          matching: mcData.blocksByName[type]?.id,
          maxDistance: 32
        });
        if (block) return block;
      }
      return null;
    });
    if (!logBlock) {
      bot.chat("Could not find any wood logs after exploring");
      return;
    }
  }

  // Mine the log
  bot.chat("Found a wood log, mining...");
  await mineBlock(bot, mcData.blocks[logBlock.type].name, 1);

  // Verify
  for (const type of logTypes) {
    if (bot.inventory.count(mcData.itemsByName[type]?.id) > 0) {
      bot.chat(`Successfully obtained 1 ${type}!`);
      return;
    }
  }
  bot.chat("Failed to obtain wood log");
}