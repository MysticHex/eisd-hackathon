describe('LLM Adapter', () => {
  let llmAdapter;
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv, USE_MOCK_LLM: 'true' };
    llmAdapter = require('../../src/shared/adapters/llm.adapter');
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test('should return mock recommendation when mock flag is true', async () => {
    const prompt = "Analyze efficiency data";
    const result = await llmAdapter.generateRecommendation(prompt);
    
    expect(result).toContain("downtime"); // Assuming mock response echoes or relates
    expect(typeof result).toBe('string');
  });
});