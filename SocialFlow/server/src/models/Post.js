import mongoose from 'mongoose';

const platformDataSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ['instagram', 'facebook', 'linkedin', 'tiktok'],
    required: true
  },
  postId: String,
  url: String,
  status: {
    type: String,
    enum: ['pending', 'published', 'failed'],
    default: 'pending'
  },
  publishedAt: Date
}, { _id: false });

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  platforms: [{
    type: String,
    enum: ['instagram', 'facebook', 'linkedin', 'tiktok']
  }],
  platformData: [platformDataSchema],
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'published', 'failed'],
    default: 'draft'
  },
  scheduledAt: Date,
  publishedAt: Date
}, {
  timestamps: true
});

postSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('Post', postSchema);
