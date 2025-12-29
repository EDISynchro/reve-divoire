// src/data/sitesData.js
// Importer les images pour que le bundler les résolve correctement
import revedLogo from "../assets/revedivoire/logo.png";
import frip2Logo from "../assets/frip2reve/logo.png";

const sitesData = [
  {
    id: "reve-divoire",
    name: "Rêve d'Ivoire",
    domain: "revedivoire.org",
    logo: revedLogo, // <- importé
    type: "association",
    status: "maintenance",
    pinned: true,
    priority: 10,
    last_update: "2025-12-13",
    visits_7d: 142,
    health: "ok",
    alerts: [],
    uptime: "99.97%",
    ssl_expiry: "2026-03-10",
    last_backup: "2025-12-12",
    owner: { email: "contact@revedivoire.org" },
    plan_id: "Associatif",
    next_invoice: "2026-01-01",
    adminUrl: "https://admin.revedivoire.org",
    logs: [
      { when: "2025-12-13 09:12", actor: "system", action: "Mise à jour du thème" },
      { when: "2025-12-12 14:05", actor: "natacha@...", action: "Ajout d'événement" }
    ]
  },

  {
    id: "frip2reve",
    name: "Frip2Rêve",
    domain: "frip2reve.org",
    logo: frip2Logo, // <- importé
    type: "boutique",
    status: "draft",
    pinned: false,
    priority: 5,
    last_update: "2025-12-14",
    visits_7d: 87,
    health: "warn",
    alerts: ["Certificat SSL bientôt expiré"],
    uptime: "99.2%",
    ssl_expiry: "2025-12-28",
    last_backup: "2025-12-13",
    owner: { email: "vente@frip2reve.org" },
    plan_id: "E-commerce",
    next_invoice: "2026-01-15",
    adminUrl: "https://admin.frip2reve.org",
    conversions_7d: 6,
    logs: [
      { when: "2025-12-14 08:20", actor: "admin", action: "Ajout produit: Veste vintage" },
      { when: "2025-12-13 19:01", actor: "system", action: "Sync inventaire" }
    ]
  }
];

export default sitesData;
