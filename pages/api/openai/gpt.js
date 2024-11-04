//get embeddings
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Ensure that the correct model name is used.
      messages: [
        { role: "system", content: req.body.systemContent },
        { role: "user", content: req.body.userContent },
      ],
    });

    console.log(response);
    console.log(response.choices[0].message);
    
    const result = response.choices[0].message.content;
    res.status(200).json({ text: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from OpenAI" });
  }
}
