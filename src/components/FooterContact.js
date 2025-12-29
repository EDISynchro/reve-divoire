import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

/**
 * ContactGafam.jsx
 * - Section de contact épurée, style GAFAM
 * - Formulaire intégré directement (sans import externe)
 * - Moyens de contact directs + formulaire simple
 */

export default function ContactGafam({
  title = "Entrer en contact avec Rêve d'Ivoire",
  subtitle = "Partenariat, dons, bénévolat — écrivez-nous ou passez nous voir.",
  address = "6 rue de la Mairie, 95820 Bruyères sur Oise",
  phone = "+33 6 62 03 47 59",
  email = "contact@revedivoire.org",
  hours = "Lun–Ven 9h–17h",
}) {
  return (
    <section aria-labelledby="contact-title" className="w-full bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-14">
        <header className="max-w-3xl mx-auto text-center">
          <h2 id="contact-title" className="text-3xl sm:text-4xl font-extrabold">{title}</h2>
          <p className="mt-3 text-base text-slate-600">{subtitle}</p>
        </header>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: inline form */}
          <form className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium">Nom</label>
              <input type="text" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Votre nom" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="vous@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea rows="4" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Votre message"></textarea>
            </div>
            <button type="submit" className="w-full mt-2 px-4 py-3 rounded-full bg-rose-600 text-white font-semibold">
              Envoyer le message
            </button>
            <p className="text-xs text-slate-500">Ce formulaire envoie un email simple. Aucun stockage inutile.</p>
          </form>

          {/* Right: contact details */}
          <aside className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex-none w-10 h-10 grid place-items-center rounded-lg bg-rose-600 text-white">
                  <MapPin className="w-5 h-5" aria-hidden />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Adresse</h3>
                  <p className="text-xs text-slate-600 mt-1">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-none w-10 h-10 grid place-items-center rounded-lg bg-rose-600 text-white">
                  <Phone className="w-5 h-5" aria-hidden />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Téléphone</h3>
                  <p className="text-xs text-slate-600 mt-1"><a href={`tel:${phone}`} className="hover:underline">{phone}</a></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-none w-10 h-10 grid place-items-center rounded-lg bg-rose-600 text-white">
                  <Mail className="w-5 h-5" aria-hidden />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Email</h3>
                  <p className="text-xs text-slate-600 mt-1"><a href={`mailto:${email}`} className="hover:underline">{email}</a></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-none w-10 h-10 grid place-items-center rounded-lg bg-rose-600 text-white">
                  <Clock className="w-5 h-5" aria-hidden />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Horaires</h3>
                  <p className="text-xs text-slate-600 mt-1">{hours}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-600">Vous préférez passer ? Merci de nous prévenir à l'avance.</p>
              </div>
            </div>
          </aside>
        </div>

       <div className="mt-8">
  <div className="w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
    <iframe
      title="Rêve d'Ivoire - Bruyères-sur-Oise"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.821695178466!2d2.207042215674473!3d49.174418979329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6a147b8e0922d%3A0x95b5ef0f3f1f479b!2s6%20Rue%20de%20la%20Mairie%2C%2095820%20Bruy%C3%A8res-sur-Oise!5e0!3m2!1sfr!2sfr!4v1700000000000"
      className="w-full h-56 md:h-72 border-0"
      allowFullScreen
      loading="lazy"
      style={{ transition: "all 0.3s ease-in-out" }}
    ></iframe>
  </div>
  <div className="mt-3 flex justify-center gap-4">
    <a
      href="https://www.google.com/maps/dir/?api=1&destination=6+rue+de+la+Mairie,+95820+Bruyères+sur+Oise"
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 bg-rose-600 text-white rounded-lg shadow hover:bg-rose-700 transition"
    >
      Démarrer l'itinéraire
    </a>
    <a
      href="https://www.google.com/maps/search/?api=1&query=6+rue+de+la+Mairie,+95820+Bruyères+sur+Oise"
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 bg-slate-100 text-slate-900 rounded-lg shadow hover:bg-slate-200 transition"
    >
      Voir sur Google Maps
    </a>
  </div>
</div>

      </div>
    </section>
  );
}
