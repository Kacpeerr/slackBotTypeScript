import { Configuration, OpenAIApi } from "openai";

require("dotenv").config();

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const askGpt = async (userPrompt: string): Promise<string> => {
	try {
		const completion = await openai.createCompletion({
			model: "text-davinci-003",
			temperature: 0.6,
			frequency_penalty: 1.5,
			presence_penalty: 1.2,
			max_tokens: 4000,
			prompt: userPrompt,
		});

		return completion.data.choices[0].text
			? completion.data.choices[0].text
			: "cannot get response from openai, sorry!";
	} catch (error) {
		throw new Error("Failed to fetch solution");
	}
};
