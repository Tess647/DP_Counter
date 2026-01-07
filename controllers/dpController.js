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

    // Check if this download was already counted using the model method
    const alreadyCounted = await DPCounter.hasDownloadId(downloadId);
    
    if (alreadyCounted) {
      // Still return the current count
      const counter = await DPCounter.getCounter();
      return res.status(200).json({
        status: "success",
        message: "Download already counted",
        count: counter.count,
        alreadyCounted: true,
      });
    }

    // Use the new incrementCounter method which handles creation if needed
    const counter = await DPCounter.incrementCounter(downloadId);

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
    // Instead of getting and updating, directly create/update with zero
    const counter = await DPCounter.findOneAndUpdate(
      {},
      { count: 0, downloadIds: [], lastUpdated: new Date() },
      { 
        upsert: true, 
        new: true,
        setDefaultsOnInsert: true 
      }
    );

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