import {Inject} from "@nestjs/common"

import {getKnexConnectionToken} from "./knex.utils"

export const InjectKnex = () => {
  return Inject(getKnexConnectionToken())
}
