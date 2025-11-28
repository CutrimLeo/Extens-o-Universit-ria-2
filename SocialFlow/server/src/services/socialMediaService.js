import SocialAccount from '../models/SocialAccount.js';

class SocialMediaService {
  async publishToAllPlatforms(post, userId) {
    const results = [];

    for (const platform of post.platforms) {
      try {
        const account = await SocialAccount.findOne({
          userId,
          platform,
          isActive: true
        });

        if (!account) {
          results.push({
            platform,
            status: 'failed',
            error: 'Conta não conectada'
          });
          continue;
        }

        const result = {
          platform,
          postId: 'mock_' + Date.now(),
          url: `https://${platform}.com/post/${Date.now()}`,
          status: 'published'
        };

        results.push(result);
      } catch (error) {
        results.push({
          platform,
          status: 'failed',
          error: error.message
        });
      }
    }

    return results;
  }

  async getCurrentMetrics(platform) {
    const metrics = {
      instagram: {
        bestTime: '18:00-21:00',
        hashtags: ['#photography', '#lifestyle', '#instagood'],
        filters: ['Valencia', 'Clarendon', 'Juno']
      },
      facebook: {
        format: 'carousel',
        cta: 'Saiba Mais',
        audience: '25-45 anos'
      },
      linkedin: {
        tone: 'professional',
        keywords: ['Inovação', 'Crescimento', 'Estratégia'],
        bestDays: ['Tuesday', 'Thursday']
      },
      tiktok: {
        format: 'vertical_9_16',
        duration: '15-30s',
        music: 'trending'
      }
    };

    return metrics[platform] || {};
  }
}

export default new SocialMediaService();
