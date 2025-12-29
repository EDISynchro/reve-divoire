import React, { useState } from "react";
import {
  Plus,
  Package,
  Heart,
  ShoppingCart,
  Users,
  TrendingUp,
  AlertTriangle,
  Mail,
  FileText,
  Clock,
  Box,
  Tag,
} from "lucide-react";

/**
 * Dashboard Rêve d'Ivoire / Frip2Rêve
 * - switch projet (Association / Friperie / Global)
 * - KPI séparés par projet
 * - actions rapides adaptées
 *
 * Remplace les valeurs statiques par tes fetchs API ou context global.
 */

export default function Home() {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [period, setPeriod] = useState("30j");
  const [view, setView] = useState("reve"); // 'reve' | 'frip' | 'global'

  // --- Données d'exemple (à remplacer par API) ---
  const data = {
    reve: {
      name: "Rêve d'Ivoire",
      kpis: [
        { id: "don", icon: <Heart />, label: "Dons ce mois", value: "12 450 €", color: "green" },
        { id: "benef", icon: <Users />, label: "Bénéficiaires aidés", value: "312", color: "green" },
        { id: "projects", icon: <TrendingUp />, label: "Projets actifs", value: "4", color: "blue" },
        { id: "messages", icon: <Mail />, label: "Messages non lus", value: "6", color: "orange" },
      ],
      actions: [
        { id: "collecte", icon: <Plus />, label: "Créer une collecte" },
        { id: "news", icon: <FileText />, label: "Publier actualité" },
        { id: "mail", icon: <Mail />, label: "Envoyer reçus fiscaux" },
      ],
      projects: [
        { name: "École Abidjan", progress: 70 },
        { name: "Dispensaire rural", progress: 90 },
      ],
      activity: [
        { icon: <Heart />, text: "Nouveau don reçu", time: "10 min" },
        { icon: <Mail />, text: "Formulaire contact", time: "1 h" },
      ],
      alerts: [
        { text: "Reçus fiscaux à envoyer", level: "red" },
        { text: "Bénévoles manquants pour sortie", level: "orange" },
      ],
    },
    frip: {
      name: "Frip2Rêve",
      kpis: [
        { id: "vente", icon: <ShoppingCart />, label: "Ventes ce mois", value: "3 120 €", color: "green" },
        { id: "stock", icon: <Package />, label: "Articles en stock", value: "820 pièces", color: "blue" },
        { id: "orders", icon: <Box />, label: "Commandes en cours", value: "18", color: "orange" },
        { id: "visits", icon: <TrendingUp />, label: "Visites site", value: "4 300", color: "blue" },
      ],
      actions: [
        { id: "addProd", icon: <Plus />, label: "Ajouter produit" },
        { id: "promo", icon: <Tag />, label: "Créer promo" },
        { id: "pack", icon: <Package />, label: "Gérer expéditions" },
      ],
      projects: [
        { name: "Collecte vêtements", progress: 45 },
        { name: "Pop-up vente locale", progress: 30 },
      ],
      activity: [
        { icon: <ShoppingCart />, text: "Nouvelle commande", time: "30 min" },
        { icon: <Package />, text: "Article expédié", time: "hier" },
      ],
      alerts: [
        { text: "Stock faible (vêtements enfants)", level: "orange" },
        { text: "Commandes non expédiées >48h", level: "red" },
      ],
    },
  };

  // Choix des données selon la vue
  const current = view === "global" ? mergeGlobal(data.reve, data.frip) : data[view];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Tableau de bord — {current.name || "Vue globale"}</h1>
          <p className="text-sm text-muted-foreground">{today}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Switch projet */}
          <div className="rounded-lg bg-gray-100 p-1 flex">
            <SegmentBtn active={view === "reve"} onClick={() => setView("reve")}>Association</SegmentBtn>
            <SegmentBtn active={view === "frip"} onClick={() => setView("frip")}>Friperie</SegmentBtn>
            <SegmentBtn active={view === "global"} onClick={() => setView("global")}>Global</SegmentBtn>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-green-600 text-white flex items-center gap-2">
              <Plus size={16} /> Nouvelle action
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2">
              <Clock size={16} /> Activité
            </button>
          </div>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {current.kpis.map(k => (
          <KpiCard key={k.id} icon={k.icon} label={k.label} value={k.value} color={k.color} />
        ))}
      </div>

      {/* Graphique + période */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Évolution — {view === "global" ? "Global" : current.name}</h2>
          <div className="flex gap-2">
            {["7j", "30j", "12 mois"].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-md text-sm ${period === p ? "bg-blue-600 text-white" : "bg-gray-100"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="h-44 flex items-center justify-center text-sm text-muted-foreground">Graphique (à brancher)</div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {current.actions.map(a => (
          <ActionButton key={a.id} icon={a.icon} label={a.label} />
        ))}
        {/* action générique toujours disponible */}
        <ActionButton icon={<FileText />} label="Publier actualité" />
      </div>

      {/* Activité + Alertes */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-4">Activité récente</h2>
          <ul className="space-y-3 text-sm">
            {current.activity.map((it, i) => (
              <ActivityItem key={i} icon={it.icon} text={it.text} time={it.time} />
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-4">Alertes & priorités</h2>
          <div className="space-y-3 text-sm">
            {current.alerts.map((al, i) => (
              <AlertItem key={i} text={al.text} level={al.level} />
            ))}
          </div>
          <button className="mt-4 text-sm text-blue-600">Voir tout</button>
        </div>
      </div>

      {/* Projets */}
      <div>
        <h2 className="font-semibold mb-4">Projets en cours — {view === "global" ? "Tous" : current.name}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {current.projects.map((p, i) => (
            <ProjectCard key={i} name={p.name} progress={p.progress} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-muted-foreground flex flex-col md:flex-row md:justify-between gap-2 pt-6 border-t">
        <span>Dernière connexion : aujourd’hui</span>
        <span>Dashboard v1.1</span>
        <a href="#" className="text-blue-600">Support</a>
      </div>
    </div>
  );
}

/* ----------------- Helpers / components ----------------- */

function mergeGlobal(a, b) {
  // Fusion simple pour mock global : concatène KPI (prendre vrai agrégat côté serveur)
  return {
    name: "Vue globale",
    kpis: [...a.kpis, ...b.kpis].slice(0, 4),
    actions: [...a.actions.slice(0, 2), ...b.actions.slice(0, 2)],
    projects: [...a.projects, ...b.projects],
    activity: [...a.activity, ...b.activity],
    alerts: [...a.alerts, ...b.alerts],
  };
}

function SegmentBtn({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-md ${active ? "bg-white shadow" : "bg-transparent"}`}
    >
      {children}
    </button>
  );
}

function KpiCard({ icon, label, value, color = "blue" }) {
  const colorMap = {
    green: { bg: "bg-green-100", text: "text-green-600" },
    orange: { bg: "bg-orange-100", text: "text-orange-700" },
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    red: { bg: "bg-red-100", text: "text-red-700" },
  };
  const cls = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-lg ${cls.bg} ${cls.text}`}>{icon}</div>
      <div>
        <div className="text-lg font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label }) {
  return (
    <button className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center gap-2 text-sm hover:bg-gray-50">
      {icon}
      <span>{label}</span>
    </button>
  );
}

function ActivityItem({ icon, text, time }) {
  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-2">{icon}<span>{text}</span></div>
      <span className="text-xs text-muted-foreground">{time}</span>
    </li>
  );
}

function AlertItem({ text, level = "orange" }) {
  const map = {
    red: { bg: "bg-red-100", text: "text-red-700" },
    orange: { bg: "bg-orange-100", text: "text-orange-700" },
    blue: { bg: "bg-blue-100", text: "text-blue-700" },
  };
  const cls = map[level] || map.orange;
  return (
    <div className={`flex items-center gap-2 p-3 rounded-lg ${cls.bg} ${cls.text}`}>
      <AlertTriangle size={16} /> {text}
    </div>
  );
}

function ProjectCard({ name, progress }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
      <div className="font-semibold text-sm">{name}</div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${progress}%` }} />
      </div>
      <button className="text-sm text-blue-600">Voir projet</button>
    </div>
  );
}
