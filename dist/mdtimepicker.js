/*!DO NOT REMOVE!
 * MDTimePicker 2.0.1 plugin
 * https://dmuy.github.io/MDTimePicker/
 *
 * Author: Dionlee Uy
 * Email: dionleeuy@gmail.com
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.mdtimepicker = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$f =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$j = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$i = fails$j;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$i(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var fails$h = fails$j;

  var functionBindNative = !fails$h(function () {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function () { /* empty */ }).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var NATIVE_BIND$3 = functionBindNative;

  var call$g = Function.prototype.call;

  var functionCall = NATIVE_BIND$3 ? call$g.bind(call$g) : function () {
    return call$g.apply(call$g, arguments);
  };

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

  var NATIVE_BIND$2 = functionBindNative;

  var FunctionPrototype$2 = Function.prototype;
  var call$f = FunctionPrototype$2.call;
  var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$f, call$f);

  var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
    return function () {
      return call$f.apply(fn, arguments);
    };
  };

  var uncurryThis$j = functionUncurryThis;

  var toString$8 = uncurryThis$j({}.toString);
  var stringSlice$5 = uncurryThis$j(''.slice);

  var classofRaw$2 = function (it) {
    return stringSlice$5(toString$8(it), 8, -1);
  };

  var uncurryThis$i = functionUncurryThis;
  var fails$g = fails$j;
  var classof$7 = classofRaw$2;

  var $Object$4 = Object;
  var split = uncurryThis$i(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$g(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object$4('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$7(it) == 'String' ? split(it, '') : $Object$4(it);
  } : $Object$4;

  // we can't use just `it == null` since of `document.all` special case
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
  var isNullOrUndefined$5 = function (it) {
    return it === null || it === undefined;
  };

  var isNullOrUndefined$4 = isNullOrUndefined$5;

  var $TypeError$b = TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$5 = function (it) {
    if (isNullOrUndefined$4(it)) throw $TypeError$b("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$1 = indexedObject;
  var requireObjectCoercible$4 = requireObjectCoercible$5;

  var toIndexedObject$5 = function (it) {
    return IndexedObject$1(requireObjectCoercible$4(it));
  };

  var documentAll$2 = typeof document == 'object' && document.all;

  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
  // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
  var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

  var documentAll_1 = {
    all: documentAll$2,
    IS_HTMLDDA: IS_HTMLDDA
  };

  var $documentAll$1 = documentAll_1;

  var documentAll$1 = $documentAll$1.all;

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable$j = $documentAll$1.IS_HTMLDDA ? function (argument) {
    return typeof argument == 'function' || argument === documentAll$1;
  } : function (argument) {
    return typeof argument == 'function';
  };

  var isCallable$i = isCallable$j;
  var $documentAll = documentAll_1;

  var documentAll = $documentAll.all;

  var isObject$9 = $documentAll.IS_HTMLDDA ? function (it) {
    return typeof it == 'object' ? it !== null : isCallable$i(it) || it === documentAll;
  } : function (it) {
    return typeof it == 'object' ? it !== null : isCallable$i(it);
  };

  var global$e = global$f;
  var isCallable$h = isCallable$j;

  var aFunction = function (argument) {
    return isCallable$h(argument) ? argument : undefined;
  };

  var getBuiltIn$6 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$e[namespace]) : global$e[namespace] && global$e[namespace][method];
  };

  var uncurryThis$h = functionUncurryThis;

  var objectIsPrototypeOf = uncurryThis$h({}.isPrototypeOf);

  var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

  var global$d = global$f;
  var userAgent = engineUserAgent;

  var process = global$d.process;
  var Deno = global$d.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var engineV8Version = version;

  /* eslint-disable es/no-symbol -- required for testing */

  var V8_VERSION$1 = engineV8Version;
  var fails$f = fails$j;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$f(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$1 = symbolConstructorDetection;

  var useSymbolAsUid = NATIVE_SYMBOL$1
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var getBuiltIn$5 = getBuiltIn$6;
  var isCallable$g = isCallable$j;
  var isPrototypeOf$2 = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var $Object$3 = Object;

  var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$5('Symbol');
    return isCallable$g($Symbol) && isPrototypeOf$2($Symbol.prototype, $Object$3(it));
  };

  var $String$4 = String;

  var tryToString$3 = function (argument) {
    try {
      return $String$4(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var isCallable$f = isCallable$j;
  var tryToString$2 = tryToString$3;

  var $TypeError$a = TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable$7 = function (argument) {
    if (isCallable$f(argument)) return argument;
    throw $TypeError$a(tryToString$2(argument) + ' is not a function');
  };

  var aCallable$6 = aCallable$7;
  var isNullOrUndefined$3 = isNullOrUndefined$5;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$6 = function (V, P) {
    var func = V[P];
    return isNullOrUndefined$3(func) ? undefined : aCallable$6(func);
  };

  var call$e = functionCall;
  var isCallable$e = isCallable$j;
  var isObject$8 = isObject$9;

  var $TypeError$9 = TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$e(fn = input.toString) && !isObject$8(val = call$e(fn, input))) return val;
    if (isCallable$e(fn = input.valueOf) && !isObject$8(val = call$e(fn, input))) return val;
    if (pref !== 'string' && isCallable$e(fn = input.toString) && !isObject$8(val = call$e(fn, input))) return val;
    throw $TypeError$9("Can't convert object to primitive value");
  };

  var shared$4 = {exports: {}};

  var global$c = global$f;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$2 = Object.defineProperty;

  var defineGlobalProperty$3 = function (key, value) {
    try {
      defineProperty$2(global$c, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$c[key] = value;
    } return value;
  };

  var global$b = global$f;
  var defineGlobalProperty$2 = defineGlobalProperty$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$b[SHARED] || defineGlobalProperty$2(SHARED, {});

  var sharedStore = store$3;

  var store$2 = sharedStore;

  (shared$4.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.30.1',
    mode: 'global',
    copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.30.1/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });

  var sharedExports = shared$4.exports;

  var requireObjectCoercible$3 = requireObjectCoercible$5;

  var $Object$2 = Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$5 = function (argument) {
    return $Object$2(requireObjectCoercible$3(argument));
  };

  var uncurryThis$g = functionUncurryThis;
  var toObject$4 = toObject$5;

  var hasOwnProperty = uncurryThis$g({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es/no-object-hasown -- safe
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$4(it), key);
  };

  var uncurryThis$f = functionUncurryThis;

  var id = 0;
  var postfix = Math.random();
  var toString$7 = uncurryThis$f(1.0.toString);

  var uid$2 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$7(++id + postfix, 36);
  };

  var global$a = global$f;
  var shared$3 = sharedExports;
  var hasOwn$9 = hasOwnProperty_1;
  var uid$1 = uid$2;
  var NATIVE_SYMBOL = symbolConstructorDetection;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var Symbol$1 = global$a.Symbol;
  var WellKnownSymbolsStore = shared$3('wks');
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

  var wellKnownSymbol$f = function (name) {
    if (!hasOwn$9(WellKnownSymbolsStore, name)) {
      WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$9(Symbol$1, name)
        ? Symbol$1[name]
        : createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
  };

  var call$d = functionCall;
  var isObject$7 = isObject$9;
  var isSymbol$1 = isSymbol$2;
  var getMethod$5 = getMethod$6;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$e = wellKnownSymbol$f;

  var $TypeError$8 = TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$e('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$1 = function (input, pref) {
    if (!isObject$7(input) || isSymbol$1(input)) return input;
    var exoticToPrim = getMethod$5(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$d(exoticToPrim, input, pref);
      if (!isObject$7(result) || isSymbol$1(result)) return result;
      throw $TypeError$8("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol = isSymbol$2;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$3 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };

  var global$9 = global$f;
  var isObject$6 = isObject$9;

  var document$1 = global$9.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject$6(document$1) && isObject$6(document$1.createElement);

  var documentCreateElement$2 = function (it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$7 = descriptors;
  var fails$e = fails$j;
  var createElement = documentCreateElement$2;

  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$7 && !fails$e(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var DESCRIPTORS$6 = descriptors;
  var call$c = functionCall;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$3 = createPropertyDescriptor$4;
  var toIndexedObject$4 = toIndexedObject$5;
  var toPropertyKey$2 = toPropertyKey$3;
  var hasOwn$8 = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$4(O);
    P = toPropertyKey$2(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn$8(O, P)) return createPropertyDescriptor$3(!call$c(propertyIsEnumerableModule.f, O, P), O[P]);
  };

  var objectDefineProperty = {};

  var DESCRIPTORS$5 = descriptors;
  var fails$d = fails$j;

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = DESCRIPTORS$5 && fails$d(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () { /* empty */ }, 'prototype', {
      value: 42,
      writable: false
    }).prototype != 42;
  });

  var isObject$5 = isObject$9;

  var $String$3 = String;
  var $TypeError$7 = TypeError;

  // `Assert: Type(argument) is Object`
  var anObject$f = function (argument) {
    if (isObject$5(argument)) return argument;
    throw $TypeError$7($String$3(argument) + ' is not an object');
  };

  var DESCRIPTORS$4 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
  var anObject$e = anObject$f;
  var toPropertyKey$1 = toPropertyKey$3;

  var $TypeError$6 = TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE$1 = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$4 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
    anObject$e(O);
    P = toPropertyKey$1(P);
    anObject$e(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    } return $defineProperty(O, P, Attributes);
  } : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$e(O);
    P = toPropertyKey$1(P);
    anObject$e(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw $TypeError$6('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$3 = descriptors;
  var definePropertyModule$4 = objectDefineProperty;
  var createPropertyDescriptor$2 = createPropertyDescriptor$4;

  var createNonEnumerableProperty$6 = DESCRIPTORS$3 ? function (object, key, value) {
    return definePropertyModule$4.f(object, key, createPropertyDescriptor$2(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var makeBuiltIn$2 = {exports: {}};

  var DESCRIPTORS$2 = descriptors;
  var hasOwn$7 = hasOwnProperty_1;

  var FunctionPrototype$1 = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS$2 && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwn$7(FunctionPrototype$1, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$2 || (DESCRIPTORS$2 && getDescriptor(FunctionPrototype$1, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var uncurryThis$e = functionUncurryThis;
  var isCallable$d = isCallable$j;
  var store$1 = sharedStore;

  var functionToString = uncurryThis$e(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$d(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource$2 = store$1.inspectSource;

  var global$8 = global$f;
  var isCallable$c = isCallable$j;

  var WeakMap$1 = global$8.WeakMap;

  var weakMapBasicDetection = isCallable$c(WeakMap$1) && /native code/.test(String(WeakMap$1));

  var shared$2 = sharedExports;
  var uid = uid$2;

  var keys = shared$2('keys');

  var sharedKey$3 = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys$4 = {};

  var NATIVE_WEAK_MAP = weakMapBasicDetection;
  var global$7 = global$f;
  var isObject$4 = isObject$9;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$6;
  var hasOwn$6 = hasOwnProperty_1;
  var shared$1 = sharedStore;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$3 = hiddenKeys$4;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$1 = global$7.TypeError;
  var WeakMap = global$7.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$4(it) || (state = get(it)).type !== TYPE) {
        throw TypeError$1('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$1.state) {
    var store = shared$1.state || (shared$1.state = new WeakMap());
    /* eslint-disable no-self-assign -- prototype methods protection */
    store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */
    set = function (it, metadata) {
      if (store.has(it)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      store.set(it, metadata);
      return metadata;
    };
    get = function (it) {
      return store.get(it) || {};
    };
    has = function (it) {
      return store.has(it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$3[STATE] = true;
    set = function (it, metadata) {
      if (hasOwn$6(it, STATE)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$5(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwn$6(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwn$6(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var uncurryThis$d = functionUncurryThis;
  var fails$c = fails$j;
  var isCallable$b = isCallable$j;
  var hasOwn$5 = hasOwnProperty_1;
  var DESCRIPTORS$1 = descriptors;
  var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
  var inspectSource$1 = inspectSource$2;
  var InternalStateModule$1 = internalState;

  var enforceInternalState = InternalStateModule$1.enforce;
  var getInternalState$2 = InternalStateModule$1.get;
  var $String$2 = String;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$1 = Object.defineProperty;
  var stringSlice$4 = uncurryThis$d(''.slice);
  var replace$2 = uncurryThis$d(''.replace);
  var join = uncurryThis$d([].join);

  var CONFIGURABLE_LENGTH = DESCRIPTORS$1 && !fails$c(function () {
    return defineProperty$1(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
  });

  var TEMPLATE = String(String).split('String');

  var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
    if (stringSlice$4($String$2(name), 0, 7) === 'Symbol(') {
      name = '[' + replace$2($String$2(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwn$5(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
      if (DESCRIPTORS$1) defineProperty$1(value, 'name', { value: name, configurable: true });
      else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn$5(options, 'arity') && value.length !== options.arity) {
      defineProperty$1(value, 'length', { value: options.arity });
    }
    try {
      if (options && hasOwn$5(options, 'constructor') && options.constructor) {
        if (DESCRIPTORS$1) defineProperty$1(value, 'prototype', { writable: false });
      // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
      } else if (value.prototype) value.prototype = undefined;
    } catch (error) { /* empty */ }
    var state = enforceInternalState(value);
    if (!hasOwn$5(state, 'source')) {
      state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
    } return value;
  };

  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  // eslint-disable-next-line no-extend-native -- required
  Function.prototype.toString = makeBuiltIn$1(function toString() {
    return isCallable$b(this) && getInternalState$2(this).source || inspectSource$1(this);
  }, 'toString');

  var makeBuiltInExports = makeBuiltIn$2.exports;

  var isCallable$a = isCallable$j;
  var definePropertyModule$3 = objectDefineProperty;
  var makeBuiltIn = makeBuiltInExports;
  var defineGlobalProperty$1 = defineGlobalProperty$3;

  var defineBuiltIn$5 = function (O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable$a(value)) makeBuiltIn(value, name, options);
    if (options.global) {
      if (simple) O[key] = value;
      else defineGlobalProperty$1(key, value);
    } else {
      try {
        if (!options.unsafe) delete O[key];
        else if (O[key]) simple = true;
      } catch (error) { /* empty */ }
      if (simple) O[key] = value;
      else definePropertyModule$3.f(O, key, {
        value: value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
    } return O;
  };

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$1 = Math.floor;

  // `Math.trunc` method
  // https://tc39.es/ecma262/#sec-math.trunc
  // eslint-disable-next-line es/no-math-trunc -- safe
  var mathTrunc = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor$1 : ceil)(n);
  };

  var trunc = mathTrunc;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$4 = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc(number);
  };

  var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

  var max$2 = Math.max;
  var min$2 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$2 = function (index, length) {
    var integer = toIntegerOrInfinity$3(index);
    return integer < 0 ? max$2(integer + length, 0) : min$2(integer, length);
  };

  var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

  var min$1 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$3 = function (argument) {
    return argument > 0 ? min$1(toIntegerOrInfinity$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength$2 = toLength$3;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$5 = function (obj) {
    return toLength$2(obj.length);
  };

  var toIndexedObject$3 = toIndexedObject$5;
  var toAbsoluteIndex$1 = toAbsoluteIndex$2;
  var lengthOfArrayLike$4 = lengthOfArrayLike$5;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$3 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$3($this);
      var length = lengthOfArrayLike$4(O);
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
    includes: createMethod$3(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$3(false)
  };

  var uncurryThis$c = functionUncurryThis;
  var hasOwn$4 = hasOwnProperty_1;
  var toIndexedObject$2 = toIndexedObject$5;
  var indexOf$1 = arrayIncludes.indexOf;
  var hiddenKeys$2 = hiddenKeys$4;

  var push$2 = uncurryThis$c([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$2(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$4(hiddenKeys$2, key) && hasOwn$4(O, key) && push$2(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$4(O, key = names[i++])) {
      ~indexOf$1(result, key) || push$2(result, key);
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

  var getBuiltIn$4 = getBuiltIn$6;
  var uncurryThis$b = functionUncurryThis;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$d = anObject$f;

  var concat$1 = uncurryThis$b([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$4('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$d(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn$3 = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$2 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$2.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn$3(target, key) && !(exceptions && hasOwn$3(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var fails$b = fails$j;
  var isCallable$9 = isCallable$j;

  var replacement = /#|\.prototype\./;

  var isForced$1 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : isCallable$9(detection) ? fails$b(detection)
      : !!detection;
  };

  var normalize = isForced$1.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$1.data = {};
  var NATIVE = isForced$1.NATIVE = 'N';
  var POLYFILL = isForced$1.POLYFILL = 'P';

  var isForced_1 = isForced$1;

  var global$6 = global$f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$6;
  var defineBuiltIn$4 = defineBuiltIn$5;
  var defineGlobalProperty = defineGlobalProperty$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced = isForced_1;

  /*
    options.target         - name of the target object
    options.global         - target is the global object
    options.stat           - export as static methods of target
    options.proto          - export as prototype methods of target
    options.real           - real prototype method for the `pure` version
    options.forced         - export even if the native feature is available
    options.bind           - bind methods to the target, required for the `pure` version
    options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe         - use the simple assignment of property instead of delete + defineProperty
    options.sham           - add a flag to not completely full polyfills
    options.enumerable     - export as enumerable property
    options.dontCallGetSet - prevent calling a getter on target
    options.name           - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$6;
    } else if (STATIC) {
      target = global$6[TARGET] || defineGlobalProperty(TARGET, {});
    } else {
      target = (global$6[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$4(sourceProperty, 'sham', true);
      }
      defineBuiltIn$4(target, key, sourceProperty, options);
    }
  };

  var wellKnownSymbol$d = wellKnownSymbol$f;

  var TO_STRING_TAG$3 = wellKnownSymbol$d('toStringTag');
  var test = {};

  test[TO_STRING_TAG$3] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$8 = isCallable$j;
  var classofRaw$1 = classofRaw$2;
  var wellKnownSymbol$c = wellKnownSymbol$f;

  var TO_STRING_TAG$2 = wellKnownSymbol$c('toStringTag');
  var $Object$1 = Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$6 = TO_STRING_TAG_SUPPORT$2 ? classofRaw$1 : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$2)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw$1(O)
      // ES3 arguments fallback
      : (result = classofRaw$1(O)) == 'Object' && isCallable$8(O.callee) ? 'Arguments' : result;
  };

  var classof$5 = classof$6;

  var $String$1 = String;

  var toString$6 = function (argument) {
    if (classof$5(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return $String$1(argument);
  };

  var anObject$c = anObject$f;

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags$1 = function () {
    var that = anObject$c(this);
    var result = '';
    if (that.hasIndices) result += 'd';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.unicodeSets) result += 'v';
    if (that.sticky) result += 'y';
    return result;
  };

  var fails$a = fails$j;
  var global$5 = global$f;

  // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var $RegExp$2 = global$5.RegExp;

  var UNSUPPORTED_Y$1 = fails$a(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  // UC Browser bug
  // https://github.com/zloirock/core-js/issues/1008
  var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$a(function () {
    return !$RegExp$2('a', 'y').sticky;
  });

  var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$a(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var regexpStickyHelpers = {
    BROKEN_CARET: BROKEN_CARET,
    MISSED_STICKY: MISSED_STICKY,
    UNSUPPORTED_Y: UNSUPPORTED_Y$1
  };

  var objectDefineProperties = {};

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$1 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS = descriptors;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var definePropertyModule$1 = objectDefineProperty;
  var anObject$b = anObject$f;
  var toIndexedObject$1 = toIndexedObject$5;
  var objectKeys = objectKeys$1;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$b(O);
    var props = toIndexedObject$1(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$1.f(O, key = keys[index++], props[key]);
    return O;
  };

  var getBuiltIn$3 = getBuiltIn$6;

  var html$1 = getBuiltIn$3('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */

  var anObject$a = anObject$f;
  var definePropertiesModule = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys = hiddenKeys$4;
  var html = html$1;
  var documentCreateElement$1 = documentCreateElement$2;
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
    var iframe = documentCreateElement$1('iframe');
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
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  // eslint-disable-next-line es/no-object-create -- safe
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$a(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
  };

  var fails$9 = fails$j;
  var global$4 = global$f;

  // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var $RegExp$1 = global$4.RegExp;

  var regexpUnsupportedDotAll = fails$9(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });

  var fails$8 = fails$j;
  var global$3 = global$f;

  // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  var $RegExp = global$3.RegExp;

  var regexpUnsupportedNcg = fails$8(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' ||
      'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */
  var call$b = functionCall;
  var uncurryThis$a = functionUncurryThis;
  var toString$5 = toString$6;
  var regexpFlags = regexpFlags$1;
  var stickyHelpers = regexpStickyHelpers;
  var shared = sharedExports;
  var create$1 = objectCreate;
  var getInternalState$1 = internalState.get;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;

  var nativeReplace = shared('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt$4 = uncurryThis$a(''.charAt);
  var indexOf = uncurryThis$a(''.indexOf);
  var replace$1 = uncurryThis$a(''.replace);
  var stringSlice$3 = uncurryThis$a(''.slice);

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    call$b(nativeExec, re1, 'a');
    call$b(nativeExec, re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

  if (PATCH) {
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState$1(re);
      var str = toString$5(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = call$b(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y && re.sticky;
      var flags = call$b(regexpFlags, re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = replace$1(flags, 'y', '');
        if (indexOf(flags, 'g') === -1) {
          flags += 'g';
        }

        strCopy = stringSlice$3(str, re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$4(str, re.lastIndex - 1) !== '\n')) {
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

      match = call$b(nativeExec, sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = stringSlice$3(match.input, charsAdded);
          match[0] = stringSlice$3(match[0], charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
        call$b(nativeReplace, match[0], reCopy, function () {
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

  var $$6 = _export;
  var exec$1 = regexpExec$2;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $$6({ target: 'RegExp', proto: true, forced: /./.exec !== exec$1 }, {
    exec: exec$1
  });

  var classofRaw = classofRaw$2;
  var uncurryThis$9 = functionUncurryThis;

  var functionUncurryThisClause = function (fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw(fn) === 'Function') return uncurryThis$9(fn);
  };

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var uncurryThis$8 = functionUncurryThisClause;
  var defineBuiltIn$3 = defineBuiltIn$5;
  var regexpExec$1 = regexpExec$2;
  var fails$7 = fails$j;
  var wellKnownSymbol$b = wellKnownSymbol$f;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$6;

  var SPECIES$3 = wellKnownSymbol$b('species');
  var RegExpPrototype = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$b(KEY);

    var DELEGATES_TO_SYMBOL = !fails$7(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$7(function () {
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
      var uncurriedNativeRegExpMethod = uncurryThis$8(/./[SYMBOL]);
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$8(nativeMethod);
        var $exec = regexp.exec;
        if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
          }
          return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
        }
        return { done: false };
      });

      defineBuiltIn$3(String.prototype, KEY, methods[0]);
      defineBuiltIn$3(RegExpPrototype, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty$3(RegExpPrototype[SYMBOL], 'sham', true);
  };

  var uncurryThis$7 = functionUncurryThis;
  var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
  var toString$4 = toString$6;
  var requireObjectCoercible$2 = requireObjectCoercible$5;

  var charAt$3 = uncurryThis$7(''.charAt);
  var charCodeAt = uncurryThis$7(''.charCodeAt);
  var stringSlice$2 = uncurryThis$7(''.slice);

  var createMethod$2 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$4(requireObjectCoercible$2($this));
      var position = toIntegerOrInfinity$1(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt$3(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice$2(S, position, position + 2)
            : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$2(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$2(true)
  };

  var charAt$2 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex$2 = function (S, index, unicode) {
    return index + (unicode ? charAt$2(S, index).length : 1);
  };

  var call$a = functionCall;
  var anObject$9 = anObject$f;
  var isCallable$7 = isCallable$j;
  var classof$4 = classofRaw$2;
  var regexpExec = regexpExec$2;

  var $TypeError$5 = TypeError;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (isCallable$7(exec)) {
      var result = call$a(exec, R, S);
      if (result !== null) anObject$9(result);
      return result;
    }
    if (classof$4(R) === 'RegExp') return call$a(regexpExec, R, S);
    throw $TypeError$5('RegExp#exec called on incompatible receiver');
  };

  var call$9 = functionCall;
  var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
  var anObject$8 = anObject$f;
  var isNullOrUndefined$2 = isNullOrUndefined$5;
  var toLength$1 = toLength$3;
  var toString$3 = toString$6;
  var requireObjectCoercible$1 = requireObjectCoercible$5;
  var getMethod$4 = getMethod$6;
  var advanceStringIndex$1 = advanceStringIndex$2;
  var regExpExec$1 = regexpExecAbstract;

  // @@match logic
  fixRegExpWellKnownSymbolLogic$1('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible$1(this);
        var matcher = isNullOrUndefined$2(regexp) ? undefined : getMethod$4(regexp, MATCH);
        return matcher ? call$9(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$3(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (string) {
        var rx = anObject$8(this);
        var S = toString$3(string);
        var res = maybeCallNative(nativeMatch, rx, S);

        if (res.done) return res.value;

        if (!rx.global) return regExpExec$1(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regExpExec$1(rx, S)) !== null) {
          var matchStr = toString$3(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  var NATIVE_BIND$1 = functionBindNative;

  var FunctionPrototype = Function.prototype;
  var apply$1 = FunctionPrototype.apply;
  var call$8 = FunctionPrototype.call;

  // eslint-disable-next-line es/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$8.bind(apply$1) : function () {
    return call$8.apply(apply$1, arguments);
  });

  var uncurryThis$6 = functionUncurryThis;
  var toObject$3 = toObject$5;

  var floor = Math.floor;
  var charAt$1 = uncurryThis$6(''.charAt);
  var replace = uncurryThis$6(''.replace);
  var stringSlice$1 = uncurryThis$6(''.slice);
  // eslint-disable-next-line redos/no-vulnerable -- safe
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
    return replace(replacement, symbols, function (match, ch) {
      var capture;
      switch (charAt$1(ch, 0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return stringSlice$1(str, 0, position);
        case "'": return stringSlice$1(str, tailPos);
        case '<':
          capture = namedCaptures[stringSlice$1(ch, 1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? charAt$1(ch, 1) : captures[f - 1] + charAt$1(ch, 1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var apply = functionApply;
  var call$7 = functionCall;
  var uncurryThis$5 = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var fails$6 = fails$j;
  var anObject$7 = anObject$f;
  var isCallable$6 = isCallable$j;
  var isNullOrUndefined$1 = isNullOrUndefined$5;
  var toIntegerOrInfinity = toIntegerOrInfinity$4;
  var toLength = toLength$3;
  var toString$2 = toString$6;
  var requireObjectCoercible = requireObjectCoercible$5;
  var advanceStringIndex = advanceStringIndex$2;
  var getMethod$3 = getMethod$6;
  var getSubstitution = getSubstitution$1;
  var regExpExec = regexpExecAbstract;
  var wellKnownSymbol$a = wellKnownSymbol$f;

  var REPLACE = wellKnownSymbol$a('replace');
  var max$1 = Math.max;
  var min = Math.min;
  var concat = uncurryThis$5([].concat);
  var push$1 = uncurryThis$5([].push);
  var stringIndexOf = uncurryThis$5(''.indexOf);
  var stringSlice = uncurryThis$5(''.slice);

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

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$6(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
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
        var replacer = isNullOrUndefined$1(searchValue) ? undefined : getMethod$3(searchValue, REPLACE);
        return replacer
          ? call$7(replacer, searchValue, O, replaceValue)
          : call$7(nativeReplace, toString$2(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject$7(this);
        var S = toString$2(string);

        if (
          typeof replaceValue == 'string' &&
          stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf(replaceValue, '$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
          if (res.done) return res.value;
        }

        var functionalReplace = isCallable$6(replaceValue);
        if (!functionalReplace) replaceValue = toString$2(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec(rx, S);
          if (result === null) break;

          push$1(results, result);
          if (!global) break;

          var matchStr = toString$2(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = toString$2(result[0]);
          var position = max$1(min(toIntegerOrInfinity(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) push$1(captures, maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = concat([matched], captures, position, S);
            if (namedCaptures !== undefined) push$1(replacerArgs, namedCaptures);
            var replacement = toString$2(apply(replaceValue, undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + stringSlice(S, nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$3 = classof$6;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$3(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var defineBuiltIn$2 = defineBuiltIn$5;
  var toString$1 = objectToString;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    defineBuiltIn$2(Object.prototype, 'toString', toString$1, { unsafe: true });
  }

  var $TypeError$4 = TypeError;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

  var doesNotExceedSafeInteger$1 = function (it) {
    if (it > MAX_SAFE_INTEGER) throw $TypeError$4('Maximum allowed index exceeded');
    return it;
  };

  var aCallable$5 = aCallable$7;

  var getIteratorDirect$2 = function (obj) {
    return {
      iterator: obj,
      next: aCallable$5(obj.next)
    };
  };

  var call$6 = functionCall;
  var getBuiltIn$2 = getBuiltIn$6;
  var getMethod$2 = getMethod$6;

  var asyncIteratorClose = function (iterator, method, argument, reject) {
    try {
      var returnMethod = getMethod$2(iterator, 'return');
      if (returnMethod) {
        return getBuiltIn$2('Promise').resolve(call$6(returnMethod, iterator)).then(function () {
          method(argument);
        }, function (error) {
          reject(error);
        });
      }
    } catch (error2) {
      return reject(error2);
    } method(argument);
  };

  // https://github.com/tc39/proposal-iterator-helpers
  // https://github.com/tc39/proposal-array-from-async
  var call$5 = functionCall;
  var aCallable$4 = aCallable$7;
  var anObject$6 = anObject$f;
  var isObject$3 = isObject$9;
  var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
  var getBuiltIn$1 = getBuiltIn$6;
  var getIteratorDirect$1 = getIteratorDirect$2;
  var closeAsyncIteration = asyncIteratorClose;

  var createMethod$1 = function (TYPE) {
    var IS_TO_ARRAY = TYPE == 0;
    var IS_FOR_EACH = TYPE == 1;
    var IS_EVERY = TYPE == 2;
    var IS_SOME = TYPE == 3;
    return function (object, fn, target) {
      anObject$6(object);
      var MAPPING = fn !== undefined;
      if (MAPPING || !IS_TO_ARRAY) aCallable$4(fn);
      var record = getIteratorDirect$1(object);
      var Promise = getBuiltIn$1('Promise');
      var iterator = record.iterator;
      var next = record.next;
      var counter = 0;

      return new Promise(function (resolve, reject) {
        var ifAbruptCloseAsyncIterator = function (error) {
          closeAsyncIteration(iterator, reject, error, reject);
        };

        var loop = function () {
          try {
            if (MAPPING) try {
              doesNotExceedSafeInteger(counter);
            } catch (error5) { ifAbruptCloseAsyncIterator(error5); }
            Promise.resolve(anObject$6(call$5(next, iterator))).then(function (step) {
              try {
                if (anObject$6(step).done) {
                  if (IS_TO_ARRAY) {
                    target.length = counter;
                    resolve(target);
                  } else resolve(IS_SOME ? false : IS_EVERY || undefined);
                } else {
                  var value = step.value;
                  try {
                    if (MAPPING) {
                      var result = fn(value, counter);

                      var handler = function ($result) {
                        if (IS_FOR_EACH) {
                          loop();
                        } else if (IS_EVERY) {
                          $result ? loop() : closeAsyncIteration(iterator, resolve, false, reject);
                        } else if (IS_TO_ARRAY) {
                          try {
                            target[counter++] = $result;
                            loop();
                          } catch (error4) { ifAbruptCloseAsyncIterator(error4); }
                        } else {
                          $result ? closeAsyncIteration(iterator, resolve, IS_SOME || value, reject) : loop();
                        }
                      };

                      if (isObject$3(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
                      else handler(result);
                    } else {
                      target[counter++] = value;
                      loop();
                    }
                  } catch (error3) { ifAbruptCloseAsyncIterator(error3); }
                }
              } catch (error2) { reject(error2); }
            }, reject);
          } catch (error) { reject(error); }
        };

        loop();
      });
    };
  };

  var asyncIteratorIteration = {
    toArray: createMethod$1(0),
    forEach: createMethod$1(1),
    every: createMethod$1(2),
    some: createMethod$1(3),
    find: createMethod$1(4)
  };

  var $$5 = _export;
  var $forEach$1 = asyncIteratorIteration.forEach;

  // `AsyncIterator.prototype.forEach` method
  // https://github.com/tc39/proposal-async-iterator-helpers
  $$5({ target: 'AsyncIterator', proto: true, real: true }, {
    forEach: function forEach(fn) {
      return $forEach$1(this, fn);
    }
  });

  var isPrototypeOf$1 = objectIsPrototypeOf;

  var $TypeError$3 = TypeError;

  var anInstance$1 = function (it, Prototype) {
    if (isPrototypeOf$1(Prototype, it)) return it;
    throw $TypeError$3('Incorrect invocation');
  };

  var fails$5 = fails$j;

  var correctPrototypeGetter = !fails$5(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var hasOwn$2 = hasOwnProperty_1;
  var isCallable$5 = isCallable$j;
  var toObject$2 = toObject$5;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey('IE_PROTO');
  var $Object = Object;
  var ObjectPrototype = $Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
    var object = toObject$2(O);
    if (hasOwn$2(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$5(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof $Object ? ObjectPrototype : null;
  };

  var fails$4 = fails$j;
  var isCallable$4 = isCallable$j;
  var isObject$2 = isObject$9;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var defineBuiltIn$1 = defineBuiltIn$5;
  var wellKnownSymbol$9 = wellKnownSymbol$f;

  var ITERATOR$4 = wellKnownSymbol$9('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$3, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$3 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = !isObject$2(IteratorPrototype$3) || fails$4(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$3[ITERATOR$4].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$3 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable$4(IteratorPrototype$3[ITERATOR$4])) {
    defineBuiltIn$1(IteratorPrototype$3, ITERATOR$4, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$3,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var $$4 = _export;
  var global$2 = global$f;
  var anInstance = anInstance$1;
  var isCallable$3 = isCallable$j;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$6;
  var fails$3 = fails$j;
  var hasOwn$1 = hasOwnProperty_1;
  var wellKnownSymbol$8 = wellKnownSymbol$f;
  var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;

  var TO_STRING_TAG$1 = wellKnownSymbol$8('toStringTag');

  var NativeIterator = global$2.Iterator;

  // FF56- have non-standard global helper `Iterator`
  var FORCED = !isCallable$3(NativeIterator)
    || NativeIterator.prototype !== IteratorPrototype$2
    // FF44- non-standard `Iterator` passes previous tests
    || !fails$3(function () { NativeIterator({}); });

  var IteratorConstructor = function Iterator() {
    anInstance(this, IteratorPrototype$2);
  };

  if (!hasOwn$1(IteratorPrototype$2, TO_STRING_TAG$1)) {
    createNonEnumerableProperty$2(IteratorPrototype$2, TO_STRING_TAG$1, 'Iterator');
  }

  if (FORCED || !hasOwn$1(IteratorPrototype$2, 'constructor') || IteratorPrototype$2.constructor === Object) {
    createNonEnumerableProperty$2(IteratorPrototype$2, 'constructor', IteratorConstructor);
  }

  IteratorConstructor.prototype = IteratorPrototype$2;

  // `Iterator` constructor
  // https://github.com/tc39/proposal-iterator-helpers
  $$4({ global: true, constructor: true, forced: FORCED }, {
    Iterator: IteratorConstructor
  });

  var uncurryThis$4 = functionUncurryThisClause;
  var aCallable$3 = aCallable$7;
  var NATIVE_BIND = functionBindNative;

  var bind$3 = uncurryThis$4(uncurryThis$4.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable$3(fn);
    return that === undefined ? fn : NATIVE_BIND ? bind$3(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var iterators = {};

  var wellKnownSymbol$7 = wellKnownSymbol$f;
  var Iterators$3 = iterators;

  var ITERATOR$3 = wellKnownSymbol$7('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$2 = function (it) {
    return it !== undefined && (Iterators$3.Array === it || ArrayPrototype[ITERATOR$3] === it);
  };

  var classof$2 = classof$6;
  var getMethod$1 = getMethod$6;
  var isNullOrUndefined = isNullOrUndefined$5;
  var Iterators$2 = iterators;
  var wellKnownSymbol$6 = wellKnownSymbol$f;

  var ITERATOR$2 = wellKnownSymbol$6('iterator');

  var getIteratorMethod$3 = function (it) {
    if (!isNullOrUndefined(it)) return getMethod$1(it, ITERATOR$2)
      || getMethod$1(it, '@@iterator')
      || Iterators$2[classof$2(it)];
  };

  var call$4 = functionCall;
  var aCallable$2 = aCallable$7;
  var anObject$5 = anObject$f;
  var tryToString$1 = tryToString$3;
  var getIteratorMethod$2 = getIteratorMethod$3;

  var $TypeError$2 = TypeError;

  var getIterator$2 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
    if (aCallable$2(iteratorMethod)) return anObject$5(call$4(iteratorMethod, argument));
    throw $TypeError$2(tryToString$1(argument) + ' is not iterable');
  };

  var call$3 = functionCall;
  var anObject$4 = anObject$f;
  var getMethod = getMethod$6;

  var iteratorClose$2 = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$4(iterator);
    try {
      innerResult = getMethod(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = call$3(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$4(innerResult);
    return value;
  };

  var bind$2 = functionBindContext;
  var call$2 = functionCall;
  var anObject$3 = anObject$f;
  var tryToString = tryToString$3;
  var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
  var lengthOfArrayLike$3 = lengthOfArrayLike$5;
  var isPrototypeOf = objectIsPrototypeOf;
  var getIterator$1 = getIterator$2;
  var getIteratorMethod$1 = getIteratorMethod$3;
  var iteratorClose$1 = iteratorClose$2;

  var $TypeError$1 = TypeError;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var ResultPrototype = Result.prototype;

  var iterate$1 = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_RECORD = !!(options && options.IS_RECORD);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind$2(unboundFunction, that);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose$1(iterator, 'normal', condition);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject$3(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_RECORD) {
      iterator = iterable.iterator;
    } else if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod$1(iterable);
      if (!iterFn) throw $TypeError$1(tryToString(iterable) + ' is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod$1(iterFn)) {
        for (index = 0, length = lengthOfArrayLike$3(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && isPrototypeOf(ResultPrototype, result)) return result;
        } return new Result(false);
      }
      iterator = getIterator$1(iterable, iterFn);
    }

    next = IS_RECORD ? iterable.next : iterator.next;
    while (!(step = call$2(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose$1(iterator, 'throw', error);
      }
      if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
    } return new Result(false);
  };

  var $$3 = _export;
  var iterate = iterate$1;
  var aCallable$1 = aCallable$7;
  var anObject$2 = anObject$f;
  var getIteratorDirect = getIteratorDirect$2;

  // `Iterator.prototype.forEach` method
  // https://github.com/tc39/proposal-iterator-helpers
  $$3({ target: 'Iterator', proto: true, real: true }, {
    forEach: function forEach(fn) {
      anObject$2(this);
      aCallable$1(fn);
      var record = getIteratorDirect(this);
      var counter = 0;
      iterate(record, function (value) {
        fn(value, counter++);
      }, { IS_RECORD: true });
    }
  });

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

  // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
  var documentCreateElement = documentCreateElement$2;

  var classList = documentCreateElement('span').classList;
  var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

  var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

  var classof$1 = classofRaw$2;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$2 = Array.isArray || function isArray(argument) {
    return classof$1(argument) == 'Array';
  };

  var uncurryThis$3 = functionUncurryThis;
  var fails$2 = fails$j;
  var isCallable$2 = isCallable$j;
  var classof = classof$6;
  var getBuiltIn = getBuiltIn$6;
  var inspectSource = inspectSource$2;

  var noop = function () { /* empty */ };
  var empty = [];
  var construct = getBuiltIn('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec = uncurryThis$3(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable$2(argument)) return false;
    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable$2(argument)) return false;
    switch (classof(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
    }
    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true;

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$3 = !construct || fails$2(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var isArray$1 = isArray$2;
  var isConstructor$2 = isConstructor$3;
  var isObject$1 = isObject$9;
  var wellKnownSymbol$5 = wellKnownSymbol$f;

  var SPECIES$2 = wellKnownSymbol$5('species');
  var $Array$2 = Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;
    if (isArray$1(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor$2(C) && (C === $Array$2 || isArray$1(C.prototype))) C = undefined;
      else if (isObject$1(C)) {
        C = C[SPECIES$2];
        if (C === null) C = undefined;
      }
    } return C === undefined ? $Array$2 : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1;

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$1 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var bind$1 = functionBindContext;
  var uncurryThis$2 = functionUncurryThis;
  var IndexedObject = indexedObject;
  var toObject$1 = toObject$5;
  var lengthOfArrayLike$2 = lengthOfArrayLike$5;
  var arraySpeciesCreate = arraySpeciesCreate$1;

  var push = uncurryThis$2([].push);

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$1($this);
      var self = IndexedObject(O);
      var boundFunction = bind$1(callbackfn, that);
      var length = lengthOfArrayLike$2(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
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
            case 2: push(target, value);      // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push(target, value);      // filterReject
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
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod(7)
  };

  var fails$1 = fails$j;

  var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$1(function () {
      // eslint-disable-next-line no-useless-call -- required for testing
      method.call(null, argument || function () { return 1; }, 1);
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

  var global$1 = global$f;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var forEach = arrayForEach;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$6;

  var handlePrototype = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty$1(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  };

  for (var COLLECTION_NAME in DOMIterables) {
    if (DOMIterables[COLLECTION_NAME]) {
      handlePrototype(global$1[COLLECTION_NAME] && global$1[COLLECTION_NAME].prototype);
    }
  }

  handlePrototype(DOMTokenListPrototype);

  var anObject$1 = anObject$f;
  var iteratorClose = iteratorClose$2;

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$1(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
  };

  var toPropertyKey = toPropertyKey$3;
  var definePropertyModule = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$4;

  var createProperty$2 = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor$1(0, value));
    else object[propertyKey] = value;
  };

  var bind = functionBindContext;
  var call$1 = functionCall;
  var toObject = toObject$5;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
  var isArrayIteratorMethod = isArrayIteratorMethod$2;
  var isConstructor$1 = isConstructor$3;
  var lengthOfArrayLike$1 = lengthOfArrayLike$5;
  var createProperty$1 = createProperty$2;
  var getIterator = getIterator$2;
  var getIteratorMethod = getIteratorMethod$3;

  var $Array$1 = Array;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var IS_CONSTRUCTOR = isConstructor$1(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this === $Array$1 && isArrayIteratorMethod(iteratorMethod))) {
      iterator = getIterator(O, iteratorMethod);
      next = iterator.next;
      result = IS_CONSTRUCTOR ? new this() : [];
      for (;!(step = call$1(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty$1(result, index, value);
      }
    } else {
      length = lengthOfArrayLike$1(O);
      result = IS_CONSTRUCTOR ? new this(length) : $Array$1(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty$1(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var wellKnownSymbol$4 = wellKnownSymbol$f;

  var ITERATOR$1 = wellKnownSymbol$4('iterator');
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
    iteratorWithReturn[ITERATOR$1] = function () {
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
      object[ITERATOR$1] = function () {
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

  var defineProperty = objectDefineProperty.f;
  var hasOwn = hasOwnProperty_1;
  var wellKnownSymbol$3 = wellKnownSymbol$f;

  var TO_STRING_TAG = wellKnownSymbol$3('toStringTag');

  var setToStringTag$2 = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwn(target, TO_STRING_TAG)) {
      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create = objectCreate;
  var createPropertyDescriptor = createPropertyDescriptor$4;
  var setToStringTag$1 = setToStringTag$2;
  var Iterators$1 = iterators;

  var returnThis$1 = function () { return this; };

  var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create(IteratorPrototype$1, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
    setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$1[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var uncurryThis$1 = functionUncurryThis;
  var aCallable = aCallable$7;

  var functionUncurryThisAccessor = function (object, key, method) {
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      return uncurryThis$1(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
    } catch (error) { /* empty */ }
  };

  var isCallable$1 = isCallable$j;

  var $String = String;
  var $TypeError = TypeError;

  var aPossiblePrototype$1 = function (argument) {
    if (typeof argument == 'object' || isCallable$1(argument)) return argument;
    throw $TypeError("Can't set " + $String(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */

  var uncurryThisAccessor = functionUncurryThisAccessor;
  var anObject = anObject$f;
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
      setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var $$1 = _export;
  var call = functionCall;
  var FunctionName = functionName;
  var isCallable = isCallable$j;
  var createIteratorConstructor = iteratorCreateConstructor;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf = objectSetPrototypeOf;
  var setToStringTag = setToStringTag$2;
  var createNonEnumerableProperty = createNonEnumerableProperty$6;
  var defineBuiltIn = defineBuiltIn$5;
  var wellKnownSymbol$2 = wellKnownSymbol$f;
  var Iterators = iterators;
  var IteratorsCore = iteratorsCore;

  var PROPER_FUNCTION_NAME = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR = wellKnownSymbol$2('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
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
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf) {
            setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
            defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME) {
        createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return call(nativeIterator, this); };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$1({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if (IterablePrototype[ITERATOR] !== defaultIterator) {
      defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
    }
    Iterators[NAME] = defaultIterator;

    return methods;
  };

  // `CreateIterResultObject` abstract operation
  // https://tc39.es/ecma262/#sec-createiterresultobject
  var createIterResultObject$1 = function (value, done) {
    return { value: value, done: done };
  };

  var charAt = stringMultibyte.charAt;
  var toString = toString$6;
  var InternalStateModule = internalState;
  var defineIterator = iteratorDefine;
  var createIterResultObject = createIterResultObject$1;

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: toString(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return createIterResultObject(undefined, true);
    point = charAt(string, index);
    state.index += point.length;
    return createIterResultObject(point, false);
  });

  var fails = fails$j;
  var wellKnownSymbol$1 = wellKnownSymbol$f;
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

  var uncurryThis = functionUncurryThis;

  var arraySlice = uncurryThis([].slice);

  var $ = _export;
  var isArray = isArray$2;
  var isConstructor = isConstructor$3;
  var isObject = isObject$9;
  var toAbsoluteIndex = toAbsoluteIndex$2;
  var lengthOfArrayLike = lengthOfArrayLike$5;
  var toIndexedObject = toIndexedObject$5;
  var createProperty = createProperty$2;
  var wellKnownSymbol = wellKnownSymbol$f;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;
  var nativeSlice = arraySlice;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

  var SPECIES = wellKnownSymbol('species');
  var $Array = Array;
  var max = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = lengthOfArrayLike(O);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === $Array || Constructor === undefined) {
          return nativeSlice(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? $Array : Constructor)(max(fin - k, 0));
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
      var length = arguments.length;

      // Check if a deep merge
      if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
        deep = arguments[0];
        i++;
      }

      // Merge the object into the extended object
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
      };

      // Loop through each object and conduct a merge
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
        if (!_.config.is24hour) hf.appendTo(time.am_pm, time.wrapper);

        // Setup hours
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
        }

        // Setup minutes
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
        }

        // Setup clock
        if (!_.config.is24hour) {
          hf.appendTo([clock.am, clock.pm], clock.clock.wrapper);
        }
        hf.appendTo([clock.clock.dot, clock.clock.hours, clock.clock.minutes], clock.clock.wrapper);
        hf.appendTo(clock.clock.wrapper, clock.wrapper);

        // Setup buttons
        if (_.config.clearBtn) {
          hf.appendTo(clock.buttonsHolder.btnClear, clock.buttonsHolder.wrapper);
        }
        hf.appendTo([clock.buttonsHolder.btnCancel, clock.buttonsHolder.btnOk], clock.buttonsHolder.wrapper);
        hf.appendTo(clock.buttonsHolder.wrapper, clock.wrapper);
        hf.appendTo(clock.wrapper, wrapper);

        // Setup theme
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
          t = '';

        // Parse hour
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
          fT = format.indexOf('t');

        // Parse minute
        var prevM = format.substring(fM - 1, fM);
          format.substring(lM + 1, lM + 2);
        if (lM === format.length - 1) {
          min = time.substring(time.indexOf(prevM, fM - 1) + 1, timeLength);
        } else if (fM === 0) {
          min = time.substring(0, 2);
        } else {
          min = time.substr(fM, 2);
        }

        // Parse t (am/pm)
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

}));
