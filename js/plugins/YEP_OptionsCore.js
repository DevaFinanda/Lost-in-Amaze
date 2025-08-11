//=============================================================================
// Yanfly Engine Plugins - Options Core
// YEP_OptionsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_OptionsCore = true;

var Yanfly = Yanfly || {};
Yanfly.Options = Yanfly.Options || {};
Yanfly.Options.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 Expand the Options Menu into a more elegant looking menu
 * with more customization potential.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * WARNING: This plugin is to be used with RPG Maker MV 1.5.0 or above! This is
 * because the MV 1.5.0+ editor allows for this plugin to be made in an orderly
 * and efficient manner. Please make sure your RPG Maker MV software is up to
 * date before using this plugin.
 *
 * The Options Menu can be the one thing that can change how comfortable a
 * player is with your game. Within the Options Menu, the player can alter any
 * given settings to their liking adjusting to their playstyle. By default,
 * settings like 'Always Dash' and 'Command Remember' are included in RPG Maker
 * MV and other plugins made for RPG Maker MV may also add in newer options to
 * the list. However, the menus themselves were always a bit iffy to look at
 * and/or adjust. This plugin gives the Options Menu a visual makeover and full
 * control over what options can be added to the menu to befit your players!
 *
 * This plugin supports the following plugins:
 * - GamepadConfig.js
 * - YEP_AnimateTilesOption.js
 * - YEP_BattleAniSpeedOpt.js
 * - YEP_FpsSynchOption.js
 * - YEP_KeyboardConfig.js
 * - YEP_X_ActSeqPack3.js
 * - YEP_X_BattleSysATB.js
 * - YEP_X_DifficultySlider.js
 *
 * Be sure to update them if you haven't already.
 *
 * ============================================================================
 * Instructions - Option Categories Plugin Parameters
 * ============================================================================
 *
 * This plugin adds in 'Option Categories' into the Options Menu. Aside from
 * the 'All' and 'Exit' categories, all of the categories are customizable from
 * the way they appear in the menu to the way they behave.
 *
 * Here is how each parameter behaves:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Name:
 *   - Determines the way the Category name appears. Name or rename categories
 *   as you see fit. You can use text codes with this parameter, allowing you
 *   to add icons (\i[x]) or change the text color (\c[x]) of the category.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Help Description:
 *   - This is the text shown in the help window at the top of the Options Menu
 *   whenever this category is highlighted. Use it to describe what types of
 *   options will appear in this category and how they will affect the game.
 *   You may also use text codes with this parameter.
 *
 *   Options List:
 *   - This is the list of options that appear on the right side of the Options
 *   Menu when this category is highlighted or selected. You can add, edit,
 *   move around, or delete options from this list as you see fit. For details
 *   on how the plugin parameters for the Options List work, look in the next
 *   section below:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * ============================================================================
 * Instructions - Option List Plugin Parameters
 * ============================================================================
 *
 * This section explains how the plugin parameters for the Options List operate
 * and how they interact with the rest of the plugin.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Name:
 *   - Determines the way the Options name appears. Name or rename the option
 *   as you see fit. This does not use the command names provided by other
 *   plugins by default. You can use text codes with this parameter, allowing
 *   you to add icons (\i[x]) or change the text color (\c[x]) of the option.
 *
 *   * If you name this as 'EVAL: code' without the 'quotes', the name of this
 *   option will be whatever string that the code outputs.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Help Description:
 *   - This is the text shown in the help window at the top of the Options Menu
 *   whenever this option is highlighted. Use it to describe what this option
 *   changes for the game.
 *
 *   ---
 *
 *   Symbol:
 *   - This is the identifier for the option. Each option should have a unique
 *   symbol, so much as to not cause conflicts within the Options Settings.
 *   However, shared symbols are perfectly fine as long as you're fine with
 *   them performing the same functions when selected.
 *
 *   ---
 *
 *   Show/Hide:
 *   - This is the code used to determine if this option will be visible on the
 *   list of options within this category.
 *
 *     To make sure it always shows, use the following code:
 *     show = true;
 *
 *   ---
 *
 *   Enable:
 *   - This is the code used to determine if this option will be enabled. It is
 *   recommended that you leave all options as enabled as to not lock away
 *   options from the player.
 *
 *     To make sure it is always enabled, use the following code:
 *     enabled = true;
 *
 *   ---
 *
 *   Ext:
 *   - Stands for extension. This serves as a secondary symbol for the option
 *   and it can be used for pretty much anything. It has no direct impact on
 *   the option unless the option's effect is related to the extension value.
 *   The majority of options do not need to make use of the Ext value so it is
 *   best to just leave this alone.
 *
 *     To leave it alone the following code:
 *     ext = 0;
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   The following section is best left untouched if you do not know any JS
 *   programming and don't have instructions on how to set it up. This is
 *   because all of the behaviors related to the options can be controlled from
 *   here and a mistake can crash the game.
 *
 *   Make Command Code:
 *   - This is the code used to add the option command to the list of options.
 *   Use this to modify the name, symbol, if it is enabled, or change the ext
 *   value before finally adding it to the list.
 *
 *     The default code:
 *     this.addCommand(name, symbol, enabled, ext);
 *
 *   ---
 *
 *   Draw Option Code:
 *   - This is how the option is 'drawn' onto the Options window and seen by
 *   your players. Everything here controls the way the option looks from the
 *   way it is named to the position of the text. The majority of the variables
 *   defined towards the beginning of the default code is placed there for the
 *   sake of convenience.
 *
 *     The default code:
 *     var rect = this.itemRectForText(index);
 *     var statusWidth = this.statusWidth();
 *     var titleWidth = rect.width - statusWidth;
 *     this.resetTextColor();
 *     this.changePaintOpacity(this.isCommandEnabled(index));
 *     this.drawOptionsName(index);
 *     this.drawOptionsOnOff(index);
 *
 *   ---
 *
 *   Process OK Code:
 *   - This is the code that runs when the player presses any kind of confirm
 *   button (Z, Enter, Left Click) on this option. For most options, this will
 *   switch between an ON/OFF option. For others, this will make the value of
 *   the option scale upwards until it loops back.
 *
 *     The default code:
 *     var index = this.index();
 *     var symbol = this.commandSymbol(index);
 *     var value = this.getConfigValue(symbol);
 *     this.changeValue(symbol, !value);
 *
 *   ---
 *
 *   Cursor Right Code:
 *   - This is the code that runs when the player presses the RIGHT button.
 *   Usually, this will move most options into an ON position. For others, this
 *   will scale the value of the option upward.
 *
 *     The default code:
 *     var index = this.index();
 *     var symbol = this.commandSymbol(index);
 *     var value = this.getConfigValue(symbol);
 *     this.changeValue(symbol, true);
 *
 *   ---
 *
 *   Cursor Left Code:
 *   - This is the code that runs when the player presses the LEFT button.
 *   Usually, this will move most options into an OFF position. For others,
 *   this will scale the value of the option downward.
 *
 *     The default code:
 *     var index = this.index();
 *     var symbol = this.commandSymbol(index);
 *     var value = this.getConfigValue(symbol);
 *     this.changeValue(symbol, false);
 *
 *   ---
 *
 *   Default Config Code:
 *   - When creating new options, this determines the default value of the
 *   option. For most options, this starts in an OFF position, which is usually
 *   represented by a 'false' boolean.
 *
 *     The default code:
 *     ConfigManager[symbol] = false;
 *
 *   ---
 *
 *   Save Config Code:
 *   - This determines how saving the Options Settings is done through code.
 *   Normally, this takes on the value as it is for the ConfigManager.
 *
 *     The default code:
 *     config[symbol] = ConfigManager[symbol];
 *
 *   ---
 *
 *   Load Config Code:
 *   - This determines how the ConfigManager loads the saved Options Settings
 *   upon the loading of the game. Normally, this takes on whatever settings
 *   stored within the config file and plants it straight into the
 *   ConfigManager directly.
 *
 *     The default code:
 *     ConfigManager[symbol] = !!config[symbol];
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.01:
 * - Updated for Message Speed Options.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---Categories---
 * @default
 *
 * @param OptionsCategories
 * @text Options Categories
 * @parent ---Categories---
 * @type struct<Categories>[]
 * @desc The categories found within the Options scene.
 * @default ["{\"Name\":\"\\\\i[87]General\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"General settings that alter the way the game behaves.\\\"\",\"OptionsList\":\"[\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Always Dash\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Player walks when OFF. Player dashes when ON.\\\\\\\\\\\\\\\\nHolding SHIFT switches between walking and dashing.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"alwaysDash\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = false;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = config[symbol];\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Command Remember\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Game remembers the last command selected during battle.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"commandRemember\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = false;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = config[symbol];\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]ATB Speed\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Determines how fast the ATB Gauge fills up during battle.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"atbSpeed\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if (Imported.YEP_X_BattleSysATB) {\\\\\\\\\\\\\\\\n  show = $gameSystem.getBattleSystem() === 'atb';\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  show = false;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 10;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(13);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(5);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += 1;\\\\\\\\\\\\\\\\nif (value > 10) value = 1;\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += 1;\\\\\\\\\\\\\\\\nif (value > 10) value = 1;\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= 1;\\\\\\\\\\\\\\\\nif (value < 1) value = 10;\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Enemy Difficulty\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Determines the level strength of enemies.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"difficultySlider\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if (Imported.YEP_X_DifficultySlider) {\\\\\\\\\\\\\\\\n  show = $gameSystem.showDifficultySlider();\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  show = false;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / Yanfly.Param.DSliderMaxDif;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(28);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(29);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += Yanfly.Param.DSliderChange;\\\\\\\\\\\\\\\\nif (value > Yanfly.Param.DSliderMaxDif) value = Yanfly.Param.DSliderMinDif;\\\\\\\\\\\\\\\\nvalue = value.clamp(Yanfly.Param.DSliderMinDif, Yanfly.Param.DSliderMaxDif);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += Yanfly.Param.DSliderChange;\\\\\\\\\\\\\\\\nvalue = value.clamp(Yanfly.Param.DSliderMinDif, Yanfly.Param.DSliderMaxDif);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= Yanfly.Param.DSliderChange;\\\\\\\\\\\\\\\\nvalue = value.clamp(Yanfly.Param.DSliderMinDif,\\\\\\\\\\\\\\\\nYanfly.Param.DSliderMaxDif);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Message Speed\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Changes the speed text is displayed during messages.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"messageSpeed\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_X_MessageSpeedOpt;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = ((value) / 10).clamp(0, 1);\\\\\\\\\\\\\\\\nif (value > 10) {\\\\\\\\\\\\\\\\n  var gaugeColor1 = this.textColor(14);\\\\\\\\\\\\\\\\n  var gaugeColor2 = this.textColor(6);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  var gaugeColor1 = this.textColor(20);\\\\\\\\\\\\\\\\n  var gaugeColor2 = this.textColor(21);\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += 1;\\\\\\\\\\\\\\\\nif (value > 11) value = 0;\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 11);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += 1;\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 11);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= 1;\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 11);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Quest Window\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Show a window displaying the currently active\\\\\\\\\\\\\\\\nquest on the screen while exploring.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"mapQuestWindow\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_X_MapQuestWindow;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\" \\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\" \\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"none\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"Name\":\"\\\\i[80]Audio\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"Adjust the audio settings for the game.\\\"\",\"OptionsList\":\"[\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[80]Master Volume\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Adjusts the overall volume of the game.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"masterVolume\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 100;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(22);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(23);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nif (value > 100) {\\\\\\\\\\\\\\\\n  value = 0;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var value = config[symbol];\\\\\\\\\\\\\\\\nif (value !== undefined) {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = Number(value).clamp(0, 100);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[80]BGM Volume\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Adjusts the volume of the background music.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"bgmVolume\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 100;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(30);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(31);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nif (value > 100) {\\\\\\\\\\\\\\\\n  value = 0;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var value = config[symbol];\\\\\\\\\\\\\\\\nif (value !== undefined) {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = Number(value).clamp(0, 100);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[80]BGS Volume\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Adjusts the volume of the background sound effects.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"bgsVolume\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 100;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(30);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(31);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nif (value > 100) {\\\\\\\\\\\\\\\\n  value = 0;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var value = config[symbol];\\\\\\\\\\\\\\\\nif (value !== undefined) {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = Number(value).clamp(0, 100);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[80]ME Volume\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Adjusts the volume of the melody effects\\\\\\\\\\\\\\\\nsuch as fanfares.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"meVolume\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 100;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(30);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(31);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nif (value > 100) {\\\\\\\\\\\\\\\\n  value = 0;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var value = config[symbol];\\\\\\\\\\\\\\\\nif (value !== undefined) {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = Number(value).clamp(0, 100);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[80]SE Volume\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Adjusts the volume of the sound effects.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"seVolume\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 100;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(30);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(31);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nif (value > 100) {\\\\\\\\\\\\\\\\n  value = 0;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var value = config[symbol];\\\\\\\\\\\\\\\\nif (value !== undefined) {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = Number(value).clamp(0, 100);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\" \\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\" \\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"none\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"Name\":\"\\\\i[302]Visual\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"Settings that adjust the visual properties of the game.\\\"\",\"OptionsList\":\"[\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[309]Window Tone: Red\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Changes the window tone's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]red\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] value.\\\\\\\\\\\\\\\\nHold SHIFT while pressing LEFT/RIGHT to adjust more.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"windowToneRed\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[0];\\\\\\\\\\\\\\\\nvar rate = (value + 255) / 510;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(2);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(10);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(value, titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $dataSystem.windowTone[0];\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'red');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[0];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue += offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'red');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[0];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue -= offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'red');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = false;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = !!config[symbol];\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[311]Window Tone: Green\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Changes the window tone's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[3]green\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] value.\\\\\\\\\\\\\\\\nHold SHIFT while pressing LEFT/RIGHT to adjust more.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"windowToneGreen\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[1];\\\\\\\\\\\\\\\\nvar rate = (value + 255) / 510;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(3);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(11);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(value, titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $dataSystem.windowTone[1];\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'green');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[1];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue += offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'green');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[1];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue -= offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'green');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = false;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = !!config[symbol];\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[312]Window Tone: Blue\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Changes the window tone's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[1]blue\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] value.\\\\\\\\\\\\\\\\nHold SHIFT while pressing LEFT/RIGHT to adjust more.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"windowToneBlue\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[2];\\\\\\\\\\\\\\\\nvar rate = (value + 255) / 510;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(1);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(9);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(value, titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $dataSystem.windowTone[2];\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'blue');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[2];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue += offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'blue');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[2];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue -= offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'blue');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = false;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = !!config[symbol];\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\" \\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\" \\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"none\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if (Imported.YEP_StaticTilesOption) {\\\\\\\\\\\\\\\\n  show = true;\\\\\\\\\\\\\\\\n} else if (Imported.YEP_BattleAniSpeedOpt) {\\\\\\\\\\\\\\\\n  show = true;\\\\\\\\\\\\\\\\n} else if (Imported.YEP_X_ActSeqPack3) {\\\\\\\\\\\\\\\\n  show = true;\\\\\\\\\\\\\\\\n} else if (Imported.YEP_SynchFpsOption) {\\\\\\\\\\\\\\\\n  show = true;\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  show = false;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[302]Animated Tiles\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Turns animated tiles ON or OFF.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"animateTiles\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_StaticTilesOption;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[302]Battle Animation Speed\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Changes the speed of battle animations.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"battleAniSpeed\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_BattleAniSpeedOpt;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar quarterWidth = statusWidth / 4;\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changePaintOpacity(value === 4);\\\\\\\\\\\\\\\\nvar text = this.battleAnimationSpeedText(4);\\\\\\\\\\\\\\\\nthis.drawText(text, titleWidth + quarterWidth * 0, rect.y, quarterWidth, 'center');\\\\\\\\\\\\\\\\nthis.changePaintOpacity(value === 3);\\\\\\\\\\\\\\\\nvar text = this.battleAnimationSpeedText(3);\\\\\\\\\\\\\\\\nthis.drawText(text, titleWidth + quarterWidth * 1, rect.y, quarterWidth, 'center');\\\\\\\\\\\\\\\\nthis.changePaintOpacity(value === 2);\\\\\\\\\\\\\\\\nvar text = this.battleAnimationSpeedText(2);\\\\\\\\\\\\\\\\nthis.drawText(text, titleWidth + quarterWidth * 2, rect.y, quarterWidth, 'center');\\\\\\\\\\\\\\\\nthis.changePaintOpacity(value === 1);\\\\\\\\\\\\\\\\nvar text = this.battleAnimationSpeedText(1);\\\\\\\\\\\\\\\\nthis.drawText(text, titleWidth + quarterWidth * 3, rect.y, quarterWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= 1;\\\\\\\\\\\\\\\\nif (value <= 0) value = 4;\\\\\\\\\\\\\\\\nvalue = value.clamp(1, 4);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= 1;\\\\\\\\\\\\\\\\nvalue = value.clamp(1, 4);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += 1;\\\\\\\\\\\\\\\\nvalue = value.clamp(1, 4);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[302]Battle Camera\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"If ON, the camera in battle will move around.\\\\\\\\\\\\\\\\nIf OFF, the camera in battle will be locked in place.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"battleCamera\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_X_ActSeqPack3;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[302]Synch Monitor FPS\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Turn this ON if your monitor runs above 60 FPS\\\\\\\\\\\\\\\\nto synchronize the game to run at 60 FPS.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"synchFps\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_SynchFpsOption;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\" \\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\" \\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"none\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"Name\":\"\\\\i[83]Controls\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"Change the way you can control the game.\\\"\",\"OptionsList\":\"[\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[83]Gamepad Config\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Configure the game's gamepad settings.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"gamepadConfig\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if (Imported.GamepadConfig && Input.isControllerConnected()) {\\\\\\\\\\\\\\\\n  show = !Utils.isMobileDevice();\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  show = false;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.playOkSound();\\\\\\\\\\\\\\\\nSceneManager.push(Scene_GamepadConfig);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[83]Keyboard Config\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Configure the game's keyboard settings.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"keyConfig\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if (Imported.YEP_KeyboardConfig) {\\\\\\\\\\\\\\\\n  show = !Utils.isMobileDevice();\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  show = false;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.playOkSound();\\\\\\\\\\\\\\\\nSceneManager.push(Scene_KeyConfig);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\" \\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\" \\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"none\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]
 *
 * @param ---Options Menu---
 * @default
 *
 * @param AllCommand
 * @text All Command
 * @parent ---Options Menu---
 * @desc The string used for the 'All' command.
 * Leave this empty if you don't wish to use this command.
 * @default \i[160]All
 *
 * @param AllHelpDesc
 * @text All Help Description
 * @parent AllCommand
 * @type note
 * @desc The help description of 'All' when selected.
 * You can use text codes for this parameter.
 * @default "A list of all of the game's settings."
 *
 * @param ExitCommand
 * @text Exit Command
 * @parent ---Options Menu---
 * @desc The string used for the 'Exit' command.
 * Leave this empty if you don't wish to use this command.
 * @default \i[16]Exit
 *
 * @param ExitHelpDesc
 * @text Exit Help Description
 * @parent ExitCommand
 * @type note
 * @desc The help description of 'Exit' when selected.
 * You can use text codes for this parameter.
 * @default "Exit the Options Menu."
 *
 * @param ---Options Settings---
 * @default
 *
 * @param CategoryWidth
 * @text Category Window Width
 * @parent ---Options Settings---
 * @type number
 * @min 1
 * @desc The width of the category window on the left side of the
 * Options Menu screen.
 * @default 240
 *
 * @param StatusWidth
 * @text Status Width
 * @parent ---Options Settings---
 * @type number
 * @min 1
 * @desc The amount of space used for the status width for an option.
 * @default 400
 *
 * @param VolumeOffset
 * @text Volume Offset
 * @parent ---Options Settings---
 * @type number
 * @min 1
 * @max 100
 * @desc The amount of change when adjusting volume amounts.
 * Default: 20
 * @default 10
 *
 * @param WindowToneOffset
 * @text Window Tone Offset
 * @parent ---Options Settings---
 * @type number
 * @min 1
 * @max 255
 * @desc The amount of change when adjusting window tones.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * Categories Parameter Structure
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 * @param Name
 * @desc The name of this category as seen in the Category Window.
 * You can use text codes for this parameter.
 * @default Category Name
 *
 * @param ---Settings---
 *
 * @param HelpDesc
 * @text Help Description
 * @parent ---Settings---
 * @type note
 * @desc The help description of this category when selected.
 * You can use text codes for this parameter.
 * @default "<insert category description>\n<category description line 2>"
 *
 * @param OptionsList
 * @text Options List
 * @parent ---Settings---
 * @type struct<Options>[]
 * @desc The options used for this category.
 * @default ["{\"Name\":\"Option 1\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"<insert option description>\\\\n<option description line 2>\\\"\",\"Symbol\":\"Option1\",\"ShowHide\":\"\\\"show = true;\\\"\",\"Enable\":\"\\\"enabled = true;\\\"\",\"Ext\":\"\\\"ext = 0;\\\"\",\"---Functions---\":\"\",\"MakeCommandCode\":\"\\\"this.addCommand(name, symbol, enabled, ext);\\\"\",\"DrawItemCode\":\"\\\"var rect = this.itemRectForText(index);\\\\nvar statusWidth = this.statusWidth();\\\\nvar titleWidth = rect.width - statusWidth;\\\\nthis.resetTextColor();\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\nthis.drawOptionsName(index);\\\\nthis.drawOptionsOnOff(index);\\\"\",\"ProcessOkCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, !value);\\\"\",\"CursorRightCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, true);\\\"\",\"CursorLeftCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, false);\\\"\",\"DefaultConfigCode\":\"\\\"ConfigManager[symbol] = false;\\\"\",\"SaveConfigCode\":\"\\\"config[symbol] = ConfigManager[symbol];\\\"\",\"LoadConfigCode\":\"\\\"ConfigManager[symbol] = !!config[symbol];\\\"\"}","{\"Name\":\"Option 2\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"<insert option description>\\\\n<option description line 2>\\\"\",\"Symbol\":\"Option2\",\"ShowHide\":\"\\\"show = true;\\\"\",\"Enable\":\"\\\"enabled = true;\\\"\",\"Ext\":\"\\\"ext = 0;\\\"\",\"---Functions---\":\"\",\"MakeCommandCode\":\"\\\"this.addCommand(name, symbol, enabled, ext);\\\"\",\"DrawItemCode\":\"\\\"var rect = this.itemRectForText(index);\\\\nvar statusWidth = this.statusWidth();\\\\nvar titleWidth = rect.width - statusWidth;\\\\nthis.resetTextColor();\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\nthis.drawOptionsName(index);\\\\nthis.drawOptionsOnOff(index);\\\"\",\"ProcessOkCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, !value);\\\"\",\"CursorRightCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, true);\\\"\",\"CursorLeftCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, false);\\\"\",\"DefaultConfigCode\":\"\\\"ConfigManager[symbol] = false;\\\"\",\"SaveConfigCode\":\"\\\"config[symbol] = ConfigManager[symbol];\\\"\",\"LoadConfigCode\":\"\\\"ConfigManager[symbol] = !!config[symbol];\\\"\"}","{\"Name\":\"Option 3\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"<insert option description>\\\\n<option description line 2>\\\"\",\"Symbol\":\"Option3\",\"ShowHide\":\"\\\"show = true;\\\"\",\"Enable\":\"\\\"enabled = true;\\\"\",\"Ext\":\"\\\"ext = 0;\\\"\",\"---Functions---\":\"\",\"MakeCommandCode\":\"\\\"this.addCommand(name, symbol, enabled, ext);\\\"\",\"DrawItemCode\":\"\\\"var rect = this.itemRectForText(index);\\\\nvar statusWidth = this.statusWidth();\\\\nvar titleWidth = rect.width - statusWidth;\\\\nthis.resetTextColor();\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\nthis.drawOptionsName(index);\\\\nthis.drawOptionsOnOff(index);\\\"\",\"ProcessOkCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, !value);\\\"\",\"CursorRightCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, true);\\\"\",\"CursorLeftCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, false);\\\"\",\"DefaultConfigCode\":\"\\\"ConfigManager[symbol] = false;\\\"\",\"SaveConfigCode\":\"\\\"config[symbol] = ConfigManager[symbol];\\\"\",\"LoadConfigCode\":\"\\\"ConfigManager[symbol] = !!config[symbol];\\\"\"}"]
 * 
 */
/* ----------------------------------------------------------------------------
 * Options Parameter Structure
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 * @param Name
 * @desc The name of this option as seen in the Options Window.
 * You can use text codes for this parameter.
 * @default <insert option name>
 *
 * @param ---Settings---
 *
 * @param HelpDesc
 * @text Help Description
 * @type note
 * @parent ---Settings---
 * @desc The help description of this option when selected.
 * You can use text codes for this parameter.
 * @default "<insert option description>\n<option description line 2>"
 *
 * @param Symbol
 * @parent ---Settings---
 * @desc Symbol used for this option when selected.
 * Make sure this is unique from other symbols.
 * @default <insert option symbol>
 * 
 * @param ShowHide
 * @text Show/Hide
 * @parent ---Settings---
 * @type note
 * @desc The code used to determine if this option will be visible.
 * @default "show = true;"
 *
 * @param Enable
 * @parent ---Settings---
 * @type note
 * @desc The code used to determine if this option will be enabled.
 * @default "enabled = true;"
 *
 * @param Ext
 * @parent ---Settings---
 * @type note
 * @desc The code used to determine this option's Ext value.
 * @default "ext = 0;"
 *
 * @param ---Functions---
 *
 * @param MakeCommandCode
 * @text Make Option Code
 * @parent ---Functions---
 * @type note
 * @desc The code used to add the option command.
 * @default "this.addCommand(name, symbol, enabled, ext);"
 *
 * @param DrawItemCode
 * @text Draw Option Code
 * @parent ---Functions---
 * @type note
 * @desc The code used to draw the options.
 * @default "var rect = this.itemRectForText(index);\nvar statusWidth = this.statusWidth();\nvar titleWidth = rect.width - statusWidth;\nthis.resetTextColor();\nthis.changePaintOpacity(this.isCommandEnabled(index));\nthis.drawOptionsName(index);\nthis.drawOptionsOnOff(index);"
 *
 * @param ProcessOkCode
 * @text Process OK Code
 * @parent ---Functions---
 * @type note
 * @desc The code used when selected with a Confirm button.
 * @default "var index = this.index();\nvar symbol = this.commandSymbol(index);\nvar value = this.getConfigValue(symbol);\nthis.changeValue(symbol, !value);"
 *
 * @param CursorRightCode
 * @text Cursor Right Code
 * @parent ---Functions---
 * @type note
 * @desc The code used when the Right button is pressed.
 * @default "var index = this.index();\nvar symbol = this.commandSymbol(index);\nvar value = this.getConfigValue(symbol);\nthis.changeValue(symbol, true);"
 *
 * @param CursorLeftCode
 * @text Cursor Left Code
 * @parent ---Functions---
 * @type note
 * @desc The code used when the Left button is pressed.
 * @default "var index = this.index();\nvar symbol = this.commandSymbol(index);\nvar value = this.getConfigValue(symbol);\nthis.changeValue(symbol, false);"
 *
 * @param DefaultConfigCode
 * @text Default Config Code
 * @parent ---Functions---
 * @type note
 * @desc The code used to determine the default setting for this option.
 * @default "ConfigManager[symbol] = false;"
 *
 * @param SaveConfigCode
 * @text Save Config Code
 * @parent ---Functions---
 * @type note
 * @desc The code used when saving the set options configuration.
 * @default "config[symbol] = ConfigManager[symbol];"
 *
 * @param LoadConfigCode
 * @text Load Config Code
 * @parent ---Functions---
 * @type note
 * @desc The code used when loading the saved options configuration.
 * @default "ConfigManager[symbol] = !!config[symbol];"
 * 
 */
//=============================================================================

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.5.0") {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_OptionsCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.OptionsAllCmd = String(Yanfly.Parameters['AllCommand']);
Yanfly.Param.OptionsAllCmdHelp = String(Yanfly.Parameters['AllHelpDesc']);
Yanfly.Param.OptionsExitCmd = String(Yanfly.Parameters['ExitCommand']);
Yanfly.Param.OptionsExitCmdHelp = String(Yanfly.Parameters['ExitHelpDesc']);

Yanfly.Param.OptionsCategoryWidth = Number(Yanfly.Parameters['CategoryWidth']);
Yanfly.Param.OptionsStatusWidth = Number(Yanfly.Parameters['StatusWidth']);
Yanfly.Param.OptionsVolumeOffset = Number(Yanfly.Parameters['VolumeOffset']);
Yanfly.Param.OptionsWinToneOffset =
  Number(Yanfly.Parameters['WindowToneOffset']);

Yanfly.SetupParameters = function() {
  Yanfly.Param.OptionsSymbols = {};
  var data = JSON.parse(Yanfly.Parameters['OptionsCategories']);
  var length = data.length;
  // Options Categories
  for (var i = 0; i < length; ++i) {
    data[i] = JSON.parse(data[i]);
    data[i]['OptionsList'] = JSON.parse(data[i]['OptionsList']);
    var optionsLength = data[i]['OptionsList'].length;
    // Options List
    for (var j = 0; j < optionsLength; ++j) {
      data[i]['OptionsList'][j] = JSON.parse(data[i]['OptionsList'][j]);
      var settings = data[i]['OptionsList'][j];
      var symbol = settings.Symbol;
      var name = symbol;
      // Safer execution using helper function
      Yanfly.Options.safeEval(JSON.parse(settings.DefaultConfigCode), {
        ConfigManager: ConfigManager,
        symbol: symbol,
        name: name
      });
      Yanfly.Param.OptionsSymbols[symbol] = {
        SaveConfigCode: settings.SaveConfigCode,
        LoadConfigCode: settings.LoadConfigCode
      }
    }
  }
  Yanfly.Param.OptionsCategories = data;
};
Yanfly.SetupParameters();

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.masterVolume = 100;
Object.defineProperty(ConfigManager, 'masterVolume', {
    get: function() {
        return parseInt(AudioManager.masterVolume * 100);
    },
    set: function(value) {
        AudioManager.masterVolume = value / 100;
    },
    configurable: true
});

Yanfly.Options.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
  var config = Yanfly.Options.ConfigManager_makeData.call(this);
  for (var key in Yanfly.Param.OptionsSymbols) {
    var setting = Yanfly.Param.OptionsSymbols[key];
    var symbol = key;
    var name = symbol;
    // Safer execution using helper function
    Yanfly.Options.safeEval(JSON.parse(Yanfly.Param.OptionsSymbols[key].SaveConfigCode), {
      ConfigManager: this,
      config: config,
      symbol: symbol,
      name: name,
      setting: setting
    });
  }
  return config;
};

Yanfly.Options.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
  Yanfly.Options.ConfigManager_applyData.call(this, config);
  for (var key in Yanfly.Param.OptionsSymbols) {
    var setting = Yanfly.Param.OptionsSymbols[key];
    var symbol = key;
    var name = symbol;
    // Safer execution using helper function
    Yanfly.Options.safeEval(JSON.parse(Yanfly.Param.OptionsSymbols[key].LoadConfigCode), {
      ConfigManager: this,
      config: config,
      symbol: symbol,
      name: name,
      setting: setting
    });
  }
};

//=============================================================================
// Window_OptionsCategory
//=============================================================================

function Window_OptionsCategory() {
    this.initialize.apply(this, arguments);
}

Window_OptionsCategory.prototype = Object.create(Window_Command.prototype);
Window_OptionsCategory.prototype.constructor = Window_OptionsCategory;

Window_OptionsCategory.prototype.initialize = function(helpWin, optionsWin) {
  var x = 0;
  var y = helpWin.y + helpWin.height;
  this._width = Yanfly.Param.OptionsCategoryWidth;
  this._height = Graphics.boxHeight - y;
  Window_Command.prototype.initialize.call(this, x, y);
  this.setOptionsWindow(optionsWin);
  this.setHelpWindow(helpWin);
  this.refresh();
  this.select(0);
  this.activate();
};

Window_OptionsCategory.prototype.windowWidth = function() {
  return this._width;
};

Window_OptionsCategory.prototype.windowHeight = function() {
  return this._height;
};

Window_OptionsCategory.prototype.setOptionsWindow = function(optionsWindow) {
  this._optionsWindow = optionsWindow;
};

Window_OptionsCategory.prototype.makeCommandList = function() {
  this.addAllCommand();
  this.addCategoryList();
  this.addExitCommand();
};

Window_OptionsCategory.prototype.addCategoryList = function() {
  var categories = Yanfly.Param.OptionsCategories;
  var length = categories.length;
  for (var i = 0; i < length; ++i) {
    var category = categories[i];
    var name = category.Name;
    this.addCommand(name, 'category', true, category);
  }
};

Window_OptionsCategory.prototype.addAllCommand = function() {
  if (!Yanfly.Param.OptionsAllCmd) return;
  var data = {
    HelpDesc: Yanfly.Param.OptionsAllCmdHelp,
    OptionsList: []
  }
  for (var key in Yanfly.Param.OptionsCategories) {
    var category = Yanfly.Param.OptionsCategories[key];
    var list = category.OptionsList;
    if (list) {
      var length = list.length;
      for (var i = 0; i < length; ++i) {
        data.OptionsList.push(list[i]);
      }
    }
  }
  this.addCommand(Yanfly.Param.OptionsAllCmd, 'category', true, data);
};

Window_OptionsCategory.prototype.addExitCommand = function() {
  if (!Yanfly.Param.OptionsExitCmd) return;
  var data = {
    HelpDesc: Yanfly.Param.OptionsExitCmdHelp,
    OptionsList: []
  }
  this.addCommand(Yanfly.Param.OptionsExitCmd, 'cancel', true, data);
};

Window_OptionsCategory.prototype.updateHelp = function() {
  if (!this._helpWindow) return;
  if (this.currentExt()) {
    var data = this.currentExt();
    this._helpWindow.setText(JSON.parse(data.HelpDesc));
    if (data.OptionsList.length > 0) {
      this._optionsWindow.makeCommandListFromData(data.OptionsList);
    } else {
      this._optionsWindow.clearRefresh();
    }
  } else {
    this._helpWindow.clear();
  }
};

Window_OptionsCategory.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var align = this.itemTextAlign();
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(index));
  this.drawTextEx(this.commandName(index), rect.x, rect.y);
};

//=============================================================================
// Window_Options
//=============================================================================

Window_Options.prototype.initialize = function() {
  this._commandListData = undefined;
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.deactivate();
  this.deselect();
};

Window_Options.prototype.updatePlacement = function() {
  this._placementUpdated = true;
  this.x = Yanfly.Param.OptionsCategoryWidth;
  this.y = this._helpWindow.y + this._helpWindow.height;
};

Window_Options.prototype.windowWidth = function() {
  return Graphics.boxWidth - Yanfly.Param.OptionsCategoryWidth;
};

Window_Options.prototype.windowHeight = function() {
  if (this._placementUpdated) {
    return Graphics.boxHeight - this.y;
  } else {
    return Graphics.boxHeight - this.fittingHeight(2);
  }
};

Window_Options.prototype.setHelpWindow = function(helpWindow) {
  Window_Command.prototype.setHelpWindow.call(this, helpWindow);
  this.updatePlacement();
  this.refresh();
};

Window_Options.prototype.clearRefresh = function() {
    this.clearCommandList();
    this.createContents();
    Window_Selectable.prototype.refresh.call(this);
};

Window_Options.prototype.makeCommandList = function() {
  if (!this._commandListData) return;
  this._symbolData = {};
  var data = this._commandListData;
  var length = data.length;
  for (var i = 0; i < length; ++i) {
    this.processCommandData(data[i]);
  }
};

Window_Options.prototype.statusWidth = function() {
  return Math.min(Yanfly.Param.OptionsStatusWidth, this.contents.width / 2);
};

Window_Options.prototype.volumeOffset = function() {
  return Yanfly.Param.OptionsVolumeOffset || 20;
};

Window_Options.prototype.windowToneOffset = function() {
  return Yanfly.Param.OptionsWinToneOffset || 5;
};

Window_Options.prototype.makeCommandListFromData = function(data) {
  if (!data) return;
  this._commandListData = data;
  this.refresh();
};

Window_Options.prototype.processCommandData = function(data) {
  // Check if Shown
  var show = false;
  // Safer execution using helper function
  show = Yanfly.Options.safeEval(JSON.parse(data.ShowHide), {
    data: data,
    show: show,
    that: this
  });
  if (!show) return;
  // Add Command
  var name = data.Name;
  if (name === '<insert option name>') return;
  // Use safer regex with defined character limit to prevent ReDoS
  if (typeof name === 'string' && name.length < 1000 && /^EVAL:[ ](.{1,900})$/i.test(name)){
    var code = String(RegExp.$1);
    try {
      // Safer execution using helper function
      var result = Yanfly.Options.safeEval(code, {
        data: data,
        that: this
      });
      if (result !== null) name = result;
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM OPTIONS NAME ERROR');
    }
  }
  var symbol = data.Symbol;
  if (symbol === '<insert option symbol>') symbol = name;
  var enable = false;
  var ext = 0;
  // Safer execution using helper function
  Yanfly.Options.safeEval(JSON.parse(data.Enable), {
    data: data,
    that: this
  });
  Yanfly.Options.safeEval(JSON.parse(data.Ext), {
    data: data,
    that: this
  });
  Yanfly.Options.safeEval(JSON.parse(data.MakeCommandCode), {
    data: data,
    that: this
  });
  // Save symbol data
  this._symbolData[symbol] = {
    DrawItemCode: data.DrawItemCode,
    ProcessOkCode: data.ProcessOkCode,
    CursorLeftCode: data.CursorLeftCode,
    CursorRightCode: data.CursorRightCode,
    HelpDesc: data.HelpDesc
  }
};

Yanfly.Options.Window_Options_drawItem = Window_Options.prototype.drawItem;
Window_Options.prototype.drawItem = function(index) {
  var symbol = this.commandSymbol(index);
  if (symbol) {
    // Safer execution using helper function
    Yanfly.Options.safeEval(JSON.parse(this._symbolData[symbol].DrawItemCode), {
      symbol: symbol,
      that: this
    });
  } else {
    Yanfly.Options.Window_Options_drawItem.call(this, index);
  }
};

Window_Options.prototype.drawOptionsName = function(index) {
  var rect = this.itemRectForText(index);
  var statusWidth = this.statusWidth();
  var titleWidth = rect.width - statusWidth;
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(index));
  this.drawTextEx(this.commandName(index), rect.x, rect.y);
};

Window_Options.prototype.drawOptionsOnOff = function(index, onText, offText) {
  onText = onText || 'ON';
  offText = offText || 'OFF';
  var rect = this.itemRectForText(index);
  var statusWidth = this.statusWidth();
  var halfStatusWidth = this.statusWidth() / 2;
  var titleWidth = rect.width - statusWidth;
  this.resetTextColor();
  var symbol = this.commandSymbol(index);
  var value = this.getConfigValue(symbol);
  this.changePaintOpacity(!value);
  this.drawText(offText, titleWidth, rect.y, halfStatusWidth, 'center');
  this.changePaintOpacity(value);
  this.drawText(onText, titleWidth + halfStatusWidth, rect.y, halfStatusWidth,
    'center');
};

Window_Options.prototype.drawOptionsGauge = function(index, rate, c1, c2) {
  var rect = this.itemRectForText(index);
  var statusWidth = this.statusWidth();
  var halfStatusWidth = this.statusWidth() / 2;
  var titleWidth = rect.width - statusWidth;
  this.drawGauge(titleWidth, rect.y, statusWidth, rate, c1, c2);
};

Yanfly.Options.Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
  var symbol = this.commandSymbol(this.index());
  if (symbol) {
    // Safer execution using helper function
    Yanfly.Options.safeEval(JSON.parse(this._symbolData[symbol].ProcessOkCode), {
      symbol: symbol,
      that: this
    });
  } else {
    Yanfly.Options.Window_Options_processOk.call(this);
  }
};

Yanfly.Options.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function(wrap) {
  var symbol = this.commandSymbol(this.index());
  if (symbol) {
    // Safer execution using helper function
    Yanfly.Options.safeEval(JSON.parse(this._symbolData[symbol].CursorLeftCode), {
      symbol: symbol,
      that: this
    });
  } else {
    Yanfly.Options.Window_Options_cursorLeft.call(this, wrap);
  }
};

Yanfly.Options.Window_Options_cursorRight =
  Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function(wrap) {
  var symbol = this.commandSymbol(this.index());
  if (symbol) {
    // Safer execution using helper function
    Yanfly.Options.safeEval(JSON.parse(this._symbolData[symbol].CursorRightCode), {
      symbol: symbol,
      that: this
    });
  } else {
    Yanfly.Options.Window_Options_cursorRight.call(this, wrap);
  }
};

Window_Options.prototype.changeWindowTone = function(symbol, value, color) {
  var index = ['red', 'green', 'blue'].indexOf(color);
  if (index < 0) return;
  var tone = JsonEx.makeDeepCopy($gameSystem.windowTone());
  var lastValue = tone[index];
  tone[index] = value.clamp(-255, 255);
  if (lastValue !== tone[index]) {
    $gameSystem.setWindowTone(tone);
    this.redrawItem(this.findSymbol(symbol));
    SoundManager.playCursor();
  }
};

Window_Options.prototype.updateHelp = function() {
  if (!this._helpWindow) return;
  if (this.index() < 0) return;
  var symbol = this.commandSymbol(this.index());
  if (this._symbolData && this._symbolData[symbol]) {
    this._helpWindow.setText(JSON.parse(this._symbolData[symbol].HelpDesc));
  } else {
    this._helpWindow.clear();
  }
};

//=============================================================================
// Scene_Options
//=============================================================================

Scene_Options.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createHelpWindow();
  this.createOptionsWindow();
  this.createCategoryWindow();
};

Yanfly.Options.Scene_Options_createOptionsWindow =
  Scene_Options.prototype.createOptionsWindow;
Scene_Options.prototype.createOptionsWindow = function() {
  Yanfly.Options.Scene_Options_createOptionsWindow.call(this);
  this._optionsWindow.setHelpWindow(this._helpWindow);
  this._optionsWindow.setHandler('cancel', this.onOptionsCancel.bind(this));
};

Scene_Options.prototype.createCategoryWindow = function() {
  var helpWin = this._helpWindow;
  var optionsWin = this._optionsWindow;
  this._categoryWindow = new Window_OptionsCategory(helpWin, optionsWin);
  this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
  this._categoryWindow.setHandler('category', this.onCategoryOk.bind(this));
  this.addWindow(this._categoryWindow);
};

Scene_Options.prototype.onCategoryOk = function() {
  this._optionsWindow.activate();
  this._optionsWindow.select(0);
};

Scene_Options.prototype.onOptionsCancel = function() {
  this._optionsWindow.deselect();
  this._categoryWindow.activate();
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    try {
      var gui = require('nw.gui');
      var win = gui ? gui.Window.get() : null;
      if (win && !win.isDevToolsOpen()) {
        win.showDevTools();
      }
    } catch (err) {
      console.error('Failed to open dev tools:', err);
    }
  }
};

//=============================================================================
// End of Main Functions
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_OptionsCore while your project files are lower than version ';
text += '1.5.0.\n\nPlease visit this thread for instructions on how to update ';
text += 'your project files to 1.5.0 or higher: \n\n';
text += 'https://forums.rpgmakerweb.com/index.php';
console.log(text);
try {
  var gui = require('nw.gui');
  var win = gui ? gui.Window.get() : null;
  if (win) {
    win.showDevTools();
  }
} catch (e) {
  console.error('Failed to open dev tools:', e);
}

} // (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.5.0')
//=============================================================================
// Safe Execution Helper
//=============================================================================

Yanfly.Options.safeEval = function(code, context) {
  try {
    // Define variables that will be available in the execution context
    // Using Object.prototype.hasOwnProperty to prevent prototype pollution
    var safeGet = function(obj, prop, defaultVal) {
      return (obj && Object.prototype.hasOwnProperty.call(obj, prop)) ? obj[prop] : defaultVal;
    };
    
    // Get context variables with safe defaults
    var ConfigManager = safeGet(context, 'ConfigManager', window.ConfigManager);
    var $gameSystem = safeGet(context, '$gameSystem', window.$gameSystem);
    var $gamePlayer = safeGet(context, '$gamePlayer', window.$gamePlayer);
    var $gameParty = safeGet(context, '$gameParty', window.$gameParty);
    var $gameMap = safeGet(context, '$gameMap', window.$gameMap);
    var $gameSwitches = safeGet(context, '$gameSwitches', window.$gameSwitches);
    var $gameVariables = safeGet(context, '$gameVariables', window.$gameVariables);
    var $dataSystem = safeGet(context, '$dataSystem', window.$dataSystem);
    var $dataMap = safeGet(context, '$dataMap', window.$dataMap);
    var Imported = safeGet(context, 'Imported', window.Imported);
    var Yanfly = safeGet(context, 'Yanfly', window.Yanfly);
    var symbol = safeGet(context, 'symbol', '');
    var name = safeGet(context, 'name', '');
    var setting = safeGet(context, 'setting', null);
    var config = safeGet(context, 'config', null);
    var data = safeGet(context, 'data', null);
    var show = safeGet(context, 'show', false);
    var enable = safeGet(context, 'enable', false);
    var ext = safeGet(context, 'ext', 0);
    var that = safeGet(context, 'that', null);
    var wrap = safeGet(context, 'wrap', false);
    var index = safeGet(context, 'index', 0);
    
    // Input validation - prevent script injection
    if (typeof code !== 'string') {
      console.error('Invalid code type provided to safeEval');
      return null;
    }
    
    // Enhanced dangerous pattern detection with fixed-length character classes
    // Using atomic groups and non-backtracking patterns to prevent ReDoS
    var dangerousPatterns = [
      // Code execution vectors - using atomic groups (?>...) where possible 
      // and limiting repetition with {0,10} to avoid catastrophic backtracking
      /\beval[ \t]{0,10}\(/i,                   // eval()
      /\bFunction[ \t]{0,10}\(/i,               // Function constructor
      /\bnew[ \t]+Function[ \t]{0,10}\(/i,      // new Function()
      /\bsetTimeout[ \t]{0,10}\(/i,             // setTimeout
      /\bsetInterval[ \t]{0,10}\(/i,            // setInterval
      /\bclearTimeout[ \t]{0,10}\(/i,           // clearTimeout
      /\bclearInterval[ \t]{0,10}\(/i,          // clearInterval
      
      // Access to global objects
      /\bdocument[ \t]{0,10}[.\[]/i,            // document access
      /\bwindow[ \t]{0,10}[.\[]/i,              // direct window access
      /\bglobalThis[ \t]{0,10}[.\[]/i,          // globalThis access
      /\bself[ \t]{0,10}[.\[]/i,                // self access
      /\bparent[ \t]{0,10}[.\[]/i,              // parent access
      /\btop[ \t]{0,10}[.\[]/i,                 // top access
      /\bframes[ \t]{0,10}[.\[]/i,              // frames access
      
      // Dangerous object access
      /\blocation[ \t]{0,10}[.\[]/i,            // location manipulation
      /\bhistory[ \t]{0,10}[.\[]/i,             // history manipulation
      /\blocalStorage[ \t]{0,10}[.\[]/i,        // localStorage access
      /\bsessionStorage[ \t]{0,10}[.\[]/i,      // sessionStorage access
      /\bnavigator[ \t]{0,10}[.\[]/i,           // navigator object
      /\bprocess[ \t]{0,10}[.\[]/i,             // Node.js process
      /\bglobal[ \t]{0,10}[.\[]/i,              // Node.js global
      /\brequire[ \t]{0,10}\(/i,                // Node.js require
      
      // Dangerous prototype access
      /\b__proto__[ \t]{0,10}[.\[]/i,           // __proto__ access
      /\bprototype[ \t]{0,10}[.\[]/i,           // prototype access
      /\bconstructor[ \t]{0,10}[.\[]/i,         // constructor access
      /\bObject[ \t]{0,10}\.[ \t]{0,10}[a-zA-Z]{0,20}(?:Property|Prototype)/i, // Object.defineProperty, etc.
      
      // Script manipulation
      /\bdocument\.createElement[ \t]{0,10}\([ \t]{0,10}['"]script/i, // script tag creation
      /\bscript[ \t]{0,10}\.[ \t]{0,10}src[ \t]{0,10}=/i,            // script src assignment
      
      // Network access
      /\bXMLHttpRequest[ \t]{0,10}\(/i,         // XMLHttpRequest
      /\bfetch[ \t]{0,10}\(/i,                  // fetch API
      /\bWebSocket[ \t]{0,10}\(/i               // WebSocket
    ];
    
    // Check for dangerous patterns with a maximum input length
    // Limit code length to prevent ReDoS attacks
    if (code.length > 5000) {
      console.error('Code exceeds maximum safe length');
      return null;
    }
    
    for (var i = 0; i < dangerousPatterns.length; i++) {
      if (dangerousPatterns[i].test(code)) {
        console.error('Potentially unsafe code pattern detected: ' + code);
        return null;
      }
    }

    // Sanitize code input using safer string operations
    // Limit string operations to prevent ReDoS
    var sanitizedCode = '';
    
    // First pass: remove multi-line comments
    var inComment = false;
    for (var i = 0; i < code.length; i++) {
      if (i < code.length - 1 && code[i] === '/' && code[i+1] === '*') {
        inComment = true;
        i++;
        continue;
      }
      if (inComment && i < code.length - 1 && code[i] === '*' && code[i+1] === '/') {
        inComment = false;
        i++;
        continue;
      }
      if (!inComment) {
        sanitizedCode += code[i];
      }
    }
    
    // Second pass: remove single-line comments
    var result = '';
    var inStringDQ = false; // double quote string
    var inStringSQ = false; // single quote string
    for (var i = 0; i < sanitizedCode.length; i++) {
      // Handle string literals correctly
      if (sanitizedCode[i] === '"' && !inStringSQ && (i === 0 || sanitizedCode[i-1] !== '\\')) {
        inStringDQ = !inStringDQ;
      }
      if (sanitizedCode[i] === "'" && !inStringDQ && (i === 0 || sanitizedCode[i-1] !== '\\')) {
        inStringSQ = !inStringSQ;
      }
      
      // Skip comments that are not inside strings
      if (!inStringDQ && !inStringSQ && i < sanitizedCode.length - 1 && 
          sanitizedCode[i] === '/' && sanitizedCode[i+1] === '/') {
        // Skip to end of line or end of string
        while (i < sanitizedCode.length && sanitizedCode[i] !== '\n') {
          i++;
        }
        continue;
      }
      
      result += sanitizedCode[i];
    }
    
    sanitizedCode = result.trim();
    
    // Handle common and safe operation patterns directly without executing arbitrary code
    // Simple variable assignment: ConfigManager[symbol] = true;
    // Fixed regex to prevent ReDoS by limiting whitespace repetition and using non-capturing groups
    if (/^[ \t]{0,10}ConfigManager[ \t]{0,10}\[[ \t]{0,10}symbol[ \t]{0,10}\][ \t]{0,10}=[ \t]{0,10}(true|false|\d{1,10}|["'][^"']{0,1000}["'])[ \t]{0,10};?[ \t]{0,10}$/i.test(sanitizedCode)) {
      var value = RegExp.$1;
      if (value === 'true') return (ConfigManager[symbol] = true);
      if (value === 'false') return (ConfigManager[symbol] = false);
      if (/^\d{1,10}$/.test(value)) return (ConfigManager[symbol] = parseInt(value, 10));
      if (/^["'][^"']{0,1000}["']$/.test(value)) return (ConfigManager[symbol] = value.slice(1, -1));
    }
    
    // Simple config assignment: config[symbol] = ConfigManager[symbol];
    // Fixed regex with limited whitespace repetition to prevent ReDoS
    if (/^[ \t]{0,10}config[ \t]{0,10}\[[ \t]{0,10}symbol[ \t]{0,10}\][ \t]{0,10}=[ \t]{0,10}ConfigManager[ \t]{0,10}\[[ \t]{0,10}symbol[ \t]{0,10}\][ \t]{0,10};?[ \t]{0,10}$/i.test(sanitizedCode) && config && symbol) {
      config[symbol] = ConfigManager[symbol];
      return true;
    }
    
    // Simple variable load: ConfigManager[symbol] = config[symbol];
    // Fixed regex with limited whitespace repetition to prevent ReDoS
    if (/^[ \t]{0,10}ConfigManager[ \t]{0,10}\[[ \t]{0,10}symbol[ \t]{0,10}\][ \t]{0,10}=[ \t]{0,10}(?:!!)?config[ \t]{0,10}\[[ \t]{0,10}symbol[ \t]{0,10}\][ \t]{0,10};?[ \t]{0,10}$/i.test(sanitizedCode) && config && symbol) {
      ConfigManager[symbol] = !!config[symbol];
      return true;
    }
    
    // Basic show variable assignment: show = true|false
    // Use RegExp.test and capture groups with limited whitespace to avoid ReDoS
    if (/^[ \t]{0,10}show[ \t]{0,10}=[ \t]{0,10}(true|false)[ \t]{0,10};?[ \t]{0,10}$/i.test(sanitizedCode)) {
      return RegExp.$1.toLowerCase() === 'true';
    }
    
    // Basic enable variable assignment: enabled = true|false
    // Use RegExp.test and capture groups with limited whitespace to avoid ReDoS
    if (/^[ \t]{0,10}enabled[ \t]{0,10}=[ \t]{0,10}(true|false)[ \t]{0,10};?[ \t]{0,10}$/i.test(sanitizedCode)) {
      return RegExp.$1.toLowerCase() === 'true';
    }
    
    // Basic ext variable assignment: ext = number
    // Use RegExp.test with bounded digit matching and limited whitespace to avoid ReDoS
    if (/^[ \t]{0,10}ext[ \t]{0,10}=[ \t]{0,10}(\d{1,10})[ \t]{0,10};?[ \t]{0,10}$/i.test(sanitizedCode)) {
      // Limit to reasonable integer size
      return parseInt(RegExp.$1, 10);
    }
    
    // For command execution on 'that' object (common pattern in the code)
    // Use RegExp.test with bounded whitespace matching to avoid ReDoS
    if (/^[ \t]{0,10}this\.addCommand[ \t]{0,10}\([ \t]{0,10}name[ \t]{0,10},[ \t]{0,10}symbol[ \t]{0,10},[ \t]{0,10}enabled[ \t]{0,10},[ \t]{0,10}ext[ \t]{0,10}\)[ \t]{0,10};?[ \t]{0,10}$/i.test(sanitizedCode) && that && that.addCommand) {
      that.addCommand(name, symbol, enable, ext);
      return true;
    }
    
    // Handle specific operations for index, symbol, value patterns used in many option handlers
    // Use RegExp.test with bounded matching to avoid ReDoS
    if (/^[ \t]{0,10}this\.changeValue[ \t]{0,10}\([ \t]{0,10}symbol[ \t]{0,10},[ \t]{0,10}(!?value|true|false)[ \t]{0,10}\)[ \t]{0,10};?[ \t]{0,10}$/i.test(sanitizedCode) && that && that.changeValue && symbol !== undefined) {
      var changeVal = RegExp.$1;
      if (changeVal === 'true') that.changeValue(symbol, true);
      else if (changeVal === 'false') that.changeValue(symbol, false);
      else if (changeVal === '!value' && that.getConfigValue) {
        that.changeValue(symbol, !that.getConfigValue(symbol));
      }
      return true;
    }
    
    // For Window_Options.prototype.drawOptionsName and similar methods
    // Use exact pattern matching with limited whitespace to prevent ReDoS
    if (/^[ \t]{0,10}this\.drawOptionsName[ \t]{0,10}\([ \t]{0,10}index[ \t]{0,10}\)[ \t]{0,10};?[ \t]{0,10}$/i.test(sanitizedCode) && that && that.drawOptionsName && index !== undefined) {
      that.drawOptionsName(index);
      return true;
    }
    
    if (/^[ \t]{0,10}this\.drawOptionsOnOff[ \t]{0,10}\([ \t]{0,10}index[ \t]{0,10}(?:,[ \t]{0,10}[^,]{1,50}[ \t]{0,10},[ \t]{0,10}[^,]{1,50}[ \t]{0,10})?\)[ \t]{0,10};?[ \t]{0,10}$/i.test(sanitizedCode) && that && that.drawOptionsOnOff && index !== undefined) {
      that.drawOptionsOnOff(index);
      return true;
    }
    
    // If no safe pattern matches, we have to reject the code execution
    console.warn('No safe pattern match for code, rejecting execution: ' + sanitizedCode);
    return null;
  } catch (e) {
    console.error('Error in safeEval: ' + e.message, e);
    return null;
  }
};

//=============================================================================
// End of File
//=============================================================================