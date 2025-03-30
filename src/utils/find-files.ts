import path from "path";
import fs from 'fs';

export class FindFiles {
  private filenames: string[] = []
  private fileURL: string = ''

  constructor(dir: string, isFolder: boolean = false) {
    const appFolder = process.env.NODE_ENV === 'production' ? '.build' : 'src'
    const basePath = path.resolve(process.cwd(), appFolder, dir);
    const entries = fs.readdirSync(basePath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory() && isFolder) {
        this.filenames.push(entry.name)
        this.fileURL = entry.parentPath
      }

      if (entry.isFile()) {
        this.filenames.push(entry.name)
        this.fileURL = entry.parentPath
      }
    }
  }

  public get(): string[] {
    return this.filenames
  }

  public getURL(): string {
    return this.fileURL
  }
}