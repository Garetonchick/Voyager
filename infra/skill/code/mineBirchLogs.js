async function mineBirchLogs(bot) {
  // Check current birch_log count
  const birchLogs = bot.inventory.items().filter(item => item.name === 'birch_log').length;
  if (birchLogs >= 4) {
    bot.chat("Already have enough birch logs");
    return;
  }
  const needed = 4 - birchLogs;
  bot.chat(`Need to mine ${needed} more birch logs`);

  // Function to find and mine birch logs
  const findAndMineBirchLog = async () => {
    const birchLogBlock = bot.findBlock({
      matching: mcData.blocksByName["birch_log"].id,
      maxDistance: 32
    });
    if (birchLogBlock) {
      try {
        await mineBlock(bot, "birch_log", 1);
        bot.chat("Mined 1 birch_log");
        return true;
      } catch (err) {
        bot.chat("Failed to mine birch_log, trying another");
      }
    }
    return false;
  };

  // Try to mine needed logs
  let mined = 0;
  while (mined < needed) {
    if (await findAndMineBirchLog()) {
      mined++;
      continue;
    }

    // If no logs nearby, explore to find some
    const randomDirection = new Vec3(Math.floor(Math.random() * 3) - 1, 0, Math.floor(Math.random() * 3) - 1);
    const foundLog = await exploreUntil(bot, randomDirection, 60, async () => {
      return await findAndMineBirchLog();
    });
    if (!foundLog) {
      bot.chat("Could not find any birch logs nearby");
      break;
    }
    mined++;
  }
  if (mined >= needed) {
    bot.chat("Successfully mined 4 birch logs");
  } else {
    bot.chat(`Only mined ${birchLogs + mined} birch logs, need ${4 - (birchLogs + mined)} more`);
  }
}