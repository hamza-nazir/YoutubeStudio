const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  videoID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Videos',
    required: true,
    index: true
  }],
  watchLater:[{
       type: mongoose.Schema.Types.ObjectId,
    ref: 'Videos',
    required: true,
    index: true
  }],




}, { timestamps: true });



module.exports = mongoose.model('History', historySchema);
