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
const user_1 = require("../models/user");
const user_2 = __importDefault(require("../services/user"));
exports.default = new class UsersController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            const users = yield user_2.default.getUsers(+req.query.page, 3);
            res.status(200).send(users);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.UserModel.findById(req.params.id).exec();
            res.status(200).json(user);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_1.UserModel.create(req.body);
                res.status(201).end();
            }
            catch (e) {
                console.log('ERROR ' + e);
                res.status(400).send(e);
            }
        });
    }
};
