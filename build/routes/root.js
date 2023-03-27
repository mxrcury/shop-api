"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("./users");
const rootRouter = express_1.default.Router();
exports.rootRouter = rootRouter;
rootRouter.use('/users', users_1.usersRouter);
