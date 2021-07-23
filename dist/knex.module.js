"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var KnexModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnexModule = void 0;
const common_1 = require("@nestjs/common");
const Knex = require("knex");
const knex_utils_1 = require("./knex.utils");
let KnexModule = KnexModule_1 = class KnexModule {
    static register(config) {
        const KnexProvider = {
            provide: knex_utils_1.getKnexConnectionToken(),
            useValue: Knex.knex(config),
        };
        return {
            module: KnexModule_1,
            providers: [KnexProvider],
            exports: [KnexProvider],
        };
    }
};
KnexModule = KnexModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], KnexModule);
exports.KnexModule = KnexModule;
