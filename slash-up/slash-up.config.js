// This initialise the Logger when running the app with slash-up
const { Logger } = require("@owlebot/logger");

Logger.create("@owlebot/discord-interactions");

module.exports = {
	// The Token of the Discord bot
	token: process.env.DISCORD_BOT_TOKEN,
	// The Application ID of the Discord bot
	applicationId: process.env.DISCORD_APP_ID,
	// This is where the path to command files are, .ts files are supported!
	commandPath: "../src/commands",
	// You can use different environments with --env (-e)
	env: {
		development: {
			// The "globalToGuild" option makes global commands sync to the specified guild instead.
			globalToGuild: process.env.DEVELOPMENT_GUILD_ID,
		},
	},
};
