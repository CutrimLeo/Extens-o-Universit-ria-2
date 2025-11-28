import Activity from '../models/Activity.js';

export const getActivities = async (req, res) => {
  try {
    const { page = 1, limit = 20, type, platform } = req.query;
    const query = { userId: req.userId };
    
    if (type) query.type = type;
    if (platform) query.platform = platform;

    const activities = await Activity.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('postId', 'title description');

    const total = await Activity.countDocuments(query);

    res.json({
      activities,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar atividades', error: error.message });
  }
};

export const getActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findOne({ _id: id, userId: req.userId }).populate('postId');

    if (!activity) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    res.json({ activity });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar atividade', error: error.message });
  }
};
