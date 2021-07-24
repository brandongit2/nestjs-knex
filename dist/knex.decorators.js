"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectKnex = void 0;
const common_1 = require("@nestjs/common");
const knex_constants_1 = require("./knex.constants");
const InjectKnex = () => {
    return common_1.Inject(knex_constants_1.KNEX_TOKEN);
};
exports.InjectKnex = InjectKnex;
