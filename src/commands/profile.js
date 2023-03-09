
import { SlashCommand } from "slash-create";

export default class ProfileCommand extends SlashCommand {
	constructor(creator) {
		super(creator, {
			name: "test",
			description: "Test.",
		} );
	}

	async run(ctx) {
		return ctx.send("Test");
	}
}
