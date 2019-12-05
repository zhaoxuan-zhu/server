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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const User_1 = __importDefault(require("../../schema/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRoute = function () {
    const route = new koa_router_1.default();
    route.get("/", function (ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = "hello";
        });
    });
    //注册
    route.post("/register", function (ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, phone, password } = ctx.request.body;
            const hasSameName = yield User_1.default.findOne({ name });
            if (hasSameName !== null) {
                ctx.status = 400;
                ctx.body = {
                    msg: "该账号已注册"
                };
                return;
            }
            const hasSamePhone = yield User_1.default.findOne({ phone });
            if (hasSamePhone !== null) {
                ctx.status = 400;
                ctx.body = {
                    msg: "该手机号已被绑定"
                };
                return;
            }
            const result = yield User_1.default.create({ name, phone, password });
            ctx.status = 201;
            ctx.body = result;
        });
    });
    //登录
    route.post("/passwordLogin", function (ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password } = ctx.request.body;
            const hasUser = yield User_1.default.findOne({ name }).select("+password");
            if (hasUser === null) {
                ctx.status = 404;
                ctx.body = {
                    msg: "该用户不存在"
                };
                return;
            }
            const loginResult = bcrypt_1.default.compareSync(password, hasUser.password);
            if (!loginResult) {
                ctx.status = 401;
                ctx.body = {
                    msg: "密码错误"
                };
                return;
            }
            ctx.body = {
                msg: "登录成功",
                token: 112212121,
                _id: hasUser._id
            };
        });
    });
    route.put("/:id", function (ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = "hello";
        });
    });
    route.delete("/:id", function (ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = "hello";
        });
    });
    return route;
};
exports.default = userRoute;
