import './init'
import express from 'express'
import { config } from './config'
import { logger } from './helpers/DDTLogger'
import cors from 'cors'
import routers from './routers'
import { errorHandler } from './middlewares'

const start = async () => {

  const app = express()

  app.use(cors({ origin: '*' }))
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true,
    }),
  )

  app.use(routers)
  app.use(errorHandler)
  app.listen(config.port || 300, () => {
    logger.info(`start listening to port ${config.port} ... `, 'Server')
  })
  app.use(errorHandler)
}

start().catch((err) => logger.error(err, 'server'))
