async function mineIronOreForTwo(bot) {
  // Check current inventory
  const rawIronCount = bot.inventory.items().filter(item => item.name === 'raw_iron').length;
  if (rawIronCount >= 2) {
    bot.chat("Already have at least 2 raw_iron");
    return;
  }

  // Calculate how many more we need to mine (1 since we have 1 already)
  const needed = 2 - rawIronCount;
  bot.chat(`Need to mine ${needed} more iron_ore`);

  // Explore until finding iron_ore
  const ironOre = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
    return bot.findBlock({
      matching: mcData.blocksByName["iron_ore"].id,
      maxDistance: 32
    });
  });
  if (!ironOre) {
    bot.chat("Could not find iron_ore within 60 seconds");
    return;
  }

  // Mine the iron_ore
  await mineBlock(bot, "iron_ore", needed);

  // Verify final count
  const finalCount = bot.inventory.items().filter(item => item.name === 'raw_iron').length;
  if (finalCount >= 2) {
    bot.chat(`Successfully mined ${needed} iron_ore and now have ${finalCount} raw_iron`);
  } else {
    bot.chat(`Failed to get 2 raw_iron - only have ${finalCount}`);
  }
}