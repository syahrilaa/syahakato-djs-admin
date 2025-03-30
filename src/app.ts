import { Client } from "discord.js";

export class App {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }

  public async create() {
    const token = process.env.DISCORD_TOKEN
    await this.client.login(token);
  }
}