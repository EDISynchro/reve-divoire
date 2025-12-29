import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit2, Eye, Calendar, Users, AlertTriangle, MapPin, MessageCircle } from 'lucide-react';

// Page Bénévoles
// Objectif : savoir qui est dispo, quand, pour quoi

export default function Benevoles() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [skill, setSkill] = useState('');
  const [availability, setAvailability] = useState('');
  const [zone, setZone] = useState('');
  const [volunteers, setVolunteers] = useState(sampleVolunteers());
  const [selected, setSelected] = useState(null);
  const [assigning, setAssigning] = useState(null);

  const filtered = useMemo(() => volunteers.filter(v => {
    if (q && !(`${v.firstName} ${v.lastName} ${v.email}`.toLowerCase().includes(q.toLowerCase()))) return false;
    if (status && v.status !== status) return false;
    if (skill && !v.skills.includes(skill)) return false;
    if (availability && v.availability !== availability) return false;
    if (zone && v.city !== zone) return false;
    return true;
  }), [volunteers, q, status, skill, availability, zone]);

  const counters = useMemo(() => ({
    total: volunteers.length,
    active: volunteers.filter(v=>v.status==='active').length,
    pending: volunteers.filter(v=>v.status==='pending').length,
    missions: sampleMissions().filter(m=>m.status==='open').length
  }), [volunteers]);

  function resetFilters(){ setQ(''); setStatus(''); setSkill(''); setAvailability(''); setZone(''); }

  function saveVolunteer(updated){
    setVolunteers(prev => prev.map(v => v.id === updated.id ? updated : v));
    setSelected(null);
  }

  function assignToMission(volId, missionId){
    setVolunteers(prev => prev.map(v => v.id===volId ? {...v, assignments: [...v.assignments, missionId]} : v));
    setAssigning(null);
    alert('Bénévole assigné (placeholder)');
  }

  return (
    <div className="p-4 md:p-6">
      {/* Bandeau haut */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-lg md:text-2xl font-bold">🤝 Bénévoles</h1>
          <div className="flex gap-4 text-sm text-muted-foreground mt-2">
            <span>Total bénévoles: <strong>{counters.total}</strong></span>
            <span>Actifs: <strong>{counters.active}</strong></span>
            <span>En attente: <strong>{counters.pending}</strong></span>
            <span>Missions en cours: <strong>{counters.missions}</strong></span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-green-600 text-white flex items-center gap-2"><Plus size={16}/> Ajouter un bénévole</button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Recherche (nom / email)" className="flex-1 p-2 rounded-md border" />
          </div>

          <select value={status} onChange={e=>setStatus(e.target.value)} className="p-2 rounded-md border">
            <option value="">Tous statuts</option>
            <option value="active">Actif</option>
            <option value="pending">En attente</option>
            <option value="inactive">Inactif</option>
          </select>

          <select value={skill} onChange={e=>setSkill(e.target.value)} className="p-2 rounded-md border">
            <option value="">Toutes compétences</option>
            <option value="collecte">Collecte</option>
            <option value="tri">Tri</option>
            <option value="logistique">Logistique</option>
            <option value="admin">Admin</option>
          </select>

          <select value={availability} onChange={e=>setAvailability(e.target.value)} className="p-2 rounded-md border">
            <option value="">Toutes disponibilités</option>
            <option value="weekday">Semaine</option>
            <option value="weekend">Week-end</option>
          </select>

          <select value={zone} onChange={e=>setZone(e.target.value)} className="p-2 rounded-md border">
            <option value="">Toutes zones</option>
            <option>Abidjan</option>
            <option>Yamoussoukro</option>
          </select>

          <button onClick={resetFilters} className="px-3 py-2 rounded-md border">Réinitialiser</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Table bénévoles */}
        <div className="md:col-span-2 bg-white rounded-xl p-4 shadow-sm overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr><th className="p-2 text-left">Nom</th><th className="p-2">Contact</th><th className="p-2">Compétences</th><th className="p-2">Disponibilités</th><th className="p-2">Statut</th><th className="p-2">Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id} className="border-t">
                  <td className="p-2">{v.firstName} {v.lastName}</td>
                  <td className="p-2 text-xs">{v.email || '—'}<div className="text-muted-foreground">{v.phone}</div></td>
                  <td className="p-2">{v.skills.join(', ')}</td>
                  <td className="p-2 text-center">{v.availability === 'weekday' ? 'Semaine' : v.availability === 'weekend' ? 'Week-end' : '—'}</td>
                  <td className="p-2 text-center"><StatusBadge status={v.status} /></td>
                  <td className="p-2 text-center">
                    <div className="flex gap-2 justify-center">
                      <button onClick={()=>setSelected(v)} className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"><Eye size={16}/> Voir</button>
                      <button onClick={()=>setSelected(v)} className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"><Edit2 size={16}/> Modifier</button>
                      <button onClick={()=>setAssigning(v)} className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"><Calendar size={16}/> Assigner</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length===0 && <div className="p-6 text-center text-sm text-muted-foreground">Aucun bénévole trouvé.</div>}
        </div>

        {/* Bloc latéral : planning / missions / alertes */}
        <aside className="md:col-span-1 bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Planning & Missions</h3>

          <div className="mb-3 text-sm">Vue calendrier (semaine / mois)</div>
          <div className="h-36 mb-3 flex items-center justify-center text-xs text-muted-foreground rounded-md bg-gray-50">Calendrier (placeholder)</div>

          <h4 className="font-semibold text-sm mb-2">Missions en cours</h4>
          <div className="space-y-2 mb-3">
            {sampleMissions().map(m => (
              <div key={m.id} className="p-2 rounded-md bg-gray-50 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.date} — {m.city}</div>
                  <div className="text-xs text-muted-foreground">Assignés: {m.volunteers.length}</div>
                </div>
                <button className="text-sm text-blue-600">Gérer</button>
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-sm mb-2">Alertes & besoins</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 p-2 rounded-md bg-red-50"><AlertTriangle size={16}/> Missions sans bénévole</div>
            <div className="flex items-center gap-2 p-2 rounded-md bg-orange-50"><AlertTriangle size={16}/> Manque de compétences</div>
            <div className="flex items-center gap-2 p-2 rounded-md bg-gray-50"><AlertTriangle size={16}/> Bénévoles inactifs</div>
          </div>
        </aside>
      </div>

      {/* Modals */}
      {selected && <VolunteerModal volunteer={selected} onClose={()=>setSelected(null)} onSave={saveVolunteer} />}
      {assigning && <AssignModal volunteer={assigning} missions={sampleMissions()} onClose={()=>setAssigning(null)} onAssign={assignToMission} />}

    </div>
  );
}

/* ===== Components ===== */
function StatusBadge({ status }){
  if(status==='active') return <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 text-xs">Actif</span>;
  if(status==='pending') return <span className="px-2 py-1 rounded-md bg-orange-100 text-orange-700 text-xs">En attente</span>;
  return <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">Inactif</span>;
}

function VolunteerModal({ volunteer, onClose, onSave }){
  const [form, setForm] = useState({...volunteer});
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Fiche bénévole</h3><button onClick={onClose} className="px-3 py-1 rounded-md border">Fermer</button></div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs">Nom</label>
            <input value={form.firstName} onChange={e=>setForm({...form, firstName: e.target.value})} className="w-full p-2 rounded-md border" />
            <input value={form.lastName} onChange={e=>setForm({...form, lastName: e.target.value})} className="w-full p-2 rounded-md border mt-2" />

            <label className="text-xs mt-2">Contact</label>
            <input value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="w-full p-2 rounded-md border" />
            <input value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} className="w-full p-2 rounded-md border mt-2" />
          </div>

          <div>
            <label className="text-xs">Compétences</label>
            <input value={form.skills.join(', ')} onChange={e=>setForm({...form, skills: e.target.value.split(',').map(s=>s.trim())})} className="w-full p-2 rounded-md border" />

            <label className="text-xs mt-2">Disponibilités</label>
            <select value={form.availability} onChange={e=>setForm({...form, availability: e.target.value})} className="w-full p-2 rounded-md border">
              <option value="weekday">Semaine</option>
              <option value="weekend">Week-end</option>
            </select>

            <label className="text-xs mt-2">Statut</label>
            <select value={form.status} onChange={e=>setForm({...form, status: e.target.value})} className="w-full p-2 rounded-md border">
              <option value="active">Actif</option>
              <option value="pending">En attente</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <button onClick={()=>{ onSave(form); }} className="px-3 py-1 rounded-md bg-green-600 text-white">Enregistrer</button>
          <button onClick={onClose} className="px-3 py-1 rounded-md border">Fermer</button>
        </div>
      </div>
    </div>
  );
}

function AssignModal({ volunteer, missions, onClose, onAssign }){
  const [missionId, setMissionId] = useState(missions[0]?.id || '');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="font-semibold mb-3">Assigner {volunteer.firstName} {volunteer.lastName}</h3>
        <select value={missionId} onChange={e=>setMissionId(e.target.value)} className="w-full p-2 rounded-md border mb-3">
          {missions.map(m => <option key={m.id} value={m.id}>{m.name} — {m.date}</option>)}
        </select>
        <div className="flex gap-2 justify-end">
          <button onClick={()=>onAssign(volunteer.id, missionId)} className="px-3 py-1 rounded-md bg-blue-600 text-white">Assigner</button>
          <button onClick={onClose} className="px-3 py-1 rounded-md border">Annuler</button>
        </div>
      </div>
    </div>
  );
}

/* ===== Sample data ===== */
function sampleVolunteers(){
  return [
    {id:'v1', firstName:'Awa', lastName:'K', email:'awa@example.com', phone:'070000000', skills:['collecte','tri'], availability:'weekday', city:'Abidjan', status:'active', assignments:[]},
    {id:'v2', firstName:'Marc', lastName:'L', email:'marc@example.com', phone:'071111111', skills:['logistique'], availability:'weekend', city:'Yamoussoukro', status:'pending', assignments:[]},
    {id:'v3', firstName:'Sita', lastName:'R', email:'sita@example.com', phone:'072222222', skills:['admin'], availability:'weekday', city:'Abidjan', status:'active', assignments:[]},
  ];
}

function sampleMissions(){
  return [
    {id:'m1', name:'Collecte quartier Nord', date:'2025-12-18', city:'Abidjan', volunteers:[1,2], status:'open'},
    {id:'m2', name:'Tri vêtements', date:'2025-12-20', city:'Abidjan', volunteers:[], status:'open'},
  ];
}
