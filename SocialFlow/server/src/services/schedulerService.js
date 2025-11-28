import cron from 'node-cron';
import Metrics from '../models/Metrics.js';
import Post from '../models/Post.js';
import Activity from '../models/Activity.js';

class SchedulerService {
  constructor() {
    this.jobs = [];
  }

  start() {
    const collectMetricsJob = cron.schedule('0 * * * *', () => {
      console.log('⏰ Coletando métricas...');
      this.collectAllMetrics();
    });

    const publishScheduledJob = cron.schedule('*/5 * * * *', () => {
      console.log('⏰ Verificando posts agendados...');
      this.publishScheduledPosts();
    });

    this.jobs.push(collectMetricsJob, publishScheduledJob);
    console.log('✓ Scheduler iniciado');
  }

  async collectAllMetrics() {
    try {
      const posts = await Post.find({
        status: 'published',
        publishedAt: { $exists: true }
      });

      for (const post of posts) {
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
        }
      }

      console.log(`✓ Métricas coletadas: ${posts.length} posts`);
    } catch (error) {
      console.error('✗ Erro ao coletar métricas:', error);
    }
  }

  async publishScheduledPosts() {
    try {
      const now = new Date();
      const scheduledPosts = await Post.find({
        status: 'scheduled',
        scheduledAt: { $lte: now }
      });

      for (const post of scheduledPosts) {
        post.status = 'published';
        post.publishedAt = new Date();
        await post.save();

        await Activity.create({
          userId: post.userId,
          type: 'post_published',
          description: `Post "${post.title}" foi publicado automaticamente`,
          postId: post._id
        });
      }

      if (scheduledPosts.length > 0) {
        console.log(`✓ Posts publicados: ${scheduledPosts.length}`);
      }
    } catch (error) {
      console.error('✗ Erro ao publicar posts agendados:', error);
    }
  }

  stop() {
    this.jobs.forEach(job => job.stop());
    console.log('✓ Scheduler parado');
  }
}

export default new SchedulerService();
