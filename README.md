# @brandongit2/nestjs-knex

A NestJS module for using Knex.js.

## Installation

```bash
yarn add nestjs-knex knex
```

## Examples

### KnexModule.register(config)

```ts
import {Module} from "@nestjs/common"
import {KnexModule} from "nestjs-knex"
import {AppController} from "./app.controller"

@Module({
  imports: [
    KnexModule.register({
      client: "pg",
      connection: `...`,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### InjectKnex()

```ts
import {Controller, Get} from "@nestjs/common"
import {InjectKnex, Knex} from "nestjs-knex"

@Controller()
export class AppController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @Get()
  async getUser() {
    const user = await this.knex.table("users").first(`*`).where({firstName: "Brandon"})
    return user
  }
}
```
