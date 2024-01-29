import { Router } from 'express'
import { routerV1 } from './v1'

const routers = Router()

routers.use('/api/v1', routerV1)

export default routers
