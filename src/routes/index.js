"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const restful_api_1 = __importDefault(require("./restful_api"));
const user_1 = __importDefault(require("./user"));
const restful_route = restful_api_1.default();
const user_route = user_1.default();
const setModelMiddleWare_1 = __importDefault(require("../middleWare/setModelMiddleWare"));
const router = new koa_router_1.default();
router.use("/api/curd/:resource", setModelMiddleWare_1.default, restful_route.routes(), restful_route.allowedMethods());
router.use("/user", user_route.routes(), user_route.allowedMethods());
exports.default = router;
