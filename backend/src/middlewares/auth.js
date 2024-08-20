import Boom from '@hapi/boom'

import { ADMIN, USER } from '../config/constants'

const auth =
  (role = USER) =>
  async (req, _, next) => {
    try {
        let cookie = req.headers.cookie;

        if (!cookie) throw Boom.unauthorized("Invalid request")

        req.device_uuid = cookie.split("=")[1];

        next()
    } catch (err) {
        next(Boom.unauthorized("Permission denied"))
    }
  }

export default auth
