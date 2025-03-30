import { Client } from "discord.js";
import { EventRegistry } from "./utils/events-registry";

export class App {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }

  private async eventHandler() {
    const events = new EventRegistry();
    for (const event of await events.load()) {
      const { eventName, file: eventFile } = event
      this.client.on(eventName, async (args) => {
        const module = await events.getModule(eventName, eventFile)
        await module(this.client, args)
      })
    }
  }

  public async create() {
    await this.eventHandler()
    const token = process.env.DISCORD_TOKEN
    await this.client.login(token);
  }
}