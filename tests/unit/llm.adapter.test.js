describe('LLM Adapter', () => {
  let llmAdapter;
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env.USE_MOCK_LLM = 'true';
    llmAdapter = require('../../src/shared/adapters/llm.adapter');
  });

  afterEach(() => {
    delete process.env.USE_MOCK_LLM;  });

  test('should return mock recommendation when mock flag is true', async () => {
    const prompt = "Analyze efficiency data";
    const result = await llmAdapter.generateRecommendation(prompt);
    
    // Mock contract: "efficiency" keyword triggers the specific downtime message
    const expectedResponse = "Detected downtime pattern on Station 3. Suggested Action: Check hydraulic pressure sensor.";
    expect(result).toBe(expectedResponse);
    expect(typeof result).toBe('string');
  });
});