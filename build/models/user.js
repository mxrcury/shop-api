"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const isBoolean_1 = __importDefault(require("validator/lib/isBoolean"));
let User = class User {
};
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, validate: [function (val) { return (0, isBoolean_1.default)(val); }, 'You entered not a boolean string,({VALUE})'] }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0, required: false }),
    __metadata("design:type", Number)
], User.prototype, "rating", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "cool", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true, default: 'guest', enum: ['admin', 'guest'] }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
User = __decorate([
    (0, typegoose_1.pre)('save', function () {
        if (this.rating > 5) {
            this.cool = true;
        }
    })
], User);
exports.UserModel = (0, typegoose_1.getModelForClass)(User);
