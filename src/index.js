import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { Logger } from "@owlebot/logger";
import dotenv from "dotenv";
import { ExpressServer } from "slash-create";

import { CustomSlashCreator } from "./Client.js";

dotenv.config();

Logger.create("@owlebot/discord-interactions", "debug");

const creator = new CustomSlashCreator( {
	applicationID: process.env.DISCORD_APP_ID,
	publicKey: process.env.DISCORD_PUBLIC_KEY,
	token: process.env.DISCORD_BOT_TOKEN,
	serverPort: process.env.DISCORD_INTERACTIONS_PORT,
	serverHost: "0.0.0.0",
} );

const scriptDir = dirname(fileURLToPath(import.meta.url) );

creator.on("debug", (message) => Logger.verbose("LIFECYCLE", message) );
creator.on("warn", (message) => Logger.warn("LIFECYCLE", message) );
creator.on("error", (error) => Logger.error("LIFECYCLE", error) );
creator.on("synced", () => Logger.info("sync", "Commands synced!") );
creator.on("commandRun", (command, _, ctx) => Logger.info("COMMAND", `${ctx.user.username}#${ctx.user.discriminator} (${ctx.user.id}) ran command ${command.commandName}`) );
creator.on("commandRegister", (command) => Logger.info("COMMAND", `Registered command ${command.commandName}`) );
creator.on("commandError", (command, error) => Logger.error("COMMAND", `Command ${command.commandName}:`, error) );

creator
	.withServer(new ExpressServer() );
await creator.registerCommandsIn(join(scriptDir, "commands") );
creator.startServer();

// creator.syncCommands();

Logger.info("LIFECYCLE", `Starting server at "localhost:${creator.options.serverPort}/interactions"`);
