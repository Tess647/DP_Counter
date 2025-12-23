const DPCounter = require("../models/dpCounter");

/**
 * Get current DP download count
 * GET /api/dp/count
 */
exports.getCount = async (req, res) => {
  try {
    const counter = await DPCounter.getCounter();
    
    res.status(200).json({
      status: "success",
      count: counter.count,
      lastUpdated: counter.lastUpdated,
    });
  } catch (error) {
    console.error("Error fetching count:", error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

/**
 * Increment DP download count
 * POST /api/dp/increment
 * Body: { downloadId: string }
 */
exports.incrementCount = async (req, res) => {
  try {
    const { downloadId } = req.body;

    // Validation
    if (!downloadId) {
      return res.status(400).json({
        status: "fail",
        message: "downloadId is required",
      });
    }

    const counter = await DPCounter.getCounter();

    // Check if this download was already counted (prevent double-counting)
    if (counter.downloadIds.includes(downloadId)) {
      return res.status(200).json({
        status: "success",
        message: "Download already counted",
        count: counter.count,
        alreadyCounted: true,
      });
    }

    // Increment count and add downloadId
    counter.count += 1;
    counter.downloadIds.push(downloadId);
    counter.lastUpdated = Date.now();
    
    // Keep only last 10000 downloadIds to prevent array from growing too large
    if (counter.downloadIds.length > 10000) {
      counter.downloadIds = counter.downloadIds.slice(-10000);
    }

    await counter.save();

    res.status(200).json({
      status: "success",
      count: counter.count,
      message: "Count incremented successfully",
      alreadyCounted: false,
    });
  } catch (error) {
    console.error("Error incrementing count:", error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

/**
 * Reset counter (optional - for admin/testing)
 * POST /api/dp/reset
 */
exports.resetCount = async (req, res) => {
  try {
    const counter = await DPCounter.getCounter();
    counter.count = 0;
    counter.downloadIds = [];
    counter.lastUpdated = Date.now();
    await counter.save();

    res.status(200).json({
      status: "success",
      message: "Counter reset successfully",
      count: 0,
    });
  } catch (error) {
    console.error("Error resetting count:", error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};