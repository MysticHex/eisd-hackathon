// Mock LLM Adapter
exports.generateRecommendation = async (prompt) => {
  if (!prompt || typeof prompt !== 'string') {
    throw new TypeError('Prompt must be a non-empty string');
  }
  
  const useMock = process.env.USE_MOCK_LLM === 'true';
  
  if (useMock) {
    // Simple heuristic-based mock response
    if (prompt.includes("efficiency")) {
      return "Detected downtime pattern on Station 3. Suggested Action: Check hydraulic pressure sensor.";
    }
    return "General optimization: Balanced production flow detected.";
  } else {
    // Implement OpenAI/Anthropic call here
    throw new Error("Real LLM API not configured");
  }
};