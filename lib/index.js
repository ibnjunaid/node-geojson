"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoJSON = exports.createFromObject = exports.createUsingFile = exports.FeatureCollection = void 0;
var fs = __importStar(require("fs/promises"));
var geometryTypes;
(function (geometryTypes) {
    geometryTypes["Point"] = "POINT";
    geometryTypes["MultiPoint"] = "MULTIPOINT";
    geometryTypes["LineString"] = "LINESTRING";
    geometryTypes["MultiLineString"] = "MULTILINESTRING";
    geometryTypes["Polygon"] = "POLYGON";
    geometryTypes["MultiPolygon"] = "MULTIPOLYGON";
    geometryTypes["GeometryCollection"] = "GEOMETRYCOLLECTION";
})(geometryTypes || (geometryTypes = {}));
var collectionTypes;
(function (collectionTypes) {
    collectionTypes["Feature"] = "FEATURE";
    collectionTypes["FeatureCollection"] = "FEATURECOLLECTION";
})(collectionTypes || (collectionTypes = {}));
var FeatureCollection = /** @class */ (function () {
    function FeatureCollection(x, filePath) {
        var _this = this;
        this.Find = function (feature) {
            var _a, _b;
            if (feature === undefined) {
                return _this.data.features;
            }
            else if (((_a = feature.geometry) === null || _a === void 0 ? void 0 : _a.type) === null && feature.properties === null) {
                return _this.data.features;
            }
            else if (((_b = feature.geometry) === null || _b === void 0 ? void 0 : _b.type) === null) {
                return _this.FindByProperty((feature === null || feature === void 0 ? void 0 : feature.properties) || {});
            }
            else if (feature.properties === null) {
                return _this.FindByGeometry((feature === null || feature === void 0 ? void 0 : feature.geometry) || {});
            }
            else {
                return _this.data.features.filter(function (f) {
                    var _a;
                    if (f.geometry.type !== ((_a = feature.geometry) === null || _a === void 0 ? void 0 : _a.type)) {
                        return false;
                    }
                    else {
                        for (var _i = 0, _b = Object.entries((feature === null || feature === void 0 ? void 0 : feature.properties) || {}); _i < _b.length; _i++) {
                            var _c = _b[_i], key = _c[0], value = _c[1];
                            if (f.properties[key] != value) {
                                return false;
                            }
                        }
                        return true;
                    }
                });
            }
        };
        this.FindByProperty = function (x) {
            return _this.data.features.filter(function (f) {
                for (var _i = 0, _a = Object.entries(x); _i < _a.length; _i++) {
                    var _b = _a[_i], key = _b[0], value = _b[1];
                    if (f.properties[key] != value) {
                        return false;
                    }
                }
                return true;
            });
        };
        this.FindByGeometry = function (d) {
            return _this.data.features.filter(function (f) { return f.geometry.type === (d === null || d === void 0 ? void 0 : d.type); });
        };
        this.remove = function (feature) {
            if (feature.geometry === undefined) {
                return _this.findAndremoveByProperty((feature === null || feature === void 0 ? void 0 : feature.properties) || {});
            }
            else if (feature.properties === undefined) {
                return _this.findAndremoveByGeometry(feature.geometry);
            }
            else {
                return _this.data.features.filter(function (f) {
                    var _a;
                    if (f.geometry.type !== ((_a = feature.geometry) === null || _a === void 0 ? void 0 : _a.type)) {
                        return true;
                    }
                    else {
                        for (var _i = 0, _b = Object.entries((feature === null || feature === void 0 ? void 0 : feature.properties) || {}); _i < _b.length; _i++) {
                            var _c = _b[_i], key = _c[0], value = _c[1];
                            if (f.properties[key] != value) {
                                return true;
                            }
                        }
                        return false;
                    }
                });
            }
        };
        this.findAndremoveByProperty = function (properties) {
            return _this.data.features.filter(function (f) {
                for (var _i = 0, _a = Object.entries(properties); _i < _a.length; _i++) {
                    var _b = _a[_i], key = _b[0], value = _b[1];
                    if (f.properties[key] != value) {
                        return true;
                    }
                }
                return false;
            });
        };
        this.findAndremoveByGeometry = function (geometry) {
            return _this.data.features.filter(function (f) { return f.geometry.type !== (geometry === null || geometry === void 0 ? void 0 : geometry.type); });
        };
        this.update = function (feature, update) {
            if (feature === undefined) {
                return _this.findAndUpdateAll(update || {});
            }
            else if (feature.geometry === undefined) {
                return _this.findAndUpdateByProperties(feature.properties || {}, update || {});
            }
            else if (feature.properties === undefined) {
                return _this.findAndUpdateByGeometry(feature.geometry, update || {});
            }
            return _this.findAndUpdateAll(update || {});
        };
        this.GetAllFeatures = function () {
            return _this.data.features;
        };
        this.data = x;
        this.filePath = filePath;
    }
    FeatureCollection.prototype.findAndUpdateAll = function (update) {
        return this.data.features.map(function (f) {
            var _a;
            for (var _i = 0, _b = Object.entries((update === null || update === void 0 ? void 0 : update.properties) || {}); _i < _b.length; _i++) {
                var _c = _b[_i], key = _c[0], value = _c[1];
                f.properties[key] = value;
            }
            if ((_a = update === null || update === void 0 ? void 0 : update.geometry) === null || _a === void 0 ? void 0 : _a.type) {
                f.geometry.type = update.geometry.type;
            }
            return f;
        });
    };
    FeatureCollection.prototype.findAndUpdateByGeometry = function (geometry, update) {
        return this.data.features.map(function (f) {
            var _a;
            if (f.geometry.type === geometry.type) {
                for (var _i = 0, _b = Object.entries((update === null || update === void 0 ? void 0 : update.properties) || {}); _i < _b.length; _i++) {
                    var _c = _b[_i], key = _c[0], value = _c[1];
                    f.properties[key] = value;
                }
                if ((_a = update === null || update === void 0 ? void 0 : update.geometry) === null || _a === void 0 ? void 0 : _a.type) {
                    f.geometry.type = update.geometry.type;
                }
            }
            return f;
        });
    };
    FeatureCollection.prototype.findAndUpdateByProperties = function (properties, update) {
        return this.data.features.map(function (f) {
            var _a;
            for (var _i = 0, _b = Object.entries(properties); _i < _b.length; _i++) {
                var _c = _b[_i], key = _c[0], value = _c[1];
                if (f.properties[key] !== value) {
                    return f;
                }
                for (var _d = 0, _e = Object.entries((update === null || update === void 0 ? void 0 : update.properties) || {}); _d < _e.length; _d++) {
                    var _f = _e[_d], key_1 = _f[0], value_1 = _f[1];
                    f.properties[key_1] = value_1;
                }
                if ((_a = update === null || update === void 0 ? void 0 : update.geometry) === null || _a === void 0 ? void 0 : _a.type) {
                    f.geometry.type = update.geometry.type;
                }
            }
            return f;
        });
    };
    FeatureCollection.prototype.Update = function (feature, update) {
        this.data.features = this.update(feature, update);
    };
    FeatureCollection.prototype.Remove = function (feature) {
        this.data.features = this.remove(feature);
    };
    FeatureCollection.prototype.Save = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var realpath, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        realpath = filePath === undefined ? this.filePath : filePath;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs.writeFile(realpath, JSON.stringify(this.data))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return FeatureCollection;
}());
exports.FeatureCollection = FeatureCollection;
//-----------------------------------------------------Exports below this line-----------------------------
var createUsingFile = function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
    var data, json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs.readFile(filePath, 'utf-8')];
            case 1:
                data = _a.sent();
                json = JSON.parse(data);
                return [2 /*return*/, new FeatureCollection(json, filePath)];
        }
    });
}); };
exports.createUsingFile = createUsingFile;
var createFromObject = function (data, filePath) {
    return new FeatureCollection(data, filePath);
};
exports.createFromObject = createFromObject;
var GeoJSON = /** @class */ (function () {
    function GeoJSON() {
    }
    GeoJSON.createUsingFile = function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
        var data, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readFile(filePath, 'utf-8')];
                case 1:
                    data = _a.sent();
                    json = JSON.parse(data);
                    return [2 /*return*/, new FeatureCollection(json, filePath)];
            }
        });
    }); };
    GeoJSON.createFromObject = function (data, filePath) {
        return new FeatureCollection(data, filePath);
    };
    return GeoJSON;
}());
exports.GeoJSON = GeoJSON;
//# sourceMappingURL=index.js.map