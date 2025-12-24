const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  url: String,
  
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  videoLink: {
    type: String,
    index: true
  },

  originalVideoName: String,

 

  title: String,
  description: String,
  category: String,
  moderation: String,
  sortBy: String,

  isDraft:{
    type:Boolean,
    default:'true'
  },
  duration:{
    type:Number
  },
  visibility: {
    type: String,
    enum: ["Unlisted", "Public", "Private"],
  },

  tags: [String],

  forKids: Boolean,
  restrictOverEighteen: Boolean,
  commentStatus: Boolean,
  showLikeCount: Boolean

}, { timestamps: true });

videoSchema.index({ title: "text", tags: "text" });
videoSchema.index({ owner: 1, createdAt: -1 });

module.exports = mongoose.model('Videos', videoSchema);
