import {DynamicModule, Global, Module, Provider} from "@nestjs/common"
import Knex from "knex"
import {KnexModuleOptions, KnexModuleOptionsFactory} from "src/knex.interfaces"

import {KNEX_TOKEN} from "./knex.constants"

@Global()
@Module({})
export class KnexModule {
  static register(config: Knex.Config): DynamicModule {
    const KnexProvider = {
      provide: KNEX_TOKEN,
      useValue: Knex(config),
    }

    return {
      module: KnexModule,
      providers: [KnexProvider],
      exports: [KnexProvider],
    }
  }

  static registerAsync(options: KnexModuleOptions): DynamicModule {
    if (options.useFactory) {
      const KnexProvider: Provider = {
        provide: KNEX_TOKEN,
        useFactory: options.useFactory,
        inject: options.inject,
      }

      return {
        module: KnexModule,
        providers: [KnexProvider],
        exports: [KnexProvider],
      }
    } else if (options.useClass) {
      const KnexProvider: Provider = {
        provide: KNEX_TOKEN,
        useFactory: async (optionsFactory: KnexModuleOptionsFactory) => {
          return optionsFactory.createKnexModuleOptions()
        },
        inject: [options.useExisting || options.useClass],
      }

      return {
        module: KnexModule,
        providers: [KnexProvider, {provide: options.useClass, useClass: options.useClass}],
        exports: [KnexProvider],
      }
    } else if (options.useExisting) {
      const KnexProvider: Provider = {
        provide: KNEX_TOKEN,
        useFactory: async (optionsFactory: KnexModuleOptionsFactory) => {
          return optionsFactory.createKnexModuleOptions()
        },
        inject: [options.useExisting || options.useClass],
      }

      return {
        module: KnexModule,
        providers: [KnexProvider],
        exports: [KnexProvider],
      }
    }
  }
}
