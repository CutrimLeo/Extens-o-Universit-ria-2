import Post from '../models/Post.js';
import Activity from '../models/Activity.js';
import socialMediaService from '../services/socialMediaService.js';

export const createPost = async (req, res) => {
  try {
    const { title, description, imageUrl, platforms, scheduledAt } = req.body;

    const post = new Post({
      userId: req.userId,
      title,
      description,
      imageUrl,
      platforms,
      scheduledAt,
      status: scheduledAt ? 'scheduled' : 'draft'
    });

    await post.save();

    await Activity.create({
      userId: req.userId,
      type: 'post_created',
      description: `Post "${title}" criado`,
      postId: post._id
    });

    res.status(201).json({ message: 'Post criado com sucesso', post });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar post', error: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = { userId: req.userId };
    
    if (status) query.status = status;

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar posts', error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id, userId: req.userId });

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar post', error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, platforms } = req.body;

    const post = await Post.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, description, platforms },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    res.json({ message: 'Post atualizado', post });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar post', error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOneAndDelete({ _id: id, userId: req.userId });

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    res.json({ message: 'Post deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar post', error: error.message });
  }
};

export const publishPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id, userId: req.userId });

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    const publishResults = await socialMediaService.publishToAllPlatforms(post, req.userId);

    post.platformData = publishResults;
    post.status = 'published';
    post.publishedAt = new Date();
    await post.save();

    await Activity.create({
      userId: req.userId,
      type: 'post_published',
      description: `Post "${post.title}" publicado em ${post.platforms.join(', ')}`,
      postId: post._id,
      metadata: { platforms: post.platforms }
    });

    res.json({ message: 'Post publicado com sucesso', post, results: publishResults });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao publicar post', error: error.message });
  }
};
