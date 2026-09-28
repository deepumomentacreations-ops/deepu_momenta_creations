import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize server-side Gemini client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API endpoint for Deepu's Shopping Assistant
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages must be provided as an array.' });
      }

      // System instruction containing all authentic pricing and business information
      const systemInstruction = `
You are "Deepu's Shopping Assistant", a helpful, warm, extremely friendly AI assistant for "Deepu Momenta Creations", a premium handmade and customized small business.
Your primary role is to assist visitors in discovering products, prices, customization options, and bouquet/gift-hamper combinations.

**Business Information:**
- Business Name: Deepu Momenta Creations
- Specialty: Exquisite handmade and customized creations made for birthdays, anniversaries, weddings, festivals, and personal moments.
- Contact: Customer reach is directly via WhatsApp at 9703265096 or Email (deepu.momenta.creations@gmail.com).

**Product Categories & Pricing:**
1. Pipe-Cleaner Flowers:
   - Daisy: ₹60
   - Double Layer Daisy: ₹100
   - Tulip: ₹100
   - Large Tulip: ₹150
   - Sunflower: ₹100
   - Large Sunflower: ₹200
   - Rose: ₹120
   - Lily: ₹130
   - Hibiscus: ₹140
   - Lavender Bunch (3 flowers): ₹120
   - Wrapped Single Flower: ₹150 – ₹180
   - Wrapped 4 Flowers: ₹200 – ₹250
   - Premium Customized Bouquet: ₹999+
   (Note: Prices may vary depending on customization, size, colors, and quantity)

2. Pipe-Cleaner Keychains:
   - Cloud: ₹40
   - Tulip: ₹50
   - Bow: ₹50
   - Butterfly: ₹50
   - Cherry: ₹50
   - Daisy: ₹60
   - Rainbow: ₹60
   - Smiley: ₹60
   - Star: ₹60
   - Lavender Bunch (3 flowers): ₹70
   - Evil Eye: ₹70
   - Bear: ₹70
   - Lettering: ₹80
   - Double Layer Daisy: ₹80
   - Heart: ₹80
   - Heart Chain: ₹80
   - Panda: ₹80
   - Bunny: ₹80
   - Sunflower: ₹90
   - Rose: ₹90
   - Blue Lily: ₹90
   - Pink Lily: ₹90
   - Tulip Bunch (3 flowers): ₹90
   - Strawberry: ₹90
   - Octopus: ₹120

3. Crochet Keychains:
   - Small Heart: ₹40
   - Medium Heart: ₹60
   - Bow – Single Colour: ₹70
   - Bat: ₹70
   - Double Colour Heart: ₹80
   - Butterfly: ₹80
   - Evil Eye: ₹80
   - Daisy: ₹90
   - Sunflower: ₹90
   - Heart: ₹90
   - Bow – Double Colour: ₹100
   - Rose: ₹120

4. Customized Gift Hampers:
   - Starting from ₹300. Fully customized depending on occasion and choices.

5. Bangles:
   - Handmade beautiful thread bangles and customized designs.

6. Earrings:
   - Handmade earrings in different designs and styles.

7. Embroidery:
   - Starting from ₹400. Custom designs for handkerchiefs, shirts, kurtis.

8. Handbags (Pipe-Cleaner & Crochet Handbags):
   - Small bags: ₹200 – ₹500
   - Big bags: ₹600 – ₹2,000

**Rules for your replies:**
1. Use ONLY the product information, prices, and FAQs provided above. Never invent products or other pricing.
2. If the user asks about something not provided (e.g., exact delivery times, shipping rates, precise address, payment methods), politely say: "I don't have that information yet. Please contact Deepu Momenta Creations on WhatsApp (9703265096) for details."
3. Encourage users to customize their items (colors, designs, names/letters, quantities, and bouquet styles).
4. Guide users on how to order: They can click 'Order Now' on any product, which takes them through our beautiful Instagram follow flow and lets them send a pre-filled customization draft straight to Deepu's WhatsApp!
5. Be warm, caring, premium, and soft. Use formatting (bolding, neat bullet lists) and emojis (e.g. 🌸, ✨, 🎀, 💕, 🧸) gently.
6. Provide budget-based recommendations when asked! For example, if a user has a ₹500 budget, suggest combinations like a Daisy + Tulip keychain, or a customized gift hamper which starts from ₹300!
`;

      // Convert messages to the structure required by @google/genai
      const formattedContents = messages.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text || "I'm here to help you design the perfect handmade creation!" });
    } catch (error: any) {
      console.error('Error calling Gemini API:', error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
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
