import { convertToCoreMessages, StreamingTextResponse } from "ai";
import { models } from "@/lib/ai/models";


export async function POST(req: Request) {
  const { id, messages, modelId } = await req.json();

  const model = models.find((model) => model.id === modelId);

  if (!model) {
    return new Response('Model not found', { status: 404 });
  }

  const coreMessages = convertToCoreMessages(messages);
  const userMessage = getMostRecentUserMessage(coreMessages);

  try {
    let response;

    if (model.startsWith("gpt")) {
      response = await openai.chat.completions.create({
        model,
        messages,
        stream: true,
      });
    } else if (model === "claude-2") {
      response = await anthropic.messages.create({
        model: "claude-2",
        messages: messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        })),
        stream: true,
      });
    } else if (model === "gemini-pro") {
      const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = messages.map((m: any) => m.content).join("\n");
      response = await geminiModel.generateContentStream(prompt);
    } else {
      throw new Error(`Unsupported model: ${model}`);
    }

    return new StreamingTextResponse(response);
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(JSON.stringify({ error: "Error processing your request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}