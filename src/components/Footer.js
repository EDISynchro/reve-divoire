import React from "react";
import { Mail, Phone, MapPin, ExternalLink, FileText } from "lucide-react";

// FooterContact.jsx
// À placer en bas de page. Tailwind CSS requis.

export default function FooterContact({
  associationName = "Rêve d’Ivoire",
  address = "6 rue de la Mairie, 95820 Bruyères sur Oise",
  email = "frip2reve@gmail.com",
  phone = "06 62 03 47 59",
  links = [
    { href: "/projets", label: "Nos projets" },
    { href: "/faire-un-don", label: "Faire un don" },
    { href: "/benevolat", label: "Devenir bénévole" },
    { href: "/transparence", label: "Transparence & rapports" }
  ],
  social = {
    tiktok: "https://www.tiktok.com/@revedivoire",
    instagram: "https://www.instagram.com/reve_divoire",
    facebook: "https://www.facebook.com/revedivoire225",
    linkedin: "https://www.linkedin.com/company/revedivoire"
  },
  onSupportClick = () => {},
  legalLinks = [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/confidentialite", label: "Politique de confidentialité" }
  ]
}) {
  return (
    <footer className="w-full bg-slate-900 text-slate-100" aria-labelledby="footer-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <h2 id="footer-heading" className="sr-only">Restez en contact avec {associationName}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coordonnées */}
          <div>
            <h3 className="text-sm font-semibold">Coordonnées</h3>
            <address className="not-italic mt-3 text-sm text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>{address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-400" />
                <a href={`mailto:${email}`} className="underline hover:text-white">{email}</a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-400" />
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="underline hover:text-white">{phone}</a>
              </div>
            </address>

            <div className="mt-4">
              <button onClick={onSupportClick} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-rose-600 text-white text-sm font-medium shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300" aria-label="Soutenir l'association">
                Soutenir l’association
              </button>
            </div>
          </div>

          {/* Liens rapides */}
          <nav aria-label="Liens rapides" className="text-sm">
            <h3 className="text-sm font-semibold">Liens rapides</h3>
            <ul className="mt-3 space-y-2 text-slate-300">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-white inline-flex items-center gap-2">
                    <ExternalLink className="w-3 h-3 text-rose-400" />
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Réseaux sociaux et confiance */}
          <div>
            <h3 className="text-sm font-semibold">Réseaux</h3>
            <div className="mt-3 flex items-center gap-3">
              <a href={social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-slate-200 hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2v6a4 4 0 0 0 4 4h3v2a6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6V2z" />
                </svg>
              </a>

              <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-200 hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
                </svg>
              </a>

              <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-200 hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22 12a10 10 0 1 0-11.5 9.9V14.9h-2.3v-2.9h2.3V10c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .1 2 .1v2.2h-1.1c-1.1 0-1.5.7-1.5 1.4v1.6h2.6l-.4 2.9h-2.2v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>
            </div>

            <div className="mt-6 bg-slate-800 rounded-lg p-3 text-slate-300 text-xs">
              <div className="font-semibold text-slate-100">Confiance et transparence</div>
              <ul className="mt-2 space-y-1">
                <li>100% suivi terrain — rapports et photos publiés</li>
                <li>Respect de la dignité des enfants et des familles</li>
                <li>Partenariats locaux vérifiés</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-sm">
          <div>
            <span>© {new Date().getFullYear()} {associationName}. Tous droits réservés.</span>
            <span className="ml-3">•</span>
            {legalLinks.map((ll) => (
              <a key={ll.href} href={ll.href} className="ml-3 hover:text-white inline-flex items-center gap-1">
                <FileText className="w-3 h-3 text-rose-400" />
                <span>{ll.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="/projets" className="text-slate-300 hover:text-white underline">Nos projets</a>
            <a href="/faire-un-don" onClick={(e) => { /* fallback */ }} className="px-3 py-2 rounded-md bg-rose-600 text-white text-sm font-medium">Soutenir</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
