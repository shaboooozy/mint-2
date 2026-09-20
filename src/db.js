const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');
const config = require('./config');

const db = new DatabaseSync(config.databasePath);
db.exec('PRAGMA foreign_keys = ON');
db.exec('PRAGMA journal_mode = WAL');
db.exec('PRAGMA busy_timeout = 5000');

const schema = fs.readFileSync(path.join(config.root, 'schema.sql'), 'utf8');
db.exec(schema);

function tx(fn) {
  db.exec('BEGIN IMMEDIATE');
  try {
    const result = fn();
    db.exec('COMMIT');
    return result;
  } catch (err) {
    try { db.exec('ROLLBACK'); } catch (_) { /* ignore */ }
    throw err;
  }
}

function all(sql, params = []) {
  return db.prepare(sql).all(...params);
}

function get(sql, params = []) {
  return db.prepare(sql).get(...params) || null;
}

function run(sql, params = []) {
  return db.prepare(sql).run(...params);
}

function nextRef(prefix) {
  const year = new Date().getFullYear();
  const key = `${prefix}-${year}`;
  const row = get('SELECT value FROM counters WHERE name = ?', [key]);
  const value = row ? row.value + 1 : 1;
  if (row) run('UPDATE counters SET value = ? WHERE name = ?', [value, key]);
  else run('INSERT INTO counters(name, value) VALUES (?, ?)', [key, value]);
  return `${key}-${String(value).padStart(4, '0')}`;
}

function parseJson(value, fallback) {
  if (value == null || value === '') return fallback;
  try { return JSON.parse(value); } catch (_) { return fallback; }
}

module.exports = { db, tx, all, get, run, nextRef, parseJson };
