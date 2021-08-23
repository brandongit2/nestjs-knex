import {DynamicModule, Global, Module, Provider} from "@nestjs/common"
import {default as Knex, Knex as KnexType} from "knex"

import {KNEX_OPTIONS_TOKEN, KNEX_TOKEN} from "./knex.constants"
import {KnexModuleOptions, KnexModuleOptionsFactory} from "./knex.interfaces"

@Global()
@Module({})
export class KnexModule {
  static register(config: KnexType.Config): DynamicModule {
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
      const KnexOptionsProvider: Provider = {
        provide: KNEX_OPTIONS_TOKEN,
        useFactory: options.useFactory,
        inject: options.inject,
      }

      const KnexProvider: Provider = {
        provide: KNEX_TOKEN,
        useFactory(options: KnexType.Config) {
          return Knex(options)
        },
        inject: [KNEX_OPTIONS_TOKEN],
      }

      return {
        module: KnexModule,
        providers: [KnexOptionsProvider, KnexProvider],
        exports: [KnexProvider],
      }
    } else if (options.useClass) {
      const KnexOptionsProvider: Provider = {
        provide: KNEX_TOKEN,
        useFactory: async (optionsFactory: KnexModuleOptionsFactory) => {
          return optionsFactory.createKnexModuleOptions()
        },
        inject: [options.useExisting || options.useClass],
      }

      const KnexProvider: Provider = {
        provide: KNEX_TOKEN,
        useFactory(options: KnexType.Config) {
          return Knex(options)
        },
        inject: [KNEX_OPTIONS_TOKEN],
      }

      return {
        module: KnexModule,
        providers: [KnexOptionsProvider, {provide: options.useClass, useClass: options.useClass}, KnexProvider],
        exports: [KnexProvider],
      }
    } else if (options.useExisting) {
      const KnexOptionsProvider: Provider = {
        provide: KNEX_TOKEN,
        useFactory: async (optionsFactory: KnexModuleOptionsFactory) => {
          return optionsFactory.createKnexModuleOptions()
        },
        inject: [options.useExisting || options.useClass],
      }

      const KnexProvider: Provider = {
        provide: KNEX_TOKEN,
        useFactory(options: KnexType.Config) {
          return Knex(options)
        },
        inject: [KNEX_OPTIONS_TOKEN],
      }

      return {
        module: KnexModule,
        providers: [KnexOptionsProvider, KnexProvider],
        exports: [KnexProvider],
      }
    }
  }
}
