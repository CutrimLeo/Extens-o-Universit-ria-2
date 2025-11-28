import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32));

export const encrypt = (text) => {
  if (!text) return text;
  
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + ':' + encrypted;
};

export const decrypt = (text) => {
  if (!text) return text;
  
  const parts = text.split(':');
  const iv = Buffer.from(parts, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  
  let decrypted = decipher.update(parts, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};
