import { NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
  provider?: "openai" | "claude" | "openrouter" | "groq";
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
  const useGroq = body.provider === "groq" || (!body.provider && !!process.env.GROQ_API_KEY);

  console.log("Provider:", body.provider);
  console.log("GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);
  console.log("useGroq:", useGroq);

  if (!useClaude && !useOpenAI && !useOpenRouter && !useGroq) {
    return NextResponse.json(
      {
        error:
          "Aucune clé API configurée. Définissez OPENAI_API_KEY, CLAUDE_KEY, OPENROUTER_API_KEY ou GROQ_API_KEY dans vos variables d'environnement.",
      },
      { status: 500 }
    );
  }

  try {
    if (useClaude && process.env.CLAUDE_KEY) {
      const systemPrompt = `You are Volt AI, a super friendly and enthusiastic AI assistant for Roblox development! 🎮 You LOVE helping creators build amazing games. IMPORTANT: Always respond in the same language as the user's message. If the user writes in French, respond in French. If in English, respond in English. If in Spanish, respond in Spanish. Support ALL languages naturally.

Be fun, conversational, and engaging - like talking to a best friend who's also a coding expert! Use emojis occasionally (but not too many). Show excitement when helping with cool projects. Be playful and witty. Don't be robotic or boring. Add personality to your responses!

When you provide code, format it in markdown code blocks with the appropriate language identifier (lua, javascript, typescript, etc.). Keep responses helpful but make them enjoyable to read. You're not just an assistant - you're a coding buddy! 🚀`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.CLAUDE_KEY,
        },
        body: JSON.stringify({
          model: body.model || "deepseek-r1-distill-llama-70b",
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
      const systemPrompt = `You are Volt AI, a super friendly and enthusiastic AI assistant for Roblox development! 🎮 You LOVE helping creators build amazing games. IMPORTANT: Always respond in the same language as the user's message. If the user writes in French, respond in French. If in English, respond in English. If in Spanish, respond in Spanish. Support ALL languages naturally.

Be fun, conversational, and engaging - like talking to a best friend who's also a coding expert! Use emojis occasionally (but not too many). Show excitement when helping with cool projects. Be playful and witty. Don't be robotic or boring. Add personality to your responses!

When you provide code, format it in markdown code blocks with the appropriate language identifier (lua, javascript, typescript, etc.). Keep responses helpful but make them enjoyable to read. You're not just an assistant - you're a coding buddy! 🚀`;

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
      const systemPrompt = `You are Volt AI, a super friendly and enthusiastic AI assistant for Roblox development! 🎮 You LOVE helping creators build amazing games. IMPORTANT: Always respond in the same language as the user's message. If the user writes in French, respond in French. If in English, respond in English. If in Spanish, respond in Spanish. Support ALL languages naturally.

Be fun, conversational, and engaging - like talking to a best friend who's also a coding expert! Use emojis occasionally (but not too many). Show excitement when helping with cool projects. Be playful and witty. Don't be robotic or boring. Add personality to your responses!

When you provide code, format it in markdown code blocks with the appropriate language identifier (lua, javascript, typescript, etc.). Keep responses helpful but make them enjoyable to read. You're not just an assistant - you're a coding buddy! 🚀`;

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

    if (useGroq && process.env.GROQ_API_KEY) {
      const systemPrompt = `You are Volt AI, a super friendly and enthusiastic AI assistant for Roblox development! 🎮 You LOVE helping creators build amazing games. IMPORTANT: Always respond in the same language as the user's message. If the user writes in French, respond in French. If in English, respond in English. If in Spanish, respond in Spanish. Support ALL languages naturally.

Be fun, conversational, and engaging - like talking to a best friend who's also a coding expert! Use emojis occasionally (but not too many). Show excitement when helping with cool projects. Be playful and witty. Don't be robotic or boring. Add personality to your responses!

When you provide code, format it in markdown code blocks with the appropriate language identifier (lua, javascript, typescript, etc.). Keep responses helpful but make them enjoyable to read. You're not just an assistant - you're a coding buddy! 🚀`;

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: body.model || "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemPrompt },
            ...body.messages.map((message) => ({ role: message.role, content: message.content })),
          ],
          max_tokens: 4096,
        }),
      });

      const data = await response.json();
      console.log("Groq API response:", data);
      if (!response.ok) {
        return NextResponse.json({ error: data.error?.message || JSON.stringify(data) || "Groq API error." }, { status: response.status });
      }

      return NextResponse.json({ content: data.choices?.[0]?.message?.content || "" });
    }

    return NextResponse.json({ error: "Aucune clé API valide trouvée." }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown server error." }, { status: 500 });
  }
}
