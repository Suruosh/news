// REVIEW: Duplicated AI logic from server/routes/ai.js. The prompts in the two
// copies have already diverged (this one says "mention slightly and lightly" while
// the server version says "Focus on identifying narrative differences"). Keep one
// source of truth for the prompt to avoid inconsistencies.
var GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    var urls = req.body.urls;
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "Please provide an array of URLs" });
    }

    var urlList = urls
      .map(function (url, i) {
        return i + 1 + ". " + url;
      })
      .join("\n");

    var prompt =
      "You are a professional news analyst. Analyze the following news article URLs " +
      "Analyze the news articles from the URLs provided below and synthesize them into a single, coherent, high-quality article. mention slightly and lightly on narrative differences, framing, tone, and bias between Eastern and Western media sources.\n\n" +
      "URLs to analyze:\n" +
      urlList +
      "\n\n" +
      "Respond ONLY with valid JSON (no markdown fences, no extra text). " +
      "Use this exact format:\n" +
      "{\n" +
      '  "title": "A compelling headline for the article",\n' +
      '  "summary": "A brief 2-3 sentence summary",\n' +
      '  "content": "A detailed article (200-400 words) covering the key points from these sources",\n' +
      '  "category": "One of: Travel, Culture, Art, Technology, History, Opinion, Politics, Business, Science, Sports",\n' +
      '  "keyPoints": ["key point 1", "key point 2", "key point 3"],\n' +
      '  "sources": ["source name 1", "source name 2"]\n' +
      "}";

    var geminiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=" +
      GEMINI_API_KEY;

    var response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      var errorData = await response.json().catch(function () {
        return {};
      });
      throw new Error(errorData.error?.message || "Failed to get AI analysis");
    }

    var data = await response.json();
    // REVIEW: Same null-safety issue as server/routes/ai.js — no defensive checks
    // on the AI response structure before accessing nested properties.
    var text = data.candidates[0].content.parts[0].text;

    var clean = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    var result = JSON.parse(clean);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
