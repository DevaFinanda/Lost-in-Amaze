//=============================================================================
// Yanfly Engine Plugins - Base Parameter Extension - Class Base Parameters
// YEP_X_ClassBaseParam.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ClassBaseParam = true;

var Yanfly = Yanfly || {};
Yanfly.CBP = Yanfly.CBP || {};
Yanfly.CBP.version = 1.05;

//=============================================================================
 /*:
 * @plugindesc v1.05 (Requires YEP_BaseParamControl) Allow you to use
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

// Function to validate code security - Enhanced with more patterns and better logging
Yanfly.CBP.validateCode = function(code) {
  if (!code || typeof code !== 'string') {
    console.error('Invalid code: Empty or not a string');
    return false;
  }
  
  // Check for potentially harmful code patterns - Extended list
  var unsafePatterns = [
    // Dynamic code execution
    /\beval\b/i,
    /\bFunction\b/i,
    /\bnew Function\b/i,
    
    // Timers and async execution
    /\bsetTimeout\b/i,
    /\bsetInterval\b/i,
    /\brequestAnimationFrame\b/i,
    /\bPromise\b/i,
    
    // DOM access
    /\bwindow\b/i,
    /\bdocument\b/i,
    /\blocation\b/i,
    /\bnavigator\b/i,
    /\bhistory\b/i,
    
    // System access
    /\bglobal\b/i,
    /\bprocess\b/i,
    /\brequire\b/i,
    /\bmodule\b/i,
    /\bfs\b/i,
    /\bpath\b/i,
    
    // Prototype manipulation
    /\b__proto__\b/i,
    /\bconstructor\b/i,
    /\bprototype\b/i,
    /\bObject\b/i,
    
    // Function references
    /\bcall\b/i,
    /\bapply\b/i,
    /\bbind\b/i,
    
    // Network requests
    /\bfetch\b/i,
    /\bXMLHttpRequest\b/i,
    /\bWebSocket\b/i,
    
    // Data access and storage
    /\blocalStorage\b/i,
    /\bsessionStorage\b/i,
    /\bIndexedDB\b/i,
    
    // Uncommon code patterns that might indicate obfuscation
    /\\x[0-9a-f]{2}/i,
    /\\u[0-9a-f]{4}/i,
    /String\.fromCharCode/i,
    /atob\b/i,
    /btoa\b/i,
    
    // Advanced injection techniques
    /\[\s*['"`].*['"`]\s*\]/i,
    /with\s*\(/i,
    /\bimport\b/i,
    /\bWorker\b/i
  ];
  
  for (var i = 0; i < unsafePatterns.length; i++) {
    if (unsafePatterns[i].test(code)) {
      var match = code.match(unsafePatterns[i]);
      console.error('Potentially unsafe code pattern detected: ' + (match ? match[0] : 'unknown pattern'));
      console.error('Rejected code: ' + code.substring(0, 50) + (code.length > 50 ? '...' : ''));
      return false;
    }
  }
  
  // Check for reasonable code length
  if (code.length > 1000) {
    console.error('Formula code too long (exceeded 1000 characters): ' + code.substring(0, 50) + '...');
    return false;
  }
  
  // Check for balanced brackets and parentheses
  var bracketCount = 0, parenthesesCount = 0;
  for (var i = 0; i < code.length; i++) {
    if (code[i] === '{') bracketCount++;
    if (code[i] === '}') bracketCount--;
    if (code[i] === '(') parenthesesCount++;
    if (code[i] === ')') parenthesesCount--;
    
    // Imbalanced brackets/parentheses could indicate malformed code
    if (bracketCount < 0 || parenthesesCount < 0) {
      console.error('Imbalanced brackets or parentheses in code: ' + code.substring(0, 50) + (code.length > 50 ? '...' : ''));
      return false;
    }
  }
  
  if (bracketCount !== 0 || parenthesesCount !== 0) {
    console.error('Imbalanced brackets or parentheses in code: ' + code.substring(0, 50) + (code.length > 50 ? '...' : ''));
    return false;
  }
  
  return true;
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
      // Use RegExp.test and limit the capture group length to prevent ReDoS
      if (line.length < 100 && /^<CUSTOM[ ]([\w\s]{1,30})[ ]FORMULA>$/i.test(line)) {
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
      } else if (line.length < 100 && /^<\/CUSTOM[ ]([\w\s]{1,30})[ ]FORMULA>$/i.test(line)) {
        paramId = 0;
        evalMode = 'none'
      } else if (evalMode === 'custom class param formula') {
        obj.baseParamFormula[paramId] += line + '\n';
      } else if (line.length < 100 && /^<CUSTOM CLASS PARAMETERS>$/i.test(line)) {
        evalMode = 'custom class parameters';
      } else if (line.length < 100 && /^<\/CUSTOM CLASS PARAMETERS>$/i.test(line)) {
        evalMode = 'none';
      } else if (evalMode === 'custom class parameters') {
        // Use fixed character classes and bounded repetitions to prevent ReDoS
        // Also add length limit to each line being processed
        if (line.length < 1000 && /^(?:MHP|MAX HP|MAXHP|HP)[ ]=[ ](.{1,900})$/i.test(line)) {
          var code = 'mhp = ' + String(RegExp.$1).trim();
          paramId = 0;
        } else if (line.length < 1000 && /^(?:MMP|MAX MP|MAXMP|MP)[ ]=[ ](.{1,900})$/i.test(line)) {
          var code = 'mmp = ' + String(RegExp.$1).trim();
          paramId = 1;
        } else if (line.length < 1000 && /^(?:MSP|MAX SP|MAXSP|SP)[ ]=[ ](.{1,900})$/i.test(line)) {
          var code = 'mmp = ' + String(RegExp.$1).trim();
          paramId = 1;
        } else if (line.length < 1000 && /^(?:ATK|STR)[ ]=[ ](.{1,900})$/i.test(line)) {
          var code = 'atk = ' + String(RegExp.$1).trim();
          paramId = 2;
        } else if (line.length < 1000 && /^(?:DEF)[ ]=[ ](.{1,900})$/i.test(line)) {
          var code = 'def = ' + String(RegExp.$1).trim();
          paramId = 3;
        } else if (line.length < 1000 && /^(?:MAT|INT|SPI)[ ]=[ ](.{1,900})$/i.test(line)) {
          var code = 'mat = ' + String(RegExp.$1).trim();
          paramId = 4;
        } else if (line.length < 1000 && /^(?:MDF|RES)[ ]=[ ](.{1,900})$/i.test(line)) {
          var code = 'mdf = ' + String(RegExp.$1).trim();
          paramId = 5;
        } else if (line.length < 1000 && /^(?:AGI|SPD)[ ]=[ ](.{1,900})$/i.test(line)) {
          var code = 'agi = ' + String(RegExp.$1).trim();
          paramId = 6;
        } else if (line.length < 1000 && /^(?:LUK)[ ]=[ ](.{1,900})$/i.test(line)) {
          var code = 'luk = ' + String(RegExp.$1).trim();
          paramId = 7;
        } else if (line.length < 1000 && /^(?:EXP)[ ]=[ ](.{1,900})$/i.test(line)) {
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
    
    // Add the formula code
    secureCode += code;
    
    // Instead of using new Function, we'll use our custom SafeFormulaEvaluator
    // Remove any creation of functions using dynamic code
    
    // Create a parameter evaluator with safe calculations
    var result;
    try {
        // Always use a safe evaluation approach
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
            // Create our own safe formula evaluator implementation
            // Instead of using new Function, we'll implement a simple parser for basic formulas
            
            // Initialize a safe formula evaluator if it doesn't exist
            if (!Yanfly.Util.SimpleSafeFormulaEvaluator) {
                Yanfly.Util.SimpleSafeFormulaEvaluator = function() {
                    // Evaluates basic mathematical formulas safely without using eval or Function
                    this.evaluate = function(formula, context) {
                        // This is a simplified parser that handles basic math operations
                        // It's not a full JavaScript parser, but it's much safer
                        var result = {
                            value: 0, hp: 0, maxhp: 0, mhp: 0, mp: 0, maxmp: 0, mmp: 0,
                            sp: 0, maxsp: 0, msp: 0, atk: 0, str: 0, def: 0,
                            mat: 0, int: 0, spi: 0, mdf: 0, res: 0, agi: 0,
                            spd: 0, luk: 0, exp: 0
                        };
                        
                        try {
                            // Extract variable assignments from the formula
                            var lines = formula.split('\n');
                            for (var i = 0; i < lines.length; i++) {
                                var line = lines[i].trim();
                                
                                // Skip empty lines
                                if (!line) continue;
                                
                                // Look for assignment operations (var = expression)
                                // Use a safer regex with bounded repetition and character classes
                                if (line.length > 1000) continue; // Skip extremely long lines to prevent ReDoS
                                
                                // Use RegExp.test with explicit character limits
                                if (/^(\w{1,50})[ \t]{0,10}=[ \t]{0,10}(.{1,900})[ \t]{0,5};?$/.test(line)) {
                                    var varName = RegExp.$1;
                                    var expression = RegExp.$2;
                                    
                                    // Calculate the expression
                                    var varValue = this.evaluateExpression(expression, context);
                                    
                                    // Store the result in the appropriate variable
                                    if (result.hasOwnProperty(varName)) {
                                        result[varName] = varValue;
                                    } else if (varName === 'value') {
                                        result.value = varValue;
                                    }
                                }
                            }
                            
                            return result;
                        } catch (e) {
                            console.error('Error in SimpleSafeFormulaEvaluator:', e);
                            return this.getDefaultResult(context.level || 1);
                        }
                    };
                    
                    // Evaluates a simple mathematical expression
                    this.evaluateExpression = function(expression, context) {
                        try {
                            // Replace variable names with their values from context
                            var sanitizedExpr = expression;
                            
                            // Replace level variable - with length validation and bounded iterations
                            if (context.level && typeof context.level === 'number') {
                                if (sanitizedExpr.length > 1000) {
                                    // Prevent processing excessively long expressions
                                    return 0;
                                }
                                
                                // Use safer string replacement technique instead of regex
                                var parts = [];
                                var lastIndex = 0;
                                var levelStr = 'level';
                                
                                // Find all occurrences of "level" word boundaries manually
                                var i = 0;
                                while (i < sanitizedExpr.length && i >= 0) {
                                    i = sanitizedExpr.indexOf(levelStr, i);
                                    if (i < 0) break;
                                    
                                    // Check if it's a word boundary
                                    var prevChar = i > 0 ? sanitizedExpr.charAt(i - 1) : '';
                                    var nextChar = i + levelStr.length < sanitizedExpr.length ? 
                                                sanitizedExpr.charAt(i + levelStr.length) : '';
                                    
                                    var isPrevBoundary = !prevChar || !/[a-zA-Z0-9_]/.test(prevChar);
                                    var isNextBoundary = !nextChar || !/[a-zA-Z0-9_]/.test(nextChar);
                                    
                                    if (isPrevBoundary && isNextBoundary) {
                                        // It's a word "level", add parts and replace
                                        parts.push(sanitizedExpr.substring(lastIndex, i));
                                        parts.push(context.level);
                                        lastIndex = i + levelStr.length;
                                    }
                                    
                                    i += levelStr.length;
                                }
                                
                                // Add remaining part
                                if (lastIndex < sanitizedExpr.length) {
                                    parts.push(sanitizedExpr.substring(lastIndex));
                                }
                                
                                sanitizedExpr = parts.join('');
                            }
                            
                            // Handle basic arithmetic operations
                            // This is a simple approach that can be expanded as needed
                            
                            // First handle parentheses with iteration limit to prevent ReDoS
                            var maxIterations = 20; // Limit iterations to prevent infinite loops
                            var iterations = 0;
                            
                            while (sanitizedExpr.includes('(') && iterations < maxIterations) {
                                iterations++;
                                
                                // Find the innermost parenthesis
                                var start = sanitizedExpr.lastIndexOf('(');
                                if (start === -1) break;
                                
                                var end = sanitizedExpr.indexOf(')', start);
                                if (end === -1) break;
                                
                                // Extract and calculate the expression inside
                                var inner = sanitizedExpr.substring(start + 1, end);
                                var result = this.calculateBasicMath(inner);
                                
                                // Replace the parenthesized expression with its result
                                sanitizedExpr = sanitizedExpr.substring(0, start) + result + sanitizedExpr.substring(end + 1);
                            }
                            
                            // Calculate the final expression
                            return this.calculateBasicMath(sanitizedExpr);
                        } catch (e) {
                            console.error('Expression evaluation error:', e, expression);
                            return 0;
                        }
                    };
                    
                    // Calculate basic math operations - with safer string parsing
                    this.calculateBasicMath = function(expr) {
                        if (!expr || expr.length > 500) {
                            return 0; // Safety check for length
                        }
                        
                        // Instead of using regex.replace multiple times which can be vulnerable to ReDoS,
                        // parse the expression manually with a simple tokenizer and calculator
                        try {
                            // Remove all whitespace with a safer approach
                            // Instead of using regex with unbounded quantifiers, manually remove whitespace
                            let cleanExpr = '';
                            for (let i = 0; i < expr.length; i++) {
                                if (!' \t\n\r\f\v'.includes(expr[i])) {
                                    cleanExpr += expr[i];
                                }
                            }
                            expr = cleanExpr;
                            
                            // Simple operator precedence based calculator
                            // First, handle multiplication and division
                            let tokens = [];
                            let currentNumber = '';
                            
                            // Tokenize the expression
                            for (let i = 0; i < expr.length; i++) {
                                const char = expr[i];
                                
                                if ('0123456789.'.includes(char)) {
                                    currentNumber += char;
                                } else {
                                    if (currentNumber) {
                                        tokens.push({ type: 'number', value: parseFloat(currentNumber) });
                                        currentNumber = '';
                                    }
                                    
                                    if ('+-*/'.includes(char)) {
                                        tokens.push({ type: 'operator', value: char });
                                    }
                                }
                            }
                            
                            // Add the last number if exists
                            if (currentNumber) {
                                tokens.push({ type: 'number', value: parseFloat(currentNumber) });
                            }
                            
                            // First pass: Calculate multiplication and division
                            for (let i = 1; i < tokens.length; i += 2) {
                                if (i + 1 >= tokens.length) break;
                                
                                const operator = tokens[i];
                                
                                if (operator.type === 'operator' && (operator.value === '*' || operator.value === '/')) {
                                    const left = tokens[i - 1];
                                    const right = tokens[i + 1];
                                    
                                    if (left.type === 'number' && right.type === 'number') {
                                        let result = 0;
                                        
                                        if (operator.value === '*') {
                                            result = left.value * right.value;
                                        } else if (operator.value === '/') {
                                            result = right.value !== 0 ? left.value / right.value : 0;
                                        }
                                        
                                        // Replace these 3 tokens with the result
                                        tokens.splice(i - 1, 3, { type: 'number', value: result });
                                        i -= 2; // Adjust index after splice
                                    }
                                }
                            }
                            
                            // Second pass: Calculate addition and subtraction
                            let result = tokens.length > 0 && tokens[0].type === 'number' ? tokens[0].value : 0;
                            
                            for (let i = 1; i < tokens.length; i += 2) {
                                if (i + 1 >= tokens.length) break;
                                
                                const operator = tokens[i];
                                const right = tokens[i + 1];
                                
                                if (operator.type === 'operator' && right.type === 'number') {
                                    if (operator.value === '+') {
                                        result += right.value;
                                    } else if (operator.value === '-') {
                                        result -= right.value;
                                    }
                                }
                            }
                            
                            return parseFloat(result) || 0;
                        } catch (e) {
                            console.error('Error in calculateBasicMath:', e);
                            return 0;
                        }
                    };
                    
                    // Get default result values based on level
                    this.getDefaultResult = function(level) {
                        return {
                            value: 0,
                            hp: 100 + (level * 10),
                            maxhp: 100 + (level * 10),
                            mhp: 100 + (level * 10),
                            mp: 50 + (level * 5),
                            maxmp: 50 + (level * 5),
                            mmp: 50 + (level * 5),
                            sp: 0,
                            maxsp: 0,
                            msp: 0,
                            atk: 10 + (level * 2),
                            str: 10 + (level * 2),
                            def: 10 + (level * 2),
                            mat: 10 + (level * 2),
                            int: 10 + (level * 2),
                            spi: 10 + (level * 2),
                            mdf: 10 + (level * 2),
                            res: 10 + (level * 2),
                            agi: 10 + (level * 2),
                            spd: 10 + (level * 2),
                            luk: 10 + (level * 2),
                            exp: level * 100
                        };
                    };
                };
            }
            
            // Use our simplified safe evaluator
            var safeEvaluator = new Yanfly.Util.SimpleSafeFormulaEvaluator();
            result = safeEvaluator.evaluate(secureCode, {
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
      
      // Validate formula for security before execution
      if (!Yanfly.CBP.validateCode(formula)) {
        console.error('Formula failed security validation in expForLevel');
        return Yanfly.CBP.Game_Actor_expForLevel.call(this, level);
      }
      
      // Use our secure formula evaluation with additional validation
      var value = Math.round(this.classBaseParamFormula(formula, 8, level - 1));
      
      // Make sure the result is a valid number and within reasonable bounds
      if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
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