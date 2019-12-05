"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const inflection_1 = __importDefault(require("inflection"));
const setModelMiddleWare = function (ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const resourceClassify = inflection_1.default.classify(ctx.params.resource);
        console.log(typeof (resourceClassify));
        if (resourceClassify === "User") {
            ctx.status = 403;
            ctx.body = {
                msg: "请求地址错误🙅‍♂️"
            };
            return;
        }
        try {
            ctx.Model = require(path_1.default.resolve(`${__dirname}/../schema/${resourceClassify}`));
            yield next();
        }
        catch (err) {
            ctx.status = 404;
            ctx.body = err;
        }
    });
};
exports.default = setModelMiddleWare;
