// Mock LLM Adapter
const DETECTED_DOWNTIME_MSG = "Detected downtime pattern on Station 3. Suggested Action: Check hydraulic pressure sensor.";
const GENERAL_OPTIMIZATION_MSG = "General optimization: Balanced production flow detected.";

exports.generateRecommendation = async (prompt) => {
  if (!prompt || typeof prompt !== 'string') {
    throw new TypeError("Prompt must be a valid string");
  }

  const useMock = process.env.USE_MOCK_LLM === 'true';
  
  if (useMock) {
    // Simple heuristic-based mock response
    if (prompt.toLowerCase().includes("efficiency")) {
      return DETECTED_DOWNTIME_MSG;
    }
    return GENERAL_OPTIMIZATION_MSG;
  } else {
    // Implement OpenAI/Anthropic call here
    throw new Error("Real LLM API not configured");
  }
};