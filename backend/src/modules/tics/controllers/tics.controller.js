const ticsService = require('../services/tics.service');

exports.ingestEvents = async (req, res, next) => {
  try {
    const events = req.body.events; // Expect array of objects
    if (!events || !Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ message: "'events' must be a non-empty array" });
    }
    if (events.length > 1000) {
      return res.status(400).json({ message: "'events' array exceeds maximum size of 1000" });
    }
    // Validate each event has required structure
    const invalidIndex = events.findIndex(e => e === null || typeof e !== 'object' || Array.isArray(e));
    if (invalidIndex >= 0) {
      return res.status(400).json({ message: `'events' must contain only valid objects (invalid item at index ${invalidIndex})` });
    }    
    const result = await ticsService.ingestBatch(events);
    res.status(201).json({ message: 'Events ingested', data: result });
  } catch (error) { next(error); }
};

exports.getSummary = async (req, res, next) => {
  try {
    const analysis = await ticsService.getLatestAnalysis();
    res.json({ data: analysis });
  } catch (error) { next(error); }
};