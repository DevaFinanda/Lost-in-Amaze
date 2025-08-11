//=============================================================================
// Yanfly Engine Plugins - Floor Damage
// YEP_FloorDamage.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_FloorDamage = true;

var Yanfly = Yanfly || {};
Yanfly.FloorDmg = Yanfly.FloorDmg || {};
Yanfly.FloorDmg.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 Allows you to modify floor damage based on terrain tags.
 * You can also change the color of the flash when damaged, too.
 * @author Yanfly Engine Plugins
 *
 * @param Default Damage
 * @type number
 * @min 1
 * @desc This is the default amount of damage dealt by damage floors.
 * @default 10
 *
 * @param Flash Color
 * @desc This is the flash color used for all floor damage by default.
 * Insert them by red, green, blue, opacity with values from 0-255
 * @default 255, 0, 0, 128
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * For those who would like to make different tiles deal different amount of
 * damage, this plugin will allow you to accomplish such a thing. This way,
 * some tiles can deal more damage than others instead of dealing a static 10
 * damage each character. In addition to that, you are also able to change the
 * color of the damage flash, too!
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Insert the following notetags into the noteboxes for your tilesets:
 *
 * Tileset Notetag:
 *
 *   <Floor Damage x: y>
 *   - 'x' is the terrain tag to mark the tileset with. By default, terrain
 *   tags are set to 0. They will go up as high as 7. 'y' will be the amount of
 *   damage dealt to each actor in the party. For example, <Floor Damage 2: 50>
 *   will cause all damage tiles marked with terrain tag 2 to deal 50 damage.
 *   * Note: You will still need to mark the tile itself as a damage tile in
 *   the database editor.
 *
 *   <Floor Flash x: r, g, b, o>
 *   - 'x' is the terrain tag to mark the tileset with. Replace 'r', 'g', 'b',
 *   and 'o' with values between 0-255 to indicate the red, green, blue, and
 *   opacity values respectively. This will make the screen flash this color
 *   combination when the player takes damage from this tile.
 *   * Note: You will still need to mark the tile itself as a damage tile in
 *   the database editor.
 *
 * ============================================================================
 * Lunatic Mode - Custom Floor Damage
 * ============================================================================
 *
 * For those with JavaScript experience, you can make certain terrain tags deal
 * custom amounts of damage to your actors.
 *
 * Tileset Notetag:
 *
 *   <Custom Floor Damage x>
 *    value = actor.level;
 *   </Custom Floor Damage x>
 *   - 'x' is the terrain tag to mark the tileset with. By default, terrain
 *   tags are set to 0. They will go up as high as 7. 'y' will be the amount of
 *   damage dealt to each actor in the party. 'value' is the final damage value
 *   that will be added upon the <Floor Damage x: y> value. 'actor' will refer
 *   to the actor being damaged currently.
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
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_FloorDamage');
Yanfly.Param = Yanfly.Param || {};

// Safely parse the default damage parameter with bounds checking
var defaultDamageParam = Number(Yanfly.Parameters['Default Damage']);
Yanfly.Param.FloorDmgDefault = isNaN(defaultDamageParam) || defaultDamageParam <= 0 ? 10 : defaultDamageParam;

// Safely parse the flash color with validation
Yanfly.SetupParameters = function() {
  var defaultFlash = [255, 0, 0, 128]; // Default flash color if parsing fails
  
  try {
    var colorString = String(Yanfly.Parameters['Flash Color'] || '255, 0, 0, 128');
    var array = colorString.split(',');
    
    // Ensure we have exactly 4 values (r, g, b, opacity)
    if (array.length !== 4) {
      console.warn('Invalid flash color format. Using default.');
      return defaultFlash;
    }
    
    // Parse and validate each color component
    for (var i = 0; i < array.length; ++i) {
      var value = parseInt(array[i].trim());
      
      // Validate each value is a number in the valid range 0-255
      if (isNaN(value) || value < 0 || value > 255) {
        console.warn('Invalid color value: ' + array[i] + '. Using default flash color.');
        return defaultFlash;
      }
      
      array[i] = value;
    }
    
    Yanfly.Param.FloorDmgFlash = array;
  } catch (e) {
    console.error('Error parsing flash color parameter:', e);
    Yanfly.Param.FloorDmgFlash = defaultFlash;
  }
};
Yanfly.SetupParameters();

//=============================================================================
// DataManager
//=============================================================================

Yanfly.FloorDmg.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.FloorDmg.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_FloorDamage) {
    this.processFloorDmgNotetags1($dataTilesets);
    Yanfly._loaded_YEP_FloorDamage = true;
  }
  
  return true;
};

DataManager.processFloorDmgNotetags1 = function(group) {
  var note1a = /<(?:CUSTOM FLOOR DAMAGE|custom floor dmg)[ ](\d+)>/i;
  var note1b = /<\/(?:CUSTOM FLOOR DAMAGE|custom floor dmg)[ ](\d+)>/i;
  var note2 = /<FLOOR FLASH[ ](\d+):[ ](.*)>/i
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.floorDmg = [
      Yanfly.Param.FloorDmgDefault, Yanfly.Param.FloorDmgDefault,
      Yanfly.Param.FloorDmgDefault, Yanfly.Param.FloorDmgDefault,
      Yanfly.Param.FloorDmgDefault, Yanfly.Param.FloorDmgDefault,
      Yanfly.Param.FloorDmgDefault, Yanfly.Param.FloorDmgDefault
    ];
    obj.floorDmgFlash = [
      Yanfly.Param.FloorDmgFlash, Yanfly.Param.FloorDmgFlash,
      Yanfly.Param.FloorDmgFlash, Yanfly.Param.FloorDmgFlash,
      Yanfly.Param.FloorDmgFlash, Yanfly.Param.FloorDmgFlash,
      Yanfly.Param.FloorDmgFlash, Yanfly.Param.FloorDmgFlash
    ]
    var evalMode = 'none';
    var terrainId = 0;
    obj.floorDmgEval = ['', '', '', '', '', '', '', ''];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:FLOOR DAMAGE|floor dmg)[ ](\d+):[ ](\d+)>/i)) {
        var tag = parseInt(RegExp.$1).clamp(0, 7);
        var dmg = parseInt(RegExp.$2);
        // Validate damage value is non-negative
        obj.floorDmg[tag] = isNaN(dmg) || dmg < 0 ? Yanfly.Param.FloorDmgDefault : dmg;
      } else if (line.match(note1a)) {
        evalMode = 'custom floor damage';
        var terrainId = parseInt(RegExp.$1).clamp(0, 7);
      } else if (line.match(note1b)) {
        evalMode = 'none';
      } else if (evalMode === 'custom floor damage') {
        // Sanitize the line to avoid potential code injection
        var sanitizedLine = line;
        
        // Remove dangerous JavaScript constructs
        var dangerousPatterns = [
          /\beval\b/i,
          /\bFunction\b/i,
          /\brequire\b/i,
          /\bimport\b/i,
          /\bexport\b/i,
          /\bglobal\b/i,
          /\bprocess\b/i,
          /\b__proto__\b/i,
          /\bconstructor\.\b/i,
          /\bprototype\b/i,
          /\bcall\b/i,
          /\bapply\b/i,
          /\bwindow\b/i,
          /\bdocument\b/i
        ];
        
        // Check for dangerous patterns
        var isDangerous = false;
        for (var p = 0; p < dangerousPatterns.length; p++) {
          if (dangerousPatterns[p].test(sanitizedLine)) {
            console.warn('Potentially harmful code detected and removed from note tag: ' + line);
            isDangerous = true;
            break;
          }
        }
        
        // Only add safe lines
        if (!isDangerous) {
          obj.floorDmgEval[terrainId] += sanitizedLine + '\n';
        }
      } else if (line.match(note2)) {
        var tag = parseInt(RegExp.$1).clamp(0, 7);
        var array = String(RegExp.$2).split(',');
        
        // Validate color array
        var validArray = true;
        if (array.length !== 4) validArray = false;
        
        for (var a = 0; a < array.length; ++a) {
          var value = parseInt(array[a].trim());
          if (isNaN(value) || value < 0 || value > 255) {
            validArray = false;
            break;
          }
          array[a] = value;
        }
        
        if (validArray) obj.floorDmgFlash[tag] = array;
      }
    }
  }
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.basicFloorDamage = function() {
  var value = $gameMap.evaluateFloorDamage(this);
  return Math.ceil(value);
};

Game_Actor.prototype.performMapDamage = function() {
  if ($gameParty.inBattle()) return;
  var terrainTag = $gamePlayer.terrainTag();
  var tileset = $gameMap.tileset();
  var data = tileset.floorDmgFlash[terrainTag] || [255, 0, 0, 128];
  $gameScreen.startFlash(data, 8);
};

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.evaluateFloorDamage = function(actor) {
  var terrainTag = $gamePlayer.terrainTag();
  var tileset = this.tileset();
  var value = tileset.floorDmg[terrainTag] || 10;
  var a = actor;
  var b = actor;
  var user = actor;
  var subject = actor;
  var target = actor;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = tileset.floorDmgEval[terrainTag] || 0;
  try {
    // Instead of using new Function which is unsafe, use a safer approach
    if (code) {
      value = this.safeEvaluateFloorDamage(
        code, value, a, b, user, subject, target, s, v
      );
    }
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'CUSTOM FLOOR DAMAGE ERROR');
  }
  return value;
};

// Safe evaluation method for floor damage calculations
Game_Map.prototype.safeEvaluateFloorDamage = function(code, value, a, b, user, subject, target, s, v) {
  // First, make sure code doesn't contain any potentially harmful operations
  var dangerousPatterns = [
    /\beval\b/i,
    /\bFunction\b/i,
    /\bnew\s+/i,
    /\brequire\b/i,
    /\bimport\b/i,
    /\bexport\b/i,
    /\bglobal\b/i,
    /\bprocess\b/i,
    /\b__proto__\b/i,
    /\bconstructor\.\b/i,
    /\bprototype\b/i,
    /\bcall\b/i,
    /\bapply\b/i,
    /\bwindow\b/i,
    /\bdocument\b/i,
    /\$gameSys/i,
    /SceneManager/i,
    /DataManager/i,
    /ConfigManager/i,
    /ImageManager/i,
    /AudioManager/i,
    /\btry\b/i,
    /\bcatch\b/i
  ];
  
  for (var i = 0; i < dangerousPatterns.length; i++) {
    if (dangerousPatterns[i].test(code)) {
      console.error('Potentially harmful code detected in floor damage formula: ' + code);
      return value; // Return the default value instead of executing potentially harmful code
    }
  }
  
  // Check for common floor damage patterns and handle them directly
  
  // Pattern: value = actor.level;
  if (code.match(/value\s*=\s*actor\.level\s*;/i) || 
      code.match(/value\s*=\s*a\.level\s*;/i) ||
      code.match(/value\s*=\s*user\.level\s*;/i) ||
      code.match(/value\s*=\s*subject\.level\s*;/i) ||
      code.match(/value\s*=\s*target\.level\s*;/i)) {
    return a.level;
  }
  
  // Pattern: value = actor.hp / 10;
  if (code.match(/value\s*=\s*actor\.hp\s*\/\s*(\d+)\s*;/i) || 
      code.match(/value\s*=\s*a\.hp\s*\/\s*(\d+)\s*;/i) ||
      code.match(/value\s*=\s*user\.hp\s*\/\s*(\d+)\s*;/i) ||
      code.match(/value\s*=\s*subject\.hp\s*\/\s*(\d+)\s*;/i) ||
      code.match(/value\s*=\s*target\.hp\s*\/\s*(\d+)\s*;/i)) {
    var divisor = parseInt(RegExp.$1) || 10;
    return Math.floor(a.hp / divisor);
  }
  
  // Pattern: value = actor.mhp * 0.1;
  if (code.match(/value\s*=\s*actor\.mhp\s*\*\s*(0\.\d+)\s*;/i) || 
      code.match(/value\s*=\s*a\.mhp\s*\*\s*(0\.\d+)\s*;/i) ||
      code.match(/value\s*=\s*user\.mhp\s*\*\s*(0\.\d+)\s*;/i) ||
      code.match(/value\s*=\s*subject\.mhp\s*\*\s*(0\.\d+)\s*;/i) ||
      code.match(/value\s*=\s*target\.mhp\s*\*\s*(0\.\d+)\s*;/i)) {
    var multiplier = parseFloat(RegExp.$1) || 0.1;
    return Math.floor(a.mhp * multiplier);
  }
  
  // Pattern: value = actor.mhp / 10;
  if (code.match(/value\s*=\s*actor\.mhp\s*\/\s*(\d+)\s*;/i) || 
      code.match(/value\s*=\s*a\.mhp\s*\/\s*(\d+)\s*;/i) ||
      code.match(/value\s*=\s*user\.mhp\s*\/\s*(\d+)\s*;/i) ||
      code.match(/value\s*=\s*subject\.mhp\s*\/\s*(\d+)\s*;/i) ||
      code.match(/value\s*=\s*target\.mhp\s*\/\s*(\d+)\s*;/i)) {
    var divisor = parseInt(RegExp.$1) || 10;
    return Math.floor(a.mhp / divisor);
  }
  
  // Pattern: value = actor.atk;
  if (code.match(/value\s*=\s*actor\.atk\s*;/i) || 
      code.match(/value\s*=\s*a\.atk\s*;/i) ||
      code.match(/value\s*=\s*user\.atk\s*;/i) ||
      code.match(/value\s*=\s*subject\.atk\s*;/i) ||
      code.match(/value\s*=\s*target\.atk\s*;/i)) {
    return a.atk;
  }
  
  // Pattern: value = actor.def;
  if (code.match(/value\s*=\s*actor\.def\s*;/i) || 
      code.match(/value\s*=\s*a\.def\s*;/i) ||
      code.match(/value\s*=\s*user\.def\s*;/i) ||
      code.match(/value\s*=\s*subject\.def\s*;/i) ||
      code.match(/value\s*=\s*target\.def\s*;/i)) {
    return a.def;
  }
  
  // Pattern: value = actor.mat;
  if (code.match(/value\s*=\s*actor\.mat\s*;/i) || 
      code.match(/value\s*=\s*a\.mat\s*;/i) ||
      code.match(/value\s*=\s*user\.mat\s*;/i) ||
      code.match(/value\s*=\s*subject\.mat\s*;/i) ||
      code.match(/value\s*=\s*target\.mat\s*;/i)) {
    return a.mat;
  }
  
  // Pattern: value = actor.mdf;
  if (code.match(/value\s*=\s*actor\.mdf\s*;/i) || 
      code.match(/value\s*=\s*a\.mdf\s*;/i) ||
      code.match(/value\s*=\s*user\.mdf\s*;/i) ||
      code.match(/value\s*=\s*subject\.mdf\s*;/i) ||
      code.match(/value\s*=\s*target\.mdf\s*;/i)) {
    return a.mdf;
  }
  
  // Pattern: value = actor.agi;
  if (code.match(/value\s*=\s*actor\.agi\s*;/i) || 
      code.match(/value\s*=\s*a\.agi\s*;/i) ||
      code.match(/value\s*=\s*user\.agi\s*;/i) ||
      code.match(/value\s*=\s*subject\.agi\s*;/i) ||
      code.match(/value\s*=\s*target\.agi\s*;/i)) {
    return a.agi;
  }
  
  // Pattern: value = actor.luk;
  if (code.match(/value\s*=\s*actor\.luk\s*;/i) || 
      code.match(/value\s*=\s*a\.luk\s*;/i) ||
      code.match(/value\s*=\s*user\.luk\s*;/i) ||
      code.match(/value\s*=\s*subject\.luk\s*;/i) ||
      code.match(/value\s*=\s*target\.luk\s*;/i)) {
    return a.luk;
  }
  
  // Pattern: value += X;
  if (code.match(/value\s*\+=\s*(\d+)\s*;/i)) {
    var addition = parseInt(RegExp.$1) || 0;
    return value + addition;
  }
  
  // Pattern: value *= X;
  if (code.match(/value\s*\*=\s*(\d+(?:\.\d+)?)\s*;/i)) {
    var multiplier = parseFloat(RegExp.$1) || 1;
    return Math.floor(value * multiplier);
  }
  
  // Pattern: value = X;
  if (code.match(/value\s*=\s*(\d+)\s*;/i)) {
    return parseInt(RegExp.$1) || value;
  }
  
  // Pattern: value = $gameVariables.value(X);
  if (code.match(/value\s*=\s*\$gameVariables\.value\(\s*(\d+)\s*\)\s*;/i)) {
    var varId = parseInt(RegExp.$1) || 0;
    if (varId > 0 && varId < v.length && v[varId] !== undefined) {
      return typeof v[varId] === 'number' ? v[varId] : value;
    }
  }
  
  // Pattern: value = Math.min(actor.hp, X);
  if (code.match(/value\s*=\s*Math\.min\(\s*(?:actor|a|user|subject|target)\.hp\s*,\s*(\d+)\s*\)\s*;/i)) {
    var maxValue = parseInt(RegExp.$1) || 0;
    return Math.min(a.hp, maxValue);
  }
  
  // Pattern: value = Math.max(X, actor.level * Y);
  if (code.match(/value\s*=\s*Math\.max\(\s*(\d+)\s*,\s*(?:actor|a|user|subject|target)\.level\s*\*\s*(\d+(?:\.\d+)?)\s*\)\s*;/i)) {
    var minValue = parseInt(RegExp.$1) || 0;
    var multiplier = parseFloat(RegExp.$2) || 1;
    return Math.max(minValue, Math.floor(a.level * multiplier));
  }
  
  // Pattern: value = actor.param * X; where param can be any stat
  if (code.match(/value\s*=\s*(?:actor|a|user|subject|target)\.(\w+)\s*\*\s*(\d+(?:\.\d+)?)\s*;/i)) {
    var param = String(RegExp.$1).toLowerCase();
    var multiplier = parseFloat(RegExp.$2) || 1;
    
    // Get the appropriate parameter value
    var paramValue = 0;
    switch (param) {
      case 'level': paramValue = a.level; break;
      case 'hp': paramValue = a.hp; break;
      case 'mp': paramValue = a.mp; break;
      case 'tp': paramValue = a.tp; break;
      case 'mhp': paramValue = a.mhp; break;
      case 'mmp': paramValue = a.mmp; break;
      case 'atk': paramValue = a.atk; break;
      case 'def': paramValue = a.def; break;
      case 'mat': paramValue = a.mat; break;
      case 'mdf': paramValue = a.mdf; break;
      case 'agi': paramValue = a.agi; break;
      case 'luk': paramValue = a.luk; break;
      default: return value; // Unknown parameter, return default
    }
    
    return Math.floor(paramValue * multiplier);
  }
  
  // Pattern: value = actor.hp * 0.X; (percentage pattern)
  if (code.match(/value\s*=\s*(?:actor|a|user|subject|target)\.(\w+)\s*\*\s*(0\.\d+)\s*;/i)) {
    var param = String(RegExp.$1).toLowerCase();
    var percentage = parseFloat(RegExp.$2) || 0.1;
    
    // Get the appropriate parameter value
    var paramValue = 0;
    switch (param) {
      case 'level': paramValue = a.level; break;
      case 'hp': paramValue = a.hp; break;
      case 'mp': paramValue = a.mp; break;
      case 'tp': paramValue = a.tp; break;
      case 'mhp': paramValue = a.mhp; break;
      case 'mmp': paramValue = a.mmp; break;
      case 'atk': paramValue = a.atk; break;
      case 'def': paramValue = a.def; break;
      case 'mat': paramValue = a.mat; break;
      case 'mdf': paramValue = a.mdf; break;
      case 'agi': paramValue = a.agi; break;
      case 'luk': paramValue = a.luk; break;
      default: return value; // Unknown parameter, return default
    }
    
    return Math.floor(paramValue * percentage);
  }
  
  // Pattern for combined values: value = actor.atk + actor.def / 2;
  if (code.match(/value\s*=\s*(?:actor|a|user|subject|target)\.(\w+)\s*\+\s*(?:actor|a|user|subject|target)\.(\w+)\s*\/\s*(\d+)\s*;/i)) {
    var param1 = String(RegExp.$1).toLowerCase();
    var param2 = String(RegExp.$2).toLowerCase();
    var divisor = parseInt(RegExp.$3) || 2;
    
    var value1 = 0;
    var value2 = 0;
    
    // Get first parameter
    switch (param1) {
      case 'level': value1 = a.level; break;
      case 'hp': value1 = a.hp; break;
      case 'mp': value1 = a.mp; break;
      case 'tp': value1 = a.tp; break;
      case 'mhp': value1 = a.mhp; break;
      case 'mmp': value1 = a.mmp; break;
      case 'atk': value1 = a.atk; break;
      case 'def': value1 = a.def; break;
      case 'mat': value1 = a.mat; break;
      case 'mdf': value1 = a.mdf; break;
      case 'agi': value1 = a.agi; break;
      case 'luk': value1 = a.luk; break;
      default: value1 = 0; break;
    }
    
    // Get second parameter
    switch (param2) {
      case 'level': value2 = a.level; break;
      case 'hp': value2 = a.hp; break;
      case 'mp': value2 = a.mp; break;
      case 'tp': value2 = a.tp; break;
      case 'mhp': value2 = a.mhp; break;
      case 'mmp': value2 = a.mmp; break;
      case 'atk': value2 = a.atk; break;
      case 'def': value2 = a.def; break;
      case 'mat': value2 = a.mat; break;
      case 'mdf': value2 = a.mdf; break;
      case 'agi': value2 = a.agi; break;
      case 'luk': value2 = a.luk; break;
      default: value2 = 0; break;
    }
    
    return Math.floor(value1 + (value2 / divisor));
  }
  
  // If no patterns match, log a warning and return the default value
  console.warn('Could not safely evaluate floor damage code: ' + code);
  return value;
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
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
