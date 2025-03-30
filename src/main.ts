import 'dotenv/config'
import { Client } from 'discord.js'
import { App } from './app'

const bootstrap = async () => {
  const client = new Client({ intents: [] })
  const app = new App(client)
  await app.create()
}

bootstrap();