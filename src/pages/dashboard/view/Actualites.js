import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit3, Eye, Calendar, Trash2, Inbox, Tag } from 'lucide-react';

// Page Actualités & Contenu
// Objectif : gérer articles, événements et posts sociaux

export default function Actualites() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [tag, setTag] = useState('');

  const [contents, setContents] = useState(sampleContents());
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);

  const counters = useMemo(() => ({
    published: contents.filter(c=>c.status==='published').length,
    drafts: contents.filter(c=>c.status==='draft').length,
    events: contents.filter(c=>c.type==='event' && new Date(c.date) > new Date()).length,
    scheduled: contents.filter(c=>c.status==='scheduled').length
  }), [contents]);

  const filtered = contents.filter(c => {
    if (q && !(`${c.title} ${c.author} ${c.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase()))) return false;
    if (type && c.type !== type) return false;
    if (status && c.status !== status) return false;
    if (tag && !c.tags.includes(tag)) return false;
    if (dateFrom && new Date(c.date) < new Date(dateFrom)) return false;
    if (dateTo && new Date(c.date) > new Date(dateTo)) return false;
    return true;
  });

  function deleteContent(id){ if(!window.confirm('Supprimer ce contenu ?')) return; setContents(prev => prev.filter(p=>p.id!==id)); if(selected?.id===id) setSelected(null); }

  return (
    <div className="p-4 md:p-6">
      {/* Bandeau haut */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-lg md:text-2xl font-bold">📰 Actualités & Contenu</h1>
          <div className="flex gap-4 text-sm text-muted-foreground mt-2">
            <span>Publiés: <strong>{counters.published}</strong></span>
            <span>Brouillons: <strong>{counters.drafts}</strong></span>
            <span>Événements à venir: <strong>{counters.events}</strong></span>
            <span>Posts planifiés: <strong>{counters.scheduled}</strong></span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-2 rounded-md bg-white border flex items-center gap-2"><Plus size={14}/> Nouvel article</button>
          <button className="px-3 py-2 rounded-md bg-white border flex items-center gap-2"><Calendar size={14}/> Nouvel événement</button>
          <button className="px-3 py-2 rounded-md bg-white border flex items-center gap-2"><Inbox size={14}/> Importer</button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl p-3 mb-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Recherche (titre / auteur / tag)" className="flex-1 p-2 rounded-md border" />
          </div>

          <select value={type} onChange={e=>setType(e.target.value)} className="p-2 rounded-md border">
            <option value="">Tous types</option>
            <option value="article">Article</option>
            <option value="event">Événement</option>
            <option value="post">Post social</option>
          </select>

          <select value={status} onChange={e=>setStatus(e.target.value)} className="p-2 rounded-md border">
            <option value="">Tous statuts</option>
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
            <option value="scheduled">Planifié</option>
          </select>

          <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} className="p-2 rounded-md border" />
          <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} className="p-2 rounded-md border" />

          <select value={tag} onChange={e=>setTag(e.target.value)} className="p-2 rounded-md border">
            <option value="">Tous tags</option>
            <option>Éducation</option>
            <option>Santé</option>
            <option>Collecte</option>
          </select>

          <button onClick={() => { setQ(''); setType(''); setStatus(''); setDateFrom(''); setDateTo(''); setTag(''); }} className="px-3 py-2 rounded-md border">Réinitialiser</button>
        </div>
      </div>

      {/* Layout principal */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Liste contenus */}
        <div className="md:col-span-2 bg-white rounded-xl p-3 shadow-sm">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr><th className="p-2 text-left">Titre</th><th className="p-2">Type</th><th className="p-2">Auteur</th><th className="p-2">Statut</th><th className="p-2">Date</th><th className="p-2">Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 cursor-pointer" onClick={() => setSelected(c)}>{c.title}</td>
                  <td className="p-2 text-center">{c.type}</td>
                  <td className="p-2 text-center">{c.author}</td>
                  <td className="p-2 text-center"><StatusBadge status={c.status} /></td>
                  <td className="p-2 text-center">{c.date}</td>
                  <td className="p-2 text-center">
                    <div className="flex gap-2 justify-center">
                      <button onClick={()=>setSelected(c)} className="p-2 rounded-md hover:bg-gray-100"><Eye size={16}/> Voir</button>
                      <button onClick={()=>setEditing(c)} className="p-2 rounded-md hover:bg-gray-100"><Edit3 size={16}/> Éditer</button>
                      <button onClick={()=>deleteContent(c.id)} className="p-2 rounded-md hover:bg-gray-100 text-red-600"><Trash2 size={16}/> Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">Aucun contenu trouvé.</div>}
        </div>

        {/* Détail aperçu */}
        <aside className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Aperçu rapide</h3>
          {!selected && <div className="text-sm text-muted-foreground">Sélectionnez un contenu pour voir l'aperçu.</div>}

          {selected && (
            <div>
              <div className="text-lg font-semibold">{selected.title}</div>
              <div className="text-xs text-muted-foreground mb-2">{selected.author} — {selected.date}</div>
              {selected.image && <div className="w-full h-36 bg-gray-100 mb-2 overflow-hidden"><img src={selected.image} className="w-full h-full object-cover" alt=""/></div>}
              <div className="text-sm mb-3">{selected.summary}</div>
              <div className="flex gap-2">
                <button onClick={()=>setEditing(selected)} className="px-3 py-2 rounded-md bg-white border">Éditer</button>
                <button onClick={()=>alert('Publier (placeholder)')} className="px-3 py-2 rounded-md bg-green-600 text-white">Publier</button>
                <button onClick={()=>alert('Planifier (placeholder)')} className="px-3 py-2 rounded-md bg-orange-500 text-white">Planifier</button>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Modals / éditeur */}
      {editing && <ContentModal content={editing} onClose={()=>setEditing(null)} onSave={(u)=>{ setContents(prev => prev.map(p=>p.id===u.id?u:p)); setEditing(null); }} />}

    </div>
  );
}

/* ===== Components ===== */
function StatusBadge({ status }){
  if(status==='published') return <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 text-xs">Publié</span>;
  if(status==='scheduled') return <span className="px-2 py-1 rounded-md bg-orange-100 text-orange-700 text-xs">Planifié</span>;
  if(status==='draft') return <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">Brouillon</span>;
  return <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">—</span>;
}

function ContentModal({ content, onClose, onSave }){
  const [form, setForm] = useState({...content});
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl p-6 w-full max-w-3xl overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Éditer: {form.title}</h3>
          <div className="flex gap-2">
            <button onClick={()=>{ onSave(form); }} className="px-3 py-1 rounded-md bg-green-600 text-white">Enregistrer</button>
            <button onClick={onClose} className="px-3 py-1 rounded-md border">Fermer</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs">Titre</label>
            <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="w-full p-2 rounded-md border" />

            <label className="text-xs mt-2">Résumé</label>
            <input value={form.summary} onChange={e=>setForm({...form, summary:e.target.value})} className="w-full p-2 rounded-md border" />

            <label className="text-xs mt-2">Contenu (texte simple)</label>
            <textarea value={form.body} onChange={e=>setForm({...form, body:e.target.value})} className="w-full p-2 rounded-md border h-40" />
          </div>

          <div>
            <label className="text-xs">Image principale (URL)</label>
            <input value={form.image || ''} onChange={e=>setForm({...form, image:e.target.value})} className="w-full p-2 rounded-md border" />

            <label className="text-xs mt-2">Tags</label>
            <input value={form.tags.join(', ')} onChange={e=>setForm({...form, tags: e.target.value.split(',').map(s=>s.trim())})} className="w-full p-2 rounded-md border" />

            <label className="text-xs mt-2">Statut</label>
            <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})} className="w-full p-2 rounded-md border">
              <option value="draft">Brouillon</option>
              <option value="scheduled">Planifié</option>
              <option value="published">Publié</option>
            </select>

            <label className="text-xs mt-2">Date publication</label>
            <input type="date" value={form.date || ''} onChange={e=>setForm({...form, date:e.target.value})} className="w-full p-2 rounded-md border" />

            <div className="mt-3 text-sm">
              <button onClick={()=>{ setForm({...form, status:'draft'}); onSave(form); }} className="px-3 py-2 rounded-md border mr-2">Enregistrer brouillon</button>
              <button onClick={()=>{ setForm({...form, status:'published'}); onSave(form); }} className="px-3 py-2 rounded-md bg-green-600 text-white">Publier</button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">Historique: {form.history?.map(h=>`${h.date} — ${h.author}`).join(' • ')}</div>
      </div>
    </div>
  );
}

/* ===== Sample data ===== */
function sampleContents(){
  return [
    {id:'c1', title:'Distribution vêtements - Abidjan', type:'article', author:'Awa', status:'published', date:'2025-12-10', tags:['Collecte','Éducation'], summary:'Distribution au quartier X.', body:'Contenu...', image:null, history:[{date:'2025-12-01', author:'Awa'}]},
    {id:'c2', title:'Collecte quartier Est', type:'event', author:'Marc', status:'draft', date:'2026-01-05', tags:['Collecte'], summary:'Collecte prévue.', body:'', image:null, history:[]},
    {id:'c3', title:'Post Instagram - remerciement', type:'post', author:'Sita', status:'scheduled', date:'2025-12-20', tags:['Social'], summary:'Merci aux donateurs.', body:'', image:null, history:[]},
  ];
}
