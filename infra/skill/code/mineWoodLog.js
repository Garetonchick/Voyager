async function mineWoodLog(bot) {
  // Check if we already have a log in inventory
  const logTypes = ["oak_log", "birch_log"];
  for (const logType of logTypes) {
    if (bot.inventory.items().some(item => item.name === logType)) {
      bot.chat("Already have a wood log in inventory");
      return;
    }
  }

  // Function to find and mine a log
  const findAndMineLog = async () => {
    for (const logType of logTypes) {
      const logBlock = bot.findBlock({
        matching: mcData.blocksByName[logType]?.id,
        maxDistance: 32
      });
      if (logBlock) {
        try {
          await mineBlock(bot, logType, 1);
          bot.chat(`Mined 1 ${logType}`);
          return true;
        } catch (err) {
          bot.chat(`Failed to mine ${logType}, trying another`);
        }
      }
    }
    return false;
  };

  // Try to find and mine nearby logs first
  if (await findAndMineLog()) return;

  // If no logs nearby, explore to find some
  const randomDirection = new Vec3(Math.floor(Math.random() * 3) - 1, 0, Math.floor(Math.random() * 3) - 1);
  const foundLog = await exploreUntil(bot, randomDirection, 60, async () => {
    return await findAndMineLog();
  });
  if (!foundLog) {
    bot.chat("Could not find any wood logs nearby");
  }
}