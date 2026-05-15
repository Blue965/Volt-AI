import { NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
  provider?: "openai" | "claude" | "openrouter";
  model?: string;
}

export async function POST(request: Request) {
  const body: ChatRequestBody = await request.json().catch(() => ({} as ChatRequestBody));

  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  const useClaude = body.provider === "claude" || (!body.provider && !!process.env.CLAUDE_KEY);
  const useOpenAI = body.provider === "openai" || (!body.provider && !!process.env.OPENAI_API_KEY);
  const useOpenRouter = body.provider === "openrouter" || (!body.provider && !!process.env.OPENROUTER_API_KEY);

  if (!useClaude && !useOpenAI && !useOpenRouter) {
    return NextResponse.json(
      {
        error:
          "Aucune clé API configurée. Définissez OPENAI_API_KEY, CLAUDE_KEY ou OPENROUTER_API_KEY dans vos variables d'environnement.",
      },
      { status: 500 }
    );
  }

  try {
    if (useClaude && process.env.CLAUDE_KEY) {
      const systemPrompt = `You are Volt AI, an expert assistant for Roblox development. When you provide code, always format it in markdown code blocks with the appropriate language identifier (lua, javascript, typescript, etc.). This helps the system automatically detect and display code in the artifact panel. Be concise and helpful.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.CLAUDE_KEY,
        },
        body: JSON.stringify({
          model: body.model || "claude-3.5-mini",
          system: systemPrompt,
          messages: body.messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
          max_tokens_to_sample: 800,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        return NextResponse.json({ error: data.error || "Claude API error." }, { status: response.status });
      }

      return NextResponse.json({ content: data.completion || data.response || "" });
    }

    if (useOpenAI && process.env.OPENAI_API_KEY) {
      const systemPrompt = `You are Volt AI, an expert assistant for Roblox development. When you provide code, always format it in markdown code blocks with the appropriate language identifier (lua, javascript, typescript, etc.). This helps the system automatically detect and display code in the artifact panel. Be concise and helpful.`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: body.model || "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...body.messages.map((message) => ({ role: message.role, content: message.content })),
          ],
          max_tokens: 800,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        return NextResponse.json({ error: data.error?.message || "OpenAI API error." }, { status: response.status });
      }

      return NextResponse.json({ content: data.choices?.[0]?.message?.content || "" });
    }

    if (useOpenRouter && process.env.OPENROUTER_API_KEY) {
      const systemPrompt = `You are Volt AI, an expert assistant for Roblox development. When you provide code, always format it in markdown code blocks with the appropriate language identifier (lua, javascript, typescript, etc.). This helps the system automatically detect and display code in the artifact panel. Be concise and helpful.`;

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: body.model || "openai/gpt-5.5-pro",
          messages: [
            { role: "system", content: systemPrompt },
            ...body.messages.map((message) => ({ role: message.role, content: message.content })),
          ],
          max_tokens: 16000,
        }),
      });

      const data = await response.json();
      console.log("OpenRouter API response:", data);
      if (!response.ok) {
        return NextResponse.json({ error: data.error?.message || JSON.stringify(data) || "OpenRouter API error." }, { status: response.status });
      }

      return NextResponse.json({ content: data.choices?.[0]?.message?.content || "" });
    }

    return NextResponse.json({ error: "Aucune clé API valide trouvée." }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown server error." }, { status: 500 });
  }
}
