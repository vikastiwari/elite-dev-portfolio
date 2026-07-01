import type { APIRoute } from 'astro';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';
import { GoogleGenAI } from '@google/genai';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const text = await request.text();
    const body = text ? JSON.parse(text) : {};
    const userMessage = body.message || '';

    if (!userMessage.trim()) {
      return new Response(JSON.stringify({ reply: 'Error: Empty message received.' }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Special hardcoded commands
    if (userMessage.trim().toLowerCase() === 'whoami') {
      return new Response(JSON.stringify({ reply: "You are interacting with Vikas's God-Tier WebGL portfolio." }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const apiKey = import.meta.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
      return new Response(JSON.stringify({ 
        reply: 'SYSTEM OFFLINE: AI Brain disconnected. Please configure GEMINI_API_KEY in the .env file.' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Build the dynamic system context using the portfolio config
    const systemPrompt = `You are the AI Assistant / Virtual Clone of ${PORTFOLIO_CONFIG.personalProfile.name}.
You exist within their high-performance WebGL portfolio ("HFT Orbital Command").
Your tone is highly professional, slightly cyberpunk, confident, and extremely concise. Keep answers short and impactful (under 3 sentences unless asked for details).

Context about Vikas:
Titles: ${PORTFOLIO_CONFIG.personalProfile.titles.join(', ')}
Projects: ${PORTFOLIO_CONFIG.projectMatrix.map(p => p.title + ' (' + p.techStack.join(', ') + ')').join(' | ')}
Skills: ${PORTFOLIO_CONFIG.skills.map(s => s.name).join(', ')}
Certifications: ${PORTFOLIO_CONFIG.certificationGraph.map(c => c.title).join(', ')}

Never break character. Answer the following user query based ONLY on this context.

User Query: ${userMessage}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: systemPrompt
    });

    const reply = response.text || "No response generated.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err: any) {
    // Return 200 with the error message so the HackerTerminal can display it cleanly instead of throwing a generic 400 Bad Request to the console.
    return new Response(JSON.stringify({ reply: `SYSTEM ERROR: ${err.message}` }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
