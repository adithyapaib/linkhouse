"use strict";
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
exports.__esModule = true;
//Dependencies
var express = require("express");
var mongoose_1 = require("mongoose");
var documentSchema = new mongoose_1.Schema({
    value: {
        type: String,
        required: true
    },
    username: {
        type: String
    }
});
var G = (0, mongoose_1.model)('documents', documentSchema);
require("dotenv").config();
//Middle-wares
(function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            (0, mongoose_1.connect)(process.env.DB);
            return [2 /*return*/];
        });
    });
})();
var app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
var shortid = function (length, chars) {
    var str = "";
    if (length == null || typeof length != "number") {
        length = 6;
    }
    if (chars == null) {
        chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    }
    chars.split("");
    for (var i = 0; i < length; i++)
        str += chars[Math.floor(Math.random() * chars.length)];
    return str;
};
// Routes
app.get("/", function (req, res) {
    res.render("index");
});
app.get("/new", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var short;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                short = shortid(6, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz_-");
                return [4 /*yield*/, res.render("new", { username: short })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.get("/new/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    "";
    var username;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.params.id];
            case 1:
                username = _a.sent();
                res.render("new", { username: username });
                return [2 /*return*/];
        }
    });
}); });
var detectURLs = function (string) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, string.replace(/(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/gim, '<a href="$1">$1</a><br>')];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
app.post("/save", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, username, value, d, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.body.value];
            case 1:
                body = _a.sent();
                return [4 /*yield*/, req.body.username];
            case 2:
                username = _a.sent();
                return [4 /*yield*/, detectURLs(body)];
            case 3:
                body = _a.sent();
                return [4 /*yield*/, body.replace(/\n/g, '<br>')];
            case 4:
                body = _a.sent();
                return [4 /*yield*/, "<p class=\"saved\">" + body + " </p>"];
            case 5:
                value = _a.sent();
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                return [4 /*yield*/, G.create({ username: username, value: value })];
            case 7:
                d = _a.sent();
                return [2 /*return*/, res.redirect("/" + d.username)];
            case 8:
                err_1 = _a.sent();
                res.render("404");
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
app.get("/user/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, test;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.params.id];
            case 1:
                username = _a.sent();
                return [4 /*yield*/, G.find({ username: username })];
            case 2:
                test = _a.sent();
                if (test.length > 0) {
                    res.json(true);
                }
                else {
                    res.json(false);
                }
                return [2 /*return*/];
        }
    });
}); });
app.get("/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, document, code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.params.id];
            case 1:
                id = _a.sent();
                return [4 /*yield*/, G.findOne({ username: id })];
            case 2:
                document = _a.sent();
                if (!document) return [3 /*break*/, 5];
                return [4 /*yield*/, document.value];
            case 3:
                code = _a.sent();
                return [4 /*yield*/, res.render("code", { code: code, username: id })];
            case 4: return [2 /*return*/, _a.sent()];
            case 5: return [2 /*return*/, res.render("404")];
        }
    });
}); });
app.get("/*", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, res.render("404")];
}); }); });
app.listen(3000);
