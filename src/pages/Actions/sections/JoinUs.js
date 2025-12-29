import React from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Video,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react";

export default function JoinCommunitySection() {
  return (
    <section className="w-full bg-neutral-950 text-white py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
  Rejoindre la communauté{" "}
  <span className="text-green-600">Rêve d’Ivoire</span>
</h2>

          <p className="mt-4 text-gray-800 text-base md:text-lg">
            Suivre nos actions, participer aux échanges et voir l’impact en temps réel.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Social networks */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-neutral-900 rounded-2xl p-6 space-y-4"
          >
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5" /> Nos réseaux sociaux
            </h3>
            <p className="text-neutral-400 text-sm">
              Photos, vidéos et actualités pour suivre nos actions et mobiliser la
              communauté.
            </p>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4" /> Instagram — @reve_divoire
              </li>
              <li className="flex items-center gap-2">
                <Facebook className="w-4 h-4" /> Facebook — @revedivoire225
              </li>
              <li className="flex items-center gap-2">
                <Video className="w-4 h-4" /> TikTok — @frip2reve
              </li>
            </ul>

            <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition">
              Suivre l’association <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Lives */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-neutral-900 rounded-2xl p-6 space-y-4"
          >
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Lives & échanges
            </h3>
            <p className="text-neutral-400 text-sm">
              Des rendez-vous réguliers pour présenter les actions et répondre aux
              questions.
            </p>

            <ul className="text-sm text-neutral-300 space-y-2">
              <li>📅 Lundis & samedis</li>
              <li>💬 Live Zoom interactif</li>
              <li>👥 Ouvert à tous</li>
            </ul>

            <div className="flex flex-col gap-2">
              <button className="inline-flex items-center justify-center gap-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition">
                Participer au prochain live
              </button>
              <button className="inline-flex items-center justify-center gap-2 text-sm text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition">
                Voir le calendrier
              </button>
            </div>
          </motion.div>

          {/* Join */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-2xl p-6 space-y-4"
          >
            <h3 className="text-xl font-semibold">Faire partie de l’aventure</h3>
            <p className="text-sm text-emerald-50">
              Tu ne fais pas que suivre : tu comprends, tu échanges et tu participes à
              un impact réel.
            </p>

            <button className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-3 rounded-xl transition">
              Rejoindre la communauté <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-xs text-emerald-100">
              Aucune obligation, aucun engagement caché.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
