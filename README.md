# @brandongit2/nestjs-knex

A NestJS module for using Knex.js.

## Installation

```bash
yarn add @brandonnpm2/nestjs-knex knex
```

## Examples

### KnexModule.register(config)

```ts
import {KnexModule} from "@brandonnpm2/nestjs-knex"
import {Module} from "@nestjs/common"

import {AppController} from "./app.controller"

@Module({
  imports: [
    KnexModule.register({
      client: `pg`,
      connection: `...`,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### InjectKnex()

```ts
import {InjectKnex} from "@brandonnpm2/nestjs-knex"
import {Controller, Get} from "@nestjs/common"

import type Knex from "knex"

@Controller()
export class AppController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @Get()
  async getUser(email: string) {
    const user = await this.knex.table("users").first(`*`).where({email: "user@example.com"})
    return user
  }
}
```

### Mocking for tests

```ts
import {KNEX_TOKEN, KnexModule} from "@brandonnpm2/nestjs-redis"
import {Test} from "@nestjs/testing"

import type Knex from "knex"

describe(`test`, () => {
  let knex: Knex

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        KnexModule.register({
          client: `pg`,
          connection: `...`,
        }),
      ],
    })

    knex = module.get(KNEX_TOKEN)
  })

  beforeEach(async () => {
    await knex.raw(`start transaction`)
  })

  afterEach(async () => {
    await knex.raw(`rollback`)
  })

  test(`basic test`, async () => {
    const AMY = {
      id: 0,
      firstName: `Amy`,
      lastName: `Brown`,
      age: 29,
    }

    await knex.table(`users`).insert(AMY)

    const res = await knex.table(`users`).first(`*`).where({id: AMY.id})
    expect(res).toMatchObject(AMY)
  })
})
```
