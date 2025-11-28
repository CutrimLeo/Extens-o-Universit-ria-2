import SocialAccount from '../models/SocialAccount.js';

export const connectAccount = async (req, res) => {
  try {
    const { platform, username, accessToken, refreshToken, expiresAt } = req.body;

    const existingAccount = await SocialAccount.findOne({ userId: req.userId, platform });
    if (existingAccount) {
      return res.status(400).json({ message: 'Conta já conectada' });
    }

    const socialAccount = new SocialAccount({
      userId: req.userId,
      platform,
      username,
      accessToken,
      refreshToken,
      expiresAt
    });

    await socialAccount.save();

    res.status(201).json({
      message: `${platform} conectado com sucesso`,
      account: { id: socialAccount._id, platform, username, isActive: socialAccount.isActive }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao conectar conta', error: error.message });
  }
};

export const getAccounts = async (req, res) => {
  try {
    const accounts = await SocialAccount.find({ userId: req.userId }).select('-accessToken -refreshToken');
    res.json({ accounts });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar contas', error: error.message });
  }
};

export const disconnectAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await SocialAccount.findOneAndDelete({ _id: id, userId: req.userId });

    if (!account) {
      return res.status(404).json({ message: 'Conta não encontrada' });
    }

    res.json({ message: `${account.platform} desconectado com sucesso` });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao desconectar', error: error.message });
  }
};

export const validateToken = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await SocialAccount.findOne({ _id: id, userId: req.userId });

    if (!account) {
      return res.status(404).json({ message: 'Conta não encontrada' });
    }

    const now = new Date();
    if (account.expiresAt && account.expiresAt < now) {
      return res.json({ isValid: false, message: 'Token expirado. Reconecte a conta.' });
    }

    res.json({ isValid: true, platform: account.platform, username: account.username });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao validar token', error: error.message });
  }
};
