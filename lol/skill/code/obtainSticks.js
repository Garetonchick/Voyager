async function obtainSticks(bot) {
  // Check current stick count
  const sticksCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (sticksCount >= 2) {
    bot.chat(`Already have ${sticksCount} sticks, no need to get more`);
    return;
  }

  // If we don't have enough sticks, try breaking leaves first
  const leavesBlocks = bot.findBlocks({
    matching: block => {
      return block.name.includes("leaves");
    },
    maxDistance: 32,
    count: 3 // Only need to break a few leaves
  });
  if (leavesBlocks.length > 0) {
    bot.chat("Breaking leaves to get sticks...");
    for (const blockPos of leavesBlocks) {
      const block = bot.blockAt(blockPos);
      await bot.dig(block);
      // Check if we got enough sticks
      if (bot.inventory.count(mcData.itemsByName.stick.id) >= 2) {
        bot.chat("Got enough sticks from leaves!");
        return;
      }
    }
  }

  // If still not enough, try crafting from planks
  const planksCount = bot.inventory.count(mcData.itemsByName.oak_planks.id);
  if (planksCount >= 1) {
    bot.chat("Crafting sticks from planks...");
    await craftItem(bot, "stick", 1); // 1 recipe makes 4 sticks
    bot.chat("Crafted 4 sticks from planks!");
  } else {
    bot.chat("Couldn't get sticks - no leaves or planks available");
  }
}