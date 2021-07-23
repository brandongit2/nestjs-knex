import { DynamicModule } from "@nestjs/common";
import * as Knex from "knex";
export declare class KnexModule {
    static register(config: Knex.Knex.Config): DynamicModule;
}
