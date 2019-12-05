"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../plugins/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const newSchema = new db_1.default.Schema({
    name: { type: String },
    phone: { type: String },
    email: { type: String, default: "" },
    password: {
        type: String,
        set(val) {
            return bcrypt_1.default.hashSync(val, 10);
        },
        select: false
    },
    createTime: { type: Date, default: Date.now },
    icon: { type: String, default: "http://1t.click/btWU" }
});
exports.default = db_1.default.model("User", newSchema);
