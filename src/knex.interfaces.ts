import type {Type} from "@nestjs/common"
import type Knex from "knex"

export type KnexModuleOptionsFactory = {
  createKnexModuleOptions(): Knex.Config | Promise<Knex.Config>
}

export type KnexModuleOptions = {
  inject?: any[]
  useClass?: Type<KnexModuleOptionsFactory>
  useFactory?: (...args: any[]) => Knex.Config | Promise<Knex.Config>
  useExisting?: Type<KnexModuleOptionsFactory>
}
