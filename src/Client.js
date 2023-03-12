import { readdir } from "node:fs/promises";

import { Creator } from "slash-create";

async function findFilesWithExtension(path, extensions, names = [] ) {
	const dir = await readdir(path);
	for (const name of dir) {
		names.push(name);
	}
	
	return names;
}

export class CustomSlashCreator extends Creator {
	// eslint-disable-next-line no-unused-vars
	async registerCommandsIn(commandPath, customExtensions = [] ) {
		const commands = [];
		const files = await findFilesWithExtension(commandPath);
		for (const path of files) {
			try {
				commands.push(await import(`./commands/${path}`) );
			} catch (error) {
				this.emit("error", new Error(`Failed to load command ${path}: ${error}`) );
			}
		}
		
		return this.registerCommands(commands, true);
	}
}

