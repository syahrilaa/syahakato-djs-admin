import chalk from "chalk";
import { Client } from "discord.js";

export const logs = (client: Client<true>) => {
  console.log(`${chalk.blue('\u25b6')} ${chalk.bgBlue.whiteBright(' Client ')} ${chalk.whiteBright('Bot is Ready')}`)
}