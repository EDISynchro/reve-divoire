import React, { useState, useMemo } from 'react';
import { Plus, Search, MapPin, Calendar, Users, DollarSign, AlertTriangle, CheckSquare, Edit3, Eye, Download } from 'lucide-react';

// Page Projets & Actions terrain
// Mobile-first / actions rapides / historique visible

export default function ProjetsActions() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [zone, setZone] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [owner, setOwner] = useState('');

  const [projects, setProjects] = useState(sampleProjects());
  const [missions, setMissions] = useState(sampleMissions());
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedMission, setSelectedMission] = useState(null);

  const filteredProjects = useMemo(() => projects.filter(p => {
    if (q && !(`${p.name} ${p.code}`.toLowerCase().includes(q.toLowerCase()))) return false;
    if (status && p.status !== status) return false;
    if (typeFilter && p.type !== typeFilter) return false;
    if (zone && p.city !== zone) return false;
    if (owner && p.owner !== owner) return false;
    if (dateFrom && new Date(p.start) < new Date(dateFrom)) return false;
    if (dateTo && new Date(p.end) > new Date(dateTo)) return false;
    return true;
  }), [projects, q, status, typeFilter, zone, owner, dateFrom, dateTo]);

  const counters = useMemo(() => ({
    active: projects.filter(p=>p.status==='active').length,
    missionsToday: missions.filter(m=>isSameDay(m.date, new Date())).length,
    volunteersAssigned: missions.reduce((s,m)=>s + m.volunteers.length,0),
    budget: projects.reduce((s,p)=>s + (p.budgetEngaged||0),0)
  }), [projects, missions]);

  function closeProject(id){
    if(!window.confirm('Clôturer le projet ?')) return;
    setProjects(prev => prev.map(p=> p.id===id ? {...p, status:'closed'} : p));
  }

  function createMission(projectId, data){
    const m = { ...data, id: 'm' + (missions.length+1) };
    setMissions(prev => [m, ...prev]);
    setSelectedProject(null);
  }

  return (
    <div className="p-4 md:p-6">
      {/* Bandeau haut */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-lg md:text-2xl font-bold">📍 Projets & Actions terrain</h1>
          <div className="flex gap-4 text-sm text-muted-foreground mt-2">
            <span>Projets actifs: <strong>{counters.active}</strong></span>
            <span>Missions aujourd’hui: <strong>{counters.missionsToday}</strong></span>
            <span>Bénévoles assignés: <strong>{counters.volunteersAssigned}</strong></span>
            <span>Budget engagé: <strong>{formatMoney(counters.budget)}</strong></span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-2 rounded-md bg-white border flex items-center gap-2"><Plus size={14}/> Créer projet</button>
          <button onClick={()=>setSelectedMission({new:true})} className="px-3 py-2 rounded-md bg-green-600 text-white flex items-center gap-2"><Plus size={14}/> Nouvelle mission</button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl p-3 mb-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Recherche (nom / code)" className="flex-1 p-2 rounded-md border" />
          </div>
          <select value={status} onChange={e=>setStatus(e.target.value)} className="p-2 rounded-md border">
            <option value="">Tous statuts</option>
            <option value="planning">Préparation</option>
            <option value="active">En cours</option>
            <option value="closed">Clos</option>
          </select>
          <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} className="p-2 rounded-md border">
            <option value="">Tous types</option>
            <option value="collecte">Collecte</option>
            <option value="envoi">Envoi</option>
            <option value="partenariat">Partenariat</option>
            <option value="logistique">Logistique</option>
          </select>
          <select value={zone} onChange={e=>setZone(e.target.value)} className="p-2 rounded-md border">
            <option value="">Toutes zones</option>
            <option>Abidjan</option>
            <option>Yamoussoukro</option>
          </select>
          <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} className="p-2 rounded-md border" />
          <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} className="p-2 rounded-md border" />
          <input value={owner} onChange={e=>setOwner(e.target.value)} placeholder="Responsable" className="p-2 rounded-md border" />
        </div>
      </div>

      {/* Layout principal */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Colonne gauche: liste projets + missions récentes */}
        <div>
          {/* Liste projets (cards) */}
          <div className="space-y-3">
            {filteredProjects.map(p => (
              <div key={p.id} className="bg-white rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">{p.name}</div>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{p.code} • {p.city} • {p.start} → {p.end}</div>
                  <div className="mt-2">
                    <div className="text-sm">Avancement: {p.progress}%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1"><div className="h-2 rounded-full bg-green-600" style={{width: `${p.progress}%`}}/></div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <button onClick={()=>setSelectedProject(p)} className="px-3 py-2 rounded-md border flex items-center gap-2"><Eye size={14}/> Voir</button>
                  <button onClick={()=>alert('Gérer (placeholder)')} className="px-3 py-2 rounded-md border flex items-center gap-2"><Edit3 size={14}/> Gérer</button>
                  <button onClick={()=>closeProject(p.id)} className="px-3 py-2 rounded-md border text-red-600">Clôturer</button>
                </div>
              </div>
            ))}

            {filteredProjects.length === 0 && <div className="p-4 text-sm text-muted-foreground bg-white rounded-xl">Aucun projet trouvé.</div>}
          </div>

          {/* Missions récentes */}
          <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Missions récentes</h3>
            <div className="space-y-2 text-sm">
              {missions.slice(0,6).map(m => (
                <div key={m.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                  <div>
                    <div className="font-semibold">{m.title}</div>
                    <div className="text-xs text-muted-foreground">{m.date} • {m.city} • {m.roleNeeded} • {m.volunteers.length} assignés</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-xs">{m.status}</div>
                    <button onClick={()=>setSelectedMission(m)} className="text-sm text-blue-600">Gérer</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne droite: carte, planning, KPIs, alertes */}
        <aside>
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">Carte</div>
              <div className="text-xs text-muted-foreground">Interactive</div>
            </div>
            <div className="h-48 rounded-md bg-gray-50 flex items-center justify-center text-sm text-muted-foreground">Carte (pins projets)</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-3"><div className="font-semibold">Mini-calendrier</div><div className="text-xs text-muted-foreground">Semaine</div></div>
            <div className="h-28 rounded-md bg-gray-50 flex items-center justify-center text-sm">Calendrier (placeholder)</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <div className="font-semibold mb-2">KPIs projet</div>
            <div className="text-sm">kg collectés: <strong>{projects.reduce((s,p)=>s+p.kgCollected,0)}</strong></div>
            <div className="text-sm">Montants dépensés: <strong>{formatMoney(projects.reduce((s,p)=>s + (p.spent||0),0))}</strong></div>
            <div className="text-sm">Bénéficiaires: <strong>{projects.reduce((s,p)=>s + (p.beneficiaries||0),0)}</strong></div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="font-semibold mb-2">Alertes rapides</div>
            <div className="space-y-2 text-sm">
              {projects.filter(p=>p.hasIssue).map(p=> (
                <div key={p.id} className="p-2 rounded-md bg-red-50 flex items-center justify-between"><div><AlertTriangle size={14}/> <span className="ml-2">{p.name} — problème</span></div><button className="text-sm text-blue-600">Voir</button></div>
              ))}
              {projects.filter(p=>!p.hasIssue).length===projects.length && <div className="text-sm text-muted-foreground">Aucune alerte.</div>}
            </div>
          </div>
        </aside>
      </div>

      {/* Modals */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={()=>setSelectedProject(null)} onCreateMission={createMission} onUpdate={(u)=> setProjects(prev => prev.map(p=> p.id===u.id?u:p))} />}
      {selectedMission && <MissionModal mission={selectedMission} onClose={()=>setSelectedMission(null)} onUpdate={(u)=> setMissions(prev => prev.map(m=> m.id===u.id?u:m))} />}
    </div>
  );
}

/* ===== Subcomponents ===== */
function StatusBadge({ status }){
  if(status==='planning') return <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">Préparation</span>;
  if(status==='active') return <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 text-xs">En cours</span>;
  if(status==='closed') return <span className="px-2 py-1 rounded-md bg-gray-200 text-gray-700 text-xs">Clos</span>;
  return <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">—</span>;
}

function ProjectModal({ project, onClose, onCreateMission, onUpdate }){
  const [form, setForm] = useState({...project});
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl p-6 w-full max-w-3xl overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">{form.name} — {form.code}</h3>
          <div className="flex gap-2">
            <button onClick={()=>{ if(window.confirm('Clôturer le projet ?')) onUpdate({...form, status:'closed'}); }} className="px-3 py-1 rounded-md border text-red-600">Clôturer</button>
            <button onClick={()=>{ onUpdate(form); onClose(); }} className="px-3 py-1 rounded-md bg-green-600 text-white">Enregistrer</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs">Résumé</label>
            <textarea value={form.summary} onChange={e=>setForm({...form, summary:e.target.value})} className="w-full p-2 rounded-md border" />
            <div className="mt-2 text-sm text-muted-foreground">Lieux: {form.city} • Dates: {form.start} → {form.end}</div>

            <h4 className="font-semibold mt-4">Missions</h4>
            <div className="space-y-2 mt-2">
              {form.missions.map(mid => <div key={mid} className="text-sm">• {mid}</div>)}
            </div>

            <h4 className="font-semibold mt-4">Équipe</h4>
            <div className="text-sm">Responsable: {form.owner}</div>
            <div className="text-sm">Bénévoles assignés: {form.volunteersCount}</div>
          </div>

          <div>
            <h4 className="font-semibold">Journal d’étapes</h4>
            <div className="space-y-2 text-sm mt-2">
              {(form.journal || []).map((j,i) => (<div key={i}><div className="text-xs text-muted-foreground">{j.date} — {j.by}</div><div>{j.text}</div></div>))}
            </div>

            <h4 className="font-semibold mt-4">Budget & Dépenses</h4>
            <div className="text-sm">Budget initial: {formatMoney(form.budget)}</div>
            <div className="text-sm">Engagé: {formatMoney(form.budgetEngaged)}</div>
            <div className="text-sm">Reste: {formatMoney((form.budget||0) - (form.budgetEngaged||0))}</div>

            <h4 className="font-semibold mt-4">Documents</h4>
            <div className="space-y-2 text-sm">
              {(form.docs || []).map((d,i) => (<div key={i} className="flex items-center justify-between"><div>{d.name}</div><button className="text-sm text-blue-600"><Download size={12}/> Télécharger</button></div>))}
            </div>

            <div className="mt-4">
              <button onClick={()=>onCreateMission(project.id, { title:'Nouvelle mission', date:new Date().toISOString().split('T')[0], city:project.city, roleNeeded: 'Collecte', volunteers:[], status:'open'})} className="px-3 py-2 rounded-md bg-blue-600 text-white">Créer mission</button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-right"><button onClick={onClose} className="px-3 py-1 rounded-md border">Fermer</button></div>
      </div>
    </div>
  );
}

function MissionModal({ mission, onClose, onUpdate }){
  const [form, setForm] = useState({...mission});
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl p-6 w-full max-w-2xl overflow-auto">
        <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">{form.title}</h3><div className="flex gap-2"><button onClick={()=>{ onUpdate(form); onClose(); }} className="px-3 py-1 rounded-md bg-green-600 text-white">Enregistrer</button></div></div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs">Date</label>
            <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="w-full p-2 rounded-md border" />
            <label className="text-xs mt-2">Lieu</label>
            <input value={form.city} onChange={e=>setForm({...form, city:e.target.value})} className="w-full p-2 rounded-md border" />
            <label className="text-xs mt-2">Rôle demandé</label>
            <input value={form.roleNeeded} onChange={e=>setForm({...form, roleNeeded:e.target.value})} className="w-full p-2 rounded-md border" />
          </div>

          <div>
            <label className="text-xs">Statut</label>
            <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})} className="w-full p-2 rounded-md border">
              <option value="open">Ouverte</option>
              <option value="ready">Prête</option>
              <option value="done">Terminée</option>
            </select>

            <label className="text-xs mt-2">Assignés</label>
            <div className="text-sm mt-1">{form.volunteers.length} bénévoles</div>
            <div className="mt-3">
              <button onClick={()=>{ setForm({...form, volunteers: [...form.volunteers, 'nouveau']}); }} className="px-3 py-2 rounded-md bg-blue-600 text-white">Assigner</button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-right"><button onClick={onClose} className="px-3 py-1 rounded-md border">Fermer</button></div>
      </div>
    </div>
  );
}

/* ===== Utils & sample data ===== */
function formatMoney(n){ return n.toLocaleString('fr-FR', {style:'currency', currency:'EUR', minimumFractionDigits:0}); }
function isSameDay(d1, d2){ const a = new Date(d1); return a.getFullYear()===d2.getFullYear() && a.getMonth()===d2.getMonth() && a.getDate()===d2.getDate(); }

function sampleProjects(){
  return [
    {id:'p1', code:'PRJ-001', name:'Collecte Abidjan Nord', status:'active', progress:72, city:'Abidjan', start:'2025-11-01', end:'2026-01-15', missions:['m1','m3'], budget:5000, budgetEngaged:3200, spent:2800, kgCollected:1200, beneficiaries:340, volunteersCount:18, hasIssue:false, owner:'Awa', journal:[{date:'2025-11-05', text:'Kickoff', by:'Awa'}], docs:[{name:'plan.pdf'}]},
    {id:'p2', code:'PRJ-002', name:'Envoi matériel sud', status:'planning', progress:10, city:'Yamoussoukro', start:'2026-01-10', end:'2026-02-01', missions:[], budget:2000, budgetEngaged:200, spent:0, kgCollected:0, beneficiaries:0, volunteersCount:2, hasIssue:true, owner:'Marc', journal:[], docs:[]},
  ];
}

function sampleMissions(){
  return [
    {id:'m1', title:'Tri vêtements - Entrepôt', date:'2025-12-18', city:'Abidjan', roleNeeded:'Tri', volunteers:['v1','v3'], status:'open'},
    {id:'m2', title:'Collecte quartier Est', date:'2025-12-20', city:'Abidjan', roleNeeded:'Collecte', volunteers:[], status:'open'},
    {id:'m3', title:'Prépa envoi container', date:'2025-12-22', city:'Yamoussoukro', roleNeeded:'Logistique', volunteers:['v2'], status:'ready'},
  ];
}
