"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../controllers/users"));
exports.usersRouter = express_1.default.Router();
const lastPageAlias = (req, res, next) => {
    req.query.page = 3;
    next();
};
exports.usersRouter.get('/users-last-page', lastPageAlias, users_1.default.getAll);
exports.usersRouter.get('/', users_1.default.getAll);
exports.usersRouter.get('/:id', users_1.default.getOne);
exports.usersRouter.post('/', users_1.default.create);
