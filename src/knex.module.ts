import {DynamicModule, Global, Module} from "@nestjs/common"
import * as Knex from "knex"

import {KNEX_TOKEN} from "./knex.constants"

@Global()
@Module({})
export class KnexModule {
  static register(config: Knex.Knex.Config): DynamicModule {
    const KnexProvider = {
      provide: KNEX_TOKEN,
      useValue: Knex.knex(config),
    }

    return {
      module: KnexModule,
      providers: [KnexProvider],
      exports: [KnexProvider],
    }
  }
}
