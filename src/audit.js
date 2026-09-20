const { run } = require('./db');

function audit(req, action, extra = {}) {
  try {
    run(
      'INSERT INTO audit_logs(user_id, action, entity, entity_id, ip, metadata) VALUES (?, ?, ?, ?, ?, ?)',
      [
        req.session?.userId || null,
        action,
        extra.entity || null,
        extra.entityId || null,
        req.ip || null,
        JSON.stringify(extra.metadata || {})
      ]
    );
  } catch (err) {
    console.error('Audit log failed:', err.message);
  }
}

module.exports = { audit };
