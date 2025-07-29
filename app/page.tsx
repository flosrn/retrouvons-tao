import { AlertCircle, Heart, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { AuroraText } from "@/components/magicui/aurora-text";
import { ComicText } from "@/components/magicui/comic-text";
import PhotoGallery from "@/components/photo-gallery";
// Import direct des composants qui peuvent être SSR
import RewardSection from "@/components/reward-section";
import TaoHeroImage from "@/components/tao-hero-image";
import TipsSection from "@/components/tips-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Seuls les composants nécessitant des APIs browser restent dynamiques
const ClientActions = dynamic(() => import("@/components/client-actions"), {
  loading: () => (
    <div className="space-y-4">
      <div className="w-full h-14 bg-gray-200 rounded" />
      <div className="w-full h-10 bg-gray-200 rounded" />
    </div>
  ),
});

// Le formulaire peut aussi être chargé de manière dynamique pour les performances
const ReportForm = dynamic(() => import("@/components/report-form"), {
  loading: () => <div className="h-96 bg-gray-100 rounded-lg" />,
});

export default function FindTaoPage() {
  const phoneNumber = "06 24 04 61 95";
  const shareText =
    "Aidez-nous à retrouver Tao, chat perdu à Toulouse ! 500€ de récompense";

  return (
    <div className="min-h-screen bg-orange-100">
      {/* Badge récompense fixe en haut avec animation */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white py-4 px-4 text-center shadow-lg">
        <div className="flex items-center justify-center gap-3">
          <AlertCircle className="w-6 h-6" />
          <span className="font-black text-xl tracking-wide">
            500 € DE RÉCOMPENSE
          </span>
          <AlertCircle className="w-6 h-6" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Hero Section Enhanced */}
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="">
              <TaoHeroImage />
            </div>
            <div className="absolute top-4 -right-20 z-10 animate-gentle-bounce">
              <div className="relative">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-empathy border-2 border-orange-400">
                  <p className="text-sm font-semibold text-orange-700">
                    😿 Aidez-moi à rentrer chez moi !
                  </p>
                </div>
                {/* Enhanced speech bubble tail */}
                <div
                  className="absolute -bottom-2 left-12 w-0 h-0
                  border-l-[10px] border-l-transparent
                  border-t-[12px] border-t-white
                  border-r-[10px] border-r-transparent
                  rotate-[130deg] drop-shadow-sm"
                ></div>
              </div>
            </div>
          </div>

          {/* Enhanced title with better emotional impact */}
          <div className="space-y-4 mb-8">
            <div className="inline-block bg-red-100 text-red-800 font-semibold px-4 py-2 rounded-lg text-xs border border-red-200">
              🚨 DISPARU DEPUIS LE 22 JUILLET 2025 🚨
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
              Aidez-nous à retrouver
              <br />
              <ComicText fontSize={3}>Tao</ComicText>
              <span className="text-lg md:text-2xl text-gray-800">
                sa famille est très triste
              </span>
            </h1>

            {/* Emotional subtitle */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-base font-semibold text-gray-700 mb-2">
                Disparu au{" "}
                <span className="text-red-600 font-bold">
                  46 chemin de la Bourdette, 31400 Toulouse
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Quartier{" "}
                <strong className="text-orange-600">
                  Ramonville/Pouvourville
                </strong>
                <br />
                Chat mâle pucé
                <br />
                <strong className="text-purple-600">
                  Oreilles recourbées distinctives
                </strong>
              </p>
            </div>
          </div>

          {/* Enhanced CTA with urgency */}
          <Card className="bg-green-50 border-green-300 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <p className="text-sm font-semibold text-green-800 text-center">
                  Vous l'avez vu ? Contactez-nous immédiatement
                </p>
              </div>
              <ClientActions phoneNumber={phoneNumber} shareText={shareText} />
              <p className="text-xs text-green-600 mt-3 text-center">
                Réponse garantie • Ligne d'urgence 24h/24
              </p>
            </CardContent>
          </Card>

          {/* Galerie Photos - Déplacée en haut pour visibilité */}
          <PhotoGallery />

          {/* Section Formulaire de Signalement */}
          <Card className="mb-8 border-gray-200">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">
                <MessageCircle className="w-5 h-5 inline mr-2 text-orange-600" />
                Formulaire de signalement
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ReportForm />
            </CardContent>
          </Card>

          {/* Section Récompense */}
          <RewardSection />

          {/* Conseils */}
          <TipsSection />

          {/* Footer */}
          <div className="text-center pt-8 border-t border-orange-200 mt-8">
            <div className="mb-4">
              <Heart className="w-6 h-6 inline text-red-500 mr-2" />
              <p className="text-gray-700 font-medium">
                Merci à tous les Toulousains, voisins et amis des animaux !
              </p>
            </div>

            <p className="text-sm text-gray-600">
              Transmettez ce site à vos amis du quartier, chaque info compte !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
