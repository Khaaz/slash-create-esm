import { readdirSync } from "fs";
import { Creator } from "slash-create";

function findFilesWithExtension(path, extensions, names = [] ) {
	for (const name of readdirSync(path) ) {
		names.push(name);
	}
	
	return names;
}

export class CustomSlashCreator extends Creator {
	// eslint-disable-next-line no-unused-vars
	async registerCommandsIn(commandPath, customExtensions = [] ) {
		const commands = [];
		
		for (const path of findFilesWithExtension(commandPath) ) {
			try {
				commands.push(await import(`./commands/${path}`) );
			} catch (error) {
				this.emit("error", new Error(`Failed to load command ${path}: ${error}`) );
			}
		}
		
		return this.registerCommands(commands, true);
	}
}

