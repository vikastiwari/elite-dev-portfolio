import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const userMessage = body.message || '';

    // Phase 3 MVP: Mocked response. 
    // In Phase 6, this connects to Cloudflare Vectorize + Gemini.
    let reply = "I am the AI assistant. I don't know much yet.";
    
    if (userMessage.includes('whoami')) {
      reply = "You are interacting with Vikas's God-Tier WebGL portfolio.";
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
};
