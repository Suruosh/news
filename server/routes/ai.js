import { Router } from "express";

var router = Router();

// REVIEW: GEMINI_API_KEY is not validated at startup. If it's undefined, the API call
// will fail with a confusing error. Add an early check and throw a clear error message.
var GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post("/analyze", async function (req, res) {
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

    // REVIEW: The prompt starts with "Analyze the following news article URLs" then
    // immediately repeats "Analyze the news articles from the URLs provided below".
    // This redundancy wastes tokens and may confuse the model. Clean up the prompt.
    var prompt =
      "You are a professional news analyst. Analyze the following news article URLs " +
      "Analyze the news articles from the URLs provided below and synthesize them into a single, coherent, high-quality article. Focus on identifying narrative differences, framing, tone, and bias between Eastern and Western media sources.\n\n" +
      "- Extract and compare how different regions frame the same story (e.g., emphasis, omissions, tone, political alignment).\n" +
      "- Highlight at least 2\u20133 clear contrasts between Eastern and Western narratives.\n" +
      "- Maintain journalistic neutrality while acknowledging bias in sources.\n" +
      "- Do NOT fabricate facts. Base analysis strictly on the provided URLs.\n" +
      "- Write in a professional, publication-ready tone.\n" +
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

    // REVIEW: Passing the API key as a URL query parameter is a security concern — it
    // can appear in server logs, proxy logs, and monitoring tools. Use an HTTP header
    // (e.g. `x-goog-api-key`) instead.
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
    // REVIEW: No null-safety on this chain. If the AI returns no candidates, or the
    // response structure differs, this will throw a cryptic "Cannot read properties
    // of undefined" error. Add defensive checks (e.g. data?.candidates?.[0]?.content...).
    var text = data.candidates[0].content.parts[0].text;

    var clean = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    var result = JSON.parse(clean);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
