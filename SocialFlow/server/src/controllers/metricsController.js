import Metrics from '../models/Metrics.js';
import Post from '../models/Post.js';

export const getPostMetrics = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({ _id: postId, userId: req.userId });

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    const metrics = await Metrics.find({ postId }).sort({ collectedAt: -1 });
    res.json({ post, metrics, latestMetrics: metrics || null });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar métricas', error: error.message });
  }
};

export const getMetricsOverview = async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    const periodMap = { '24h': 1, '7d': 7, '30d': 30, '90d': 90 };
    const days = periodMap[period] || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const posts = await Post.find({ userId: req.userId, publishedAt: { $gte: startDate } });
    const postIds = posts.map(p => p._id);

    const metrics = await Metrics.aggregate([
      {
        $match: { postId: { $in: postIds }, collectedAt: { $gte: startDate } }
      },
      {
        $group: {
          _id: '$platform',
          totalLikes: { $sum: '$likes' },
          totalComments: { $sum: '$comments' },
          totalShares: { $sum: '$shares' },
          totalViews: { $sum: '$views' },
          avgEngagement: { $avg: '$engagement' }
        }
      }
    ]);

    res.json({ period, postsCount: posts.length, metrics });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar overview', error: error.message });
  }
};

export const getPlatformMetrics = async (req, res) => {
  try {
    const { platform } = req.params;
    const posts = await Post.find({ userId: req.userId, platforms: platform });
    const postIds = posts.map(p => p._id);
    const metrics = await Metrics.find({ postId: { $in: postIds }, platform }).sort({ collectedAt: -1 }).limit(100);

    res.json({ platform, totalPosts: posts.length, metrics });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar métricas', error: error.message });
  }
};

export const refreshMetrics = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({ _id: postId, userId: req.userId });

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    const metricsData = [];
    for (const platform of post.platforms) {
      const metric = new Metrics({
        postId: post._id,
        platform,
        likes: Math.floor(Math.random() * 5000),
        comments: Math.floor(Math.random() * 500),
        shares: Math.floor(Math.random() * 200),
        views: Math.floor(Math.random() * 50000),
        reach: Math.floor(Math.random() * 30000),
        engagement: Math.random() * 20
      });
      await metric.save();
      metricsData.push(metric);
    }

    res.json({ message: 'Métricas atualizadas', metrics: metricsData });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar métricas', error: error.message });
  }
};
