/*!DO NOT REMOVE!
 * MDTimePicker 2.0.3 plugin
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

  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var check = function (it) {
    return it && it.Math === Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$g =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$k = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$j = fails$k;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$j(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
  });

  var fails$i = fails$k;

  var functionBindNative = !fails$i(function () {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function () { /* empty */ }).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var NATIVE_BIND$3 = functionBindNative;

  var call$m = Function.prototype.call;

  var functionCall = NATIVE_BIND$3 ? call$m.bind(call$m) : function () {
    return call$m.apply(call$m, arguments);
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
  var call$l = FunctionPrototype$2.call;
  var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$l, call$l);

  var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
    return function () {
      return call$l.apply(fn, arguments);
    };
  };

  var uncurryThis$i = functionUncurryThis;

  var toString$8 = uncurryThis$i({}.toString);
  var stringSlice$5 = uncurryThis$i(''.slice);

  var classofRaw$2 = function (it) {
    return stringSlice$5(toString$8(it), 8, -1);
  };

  var uncurryThis$h = functionUncurryThis;
  var fails$h = fails$k;
  var classof$7 = classofRaw$2;

  var $Object$4 = Object;
  var split = uncurryThis$h(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$h(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object$4('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$7(it) === 'String' ? split(it, '') : $Object$4(it);
  } : $Object$4;

  // we can't use just `it == null` since of `document.all` special case
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
  var isNullOrUndefined$5 = function (it) {
    return it === null || it === undefined;
  };

  var isNullOrUndefined$4 = isNullOrUndefined$5;

  var $TypeError$c = TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$6 = function (it) {
    if (isNullOrUndefined$4(it)) throw new $TypeError$c("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$1 = indexedObject;
  var requireObjectCoercible$5 = requireObjectCoercible$6;

  var toIndexedObject$5 = function (it) {
    return IndexedObject$1(requireObjectCoercible$5(it));
  };

  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
  var documentAll = typeof document == 'object' && document.all;

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
  var isCallable$j = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
    return typeof argument == 'function' || argument === documentAll;
  } : function (argument) {
    return typeof argument == 'function';
  };

  var isCallable$i = isCallable$j;

  var isObject$c = function (it) {
    return typeof it == 'object' ? it !== null : isCallable$i(it);
  };

  var global$f = global$g;
  var isCallable$h = isCallable$j;

  var aFunction = function (argument) {
    return isCallable$h(argument) ? argument : undefined;
  };

  var getBuiltIn$7 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$f[namespace]) : global$f[namespace] && global$f[namespace][method];
  };

  var uncurryThis$g = functionUncurryThis;

  var objectIsPrototypeOf = uncurryThis$g({}.isPrototypeOf);

  var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

  var global$e = global$g;
  var userAgent = engineUserAgent;

  var process = global$e.process;
  var Deno = global$e.Deno;
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
  var fails$g = fails$k;
  var global$d = global$g;

  var $String$5 = global$d.String;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$g(function () {
    var symbol = Symbol('symbol detection');
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
    // of course, fail.
    return !$String$5(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */
  var NATIVE_SYMBOL$1 = symbolConstructorDetection;

  var useSymbolAsUid = NATIVE_SYMBOL$1
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var getBuiltIn$6 = getBuiltIn$7;
  var isCallable$g = isCallable$j;
  var isPrototypeOf$3 = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var $Object$3 = Object;

  var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$6('Symbol');
    return isCallable$g($Symbol) && isPrototypeOf$3($Symbol.prototype, $Object$3(it));
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

  var $TypeError$b = TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable$8 = function (argument) {
    if (isCallable$f(argument)) return argument;
    throw new $TypeError$b(tryToString$2(argument) + ' is not a function');
  };

  var aCallable$7 = aCallable$8;
  var isNullOrUndefined$3 = isNullOrUndefined$5;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$8 = function (V, P) {
    var func = V[P];
    return isNullOrUndefined$3(func) ? undefined : aCallable$7(func);
  };

  var call$k = functionCall;
  var isCallable$e = isCallable$j;
  var isObject$b = isObject$c;

  var $TypeError$a = TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$e(fn = input.toString) && !isObject$b(val = call$k(fn, input))) return val;
    if (isCallable$e(fn = input.valueOf) && !isObject$b(val = call$k(fn, input))) return val;
    if (pref !== 'string' && isCallable$e(fn = input.toString) && !isObject$b(val = call$k(fn, input))) return val;
    throw new $TypeError$a("Can't convert object to primitive value");
  };

  var sharedStore = {exports: {}};

  var isPure = false;

  var global$c = global$g;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$3 = Object.defineProperty;

  var defineGlobalProperty$3 = function (key, value) {
    try {
      defineProperty$3(global$c, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$c[key] = value;
    } return value;
  };

  var globalThis$1 = global$g;
  var defineGlobalProperty$2 = defineGlobalProperty$3;

  var SHARED = '__core-js_shared__';
  var store$3 = sharedStore.exports = globalThis$1[SHARED] || defineGlobalProperty$2(SHARED, {});

  (store$3.versions || (store$3.versions = [])).push({
    version: '3.37.1',
    mode: 'global',
    copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.37.1/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });

  var sharedStoreExports = sharedStore.exports;

  var store$2 = sharedStoreExports;

  var shared$5 = function (key, value) {
    return store$2[key] || (store$2[key] = value || {});
  };

  var requireObjectCoercible$4 = requireObjectCoercible$6;

  var $Object$2 = Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$5 = function (argument) {
    return $Object$2(requireObjectCoercible$4(argument));
  };

  var uncurryThis$f = functionUncurryThis;
  var toObject$4 = toObject$5;

  var hasOwnProperty = uncurryThis$f({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es/no-object-hasown -- safe
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$4(it), key);
  };

  var uncurryThis$e = functionUncurryThis;

  var id = 0;
  var postfix = Math.random();
  var toString$7 = uncurryThis$e(1.0.toString);

  var uid$2 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$7(++id + postfix, 36);
  };

  var global$b = global$g;
  var shared$4 = shared$5;
  var hasOwn$a = hasOwnProperty_1;
  var uid$1 = uid$2;
  var NATIVE_SYMBOL = symbolConstructorDetection;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var Symbol$1 = global$b.Symbol;
  var WellKnownSymbolsStore = shared$4('wks');
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

  var wellKnownSymbol$i = function (name) {
    if (!hasOwn$a(WellKnownSymbolsStore, name)) {
      WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$a(Symbol$1, name)
        ? Symbol$1[name]
        : createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
  };

  var call$j = functionCall;
  var isObject$a = isObject$c;
  var isSymbol$1 = isSymbol$2;
  var getMethod$7 = getMethod$8;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$h = wellKnownSymbol$i;

  var $TypeError$9 = TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$h('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$1 = function (input, pref) {
    if (!isObject$a(input) || isSymbol$1(input)) return input;
    var exoticToPrim = getMethod$7(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$j(exoticToPrim, input, pref);
      if (!isObject$a(result) || isSymbol$1(result)) return result;
      throw new $TypeError$9("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol = isSymbol$2;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$2 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };

  var global$a = global$g;
  var isObject$9 = isObject$c;

  var document$1 = global$a.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject$9(document$1) && isObject$9(document$1.createElement);

  var documentCreateElement$2 = function (it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$9 = descriptors;
  var fails$f = fails$k;
  var createElement = documentCreateElement$2;

  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$9 && !fails$f(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () { return 7; }
    }).a !== 7;
  });

  var DESCRIPTORS$8 = descriptors;
  var call$i = functionCall;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$3 = createPropertyDescriptor$4;
  var toIndexedObject$4 = toIndexedObject$5;
  var toPropertyKey$1 = toPropertyKey$2;
  var hasOwn$9 = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$8 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$4(O);
    P = toPropertyKey$1(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn$9(O, P)) return createPropertyDescriptor$3(!call$i(propertyIsEnumerableModule.f, O, P), O[P]);
  };

  var objectDefineProperty = {};

  var DESCRIPTORS$7 = descriptors;
  var fails$e = fails$k;

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = DESCRIPTORS$7 && fails$e(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () { /* empty */ }, 'prototype', {
      value: 42,
      writable: false
    }).prototype !== 42;
  });

  var isObject$8 = isObject$c;

  var $String$3 = String;
  var $TypeError$8 = TypeError;

  // `Assert: Type(argument) is Object`
  var anObject$j = function (argument) {
    if (isObject$8(argument)) return argument;
    throw new $TypeError$8($String$3(argument) + ' is not an object');
  };

  var DESCRIPTORS$6 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
  var anObject$i = anObject$j;
  var toPropertyKey = toPropertyKey$2;

  var $TypeError$7 = TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE$1 = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$6 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
    anObject$i(O);
    P = toPropertyKey(P);
    anObject$i(Attributes);
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
    anObject$i(O);
    P = toPropertyKey(P);
    anObject$i(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$7('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$5 = descriptors;
  var definePropertyModule$4 = objectDefineProperty;
  var createPropertyDescriptor$2 = createPropertyDescriptor$4;

  var createNonEnumerableProperty$7 = DESCRIPTORS$5 ? function (object, key, value) {
    return definePropertyModule$4.f(object, key, createPropertyDescriptor$2(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var makeBuiltIn$3 = {exports: {}};

  var DESCRIPTORS$4 = descriptors;
  var hasOwn$8 = hasOwnProperty_1;

  var FunctionPrototype$1 = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS$4 && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwn$8(FunctionPrototype$1, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$4 || (DESCRIPTORS$4 && getDescriptor(FunctionPrototype$1, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var uncurryThis$d = functionUncurryThis;
  var isCallable$d = isCallable$j;
  var store$1 = sharedStoreExports;

  var functionToString = uncurryThis$d(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$d(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource$2 = store$1.inspectSource;

  var global$9 = global$g;
  var isCallable$c = isCallable$j;

  var WeakMap$1 = global$9.WeakMap;

  var weakMapBasicDetection = isCallable$c(WeakMap$1) && /native code/.test(String(WeakMap$1));

  var shared$3 = shared$5;
  var uid = uid$2;

  var keys = shared$3('keys');

  var sharedKey$3 = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys$4 = {};

  var NATIVE_WEAK_MAP = weakMapBasicDetection;
  var global$8 = global$g;
  var isObject$7 = isObject$c;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$7;
  var hasOwn$7 = hasOwnProperty_1;
  var shared$2 = sharedStoreExports;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$3 = hiddenKeys$4;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$1 = global$8.TypeError;
  var WeakMap = global$8.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$7(it) || (state = get(it)).type !== TYPE) {
        throw new TypeError$1('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$2.state) {
    var store = shared$2.state || (shared$2.state = new WeakMap());
    /* eslint-disable no-self-assign -- prototype methods protection */
    store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */
    set = function (it, metadata) {
      if (store.has(it)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
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
      if (hasOwn$7(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$6(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwn$7(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwn$7(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var uncurryThis$c = functionUncurryThis;
  var fails$d = fails$k;
  var isCallable$b = isCallable$j;
  var hasOwn$6 = hasOwnProperty_1;
  var DESCRIPTORS$3 = descriptors;
  var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
  var inspectSource$1 = inspectSource$2;
  var InternalStateModule$3 = internalState;

  var enforceInternalState = InternalStateModule$3.enforce;
  var getInternalState$2 = InternalStateModule$3.get;
  var $String$2 = String;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$2 = Object.defineProperty;
  var stringSlice$4 = uncurryThis$c(''.slice);
  var replace$2 = uncurryThis$c(''.replace);
  var join = uncurryThis$c([].join);

  var CONFIGURABLE_LENGTH = DESCRIPTORS$3 && !fails$d(function () {
    return defineProperty$2(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
  });

  var TEMPLATE = String(String).split('String');

  var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
    if (stringSlice$4($String$2(name), 0, 7) === 'Symbol(') {
      name = '[' + replace$2($String$2(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
    }
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwn$6(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
      if (DESCRIPTORS$3) defineProperty$2(value, 'name', { value: name, configurable: true });
      else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn$6(options, 'arity') && value.length !== options.arity) {
      defineProperty$2(value, 'length', { value: options.arity });
    }
    try {
      if (options && hasOwn$6(options, 'constructor') && options.constructor) {
        if (DESCRIPTORS$3) defineProperty$2(value, 'prototype', { writable: false });
      // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
      } else if (value.prototype) value.prototype = undefined;
    } catch (error) { /* empty */ }
    var state = enforceInternalState(value);
    if (!hasOwn$6(state, 'source')) {
      state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
    } return value;
  };

  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  // eslint-disable-next-line no-extend-native -- required
  Function.prototype.toString = makeBuiltIn$2(function toString() {
    return isCallable$b(this) && getInternalState$2(this).source || inspectSource$1(this);
  }, 'toString');

  var makeBuiltInExports = makeBuiltIn$3.exports;

  var isCallable$a = isCallable$j;
  var definePropertyModule$3 = objectDefineProperty;
  var makeBuiltIn$1 = makeBuiltInExports;
  var defineGlobalProperty$1 = defineGlobalProperty$3;

  var defineBuiltIn$8 = function (O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable$a(value)) makeBuiltIn$1(value, name, options);
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
    var len = toIntegerOrInfinity$2(argument);
    return len > 0 ? min$1(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
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
      if (length === 0) return !IS_INCLUDES && -1;
      var index = toAbsoluteIndex$1(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el !== el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value !== value) return true;
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

  var uncurryThis$b = functionUncurryThis;
  var hasOwn$5 = hasOwnProperty_1;
  var toIndexedObject$2 = toIndexedObject$5;
  var indexOf$1 = arrayIncludes.indexOf;
  var hiddenKeys$2 = hiddenKeys$4;

  var push$2 = uncurryThis$b([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$2(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$5(hiddenKeys$2, key) && hasOwn$5(O, key) && push$2(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$5(O, key = names[i++])) {
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

  var getBuiltIn$5 = getBuiltIn$7;
  var uncurryThis$a = functionUncurryThis;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$h = anObject$j;

  var concat$1 = uncurryThis$a([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$h(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn$4 = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$2 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$2.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn$4(target, key) && !(exceptions && hasOwn$4(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var fails$c = fails$k;
  var isCallable$9 = isCallable$j;

  var replacement = /#|\.prototype\./;

  var isForced$1 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value === POLYFILL ? true
      : value === NATIVE ? false
      : isCallable$9(detection) ? fails$c(detection)
      : !!detection;
  };

  var normalize = isForced$1.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$1.data = {};
  var NATIVE = isForced$1.NATIVE = 'N';
  var POLYFILL = isForced$1.POLYFILL = 'P';

  var isForced_1 = isForced$1;

  var global$7 = global$g;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$7;
  var defineBuiltIn$7 = defineBuiltIn$8;
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
      target = global$7;
    } else if (STATIC) {
      target = global$7[TARGET] || defineGlobalProperty(TARGET, {});
    } else {
      target = global$7[TARGET] && global$7[TARGET].prototype;
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
        createNonEnumerableProperty$5(sourceProperty, 'sham', true);
      }
      defineBuiltIn$7(target, key, sourceProperty, options);
    }
  };

  var classofRaw$1 = classofRaw$2;
  var uncurryThis$9 = functionUncurryThis;

  var functionUncurryThisClause = function (fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw$1(fn) === 'Function') return uncurryThis$9(fn);
  };

  var uncurryThis$8 = functionUncurryThisClause;
  var aCallable$6 = aCallable$8;
  var NATIVE_BIND$1 = functionBindNative;

  var bind$3 = uncurryThis$8(uncurryThis$8.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable$6(fn);
    return that === undefined ? fn : NATIVE_BIND$1 ? bind$3(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var call$h = functionCall;
  var anObject$g = anObject$j;
  var getMethod$6 = getMethod$8;

  var iteratorClose$4 = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$g(iterator);
    try {
      innerResult = getMethod$6(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = call$h(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$g(innerResult);
    return value;
  };

  var anObject$f = anObject$j;
  var iteratorClose$3 = iteratorClose$4;

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing$2 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$f(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose$3(iterator, 'throw', error);
    }
  };

  var iterators = {};

  var wellKnownSymbol$g = wellKnownSymbol$i;
  var Iterators$3 = iterators;

  var ITERATOR$5 = wellKnownSymbol$g('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$2 = function (it) {
    return it !== undefined && (Iterators$3.Array === it || ArrayPrototype[ITERATOR$5] === it);
  };

  var wellKnownSymbol$f = wellKnownSymbol$i;

  var TO_STRING_TAG$5 = wellKnownSymbol$f('toStringTag');
  var test = {};

  test[TO_STRING_TAG$5] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$8 = isCallable$j;
  var classofRaw = classofRaw$2;
  var wellKnownSymbol$e = wellKnownSymbol$i;

  var TO_STRING_TAG$4 = wellKnownSymbol$e('toStringTag');
  var $Object$1 = Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$6 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$4)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) === 'Object' && isCallable$8(O.callee) ? 'Arguments' : result;
  };

  var uncurryThis$7 = functionUncurryThis;
  var fails$b = fails$k;
  var isCallable$7 = isCallable$j;
  var classof$5 = classof$6;
  var getBuiltIn$4 = getBuiltIn$7;
  var inspectSource = inspectSource$2;

  var noop = function () { /* empty */ };
  var construct = getBuiltIn$4('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec$1 = uncurryThis$7(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable$7(argument)) return false;
    try {
      construct(noop, [], argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable$7(argument)) return false;
    switch (classof$5(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
    }
    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true;

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$3 = !construct || fails$b(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var DESCRIPTORS$2 = descriptors;
  var definePropertyModule$1 = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$4;

  var createProperty$3 = function (object, key, value) {
    if (DESCRIPTORS$2) definePropertyModule$1.f(object, key, createPropertyDescriptor$1(0, value));
    else object[key] = value;
  };

  var classof$4 = classof$6;
  var getMethod$5 = getMethod$8;
  var isNullOrUndefined$2 = isNullOrUndefined$5;
  var Iterators$2 = iterators;
  var wellKnownSymbol$d = wellKnownSymbol$i;

  var ITERATOR$4 = wellKnownSymbol$d('iterator');

  var getIteratorMethod$3 = function (it) {
    if (!isNullOrUndefined$2(it)) return getMethod$5(it, ITERATOR$4)
      || getMethod$5(it, '@@iterator')
      || Iterators$2[classof$4(it)];
  };

  var call$g = functionCall;
  var aCallable$5 = aCallable$8;
  var anObject$e = anObject$j;
  var tryToString$1 = tryToString$3;
  var getIteratorMethod$2 = getIteratorMethod$3;

  var $TypeError$6 = TypeError;

  var getIterator$2 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
    if (aCallable$5(iteratorMethod)) return anObject$e(call$g(iteratorMethod, argument));
    throw new $TypeError$6(tryToString$1(argument) + ' is not iterable');
  };

  var bind$2 = functionBindContext;
  var call$f = functionCall;
  var toObject$3 = toObject$5;
  var callWithSafeIterationClosing$1 = callWithSafeIterationClosing$2;
  var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
  var isConstructor$2 = isConstructor$3;
  var lengthOfArrayLike$3 = lengthOfArrayLike$5;
  var createProperty$2 = createProperty$3;
  var getIterator$1 = getIterator$2;
  var getIteratorMethod$1 = getIteratorMethod$3;

  var $Array$2 = Array;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject$3(arrayLike);
    var IS_CONSTRUCTOR = isConstructor$2(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = bind$2(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod$1(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this === $Array$2 && isArrayIteratorMethod$1(iteratorMethod))) {
      result = IS_CONSTRUCTOR ? new this() : [];
      iterator = getIterator$1(O, iteratorMethod);
      next = iterator.next;
      for (;!(step = call$f(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing$1(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty$2(result, index, value);
      }
    } else {
      length = lengthOfArrayLike$3(O);
      result = IS_CONSTRUCTOR ? new this(length) : $Array$2(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty$2(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var wellKnownSymbol$c = wellKnownSymbol$i;

  var ITERATOR$3 = wellKnownSymbol$c('iterator');
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
    iteratorWithReturn[ITERATOR$3] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
    try {
      if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    } catch (error) { return false; } // workaround of old WebKit + `eval` bug
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$3] = function () {
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

  var $$9 = _export;
  var from = arrayFrom;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  $$9({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: from
  });

  var classof$3 = classofRaw$2;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$2 = Array.isArray || function isArray(argument) {
    return classof$3(argument) === 'Array';
  };

  var isArray$1 = isArray$2;
  var isConstructor$1 = isConstructor$3;
  var isObject$6 = isObject$c;
  var wellKnownSymbol$b = wellKnownSymbol$i;

  var SPECIES$3 = wellKnownSymbol$b('species');
  var $Array$1 = Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;
    if (isArray$1(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor$1(C) && (C === $Array$1 || isArray$1(C.prototype))) C = undefined;
      else if (isObject$6(C)) {
        C = C[SPECIES$3];
        if (C === null) C = undefined;
      }
    } return C === undefined ? $Array$1 : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1;

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$1 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var bind$1 = functionBindContext;
  var uncurryThis$6 = functionUncurryThis;
  var IndexedObject = indexedObject;
  var toObject$2 = toObject$5;
  var lengthOfArrayLike$2 = lengthOfArrayLike$5;
  var arraySpeciesCreate = arraySpeciesCreate$1;

  var push$1 = uncurryThis$6([].push);

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod$2 = function (TYPE) {
    var IS_MAP = TYPE === 1;
    var IS_FILTER = TYPE === 2;
    var IS_SOME = TYPE === 3;
    var IS_EVERY = TYPE === 4;
    var IS_FIND_INDEX = TYPE === 6;
    var IS_FILTER_REJECT = TYPE === 7;
    var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$2($this);
      var self = IndexedObject(O);
      var length = lengthOfArrayLike$2(self);
      var boundFunction = bind$1(callbackfn, that);
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
            case 2: push$1(target, value);      // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push$1(target, value);      // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$2(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$2(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$2(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$2(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$2(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$2(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$2(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$2(7)
  };

  var fails$a = fails$k;
  var wellKnownSymbol$a = wellKnownSymbol$i;
  var V8_VERSION = engineV8Version;

  var SPECIES$2 = wellKnownSymbol$a('species');

  var arrayMethodHasSpeciesSupport$2 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION >= 51 || !fails$a(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$2] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$8 = _export;
  var $map = arrayIteration.map;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$2;

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  $$8({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var uncurryThis$5 = functionUncurryThis;

  var arraySlice = uncurryThis$5([].slice);

  var $$7 = _export;
  var isArray = isArray$2;
  var isConstructor = isConstructor$3;
  var isObject$5 = isObject$c;
  var toAbsoluteIndex = toAbsoluteIndex$2;
  var lengthOfArrayLike$1 = lengthOfArrayLike$5;
  var toIndexedObject$1 = toIndexedObject$5;
  var createProperty$1 = createProperty$3;
  var wellKnownSymbol$9 = wellKnownSymbol$i;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$2;
  var nativeSlice = arraySlice;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

  var SPECIES$1 = wellKnownSymbol$9('species');
  var $Array = Array;
  var max$1 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $$7({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    slice: function slice(start, end) {
      var O = toIndexedObject$1(this);
      var length = lengthOfArrayLike$1(O);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject$5(Constructor)) {
          Constructor = Constructor[SPECIES$1];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === $Array || Constructor === undefined) {
          return nativeSlice(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? $Array : Constructor)(max$1(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$2 = classof$6;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$2(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var defineBuiltIn$6 = defineBuiltIn$8;
  var toString$6 = objectToString;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    defineBuiltIn$6(Object.prototype, 'toString', toString$6, { unsafe: true });
  }

  var classof$1 = classof$6;

  var $String$1 = String;

  var toString$5 = function (argument) {
    if (classof$1(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
    return $String$1(argument);
  };

  var anObject$d = anObject$j;

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags$1 = function () {
    var that = anObject$d(this);
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

  var fails$9 = fails$k;
  var global$6 = global$g;

  // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var $RegExp$2 = global$6.RegExp;

  var UNSUPPORTED_Y$1 = fails$9(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') !== null;
  });

  // UC Browser bug
  // https://github.com/zloirock/core-js/issues/1008
  var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$9(function () {
    return !$RegExp$2('a', 'y').sticky;
  });

  var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$9(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') !== null;
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

  var DESCRIPTORS$1 = descriptors;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var definePropertyModule = objectDefineProperty;
  var anObject$c = anObject$j;
  var toIndexedObject = toIndexedObject$5;
  var objectKeys = objectKeys$1;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  objectDefineProperties.f = DESCRIPTORS$1 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$c(O);
    var props = toIndexedObject(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
    return O;
  };

  var getBuiltIn$3 = getBuiltIn$7;

  var html$1 = getBuiltIn$3('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */
  var anObject$b = anObject$j;
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
      EmptyConstructor[PROTOTYPE] = anObject$b(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
  };

  var fails$8 = fails$k;
  var global$5 = global$g;

  // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var $RegExp$1 = global$5.RegExp;

  var regexpUnsupportedDotAll = fails$8(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.test('\n') && re.flags === 's');
  });

  var fails$7 = fails$k;
  var global$4 = global$g;

  // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  var $RegExp = global$4.RegExp;

  var regexpUnsupportedNcg = fails$7(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' ||
      'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */
  var call$e = functionCall;
  var uncurryThis$4 = functionUncurryThis;
  var toString$4 = toString$5;
  var regexpFlags = regexpFlags$1;
  var stickyHelpers = regexpStickyHelpers;
  var shared$1 = shared$5;
  var create$3 = objectCreate;
  var getInternalState$1 = internalState.get;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;

  var nativeReplace = shared$1('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt$4 = uncurryThis$4(''.charAt);
  var indexOf = uncurryThis$4(''.indexOf);
  var replace$1 = uncurryThis$4(''.replace);
  var stringSlice$3 = uncurryThis$4(''.slice);

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    call$e(nativeExec, re1, 'a');
    call$e(nativeExec, re2, 'a');
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
      var str = toString$4(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = call$e(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y && re.sticky;
      var flags = call$e(regexpFlags, re);
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

      match = call$e(nativeExec, sticky ? reCopy : re, strCopy);

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
        call$e(nativeReplace, match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = create$3(null);
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
  var exec = regexpExec$2;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $$6({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
    exec: exec
  });

  var uncurryThis$3 = functionUncurryThis;
  var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
  var toString$3 = toString$5;
  var requireObjectCoercible$3 = requireObjectCoercible$6;

  var charAt$3 = uncurryThis$3(''.charAt);
  var charCodeAt = uncurryThis$3(''.charCodeAt);
  var stringSlice$2 = uncurryThis$3(''.slice);

  var createMethod$1 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$3(requireObjectCoercible$3($this));
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
    codeAt: createMethod$1(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$1(true)
  };

  var fails$6 = fails$k;

  var correctPrototypeGetter = !fails$6(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var hasOwn$3 = hasOwnProperty_1;
  var isCallable$6 = isCallable$j;
  var toObject$1 = toObject$5;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey('IE_PROTO');
  var $Object = Object;
  var ObjectPrototype = $Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
    var object = toObject$1(O);
    if (hasOwn$3(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$6(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof $Object ? ObjectPrototype : null;
  };

  var fails$5 = fails$k;
  var isCallable$5 = isCallable$j;
  var isObject$4 = isObject$c;
  var getPrototypeOf$3 = objectGetPrototypeOf;
  var defineBuiltIn$5 = defineBuiltIn$8;
  var wellKnownSymbol$8 = wellKnownSymbol$i;

  var ITERATOR$2 = wellKnownSymbol$8('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$4, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$3(getPrototypeOf$3(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$4 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = !isObject$4(IteratorPrototype$4) || fails$5(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$4[ITERATOR$2].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$4 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable$5(IteratorPrototype$4[ITERATOR$2])) {
    defineBuiltIn$5(IteratorPrototype$4, ITERATOR$2, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$4,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty$1 = objectDefineProperty.f;
  var hasOwn$2 = hasOwnProperty_1;
  var wellKnownSymbol$7 = wellKnownSymbol$i;

  var TO_STRING_TAG$3 = wellKnownSymbol$7('toStringTag');

  var setToStringTag$2 = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwn$2(target, TO_STRING_TAG$3)) {
      defineProperty$1(target, TO_STRING_TAG$3, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$3 = iteratorsCore.IteratorPrototype;
  var create$2 = objectCreate;
  var createPropertyDescriptor = createPropertyDescriptor$4;
  var setToStringTag$1 = setToStringTag$2;
  var Iterators$1 = iterators;

  var returnThis$1 = function () { return this; };

  var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$2(IteratorPrototype$3, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
    setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$1[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var uncurryThis$2 = functionUncurryThis;
  var aCallable$4 = aCallable$8;

  var functionUncurryThisAccessor = function (object, key, method) {
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      return uncurryThis$2(aCallable$4(Object.getOwnPropertyDescriptor(object, key)[method]));
    } catch (error) { /* empty */ }
  };

  var isObject$3 = isObject$c;

  var isPossiblePrototype$1 = function (argument) {
    return isObject$3(argument) || argument === null;
  };

  var isPossiblePrototype = isPossiblePrototype$1;

  var $String = String;
  var $TypeError$5 = TypeError;

  var aPossiblePrototype$1 = function (argument) {
    if (isPossiblePrototype(argument)) return argument;
    throw new $TypeError$5("Can't set " + $String(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */
  var uncurryThisAccessor = functionUncurryThisAccessor;
  var isObject$2 = isObject$c;
  var requireObjectCoercible$2 = requireObjectCoercible$6;
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
      requireObjectCoercible$2(O);
      aPossiblePrototype(proto);
      if (!isObject$2(O)) return O;
      if (CORRECT_SETTER) setter(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var $$5 = _export;
  var call$d = functionCall;
  var FunctionName = functionName;
  var isCallable$4 = isCallable$j;
  var createIteratorConstructor = iteratorCreateConstructor;
  var getPrototypeOf$2 = objectGetPrototypeOf;
  var setPrototypeOf = objectSetPrototypeOf;
  var setToStringTag = setToStringTag$2;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$7;
  var defineBuiltIn$4 = defineBuiltIn$8;
  var wellKnownSymbol$6 = wellKnownSymbol$i;
  var Iterators = iterators;
  var IteratorsCore = iteratorsCore;

  var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  var IteratorPrototype$2 = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1 = wellKnownSymbol$6('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      }

      return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$1]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf$2(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf$2(CurrentIteratorPrototype) !== IteratorPrototype$2) {
          if (setPrototypeOf) {
            setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
          } else if (!isCallable$4(CurrentIteratorPrototype[ITERATOR$1])) {
            defineBuiltIn$4(CurrentIteratorPrototype, ITERATOR$1, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME$1 && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME) {
        createNonEnumerableProperty$4(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return call$d(nativeIterator, this); };
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
          defineBuiltIn$4(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$5({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
      defineBuiltIn$4(IterablePrototype, ITERATOR$1, defaultIterator, { name: DEFAULT });
    }
    Iterators[NAME] = defaultIterator;

    return methods;
  };

  // `CreateIterResultObject` abstract operation
  // https://tc39.es/ecma262/#sec-createiterresultobject
  var createIterResultObject$4 = function (value, done) {
    return { value: value, done: done };
  };

  var charAt$2 = stringMultibyte.charAt;
  var toString$2 = toString$5;
  var InternalStateModule$2 = internalState;
  var defineIterator = iteratorDefine;
  var createIterResultObject$3 = createIterResultObject$4;

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$2 = InternalStateModule$2.set;
  var getInternalState = InternalStateModule$2.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState$2(this, {
      type: STRING_ITERATOR,
      string: toString$2(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return createIterResultObject$3(undefined, true);
    point = charAt$2(string, index);
    state.index += point.length;
    return createIterResultObject$3(point, false);
  });

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var call$c = functionCall;
  var defineBuiltIn$3 = defineBuiltIn$8;
  var regexpExec$1 = regexpExec$2;
  var fails$4 = fails$k;
  var wellKnownSymbol$5 = wellKnownSymbol$i;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$7;

  var SPECIES = wellKnownSymbol$5('species');
  var RegExpPrototype$2 = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$5(KEY);

    var DELEGATES_TO_SYMBOL = !fails$4(function () {
      // String methods call symbol-named RegExp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) !== 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$4(function () {
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
        re.constructor[SPECIES] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () {
        execCalled = true;
        return null;
      };

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
        if ($exec === regexpExec$1 || $exec === RegExpPrototype$2.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: call$c(nativeRegExpMethod, regexp, str, arg2) };
          }
          return { done: true, value: call$c(nativeMethod, str, regexp, arg2) };
        }
        return { done: false };
      });

      defineBuiltIn$3(String.prototype, KEY, methods[0]);
      defineBuiltIn$3(RegExpPrototype$2, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty$3(RegExpPrototype$2[SYMBOL], 'sham', true);
  };

  var charAt$1 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex$2 = function (S, index, unicode) {
    return index + (unicode ? charAt$1(S, index).length : 1);
  };

  var call$b = functionCall;
  var anObject$a = anObject$j;
  var isCallable$3 = isCallable$j;
  var classof = classofRaw$2;
  var regexpExec = regexpExec$2;

  var $TypeError$4 = TypeError;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (isCallable$3(exec)) {
      var result = call$b(exec, R, S);
      if (result !== null) anObject$a(result);
      return result;
    }
    if (classof(R) === 'RegExp') return call$b(regexpExec, R, S);
    throw new $TypeError$4('RegExp#exec called on incompatible receiver');
  };

  var call$a = functionCall;
  var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
  var anObject$9 = anObject$j;
  var isNullOrUndefined$1 = isNullOrUndefined$5;
  var toLength$1 = toLength$3;
  var toString$1 = toString$5;
  var requireObjectCoercible$1 = requireObjectCoercible$6;
  var getMethod$4 = getMethod$8;
  var advanceStringIndex$1 = advanceStringIndex$2;
  var regExpExec$1 = regexpExecAbstract;

  // @@match logic
  fixRegExpWellKnownSymbolLogic$1('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible$1(this);
        var matcher = isNullOrUndefined$1(regexp) ? undefined : getMethod$4(regexp, MATCH);
        return matcher ? call$a(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$1(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (string) {
        var rx = anObject$9(this);
        var S = toString$1(string);
        var res = maybeCallNative(nativeMatch, rx, S);

        if (res.done) return res.value;

        if (!rx.global) return regExpExec$1(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regExpExec$1(rx, S)) !== null) {
          var matchStr = toString$1(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  var NATIVE_BIND = functionBindNative;

  var FunctionPrototype = Function.prototype;
  var apply$1 = FunctionPrototype.apply;
  var call$9 = FunctionPrototype.call;

  // eslint-disable-next-line es/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$9.bind(apply$1) : function () {
    return call$9.apply(apply$1, arguments);
  });

  var uncurryThis$1 = functionUncurryThis;
  var toObject = toObject$5;

  var floor = Math.floor;
  var charAt = uncurryThis$1(''.charAt);
  var replace = uncurryThis$1(''.replace);
  var stringSlice$1 = uncurryThis$1(''.slice);
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
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace(replacement, symbols, function (match, ch) {
      var capture;
      switch (charAt(ch, 0)) {
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
            if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var apply = functionApply;
  var call$8 = functionCall;
  var uncurryThis = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var fails$3 = fails$k;
  var anObject$8 = anObject$j;
  var isCallable$2 = isCallable$j;
  var isNullOrUndefined = isNullOrUndefined$5;
  var toIntegerOrInfinity = toIntegerOrInfinity$4;
  var toLength = toLength$3;
  var toString = toString$5;
  var requireObjectCoercible = requireObjectCoercible$6;
  var advanceStringIndex = advanceStringIndex$2;
  var getMethod$3 = getMethod$8;
  var getSubstitution = getSubstitution$1;
  var regExpExec = regexpExecAbstract;
  var wellKnownSymbol$4 = wellKnownSymbol$i;

  var REPLACE = wellKnownSymbol$4('replace');
  var max = Math.max;
  var min = Math.min;
  var concat = uncurryThis([].concat);
  var push = uncurryThis([].push);
  var stringIndexOf = uncurryThis(''.indexOf);
  var stringSlice = uncurryThis(''.slice);

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

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$3(function () {
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
        var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod$3(searchValue, REPLACE);
        return replacer
          ? call$8(replacer, searchValue, O, replaceValue)
          : call$8(nativeReplace, toString(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject$8(this);
        var S = toString(string);

        if (
          typeof replaceValue == 'string' &&
          stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf(replaceValue, '$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
          if (res.done) return res.value;
        }

        var functionalReplace = isCallable$2(replaceValue);
        if (!functionalReplace) replaceValue = toString(replaceValue);

        var global = rx.global;
        var fullUnicode;
        if (global) {
          fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }

        var results = [];
        var result;
        while (true) {
          result = regExpExec(rx, S);
          if (result === null) break;

          push(results, result);
          if (!global) break;

          var matchStr = toString(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = toString(result[0]);
          var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
          var captures = [];
          var replacement;
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = concat([matched], captures, position, S);
            if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
            replacement = toString(apply(replaceValue, undefined, replacerArgs));
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

  var $TypeError$3 = TypeError;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

  var doesNotExceedSafeInteger$1 = function (it) {
    if (it > MAX_SAFE_INTEGER) throw $TypeError$3('Maximum allowed index exceeded');
    return it;
  };

  // `GetIteratorDirect(obj)` abstract operation
  // https://tc39.es/proposal-iterator-helpers/#sec-getiteratordirect
  var getIteratorDirect$4 = function (obj) {
    return {
      iterator: obj,
      next: obj.next,
      done: false
    };
  };

  var call$7 = functionCall;
  var getBuiltIn$2 = getBuiltIn$7;
  var getMethod$2 = getMethod$8;

  var asyncIteratorClose = function (iterator, method, argument, reject) {
    try {
      var returnMethod = getMethod$2(iterator, 'return');
      if (returnMethod) {
        return getBuiltIn$2('Promise').resolve(call$7(returnMethod, iterator)).then(function () {
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
  var call$6 = functionCall;
  var aCallable$3 = aCallable$8;
  var anObject$7 = anObject$j;
  var isObject$1 = isObject$c;
  var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
  var getBuiltIn$1 = getBuiltIn$7;
  var getIteratorDirect$3 = getIteratorDirect$4;
  var closeAsyncIteration$1 = asyncIteratorClose;

  var createMethod = function (TYPE) {
    var IS_TO_ARRAY = TYPE === 0;
    var IS_FOR_EACH = TYPE === 1;
    var IS_EVERY = TYPE === 2;
    var IS_SOME = TYPE === 3;
    return function (object, fn, target) {
      anObject$7(object);
      var MAPPING = fn !== undefined;
      if (MAPPING || !IS_TO_ARRAY) aCallable$3(fn);
      var record = getIteratorDirect$3(object);
      var Promise = getBuiltIn$1('Promise');
      var iterator = record.iterator;
      var next = record.next;
      var counter = 0;

      return new Promise(function (resolve, reject) {
        var ifAbruptCloseAsyncIterator = function (error) {
          closeAsyncIteration$1(iterator, reject, error, reject);
        };

        var loop = function () {
          try {
            if (MAPPING) try {
              doesNotExceedSafeInteger(counter);
            } catch (error5) { ifAbruptCloseAsyncIterator(error5); }
            Promise.resolve(anObject$7(call$6(next, iterator))).then(function (step) {
              try {
                if (anObject$7(step).done) {
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
                          $result ? loop() : closeAsyncIteration$1(iterator, resolve, false, reject);
                        } else if (IS_TO_ARRAY) {
                          try {
                            target[counter++] = $result;
                            loop();
                          } catch (error4) { ifAbruptCloseAsyncIterator(error4); }
                        } else {
                          $result ? closeAsyncIteration$1(iterator, resolve, IS_SOME || value, reject) : loop();
                        }
                      };

                      if (isObject$1(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
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
    toArray: createMethod(0),
    forEach: createMethod(1),
    every: createMethod(2),
    some: createMethod(3),
    find: createMethod(4)
  };

  var $$4 = _export;
  var $forEach$1 = asyncIteratorIteration.forEach;

  // `AsyncIterator.prototype.forEach` method
  // https://github.com/tc39/proposal-async-iterator-helpers
  $$4({ target: 'AsyncIterator', proto: true, real: true }, {
    forEach: function forEach(fn) {
      return $forEach$1(this, fn);
    }
  });

  var perform$1 = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  var defineBuiltIn$2 = defineBuiltIn$8;

  var defineBuiltIns$2 = function (target, src, options) {
    for (var key in src) defineBuiltIn$2(target, key, src[key], options);
    return target;
  };

  var global$3 = global$g;
  var shared = sharedStoreExports;
  var isCallable$1 = isCallable$j;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var defineBuiltIn$1 = defineBuiltIn$8;
  var wellKnownSymbol$3 = wellKnownSymbol$i;

  var USE_FUNCTION_CONSTRUCTOR = 'USE_FUNCTION_CONSTRUCTOR';
  var ASYNC_ITERATOR = wellKnownSymbol$3('asyncIterator');
  var AsyncIterator = global$3.AsyncIterator;
  var PassedAsyncIteratorPrototype = shared.AsyncIteratorPrototype;
  var AsyncIteratorPrototype$1, prototype;

  if (PassedAsyncIteratorPrototype) {
    AsyncIteratorPrototype$1 = PassedAsyncIteratorPrototype;
  } else if (isCallable$1(AsyncIterator)) {
    AsyncIteratorPrototype$1 = AsyncIterator.prototype;
  } else if (shared[USE_FUNCTION_CONSTRUCTOR] || global$3[USE_FUNCTION_CONSTRUCTOR]) {
    try {
      // eslint-disable-next-line no-new-func -- we have no alternatives without usage of modern syntax
      prototype = getPrototypeOf$1(getPrototypeOf$1(getPrototypeOf$1(Function('return async function*(){}()')())));
      if (getPrototypeOf$1(prototype) === Object.prototype) AsyncIteratorPrototype$1 = prototype;
    } catch (error) { /* empty */ }
  }

  if (!AsyncIteratorPrototype$1) AsyncIteratorPrototype$1 = {};

  if (!isCallable$1(AsyncIteratorPrototype$1[ASYNC_ITERATOR])) {
    defineBuiltIn$1(AsyncIteratorPrototype$1, ASYNC_ITERATOR, function () {
      return this;
    });
  }

  var asyncIteratorPrototype = AsyncIteratorPrototype$1;

  var call$5 = functionCall;
  var perform = perform$1;
  var anObject$6 = anObject$j;
  var create$1 = objectCreate;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$7;
  var defineBuiltIns$1 = defineBuiltIns$2;
  var wellKnownSymbol$2 = wellKnownSymbol$i;
  var InternalStateModule$1 = internalState;
  var getBuiltIn = getBuiltIn$7;
  var getMethod$1 = getMethod$8;
  var AsyncIteratorPrototype = asyncIteratorPrototype;
  var createIterResultObject$2 = createIterResultObject$4;
  var iteratorClose$2 = iteratorClose$4;

  var Promise$1 = getBuiltIn('Promise');

  var TO_STRING_TAG$2 = wellKnownSymbol$2('toStringTag');
  var ASYNC_ITERATOR_HELPER = 'AsyncIteratorHelper';
  var WRAP_FOR_VALID_ASYNC_ITERATOR = 'WrapForValidAsyncIterator';
  var setInternalState$1 = InternalStateModule$1.set;

  var createAsyncIteratorProxyPrototype = function (IS_ITERATOR) {
    var IS_GENERATOR = !IS_ITERATOR;
    var getInternalState = InternalStateModule$1.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ASYNC_ITERATOR : ASYNC_ITERATOR_HELPER);

    var getStateOrEarlyExit = function (that) {
      var stateCompletion = perform(function () {
        return getInternalState(that);
      });

      var stateError = stateCompletion.error;
      var state = stateCompletion.value;

      if (stateError || (IS_GENERATOR && state.done)) {
        return { exit: true, value: stateError ? Promise$1.reject(state) : Promise$1.resolve(createIterResultObject$2(undefined, true)) };
      } return { exit: false, value: state };
    };

    return defineBuiltIns$1(create$1(AsyncIteratorPrototype), {
      next: function next() {
        var stateCompletion = getStateOrEarlyExit(this);
        var state = stateCompletion.value;
        if (stateCompletion.exit) return state;
        var handlerCompletion = perform(function () {
          return anObject$6(state.nextHandler(Promise$1));
        });
        var handlerError = handlerCompletion.error;
        var value = handlerCompletion.value;
        if (handlerError) state.done = true;
        return handlerError ? Promise$1.reject(value) : Promise$1.resolve(value);
      },
      'return': function () {
        var stateCompletion = getStateOrEarlyExit(this);
        var state = stateCompletion.value;
        if (stateCompletion.exit) return state;
        state.done = true;
        var iterator = state.iterator;
        var returnMethod, result;
        var completion = perform(function () {
          if (state.inner) try {
            iteratorClose$2(state.inner.iterator, 'normal');
          } catch (error) {
            return iteratorClose$2(iterator, 'throw', error);
          }
          return getMethod$1(iterator, 'return');
        });
        returnMethod = result = completion.value;
        if (completion.error) return Promise$1.reject(result);
        if (returnMethod === undefined) return Promise$1.resolve(createIterResultObject$2(undefined, true));
        completion = perform(function () {
          return call$5(returnMethod, iterator);
        });
        result = completion.value;
        if (completion.error) return Promise$1.reject(result);
        return IS_ITERATOR ? Promise$1.resolve(result) : Promise$1.resolve(result).then(function (resolved) {
          anObject$6(resolved);
          return createIterResultObject$2(undefined, true);
        });
      }
    });
  };

  var WrapForValidAsyncIteratorPrototype = createAsyncIteratorProxyPrototype(true);
  var AsyncIteratorHelperPrototype = createAsyncIteratorProxyPrototype(false);

  createNonEnumerableProperty$2(AsyncIteratorHelperPrototype, TO_STRING_TAG$2, 'Async Iterator Helper');

  var asyncIteratorCreateProxy = function (nextHandler, IS_ITERATOR) {
    var AsyncIteratorProxy = function AsyncIterator(record, state) {
      if (state) {
        state.iterator = record.iterator;
        state.next = record.next;
      } else state = record;
      state.type = IS_ITERATOR ? WRAP_FOR_VALID_ASYNC_ITERATOR : ASYNC_ITERATOR_HELPER;
      state.nextHandler = nextHandler;
      state.counter = 0;
      state.done = false;
      setInternalState$1(this, state);
    };

    AsyncIteratorProxy.prototype = IS_ITERATOR ? WrapForValidAsyncIteratorPrototype : AsyncIteratorHelperPrototype;

    return AsyncIteratorProxy;
  };

  var call$4 = functionCall;
  var aCallable$2 = aCallable$8;
  var anObject$5 = anObject$j;
  var isObject = isObject$c;
  var getIteratorDirect$2 = getIteratorDirect$4;
  var createAsyncIteratorProxy = asyncIteratorCreateProxy;
  var createIterResultObject$1 = createIterResultObject$4;
  var closeAsyncIteration = asyncIteratorClose;

  var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise) {
    var state = this;
    var iterator = state.iterator;
    var mapper = state.mapper;

    return new Promise(function (resolve, reject) {
      var doneAndReject = function (error) {
        state.done = true;
        reject(error);
      };

      var ifAbruptCloseAsyncIterator = function (error) {
        closeAsyncIteration(iterator, doneAndReject, error, doneAndReject);
      };

      Promise.resolve(anObject$5(call$4(state.next, iterator))).then(function (step) {
        try {
          if (anObject$5(step).done) {
            state.done = true;
            resolve(createIterResultObject$1(undefined, true));
          } else {
            var value = step.value;
            try {
              var result = mapper(value, state.counter++);

              var handler = function (mapped) {
                resolve(createIterResultObject$1(mapped, false));
              };

              if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
              else handler(result);
            } catch (error2) { ifAbruptCloseAsyncIterator(error2); }
          }
        } catch (error) { doneAndReject(error); }
      }, doneAndReject);
    });
  });

  // `AsyncIterator.prototype.map` method
  // https://github.com/tc39/proposal-iterator-helpers
  var asyncIteratorMap = function map(mapper) {
    anObject$5(this);
    aCallable$2(mapper);
    return new AsyncIteratorProxy(getIteratorDirect$2(this), {
      mapper: mapper
    });
  };

  var $$3 = _export;
  var map$1 = asyncIteratorMap;
  var IS_PURE$1 = isPure;

  // `AsyncIterator.prototype.map` method
  // https://github.com/tc39/proposal-async-iterator-helpers
  $$3({ target: 'AsyncIterator', proto: true, real: true, forced: IS_PURE$1 }, {
    map: map$1
  });

  var isPrototypeOf$2 = objectIsPrototypeOf;

  var $TypeError$2 = TypeError;

  var anInstance$1 = function (it, Prototype) {
    if (isPrototypeOf$2(Prototype, it)) return it;
    throw new $TypeError$2('Incorrect invocation');
  };

  var makeBuiltIn = makeBuiltInExports;
  var defineProperty = objectDefineProperty;

  var defineBuiltInAccessor$1 = function (target, name, descriptor) {
    if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
    if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
    return defineProperty.f(target, name, descriptor);
  };

  var $$2 = _export;
  var global$2 = global$g;
  var anInstance = anInstance$1;
  var anObject$4 = anObject$j;
  var isCallable = isCallable$j;
  var getPrototypeOf = objectGetPrototypeOf;
  var defineBuiltInAccessor = defineBuiltInAccessor$1;
  var createProperty = createProperty$3;
  var fails$2 = fails$k;
  var hasOwn$1 = hasOwnProperty_1;
  var wellKnownSymbol$1 = wellKnownSymbol$i;
  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var DESCRIPTORS = descriptors;

  var CONSTRUCTOR = 'constructor';
  var ITERATOR = 'Iterator';
  var TO_STRING_TAG$1 = wellKnownSymbol$1('toStringTag');

  var $TypeError$1 = TypeError;
  var NativeIterator = global$2[ITERATOR];

  // FF56- have non-standard global helper `Iterator`
  var FORCED = !isCallable(NativeIterator)
    || NativeIterator.prototype !== IteratorPrototype$1
    // FF44- non-standard `Iterator` passes previous tests
    || !fails$2(function () { NativeIterator({}); });

  var IteratorConstructor = function Iterator() {
    anInstance(this, IteratorPrototype$1);
    if (getPrototypeOf(this) === IteratorPrototype$1) throw new $TypeError$1('Abstract class Iterator not directly constructable');
  };

  var defineIteratorPrototypeAccessor = function (key, value) {
    if (DESCRIPTORS) {
      defineBuiltInAccessor(IteratorPrototype$1, key, {
        configurable: true,
        get: function () {
          return value;
        },
        set: function (replacement) {
          anObject$4(this);
          if (this === IteratorPrototype$1) throw new $TypeError$1("You can't redefine this property");
          if (hasOwn$1(this, key)) this[key] = replacement;
          else createProperty(this, key, replacement);
        }
      });
    } else IteratorPrototype$1[key] = value;
  };

  if (!hasOwn$1(IteratorPrototype$1, TO_STRING_TAG$1)) defineIteratorPrototypeAccessor(TO_STRING_TAG$1, ITERATOR);

  if (FORCED || !hasOwn$1(IteratorPrototype$1, CONSTRUCTOR) || IteratorPrototype$1[CONSTRUCTOR] === Object) {
    defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
  }

  IteratorConstructor.prototype = IteratorPrototype$1;

  // `Iterator` constructor
  // https://github.com/tc39/proposal-iterator-helpers
  $$2({ global: true, constructor: true, forced: FORCED }, {
    Iterator: IteratorConstructor
  });

  var bind = functionBindContext;
  var call$3 = functionCall;
  var anObject$3 = anObject$j;
  var tryToString = tryToString$3;
  var isArrayIteratorMethod = isArrayIteratorMethod$2;
  var lengthOfArrayLike = lengthOfArrayLike$5;
  var isPrototypeOf$1 = objectIsPrototypeOf;
  var getIterator = getIterator$2;
  var getIteratorMethod = getIteratorMethod$3;
  var iteratorClose$1 = iteratorClose$4;

  var $TypeError = TypeError;

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
    var fn = bind(unboundFunction, that);
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
      iterFn = getIteratorMethod(iterable);
      if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && isPrototypeOf$1(ResultPrototype, result)) return result;
        } return new Result(false);
      }
      iterator = getIterator(iterable, iterFn);
    }

    next = IS_RECORD ? iterable.next : iterator.next;
    while (!(step = call$3(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose$1(iterator, 'throw', error);
      }
      if (typeof result == 'object' && result && isPrototypeOf$1(ResultPrototype, result)) return result;
    } return new Result(false);
  };

  var $$1 = _export;
  var iterate = iterate$1;
  var aCallable$1 = aCallable$8;
  var anObject$2 = anObject$j;
  var getIteratorDirect$1 = getIteratorDirect$4;

  // `Iterator.prototype.forEach` method
  // https://github.com/tc39/proposal-iterator-helpers
  $$1({ target: 'Iterator', proto: true, real: true }, {
    forEach: function forEach(fn) {
      anObject$2(this);
      aCallable$1(fn);
      var record = getIteratorDirect$1(this);
      var counter = 0;
      iterate(record, function (value) {
        fn(value, counter++);
      }, { IS_RECORD: true });
    }
  });

  var call$2 = functionCall;
  var create = objectCreate;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$7;
  var defineBuiltIns = defineBuiltIns$2;
  var wellKnownSymbol = wellKnownSymbol$i;
  var InternalStateModule = internalState;
  var getMethod = getMethod$8;
  var IteratorPrototype = iteratorsCore.IteratorPrototype;
  var createIterResultObject = createIterResultObject$4;
  var iteratorClose = iteratorClose$4;

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var ITERATOR_HELPER = 'IteratorHelper';
  var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
  var setInternalState = InternalStateModule.set;

  var createIteratorProxyPrototype = function (IS_ITERATOR) {
    var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

    return defineBuiltIns(create(IteratorPrototype), {
      next: function next() {
        var state = getInternalState(this);
        // for simplification:
        //   for `%WrapForValidIteratorPrototype%.next` our `nextHandler` returns `IterResultObject`
        //   for `%IteratorHelperPrototype%.next` - just a value
        if (IS_ITERATOR) return state.nextHandler();
        try {
          var result = state.done ? undefined : state.nextHandler();
          return createIterResultObject(result, state.done);
        } catch (error) {
          state.done = true;
          throw error;
        }
      },
      'return': function () {
        var state = getInternalState(this);
        var iterator = state.iterator;
        state.done = true;
        if (IS_ITERATOR) {
          var returnMethod = getMethod(iterator, 'return');
          return returnMethod ? call$2(returnMethod, iterator) : createIterResultObject(undefined, true);
        }
        if (state.inner) try {
          iteratorClose(state.inner.iterator, 'normal');
        } catch (error) {
          return iteratorClose(iterator, 'throw', error);
        }
        iteratorClose(iterator, 'normal');
        return createIterResultObject(undefined, true);
      }
    });
  };

  var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
  var IteratorHelperPrototype = createIteratorProxyPrototype(false);

  createNonEnumerableProperty$1(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');

  var iteratorCreateProxy = function (nextHandler, IS_ITERATOR) {
    var IteratorProxy = function Iterator(record, state) {
      if (state) {
        state.iterator = record.iterator;
        state.next = record.next;
      } else state = record;
      state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
      state.nextHandler = nextHandler;
      state.counter = 0;
      state.done = false;
      setInternalState(this, state);
    };

    IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

    return IteratorProxy;
  };

  var call$1 = functionCall;
  var aCallable = aCallable$8;
  var anObject$1 = anObject$j;
  var getIteratorDirect = getIteratorDirect$4;
  var createIteratorProxy = iteratorCreateProxy;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$2;

  var IteratorProxy = createIteratorProxy(function () {
    var iterator = this.iterator;
    var result = anObject$1(call$1(this.next, iterator));
    var done = this.done = !!result.done;
    if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
  });

  // `Iterator.prototype.map` method
  // https://github.com/tc39/proposal-iterator-helpers
  var iteratorMap = function map(mapper) {
    anObject$1(this);
    aCallable(mapper);
    return new IteratorProxy(getIteratorDirect(this), {
      mapper: mapper
    });
  };

  var $ = _export;
  var map = iteratorMap;
  var IS_PURE = isPure;

  // `Iterator.prototype.map` method
  // https://github.com/tc39/proposal-iterator-helpers
  $({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
    map: map
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

  var fails$1 = fails$k;

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

  var global$1 = global$g;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var forEach = arrayForEach;
  var createNonEnumerableProperty = createNonEnumerableProperty$7;

  var handlePrototype = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
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

  var call = functionCall;
  var hasOwn = hasOwnProperty_1;
  var isPrototypeOf = objectIsPrototypeOf;
  var regExpFlags = regexpFlags$1;

  var RegExpPrototype$1 = RegExp.prototype;

  var regexpGetFlags = function (R) {
    var flags = R.flags;
    return flags === undefined && !('flags' in RegExpPrototype$1) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype$1, R)
      ? call(regExpFlags, R) : flags;
  };

  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var defineBuiltIn = defineBuiltIn$8;
  var anObject = anObject$j;
  var $toString = toString$5;
  var fails = fails$k;
  var getRegExpFlags = regexpGetFlags;

  var TO_STRING = 'toString';
  var RegExpPrototype = RegExp.prototype;
  var nativeToString = RegExpPrototype[TO_STRING];

  var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name !== TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    defineBuiltIn(RegExpPrototype, TO_STRING, function toString() {
      var R = anObject(this);
      var pattern = $toString(R.source);
      var flags = $toString(getRegExpFlags(R));
      return '/' + pattern + '/' + flags;
    }, { unsafe: true });
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
    return _createClass(Time, [{
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
  }();
  /**
   * Time picker class
   */
  var MDTimePicker = /*#__PURE__*/function () {
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
    return _createClass(MDTimePicker, [{
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
        var isMouseDown = false;
        var hasStartingTouchElementChanged = false;
        var getDataSetFromHandElement = function getDataSetFromHandElement(el) {
          return (el.tagName === "SPAN" ? el.parentNode : el).dataset;
        };

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
          hour.mdtpTouchable = true;
          hourInner.mdtpTouchable = true;
          var onTouchStart = function onTouchStart(event) {
            var _event$target;
            event.preventDefault();
            isMouseDown = true;
            if (((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.mdtpTouchable) !== true) return;
            hasStartingTouchElementChanged = false;
            var _hour = parseInt(getDataSetFromHandElement(event.target).hour),
              _selectedT = _.selected.getPeriod(),
              _value = _.config.is24hour ? _hour : (_hour + (_selectedT === 'PM' && _hour < 12 || _selectedT === 'AM' && _hour === 12 ? 12 : 0)) % 24,
              disabled = _.isDisabled(_value, 0, true);
            if (disabled) return;
            _.setHour(_value);
          };
          var onTouchMove = function onTouchMove(event) {
            event.preventDefault();
            if (!isMouseDown) return;
            var touch = event.targetTouches[0];
            var target = document.elementFromPoint(touch.clientX, touch.clientY);
            if ((target === null || target === void 0 ? void 0 : target.mdtpTouchable) !== true) return;
            if (event.target !== target) hasStartingTouchElementChanged = true;
            var _hour = parseInt(getDataSetFromHandElement(target).hour),
              _selectedT = _.selected.getPeriod(),
              _value = _.config.is24hour ? _hour : (_hour + (_selectedT === 'PM' && _hour < 12 || _selectedT === 'AM' && _hour === 12 ? 12 : 0)) % 24,
              disabled = _.isDisabled(_value, 0, true);
            if (disabled) return;
            _.setHour(_value);
          };
          var onMouseMove = function onMouseMove(event) {
            if (!isMouseDown) return;
            var _hour = parseInt(getDataSetFromHandElement(event.target).hour),
              _selectedT = _.selected.getPeriod(),
              _value = _.config.is24hour ? _hour : (_hour + (_selectedT === 'PM' && _hour < 12 || _selectedT === 'AM' && _hour === 12 ? 12 : 0)) % 24,
              disabled = _.isDisabled(_value, 0, true);
            if (disabled) return;
            _.setHour(_value);
          };
          var onClick = function onClick(event) {
            var _hour = parseInt(getDataSetFromHandElement(event.target).hour),
              _selectedT = _.selected.getPeriod(),
              _value = _.config.is24hour ? _hour : (_hour + (_selectedT === 'PM' && _hour < 12 || _selectedT === 'AM' && _hour === 12 ? 12 : 0)) % 24,
              disabled = _.isDisabled(_value, 0, true);
            if (disabled) return;
            isMouseDown = false;
            _.setHour(_value);
            _._switchView('minutes');
          };
          var onTouchEnd = function onTouchEnd(event) {
            event.preventDefault();
            isMouseDown = false;
            if (!hasStartingTouchElementChanged) _._switchView('minutes');
          };
          hf.addEvent(hourInner, 'click', onClick);
          hf.addEvent(hourInner, 'mousemove', onMouseMove);
          hf.addEvent(hourInner, 'touchmove', onTouchMove);
          hf.addEvent(hourInner, 'touchstart', onTouchStart);
          hf.addEvent(hourInner, 'touchend', onTouchEnd);
          hf.addEvent(hour, 'click', onClick);
          hf.addEvent(hour, 'mousemove', onMouseMove);
          hf.addEvent(hour, 'touchmove', onTouchMove);
          hf.addEvent(hour, 'touchstart', onTouchStart);
          hf.addEvent(hour, 'touchend', onTouchEnd);
          hf.appendTo(hour, clock.clock.hours);
        }
        hf.addEvent(clock.clock.hours, 'mousedown', function () {
          isMouseDown = true;
        });
        hf.addEvent(clock.clock.hours, 'mouseup', function () {
          isMouseDown = false;
        });
        hf.addEvent(clock.clock.hours, 'touchstart', function () {
          isMouseDown = true;
          hasStartingTouchElementChanged = false;
        });
        hf.addEvent(clock.clock.hours, 'touchend', function () {
          isMouseDown = false;
        });

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
          minute.mdtpTouchable = true;
          minuteInner.mdtpTouchable = true;
          var onTouchMove = function onTouchMove(event) {
            event.preventDefault();
            if (!isMouseDown) return;
            var touch = event.touches[0];
            var target = document.elementFromPoint(touch.clientX, touch.clientY);
            if ((target === null || target === void 0 ? void 0 : target.mdtpTouchable) !== true) return;
            var _minute = parseInt(getDataSetFromHandElement(target).minute),
              _hour = _.selected.getHour(),
              disabled = _.isDisabled(_hour, _minute, true);
            if (disabled) return;
            _.setMinute(_minute);
          };
          var onMouseMove = function onMouseMove(event) {
            if (!isMouseDown) return;
            var _minute = parseInt(getDataSetFromHandElement(event.target).minute),
              _hour = _.selected.getHour(),
              disabled = _.isDisabled(_hour, _minute, true);
            if (disabled) return;
            _.setMinute(_minute);
          };
          var onClick = function onClick(event) {
            var _minute = parseInt(getDataSetFromHandElement(event.target).minute),
              _hour = _.selected.getHour(),
              disabled = _.isDisabled(_hour, _minute, true);
            if (disabled) return;
            _.setMinute(_minute);
            isMouseDown = false;
          };
          hf.addEvent(minuteInner, 'click', onClick);
          hf.addEvent(minuteInner, 'mousemove', onMouseMove);
          hf.addEvent(minuteInner, 'touchmove', onTouchMove);
          hf.addEvent(minute, 'mousemove', onMouseMove);
          hf.addEvent(minute, 'touchmove', onTouchMove);
          hf.appendTo(minute, clock.clock.minutes);
        }
        hf.addEvent(clock.clock.minutes, 'mousedown', function () {
          isMouseDown = true;
        });
        hf.addEvent(clock.clock.minutes, 'touchstart', function () {
          isMouseDown = true;
        });
        hf.addEvent(clock.clock.minutes, 'mouseup', function () {
          isMouseDown = false;
        });
        hf.addEvent(clock.clock.minutes, 'touchend', function () {
          isMouseDown = false;
        });

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
  }();
  /**
   * Time picker wrapper
   */
  /**
   * Default configurations
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

    // Allow for inspection or manipulation of the timepicker after configuration
    return Array.from(inputs).map(function (el) {
      return el[MDTP_DATA];
    });
  }
  mdtimepicker.defaults = function (configs) {
    MDTimePicker.default_configs = hf.extend(DEFAULTS, configs);
  };

  return mdtimepicker;

}));
