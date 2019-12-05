"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const cors_1 = __importDefault(require("@koa/cors"));
const app = new koa_1.default();
app.use(koa_bodyparser_1.default());
app.use(koa_logger_1.default());
app.use(cors_1.default());
const routes_1 = __importDefault(require("./routes"));
app.use(routes_1.default.routes(), routes_1.default.allowedMethods());
const port = 3000;
app.listen(port, () => {
    console.log(`server is runnig on ${port}!`);
});
