const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const root = path.join(__dirname, '..');
const dataDir = path.join(root, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const isProduction = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || 3000);
const rawDb = process.env.DATABASE_PATH || path.join(dataDir, 'santa-credit.db');

module.exports = {
  root,
  dataDir,
  port,
  isProduction,
  sessionSecret: process.env.SESSION_SECRET || 'development-only-change-me-santa-credit',
  databasePath: rawDb === ':memory:' || path.isAbsolute(rawDb) ? rawDb : path.resolve(root, rawDb),
  appUrl: process.env.APP_URL || `http://localhost:${port}`,
  adminName: process.env.ADMIN_NAME || 'PoshSanta Credit Desk',
  adminEmail: String(process.env.ADMIN_EMAIL || 'admin@poshsanta.ng').trim().toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD || 'ChangeMe!Santa1',
  whatsappNumber: (process.env.WHATSAPP_NUMBER || '').replace(/\D/g, ''),
  seedDemo: String(process.env.SEED_DEMO || 'true') !== 'false'
};
