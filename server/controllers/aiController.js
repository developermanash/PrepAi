const { GoogleGenAI } = require("@google/genai");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompt");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc  Generate interview questions and answers
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberofQuestions } = req.body;

    console.log("▶️ Received request to generate questions:", {
      role,
      experience,
      topicsToFocus,
      numberofQuestions,
    });

    if (!role || !experience || !topicsToFocus || !numberofQuestions) {
      console.warn("⚠️ Missing fields in request body");
      return res.status(400).json({ message: "Missing required fields." });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberofQuestions
    );

    console.log("📝 Generated Prompt:", prompt);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    console.log("📦 Raw response from Gemini:", response);

    let rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    console.log("🧹 Cleaned response text:", cleanedText);

    const data = JSON.parse(cleanedText);
    console.log("✅ Parsed response:", data);

    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error generating interview questions:", error);
    res.status(500).json({
      message: "Failed to Generate questions",
      error: error.message,
    });
  }
};

// @desc  Generate explanation for a question
const generateConceptExplanationQuestions = async (req, res) => {
  try {
    const { question } = req.body;

    console.log("▶️ Received request for explanation:", { question });

    if (!question) {
      console.warn("⚠️ Missing question in request body");
      return res.status(400).json({ message: "Missing required fields." });
    }

    const prompt = conceptExplainPrompt(question);
    console.log("📝 Generated explanation prompt:", prompt);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    console.log("📦 Raw response from Gemini:", response);

    let rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    console.log("🧹 Cleaned explanation text:", cleanedText);

    const data = JSON.parse(cleanedText);
    console.log("✅ Parsed explanation response:", data);

    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error generating explanation:", error);
    res.status(500).json({
      message: "Failed to Generate questions Explanations",
      error: error.message,
    });
  }
};

module.exports = {
  generateConceptExplanationQuestions,
  generateInterviewQuestions,
};
