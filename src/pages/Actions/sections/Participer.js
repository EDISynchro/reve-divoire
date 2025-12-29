import React, { useState } from "react";
import {
  CreditCard,
  Heart,
  Users,
  UploadCloud,
  MapPin,
  CheckCircle,
  X,
} from "lucide-react";

/*
 SectionActNow.js
 "Agis avec nous — chaque geste compte"
 - Composant React (JS)
 - Prêt à coller sous la section "Impact & preuves"
 - Pas de TypeScript, tailwind-friendly

 Ce qu'il fait :
 - 3 cartes (Don / Bénévole / Partenariat) empilées mobile, horizontales desktop
 - Modals simples pour le micro-flow don / partenariat
 - Formulaire inline pour le bénévolat
 - Envoie les données vers endpoints définis (POST)
 - Push d'événements analytics via window.dataLayer
 - RGPD checkbox, aria-labels, keyboard friendly
*/

export default function SectionActNow({
  donateEndpoint = "/api/don",
  volunteerEndpoint = "/api/volunteer",
  partnershipEndpoint = "/api/partnership",
  contactEmail = "frip2reve@gmail.com",
}) {
  const [donModalOpen, setDonModalOpen] = useState(false);
  const [partModalOpen, setPartModalOpen] = useState(false);
  const [thankYou, setThankYou] = useState({ open: false, message: "" });

  // Don form state
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [project, setProject] = useState("Frip2Rêve");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donConsent, setDonConsent] = useState(false);
  const [donLoading, setDonLoading] = useState(false);

  // Volunteer form
  const [volunteer, setVolunteer] = useState({
    firstName: "",
    email: "",
    phone: "",
    availability: "",
    skills: "",
  });
  const [volLoading, setVolLoading] = useState(false);

  // Partnership form
  const [partnerForm, setPartnerForm] = useState({
    company: "",
    contact: "",
    type: "Financier",
    message: "",
    file: null,
  });
  const [partLoading, setPartLoading] = useState(false);

  function pushEvent(name, params = {}) {
    try {
      if (window && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: name, ...params });
      }
    } catch (e) {
      // fail silently
    }
  }

  async function submitDonation(e) {
    e && e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    if (!donorEmail || !donConsent || !finalAmount) {
      setThankYou({ open: true, message: "Merci : il manque un renseignement (email / consent)." });
      return;
    }
    setDonLoading(true);
    pushEvent("don_click", { amount: finalAmount, project });

    try {
      const res = await fetch(donateEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount, project, name: donorName, email: donorEmail, consent: donConsent }),
      });

      if (!res.ok) throw new Error("network");

      const json = await res.json();
      pushEvent("don_complete", { amount: finalAmount, project, id: json.id || null });
      setThankYou({ open: true, message: "Merci — votre don a bien été pris en compte. Un email arrive bientôt." });
      // reset
      setDonModalOpen(false);
      setDonLoading(false);
    } catch (err) {
      setDonLoading(false);
      setThankYou({ open: true, message: "Erreur lors du paiement. Réessaye ou contacte frip2reve@gmail.com" });
    }
  }

  async function submitVolunteer(e) {
    e && e.preventDefault();
    if (!volunteer.firstName || !volunteer.email) {
      setThankYou({ open: true, message: "Merci : indique ton nom et ton email." });
      return;
    }
    setVolLoading(true);
    pushEvent("volunteer_signup", { email: volunteer.email });

    try {
      const res = await fetch(volunteerEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volunteer),
      });
      if (!res.ok) throw new Error("network");
      setThankYou({ open: true, message: "Merci — on te recontacte sous 72h pour confirmer la mission." });
      setVolunteer({ firstName: "", email: "", phone: "", availability: "", skills: "" });
    } catch (err) {
      setThankYou({ open: true, message: "Erreur serveur. Contacte-nous : " + contactEmail });
    }
    setVolLoading(false);
  }

  async function submitPartnership(e) {
    e && e.preventDefault();
    if (!partnerForm.company || !partnerForm.contact) {
      setThankYou({ open: true, message: "Merci : indique le nom de l'entreprise et le contact." });
      return;
    }
    setPartLoading(true);
    pushEvent("partnership_inquiry", { contact: partnerForm.contact });

    try {
      const fd = new FormData();
      fd.append("company", partnerForm.company);
      fd.append("contact", partnerForm.contact);
      fd.append("type", partnerForm.type);
      fd.append("message", partnerForm.message);
      if (partnerForm.file) fd.append("file", partnerForm.file);

      const res = await fetch(partnershipEndpoint, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("network");
      setThankYou({ open: true, message: "Merci — proposition envoyée. Nous revenons vers vous." });
      setPartModalOpen(false);
    } catch (err) {
      setThankYou({ open: true, message: "Erreur d'envoi. Contact : " + contactEmail });
    }
    setPartLoading(false);
  }

  return (
    <section className="bg-white py-12" aria-labelledby="act-with-us">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-3xl mb-6">
          <h2 id="act-with-us" className="text-3xl font-extrabold text-gray-900">
            Agis avec nous — chaque geste compte
          </h2>
          <p className="mt-2 text-gray-700">Soutien, bénévolat ou partenariat : choisis ce que tu veux. Tout est transparent et suivi.</p>
          <p className="mt-1 text-sm text-gray-600">Ton aide finance des actions concrètes — on te montre toujours les preuves.</p>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Card 1 — Don */}
          <div className="p-6 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-md"><CreditCard size={20} /></div>
              <h3 className="text-lg font-semibold">Faire un don</h3>
            </div>

            <p className="mt-3 text-sm text-gray-700">Don ponctuel ou régulier pour financer un projet identifié. Reçu fiscal et rapport d’usage disponibles sur demande.</p>

            <div className="mt-4">
              <div className="flex gap-2 flex-wrap">
                {[10,25,50].map((a)=> (
                  <button
                    key={a}
                    onClick={() => { setAmount(a); setCustomAmount(""); setDonModalOpen(true); }}
                    className="px-3 py-2 rounded-md border text-sm"
                    aria-label={`Donner ${a} euros`}
                  >
                    {a} €
                  </button>
                ))}

                <button
                  onClick={() => { setCustomAmount(""); setDonModalOpen(true); }}
                  className="px-3 py-2 rounded-md border text-sm"
                >
                  Montant libre
                </button>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setDonModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-900 text-white"
                  aria-label="Faire un don"
                >
                  Faire un don
                </button>
                <p className="mt-2 text-xs text-gray-600">Reçu et suivi envoyés par email — contact : {contactEmail}</p>
              </div>
            </div>
          </div>

          {/* Card 2 — Bénévole */}
          <div className="p-6 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-md"><Users size={20} /></div>
              <h3 className="text-lg font-semibold">Devenir bénévole</h3>
            </div>

            <p className="mt-3 text-sm text-gray-700">Donne ton temps — tri, vente à la friperie, aide événementielle, animation de lives.</p>

            <form onSubmit={submitVolunteer} className="mt-4 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  aria-label="Prénom"
                  required
                  placeholder="Prénom"
                  value={volunteer.firstName}
                  onChange={(e)=> setVolunteer({...volunteer, firstName: e.target.value})}
                  className="px-2 py-2 border rounded-md text-sm"
                />
                <input
                  aria-label="Email"
                  required
                  type="email"
                  placeholder="Email"
                  value={volunteer.email}
                  onChange={(e)=> setVolunteer({...volunteer, email: e.target.value})}
                  className="px-2 py-2 border rounded-md text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  aria-label="Téléphone (optionnel)"
                  placeholder="Téléphone (optionnel)"
                  value={volunteer.phone}
                  onChange={(e)=> setVolunteer({...volunteer, phone: e.target.value})}
                  className="px-2 py-2 border rounded-md text-sm"
                />
                <input
                  aria-label="Disponibilités"
                  placeholder="Disponibilités (jours/heures)"
                  value={volunteer.availability}
                  onChange={(e)=> setVolunteer({...volunteer, availability: e.target.value})}
                  className="px-2 py-2 border rounded-md text-sm"
                />
              </div>

              <input
                aria-label="Compétences / préférence"
                placeholder="Compétences / préférence (tri, vente, logistique, com)"
                value={volunteer.skills}
                onChange={(e)=> setVolunteer({...volunteer, skills: e.target.value})}
                className="px-2 py-2 border rounded-md text-sm"
              />

              <div className="flex items-center gap-2">
                <input id="rgpd-vol" type="checkbox" className="w-4 h-4" required />
                <label htmlFor="rgpd-vol" className="text-xs">J'accepte d'être contacté·e par email pour la mission (RGPD).</label>
              </div>

              <div className="mt-2">
                <button type="submit" className="px-4 py-2 rounded-md bg-gray-900 text-white" aria-label="Je deviens bénévole">
                  {volLoading ? "Envoi…" : "Je deviens bénévole"}
                </button>
                <p className="mt-2 text-xs text-gray-600">Merci — on te contacte sous 72h pour confirmer la mission.</p>
              </div>
            </form>
          </div>

          {/* Card 3 — Partenariat */}
          <div className="p-6 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-md"><Heart size={20} /></div>
              <h3 className="text-lg font-semibold">Partenariat & mécénat</h3>
            </div>

            <p className="mt-3 text-sm text-gray-700">Entreprises, associations et médias : rejoignez-nous. ACJC déjà partenaire.</p>

            <div className="mt-4">
              <button
                onClick={() => setPartModalOpen(true)}
                className="px-4 py-2 rounded-md bg-gray-900 text-white"
                aria-label="Proposer un partenariat"
              >
                Proposer un partenariat
              </button>

              <p className="mt-2 text-xs text-gray-600">Logos et mentions publiées après validation — conventions signées.</p>
            </div>
          </div>

        </div>

        {/* Aux actions */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-700">Je veux aider autrement</p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <a href="/proposer-don-materiel" className="underline text-sm">Proposer un don matériel</a>
            <a href="/proposer-lieu" className="underline text-sm">Proposer un lieu</a>
            <a href="/proposer-media" className="underline text-sm">Proposer un média</a>
          </div>
        </div>

        {/* Modals */}
        {donModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white max-w-md w-full rounded-lg p-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Faire un don</h4>
                <button onClick={() => setDonModalOpen(false)} aria-label="Fermer" className="p-1"><X /></button>
              </div>

              <form onSubmit={submitDonation} className="mt-4 space-y-3">
                <div className="flex gap-2">
                  {[10,25,50].map((a)=> (
                    <button key={a} type="button" onClick={()=>{setAmount(a); setCustomAmount("");}} className={`px-3 py-2 rounded-md border ${amount===a? 'bg-gray-200':''}`}>
                      {a} €
                    </button>
                  ))}
                  <input
                    type="number"
                    placeholder="Montant libre"
                    value={customAmount}
                    onChange={(e)=> setCustomAmount(e.target.value)}
                    className="px-2 py-2 border rounded-md flex-1"
                    aria-label="Montant libre"
                  />
                </div>

                <div>
                  <label className="text-sm">Projet cible</label>
                  <select value={project} onChange={(e)=> setProject(e.target.value)} className="w-full px-2 py-2 border rounded-md">
                    <option>Frip2Rêve</option>
                    <option>Paix 04/2025</option>
                    <option>Autre</option>
                  </select>
                </div>

                <input required type="text" placeholder="Nom" value={donorName} onChange={(e)=> setDonorName(e.target.value)} className="w-full px-2 py-2 border rounded-md" aria-label="Nom" />
                <input required type="email" placeholder="Email" value={donorEmail} onChange={(e)=> setDonorEmail(e.target.value)} className="w-full px-2 py-2 border rounded-md" aria-label="Email" />

                <div className="flex items-center gap-2">
                  <input id="rgpd-don" type="checkbox" checked={donConsent} onChange={(e)=> setDonConsent(e.target.checked)} className="w-4 h-4" />
                  <label htmlFor="rgpd-don" className="text-xs">Je souhaite recevoir un reçu et des infos sur l'usage des fonds (RGPD).</label>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button type="submit" className="px-4 py-2 rounded-md bg-gray-900 text-white" disabled={donLoading}>
                    {donLoading ? "Traitement…" : "Payer maintenant"}
                  </button>
                  <button type="button" onClick={()=> setDonModalOpen(false)} className="px-3 py-2 rounded-md border">Annuler</button>
                </div>

                <p className="text-xs text-gray-600 mt-2">Paiement sécurisé — Stripe / PayPal. Contact : {contactEmail}</p>
              </form>
            </div>
          </div>
        )}

        {partModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white max-w-lg w-full rounded-lg p-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Proposer un partenariat</h4>
                <button onClick={() => setPartModalOpen(false)} aria-label="Fermer" className="p-1"><X /></button>
              </div>

              <form onSubmit={submitPartnership} className="mt-4 space-y-3">
                <input required placeholder="Nom entreprise" value={partnerForm.company} onChange={(e)=> setPartnerForm({...partnerForm, company: e.target.value})} className="w-full px-2 py-2 border rounded-md" />
                <input required placeholder="Contact (email)" value={partnerForm.contact} onChange={(e)=> setPartnerForm({...partnerForm, contact: e.target.value})} className="w-full px-2 py-2 border rounded-md" />

                <select value={partnerForm.type} onChange={(e)=> setPartnerForm({...partnerForm, type: e.target.value})} className="w-full px-2 py-2 border rounded-md">
                  <option>Financier</option>
                  <option>Matériel</option>
                  <option>Média</option>
                </select>

                <textarea placeholder="Message court" value={partnerForm.message} onChange={(e)=> setPartnerForm({...partnerForm, message: e.target.value})} className="w-full px-2 py-2 border rounded-md" rows={3} />

                <div>
                  <label className="text-sm">Fichier (optionnel)</label>
                  <input type="file" onChange={(e)=> setPartnerForm({...partnerForm, file: e.target.files[0]})} className="w-full" />
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button type="submit" className="px-4 py-2 rounded-md bg-gray-900 text-white" disabled={partLoading}>{partLoading? 'Envoi…':'Envoyer la proposition'}</button>
                  <button type="button" onClick={()=> setPartModalOpen(false)} className="px-3 py-2 rounded-md border">Annuler</button>
                </div>

                <p className="text-xs text-gray-600">Nous signons une convention après validation. Logos publiés après accord.</p>
              </form>
            </div>
          </div>
        )}

        {/* Thank you modal */}
        {thankYou.open && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/30 p-4">
            <div className="bg-white rounded-md p-6 max-w-sm w-full text-center">
              <CheckCircle size={42} className="mx-auto text-green-600" />
              <p className="mt-4 text-gray-900 font-semibold">Merci, votre geste compte</p>
              <p className="mt-2 text-sm text-gray-700">{thankYou.message}</p>
              <div className="mt-4">
                <button onClick={()=> setThankYou({ open:false, message: ''})} className="px-4 py-2 rounded-md bg-gray-900 text-white">Fermer</button>
              </div>
            </div>
          </div>
        )}

        {/* Footer trust line */}
        <div className="mt-8 text-sm text-gray-600">
          <p>Transparence : Nous publions rapports et preuves pour chaque projet. Contact : <a className="underline" href={`mailto:${contactEmail}`}>{contactEmail}</a> — Partenaire principal : ACJC.</p>
        </div>

      </div>
    </section>
  );
}
