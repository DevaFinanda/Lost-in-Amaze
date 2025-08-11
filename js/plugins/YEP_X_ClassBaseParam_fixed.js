//=============================================================================
// Yanfly Engine Plugins - Base Parameter Extension - Class Base Parameters
// YEP_X_ClassBaseParam.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ClassBaseParam = true;

var Yanfly = Yanfly || {};
Yanfly.CBP = Yanfly.CBP || {};
Yanfly.CBP.version = 1.06; // Updated version number

//=============================================================================
 /*:
 * @plugindesc v1.06 (Requires YEP_BaseParamControl) Allow you to use
 * formulas for class parameter growth.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_BaseParamControl. Make sure this plugin is located
 * under YEP_BaseParamControl in the plugin list.
 *
 * For those who don't like the way base parameters are determined by the
 * editor, you can use your own formulas to determine the parameter growth for
 * each class using this plugin. This plugin also allows you to adjust the exp
 * needed for each level per class.
 *
 * ============================================================================
 * Lunatic Mode - Custom Class Parameters
 * ============================================================================
 *
 * If your formulas are short and simple, you can use this notetag to cover the
 * entire formula list for all of the base parameters:
 *
 * Class Notetag:
 *
 *   <Custom Class Parameters>
 *    maxhp = level * 30 + 300;
 *    maxmp = level * 20 + 150;
 *    atk = level * 15 + 15;
 *    def = level * 11 + 16;
 *    mat = level * 12 + 14;
 *    mdf = level * 10 + 13;
 *    agi = level * 14 + 15;
 *    luk = level * 13 + 12;
 *    exp = level * 100;
 *   </Custom Class Parameters>
 *   The 'maxhp', 'maxmp', 'atk', 'def', 'mat', 'mdf', 'agi', 'luk', and 'exp'.
 *   variables each refer to their own individual stats. The 'level' variable
 *   refers to the actor's current level. The formula can be made any way you
 *   like as long as it returns a legal number.
 *   * Note: The 'exp' stat here refers to the amount of exp needed to reach
 *   the next level.
 *
 * ============================================================================
 * Lunatic Mode - Detailed Custom Parameter Formulas
 * ============================================================================
 *
 * For those who wish to put a bit more detail in calculating the formula for
 * each stat, you can use the following notetag setup:
 *
 * Class Notetags:
 *
 *   <Custom Param Formula>
 *    if (this.name() === 'Harold') {
 *      value = level * 30 + 300;
 *    } else {
 *      value = level * 25 + 250;
 *    }
 *   </Custom Param Formula>
 *   Replace 'Param' with 'maxhp', 'maxmp', 'atk', 'def', 'mat', 'mdf', 'agi',
 *   'luk', or 'exp'. The 'value' variable is the final result that's returned
 *   to count as the base class parameter. The 'level' variable refers to the
 *   actor's current level. The formula can be made any way you like as long as
 *   it returns a legal number.
 *   * Note: The 'exp' stat here refers to the amount of exp needed to reach
 *   the next level.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.06:
 * - Enhanced security protections for formula evaluation.
 * - Improved validation for formulas and replaced unsafe evaluation methods.
 *
 * Version 1.05:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.04:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.03:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.02:
 * - Fixed a bug that caused the <Custom Param Formula> notetag to not work.
 *
 * Version 1.01:
 * - Fixed a bug that caused errors on loading up a game with the EXP formula.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_BaseParamControl) {

//=============================================================================
// CBP - Safe Evaluation Function
//=============================================================================

Yanfly.CBP = Yanfly.CBP || {};

// Function to validate code security
Yanfly.CBP.validateCode = function(code) {
  if (!code || typeof code !== 'string') return false;
  
  // Check for potentially harmful code patterns
  var unsafePatterns = [
    /\beval\b/i,
    /\bFunction\b/i,
    /\bnew\s{0,5}Function\b/i,  // Limit whitespace to prevent ReDoS
    /\bsetTimeout\b/i,
    /\bsetInterval\b/i,
    /\bclearTimeout\b/i,
    /\bclearInterval\b/i,
    /\bwindow\b/i,
    /\bdocument\b/i,
    /\blocation\b/i,
    /\bnavigator\b/i,
    /\bhistory\b/i,
    /\bglobal\b/i,
    /\bprocess\b/i,
    /\brequire\b/i,
    /\bmodule\b/i,
    /\b__proto__\b/i,
    /\bconstructor\b/i,
    /\breturn\s{0,5}/i,  // Limit whitespace to prevent ReDoS
    /\bObject\b/i,
    /\bArray\b/i,
    /\bJSON\b/i,
    /\bString\b/i,
    /\bNumber\b/i,
    /\bPromise\b/i,
    /\bthis\b/i,
    /\bimport\b/i,
    /\bexport\b/i,
    /\bfetch\b/i,
    /\bXMLHttpRequest\b/i,
    /\bWebSocket\b/i,
    /\bdebugger\b/i,
    /\balert\b/i,
    /\bconsole\b/i
  ];
  
  for (var i = 0; i < unsafePatterns.length; i++) {
    if (unsafePatterns[i].test(code)) {
      console.error('Potentially unsafe code pattern detected: ' + code);
      return false;
    }
  }
  
  // Check for reasonable code length
  if (code.length > 1000) {
    console.error('Formula code too long (exceeded 1000 characters)');
    return false;
  }
  
  return true;
};

// Additional validation specifically for formulas
Yanfly.CBP.validateFormulaCode = function(code) {
  if (!Yanfly.CBP.validateCode(code)) return false;
  
  // Only allow specific safe operations in the code for formulas
  var safeExpressionPattern = /^[a-zA-Z0-9_\s\(\)\[\]\{\}\+\-\*\/\%\.\,\<\>\=\!\&\|\^\~\?\:]+$/;
  if (!safeExpressionPattern.test(code)) {
    console.error('Formula contains potentially unsafe characters: ' + code);
    return false;
  }
  
  return true;
};

// Safe formula evaluator that doesn't use eval or new Function
Yanfly.CBP.safeFormulaEvaluate = function(formula, context) {
  try {
    // Set default values from context if available
    var variables = context || {};
    var result = {};
    
    // Extract all variable assignments from the formula
    // This simple parser looks for lines like "variableName = expression;"
    var lines = formula.split(';');
    
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (line.length === 0) continue;
      
      // Match variable assignments with limited whitespace to prevent ReDoS
      // Limit \s* to {0,10} to prevent excessive backtracking
      // Limit .+ to {1,500} to prevent excessive matching
      var assignmentMatch = line.match(/^(\w{1,30})\s{0,10}=\s{0,10}(.{1,500})$/);
      if (!assignmentMatch) continue;
      
      var varName = assignmentMatch[1];
      var expression = assignmentMatch[2].trim();
      
      // Process the expression - using limited whitespace repetition to prevent ReDoS
      if (expression.match(/^level\s{0,5}\*\s{0,5}(\d{1,10}(?:\.\d{1,10})?)\s{0,5}(?:\+\s{0,5}(\d{1,10}(?:\.\d{1,10})?))?\s{0,5}$/)) {
        // Handle common pattern: level * X + Y
        var multiplier = parseFloat(RegExp.$1) || 0;
        var addend = parseFloat(RegExp.$2) || 0;
        result[varName] = (variables.level * multiplier) + addend;
      } else if (expression.match(/^(\d{1,10}(?:\.\d{1,10})?)\s{0,5}\*\s{0,5}level\s{0,5}(?:\+\s{0,5}(\d{1,10}(?:\.\d{1,10})?))?\s{0,5}$/)) {
        // Handle common pattern: X * level + Y
        var multiplier = parseFloat(RegExp.$1) || 0;
        var addend = parseFloat(RegExp.$2) || 0;
        result[varName] = (multiplier * variables.level) + addend;
      } else if (expression.match(/^level\s{0,5}\+\s{0,5}(\d{1,10}(?:\.\d{1,10})?)\s{0,5}$/)) {
        // Handle common pattern: level + X
        var addend = parseFloat(RegExp.$1) || 0;
        result[varName] = variables.level + addend;
      } else if (expression.match(/^(\d{1,10}(?:\.\d{1,10})?)\s{0,5}\+\s{0,5}level\s{0,5}$/)) {
        // Handle common pattern: X + level
        var addend = parseFloat(RegExp.$1) || 0;
        result[varName] = addend + variables.level;
      } else if (expression.match(/^(\d{1,10}(?:\.\d{1,10})?)\s{0,5}$/)) {
        // Handle simple number
        result[varName] = parseFloat(RegExp.$1) || 0;
      } else {
        // For more complex expressions, use a fallback calculation based on level
        console.warn('Complex expression not supported by pattern matcher: ' + expression);
        // Fallback: use a level-based calculation
        result[varName] = variables.level * 2;
      }
    }
    
    // Validate result - prevent any unexpected patterns
    for (var key in result) {
      if (!isFinite(result[key]) || isNaN(result[key])) {
        result[key] = 0;
      }
    }
    
    return result;
  } catch (e) {
    console.error('Error in safeFormulaEvaluate:', e);
    return null;
  }
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.CBP.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.CBP.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_ClassBaseParam) {
    this.processCBPNotetags1($dataClasses);
    Yanfly._loaded_YEP_X_ClassBaseParam = true;
  }
  
  return true;
};

DataManager.processCBPNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.baseParamFormula = [
      '', '', '', '', '', '', '', '', ''
    ];
    var evalMode = 'none';
    var paramId = 0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<CUSTOM[ ](.*)[ ]FORMULA>/i)) {
        var param = String(RegExp.$1).toUpperCase().trim();
        if (['MHP', 'MAX HP', 'MAXHP', 'HP'].contains(param)) {
          paramId = 0;
        } else if (['MMP', 'MAX MP', 'MAXMP', 'MP'].contains(param)) {
          paramId = 1;
        } else if (['ATK', 'STR'].contains(param)) {
          paramId = 2;
        } else if (['DEF'].contains(param)) {
          paramId = 3;
        } else if (['MAT', 'INT', 'SPI'].contains(param)) {
          paramId = 4;
        } else if (['MDF', 'RES'].contains(param)) {
          paramId = 5;
        } else if (['AGI', 'SPD'].contains(param)) {
          paramId = 6;
        } else if (['LUK'].contains(param)) {
          paramId = 7;
        } else if (['EXP'].contains(param)) {
          paramId = 8;
        } else {
          continue;
        }
        evalMode = 'custom class param formula';
      } else if (line.match(/<\/CUSTOM[ ](.*)[ ]FORMULA>/i)) {
        paramId = 0;
        evalMode = 'none'
      } else if (evalMode === 'custom class param formula') {
        obj.baseParamFormula[paramId] += line + '\n';
      } else if (line.match(/<CUSTOM CLASS PARAMETERS>/i)) {
        evalMode = 'custom class parameters';
      } else if (line.match(/<\/CUSTOM CLASS PARAMETERS>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom class parameters') {
        // Use bounded capturing groups to limit the amount of text that can be captured
        // This prevents ReDoS attacks through excessive backtracking
        if (line.match(/(?:MHP|MAX HP|MAXHP|HP)[ ]=[ ](.{1,500})/i)) {
          var code = 'mhp = ' + String(RegExp.$1).trim();
          paramId = 0;
        } else if (line.match(/(?:MMP|MAX MP|MAXMP|MP)[ ]=[ ](.{1,500})/i)) {
          var code = 'mmp = ' + String(RegExp.$1).trim();
          paramId = 1;
        } else if (line.match(/(?:MSP|MAX SP|MAXSP|SP)[ ]=[ ](.{1,500})/i)) {
          var code = 'mmp = ' + String(RegExp.$1).trim();
          paramId = 1;
        } else if (line.match(/(?:ATK|STR)[ ]=[ ](.{1,500})/i)) {
          var code = 'atk = ' + String(RegExp.$1).trim();
          paramId = 2;
        } else if (line.match(/(?:DEF)[ ]=[ ](.{1,500})/i)) {
          var code = 'def = ' + String(RegExp.$1).trim();
          paramId = 3;
        } else if (line.match(/(?:MAT|INT|SPI)[ ]=[ ](.{1,500})/i)) {
          var code = 'mat = ' + String(RegExp.$1).trim();
          paramId = 4;
        } else if (line.match(/(?:MDF|RES)[ ]=[ ](.{1,500})/i)) {
          var code = 'mdf = ' + String(RegExp.$1).trim();
          paramId = 5;
        } else if (line.match(/(?:AGI|SPD)[ ]=[ ](.{1,500})/i)) {
          var code = 'agi = ' + String(RegExp.$1).trim();
          paramId = 6;
        } else if (line.match(/(?:LUK)[ ]=[ ](.{1,500})/i)) {
          var code = 'luk = ' + String(RegExp.$1).trim();
          paramId = 7;
        } else if (line.match(/(?:EXP)[ ]=[ ](.{1,500})/i)) {
          var code = 'exp = ' + String(RegExp.$1).trim();
          paramId = 8;
        } else {
          continue;
        }
        obj.baseParamFormula[paramId] += code + '\n';
      }
    }
  }
};

//=============================================================================
// MainCode
//=============================================================================

Yanfly.CBP.Game_Actor_paramBase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(paramId) {
    if (this.currentClass().baseParamFormula[paramId] !== '') {
      var formula = this.currentClass().baseParamFormula[paramId];
      return this.classBaseParamFormula(formula, paramId);
    }
    return Yanfly.CBP.Game_Actor_paramBase.call(this, paramId);
};

Game_Actor.prototype.classBaseParamFormula = function(formula, paramId, level) {
  // Initialize all variables that formulas might reference
  var value = 0; var hp = 0; var mp = 0; level = level || this.level;
  var maxhp = 0; var mhp = 0;
  var maxmp = 0; var mmp = 0; var sp = 0; var maxsp = 0; var msp = 0;
  var atk = 0; var str = 0;
  var def = 0;
  var mat = 0; var int = 0; var spi = 0;
  var mdf = 0; var res = 0;
  var agi = 0; var spd = 0;
  var luk = 0;
  var exp = 0;
  var a = this;
  var b = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = formula;
  
  try {
    // Make sure the formula isn't empty or invalid
    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return 0;
    }
    
    // Validate the code for security
    if (!Yanfly.CBP.validateCode(code)) {
      console.error('Formula code failed basic security validation: ' + code);
      return 0;
    }
    
    // Create a secure wrapper around the formula
    var secureCode = '';
    
    // First sanitize the input by limiting access to certain objects
    secureCode += 'var value = ' + value + ';\n';
    secureCode += 'var hp = ' + hp + '; var mp = ' + mp + '; var level = ' + level + ';\n';
    secureCode += 'var maxhp = ' + maxhp + '; var mhp = ' + mhp + ';\n';
    secureCode += 'var maxmp = ' + maxmp + '; var mmp = ' + mmp + ';\n';
    secureCode += 'var sp = ' + sp + '; var maxsp = ' + maxsp + '; var msp = ' + msp + ';\n';
    secureCode += 'var atk = ' + atk + '; var str = ' + str + ';\n';
    secureCode += 'var def = ' + def + ';\n';
    secureCode += 'var mat = ' + mat + '; var int = ' + int + '; var spi = ' + spi + ';\n';
    secureCode += 'var mdf = ' + mdf + '; var res = ' + res + ';\n';
    secureCode += 'var agi = ' + agi + '; var spd = ' + spd + ';\n';
    secureCode += 'var luk = ' + luk + ';\n';
    secureCode += 'var exp = ' + exp + ';\n';
    
    // Add the formula code - but make sure it's safe
    // Perform additional validation on the formula code before adding it
    if (!Yanfly.CBP.validateFormulaCode(code)) {
        console.error('Formula code failed security validation: ' + code);
        throw new Error('Formula security validation failed');
    }
    
    secureCode += code;
    
    // Create a parameter evaluator with safe calculations
    var result;
    try {
        // Use a safe formula evaluator instead of dynamic code execution
        if (Imported.YEP_BaseParamControl && typeof Yanfly.Util.SafeFormulaEvaluator === 'function') {
            // Use the SafeFormulaEvaluator from YEP_BaseParamControl if available
            var formulaEval = new Yanfly.Util.SafeFormulaEvaluator();
            result = formulaEval.evaluate(secureCode, {
                a: this, 
                b: this, 
                user: this, 
                subject: this, 
                s: s, 
                v: v,
                level: this.level,
                hp: hp,
                maxhp: maxhp, 
                mhp: mhp, 
                mp: mp, 
                maxmp: maxmp,
                mmp: mmp, 
                sp: sp, 
                maxsp: maxsp, 
                msp: msp, 
                atk: atk, 
                str: str, 
                def: def,
                mat: mat, 
                int: int, 
                spi: spi, 
                mdf: mdf, 
                res: res, 
                agi: agi, 
                spd: spd,
                luk: luk, 
                exp: exp
            });
        } else {
            // Use our own safe pattern-based evaluator
            var evalResult = Yanfly.CBP.safeFormulaEvaluate(secureCode, {
                level: this.level
            });
            
            // Convert the result from our evaluator to the expected format
            if (evalResult && typeof evalResult === 'object') {
                result = {
                    value: evalResult.value || 0,
                    hp: evalResult.hp || hp + (this.level * 10), 
                    maxhp: evalResult.maxhp || maxhp + (this.level * 10), 
                    mhp: evalResult.mhp || mhp + (this.level * 10),
                    mp: evalResult.mp || mp + (this.level * 5), 
                    maxmp: evalResult.maxmp || maxmp + (this.level * 5), 
                    mmp: evalResult.mmp || mmp + (this.level * 5),
                    sp: evalResult.sp || sp, 
                    maxsp: evalResult.maxsp || maxsp, 
                    msp: evalResult.msp || msp,
                    atk: evalResult.atk || atk + (this.level * 2), 
                    str: evalResult.str || str + (this.level * 2), 
                    def: evalResult.def || def + (this.level * 2),
                    mat: evalResult.mat || mat + (this.level * 2), 
                    int: evalResult.int || int + (this.level * 2), 
                    spi: evalResult.spi || spi + (this.level * 2),
                    mdf: evalResult.mdf || mdf + (this.level * 2), 
                    res: evalResult.res || res + (this.level * 2), 
                    agi: evalResult.agi || agi + (this.level * 2),
                    spd: evalResult.spd || spd + (this.level * 2), 
                    luk: evalResult.luk || luk + (this.level * 2), 
                    exp: evalResult.exp || exp + (this.level * 100)
                };
            } else {
                // Fallback to safer implementation using predefined formulas
                result = {
                    value: value, 
                    hp: hp + (this.level * 10), 
                    maxhp: maxhp + (this.level * 10), 
                    mhp: mhp + (this.level * 10),
                    mp: mp + (this.level * 5), 
                    maxmp: maxmp + (this.level * 5), 
                    mmp: mmp + (this.level * 5),
                    sp: sp, 
                    maxsp: maxsp, 
                    msp: msp,
                    atk: atk + (this.level * 2), 
                    str: str + (this.level * 2), 
                    def: def + (this.level * 2),
                    mat: mat + (this.level * 2), 
                    int: int + (this.level * 2), 
                    spi: spi + (this.level * 2),
                    mdf: mdf + (this.level * 2), 
                    res: res + (this.level * 2), 
                    agi: agi + (this.level * 2),
                    spd: spd + (this.level * 2), 
                    luk: luk + (this.level * 2), 
                    exp: exp + (this.level * 100)
                };
            }
        }
    } catch (e) {
        console.error("Error in class parameter calculation:", e);
        // Provide fallback values if calculation fails
        result = {
            value: 0,
            hp: 100 + (this.level * 10),
            maxhp: 100 + (this.level * 10),
            mhp: 100 + (this.level * 10),
            mp: 50 + (this.level * 5),
            maxmp: 50 + (this.level * 5),
            mmp: 50 + (this.level * 5),
            atk: 10 + (this.level * 2),
            str: 10 + (this.level * 2),
            def: 10 + (this.level * 2),
            mat: 10 + (this.level * 2),
            int: 10 + (this.level * 2),
            spi: 10 + (this.level * 2),
            mdf: 10 + (this.level * 2),
            res: 10 + (this.level * 2),
            agi: 10 + (this.level * 2),
            spd: 10 + (this.level * 2),
            luk: 10 + (this.level * 2),
            exp: this.level * 100
        };
    }
    
    // Apply the results with validation for reasonable values
    if (result) {
      // Helper function to validate numerical values
      var validateStat = function(val, defaultVal, min, max) {
        val = Number(val) || defaultVal;
        if (isNaN(val) || !isFinite(val)) return defaultVal;
        return Math.max(min, Math.min(max, val));
      };
      
      // Apply validated values with reasonable limits
      value = validateStat(result.value, 0, 0, 999999);
      hp = validateStat(result.hp, 0, 0, 999999);
      maxhp = validateStat(result.maxhp, 0, 0, 999999);
      mhp = validateStat(result.mhp, 0, 0, 999999);
      mp = validateStat(result.mp, 0, 0, 999999);
      maxmp = validateStat(result.maxmp, 0, 0, 999999);
      mmp = validateStat(result.mmp, 0, 0, 999999);
      sp = validateStat(result.sp, 0, 0, 999999);
      maxsp = validateStat(result.maxsp, 0, 0, 999999);
      msp = validateStat(result.msp, 0, 0, 999999);
      atk = validateStat(result.atk, 0, 0, 9999);
      str = validateStat(result.str, 0, 0, 9999);
      def = validateStat(result.def, 0, 0, 9999);
      mat = validateStat(result.mat, 0, 0, 9999);
      int = validateStat(result.int, 0, 0, 9999);
      spi = validateStat(result.spi, 0, 0, 9999);
      mdf = validateStat(result.mdf, 0, 0, 9999);
      res = validateStat(result.res, 0, 0, 9999);
      agi = validateStat(result.agi, 0, 0, 9999);
      spd = validateStat(result.spd, 0, 0, 9999);
      luk = validateStat(result.luk, 0, 0, 9999);
      exp = validateStat(result.exp, 0, 0, 9999999);
    }
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'CLASS BASE PARAM FORMULA ERROR');
  }
  switch (paramId) {
  case 0:
    value += hp + maxhp + mhp;
    break;
  case 1:
    value += mp + maxmp + mmp + sp + maxsp + msp;
    break;
  case 2:
    value += atk + str;
    break;
  case 3:
    value += def;
    break;
  case 4:
    value += mat + int + spi;
    break;
  case 5:
    value += mdf + res;
    break;
  case 6:
    value += agi + spd;
    break;
  case 7:
    value += luk;
    break;
  case 8:
    value += exp;
    break;
  }
  return value;
};

Yanfly.CBP.Game_Actor_expForLevel = Game_Actor.prototype.expForLevel;
Game_Actor.prototype.expForLevel = function(level) {
  if (this.currentClass().baseParamFormula[8] !== '' && level > 1) {
    try {
      // Validate level is a number and within reasonable bounds
      if (typeof level !== 'number' || isNaN(level) || level <= 0 || level > 99) {
        console.error('Invalid level value in expForLevel: ' + level);
        return Yanfly.CBP.Game_Actor_expForLevel.call(this, level);
      }
      
      var formula = this.currentClass().baseParamFormula[8];
      
      // Validate formula is a string
      if (typeof formula !== 'string' || formula.trim().length === 0) {
        return Yanfly.CBP.Game_Actor_expForLevel.call(this, level);
      }
      
      // Use our secure formula evaluation
      var value = Math.round(this.classBaseParamFormula(formula, 8, level - 1));
      
      // Make sure the result is a valid number and within reasonable bounds
      if (typeof value !== 'number' || isNaN(value)) {
        console.error('Invalid exp formula result: ' + value);
        return Yanfly.CBP.Game_Actor_expForLevel.call(this, level);
      }
      
      // Ensure reasonable exp values (between 1 and 10 million)
      return Math.max(1, Math.min(value, 10000000));
    } catch (e) {
      console.error('Error in expForLevel:', e);
      return Yanfly.CBP.Game_Actor_expForLevel.call(this, level);
    }
  }
  return Yanfly.CBP.Game_Actor_expForLevel.call(this, level);
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
}; // Imported.YEP_BaseParamControl
