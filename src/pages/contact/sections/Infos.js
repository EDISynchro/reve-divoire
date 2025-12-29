import React from "react";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Users, ShieldCheck, Hourglass } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactInfoSection() {
  const trustPoints = [
    { id: 1, icon: Hourglass, title: "Réponse rapide", text: "Nous répondons sous 48h." },
    { id: 2, icon: ShieldCheck, title: "Données protégées", text: "Vos informations restent confidentielles." },
    { id: 3, icon: Users, title: "Support humain", text: "Un interlocuteur dédié pour chaque demande." },
  ];

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <section id="contact-info" className="w-full bg-gray-50 py-16 px-4 md:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">

        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#7B2D2D]">Restons connectés</h2>
          <p className="text-lg">Vous pouvez nous joindre via nos réseaux ou venir nous rencontrer directement.</p>
        </div>

        {/* Bloc principal imbriqué */}
        <div className="flex flex-col md:flex-row w-full justify-between gap-8">

          {/* Colonne Suivez-nous / Siège / Contact rapide */}
          <div className="flex-1 flex flex-col gap-8">

            <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
              <h3 className="font-semibold mb-2">Suivez-nous</h3>
              <ul className="flex gap-4">
                <li>
                  <a href="https://www.facebook.com/revedivoire225" target="_blank" rel="noopener noreferrer">
                    <Facebook size={28} className="text-[#7B2D2D] hover:text-[#5a1f1f] transition" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/reve_divoire" target="_blank" rel="noopener noreferrer">
                    <Instagram size={28} className="text-[#7B2D2D] hover:text-[#5a1f1f] transition" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/reve-divoire" target="_blank" rel="noopener noreferrer">
                    <Linkedin size={28} className="text-[#7B2D2D] hover:text-[#5a1f1f] transition" />
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
              <h3 className="font-semibold mb-2 flex items-center gap-2"><MapPin size={24} /> Notre siège</h3>
              <p>6 rue de la Mairie, 95820 Bruyères-sur-Oise</p>
              <p>Horaires : Lun–Ven, 9h–17h</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
              <h3 className="font-semibold mb-2">Contact rapide</h3>
              <p>Email : <a href="mailto:contact@revedivoire.org" className="underline">contact@revedivoire.org</a></p>
              <p>Téléphone : <a href="tel:+33123456789" className="underline">+33 1 23 45 67 89</a></p>
            </motion.div>

          </div>

          {/* Carte Google Maps */}
          <motion.div
            className="md:w-1/2 w-full h-64 md:h-96 bg-gray-200 rounded overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              title="Localisation Rêve d’Ivoire"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.337379849104!2d2.0860562156747136!3d49.20717847932705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e78758d47e97f7%3A0x7f1e52a8e5d7c0b9!2s6%20Rue%20de%20la%20Mairie%2C%2095820%20Bruy%C3%A8res-sur-Oise!5e0!3m2!1sfr!2sfr!4v1708220748930!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

        </div>

        {/* Micro-confiance */}
        <div className="w-full grid md:grid-cols-3 gap-8 text-center">
          {trustPoints.map((point) => {
            const IconComp = point.icon;
            return (
              <div key={point.id} className="flex flex-col items-center gap-3">
                <IconComp size={32} className="text-[#7B2D2D]" />
                <p className="font-semibold">{point.title}</p>
                <p className="text-sm">{point.text}</p>
              </div>
            );
          })}
        </div>

        {/* CTA secondaire */}
        <div className="w-full mt-8 flex flex-col md:flex-row justify-center gap-4">
          <a href="tel:+33123456789" className="w-full md:w-auto bg-[#7B2D2D] text-white font-semibold px-6 py-3 rounded-md text-center hover:bg-[#5a1f1f] transition">
            Nous appeler
          </a>
          <a href="mailto:contact@revedivoire.org" className="w-full md:w-auto bg-[#7B2D2D] text-white font-semibold px-6 py-3 rounded-md text-center hover:bg-[#5a1f1f] transition">
            Envoyer un email
          </a>
        </div>

      </div>
    </section>
  );
}
