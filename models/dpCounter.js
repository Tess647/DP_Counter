const mongoose = require("mongoose");

const DPCounterSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  downloadIds: {
    type: [String],
    default: [],
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  // Add collection name to avoid potential naming issues
  collection: 'dpcounters'
});

DPCounterSchema.statics.getCounter = async function() {
  try {
    // Use findOneAndUpdate with upsert to ensure a counter always exists
    let counter = await this.findOneAndUpdate(
      {},
      { $setOnInsert: { count: 0, downloadIds: [], lastUpdated: new Date() } },
      { 
        upsert: true, 
        new: true,
        setDefaultsOnInsert: true 
      }
    );
    return counter;
  } catch (error) {
    console.error("Error getting counter:", error);
    // Fallback: try to find or create
    let counter = await this.findOne();
    if (!counter) {
      counter = await this.create({ count: 0, downloadIds: [] });
    }
    return counter;
  }
};

// Add a method to increment the counter and track download IDs
DPCounterSchema.statics.incrementCounter = async function(downloadId = null) {
  try {
    const update = {
      $inc: { count: 1 },
      $set: { lastUpdated: new Date() }
    };
    
    // If a downloadId is provided, add it to the array
    if (downloadId) {
      update.$addToSet = { downloadIds: downloadId };
    }
    
    const counter = await this.findOneAndUpdate(
      {},
      update,
      { 
        upsert: true, 
        new: true,
        setDefaultsOnInsert: true 
      }
    );
    
    return counter;
  } catch (error) {
    console.error("Error incrementing counter:", error);
    throw error;
  }
};

// Add a method to check if a downloadId exists
DPCounterSchema.statics.hasDownloadId = async function(downloadId) {
  const counter = await this.findOne({ downloadIds: downloadId });
  return counter !== null;
};

module.exports = mongoose.model("DPCounter", DPCounterSchema);