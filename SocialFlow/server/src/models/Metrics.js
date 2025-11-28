import mongoose from 'mongoose';

const metricsSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  platform: {
    type: String,
    enum: ['instagram', 'facebook', 'linkedin', 'tiktok'],
    required: true
  },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  reach: { type: Number, default: 0 },
  impressions: { type: Number, default: 0 },
  engagement: { type: Number, default: 0 },
  saves: { type: Number, default: 0 },
  collectedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

metricsSchema.index({ postId: 1, platform: 1 });

export default mongoose.model('Metrics', metricsSchema);
