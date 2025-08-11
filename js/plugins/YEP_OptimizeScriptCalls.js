//=============================================================================
// Yanfly Engine Plugins - Optimize Script Calls
// YEP_OptimizeScriptCalls.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_OptimizeScriptCalls = true;

var Yanfly = Yanfly || {};
Yanfly.OptSC = Yanfly.OptSC || {};
Yanfly.OptSC.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 Optimize script calls in common events to run better.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Script Calls, whether they're for setting variables, conditional branches,
 * or actual script calls themselves, can run into performance issues when a
 * lot of them are ran in succession. This plugin will optimize script call
 * usage found inside common events and make them dedicated functions instead
 * for better performance.
 *
 * This is only done for Common Events, as with Map Events and Troop Events,
 * the event list would be generated on the spot and not something that will
 * continue to be stored in cache the moment the player leaves the map or ends
 * the battle. This also doesn't apply to Move Route script calls to maintain
 * compatibility with Move Route Core.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 */
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

Yanfly.OptSC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.OptSC.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_OptimizeScriptCalls) {
    this.processOptimizeScriptCalls();
    Yanfly._loaded_YEP_OptimizeScriptCalls = true;
  }
  
  return true;
};

DataManager.processOptimizeScriptCalls = function() {
  var commonEvents = $dataCommonEvents;
  var length = commonEvents.length;
  for (var i = 1; i < length; ++i) {
    var commonEvent = commonEvents[i];
    var list = commonEvent.list;
    this.prepareOptimizedScriptCalls(list);
  }
};

// Validate script safety by checking for dangerous patterns
DataManager.validateScriptSafety = function(scriptText) {
  if (!scriptText || typeof scriptText !== 'string') return false;
  
  // List of dangerous patterns to check for
  var dangerousPatterns = [
    // Prevent access to global objects
    /\bwindow\b|\bdocument\b|\bglobalThis\b|\bself\b/,
    
    // Prevent node.js access
    /\brequire\b|\bprocess\b|\bglobal\b|\b__dirname\b|\b__filename\b/,
    
    // Prevent dangerous constructors/prototypes
    /\bFunction\b|\bObject\.constructor\b|\beval\b|\bFunction\.constructor\b/,
    
    // Prevent prototype tampering
    /\bprototype\b|\b__proto__\b/,
    
    // Prevent dangerous methods
    /\bsetTimeout\b|\bsetInterval\b|\bclearTimeout\b|\bclearInterval\b/,
    
    // Prevent file system or network access
    /\bXMLHttpRequest\b|\bfetch\b|\bFileReader\b|\bBlob\b/,
    
    // Prevent specific harmful RPG Maker modifications
    /SceneManager\._scene\s*=|\bGame_Interpreter\.prototype\b/,
    
    // Additional dangerous patterns
    /\bnew\s+\w*Function\b|\[\s*["']constructor["']\s*\]/,
    /\[["']constructor["']\]|\.__defineGetter__|\.__defineSetter__/,
    /\bmozRTCPeerConnection\b|\bwebkitRTCPeerConnection\b|\bRTCPeerConnection\b/
  ];
  
  // Check each pattern against the script text
  for (var i = 0; i < dangerousPatterns.length; i++) {
    if (dangerousPatterns[i].test(scriptText)) {
      return false; // Potentially unsafe script detected
    }
  }
  
  return true; // Script passed safety checks
};

// Pre-parse script to analyze structure and detect patterns
DataManager.preParseScript = function(scriptText) {
  if (!scriptText || typeof scriptText !== 'string') return { type: 'invalid' };
  
  scriptText = scriptText.trim();
  
  // Simple return statement (common in conditional branches)
  if (scriptText.startsWith('return ')) {
    return {
      type: 'return',
      expression: scriptText.substring(7).trim()
    };
  }
  
  // Variable assignment
  var assignmentMatch = scriptText.match(/^(\$\w{1,20}(?:\.\w{1,30}){0,10})\s{0,10}=\s{0,10}([^;]{1,1000});?$/);
  if (assignmentMatch) {
    return {
      type: 'assignment',
      target: assignmentMatch[1],
      value: assignmentMatch[2].trim()
    };
  }
  
  // Method call
  var methodCallMatch = scriptText.match(/^(\$\w{1,20}(?:\.\w{1,30}){0,10})\(([^)]{0,1000})\);?$/);
  if (methodCallMatch) {
    return {
      type: 'methodCall',
      method: methodCallMatch[1],
      args: methodCallMatch[2].split(',').map(function(arg) { return arg.trim(); })
    };
  }
  
  // Multi-line script
  if (scriptText.includes('\n')) {
    return {
      type: 'multiLine',
      lines: scriptText.split('\n').map(function(line) { return line.trim(); })
                      .filter(function(line) { return line && !line.startsWith('//'); })
    };
  }
  
  // Default for complex scripts
  return {
    type: 'complex',
    code: scriptText
  };
};

DataManager.prepareOptimizedScriptCalls = function(list) {
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    // Conditional Branch
    if (ev._cachedFunction) continue;
    if (ev.code === 111 && ev.parameters[0] === 12) {
      try {
        // Validate that parameters[1] exists and is a string before executing
        if (typeof ev.parameters[1] !== 'string') {
          console.error('Invalid script parameter in conditional branch');
          continue;
        }
        // Create function with explicit scope variables to improve security
        ev._cachedFunction = this.createSafeFunction('return ' + ev.parameters[1]);
      } catch (e) {
        console.error('Error creating function for conditional branch:', e);
        // Create a safe fallback function that returns false
        ev._cachedFunction = function() { return false; };
      }
    // Control Variable
    } else if (ev.code === 122 && ev.parameters[3] === 4) {
      try {
        // Validate that parameters[4] exists and is a string before executing
        if (typeof ev.parameters[4] !== 'string') {
          console.error('Invalid script parameter in control variable');
          continue;
        }
        // Create function with explicit scope variables to improve security
        ev._cachedFunction = this.createSafeFunction('return ' + ev.parameters[4]);
      } catch (e) {
        console.error('Error creating function for control variable:', e);
        // Create a safe fallback function that returns 0
        ev._cachedFunction = function() { return 0; };
      }
    // Script Call
    } else if (ev.code === 355) {
      try {
        var script = ev.parameters[0] + '\n';
        var j = i + 1;
        // Safely collect additional script lines with bounds checking
        while (j < length && list[j] && list[j].code === 655) {
          if (typeof list[j].parameters[0] === 'string') {
            script += list[j].parameters[0] + '\n';
          }
          ++j;
        }
        // Create function with explicit scope variables to improve security
        ev._cachedFunction = this.createSafeFunction(script);
      } catch (e) {
        console.error('Error creating function for script call:', e);
        // Create a safe fallback function that does nothing
        ev._cachedFunction = function() { return; };
      }
    }
  }
};

// Helper method to create functions with safe context
DataManager.createSafeFunction = function(scriptText) {
  // First, sanitize and validate the script text
  if (!this.validateScriptSafety(scriptText)) {
    console.error("Potentially unsafe script detected and blocked:", scriptText.substring(0, 100) + "...");
    return function() { return false; };
  }
  
  // Cache the parsed script to avoid repetitive parsing
  var parsedScript = this.preParseScript(scriptText);
  
  // Create a sandbox environment for script execution
  return function() {
    // Create a controlled sandbox with limited access to game objects
    var sandbox = {
      // Game objects that should be available
      $gameTemp: $gameTemp,
      $gameSystem: $gameSystem,
      $gameScreen: $gameScreen,
      $gameTimer: $gameTimer,
      $gameMessage: $gameMessage,
      $gameSwitches: $gameSwitches,
      $gameVariables: $gameVariables,
      $gameMap: $gameMap,
      $gameParty: $gameParty,
      $gameTroop: $gameTroop,
      $gamePlayer: $gamePlayer,
      $gameActors: $gameActors,
      $gameEnemies: $gameEnemies,
      $gameObjects: $gameObjects,
      
      // Safe utility access
      Math: Math,
      Number: Number,
      String: String,
      Boolean: Boolean,
      Date: Date,
      Array: Array,
      JSON: JSON,
      
      // Limited RPG Maker utilities
      Graphics: {
        width: Graphics.width,
        height: Graphics.height,
        boxWidth: Graphics.boxWidth,
        boxHeight: Graphics.boxHeight,
        frameCount: Graphics.frameCount
      },
      AudioManager: {
        playSe: AudioManager.playSe.bind(AudioManager),
        playBgm: AudioManager.playBgm.bind(AudioManager),
        stopBgm: AudioManager.stopBgm.bind(AudioManager),
        fadeOutBgm: AudioManager.fadeOutBgm.bind(AudioManager)
      },
      SceneManager: {
        isCurrentSceneBattle: SceneManager.isCurrentSceneBattle.bind(SceneManager),
        isCurrentSceneMap: SceneManager.isCurrentSceneMap.bind(SceneManager)
      }
    };
    
    // Helper function to securely execute code in the sandbox
    var executeInSandbox = function(sandboxObj, code) {
      // Create parameter and argument lists from sandbox object
      var paramNames = Object.keys(sandboxObj);
      var paramValues = paramNames.map(function(key) { return sandboxObj[key]; });
      
      try {
        // Instead of using Function constructor for dynamic code execution,
        // use a safer approach with pre-defined handlers for common operations
        return safeCodeEvaluation(code, sandboxObj);
      } catch (e) {
        console.error("Error executing script:", e);
        return false;
      }
    };
    
    // Safe evaluation function that handles common script operations without dynamic code execution
    var safeCodeEvaluation = function(code, sandbox) {
      // Trim whitespace and normalize line endings
      code = code.trim().replace(/\r\n/g, '\n');
      
      // For simple return statements (common in conditional branches)
      if (code.startsWith('return ')) {
        var expression = code.substring(7).trim();
        return safeExpressionEvaluator(expression, sandbox);
      }
      
      // For variable assignments - using a safer regex with bounded quantifiers to prevent DoS
      var assignmentMatch = code.match(/^(\$\w+(?:\.\w+){0,10})\s{0,10}=\s{0,10}([^;]{1,1000}?);?$/);
      if (assignmentMatch) {
        var varName = assignmentMatch[1];
        var value = safeExpressionEvaluator(assignmentMatch[2], sandbox);
        
        // Handle variable assignments to game objects
        if (varName.startsWith('$game') && sandbox[varName.split('.')[0]]) {
          var parts = varName.split('.');
          var obj = sandbox[parts[0]];
          
          // Navigate object properties
          for (var i = 1; i < parts.length - 1; i++) {
            if (obj && obj[parts[i]]) {
              obj = obj[parts[i]];
            } else {
              return false;
            }
          }
          
          // Set the final property
          if (obj && parts.length > 1) {
            obj[parts[parts.length - 1]] = value;
            return true;
          }
        }
        return false;
      }
      
      // For method calls on game objects
      var methodCallMatch = code.match(/^(\$\w+(?:\.\w+)*)\(([^)]*)\);?$/);
      if (methodCallMatch) {
        var objectMethod = methodCallMatch[1];
        var args = methodCallMatch[2].split(',').map(function(arg) {
          return safeExpressionEvaluator(arg.trim(), sandbox);
        });
        
        // Parse object and method
        var parts = objectMethod.split('.');
        var objName = parts[0];
        
        if (sandbox[objName]) {
          var obj = sandbox[objName];
          
          // Navigate to the method's parent object
          for (var i = 1; i < parts.length - 1; i++) {
            if (obj && obj[parts[i]]) {
              obj = obj[parts[i]];
            } else {
              return false;
            }
          }
          
          // Call the method if it exists
          var methodName = parts[parts.length - 1];
          if (obj && typeof obj[methodName] === 'function') {
            return obj[methodName].apply(obj, args);
          }
        }
        return false;
      }
      
      // For multi-line scripts, execute line by line
      if (code.includes('\n')) {
        var lines = code.split('\n');
        var result;
        
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i].trim();
          if (line && !line.startsWith('//')) { // Skip comments and empty lines
            result = safeCodeEvaluation(line, sandbox);
          }
        }
        
        return result;
      }
      
      // For unhandled script patterns, log and return false
      console.warn("Unhandled script pattern:", code.substring(0, 100));
      return false;
    };
    
    // Safely evaluate expressions without dynamic code execution
    var safeExpressionEvaluator = function(expression, sandbox) {
      expression = expression.trim();
      
      // Handle numeric literals
      if (/^-?\d{1,15}(\.\d{1,15})?$/.test(expression)) {
        return parseFloat(expression);
      }
      
      // Handle string literals - bounded to prevent DoS
      if ((expression.startsWith('"') && expression.endsWith('"') && expression.length <= 10000) || 
          (expression.startsWith("'") && expression.endsWith("'") && expression.length <= 10000)) {
        return expression.substring(1, expression.length - 1);
      }
      
      // Handle boolean literals
      if (expression === 'true') return true;
      if (expression === 'false') return false;
      if (expression === 'null' || expression === 'undefined') return null;
      
      // Handle variable references from sandbox
      if (expression in sandbox) {
        return sandbox[expression];
      }
      
      // Handle game object properties (like $gameVariables.value(id))
      var gameVarMatch = expression.match(/^\$gameVariables\.value\((\d{1,5})\)$/);
      if (gameVarMatch && sandbox.$gameVariables) {
        var varId = parseInt(gameVarMatch[1], 10);
        return sandbox.$gameVariables.value(varId);
      }
      
      // Handle game switches
      var gameSwitchMatch = expression.match(/^\$gameSwitches\.value\((\d{1,5})\)$/);
      if (gameSwitchMatch && sandbox.$gameSwitches) {
        var switchId = parseInt(gameSwitchMatch[1], 10);
        return sandbox.$gameSwitches.value(switchId);
      }
      
      // Handle actor references
      var actorMatch = expression.match(/^\$gameActors\.actor\((\d{1,5})\)$/);
      if (actorMatch && sandbox.$gameActors) {
        var actorId = parseInt(actorMatch[1], 10);
        return sandbox.$gameActors.actor(actorId);
      }
      
      // Handle property access on game objects
      var propertyMatch = expression.match(/^(\$\w{1,20})\.(\w{1,30})$/);
      if (propertyMatch) {
        var obj = sandbox[propertyMatch[1]];
        var prop = propertyMatch[2];
        if (obj && prop in obj) {
          return obj[prop];
        }
      }
      
      // Handle simple arithmetic operations
      var arithmeticMatch = expression.match(/^(.{1,500}?)\s{0,10}([\+\-\*\/])\s{0,10}(.{1,500})$/);
      if (arithmeticMatch) {
        var left = safeExpressionEvaluator(arithmeticMatch[1], sandbox);
        var operator = arithmeticMatch[2];
        var right = safeExpressionEvaluator(arithmeticMatch[3], sandbox);
        
        if (typeof left === 'number' && typeof right === 'number') {
          switch (operator) {
            case '+': return left + right;
            case '-': return left - right;
            case '*': return left * right;
            case '/': return right === 0 ? 0 : left / right; // Prevent division by zero
          }
        } else if (operator === '+' && (typeof left === 'string' || typeof right === 'string')) {
          // Handle string concatenation
          return String(left) + String(right);
        }
      }
      
      // Handle comparison operations
      var comparisonMatch = expression.match(/^(.{1,500}?)\s{0,10}(==|===|!=|!==|>|<|>=|<=)\s{0,10}(.{1,500})$/);
      if (comparisonMatch) {
        var left = safeExpressionEvaluator(comparisonMatch[1], sandbox);
        var operator = comparisonMatch[2];
        var right = safeExpressionEvaluator(comparisonMatch[3], sandbox);
        
        switch (operator) {
          case '==': 
          case '===': return left === right;
          case '!=': 
          case '!==': return left !== right;
          case '>': return left > right;
          case '<': return left < right;
          case '>=': return left >= right;
          case '<=': return left <= right;
        }
      }
      
      // Handle logical operations
      var logicalMatch = expression.match(/^(.{1,500}?)\s{0,10}(&&|\|\|)\s{0,10}(.{1,500})$/);
      if (logicalMatch) {
        var left = safeExpressionEvaluator(logicalMatch[1], sandbox);
        var operator = logicalMatch[2];
        
        // Short-circuit evaluation
        if (operator === '&&' && !left) return false;
        if (operator === '||' && left) return true;
        
        var right = safeExpressionEvaluator(logicalMatch[3], sandbox);
        return (operator === '&&') ? (left && right) : (left || right);
      }
      
      // Handle negation
      if (expression.startsWith('!')) {
        return !safeExpressionEvaluator(expression.substring(1), sandbox);
      }
      
      // Handle parenthesized expressions
      if (expression.startsWith('(') && expression.endsWith(')')) {
        return safeExpressionEvaluator(expression.substring(1, expression.length - 1), sandbox);
      }
      
      // For unhandled expressions, log and return a safe default
      console.warn("Unhandled expression:", expression);
      return false;
    };
    
    // Execute the script in the sandbox context based on the pre-parsed type
    if (parsedScript) {
      switch (parsedScript.type) {
        case 'return':
          return safeExpressionEvaluator(parsedScript.expression, sandbox);
          
        case 'assignment':
          var value = safeExpressionEvaluator(parsedScript.value, sandbox);
          var target = parsedScript.target;
          
          // Handle variable assignments to game objects
          if (target.startsWith('$game') && sandbox[target.split('.')[0]]) {
            var parts = target.split('.');
            var obj = sandbox[parts[0]];
            
            // Navigate object properties
            for (var i = 1; i < parts.length - 1; i++) {
              if (obj && obj[parts[i]]) {
                obj = obj[parts[i]];
              } else {
                return false;
              }
            }
            
            // Set the final property
            if (obj && parts.length > 1) {
              obj[parts[parts.length - 1]] = value;
              return true;
            }
          }
          return false;
          
        case 'methodCall':
          var method = parsedScript.method;
          var args = parsedScript.args.map(function(arg) {
            return safeExpressionEvaluator(arg, sandbox);
          });
          
          // Parse object and method
          var parts = method.split('.');
          var objName = parts[0];
          
          if (sandbox[objName]) {
            var obj = sandbox[objName];
            
            // Navigate to the method's parent object
            for (var i = 1; i < parts.length - 1; i++) {
              if (obj && obj[parts[i]]) {
                obj = obj[parts[i]];
              } else {
                return false;
              }
            }
            
            // Call the method if it exists
            var methodName = parts[parts.length - 1];
            if (obj && typeof obj[methodName] === 'function') {
              return obj[methodName].apply(obj, args);
            }
          }
          return false;
          
        case 'multiLine':
          var result;
          var lines = parsedScript.lines;
          
          for (var i = 0; i < lines.length; i++) {
            result = safeCodeEvaluation(lines[i], sandbox);
          }
          
          return result;
          
        default:
          // For complex or unrecognized patterns, use the general evaluator
          return executeInSandbox.call(this, sandbox, scriptText);
      }
    } else {
      // Fallback for unparsed scripts
      return executeInSandbox.call(this, sandbox, scriptText);
    }
  };
};

//=============================================================================
// Game_Interpreter
//=============================================================================

// Conditional Branch
Yanfly.OptSC.Game_Interpreter_command111 =
    Game_Interpreter.prototype.command111;
Game_Interpreter.prototype.command111 = function() {
  if (this.currentCommand()._cachedFunction) {
    var result = false;
    try {
      // Execute the cached function with proper error handling
      result = !!this.currentCommand()._cachedFunction.call(this);
    } catch (e) {
      console.error('Error executing conditional branch:', e);
      // Default to false on error for safety
      result = false;
    }
    this._branch[this._indent] = result;
    if (this._branch[this._indent] === false) this.skipBranch();
    return true;
  } else {
    return Yanfly.OptSC.Game_Interpreter_command111.call(this);
  }
};

// Control Variable
Yanfly.OptSC.Game_Interpreter_command122 =
    Game_Interpreter.prototype.command122;
Game_Interpreter.prototype.command122 = function() {
  if (this.currentCommand()._cachedFunction) {
    try {
      // Execute the cached function with proper error handling
      var value = this.currentCommand()._cachedFunction.call(this);
      
      // Validate that value is a valid type for game variables
      if (typeof value !== 'number' && typeof value !== 'string' && typeof value !== 'boolean') {
        value = 0; // Default to 0 for invalid types
      }
      
      for (var i = this._params[0]; i <= this._params[1]; i++) {
        this.operateVariable(i, this._params[2], value);
      }
    } catch (e) {
      console.error('Error executing control variable:', e);
      // On error, set variables to 0
      for (var i = this._params[0]; i <= this._params[1]; i++) {
        this.operateVariable(i, 0, 0); // Set to 0 on error
      }
    }
    return true;
  } else {
    return Yanfly.OptSC.Game_Interpreter_command122.call(this);
  }
};

// Script Call
Yanfly.OptSC.Game_Interpreter_command355 = 
    Game_Interpreter.prototype.command355;
Game_Interpreter.prototype.command355 = function() {
  if (this.currentCommand()._cachedFunction) {
    try {
      // Execute the cached function with proper error handling
      this.currentCommand()._cachedFunction.call(this);
    } catch (e) {
      console.error('Error executing script call:', e);
      // Continue execution even if script fails
    }
    return true;
  } else {
    return Yanfly.OptSC.Game_Interpreter_command355.call(this);
  }
};

//=============================================================================
// End of File
//=============================================================================