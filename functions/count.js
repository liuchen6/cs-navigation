export async function onRequest(context) {
  const kv = context.env.COUNTER;
  if (!kv) return json(null);
  try {
    const key = 'uv';
    const cur = parseInt((await kv.get(key, { type: 'text' })) || '0', 10);
    const next = cur + 1;
    await kv.put(key, String(next));
    return json({ uv: next });
  } catch (e) {
    return json(null);
  }
}

function json(v) {
  return new Response(JSON.stringify({ uv: v }), {
    headers: { 'content-type': 'application/json' },
  });
}