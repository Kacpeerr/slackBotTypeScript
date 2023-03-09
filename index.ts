import { askGpt } from "./openai";
import { App } from "@slack/bolt";

require("dotenv").config();

const app = new App({
	token: process.env.SLACK_APP_BOT_TOKEN,
	socketMode: true,
	appToken: process.env.SLACK_APP_TOKEN,
	signingSecret: process.env.SLACK_APP_SIGNING_SECRET,
});

app.command("/gpt", async ({ ack, command, say }) => {
	await ack();
	console.log("Someone ask question!");
	const response = await askGpt(command.text);
	say(response);
});

(async () => {
	await app.start(process.env.PORT || 300);
	console.log("⚡️ Bolt app is running!");
})();
