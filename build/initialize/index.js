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
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const root_1 = require("../routes/root");
const start = (app, port = 7000) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dirname = path_1.default.resolve('./');
        app.use(express_1.default.static(`${dirname}/public`));
        app.use(express_1.default.json());
        app.use('/', root_1.rootRouter);
        yield mongoose_1.default.connect('mongodb+srv://admin:admin@cluster0.bgmtfxs.mongodb.net/?retryWrites=true&w=majority', {
            retryWrites: true,
            monitorCommands: true
        });
        console.log(`Successfully connected to MongoDB `);
        app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
    }
    catch (e) {
        console.log(e);
    }
});
exports.default = start;
