const express = require("express");
const path = require("path");
const { VertexAI } = require("@google-cloud/vertexai");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const LOCATION = process.env.VERTEX_LOCATION || "us-central1";
const MODEL = process.env.VERTEX_MODEL || "gemini-1.5-flash";

function getVertexModel() {
  if (!PROJECT_ID) throw new Error("GOOGLE_CLOUD_PROJECT is not set");
  const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
  return vertexAI.getGenerativeModel({ model: MODEL });
}

app.post("/api/recommend", async (req, res) => {
  try {
    const { budget, useCase, style, brandPreference, country } = req.body || {};

    if (!budget || !useCase || !style) {
      return res.status(400).json({ error: "budget, useCase, and style are required" });
    }

    const prompt = `You are a sneaker advisor for beginners.
User profile:
- Budget: ${budget}
- Use case: ${useCase}
- Style preference: ${style}
- Brand preference: ${brandPreference || "No specific brand"}
- Country/market: ${country || "India"}

Return STRICT JSON with this schema:
{
  "summary": "short buying strategy",
  "recommendations": [
    {"name":"", "priceRange":"", "why":"", "bestFor":""}
  ],
  "fitTips": [""],
  "authenticityTips": [""],
  "careTips": [""]
}
Give 4 recommendations. Keep practical and beginner-friendly.`;

    const model = getVertexModel();
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.5, maxOutputTokens: 1200 }
    });

    const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Attempt to parse JSON; fallback to text response.
    try {
      const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/```$/, "");
      const parsed = JSON.parse(cleaned);
      return res.json({ ok: true, data: parsed });
    } catch {
      return res.json({ ok: true, raw: text });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Vertex AI request failed" });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Sneakers Intro running on port ${port}`);
});
