import React, { useState, useMemo } from 'react';
import { Search, Mail, MessageSquare, Eye, Paperclip, Trash2, Share2, Download, Tag, CheckCircle } from 'lucide-react';

// Page Messages & Contact
// Objectif : centraliser tous les messages entrants, répondre vite, assigner.

export default function MessagesContact({ team = sampleTeam() }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [channel, setChannel] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const [messages, setMessages] = useState(sampleMessages());
  const [selected, setSelected] = useState(null);
  const [replying, setReplying] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const counters = useMemo(() => ({
    new: messages.filter(m => m.status === 'new').length,
    inProgress: messages.filter(m => m.status === 'in_progress').length,
    assigned: messages.filter(m => m.assigned).length,
    resolved: messages.filter(m => m.status === 'resolved').length,
  }), [messages]);

  const filtered = messages.filter(m => {
    if (q && !(`${m.name} ${m.email} ${m.subject} ${m.body}`.toLowerCase().includes(q.toLowerCase()))) return false;
    if (status && m.status !== status) return false;
    if (channel && m.channel !== channel) return false;
    if (assignedTo && m.assigned !== assignedTo) return false;
    if (dateFrom && new Date(m.date) < new Date(dateFrom)) return false;
    if (dateTo && new Date(m.date) > new Date(dateTo)) return false;
    return true;
  });

  function toggleSelect(id){
    const next = new Set(selectedIds);
    if(next.has(id)) next.delete(id); else next.add(id);
    setSelectedIds(next);
  }

  function resetFilters(){ setQ(''); setStatus(''); setChannel(''); setDateFrom(''); setDateTo(''); setAssignedTo(''); }

  function assignMessage(id, memberId){
    setMessages(prev => prev.map(m => m.id === id ? {...m, assigned: memberId, status: m.status === 'new' ? 'in_progress' : m.status } : m));
  }

  function markResolved(id){
    if(!window.confirm('Marquer comme résolu ?')) return;
    setMessages(prev => prev.map(m => m.id === id ? {...m, status: 'resolved'} : m));
    if(selected?.id === id) setSelected({...selected, status:'resolved'});
  }

  function deleteMessage(id){
    if(!window.confirm('Supprimer le message ? Cette action est définitive.')) return;
    setMessages(prev => prev.filter(m => m.id !== id));
    if(selected?.id === id) setSelected(null);
  }

  function bulkExport(){
    const toExport = messages.filter(m => selectedIds.has(m.id));
    if(toExport.length === 0) return alert('Aucun message sélectionné');
    alert(`Export CSV (${toExport.length}) – placeholder`);
  }

  function sendReply(id, text){
    // placeholder: push reply into history
    setMessages(prev => prev.map(m => m.id === id ? {...m, history: [...m.history, { date: new Date().toISOString(), by: 'Vous', text }], status: 'in_progress' } : m));
    setReplying(null);
    alert('Réponse envoyée (placeholder)');
  }

  return (
    <div className="p-4 md:p-6">
      {/* Bandeau haut */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-lg md:text-2xl font-bold">💬 Messages & Contact</h1>
          <div className="flex gap-4 text-sm text-muted-foreground mt-2">
            <span>Nouveaux: <strong>{counters.new}</strong></span>
            <span>À traiter: <strong>{counters.inProgress}</strong></span>
            <span>Assignés: <strong>{counters.assigned}</strong></span>
            <span>Résolus: <strong>{counters.resolved}</strong></span>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => alert('Nouveau message (placeholder)')} className="px-3 py-2 rounded-md bg-white border flex items-center gap-2"><MessageSquare size={16}/> Nouveau message</button>
          <button onClick={bulkExport} className="px-3 py-2 rounded-md bg-white border flex items-center gap-2"><Download size={16}/> Exporter CSV</button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl p-3 mb-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Recherche (nom / email / sujet / mot-clé)" className="flex-1 p-2 rounded-md border" />
          </div>

          <select value={status} onChange={e=>setStatus(e.target.value)} className="p-2 rounded-md border">
            <option value="">Tous statuts</option>
            <option value="new">Nouveau</option>
            <option value="in_progress">En cours</option>
            <option value="resolved">Résolu</option>
            <option value="ignored">Ignoré</option>
          </select>

          <select value={channel} onChange={e=>setChannel(e.target.value)} className="p-2 rounded-md border">
            <option value="">Tous canaux</option>
            <option value="form">Formulaire contact</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
          </select>

          <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} className="p-2 rounded-md border" />
          <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} className="p-2 rounded-md border" />

          <select value={assignedTo} onChange={e=>setAssignedTo(e.target.value)} className="p-2 rounded-md border">
            <option value="">Assigné à</option>
            {team.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>

          <button onClick={resetFilters} className="px-3 py-2 rounded-md border">Réinitialiser</button>
        </div>
      </div>

      {/* Layout principal */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Inbox list */}
        <div className="md:col-span-2 bg-white rounded-xl p-2 shadow-sm overflow-auto">
          <div className="p-2 flex items-center gap-2">
            <input type="checkbox" onChange={(e)=>{ if(e.target.checked) setSelectedIds(new Set(messages.map(m=>m.id))); else setSelectedIds(new Set()); }} />
            <button onClick={() => { if(selectedIds.size===0) return alert('Aucun message sélectionné'); alert('Assigner (placeholder)'); }} className="px-2 py-1 rounded-md border text-sm">📤 Assigner</button>
            <button onClick={() => { if(selectedIds.size===0) return alert('Aucun message sélectionné'); if(!window.confirm('Supprimer sélection ?')) return; setMessages(prev=>prev.filter(m=>!selectedIds.has(m.id))); setSelectedIds(new Set()); }} className="px-2 py-1 rounded-md border text-sm text-red-600">❌ Supprimer</button>
          </div>

          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr><th className="p-2"></th><th className="p-2 text-left">Nom</th><th className="p-2">Email</th><th className="p-2">Sujet</th><th className="p-2">Date</th><th className="p-2">Statut</th><th className="p-2">Assigné</th><th className="p-2">Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id} className={`border-t ${m.status === 'new' ? 'bg-red-50' : m.status === 'in_progress' ? 'bg-orange-50' : m.status === 'resolved' ? 'bg-green-50' : ''}`}>
                  <td className="p-2 text-center"><input type="checkbox" checked={selectedIds.has(m.id)} onChange={()=>toggleSelect(m.id)} /></td>
                  <td className="p-2 cursor-pointer" onClick={() => setSelected(m)}>{m.name}</td>
                  <td className="p-2 text-xs text-muted-foreground">{m.email}</td>
                  <td className="p-2">{m.subject}</td>
                  <td className="p-2 text-center">{new Date(m.date).toLocaleString()}</td>
                  <td className="p-2 text-center"><StatusBadge status={m.status} /></td>
                  <td className="p-2 text-center">{m.assigned ? (team.find(t=>t.id===m.assigned)?.name || '—') : '—'}</td>
                  <td className="p-2 text-center">
                    <div className="flex gap-2 justify-center">
                      <button onClick={()=>setSelected(m)} className="p-2 rounded-md hover:bg-gray-100"><Eye size={14}/> Voir</button>
                      <button onClick={()=>setReplying(m)} className="p-2 rounded-md hover:bg-gray-100"><Mail size={14}/> Répondre</button>
                      <button onClick={()=>{ const mem = prompt('Assigné à (id) ?'); if(mem) assignMessage(m.id, mem); }} className="p-2 rounded-md hover:bg-gray-100">📤 Assigner</button>
                      <button onClick={()=>deleteMessage(m.id)} className="p-2 rounded-md hover:bg-gray-100 text-red-600"><Trash2 size={14}/> Suppr</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">Aucun message.</div>}
        </div>

        {/* Aperçu message */}
        <aside className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Aperçu</h3>
          {!selected && <div className="text-sm text-muted-foreground">Sélectionnez un message pour voir le détail.</div>}

          {selected && (
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{selected.name}</div>
                  <div className="text-xs text-muted-foreground">{selected.email} • {selected.channel}</div>
                </div>
                <div className="text-xs text-muted-foreground">{new Date(selected.date).toLocaleString()}</div>
              </div>

              <div className="p-3 rounded-md bg-gray-50">{selected.subject && <div className="font-semibold mb-2">{selected.subject}</div>}{selected.body}</div>

              {selected.attachments && selected.attachments.length > 0 && (
                <div>
                  <div className="text-xs font-semibold">Pièces jointes</div>
                  <ul className="text-xs space-y-1 mt-2">
                    {selected.attachments.map((a,i) => <li key={i} className="flex items-center gap-2"><Paperclip size={12}/> <a href="#">{a}</a></li>)}
                  </ul>
                </div>
              )}

              <div className="flex gap-2">
                <button onClick={()=>setReplying(selected)} className="px-3 py-2 rounded-md bg-blue-600 text-white">Répondre</button>
                <button onClick={() => { const mem = prompt('Assigné à (id) ?'); if(mem) assignMessage(selected.id, mem); }} className="px-3 py-2 rounded-md border">Assigner</button>
                <button onClick={() => markResolved(selected.id)} className="px-3 py-2 rounded-md bg-green-600 text-white">Marquer résolu</button>
                <button onClick={() => deleteMessage(selected.id)} className="px-3 py-2 rounded-md border text-red-600">Supprimer</button>
              </div>

              <div>
                <h4 className="text-xs font-semibold">Historique & notes</h4>
                <div className="text-xs mt-2 space-y-1">
                  {selected.history.map((h,i) => <div key={i}><div className="text-xs text-muted-foreground">{new Date(h.date).toLocaleString()} — {h.by}</div><div>{h.text}</div></div>)}
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Modals */}
      {replying && <ReplyModal message={replying} onClose={()=>setReplying(null)} onSend={(text)=>sendReply(replying.id, text)} />}
    </div>
  );
}

/* ===== Subcomponents ===== */
function StatusBadge({ status }){
  if(status === 'new') return <span className="px-2 py-1 rounded-md bg-red-100 text-red-700 text-xs">Nouveau</span>;
  if(status === 'in_progress') return <span className="px-2 py-1 rounded-md bg-orange-100 text-orange-700 text-xs">En cours</span>;
  if(status === 'resolved') return <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 text-xs">Résolu</span>;
  if(status === 'ignored') return <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">Ignoré</span>;
  return <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">—</span>;
}

function ReplyModal({ message, onClose, onSend }){
  const [text, setText] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Répondre à {message.name}</h3><button onClick={onClose} className="px-3 py-1 rounded-md border">Fermer</button></div>
        <div className="text-sm text-muted-foreground mb-3">Canal: {message.channel} • {message.email}</div>
        <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full p-3 rounded-md border h-36" placeholder="Votre réponse..."></textarea>
        <div className="mt-3 flex gap-2 justify-end">
          <button onClick={()=>{ onSend(text); }} className="px-3 py-2 rounded-md bg-blue-600 text-white">Envoyer réponse</button>
          <button onClick={onClose} className="px-3 py-2 rounded-md border">Annuler</button>
        </div>
      </div>
    </div>
  );
}

/* ===== Sample data ===== */
function sampleTeam(){ return [ {id:'t1', name:'Awa'}, {id:'t2', name:'Marc'}, {id:'t3', name:'Sita'} ]; }

function sampleMessages(){
  return [
    { id: 'm1', name: 'Client Pi', email: 'client1@example.com', subject: 'Question sur la collecte', body: 'Bonjour, je souhaite savoir...', channel: 'form', date: '2025-12-12T10:30:00', status: 'new', assigned: null, attachments: [], history: [] },
    { id: 'm2', name: 'Paul', email: 'paul@example.com', subject: 'Problème commande', body: 'Je n’ai pas reçu...', channel: 'email', date: '2025-12-11T09:20:00', status: 'in_progress', assigned: 't1', attachments: ['photo.jpg'], history: [{ date: '2025-12-11T10:00:00', by: 'Awa', text: 'Vu, en cours' }] },
    { id: 'm3', name: 'Fatou', email: '', subject: 'Bénévolat', body: 'Je veux aider le weekend', channel: 'whatsapp', date: '2025-12-10T14:00:00', status: 'resolved', assigned: 't3', attachments: [], history: [{ date: '2025-12-10T16:00:00', by: 'Sita', text: 'Assignée mission tri' }] },
  ];
}
