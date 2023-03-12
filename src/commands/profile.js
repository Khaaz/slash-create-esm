import { Requester } from "@owlebot/lib";
import { Logger } from "@owlebot/logger";
import { SlashCommand } from "slash-create";

export default class ProfileCommand extends SlashCommand {
	#identification;

	constructor(creator) {
		super(creator, {
			name: "test",
			description: "Test.",
		} );

		this.#identification = new Requester(`${process.env.IDENTIFICATION_URL}:${process.env.IDENTIFICATION_PORT}/`,
			{
				source: "DISCORD_INTERACTIONS",
				target: "IDENTIFICATION",
			},
			Logger
		);
	}

	async run(ctx) {
		return ctx.send("Test");
	}
}
