// SocialFeed_Rêve_dIvoire.jsx
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function IconInstagram({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  );
}

function formatDateISO(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
  } catch (e) {
    return dateStr || '';
  }
}

export default function SocialFeed({
  mode = 'server',
  initialPosts = [],
  limit = 6,
  fetchMore = null,
  elfsightAppId = ''
}) {
  // client-only guard to avoid SSR mismatches (pages/ router)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  const [posts, setPosts] = useState(initialPosts.length ? initialPosts.slice(0, limit) : []);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const embedLoadedRef = useRef({ instagram: false });

  // Server-mode fetch
  useEffect(() => {
    if (mode !== 'server') return;
    if (initialPosts.length) {
      setPosts(initialPosts.slice(0, limit));
      return;
    }
    setLoading(true);
    fetch(`/api/instagram?limit=${limit}`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data.posts)) {
          setPosts(data.posts);
          setHasMore(Boolean(data.hasMore));
        }
      })
      .catch((e) => {
        // log quietly for debugging
        // console.warn('Instagram API fetch failed', e);
      })
      .finally(() => setLoading(false));
  }, [mode, initialPosts.length, limit]);

  // Elfsight init: robust handling whether script exists, loaded or not.
  useEffect(() => {
    if (!isClient) return;
    if (mode !== 'elfsight' || !elfsightAppId) return;

    const initElfsight = () => {
      if (typeof window !== 'undefined' && window.elfsight && typeof window.elfsight.init === 'function') {
        try { window.elfsight.init(); } catch (e) { /* silence */ }
      }
    };

    const selector = 'script[src="https://elfsightcdn.com/platform.js"]';
    const existingScript = document.querySelector(selector);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      script.onload = initElfsight;
      document.body.appendChild(script);
      // nothing to cleanup here (script stays)
      return;
    }

    // If script exists but elfsight isn't ready yet, wait for load
    if (typeof window === 'undefined' || !window.elfsight) {
      const onLoad = () => initElfsight();
      existingScript.addEventListener('load', onLoad);
      return () => existingScript.removeEventListener('load', onLoad);
    }

    // If script already loaded, just init
    initElfsight();
  }, [mode, elfsightAppId, isClient]);

  function openPreview(post) {
    setPreview(post);
    if (mode === 'embed') loadEmbedScriptFor(post.network);
  }

  function closePreview() { setPreview(null); }

  function loadEmbedScriptFor(network) {
    if (embedLoadedRef.current[network]) return;
    embedLoadedRef.current[network] = true;
    if (network === 'instagram') {
      const s = document.createElement('script');
      s.src = 'https://www.instagram.com/embed.js';
      s.async = true; s.defer = true; document.body.appendChild(s);
    }
  }

  // Render nothing on server; avoids SSR mismatch and Elfsight silent failure
  if (!isClient) return null;

  return (
    <section aria-labelledby="social-feed-title" className="my-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 id="social-feed-title" className="text-xl font-bold">Réseaux — Rêve d’Ivoire</h2>
          <p className="text-sm text-gray-600">Derniers posts Instagram — suivez nos actions en direct.</p>
        </div>
        <div className="hidden sm:flex gap-2 items-center">
          <a href="https://www.instagram.com/reve_divoire/" target="_blank" rel="noreferrer" className="text-sm underline">Suivre Instagram</a>
        </div>
      </div>

      {/* Elfsight widget mode */}
      {mode === 'elfsight' && elfsightAppId ? (
        <div className="w-full">
          <div className={`elfsight-app-${elfsightAppId}`} data-elfsight-app-lazy />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {posts.map(post => (
              <article key={post.id} className="relative group bg-gray-50 rounded-md overflow-hidden">
                <button type="button" onClick={() => openPreview(post)} className="w-full h-full block text-left focus:outline-none" aria-label={`Ouvrir le post ${post.id}`}>
                  <div className="w-full aspect-square bg-gray-200 overflow-hidden">
                    {post.thumbnail ? (
                      <img src={post.thumbnail} alt={post.alt || `Post Rêve d'Ivoire — Instagram`} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">Image non disponible</div>
                    )}
                  </div>
                  <div className="absolute top-2 left-2 inline-flex items-center gap-2 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
                    <IconInstagram />
                    <span>Instagram</span>
                  </div>
                  <div className="p-2">
                    <div className="text-sm line-clamp-1 text-gray-800">{post.caption || '—'}</div>
                    <div className="text-xs text-gray-500 mt-1">{formatDateISO(post.date)}</div>
                  </div>
                </button>
                <a href={post.url} target="_blank" rel="noreferrer" className="absolute bottom-2 right-2 bg-white/95 px-2 py-1 rounded-md text-xs font-semibold opacity-0 group-hover:opacity-100 transition">Voir</a>
              </article>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            {!posts.length && !loading ? <div className="text-sm text-gray-500">Aucun post disponible.</div> : null}
            {/* use hasMore legitimately so ESLint stops whining */}
            {hasMore ? (
              fetchMore ? (
                <button onClick={fetchMore} className="px-3 py-2 border rounded">Charger plus</button>
              ) : (
                <a href="https://www.instagram.com/reve_divoire/" target="_blank" rel="noreferrer" className="px-3 py-2 border rounded">Voir plus sur Instagram</a>
              )
            ) : null}
          </div>
        </>
      )}

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50" onClick={closePreview} />
          <div className="relative w-full max-w-3xl bg-white rounded-md overflow-hidden shadow-lg">
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-3"><IconInstagram /><div className="text-sm font-medium">Instagram</div></div>
              <div><a href={preview.url} target="_blank" rel="noreferrer" className="text-sm underline mr-3">Voir sur Instagram</a><button onClick={closePreview} className="px-2">Fermer</button></div>
            </div>
            <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>{preview.thumbnail ? <img src={preview.thumbnail} alt={preview.alt || 'Aperçu du post'} className="w-full h-auto object-cover rounded" /> : <div className="w-full h-64 bg-gray-100 flex items-center justify-center">Image non disponible</div>}</div>
              <div>
                <div className="text-sm text-gray-700 mb-3">{preview.caption || 'Aucune légende fournie.'}</div>
                <div className="text-xs text-gray-500">{formatDateISO(preview.date)}</div>
                <div className="mt-4 flex gap-2"><a href={preview.url} target="_blank" rel="noreferrer" className="px-3 py-2 border rounded-sm text-sm">Voir sur Instagram</a></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

SocialFeed.propTypes = {
  mode: PropTypes.oneOf(['server', 'embed', 'elfsight']),
  initialPosts: PropTypes.array,
  limit: PropTypes.number,
  fetchMore: PropTypes.func,
  elfsightAppId: PropTypes.string
};
