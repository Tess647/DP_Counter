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
});

DPCounterSchema.statics.getCounter = async function() {
  let counter = await this.findOne();
  if (!counter) {
    counter = await this.create({ count: 0, downloadIds: [] });
  }
  return counter;
};

module.exports = mongoose.model("DPCounter", DPCounterSchema);