async function mineCopperOre(bot) {
  // Check if we already have copper ore
  if (bot.inventory.items().some(item => item.name === 'copper_ore')) {
    bot.chat("Already have copper ore");
    return;
  }

  // Check if we have stone pickaxe
  if (!bot.inventory.items().some(item => item.name === 'stone_pickaxe')) {
    bot.chat("Need to craft stone pickaxe first");

    // Place crafting table if we have one
    if (bot.inventory.items().some(item => item.name === 'crafting_table')) {
      const position = bot.entity.position.offset(1, 0, 0);
      bot.chat("Placing crafting table");
      await placeItem(bot, "crafting_table", position);
    } else {
      bot.chat("No crafting table available");
      return;
    }

    // Check cobblestone count
    const cobblestoneCount = bot.inventory.items().filter(item => item.name === 'cobblestone').length;
    if (cobblestoneCount < 3) {
      bot.chat("Need to mine 3 cobblestone");
      await mineBlock(bot, "stone", 3);
    }

    // Craft stone pickaxe
    bot.chat("Crafting stone pickaxe");
    await craftItem(bot, "stone_pickaxe", 1);
  }

  // Mine copper ore
  bot.chat("Mining copper ore");
  await mineBlock(bot, "copper_ore", 1);

  // Verify
  if (bot.inventory.items().some(item => item.name === 'copper_ore')) {
    bot.chat("Successfully mined copper ore");
  } else {
    bot.chat("Failed to mine copper ore");
  }
}