import {DynamicModule, Module} from "@nestjs/common"
import * as Knex from "knex"

import {getKnexConnectionToken} from "./knex.utils"

@Module({})
export class KnexModule {
  static register(config: Knex.Knex.Config): DynamicModule {
    return {
      module: KnexModule,
      providers: [
        {
          provide: getKnexConnectionToken(),
          useValue: Knex.knex(config),
        },
      ],
    }
  }
}
