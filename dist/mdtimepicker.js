/*!DO NOT REMOVE!
 * MDTimePicker v2.0 plugin
 * https://github.com/dmuy/MDTimePicker
 *
 * Author: Dionlee Uy
 * Email: dionleeuy@gmail.com
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.mdtimepicker = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$d =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$e = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$d = fails$e;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$d(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$1(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var createPropertyDescriptor$4 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString$1 = {}.toString;

  var classofRaw$1 = function (it) {
    return toString$1.call(it).slice(8, -1);
  };

  var fails$c = fails$e;
  var classof$5 = classofRaw$1;

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$c(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$5(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$5 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$1 = indexedObject;
  var requireObjectCoercible$4 = requireObjectCoercible$5;

  var toIndexedObject$4 = function (it) {
    return IndexedObject$1(requireObjectCoercible$4(it));
  };

  var isObject$7 = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var isObject$6 = isObject$7;

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive$3 = function (input, PREFERRED_STRING) {
    if (!isObject$6(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$6(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject$6(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$6(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var requireObjectCoercible$3 = requireObjectCoercible$5;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$5 = function (argument) {
    return Object(requireObjectCoercible$3(argument));
  };

  var toObject$4 = toObject$5;

  var hasOwnProperty = {}.hasOwnProperty;

  var has$9 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty.call(toObject$4(it), key);
  };

  var global$c = global$d;
  var isObject$5 = isObject$7;

  var document$1 = global$c.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject$5(document$1) && isObject$5(document$1.createElement);

  var documentCreateElement$1 = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$4 = descriptors;
  var fails$b = fails$e;
  var createElement = documentCreateElement$1;

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$4 && !fails$b(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var DESCRIPTORS$3 = descriptors;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$3 = createPropertyDescriptor$4;
  var toIndexedObject$3 = toIndexedObject$4;
  var toPrimitive$2 = toPrimitive$3;
  var has$8 = has$9;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$3 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$3(O);
    P = toPrimitive$2(P, true);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has$8(O, P)) return createPropertyDescriptor$3(!propertyIsEnumerableModule.f.call(O, P), O[P]);
  };

  var objectDefineProperty = {};

  var isObject$4 = isObject$7;

  var anObject$a = function (it) {
    if (!isObject$4(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var DESCRIPTORS$2 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var anObject$9 = anObject$a;
  var toPrimitive$1 = toPrimitive$3;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$2 ? $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$9(O);
    P = toPrimitive$1(P, true);
    anObject$9(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$1 = descriptors;
  var definePropertyModule$3 = objectDefineProperty;
  var createPropertyDescriptor$2 = createPropertyDescriptor$4;

  var createNonEnumerableProperty$8 = DESCRIPTORS$1 ? function (object, key, value) {
    return definePropertyModule$3.f(object, key, createPropertyDescriptor$2(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var redefine$4 = {exports: {}};

  var global$b = global$d;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$8;

  var setGlobal$3 = function (key, value) {
    try {
      createNonEnumerableProperty$7(global$b, key, value);
    } catch (error) {
      global$b[key] = value;
    } return value;
  };

  var global$a = global$d;
  var setGlobal$2 = setGlobal$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$a[SHARED] || setGlobal$2(SHARED, {});

  var sharedStore = store$3;

  var store$2 = sharedStore;

  var functionToString = Function.toString;

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof store$2.inspectSource != 'function') {
    store$2.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource$2 = store$2.inspectSource;

  var global$9 = global$d;
  var inspectSource$1 = inspectSource$2;

  var WeakMap$1 = global$9.WeakMap;

  var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$1(WeakMap$1));

  var shared$4 = {exports: {}};

  var store$1 = sharedStore;

  (shared$4.exports = function (key, value) {
    return store$1[key] || (store$1[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.15.2',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });

  var id = 0;
  var postfix = Math.random();

  var uid$2 = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var shared$3 = shared$4.exports;
  var uid$1 = uid$2;

  var keys = shared$3('keys');

  var sharedKey$3 = function (key) {
    return keys[key] || (keys[key] = uid$1(key));
  };

  var hiddenKeys$4 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$8 = global$d;
  var isObject$3 = isObject$7;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$8;
  var objectHas = has$9;
  var shared$2 = sharedStore;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$3 = hiddenKeys$4;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap = global$8.WeakMap;
  var set, get, has$7;

  var enforce = function (it) {
    return has$7(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$2.state) {
    var store = shared$2.state || (shared$2.state = new WeakMap());
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set = function (it, metadata) {
      if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset.call(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store, it) || {};
    };
    has$7 = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$3[STATE] = true;
    set = function (it, metadata) {
      if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$6(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return objectHas(it, STATE) ? it[STATE] : {};
    };
    has$7 = function (it) {
      return objectHas(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$7,
    enforce: enforce,
    getterFor: getterFor
  };

  var global$7 = global$d;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$8;
  var has$6 = has$9;
  var setGlobal$1 = setGlobal$3;
  var inspectSource = inspectSource$2;
  var InternalStateModule$1 = internalState;

  var getInternalState$2 = InternalStateModule$1.get;
  var enforceInternalState = InternalStateModule$1.enforce;
  var TEMPLATE = String(String).split('String');

  (redefine$4.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has$6(value, 'name')) {
        createNonEnumerableProperty$5(value, 'name', key);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }
    }
    if (O === global$7) {
      if (simple) O[key] = value;
      else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty$5(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState$2(this).source || inspectSource(this);
  });

  var global$6 = global$d;

  var path$1 = global$6;

  var path = path$1;
  var global$5 = global$d;

  var aFunction$2 = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn$3 = function (namespace, method) {
    return arguments.length < 2 ? aFunction$2(path[namespace]) || aFunction$2(global$5[namespace])
      : path[namespace] && path[namespace][method] || global$5[namespace] && global$5[namespace][method];
  };

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$1 = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger$4 = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil)(argument);
  };

  var toInteger$3 = toInteger$4;

  var min$2 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$6 = function (argument) {
    return argument > 0 ? min$2(toInteger$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toInteger$2 = toInteger$4;

  var max$2 = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$2 = function (index, length) {
    var integer = toInteger$2(index);
    return integer < 0 ? max$2(integer + length, 0) : min$1(integer, length);
  };

  var toIndexedObject$2 = toIndexedObject$4;
  var toLength$5 = toLength$6;
  var toAbsoluteIndex$1 = toAbsoluteIndex$2;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$2 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$2($this);
      var length = toLength$5(O.length);
      var index = toAbsoluteIndex$1(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$2(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$2(false)
  };

  var has$5 = has$9;
  var toIndexedObject$1 = toIndexedObject$4;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$2 = hiddenKeys$4;

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$1(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has$5(hiddenKeys$2, key) && has$5(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has$5(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$3 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;

  var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$1);
  };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$2 = getBuiltIn$3;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$8 = anObject$a;

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$8(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var has$4 = has$9;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$2 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$2.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has$4(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var fails$a = fails$e;

  var replacement = /#|\.prototype\./;

  var isForced$1 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails$a(detection)
      : !!detection;
  };

  var normalize = isForced$1.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$1.data = {};
  var NATIVE = isForced$1.NATIVE = 'N';
  var POLYFILL = isForced$1.POLYFILL = 'P';

  var isForced_1 = isForced$1;

  var global$4 = global$d;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$8;
  var redefine$3 = redefine$4.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced = isForced_1;

  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$4;
    } else if (STATIC) {
      target = global$4[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$4[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$4(sourceProperty, 'sham', true);
      }
      // extend global
      redefine$3(target, key, sourceProperty, options);
    }
  };

  var anObject$7 = anObject$a;

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags$1 = function () {
    var that = anObject$7(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var regexpStickyHelpers = {};

  var fails$9 = fails$e;

  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
  var RE = function (s, f) {
    return RegExp(s, f);
  };

  regexpStickyHelpers.UNSUPPORTED_Y = fails$9(function () {
    var re = RE('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  regexpStickyHelpers.BROKEN_CARET = fails$9(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = RE('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$1 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS = descriptors;
  var definePropertyModule$1 = objectDefineProperty;
  var anObject$6 = anObject$a;
  var objectKeys = objectKeys$1;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$6(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$1.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var getBuiltIn$1 = getBuiltIn$3;

  var html$1 = getBuiltIn$1('document', 'documentElement');

  var anObject$5 = anObject$a;
  var defineProperties = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys = hiddenKeys$4;
  var html = html$1;
  var documentCreateElement = documentCreateElement$1;
  var sharedKey$1 = sharedKey$3;

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$1('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      /* global ActiveXObject -- old IE */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$5(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : defineProperties(result, Properties);
  };

  var fails$8 = fails$e;

  var regexpUnsupportedDotAll = fails$8(function () {
    // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
    var re = RegExp('.', (typeof '').charAt(0));
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });

  var fails$7 = fails$e;

  var regexpUnsupportedNcg = fails$7(function () {
    // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
    var re = RegExp('(?<a>b)', (typeof '').charAt(5));
    return re.exec('b').groups.a !== 'b' ||
      'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */
  var regexpFlags = regexpFlags$1;
  var stickyHelpers = regexpStickyHelpers;
  var shared$1 = shared$4.exports;
  var create$1 = objectCreate;
  var getInternalState$1 = internalState.get;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;

  var nativeExec = RegExp.prototype.exec;
  var nativeReplace = shared$1('native-string-replace', String.prototype.replace);

  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

  if (PATCH) {
    // eslint-disable-next-line max-statements -- TODO
    patchedExec = function exec(str) {
      var re = this;
      var state = getInternalState$1(re);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = patchedExec.call(raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y && re.sticky;
      var flags = regexpFlags.call(re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = flags.replace('y', '');
        if (flags.indexOf('g') === -1) {
          flags += 'g';
        }

        strCopy = String(str).slice(re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = nativeExec.call(sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = match.input.slice(charsAdded);
          match[0] = match[0].slice(charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = create$1(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }

      return match;
    };
  }

  var regexpExec$2 = patchedExec;

  var $$3 = _export;
  var exec = regexpExec$2;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $$3({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
    exec: exec
  });

  var getBuiltIn = getBuiltIn$3;

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var global$3 = global$d;
  var userAgent = engineUserAgent;

  var process = global$3.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] < 4 ? 1 : match[0] + match[1];
  } else if (userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  /* eslint-disable es/no-symbol -- required for testing */

  var V8_VERSION$1 = engineV8Version;
  var fails$6 = fails$e;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$6(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$1 = nativeSymbol;

  var useSymbolAsUid = NATIVE_SYMBOL$1
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var global$2 = global$d;
  var shared = shared$4.exports;
  var has$3 = has$9;
  var uid = uid$2;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global$2.Symbol;
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol$d = function (name) {
    if (!has$3(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
      if (NATIVE_SYMBOL && has$3(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
      }
    } return WellKnownSymbolsStore[name];
  };

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var redefine$2 = redefine$4.exports;
  var regexpExec$1 = regexpExec$2;
  var fails$5 = fails$e;
  var wellKnownSymbol$c = wellKnownSymbol$d;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$8;

  var SPECIES$3 = wellKnownSymbol$c('species');
  var RegExpPrototype = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$c(KEY);

    var DELEGATES_TO_SYMBOL = !fails$5(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$5(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$3] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () { execCalled = true; return null; };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      FORCED
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var $exec = regexp.exec;
        if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      });

      redefine$2(String.prototype, KEY, methods[0]);
      redefine$2(RegExpPrototype, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty$3(RegExpPrototype[SYMBOL], 'sham', true);
  };

  var toInteger$1 = toInteger$4;
  var requireObjectCoercible$2 = requireObjectCoercible$5;

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$1 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible$2($this));
      var position = toInteger$1(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING ? S.charAt(position) : first
          : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$1(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$1(true)
  };

  var charAt$1 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex$2 = function (S, index, unicode) {
    return index + (unicode ? charAt$1(S, index).length : 1);
  };

  var classof$4 = classofRaw$1;
  var regexpExec = regexpExec$2;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (typeof exec === 'function') {
      var result = exec.call(R, S);
      if (typeof result !== 'object') {
        throw TypeError('RegExp exec method returned something other than an Object or null');
      }
      return result;
    }

    if (classof$4(R) !== 'RegExp') {
      throw TypeError('RegExp#exec called on incompatible receiver');
    }

    return regexpExec.call(R, S);
  };

  var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
  var anObject$4 = anObject$a;
  var toLength$4 = toLength$6;
  var requireObjectCoercible$1 = requireObjectCoercible$5;
  var advanceStringIndex$1 = advanceStringIndex$2;
  var regExpExec$1 = regexpExecAbstract;

  // @@match logic
  fixRegExpWellKnownSymbolLogic$1('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible$1(this);
        var matcher = regexp == undefined ? undefined : regexp[MATCH];
        return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (string) {
        var res = maybeCallNative(nativeMatch, this, string);
        if (res.done) return res.value;

        var rx = anObject$4(this);
        var S = String(string);

        if (!rx.global) return regExpExec$1(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regExpExec$1(rx, S)) !== null) {
          var matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$4(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  var toObject$3 = toObject$5;

  var floor = Math.floor;
  var replace = ''.replace;
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject$3(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var fails$4 = fails$e;
  var anObject$3 = anObject$a;
  var toLength$3 = toLength$6;
  var toInteger = toInteger$4;
  var requireObjectCoercible = requireObjectCoercible$5;
  var advanceStringIndex = advanceStringIndex$2;
  var getSubstitution = getSubstitution$1;
  var regExpExec = regexpExecAbstract;
  var wellKnownSymbol$b = wellKnownSymbol$d;

  var REPLACE = wellKnownSymbol$b('replace');
  var max$1 = Math.max;
  var min = Math.min;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  })();

  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$4(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    return ''.replace(re, '$<a>') !== '7';
  });

  // @@replace logic
  fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
        return replacer !== undefined
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(String(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        if (
          typeof replaceValue === 'string' &&
          replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 &&
          replaceValue.indexOf('$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, this, string, replaceValue);
          if (res.done) return res.value;
        }

        var rx = anObject$3(this);
        var S = String(string);

        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec(rx, S);
          if (result === null) break;

          results.push(result);
          if (!global) break;

          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength$3(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = String(result[0]);
          var position = max$1(min(toInteger(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  var aFunction = aFunction$1;

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var classof$3 = classofRaw$1;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$2 = Array.isArray || function isArray(arg) {
    return classof$3(arg) == 'Array';
  };

  var isObject$2 = isObject$7;
  var isArray$1 = isArray$2;
  var wellKnownSymbol$a = wellKnownSymbol$d;

  var SPECIES$2 = wellKnownSymbol$a('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$1 = function (originalArray, length) {
    var C;
    if (isArray$1(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray$1(C.prototype))) C = undefined;
      else if (isObject$2(C)) {
        C = C[SPECIES$2];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var bind$1 = functionBindContext;
  var IndexedObject = indexedObject;
  var toObject$2 = toObject$5;
  var toLength$2 = toLength$6;
  var arraySpeciesCreate = arraySpeciesCreate$1;

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
  var createMethod = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_OUT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$2($this);
      var self = IndexedObject(O);
      var boundFunction = bind$1(callbackfn, that, 3);
      var length = toLength$2(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push.call(target, value); // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push.call(target, value); // filterOut
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod(6),
    // `Array.prototype.filterOut` method
    // https://github.com/tc39/proposal-array-filtering
    filterOut: createMethod(7)
  };

  var fails$3 = fails$e;

  var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$3(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  var $forEach = arrayIteration.forEach;
  var arrayMethodIsStrict = arrayMethodIsStrict$1;

  var STRICT_METHOD = arrayMethodIsStrict('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  var global$1 = global$d;
  var DOMIterables = domIterables;
  var forEach = arrayForEach;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$8;

  for (var COLLECTION_NAME in DOMIterables) {
    var Collection = global$1[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty$2(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  }

  var anObject$2 = anObject$a;

  var iteratorClose$1 = function (iterator) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) {
      return anObject$2(returnMethod.call(iterator)).value;
    }
  };

  var anObject$1 = anObject$a;
  var iteratorClose = iteratorClose$1;

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$1(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
  };

  var iterators = {};

  var wellKnownSymbol$9 = wellKnownSymbol$d;
  var Iterators$3 = iterators;

  var ITERATOR$4 = wellKnownSymbol$9('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$1 = function (it) {
    return it !== undefined && (Iterators$3.Array === it || ArrayPrototype[ITERATOR$4] === it);
  };

  var toPrimitive = toPrimitive$3;
  var definePropertyModule = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$4;

  var createProperty$2 = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor$1(0, value));
    else object[propertyKey] = value;
  };

  var wellKnownSymbol$8 = wellKnownSymbol$d;

  var TO_STRING_TAG$2 = wellKnownSymbol$8('toStringTag');
  var test = {};

  test[TO_STRING_TAG$2] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$7 = wellKnownSymbol$d;

  var TO_STRING_TAG$1 = wellKnownSymbol$7('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$2 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  var classof$1 = classof$2;
  var Iterators$2 = iterators;
  var wellKnownSymbol$6 = wellKnownSymbol$d;

  var ITERATOR$3 = wellKnownSymbol$6('iterator');

  var getIteratorMethod$1 = function (it) {
    if (it != undefined) return it[ITERATOR$3]
      || it['@@iterator']
      || Iterators$2[classof$1(it)];
  };

  var bind = functionBindContext;
  var toObject$1 = toObject$5;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
  var isArrayIteratorMethod = isArrayIteratorMethod$1;
  var toLength$1 = toLength$6;
  var createProperty$1 = createProperty$2;
  var getIteratorMethod = getIteratorMethod$1;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject$1(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = iteratorMethod.call(O);
      next = iterator.next;
      result = new C();
      for (;!(step = next.call(iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty$1(result, index, value);
      }
    } else {
      length = toLength$1(O.length);
      result = new C(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty$1(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var wellKnownSymbol$5 = wellKnownSymbol$d;

  var ITERATOR$2 = wellKnownSymbol$5('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$2] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$2] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var $$2 = _export;
  var from = arrayFrom;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  $$2({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: from
  });

  var fails$2 = fails$e;

  var correctPrototypeGetter = !fails$2(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var has$2 = has$9;
  var toObject = toObject$5;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey('IE_PROTO');
  var ObjectPrototype = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
    O = toObject(O);
    if (has$2(O, IE_PROTO)) return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype : null;
  };

  var fails$1 = fails$e;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$8;
  var has$1 = has$9;
  var wellKnownSymbol$4 = wellKnownSymbol$d;

  var ITERATOR$1 = wellKnownSymbol$4('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  var returnThis$2 = function () { return this; };

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$1(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$1].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!has$1(IteratorPrototype$2, ITERATOR$1)) {
    createNonEnumerableProperty$1(IteratorPrototype$2, ITERATOR$1, returnThis$2);
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty = objectDefineProperty.f;
  var has = has$9;
  var wellKnownSymbol$3 = wellKnownSymbol$d;

  var TO_STRING_TAG = wellKnownSymbol$3('toStringTag');

  var setToStringTag$2 = function (it, TAG, STATIC) {
    if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
      defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create = objectCreate;
  var createPropertyDescriptor = createPropertyDescriptor$4;
  var setToStringTag$1 = setToStringTag$2;
  var Iterators$1 = iterators;

  var returnThis$1 = function () { return this; };

  var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
    setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$1[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var isObject$1 = isObject$7;

  var aPossiblePrototype$1 = function (it) {
    if (!isObject$1(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  /* eslint-disable no-proto -- safe */

  var anObject = anObject$a;
  var aPossiblePrototype = aPossiblePrototype$1;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var $$1 = _export;
  var createIteratorConstructor = createIteratorConstructor$1;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf = objectSetPrototypeOf;
  var setToStringTag = setToStringTag$2;
  var createNonEnumerableProperty = createNonEnumerableProperty$8;
  var redefine$1 = redefine$4.exports;
  var wellKnownSymbol$2 = wellKnownSymbol$d;
  var Iterators = iterators;
  var IteratorsCore = iteratorsCore;

  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR = wellKnownSymbol$2('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var defineIterator$1 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf) {
            setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
            createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }

    // define iterator
    if (IterablePrototype[ITERATOR] !== defaultIterator) {
      createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
    }
    Iterators[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine$1(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$1({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };

  var charAt = stringMultibyte.charAt;
  var InternalStateModule = internalState;
  var defineIterator = defineIterator$1;

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  var fails = fails$e;
  var wellKnownSymbol$1 = wellKnownSymbol$d;
  var V8_VERSION = engineV8Version;

  var SPECIES$1 = wellKnownSymbol$1('species');

  var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$1] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $ = _export;
  var isObject = isObject$7;
  var isArray = isArray$2;
  var toAbsoluteIndex = toAbsoluteIndex$2;
  var toLength = toLength$6;
  var toIndexedObject = toIndexedObject$4;
  var createProperty = createProperty$2;
  var wellKnownSymbol = wellKnownSymbol$d;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

  var SPECIES = wellKnownSymbol('species');
  var nativeSlice = [].slice;
  var max = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = toLength(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var MDTP_DATA = '_mdtimepicker';
  /**
   * Default time picker input query selector class
   */

  var DEFAULT_CLASS = '.mdtimepicker-input';
  /**
   * Starting degree value for hour hand
   */

  var HOUR_START_DEG = 120;
  /**
   * Hour hand degree increment
   */

  var HOUR_DEG_INCR = 30;
  /**
   * Starting degree value for minute hand
   */

  var MIN_START_DEG = 90;
  /**
   * Minute hand degree increment
   */

  var MIN_DEG_INCR = 6;
  /**
   * Degree limit
   */

  var END_DEG = 360;
  /**
   * Keydown excluded key codes
   */

  var EX_KEYS = [9, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123];
  /**
   * Default time picker configurations
   */

  var DEFAULTS = {
    // format of the time value (data-time attribute)
    timeFormat: 'hh:mm:ss.000',
    // format of the input value
    format: 'h:mm tt',
    // theme of the timepicker
    theme: 'blue',
    // determines if display value has zero padding for hour value less than 10 (i.e. 05:30 PM); 24-hour format has padding by default
    hourPadding: false,
    // determines if clear button is visible
    clearBtn: false,
    // determines if the clock will use 24-hour format in the UI; format config will be forced to `hh:mm` if not specified
    is24hour: false,
    // callback functions
    events: {
      ready: null,
      timeChanged: null,
      shown: null,
      hidden: null
    }
  };

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof = classof$2;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine = redefine$4.exports;
  var toString = objectToString;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    redefine(Object.prototype, 'toString', toString, { unsafe: true });
  }

  /**
   * Helper functions
   */
  var hf = {
    /**
     * Appends element(s) to parent
     * @param {Element|Element[]} elem Element(s) to append to parent
     * @param {Element} to Parent element
     */
    appendTo: function appendTo(elem, to, idx) {
      if (Array.isArray(elem)) {
        elem.forEach(function (el) {
          if (idx === 0) to.insertBefore(el, to.childNodes[idx] || null);else to.appendChild(el);
        });
      } else {
        if (idx === 0) to.insertBefore(elem, to.childNodes[idx] || null);else to.appendChild(elem);
      }
    },

    /**
     * Adds event listener to element(s)
     * @param {Element|Element[]} elem Element(s) to add event
     * @param {string} event Event name
     * @param {Function} handler Event handler
     */
    addEvent: function addEvent(elem, event, handler) {
      function listenEvent(el, evt, fn) {
        el.addEventListener(evt, fn, false);
      }

      if (Array.isArray(elem)) {
        elem.forEach(function (e) {
          return listenEvent(e, event, handler);
        });
      } else listenEvent(elem, event, handler);
    },

    /**
     * Removes event listener to element(s)
     * @param {Element|Element[]} elem Element(s) to remove event
     * @param {string} event Event name
     * @param {Function} handler Event handler
     */
    removeEvent: function removeEvent(elem, event, handler) {
      function delEvent(el, evt, fn) {
        el.removeEventListener(evt, fn, false);
      }

      if (Array.isArray(elem)) {
        elem.forEach(function (e) {
          return delEvent(e, event, handler);
        });
      } else delEvent(elem, event, handler);
    },

    /**
     * Removes child nodes
     * @param {Element} elem Html element to empty
     */
    empty: function empty(elem) {
      while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
      }
    },

    /**
     * Creates an HTML element; `document.createElement` helper function
     * @see {@link http://jsfiddle.net/andr3ww/pvuzgfg6/13/}
     * @param {string} tag HTML tag name (i.e. `div`, `span`, `a`)
     * @param {Object} attributes Attribute object
     * @param {string|Element} content Element content: text or HTML element(s)
     * @param {Boolean} isHtml Determines if `content` specified should added as an html element
     */
    createElem: function createElem(tag, attributes, content, isHtml) {
      var el = document.createElement(tag);
      if (typeof content !== 'undefined') el[isHtml || false ? 'innerHTML' : 'innerText'] = content;
      if (typeof attributes !== 'undefined') hf.setAttributes(el, attributes);
      return el;
    },

    /**
     * Sets the attribute(s) of the element
     * @param {Element} el Html element
     * @param {Object} attrs Attribute object
     */
    setAttributes: function setAttributes(el, attrs) {
      for (var attr in attrs) {
        el.setAttribute(attr, attrs[attr]);
      }
    },

    /**
    * Vanilla JavaScript version of jQuery.extend()
    * @see {@link https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/}
    */
    extend: function extend() {
      // Variables
      var extended = {};
      var deep = false;
      var i = 0;
      var length = arguments.length; // Check if a deep merge

      if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
        deep = arguments[0];
        i++;
      } // Merge the object into the extended object


      var merge = function merge(obj) {
        for (var prop in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            // If deep merge and property is an object, merge properties
            if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
              extended[prop] = hf.extend(true, extended[prop], obj[prop]);
            } else {
              extended[prop] = obj[prop];
            }
          }
        }
      }; // Loop through each object and conduct a merge


      for (; i < length; i++) {
        var obj = arguments[i];
        merge(obj);
      }

      return extended;
    },

    /**
     * Triggers the `change`, `onchange`, `datechanged` event on the specified input element
     * @param {HTMLInputElement} el HTML input element
     * @param {Object} data Event data
     */
    triggerChange: function triggerChange(el, data) {
      var change = document.createEvent('Event');
      var onChange = document.createEvent('Event');
      change.initEvent('change', false, false);
      onChange.initEvent('onchange', false, false);
      el.dispatchEvent(change);
      el.dispatchEvent(onChange);

      function CustomEvent(data) {
        var changeEvt = document.createEvent('CustomEvent');
        changeEvt.initCustomEvent('datechanged', false, false, null);
        changeEvt.data = data;
        return changeEvt;
      }

      el.dispatchEvent(new CustomEvent(data));
    }
  };

  /**
   * Time class
   */

  var Time = /*#__PURE__*/function () {
    /**
     * Creates a time object
     * @param {number} hour Hour value (0 - 23)
    	 * @param {number} minute Minute value (0 - 59)
     */
    function Time(hour, minute) {
      _classCallCheck(this, Time);

      this.hour = hour;
      this.minute = minute;
    }

    _createClass(Time, [{
      key: "setHour",
      value: function setHour(value) {
        this.hour = value;
      }
    }, {
      key: "getHour",
      value: function getHour(is12Hour) {
        return is12Hour ? [0, 12].indexOf(this.hour) >= 0 ? 12 : this.hour % 12 : this.hour;
      }
    }, {
      key: "invert",
      value: function invert() {
        if (this.getPeriod() === 'AM') this.setHour(this.getHour() + 12);else this.setHour(this.getHour() - 12);
      }
    }, {
      key: "setMinutes",
      value: function setMinutes(value) {
        this.minute = value;
      }
    }, {
      key: "getMinutes",
      value: function getMinutes() {
        return this.minute;
      }
    }, {
      key: "getPeriod",
      value: function getPeriod() {
        return this.hour < 12 ? 'AM' : 'PM';
      }
    }, {
      key: "format",
      value: function format(_format, hourPadding) {
        var that = this,
            is24Hour = (_format.match(/h/g) || []).length > 1;
        return _format.replace(/(hh|h|mm|ss|tt|t)/g, function (e) {
          switch (e.toLowerCase()) {
            case 'h':
              var hour = that.getHour(true);
              return hourPadding && hour < 10 ? '0' + hour : hour;

            case 'hh':
              return that.hour < 10 ? '0' + that.hour : that.hour;

            case 'mm':
              return that.minute < 10 ? '0' + that.minute : that.minute;

            case 'ss':
              return '00';

            case 't':
              return is24Hour ? '' : that.getPeriod().toLowerCase();

            case 'tt':
              return is24Hour ? '' : that.getPeriod();
          }
        });
      }
    }]);

    return Time;
  }();
  /**
   * Time picker class
   */


  var MDTimePicker = /*#__PURE__*/function () {
    /**
     * Default configurations
     */

    /**
     * Creates a time picker object
     * @param {HTMLInputElement} el Input element
     * @param {Object} config Time picker configurations
     */
    function MDTimePicker(el, config) {
      _classCallCheck(this, MDTimePicker);

      var _ = this;

      this.visible = false;
      this.activeView = 'hours';
      this.hTimeout = null;
      this.mTimeout = null;
      this.input = el;
      this.input.readOnly = true;
      this.config = config;
      this.time = new Time(0, 0);
      this.selected = new Time(0, 0);
      this.timepicker = {
        overlay: hf.createElem('div', {
          class: 'mdtimepicker hidden'
        }),
        wrapper: hf.createElem('div', {
          class: 'mdtp__wrapper',
          tabindex: 0
        }),
        timeHolder: {
          wrapper: hf.createElem('section', {
            class: 'mdtp__time_holder'
          }),
          hour: hf.createElem('span', {
            class: 'mdtp__time_h'
          }, '12'),
          dots: hf.createElem('span', {
            class: 'mdtp__timedots'
          }, ':'),
          minute: hf.createElem('span', {
            class: 'mdtp__time_m'
          }, '00'),
          am_pm: hf.createElem('span', {
            class: 'mdtp__ampm'
          }, 'AM')
        },
        clockHolder: {
          wrapper: hf.createElem('section', {
            class: 'mdtp__clock_holder'
          }),
          am: hf.createElem('span', {
            class: 'mdtp__am'
          }, 'AM'),
          pm: hf.createElem('span', {
            class: 'mdtp__pm'
          }, 'PM'),
          clock: {
            wrapper: hf.createElem('div', {
              class: 'mdtp__clock'
            }),
            dot: hf.createElem('span', {
              class: 'mdtp__clock_dot'
            }),
            hours: hf.createElem('div', {
              class: 'mdtp__hour_holder'
            }),
            minutes: hf.createElem('div', {
              class: 'mdtp__minute_holder'
            })
          },
          buttonsHolder: {
            wrapper: hf.createElem('div', {
              class: 'mdtp__buttons'
            }),
            btnClear: hf.createElem('span', {
              class: 'mdtp__button clear-btn'
            }, 'Clear'),
            btnOk: hf.createElem('span', {
              class: 'mdtp__button ok'
            }, 'Ok'),
            btnCancel: hf.createElem('span', {
              class: 'mdtp__button cancel'
            }, 'Cancel')
          }
        }
      };
      this.setMinTime(this.input.dataset.mintime || this.config.minTime);
      this.setMaxTime(this.input.dataset.maxtime || this.config.maxTime);
      var picker = _.timepicker;
      hf.appendTo(_._setup(), document.body);
      hf.addEvent(picker.overlay, 'click', function () {
        _.hide();
      });
      hf.addEvent(picker.wrapper, 'click', function (e) {
        return e.stopPropagation();
      });
      hf.addEvent(picker.wrapper, 'keydown', function (e) {
        if (e.keyCode !== 27) return;

        _.hide();
      });

      if (!config.is24hour) {
        hf.addEvent(picker.timeHolder.am_pm, 'click', function () {
          _.setPeriod(_.selected.getPeriod() == 'AM' ? 'pm' : 'am');
        });
      }

      hf.addEvent(picker.clockHolder.am, 'click', function () {
        if (_.selected.getPeriod() !== 'AM') _.setPeriod('am');
      });
      hf.addEvent(picker.clockHolder.pm, 'click', function () {
        if (_.selected.getPeriod() !== 'PM') _.setPeriod('pm');
      });
      hf.addEvent(picker.timeHolder.hour, 'click', function () {
        if (_.activeView !== 'hours') _._switchView('hours');
      });
      hf.addEvent(picker.timeHolder.minute, 'click', function () {
        if (_.activeView !== 'minutes') _._switchView('minutes');
      });
      hf.addEvent(picker.clockHolder.buttonsHolder.btnOk, 'click', function () {
        var selected = _.selected;
        if (_.isDisabled(selected.getHour(), selected.getMinutes(), false)) return;

        _.setValue(selected);

        var formatted = _.getFormattedTime();

        _._triggerChange({
          time: formatted.time,
          value: formatted.value
        });

        _.hide();
      });
      hf.addEvent(picker.clockHolder.buttonsHolder.btnCancel, 'click', function () {
        _.hide();
      });

      if (_.config.clearBtn) {
        hf.addEvent(picker.clockHolder.buttonsHolder.btnClear, 'click', function () {
          _.input.value = '';
          hf.setAttributes(_.input, {
            'value': '',
            'data-time': null
          });

          _._triggerChange({
            time: null,
            value: ''
          });

          _.hide();
        });
      }
      /* input event handlers */


      function _inputClick() {
        _.show();
      }

      function _inputKeydown(e) {
        if (e.keyCode === 13) {
          _.show();
        }

        return !(EX_KEYS.indexOf(e.which) < 0);
      }
      /**
       * Unbinds input `click` and `keydown` event handlers
       */


      this._unbindInput = function () {
        _.input.readOnly = false;

        _.input.removeEventListener('click', _inputClick);

        _.input.removeEventListener('keydown', _inputKeydown);
      };

      hf.addEvent(_.input, 'keydown', _inputKeydown);
      hf.addEvent(_.input, 'click', _inputClick);

      if (_.input.value !== '') {
        var time = _.parseTime(_.input.value, _.config.format);

        _.setValue(time);
      } else {
        var _time = _.getSystemTime();

        _.time = new Time(_time.hour, _time.minute);
      }

      _.resetSelected();

      _._switchView(_.activeView);

      if (_.config.events && _.config.events.ready) _.config.events.ready.call(_, _);
    }
    /**
     * Setup time picker html elements
     */


    _createClass(MDTimePicker, [{
      key: "_setup",
      value: function _setup() {
        var _ = this,
            picker = _.timepicker,
            overlay = picker.overlay,
            wrapper = picker.wrapper,
            time = picker.timeHolder,
            clock = picker.clockHolder;

        hf.appendTo([time.hour, time.dots, time.minute], time.wrapper);
        hf.appendTo(time.wrapper, wrapper);
        if (!_.config.is24hour) hf.appendTo(time.am_pm, time.wrapper); // Setup hours

        var _hours = _.config.is24hour ? 24 : 12;

        for (var i = 0; i < _hours; i++) {
          var value = i + 1,
              deg = (HOUR_START_DEG + i * HOUR_DEG_INCR) % END_DEG - (_.config.is24hour && value < 13 ? 15 : 0),
              is24 = value === 24,
              hour = hf.createElem('div', {
            class: "mdtp__digit rotate-".concat(deg),
            'data-hour': is24 ? 0 : value
          }),
              hourInner = hf.createElem('span', null, is24 ? '00' : value);
          hf.appendTo(hourInner, hour);
          if (_.config.is24hour && value < 13) hour.classList.add('inner--digit');
          hf.addEvent(hourInner, 'click', function () {
            var _hour = parseInt(this.parentNode.dataset.hour),
                _selectedT = _.selected.getPeriod(),
                _value = _.config.is24hour ? _hour : (_hour + (_selectedT === 'PM' && _hour < 12 || _selectedT === 'AM' && _hour === 12 ? 12 : 0)) % 24,
                disabled = _.isDisabled(_value, 0, true);

            if (disabled) return;

            _.setHour(_value);

            _._switchView('minutes');
          });
          hf.appendTo(hour, clock.clock.hours);
        } // Setup minutes


        for (var _i = 0; _i < 60; _i++) {
          var min = _i < 10 ? '0' + _i : _i,
              _deg = (MIN_START_DEG + _i * MIN_DEG_INCR) % END_DEG,
              minute = hf.createElem('div', {
            class: "mdtp__digit rotate-".concat(_deg),
            'data-minute': _i
          }),
              minuteInner = hf.createElem('span');

          hf.appendTo(minuteInner, minute);

          if (_i % 5 === 0) {
            minute.classList.add('marker');
            minuteInner.innerText = min;
          }

          hf.addEvent(minuteInner, 'click', function () {
            var _minute = parseInt(this.parentNode.dataset.minute),
                _hour = _.selected.getHour(),
                disabled = _.isDisabled(_hour, _minute, true);

            if (disabled) return;

            _.setMinute(_minute);
          });
          hf.appendTo(minute, clock.clock.minutes);
        } // Setup clock


        if (!_.config.is24hour) {
          hf.appendTo([clock.am, clock.pm], clock.clock.wrapper);
        }

        hf.appendTo([clock.clock.dot, clock.clock.hours, clock.clock.minutes], clock.clock.wrapper);
        hf.appendTo(clock.clock.wrapper, clock.wrapper); // Setup buttons

        if (_.config.clearBtn) {
          hf.appendTo(clock.buttonsHolder.btnClear, clock.buttonsHolder.wrapper);
        }

        hf.appendTo([clock.buttonsHolder.btnCancel, clock.buttonsHolder.btnOk], clock.buttonsHolder.wrapper);
        hf.appendTo(clock.buttonsHolder.wrapper, clock.wrapper);
        hf.appendTo(clock.wrapper, wrapper); // Setup theme

        wrapper.dataset.theme = _.input.dataset.theme || _.config.theme;
        hf.appendTo(wrapper, overlay);
        return overlay;
      }
      /**
       * Sets the hour value of the selected time
       * @param {number} hour Hour value
       */

    }, {
      key: "setHour",
      value: function setHour(hour) {
        if (typeof hour === 'undefined') throw new Error('Expecting a value.');
        var is12Hour = !this.config.is24hour;
        this.selected.setHour(hour);

        var _selectedH = this.selected.getHour(is12Hour);

        this.timepicker.timeHolder.hour.innerText = is12Hour ? _selectedH : this.selected.format('hh');
        this.timepicker.clockHolder.clock.hours.querySelectorAll('div').forEach(function (div) {
          var val = parseInt(div.dataset.hour);
          div.classList[val === _selectedH ? 'add' : 'remove']('active');
        });
      }
      /**
       * Sets the minute value of the selected time
       * @param {number} minute Minute value
       */

    }, {
      key: "setMinute",
      value: function setMinute(minute) {
        if (typeof minute === 'undefined') throw new Error('Expecting a value.');
        this.selected.setMinutes(minute);
        this.timepicker.timeHolder.minute.innerText = minute < 10 ? '0' + minute : minute;
        this.timepicker.clockHolder.clock.minutes.querySelectorAll('div').forEach(function (div) {
          var val = parseInt(div.dataset.minute);
          div.classList[val === minute ? 'add' : 'remove']('active');
        });
      }
      /**
       * Sets the time period of the selected time
       * @param {string} period Period value (AM/PM)
       */

    }, {
      key: "setPeriod",
      value: function setPeriod(period) {
        if (typeof period === 'undefined') throw new Error('Expecting a value.');
        if (this.selected.getPeriod() !== period.toUpperCase()) this.selected.invert();

        var _period = this.selected.getPeriod();

        this._setDisabled(this.activeView);

        this.timepicker.timeHolder.am_pm.innerText = _period;
        this.timepicker.clockHolder.am.classList[_period === 'AM' ? 'add' : 'remove']('active');
        this.timepicker.clockHolder.pm.classList[_period === 'PM' ? 'add' : 'remove']('active');
      }
      /**
       * Sets the value of the selected time
       * @param {string} value Time string values
       */

    }, {
      key: "setValue",
      value: function setValue(value) {
        if (typeof value === 'undefined') throw new Error('Expecting a value.');
        var time = typeof value === 'string' ? this.parseTime(value, this.config.format) : value;
        this.time = new Time(time.hour, time.minute);
        var formatted = this.getFormattedTime();
        this.input.value = formatted.value;
        hf.setAttributes(this.input, {
          'value': formatted.value,
          'data-time': formatted.time
        });
      }
      /**
       * Sets the minimum time constraint
       * @param {string} time Minimum time value
       */

    }, {
      key: "setMinTime",
      value: function setMinTime(time) {
        this.minTime = time;
      }
      /**
       * Sets the maximum time constraint
       * @param {string} time Maximum time value
       */

    }, {
      key: "setMaxTime",
      value: function setMaxTime(time) {
        this.maxTime = time;
      }
      /**
       * Sets the disabled digits of the clock
       * @param {string} view View name
       */

    }, {
      key: "_setDisabled",
      value: function _setDisabled(view) {
        if (view !== 'hours' && view !== 'minutes') return;

        var _ = this,
            clock = this.timepicker.clockHolder.clock;

        if (view === 'hours') {
          clock.hours.querySelectorAll('.mdtp__digit').forEach(function (hour) {
            var value = parseInt(hour.dataset.hour),
                period = _.selected.getPeriod(),
                time = new Time(value, 0);

            if (!_.config.is24hour && period !== time.getPeriod()) time.invert();

            var disabled = _.isDisabled(time.getHour(), 0, true);

            hour.classList[disabled ? 'add' : 'remove']('digit--disabled');
          });
        }

        if (view === 'minutes') {
          clock.minutes.querySelectorAll('.mdtp__digit').forEach(function (minute) {
            var value = parseInt(minute.dataset.minute),
                hour = _.selected.getHour(),
                disabled = _.isDisabled(hour, value, true);

            minute.classList[disabled ? 'add' : 'remove']('digit--disabled');
          });
        }
      }
      /**
       * Determines if the given time is disabled
       * @param {number} hour Hour value
       * @param {number} minute Minute value
       * @param {boolean} renderMode `true` if called upon rendering; `false` otherwise
       */

    }, {
      key: "isDisabled",
      value: function isDisabled(hour, minute, renderMode) {
        var _ = this,
            minT = null,
            min = null,
            maxT = null,
            max = null,
            now = new Date(),
            time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0),
            hourView = _.activeView === 'hours';

        if (_.minTime) minT = _.minTime === 'now' ? _.getSystemTime() : _.parseTime(_.minTime);
        if (_.maxTime) maxT = _.maxTime === 'now' ? _.getSystemTime() : _.parseTime(_.maxTime);

        if (minT) {
          min = new Date(now.getFullYear(), now.getMonth(), now.getDate(), minT.getHour(), hourView && renderMode ? 0 : minT.getMinutes(), 0, 0);
        }

        if (maxT) {
          max = new Date(now.getFullYear(), now.getMonth(), now.getDate(), maxT.getHour(), hourView && renderMode ? 0 : maxT.getMinutes(), 0, 0);
        }

        return min && time < min || max && time > max;
      }
      /**
       * Resets the selected time to client (system) time
       */

    }, {
      key: "resetSelected",
      value: function resetSelected() {
        this.setHour(this.time.hour);
        this.setMinute(this.time.minute);
        this.setPeriod(this.time.getPeriod());
      }
      /**
       * Returns the selected time string
       */

    }, {
      key: "getFormattedTime",
      value: function getFormattedTime() {
        var time = this.time.format(this.config.timeFormat, false),
            tValue = this.time.format(this.config.format, this.config.hourPadding);
        return {
          time: time,
          value: tValue
        };
      }
      /**
       * Returns the current client (system) time
       */

    }, {
      key: "getSystemTime",
      value: function getSystemTime() {
        return function (now) {
          return new Time(now.getHours(), now.getMinutes());
        }(new Date());
      }
      /**
       * Parses the given time string into a Time object
       * @param {string} time Time value
       * @param {string} tf Time format
       */

    }, {
      key: "parseTime",
      value: function parseTime(time, tf) {
        var that = this,
            format = typeof tf === 'undefined' ? that.config.format : tf,
            hLength = (format.match(/h/g) || []).length,
            is24Hour = hLength > 1,
            // mLength = (format.match(/m/g) || []).length, 
        tLength = (format.match(/t/g) || []).length,
            timeLength = time.length,
            fH = format.indexOf('h'),
            lH = format.lastIndexOf('h'),
            hour = '',
            min = '',
            t = ''; // Parse hour

        if (that.config.hourPadding || is24Hour) {
          hour = time.substr(fH, 2);
        } else {
          var prev = format.substring(fH - 1, fH),
              next = format.substring(lH + 1, lH + 2);

          if (lH === format.length - 1) {
            hour = time.substring(time.indexOf(prev, fH - 1) + 1, timeLength);
          } else if (fH === 0) {
            hour = time.substring(0, time.indexOf(next, fH));
          } else {
            hour = time.substring(time.indexOf(prev, fH - 1) + 1, time.indexOf(next, fH + 1));
          }
        }

        format = format.replace(/(hh|h)/g, hour);
        var fM = format.indexOf('m'),
            lM = format.lastIndexOf('m'),
            fT = format.indexOf('t'); // Parse minute

        var prevM = format.substring(fM - 1, fM);
            format.substring(lM + 1, lM + 2);

        if (lM === format.length - 1) {
          min = time.substring(time.indexOf(prevM, fM - 1) + 1, timeLength);
        } else if (fM === 0) {
          min = time.substring(0, 2);
        } else {
          min = time.substr(fM, 2);
        } // Parse t (am/pm)


        if (is24Hour) t = parseInt(hour) > 11 ? tLength > 1 ? 'PM' : 'pm' : tLength > 1 ? 'AM' : 'am';else t = time.substr(fT, 2);
        var isPm = t.toLowerCase() === 'pm',
            outTime = new Time(parseInt(hour), parseInt(min));

        if (isPm && parseInt(hour) < 12 || !isPm && parseInt(hour) === 12) {
          outTime.invert();
        }

        return outTime;
      }
      /**
       * Switches the time picker view (screen)
       * @param {string} view View name
       */

    }, {
      key: "_switchView",
      value: function _switchView(view) {
        var _ = this,
            picker = this.timepicker,
            anim_speed = 350;

        if (view !== 'hours' && view !== 'minutes') return;
        _.activeView = view;

        _._setDisabled(view);

        picker.timeHolder.hour.classList[view === 'hours' ? 'add' : 'remove']('active');
        picker.timeHolder.minute.classList[view === 'hours' ? 'remove' : 'add']('active');
        picker.clockHolder.clock.hours.classList.add('animate');
        if (view === 'hours') picker.clockHolder.clock.hours.classList.remove('hidden');
        clearTimeout(_.hTimeout);
        _.hTimeout = setTimeout(function () {
          if (view !== 'hours') picker.clockHolder.clock.hours.classList.add('hidden');
          picker.clockHolder.clock.hours.classList.remove('animate');
        }, view === 'hours' ? 20 : anim_speed);
        picker.clockHolder.clock.minutes.classList.add('animate');
        if (view === 'minutes') picker.clockHolder.clock.minutes.classList.remove('hidden');
        clearTimeout(_.mTimeout);
        _.mTimeout = setTimeout(function () {
          if (view !== 'minutes') picker.clockHolder.clock.minutes.classList.add('hidden');
          picker.clockHolder.clock.minutes.classList.remove('animate');
        }, view === 'minutes' ? 20 : anim_speed);
      }
      /**
       * Shows the time picker
       */

    }, {
      key: "show",
      value: function show() {
        var _ = this;

        if (_.input.value === '') {
          var time = _.getSystemTime();

          this.time = new Time(time.hour, time.minute);
        }

        _.resetSelected();

        document.body.setAttribute('mdtimepicker-display', 'on');

        _.timepicker.wrapper.classList.add('animate');

        _.timepicker.overlay.classList.remove('hidden');

        _.timepicker.overlay.classList.add('animate');

        setTimeout(function () {
          _.timepicker.overlay.classList.remove('animate');

          _.timepicker.wrapper.classList.remove('animate');

          _.timepicker.wrapper.focus();

          _.visible = true;

          _.input.blur();

          if (_.config.events && _.config.events.shown) _.config.events.shown.call(_);
        }, 10);
      }
      /**
       * Hides the time picker
       */

    }, {
      key: "hide",
      value: function hide() {
        var _ = this;

        _.timepicker.overlay.classList.add('animate');

        _.timepicker.wrapper.classList.add('animate');

        setTimeout(function () {
          _._switchView('hours');

          _.timepicker.overlay.classList.add('hidden');

          _.timepicker.overlay.classList.remove('animate');

          _.timepicker.wrapper.classList.remove('animate');

          document.body.removeAttribute('mdtimepicker-display');
          _.visible = false;

          _.input.focus();

          if (_.config.events && _.config.events.hidden) _.config.events.hidden.call(_);
        }, 300);
      }
      /**
       * Removes the time picker
       */

    }, {
      key: "destroy",
      value: function destroy() {
        this._unbindInput();

        this.timepicker.overlay.remove();
        delete this.input[MDTP_DATA];
      }
      /**
       * Triggers the change event on the input element
       * @param {Object} data Event data
       */

    }, {
      key: "_triggerChange",
      value: function _triggerChange(data) {
        hf.triggerChange(this.input, data);
        if (this.config.events && this.config.events.timeChanged) this.config.events.timeChanged.call(this, data, this);
      }
    }]);

    return MDTimePicker;
  }();
  /**
   * Time picker wrapper
   */


  _defineProperty(MDTimePicker, "default_configs", null);

  function mdtimepicker() {
    var args = arguments,
        arg0 = args[0],
        arg0IsList = arg0 instanceof NodeList || Array.isArray(arg0),
        arg0IsElem = arg0 instanceof Element,
        inputs = typeof arg0 === 'string' ? document.querySelectorAll(arg0) : arg0IsList ? arg0 : arg0IsElem ? [arg0] : document.querySelectorAll(DEFAULT_CLASS),
        options = _typeof(arg0) === 'object' && !arg0IsList && !arg0IsElem ? arg0 : args[1] && _typeof(args[1]) === 'object' ? args[1] : {},
        _defaults = hf.extend({}, MDTimePicker.default_configs || DEFAULTS);

    if (options && options.is24hour) _defaults.format = 'hh:mm';
    Array.from(inputs).forEach(function (el) {
      var picker = el[MDTP_DATA];

      if (!picker) {
        el[MDTP_DATA] = picker = new MDTimePicker(el, hf.extend(_defaults, options));
      }

      if ((typeof arg0 === 'string' || arg0IsList || arg0IsElem) && args[1] && typeof args[1] === 'string') {
        picker[args[1]].apply(picker, Array.prototype.slice.call(args).slice(2));
      }
    });
  }

  mdtimepicker.defaults = function (configs) {
    MDTimePicker.default_configs = hf.extend(DEFAULTS, configs);
  };

  return mdtimepicker;

})));
