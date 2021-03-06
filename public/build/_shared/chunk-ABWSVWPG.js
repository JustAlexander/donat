import {
  __commonJS,
  __toESM,
  init_react
} from "/build/_shared/chunk-I5ORBN7C.js";

// node_modules/cross-fetch/dist/browser-ponyfill.js
var require_browser_ponyfill = __commonJS({
  "node_modules/cross-fetch/dist/browser-ponyfill.js"(exports, module) {
    init_react();
    var global = typeof self !== "undefined" ? self : exports;
    var __self__ = function() {
      function F() {
        this.fetch = false;
        this.DOMException = global.DOMException;
      }
      F.prototype = global;
      return new F();
    }();
    (function(self2) {
      var irrelevant = function(exports2) {
        var support = {
          searchParams: "URLSearchParams" in self2,
          iterable: "Symbol" in self2 && "iterator" in Symbol,
          blob: "FileReader" in self2 && "Blob" in self2 && function() {
            try {
              new Blob();
              return true;
            } catch (e) {
              return false;
            }
          }(),
          formData: "FormData" in self2,
          arrayBuffer: "ArrayBuffer" in self2
        };
        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ];
          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }
        function normalizeName(name) {
          if (typeof name !== "string") {
            name = String(name);
          }
          if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
            throw new TypeError("Invalid character in header field name");
          }
          return name.toLowerCase();
        }
        function normalizeValue(value) {
          if (typeof value !== "string") {
            value = String(value);
          }
          return value;
        }
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return { done: value === void 0, value };
            }
          };
          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }
          return iterator;
        }
        function Headers2(headers) {
          this.map = {};
          if (headers instanceof Headers2) {
            headers.forEach(function(value, name) {
              this.append(name, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name]);
            }, this);
          }
        }
        Headers2.prototype.append = function(name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue + ", " + value : value;
        };
        Headers2.prototype["delete"] = function(name) {
          delete this.map[normalizeName(name)];
        };
        Headers2.prototype.get = function(name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null;
        };
        Headers2.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers2.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value);
        };
        Headers2.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };
        Headers2.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push(name);
          });
          return iteratorFor(items);
        };
        Headers2.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items);
        };
        Headers2.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
          });
          return iteratorFor(items);
        };
        if (support.iterable) {
          Headers2.prototype[Symbol.iterator] = Headers2.prototype.entries;
        }
        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }
          body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }
        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }
        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise;
        }
        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars = new Array(view.length);
          for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i]);
          }
          return chars.join("");
        }
        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }
        function Body() {
          this.bodyUsed = false;
          this._initBody = function(body) {
            this._bodyInit = body;
            if (!body) {
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }
            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          };
          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };
            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
              } else {
                return this.blob().then(readBlobAsArrayBuffer);
              }
            };
          }
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode);
            };
          }
          this.json = function() {
            return this.text().then(JSON.parse);
          };
          return this;
        }
        var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request(input, options) {
          options = options || {};
          var body = options.body;
          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
              this.headers = new Headers2(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }
          this.credentials = options.credentials || this.credentials || "same-origin";
          if (options.headers || !this.headers) {
            this.headers = new Headers2(options.headers);
          }
          this.method = normalizeMethod(options.method || this.method || "GET");
          this.mode = options.mode || this.mode || null;
          this.signal = options.signal || this.signal;
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this._initBody(body);
        }
        Request.prototype.clone = function() {
          return new Request(this, { body: this._bodyInit });
        };
        function decode(body) {
          var form = new FormData();
          body.trim().split("&").forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split("=");
              var name = split.shift().replace(/\+/g, " ");
              var value = split.join("=").replace(/\+/g, " ");
              form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
          });
          return form;
        }
        function parseHeaders(rawHeaders) {
          var headers = new Headers2();
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(":");
            var key = parts.shift().trim();
            if (key) {
              var value = parts.join(":").trim();
              headers.append(key, value);
            }
          });
          return headers;
        }
        Body.call(Request.prototype);
        function Response(bodyInit, options) {
          if (!options) {
            options = {};
          }
          this.type = "default";
          this.status = options.status === void 0 ? 200 : options.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = "statusText" in options ? options.statusText : "OK";
          this.headers = new Headers2(options.headers);
          this.url = options.url || "";
          this._initBody(bodyInit);
        }
        Body.call(Response.prototype);
        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers2(this.headers),
            url: this.url
          });
        };
        Response.error = function() {
          var response = new Response(null, { status: 0, statusText: "" });
          response.type = "error";
          return response;
        };
        var redirectStatuses = [301, 302, 303, 307, 308];
        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }
          return new Response(null, { status, headers: { location: url } });
        };
        exports2.DOMException = self2.DOMException;
        try {
          new exports2.DOMException();
        } catch (err) {
          exports2.DOMException = function(message, name) {
            this.message = message;
            this.name = name;
            var error = Error(message);
            this.stack = error.stack;
          };
          exports2.DOMException.prototype = Object.create(Error.prototype);
          exports2.DOMException.prototype.constructor = exports2.DOMException;
        }
        function fetch(input, init) {
          return new Promise(function(resolve, reject) {
            var request = new Request(input, init);
            if (request.signal && request.signal.aborted) {
              return reject(new exports2.DOMException("Aborted", "AbortError"));
            }
            var xhr = new XMLHttpRequest();
            function abortXhr() {
              xhr.abort();
            }
            xhr.onload = function() {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
              };
              options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              resolve(new Response(body, options));
            };
            xhr.onerror = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.ontimeout = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.onabort = function() {
              reject(new exports2.DOMException("Aborted", "AbortError"));
            };
            xhr.open(request.method, request.url, true);
            if (request.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request.credentials === "omit") {
              xhr.withCredentials = false;
            }
            if ("responseType" in xhr && support.blob) {
              xhr.responseType = "blob";
            }
            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value);
            });
            if (request.signal) {
              request.signal.addEventListener("abort", abortXhr);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  request.signal.removeEventListener("abort", abortXhr);
                }
              };
            }
            xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
          });
        }
        fetch.polyfill = true;
        if (!self2.fetch) {
          self2.fetch = fetch;
          self2.Headers = Headers2;
          self2.Request = Request;
          self2.Response = Response;
        }
        exports2.Headers = Headers2;
        exports2.Request = Request;
        exports2.Response = Response;
        exports2.fetch = fetch;
        Object.defineProperty(exports2, "__esModule", { value: true });
        return exports2;
      }({});
    })(__self__);
    __self__.fetch.ponyfill = true;
    delete __self__.fetch.polyfill;
    var ctx = __self__;
    exports = ctx.fetch;
    exports.default = ctx.fetch;
    exports.fetch = ctx.fetch;
    exports.Headers = ctx.Headers;
    exports.Request = ctx.Request;
    exports.Response = ctx.Response;
    module.exports = exports;
  }
});

// node_modules/graphql/jsutils/nodejsCustomInspectSymbol.js
var require_nodejsCustomInspectSymbol = __commonJS({
  "node_modules/graphql/jsutils/nodejsCustomInspectSymbol.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var nodejsCustomInspectSymbol = typeof Symbol === "function" && typeof Symbol.for === "function" ? Symbol.for("nodejs.util.inspect.custom") : void 0;
    var _default = nodejsCustomInspectSymbol;
    exports.default = _default;
  }
});

// node_modules/graphql/jsutils/inspect.js
var require_inspect = __commonJS({
  "node_modules/graphql/jsutils/inspect.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = inspect;
    var _nodejsCustomInspectSymbol = _interopRequireDefault(require_nodejsCustomInspectSymbol());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    var MAX_ARRAY_LENGTH = 10;
    var MAX_RECURSIVE_DEPTH = 2;
    function inspect(value) {
      return formatValue(value, []);
    }
    function formatValue(value, seenValues) {
      switch (_typeof(value)) {
        case "string":
          return JSON.stringify(value);
        case "function":
          return value.name ? "[function ".concat(value.name, "]") : "[function]";
        case "object":
          if (value === null) {
            return "null";
          }
          return formatObjectValue(value, seenValues);
        default:
          return String(value);
      }
    }
    function formatObjectValue(value, previouslySeenValues) {
      if (previouslySeenValues.indexOf(value) !== -1) {
        return "[Circular]";
      }
      var seenValues = [].concat(previouslySeenValues, [value]);
      var customInspectFn = getCustomFn(value);
      if (customInspectFn !== void 0) {
        var customValue = customInspectFn.call(value);
        if (customValue !== value) {
          return typeof customValue === "string" ? customValue : formatValue(customValue, seenValues);
        }
      } else if (Array.isArray(value)) {
        return formatArray(value, seenValues);
      }
      return formatObject(value, seenValues);
    }
    function formatObject(object, seenValues) {
      var keys = Object.keys(object);
      if (keys.length === 0) {
        return "{}";
      }
      if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return "[" + getObjectTag(object) + "]";
      }
      var properties = keys.map(function(key) {
        var value = formatValue(object[key], seenValues);
        return key + ": " + value;
      });
      return "{ " + properties.join(", ") + " }";
    }
    function formatArray(array, seenValues) {
      if (array.length === 0) {
        return "[]";
      }
      if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return "[Array]";
      }
      var len = Math.min(MAX_ARRAY_LENGTH, array.length);
      var remaining = array.length - len;
      var items = [];
      for (var i = 0; i < len; ++i) {
        items.push(formatValue(array[i], seenValues));
      }
      if (remaining === 1) {
        items.push("... 1 more item");
      } else if (remaining > 1) {
        items.push("... ".concat(remaining, " more items"));
      }
      return "[" + items.join(", ") + "]";
    }
    function getCustomFn(object) {
      var customInspectFn = object[String(_nodejsCustomInspectSymbol.default)];
      if (typeof customInspectFn === "function") {
        return customInspectFn;
      }
      if (typeof object.inspect === "function") {
        return object.inspect;
      }
    }
    function getObjectTag(object) {
      var tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
      if (tag === "Object" && typeof object.constructor === "function") {
        var name = object.constructor.name;
        if (typeof name === "string" && name !== "") {
          return name;
        }
      }
      return tag;
    }
  }
});

// node_modules/graphql/jsutils/invariant.js
var require_invariant = __commonJS({
  "node_modules/graphql/jsutils/invariant.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = invariant;
    function invariant(condition, message) {
      var booleanCondition = Boolean(condition);
      if (!booleanCondition) {
        throw new Error(message != null ? message : "Unexpected invariant triggered.");
      }
    }
  }
});

// node_modules/graphql/jsutils/defineInspect.js
var require_defineInspect = __commonJS({
  "node_modules/graphql/jsutils/defineInspect.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = defineInspect;
    var _invariant = _interopRequireDefault(require_invariant());
    var _nodejsCustomInspectSymbol = _interopRequireDefault(require_nodejsCustomInspectSymbol());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function defineInspect(classObject) {
      var fn = classObject.prototype.toJSON;
      typeof fn === "function" || (0, _invariant.default)(0);
      classObject.prototype.inspect = fn;
      if (_nodejsCustomInspectSymbol.default) {
        classObject.prototype[_nodejsCustomInspectSymbol.default] = fn;
      }
    }
  }
});

// node_modules/graphql/language/ast.js
var require_ast = __commonJS({
  "node_modules/graphql/language/ast.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isNode = isNode;
    exports.Token = exports.Location = void 0;
    var _defineInspect = _interopRequireDefault(require_defineInspect());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var Location = /* @__PURE__ */ function() {
      function Location2(startToken, endToken, source) {
        this.start = startToken.start;
        this.end = endToken.end;
        this.startToken = startToken;
        this.endToken = endToken;
        this.source = source;
      }
      var _proto = Location2.prototype;
      _proto.toJSON = function toJSON() {
        return {
          start: this.start,
          end: this.end
        };
      };
      return Location2;
    }();
    exports.Location = Location;
    (0, _defineInspect.default)(Location);
    var Token = /* @__PURE__ */ function() {
      function Token2(kind, start, end, line, column, prev, value) {
        this.kind = kind;
        this.start = start;
        this.end = end;
        this.line = line;
        this.column = column;
        this.value = value;
        this.prev = prev;
        this.next = null;
      }
      var _proto2 = Token2.prototype;
      _proto2.toJSON = function toJSON() {
        return {
          kind: this.kind,
          value: this.value,
          line: this.line,
          column: this.column
        };
      };
      return Token2;
    }();
    exports.Token = Token;
    (0, _defineInspect.default)(Token);
    function isNode(maybeNode) {
      return maybeNode != null && typeof maybeNode.kind === "string";
    }
  }
});

// node_modules/graphql/language/visitor.js
var require_visitor = __commonJS({
  "node_modules/graphql/language/visitor.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.visit = visit;
    exports.visitInParallel = visitInParallel;
    exports.getVisitFn = getVisitFn;
    exports.BREAK = exports.QueryDocumentKeys = void 0;
    var _inspect = _interopRequireDefault(require_inspect());
    var _ast = require_ast();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var QueryDocumentKeys = {
      Name: [],
      Document: ["definitions"],
      OperationDefinition: ["name", "variableDefinitions", "directives", "selectionSet"],
      VariableDefinition: ["variable", "type", "defaultValue", "directives"],
      Variable: ["name"],
      SelectionSet: ["selections"],
      Field: ["alias", "name", "arguments", "directives", "selectionSet"],
      Argument: ["name", "value"],
      FragmentSpread: ["name", "directives"],
      InlineFragment: ["typeCondition", "directives", "selectionSet"],
      FragmentDefinition: [
        "name",
        "variableDefinitions",
        "typeCondition",
        "directives",
        "selectionSet"
      ],
      IntValue: [],
      FloatValue: [],
      StringValue: [],
      BooleanValue: [],
      NullValue: [],
      EnumValue: [],
      ListValue: ["values"],
      ObjectValue: ["fields"],
      ObjectField: ["name", "value"],
      Directive: ["name", "arguments"],
      NamedType: ["name"],
      ListType: ["type"],
      NonNullType: ["type"],
      SchemaDefinition: ["description", "directives", "operationTypes"],
      OperationTypeDefinition: ["type"],
      ScalarTypeDefinition: ["description", "name", "directives"],
      ObjectTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
      FieldDefinition: ["description", "name", "arguments", "type", "directives"],
      InputValueDefinition: ["description", "name", "type", "defaultValue", "directives"],
      InterfaceTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
      UnionTypeDefinition: ["description", "name", "directives", "types"],
      EnumTypeDefinition: ["description", "name", "directives", "values"],
      EnumValueDefinition: ["description", "name", "directives"],
      InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
      DirectiveDefinition: ["description", "name", "arguments", "locations"],
      SchemaExtension: ["directives", "operationTypes"],
      ScalarTypeExtension: ["name", "directives"],
      ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
      InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
      UnionTypeExtension: ["name", "directives", "types"],
      EnumTypeExtension: ["name", "directives", "values"],
      InputObjectTypeExtension: ["name", "directives", "fields"]
    };
    exports.QueryDocumentKeys = QueryDocumentKeys;
    var BREAK = Object.freeze({});
    exports.BREAK = BREAK;
    function visit(root, visitor) {
      var visitorKeys = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : QueryDocumentKeys;
      var stack = void 0;
      var inArray = Array.isArray(root);
      var keys = [root];
      var index = -1;
      var edits = [];
      var node = void 0;
      var key = void 0;
      var parent = void 0;
      var path = [];
      var ancestors = [];
      var newRoot = root;
      do {
        index++;
        var isLeaving = index === keys.length;
        var isEdited = isLeaving && edits.length !== 0;
        if (isLeaving) {
          key = ancestors.length === 0 ? void 0 : path[path.length - 1];
          node = parent;
          parent = ancestors.pop();
          if (isEdited) {
            if (inArray) {
              node = node.slice();
            } else {
              var clone = {};
              for (var _i2 = 0, _Object$keys2 = Object.keys(node); _i2 < _Object$keys2.length; _i2++) {
                var k = _Object$keys2[_i2];
                clone[k] = node[k];
              }
              node = clone;
            }
            var editOffset = 0;
            for (var ii = 0; ii < edits.length; ii++) {
              var editKey = edits[ii][0];
              var editValue = edits[ii][1];
              if (inArray) {
                editKey -= editOffset;
              }
              if (inArray && editValue === null) {
                node.splice(editKey, 1);
                editOffset++;
              } else {
                node[editKey] = editValue;
              }
            }
          }
          index = stack.index;
          keys = stack.keys;
          edits = stack.edits;
          inArray = stack.inArray;
          stack = stack.prev;
        } else {
          key = parent ? inArray ? index : keys[index] : void 0;
          node = parent ? parent[key] : newRoot;
          if (node === null || node === void 0) {
            continue;
          }
          if (parent) {
            path.push(key);
          }
        }
        var result = void 0;
        if (!Array.isArray(node)) {
          if (!(0, _ast.isNode)(node)) {
            throw new Error("Invalid AST Node: ".concat((0, _inspect.default)(node), "."));
          }
          var visitFn = getVisitFn(visitor, node.kind, isLeaving);
          if (visitFn) {
            result = visitFn.call(visitor, node, key, parent, path, ancestors);
            if (result === BREAK) {
              break;
            }
            if (result === false) {
              if (!isLeaving) {
                path.pop();
                continue;
              }
            } else if (result !== void 0) {
              edits.push([key, result]);
              if (!isLeaving) {
                if ((0, _ast.isNode)(result)) {
                  node = result;
                } else {
                  path.pop();
                  continue;
                }
              }
            }
          }
        }
        if (result === void 0 && isEdited) {
          edits.push([key, node]);
        }
        if (isLeaving) {
          path.pop();
        } else {
          var _visitorKeys$node$kin;
          stack = {
            inArray,
            index,
            keys,
            edits,
            prev: stack
          };
          inArray = Array.isArray(node);
          keys = inArray ? node : (_visitorKeys$node$kin = visitorKeys[node.kind]) !== null && _visitorKeys$node$kin !== void 0 ? _visitorKeys$node$kin : [];
          index = -1;
          edits = [];
          if (parent) {
            ancestors.push(parent);
          }
          parent = node;
        }
      } while (stack !== void 0);
      if (edits.length !== 0) {
        newRoot = edits[edits.length - 1][1];
      }
      return newRoot;
    }
    function visitInParallel(visitors) {
      var skipping = new Array(visitors.length);
      return {
        enter: function enter(node) {
          for (var i = 0; i < visitors.length; i++) {
            if (skipping[i] == null) {
              var fn = getVisitFn(visitors[i], node.kind, false);
              if (fn) {
                var result = fn.apply(visitors[i], arguments);
                if (result === false) {
                  skipping[i] = node;
                } else if (result === BREAK) {
                  skipping[i] = BREAK;
                } else if (result !== void 0) {
                  return result;
                }
              }
            }
          }
        },
        leave: function leave(node) {
          for (var i = 0; i < visitors.length; i++) {
            if (skipping[i] == null) {
              var fn = getVisitFn(visitors[i], node.kind, true);
              if (fn) {
                var result = fn.apply(visitors[i], arguments);
                if (result === BREAK) {
                  skipping[i] = BREAK;
                } else if (result !== void 0 && result !== false) {
                  return result;
                }
              }
            } else if (skipping[i] === node) {
              skipping[i] = null;
            }
          }
        }
      };
    }
    function getVisitFn(visitor, kind, isLeaving) {
      var kindVisitor = visitor[kind];
      if (kindVisitor) {
        if (!isLeaving && typeof kindVisitor === "function") {
          return kindVisitor;
        }
        var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;
        if (typeof kindSpecificVisitor === "function") {
          return kindSpecificVisitor;
        }
      } else {
        var specificVisitor = isLeaving ? visitor.leave : visitor.enter;
        if (specificVisitor) {
          if (typeof specificVisitor === "function") {
            return specificVisitor;
          }
          var specificKindVisitor = specificVisitor[kind];
          if (typeof specificKindVisitor === "function") {
            return specificKindVisitor;
          }
        }
      }
    }
  }
});

// node_modules/graphql/language/blockString.js
var require_blockString = __commonJS({
  "node_modules/graphql/language/blockString.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.dedentBlockStringValue = dedentBlockStringValue;
    exports.getBlockStringIndentation = getBlockStringIndentation;
    exports.printBlockString = printBlockString;
    function dedentBlockStringValue(rawString) {
      var lines = rawString.split(/\r\n|[\n\r]/g);
      var commonIndent = getBlockStringIndentation(rawString);
      if (commonIndent !== 0) {
        for (var i = 1; i < lines.length; i++) {
          lines[i] = lines[i].slice(commonIndent);
        }
      }
      var startLine = 0;
      while (startLine < lines.length && isBlank(lines[startLine])) {
        ++startLine;
      }
      var endLine = lines.length;
      while (endLine > startLine && isBlank(lines[endLine - 1])) {
        --endLine;
      }
      return lines.slice(startLine, endLine).join("\n");
    }
    function isBlank(str) {
      for (var i = 0; i < str.length; ++i) {
        if (str[i] !== " " && str[i] !== "	") {
          return false;
        }
      }
      return true;
    }
    function getBlockStringIndentation(value) {
      var _commonIndent;
      var isFirstLine = true;
      var isEmptyLine = true;
      var indent = 0;
      var commonIndent = null;
      for (var i = 0; i < value.length; ++i) {
        switch (value.charCodeAt(i)) {
          case 13:
            if (value.charCodeAt(i + 1) === 10) {
              ++i;
            }
          case 10:
            isFirstLine = false;
            isEmptyLine = true;
            indent = 0;
            break;
          case 9:
          case 32:
            ++indent;
            break;
          default:
            if (isEmptyLine && !isFirstLine && (commonIndent === null || indent < commonIndent)) {
              commonIndent = indent;
            }
            isEmptyLine = false;
        }
      }
      return (_commonIndent = commonIndent) !== null && _commonIndent !== void 0 ? _commonIndent : 0;
    }
    function printBlockString(value) {
      var indentation = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var preferMultipleLines = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      var isSingleLine = value.indexOf("\n") === -1;
      var hasLeadingSpace = value[0] === " " || value[0] === "	";
      var hasTrailingQuote = value[value.length - 1] === '"';
      var hasTrailingSlash = value[value.length - 1] === "\\";
      var printAsMultipleLines = !isSingleLine || hasTrailingQuote || hasTrailingSlash || preferMultipleLines;
      var result = "";
      if (printAsMultipleLines && !(isSingleLine && hasLeadingSpace)) {
        result += "\n" + indentation;
      }
      result += indentation ? value.replace(/\n/g, "\n" + indentation) : value;
      if (printAsMultipleLines) {
        result += "\n";
      }
      return '"""' + result.replace(/"""/g, '\\"""') + '"""';
    }
  }
});

// node_modules/graphql/language/printer.js
var require_printer = __commonJS({
  "node_modules/graphql/language/printer.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.print = print;
    var _visitor = require_visitor();
    var _blockString = require_blockString();
    function print(ast) {
      return (0, _visitor.visit)(ast, {
        leave: printDocASTReducer
      });
    }
    var MAX_LINE_LENGTH = 80;
    var printDocASTReducer = {
      Name: function Name(node) {
        return node.value;
      },
      Variable: function Variable(node) {
        return "$" + node.name;
      },
      Document: function Document(node) {
        return join(node.definitions, "\n\n") + "\n";
      },
      OperationDefinition: function OperationDefinition(node) {
        var op = node.operation;
        var name = node.name;
        var varDefs = wrap("(", join(node.variableDefinitions, ", "), ")");
        var directives = join(node.directives, " ");
        var selectionSet = node.selectionSet;
        return !name && !directives && !varDefs && op === "query" ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], " ");
      },
      VariableDefinition: function VariableDefinition(_ref) {
        var variable = _ref.variable, type = _ref.type, defaultValue = _ref.defaultValue, directives = _ref.directives;
        return variable + ": " + type + wrap(" = ", defaultValue) + wrap(" ", join(directives, " "));
      },
      SelectionSet: function SelectionSet(_ref2) {
        var selections = _ref2.selections;
        return block(selections);
      },
      Field: function Field(_ref3) {
        var alias = _ref3.alias, name = _ref3.name, args = _ref3.arguments, directives = _ref3.directives, selectionSet = _ref3.selectionSet;
        var prefix = wrap("", alias, ": ") + name;
        var argsLine = prefix + wrap("(", join(args, ", "), ")");
        if (argsLine.length > MAX_LINE_LENGTH) {
          argsLine = prefix + wrap("(\n", indent(join(args, "\n")), "\n)");
        }
        return join([argsLine, join(directives, " "), selectionSet], " ");
      },
      Argument: function Argument(_ref4) {
        var name = _ref4.name, value = _ref4.value;
        return name + ": " + value;
      },
      FragmentSpread: function FragmentSpread(_ref5) {
        var name = _ref5.name, directives = _ref5.directives;
        return "..." + name + wrap(" ", join(directives, " "));
      },
      InlineFragment: function InlineFragment(_ref6) {
        var typeCondition = _ref6.typeCondition, directives = _ref6.directives, selectionSet = _ref6.selectionSet;
        return join(["...", wrap("on ", typeCondition), join(directives, " "), selectionSet], " ");
      },
      FragmentDefinition: function FragmentDefinition(_ref7) {
        var name = _ref7.name, typeCondition = _ref7.typeCondition, variableDefinitions = _ref7.variableDefinitions, directives = _ref7.directives, selectionSet = _ref7.selectionSet;
        return "fragment ".concat(name).concat(wrap("(", join(variableDefinitions, ", "), ")"), " ") + "on ".concat(typeCondition, " ").concat(wrap("", join(directives, " "), " ")) + selectionSet;
      },
      IntValue: function IntValue(_ref8) {
        var value = _ref8.value;
        return value;
      },
      FloatValue: function FloatValue(_ref9) {
        var value = _ref9.value;
        return value;
      },
      StringValue: function StringValue(_ref10, key) {
        var value = _ref10.value, isBlockString = _ref10.block;
        return isBlockString ? (0, _blockString.printBlockString)(value, key === "description" ? "" : "  ") : JSON.stringify(value);
      },
      BooleanValue: function BooleanValue(_ref11) {
        var value = _ref11.value;
        return value ? "true" : "false";
      },
      NullValue: function NullValue() {
        return "null";
      },
      EnumValue: function EnumValue(_ref12) {
        var value = _ref12.value;
        return value;
      },
      ListValue: function ListValue(_ref13) {
        var values = _ref13.values;
        return "[" + join(values, ", ") + "]";
      },
      ObjectValue: function ObjectValue(_ref14) {
        var fields = _ref14.fields;
        return "{" + join(fields, ", ") + "}";
      },
      ObjectField: function ObjectField(_ref15) {
        var name = _ref15.name, value = _ref15.value;
        return name + ": " + value;
      },
      Directive: function Directive(_ref16) {
        var name = _ref16.name, args = _ref16.arguments;
        return "@" + name + wrap("(", join(args, ", "), ")");
      },
      NamedType: function NamedType(_ref17) {
        var name = _ref17.name;
        return name;
      },
      ListType: function ListType(_ref18) {
        var type = _ref18.type;
        return "[" + type + "]";
      },
      NonNullType: function NonNullType(_ref19) {
        var type = _ref19.type;
        return type + "!";
      },
      SchemaDefinition: addDescription(function(_ref20) {
        var directives = _ref20.directives, operationTypes = _ref20.operationTypes;
        return join(["schema", join(directives, " "), block(operationTypes)], " ");
      }),
      OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
        var operation = _ref21.operation, type = _ref21.type;
        return operation + ": " + type;
      },
      ScalarTypeDefinition: addDescription(function(_ref22) {
        var name = _ref22.name, directives = _ref22.directives;
        return join(["scalar", name, join(directives, " ")], " ");
      }),
      ObjectTypeDefinition: addDescription(function(_ref23) {
        var name = _ref23.name, interfaces = _ref23.interfaces, directives = _ref23.directives, fields = _ref23.fields;
        return join(["type", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
      }),
      FieldDefinition: addDescription(function(_ref24) {
        var name = _ref24.name, args = _ref24.arguments, type = _ref24.type, directives = _ref24.directives;
        return name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + ": " + type + wrap(" ", join(directives, " "));
      }),
      InputValueDefinition: addDescription(function(_ref25) {
        var name = _ref25.name, type = _ref25.type, defaultValue = _ref25.defaultValue, directives = _ref25.directives;
        return join([name + ": " + type, wrap("= ", defaultValue), join(directives, " ")], " ");
      }),
      InterfaceTypeDefinition: addDescription(function(_ref26) {
        var name = _ref26.name, interfaces = _ref26.interfaces, directives = _ref26.directives, fields = _ref26.fields;
        return join(["interface", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
      }),
      UnionTypeDefinition: addDescription(function(_ref27) {
        var name = _ref27.name, directives = _ref27.directives, types = _ref27.types;
        return join(["union", name, join(directives, " "), types && types.length !== 0 ? "= " + join(types, " | ") : ""], " ");
      }),
      EnumTypeDefinition: addDescription(function(_ref28) {
        var name = _ref28.name, directives = _ref28.directives, values = _ref28.values;
        return join(["enum", name, join(directives, " "), block(values)], " ");
      }),
      EnumValueDefinition: addDescription(function(_ref29) {
        var name = _ref29.name, directives = _ref29.directives;
        return join([name, join(directives, " ")], " ");
      }),
      InputObjectTypeDefinition: addDescription(function(_ref30) {
        var name = _ref30.name, directives = _ref30.directives, fields = _ref30.fields;
        return join(["input", name, join(directives, " "), block(fields)], " ");
      }),
      DirectiveDefinition: addDescription(function(_ref31) {
        var name = _ref31.name, args = _ref31.arguments, repeatable = _ref31.repeatable, locations = _ref31.locations;
        return "directive @" + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ");
      }),
      SchemaExtension: function SchemaExtension(_ref32) {
        var directives = _ref32.directives, operationTypes = _ref32.operationTypes;
        return join(["extend schema", join(directives, " "), block(operationTypes)], " ");
      },
      ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
        var name = _ref33.name, directives = _ref33.directives;
        return join(["extend scalar", name, join(directives, " ")], " ");
      },
      ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
        var name = _ref34.name, interfaces = _ref34.interfaces, directives = _ref34.directives, fields = _ref34.fields;
        return join(["extend type", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
      },
      InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
        var name = _ref35.name, interfaces = _ref35.interfaces, directives = _ref35.directives, fields = _ref35.fields;
        return join(["extend interface", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
      },
      UnionTypeExtension: function UnionTypeExtension(_ref36) {
        var name = _ref36.name, directives = _ref36.directives, types = _ref36.types;
        return join(["extend union", name, join(directives, " "), types && types.length !== 0 ? "= " + join(types, " | ") : ""], " ");
      },
      EnumTypeExtension: function EnumTypeExtension(_ref37) {
        var name = _ref37.name, directives = _ref37.directives, values = _ref37.values;
        return join(["extend enum", name, join(directives, " "), block(values)], " ");
      },
      InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
        var name = _ref38.name, directives = _ref38.directives, fields = _ref38.fields;
        return join(["extend input", name, join(directives, " "), block(fields)], " ");
      }
    };
    function addDescription(cb) {
      return function(node) {
        return join([node.description, cb(node)], "\n");
      };
    }
    function join(maybeArray) {
      var _maybeArray$filter$jo;
      var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter(function(x) {
        return x;
      }).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : "";
    }
    function block(array) {
      return wrap("{\n", indent(join(array, "\n")), "\n}");
    }
    function wrap(start, maybeString) {
      var end = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
      return maybeString != null && maybeString !== "" ? start + maybeString + end : "";
    }
    function indent(str) {
      return wrap("  ", str.replace(/\n/g, "\n  "));
    }
    function isMultiline(str) {
      return str.indexOf("\n") !== -1;
    }
    function hasMultilineItems(maybeArray) {
      return maybeArray != null && maybeArray.some(isMultiline);
    }
  }
});

// node_modules/graphql-request/node_modules/extract-files/public/ReactNativeFile.js
var require_ReactNativeFile = __commonJS({
  "node_modules/graphql-request/node_modules/extract-files/public/ReactNativeFile.js"(exports, module) {
    "use strict";
    init_react();
    module.exports = function ReactNativeFile(_ref) {
      var uri = _ref.uri, name = _ref.name, type = _ref.type;
      this.uri = uri;
      this.name = name;
      this.type = type;
    };
  }
});

// node_modules/graphql-request/node_modules/extract-files/public/isExtractableFile.js
var require_isExtractableFile = __commonJS({
  "node_modules/graphql-request/node_modules/extract-files/public/isExtractableFile.js"(exports, module) {
    "use strict";
    init_react();
    var ReactNativeFile = require_ReactNativeFile();
    module.exports = function isExtractableFile(value) {
      return typeof File !== "undefined" && value instanceof File || typeof Blob !== "undefined" && value instanceof Blob || value instanceof ReactNativeFile;
    };
  }
});

// node_modules/graphql-request/node_modules/extract-files/public/extractFiles.js
var require_extractFiles = __commonJS({
  "node_modules/graphql-request/node_modules/extract-files/public/extractFiles.js"(exports, module) {
    "use strict";
    init_react();
    var defaultIsExtractableFile = require_isExtractableFile();
    module.exports = function extractFiles(value, path, isExtractableFile) {
      if (path === void 0) {
        path = "";
      }
      if (isExtractableFile === void 0) {
        isExtractableFile = defaultIsExtractableFile;
      }
      var clone;
      var files = /* @__PURE__ */ new Map();
      function addFile(paths, file) {
        var storedPaths = files.get(file);
        if (storedPaths)
          storedPaths.push.apply(storedPaths, paths);
        else
          files.set(file, paths);
      }
      if (isExtractableFile(value)) {
        clone = null;
        addFile([path], value);
      } else {
        var prefix = path ? path + "." : "";
        if (typeof FileList !== "undefined" && value instanceof FileList)
          clone = Array.prototype.map.call(value, function(file, i2) {
            addFile(["" + prefix + i2], file);
            return null;
          });
        else if (Array.isArray(value))
          clone = value.map(function(child, i2) {
            var result2 = extractFiles(child, "" + prefix + i2, isExtractableFile);
            result2.files.forEach(addFile);
            return result2.clone;
          });
        else if (value && value.constructor === Object) {
          clone = {};
          for (var i in value) {
            var result = extractFiles(value[i], "" + prefix + i, isExtractableFile);
            result.files.forEach(addFile);
            clone[i] = result.clone;
          }
        } else
          clone = value;
      }
      return {
        clone,
        files
      };
    };
  }
});

// node_modules/graphql-request/node_modules/extract-files/public/index.js
var require_public = __commonJS({
  "node_modules/graphql-request/node_modules/extract-files/public/index.js"(exports) {
    "use strict";
    init_react();
    exports.ReactNativeFile = require_ReactNativeFile();
    exports.extractFiles = require_extractFiles();
    exports.isExtractableFile = require_isExtractableFile();
  }
});

// node_modules/graphql-request/node_modules/form-data/lib/browser.js
var require_browser = __commonJS({
  "node_modules/graphql-request/node_modules/form-data/lib/browser.js"(exports, module) {
    init_react();
    module.exports = typeof self == "object" ? self.FormData : window.FormData;
  }
});

// node_modules/graphql-request/dist/createRequestBody.js
var require_createRequestBody = __commonJS({
  "node_modules/graphql-request/dist/createRequestBody.js"(exports) {
    "use strict";
    init_react();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var extract_files_1 = require_public();
    var form_data_1 = __importDefault(require_browser());
    var isExtractableFileEnhanced = function(value) {
      return extract_files_1.isExtractableFile(value) || value !== null && typeof value === "object" && typeof value.pipe === "function";
    };
    function createRequestBody(query, variables, operationName) {
      var _a = extract_files_1.extractFiles({ query, variables, operationName }, "", isExtractableFileEnhanced), clone = _a.clone, files = _a.files;
      if (files.size === 0) {
        if (!Array.isArray(query)) {
          return JSON.stringify(clone);
        }
        if (typeof variables !== "undefined" && !Array.isArray(variables)) {
          throw new Error("Cannot create request body with given variable type, array expected");
        }
        var payload = query.reduce(function(accu, currentQuery, index) {
          accu.push({ query: currentQuery, variables: variables ? variables[index] : void 0 });
          return accu;
        }, []);
        return JSON.stringify(payload);
      }
      var Form = typeof FormData === "undefined" ? form_data_1.default : FormData;
      var form = new Form();
      form.append("operations", JSON.stringify(clone));
      var map = {};
      var i = 0;
      files.forEach(function(paths) {
        map[++i] = paths;
      });
      form.append("map", JSON.stringify(map));
      i = 0;
      files.forEach(function(paths, file) {
        form.append("" + ++i, file);
      });
      return form;
    }
    exports.default = createRequestBody;
  }
});

// node_modules/graphql-request/dist/parseArgs.js
var require_parseArgs = __commonJS({
  "node_modules/graphql-request/dist/parseArgs.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseBatchRequestsExtendedArgs = exports.parseRawRequestExtendedArgs = exports.parseRequestExtendedArgs = exports.parseBatchRequestArgs = exports.parseRawRequestArgs = exports.parseRequestArgs = void 0;
    function parseRequestArgs(documentOrOptions, variables, requestHeaders) {
      return documentOrOptions.document ? documentOrOptions : {
        document: documentOrOptions,
        variables,
        requestHeaders,
        signal: void 0
      };
    }
    exports.parseRequestArgs = parseRequestArgs;
    function parseRawRequestArgs(queryOrOptions, variables, requestHeaders) {
      return queryOrOptions.query ? queryOrOptions : {
        query: queryOrOptions,
        variables,
        requestHeaders,
        signal: void 0
      };
    }
    exports.parseRawRequestArgs = parseRawRequestArgs;
    function parseBatchRequestArgs(documentsOrOptions, requestHeaders) {
      return documentsOrOptions.documents ? documentsOrOptions : {
        documents: documentsOrOptions,
        requestHeaders,
        signal: void 0
      };
    }
    exports.parseBatchRequestArgs = parseBatchRequestArgs;
    function parseRequestExtendedArgs(urlOrOptions, document, variables, requestHeaders) {
      return urlOrOptions.document ? urlOrOptions : {
        url: urlOrOptions,
        document,
        variables,
        requestHeaders,
        signal: void 0
      };
    }
    exports.parseRequestExtendedArgs = parseRequestExtendedArgs;
    function parseRawRequestExtendedArgs(urlOrOptions, query, variables, requestHeaders) {
      return urlOrOptions.query ? urlOrOptions : {
        url: urlOrOptions,
        query,
        variables,
        requestHeaders,
        signal: void 0
      };
    }
    exports.parseRawRequestExtendedArgs = parseRawRequestExtendedArgs;
    function parseBatchRequestsExtendedArgs(urlOrOptions, documents, requestHeaders) {
      return urlOrOptions.documents ? urlOrOptions : {
        url: urlOrOptions,
        documents,
        requestHeaders,
        signal: void 0
      };
    }
    exports.parseBatchRequestsExtendedArgs = parseBatchRequestsExtendedArgs;
  }
});

// node_modules/graphql-request/dist/types.js
var require_types = __commonJS({
  "node_modules/graphql-request/dist/types.js"(exports) {
    "use strict";
    init_react();
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClientError = void 0;
    var ClientError = function(_super) {
      __extends(ClientError2, _super);
      function ClientError2(response, request) {
        var _this = this;
        var message = ClientError2.extractMessage(response) + ": " + JSON.stringify({
          response,
          request
        });
        _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, ClientError2.prototype);
        _this.response = response;
        _this.request = request;
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(_this, ClientError2);
        }
        return _this;
      }
      ClientError2.extractMessage = function(response) {
        try {
          return response.errors[0].message;
        } catch (e) {
          return "GraphQL Error (Code: " + response.status + ")";
        }
      };
      return ClientError2;
    }(Error);
    exports.ClientError = ClientError;
  }
});

// node_modules/graphql-request/dist/index.js
var require_dist = __commonJS({
  "node_modules/graphql-request/dist/index.js"(exports) {
    "use strict";
    init_react();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gql = exports.batchRequests = exports.request = exports.rawRequest = exports.GraphQLClient = exports.ClientError = void 0;
    var cross_fetch_1 = __importStar(require_browser_ponyfill());
    var CrossFetch = cross_fetch_1;
    var printer_1 = require_printer();
    var createRequestBody_1 = __importDefault(require_createRequestBody());
    var parseArgs_1 = require_parseArgs();
    var types_1 = require_types();
    Object.defineProperty(exports, "ClientError", { enumerable: true, get: function() {
      return types_1.ClientError;
    } });
    var resolveHeaders = function(headers) {
      var oHeaders = {};
      if (headers) {
        if (typeof Headers !== "undefined" && headers instanceof Headers || headers instanceof CrossFetch.Headers) {
          oHeaders = HeadersInstanceToPlainObject(headers);
        } else if (Array.isArray(headers)) {
          headers.forEach(function(_a) {
            var name = _a[0], value = _a[1];
            oHeaders[name] = value;
          });
        } else {
          oHeaders = headers;
        }
      }
      return oHeaders;
    };
    var queryCleanner = function(str) {
      return str.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    };
    var buildGetQueryParams = function(_a) {
      var query = _a.query, variables = _a.variables, operationName = _a.operationName;
      if (!Array.isArray(query)) {
        var search = ["query=" + encodeURIComponent(queryCleanner(query))];
        if (variables) {
          search.push("variables=" + encodeURIComponent(JSON.stringify(variables)));
        }
        if (operationName) {
          search.push("operationName=" + encodeURIComponent(operationName));
        }
        return search.join("&");
      }
      if (typeof variables !== "undefined" && !Array.isArray(variables)) {
        throw new Error("Cannot create query with given variable type, array expected");
      }
      var payload = query.reduce(function(accu, currentQuery, index) {
        accu.push({
          query: queryCleanner(currentQuery),
          variables: variables ? JSON.stringify(variables[index]) : void 0
        });
        return accu;
      }, []);
      return "query=" + encodeURIComponent(JSON.stringify(payload));
    };
    var post = function(_a) {
      var url = _a.url, query = _a.query, variables = _a.variables, operationName = _a.operationName, headers = _a.headers, fetch = _a.fetch, fetchOptions = _a.fetchOptions;
      return __awaiter(void 0, void 0, void 0, function() {
        var body;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              body = createRequestBody_1.default(query, variables, operationName);
              return [4, fetch(url, __assign({ method: "POST", headers: __assign(__assign({}, typeof body === "string" ? { "Content-Type": "application/json" } : {}), headers), body }, fetchOptions))];
            case 1:
              return [2, _b.sent()];
          }
        });
      });
    };
    var get = function(_a) {
      var url = _a.url, query = _a.query, variables = _a.variables, operationName = _a.operationName, headers = _a.headers, fetch = _a.fetch, fetchOptions = _a.fetchOptions;
      return __awaiter(void 0, void 0, void 0, function() {
        var queryParams;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              queryParams = buildGetQueryParams({
                query,
                variables,
                operationName
              });
              return [4, fetch(url + "?" + queryParams, __assign({ method: "GET", headers }, fetchOptions))];
            case 1:
              return [2, _b.sent()];
          }
        });
      });
    };
    var GraphQLClient2 = function() {
      function GraphQLClient3(url, options) {
        this.url = url;
        this.options = options || {};
      }
      GraphQLClient3.prototype.rawRequest = function(queryOrOptions, variables, requestHeaders) {
        return __awaiter(this, void 0, void 0, function() {
          var rawRequestOptions, _a, headers, _b, fetch, _c, method, fetchOptions, url;
          return __generator(this, function(_d) {
            rawRequestOptions = parseArgs_1.parseRawRequestArgs(queryOrOptions, variables, requestHeaders);
            _a = this.options, headers = _a.headers, _b = _a.fetch, fetch = _b === void 0 ? cross_fetch_1.default : _b, _c = _a.method, method = _c === void 0 ? "POST" : _c, fetchOptions = __rest(_a, ["headers", "fetch", "method"]);
            url = this.url;
            if (rawRequestOptions.signal !== void 0) {
              fetchOptions.signal = rawRequestOptions.signal;
            }
            return [2, makeRequest({
              url,
              query: rawRequestOptions.query,
              variables: rawRequestOptions.variables,
              headers: __assign(__assign({}, resolveHeaders(headers)), resolveHeaders(rawRequestOptions.requestHeaders)),
              operationName: void 0,
              fetch,
              method,
              fetchOptions
            })];
          });
        });
      };
      GraphQLClient3.prototype.request = function(documentOrOptions, variables, requestHeaders) {
        return __awaiter(this, void 0, void 0, function() {
          var requestOptions, _a, headers, _b, fetch, _c, method, fetchOptions, url, _d, query, operationName, data;
          return __generator(this, function(_e) {
            switch (_e.label) {
              case 0:
                requestOptions = parseArgs_1.parseRequestArgs(documentOrOptions, variables, requestHeaders);
                _a = this.options, headers = _a.headers, _b = _a.fetch, fetch = _b === void 0 ? cross_fetch_1.default : _b, _c = _a.method, method = _c === void 0 ? "POST" : _c, fetchOptions = __rest(_a, ["headers", "fetch", "method"]);
                url = this.url;
                if (requestOptions.signal !== void 0) {
                  fetchOptions.signal = requestOptions.signal;
                }
                _d = resolveRequestDocument(requestOptions.document), query = _d.query, operationName = _d.operationName;
                return [4, makeRequest({
                  url,
                  query,
                  variables: requestOptions.variables,
                  headers: __assign(__assign({}, resolveHeaders(headers)), resolveHeaders(requestOptions.requestHeaders)),
                  operationName,
                  fetch,
                  method,
                  fetchOptions
                })];
              case 1:
                data = _e.sent().data;
                return [2, data];
            }
          });
        });
      };
      GraphQLClient3.prototype.batchRequests = function(documentsOrOptions, requestHeaders) {
        return __awaiter(this, void 0, void 0, function() {
          var batchRequestOptions, _a, headers, _b, fetch, _c, method, fetchOptions, url, queries, variables, data;
          return __generator(this, function(_d) {
            switch (_d.label) {
              case 0:
                batchRequestOptions = parseArgs_1.parseBatchRequestArgs(documentsOrOptions, requestHeaders);
                _a = this.options, headers = _a.headers, _b = _a.fetch, fetch = _b === void 0 ? cross_fetch_1.default : _b, _c = _a.method, method = _c === void 0 ? "POST" : _c, fetchOptions = __rest(_a, ["headers", "fetch", "method"]);
                url = this.url;
                if (batchRequestOptions.signal !== void 0) {
                  fetchOptions.signal = batchRequestOptions.signal;
                }
                queries = batchRequestOptions.documents.map(function(_a2) {
                  var document = _a2.document;
                  return resolveRequestDocument(document).query;
                });
                variables = batchRequestOptions.documents.map(function(_a2) {
                  var variables2 = _a2.variables;
                  return variables2;
                });
                return [4, makeRequest({
                  url,
                  query: queries,
                  variables,
                  headers: __assign(__assign({}, resolveHeaders(headers)), resolveHeaders(batchRequestOptions.requestHeaders)),
                  operationName: void 0,
                  fetch,
                  method,
                  fetchOptions
                })];
              case 1:
                data = _d.sent().data;
                return [2, data];
            }
          });
        });
      };
      GraphQLClient3.prototype.setHeaders = function(headers) {
        this.options.headers = headers;
        return this;
      };
      GraphQLClient3.prototype.setHeader = function(key, value) {
        var _a;
        var headers = this.options.headers;
        if (headers) {
          headers[key] = value;
        } else {
          this.options.headers = (_a = {}, _a[key] = value, _a);
        }
        return this;
      };
      GraphQLClient3.prototype.setEndpoint = function(value) {
        this.url = value;
        return this;
      };
      return GraphQLClient3;
    }();
    exports.GraphQLClient = GraphQLClient2;
    function makeRequest(_a) {
      var url = _a.url, query = _a.query, variables = _a.variables, headers = _a.headers, operationName = _a.operationName, fetch = _a.fetch, _b = _a.method, method = _b === void 0 ? "POST" : _b, fetchOptions = _a.fetchOptions;
      return __awaiter(this, void 0, void 0, function() {
        var fetcher, isBathchingQuery, response, result, successfullyReceivedData, headers_1, status_1, errorResult;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              fetcher = method.toUpperCase() === "POST" ? post : get;
              isBathchingQuery = Array.isArray(query);
              return [4, fetcher({
                url,
                query,
                variables,
                operationName,
                headers,
                fetch,
                fetchOptions
              })];
            case 1:
              response = _c.sent();
              return [4, getResult(response)];
            case 2:
              result = _c.sent();
              successfullyReceivedData = isBathchingQuery && Array.isArray(result) ? !result.some(function(_a2) {
                var data = _a2.data;
                return !data;
              }) : !!result.data;
              if (response.ok && !result.errors && successfullyReceivedData) {
                headers_1 = response.headers, status_1 = response.status;
                return [2, __assign(__assign({}, isBathchingQuery ? { data: result } : result), { headers: headers_1, status: status_1 })];
              } else {
                errorResult = typeof result === "string" ? { error: result } : result;
                throw new types_1.ClientError(__assign(__assign({}, errorResult), { status: response.status, headers: response.headers }), { query, variables });
              }
              return [2];
          }
        });
      });
    }
    function rawRequest(urlOrOptions, query, variables, requestHeaders) {
      return __awaiter(this, void 0, void 0, function() {
        var requestOptions, client;
        return __generator(this, function(_a) {
          requestOptions = parseArgs_1.parseRawRequestExtendedArgs(urlOrOptions, query, variables, requestHeaders);
          client = new GraphQLClient2(requestOptions.url);
          return [2, client.rawRequest(__assign({}, requestOptions))];
        });
      });
    }
    exports.rawRequest = rawRequest;
    function request(urlOrOptions, document, variables, requestHeaders) {
      return __awaiter(this, void 0, void 0, function() {
        var requestOptions, client;
        return __generator(this, function(_a) {
          requestOptions = parseArgs_1.parseRequestExtendedArgs(urlOrOptions, document, variables, requestHeaders);
          client = new GraphQLClient2(requestOptions.url);
          return [2, client.request(__assign({}, requestOptions))];
        });
      });
    }
    exports.request = request;
    function batchRequests(urlOrOptions, documents, requestHeaders) {
      return __awaiter(this, void 0, void 0, function() {
        var requestOptions, client;
        return __generator(this, function(_a) {
          requestOptions = parseArgs_1.parseBatchRequestsExtendedArgs(urlOrOptions, documents, requestHeaders);
          client = new GraphQLClient2(requestOptions.url);
          return [2, client.batchRequests(__assign({}, requestOptions))];
        });
      });
    }
    exports.batchRequests = batchRequests;
    exports.default = request;
    function getResult(response) {
      var contentType = response.headers.get("Content-Type");
      if (contentType && contentType.startsWith("application/json")) {
        return response.json();
      } else {
        return response.text();
      }
    }
    function resolveRequestDocument(document) {
      var _a;
      if (typeof document === "string")
        return { query: document };
      var operationName = void 0;
      var operationDefinitions = document.definitions.filter(function(definition) {
        return definition.kind === "OperationDefinition";
      });
      if (operationDefinitions.length === 1) {
        operationName = (_a = operationDefinitions[0].name) === null || _a === void 0 ? void 0 : _a.value;
      }
      return { query: printer_1.print(document), operationName };
    }
    function gql(chunks) {
      var variables = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        variables[_i - 1] = arguments[_i];
      }
      return chunks.reduce(function(accumulator, chunk, index) {
        return "" + accumulator + chunk + (index in variables ? variables[index] : "");
      }, "");
    }
    exports.gql = gql;
    function HeadersInstanceToPlainObject(headers) {
      var o = {};
      headers.forEach(function(v, k) {
        o[k] = v;
      });
      return o;
    }
  }
});

// app/clients.ts
init_react();
var import_graphql_request = __toESM(require_dist());
var CATALOGUE_API_URL = `https://api.crystallize.com/dounot/catalogue`;
var catalogueClient = new import_graphql_request.GraphQLClient(CATALOGUE_API_URL);
var serviceAPIClient = new import_graphql_request.GraphQLClient(`https://product-storytelling-service-api.vercel.app/api/graphql`, {
  credentials: "include",
  mode: "cors"
});

export {
  serviceAPIClient
};
//# sourceMappingURL=/build/_shared/chunk-ABWSVWPG.js.map
