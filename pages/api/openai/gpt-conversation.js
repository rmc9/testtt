//get embeddings
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { systemContent, conversation } = req.body;

    // Prepare messages array for OpenAI API
    const messages = [{ role: "system", content: systemContent }, ...conversation];

    console.log(messages, systemContent, conversation);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Ensure that the correct model name is used.
      messages: messages,
    });
    console.log(messages, systemContent, conversation);

    console.log(response);
    const result = response.choices[0].message.content;
    res.status(200).json({ text: result });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to fetch data from OpenAI" });
  }
}
