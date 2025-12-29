// src/api/instagram.js

import fetch from 'node-fetch';

const CACHE_TTL = 24 * 60 * 60 * 1000;
let CACHE = { ts: 0, data: null };

export default async function instagram(req, res) {
  const limit = parseInt(req.query.limit || '6', 10);

  if (CACHE.data && Date.now() - CACHE.ts < CACHE_TTL) {
    return res.json({
      posts: CACHE.data.slice(0, limit),
      hasMore: CACHE.data.length > limit,
    });
  }

  const { IG_USER_ID, IG_ACCESS_TOKEN } = process.env;

  if (!IG_USER_ID || !IG_ACCESS_TOKEN) {
    return res.status(500).json({ error: 'Missing env vars' });
  }

  const fields =
    'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';

  const url = `https://graph.facebook.com/v19.0/${IG_USER_ID}/media?fields=${fields}&access_token=${IG_ACCESS_TOKEN}&limit=20`;

  try {
    const r = await fetch(url);
    const json = await r.json();

    const posts = json.data.map(item => ({
      id: item.id,
      network: 'instagram',
      url: item.permalink,
      thumbnail: item.thumbnail_url || item.media_url,
      date: item.timestamp,
      caption: item.caption || '',
      alt: `Post Instagram Rêve d’Ivoire`,
    }));

    CACHE = { ts: Date.now(), data: posts };

    res.json({
      posts: posts.slice(0, limit),
      hasMore: posts.length > limit,
    });
  } catch {
    res.status(500).json({ error: 'Instagram fetch failed' });
  }
}
