"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const initialize_1 = __importDefault(require("./initialize"));
const PORT = 6969;
const app = (0, express_1.default)();
(0, initialize_1.default)(app, PORT);
