const TicsEvent = require('../models/tics_event.model');
const llmAdapter = require('../../../shared/adapters/llm.adapter');

class TicsService {
  async ingestBatch(events) {
    // Bulk create events
    // Ensure metadata is stringified if it's an object, as the model defines it as TEXT
    const formattedEvents = events.map(event => ({
      ...event,
      metadata: typeof event.metadata === 'object' ? JSON.stringify(event.metadata) : event.metadata
    }));
    
    return await TicsEvent.bulkCreate(formattedEvents);
  }

  async getLatestAnalysis() {
    // Fetch recent events to analyze
    // For simplicity, let's fetch the last 10 events
    const recentEvents = await TicsEvent.findAll({
      limit: 10,
      order: [['timestamp', 'DESC']]
    });

    if (recentEvents.length === 0) {
      return "No data available for analysis.";
    }

    // Construct a prompt from events
    const prompt = `Analyze the following production events for efficiency and errors: ${JSON.stringify(recentEvents)}`;
    
    // Call LLM Adapter
    return await llmAdapter.generateRecommendation(prompt);
  }
}

module.exports = new TicsService();