const clients = new Set();

function subscribe(res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  res.write('\n');
  clients.add(res);
  res.on('close', () => clients.delete(res));
}

function broadcast(event, payload) {
  const chunk = `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
  for (const res of clients) {
    try { res.write(chunk); } catch (_) { clients.delete(res); }
  }
}

module.exports = { subscribe, broadcast };
