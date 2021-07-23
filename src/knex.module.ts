import {DynamicModule, Global, Module} from "@nestjs/common"
import * as Knex from "knex"

import {getKnexConnectionToken} from "./knex.utils"

@Global()
@Module({})
export class KnexModule {
  static register(config: Knex.Knex.Config): DynamicModule {
    const KnexProvider = {
      provide: getKnexConnectionToken(),
      useValue: Knex.knex(config),
    }

    return {
      module: KnexModule,
      providers: [KnexProvider],
      exports: [KnexProvider],
    }
  }
}
