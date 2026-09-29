import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Server-side proxy for n8n chatbot webhook (prevents browser CORS and fetch failures)
  app.post('/api/n8n-chat', async (req, res) => {
    const N8N_PROD_URL = 'https://deepumomentacretions.app.n8n.cloud/webhook/389f5bf8-b418-48fc-ae87-750b15983946/chat';
    const N8N_TEST_URL = 'https://deepumomentacretions.app.n8n.cloud/webhook-test/389f5bf8-b418-48fc-ae87-750b15983946/chat';

    const { chatInput, message, sessionId } = req.body;
    const userText = chatInput || message || '';
    const activeSessionId = sessionId || 'session_' + Date.now();

    try {
      // Attempt 1: Production Webhook
      let n8nRes = await fetch(N8N_PROD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: userText,
          message: userText,
          query: userText,
          sessionId: activeSessionId
        })
      });

      // Attempt 2: Test Webhook if 404
      if (!n8nRes.ok && n8nRes.status === 404) {
        n8nRes = await fetch(N8N_TEST_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
          },
          body: JSON.stringify({
            action: 'sendMessage',
            chatInput: userText,
            message: userText,
            query: userText,
            sessionId: activeSessionId
          })
        });
      }

      if (n8nRes.ok) {
        const contentType = n8nRes.headers.get('content-type') || '';
        let reply = '';
        if (contentType.includes('application/json')) {
          const data: any = await n8nRes.json();
          reply = data.output || data.response || data.text || data.message || (Array.isArray(data) && data[0]?.output) || (typeof data === 'string' ? data : JSON.stringify(data));
        } else {
          reply = await n8nRes.text();
        }

        if (reply && typeof reply === 'string' && reply.trim().length > 0) {
          return res.json({ text: reply.trim(), success: true, source: 'n8n' });
        }
      }

      // If n8n returned 404 / inactive workflow notice
      return res.json({
        text: "🌸 Hello! Your n8n chatbot is connected. (Note: In your n8n workflow editor, toggle the switch to 'Active' so it automatically processes messages). In the meantime, you can ask about our pipe cleaner flowers, flower pots, keychains, or chat with Deepu on WhatsApp at 9703265096! 💕",
        success: true,
        source: 'fallback'
      });
    } catch (err: any) {
      console.error('Error forwarding to n8n:', err);
      return res.json({
        text: "Hello! 🌸 Welcome to Deepu Momenta Creations. Our handcrafted flower pots, bouquets, and bespoke keychains are available for custom orders. Feel free to contact Deepu directly on WhatsApp at 9703265096! 💕",
        success: true,
        source: 'fallback'
      });
    }
  });

  // Serve static files or mount Vite
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer();
