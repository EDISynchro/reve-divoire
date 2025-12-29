import React, { useState } from "react";
import {
  Menu,
  Home,
  Box,
  Truck,
  Heart,
  Users,
  Globe,
  Layers,
  Newspaper,
  MessageSquare,
  BarChart2,
  Settings,
  UserPlus,
  Zap,
  Clock,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Sidebar.js
// Usage : <Sidebar user={{name: 'Awa', role: 'equipe'}} activeKey="overview" onNavigate={(k)=>{}} sitesCount={3} />
// Notes design :
// - "Sites" is deliberately simple and stable. No submenus, no marketing, just access.
// - Icon default: Globe. Use Layers if you prefer a layout metaphor.
// - Position: 2nd item (right after overview)
// - Visual: subtle active state, not loud. Optional small badge shows count.

const menuPrimary = [
  { key: "overview", label: "Aperçu", Icon: Home, roles: ["admin", "equipe"] },
  // Sites stays simple and high-visibility (2nd position)
  { key: "sites", label: "Sites", Icon: Globe, roles: ["admin", "equipe"] },
  { key: "inventory", label: "Inventaire – Frip2Rêve", Icon: Box, roles: ["admin", "equipe"] },
  { key: "orders", label: "Commandes & Envois", Icon: Truck, roles: ["admin", "equipe"] },
  { key: "donations", label: "Dons & Donateurs", Icon: Heart, roles: ["admin", "equipe"] },
  { key: "volunteers", label: "Bénévoles", Icon: Users, roles: ["admin", "equipe"] },
  { key: "projects", label: "Projets & Actions terrain", Icon: Globe, roles: ["admin", "equipe"] },
  { key: "news", label: "Actualités & Contenu", Icon: Newspaper, roles: ["admin", "equipe"] },
  { key: "messages", label: "Messages / Contact", Icon: MessageSquare, roles: ["admin", "equipe"] },
  { key: "reports", label: "Statistiques & Rapports", Icon: BarChart2, roles: ["admin", "equipe"] },
];

const menuSecondary = [
  { key: "settings", label: "Paramètres", Icon: Settings, roles: ["admin", "equipe"] },
  { key: "users", label: "Utilisateurs & Rôles", Icon: UserPlus, roles: ["admin"] },
  { key: "integrations", label: "Intégrations", Icon: Zap, roles: ["admin", "equipe"] },
  { key: "audit", label: "Audit / Logs", Icon: Clock, roles: ["admin"] },
];

const bottomItems = [
  { key: "help", label: "Aide", Icon: HelpCircle, roles: ["admin", "equipe"] },
  { key: "logout", label: "Déconnexion", Icon: LogOut, roles: ["admin", "equipe"] },
];

function cx(...args) {
  return args.filter(Boolean).join(" ");
}

export default function Sidebar({ user = { name: "Utilisateur", role: "equipe" }, activeKey = "overview", onNavigate = () => {}, sitesCount = 0 }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderItem = (item) => {
    if (!item.roles.includes(user.role) && !item.roles.includes("equipe")) return null;
    const active = activeKey === item.key;

    return (
      <button
        key={item.key}
        onClick={() => {
          onNavigate(item.key);
          setMobileOpen(false);
        }}
        className={cx(
          "relative flex items-center gap-3 w-full text-sm rounded-lg p-2 transition-all focus:outline-none",
          active ? "bg-white/6 font-semibold" : "hover:bg-white/5"
        )}
        aria-current={active ? "page" : undefined}
      >
        {/* left active bar */}
        <span
          className={cx(
            "absolute left-0 top-0 h-full rounded-l-md",
            active ? "w-1 bg-blue-500" : "w-0"
          )}
        />

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <item.Icon className="w-5 h-5" />
            <span className={cx(collapsed ? "hidden" : "flex-1 text-left")}>{item.label}</span>
          </div>

          {/* discreet badge for Sites only; not flashy */}
          {item.key === "sites" && sitesCount > 0 && !collapsed && (
            <span className="ml-2 text-xs font-medium bg-white/8 text-white rounded-full px-2 py-0.5">{sitesCount}</span>
          )}
        </div>
      </button>
    );
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-2">
          <button onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu" className="p-2 rounded-md">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-white/6 flex items-center justify-center font-semibold">N</div>
            <div>
              <div className="text-sm">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.role}</div>
            </div>
          </div>
        </div>
        <div>
          <button onClick={() => setCollapsed(!collapsed)} aria-label="Réduire la sidebar" className="p-2 rounded-md">
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar drawer (mobile) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-[#0f172a] p-4 shadow-2xl overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-white/6 flex items-center justify-center font-bold">N</div>
                <div>
                  <div className="text-base font-semibold">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.role}</div>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-md">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {menuPrimary.map((m) => renderItem(m))}
            </nav>

            <div className="my-4 h-px bg-white/6" />

            <nav className="flex flex-col gap-1">
              {menuSecondary.map((m) => renderItem(m))}
            </nav>

            <div className="mt-6 flex flex-col gap-2">
              {bottomItems.map((m) => renderItem(m))}
            </div>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className={cx(
        "hidden md:flex flex-col h-screen sticky top-0 bg-[#071024] text-white p-4",
        collapsed ? "w-20" : "w-64"
      )}>
        {/* Top: logo & user */}
        <div className="flex items-center gap-3 mb-6">
          <div className={cx("w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg", collapsed ? "mx-auto" : "")}>N</div>
          {!collapsed && (
            <div>
              <div className="text-sm font-semibold">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.role}</div>
            </div>
          )}
          <div className="ml-auto flex gap-1">
            <button onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar" className="p-2 rounded-md">
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Primary menu */}
        <nav className="flex-1 flex flex-col gap-1">
          {menuPrimary.map((m) => renderItem(m))}
        </nav>

        <div className="my-4 h-px bg-white/6" />

        {/* Secondary menu */}
        <nav className="flex flex-col gap-1">
          {menuSecondary.map((m) => renderItem(m))}
        </nav>

        <div className="mt-6 flex flex-col gap-2">
          {bottomItems.map((m) => renderItem(m))}
        </div>
      </aside>
    </>
  );
}
