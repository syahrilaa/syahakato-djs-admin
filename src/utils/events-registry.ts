import path from "path";
import chalk from "chalk";
import { FindFiles } from "./find-files";

interface EventRegistryProps {
  eventName: string;
  file: string;
}

export class EventRegistry {
  public async load() {
    const eventFolder = 'events'
    const registry: Array<EventRegistryProps> = []

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const eventFolders = new FindFiles(eventFolder, true).get();
    let totalEvents = 0

    for (const folder of eventFolders) {
      const eventFiles = new FindFiles(path.join(eventFolder, folder)).get()
      for (const file of eventFiles) {
        await delay(200)

        totalEvents++
        const module = await this.getModule(folder, file)

        if (typeof module !== 'function') {
          console.log(`${chalk.red('\u25b6')} ${chalk.bgRed.black(' Event ')} ${chalk.red('Failed to add')}: ${chalk.yellowBright(folder)}/${chalk.whiteBright(file)}`)
          continue;
        }

        registry.push({ eventName: folder, file })
      }
    }

    console.log(`${chalk.green('\u25b6')} ${chalk.bgGreen.black(' Event ')} Success added: ${chalk.greenBright(registry.filter(item => item).length)} ${chalk.whiteBright(`of ${totalEvents} to registry`)}`)
    return registry
  }

  public async getModule(folder: string, file: string) {
    const eventPath = new FindFiles(path.join('events', folder))
    const module = await import(path.join(eventPath.getURL(), file))
    return module[file.split('.')[0]]
  }
}