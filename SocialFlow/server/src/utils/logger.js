import fs from 'fs';
import path from 'path';

const logsDir = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const getTimestamp = () => new Date().toISOString();

export const info = (message) => {
  const log = `[${getTimestamp()}] INFO: ${message}\n`;
  console.log(`✓ ${message}`);
  fs.appendFileSync(path.join(logsDir, 'app.log'), log);
};

export const error = (message, error) => {
  const errorMessage = error ? error.stack : message;
  const log = `[${getTimestamp()}] ERROR: ${errorMessage}\n`;
  console.error(`✗ ${message}`, error);
  fs.appendFileSync(path.join(logsDir, 'error.log'), log);
};

export const warn = (message) => {
  const log = `[${getTimestamp()}] WARN: ${message}\n`;
  console.warn(`⚠ ${message}`);
  fs.appendFileSync(path.join(logsDir, 'app.log'), log);
};
