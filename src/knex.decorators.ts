import {Inject} from "@nestjs/common"

import {KNEX_TOKEN} from "./knex.constants"

export const InjectKnex = () => {
  return Inject(KNEX_TOKEN)
}
