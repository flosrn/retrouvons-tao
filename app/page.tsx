import TaoHeroImage from "@/components/tao-hero-image"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Camera, Heart } from "lucide-react"
import dynamic from "next/dynamic"

// Import direct des composants qui peuvent être SSR
import RewardSection from "@/components/reward-section"
import TipsSection from "@/components/tips-section"
import PhotoGallery from "@/components/photo-gallery"

// Seuls les composants nécessitant des APIs browser restent dynamiques
const ClientActions = dynamic(() => import("@/components/client-actions"), {
  loading: () => (
    <div className="space-y-4">
      <div className="w-full h-14 bg-gray-200 animate-pulse rounded-xl" />
      <div className="w-full h-10 bg-gray-200 animate-pulse rounded" />
    </div>
  ),
})

// Le formulaire peut aussi être chargé de manière dynamique pour les performances
const ReportForm = dynamic(() => import("@/components/report-form"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
})

export default function FindTaoPage() {
  const phoneNumber = "06 24 04 61 95"
  const shareText = "Aidez-nous à retrouver Tao, chat perdu à Toulouse ! 500€ de récompense"

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Badge récompense fixe en haut */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-4 text-center shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span className="font-bold text-lg">500 € DE RÉCOMPENSE</span>
          <AlertCircle className="w-5 h-5" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <TaoHeroImage />
            <div className="absolute top-6 -right-16 z-50">
              <div className="relative">
                <div className="bg-white rounded-full px-4 py-2 shadow-lg border-2 border-orange-400">
                  <p className="text-sm font-medium text-orange-600">Miaou ! Je suis perdu 😿</p>
                </div>
                {/* Petite queue de bulle */}
                <div className="absolute -bottom-2 left-12 w-0 h-0
                  border-l-[8px] border-l-transparent
                  border-t-[10px] border-t-white
                  border-r-[8px] border-r-transparent
                  rotate-[127deg]">
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Aidez-nous à retrouver <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent font-extrabold">Tao</span>,
            <br />
            <span className="text-orange-600">chat perdu à Toulouse !</span>
          </h1>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Disparu au <strong>46 chemin de la Bourdette, 31400 Toulouse</strong>
            <br />
            Quartier <strong>Ramonville/Pouvourville</strong>
            <br />
            Chat mâle pucé, oreilles recourbées très distinctives
          </p>

          {/* CTA Principal - Appel */}
          <Card className="bg-green-50 border-green-200 mb-6">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-3">
                <strong>Vous l'avez vu ? Appelez immédiatement !</strong>
              </p>
              <ClientActions phoneNumber={phoneNumber} shareText={shareText} />
            </CardContent>
          </Card>

          {/* Galerie Photos - Déplacée en haut pour visibilité */}
          <PhotoGallery />

          {/* Section Formulaire de Signalement */}
          <Card className="mb-8 border-orange-200 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  <Camera className="w-6 h-6 inline mr-2 text-orange-600" />
                  Vous avez vu Tao ?
                </h2>
                <p className="text-orange-600 font-semibold text-lg">Signalez-le ici et réclamez la récompense !</p>
              </div>
              <ReportForm />
            </CardContent>
          </Card>

          {/* Section Récompense */}
          <RewardSection />

          {/* Conseils */}
          <TipsSection />

          {/* Footer */}
          <div className="text-center py-8 border-t border-orange-200 mt-8">
            <div className="mb-4">
              <Heart className="w-6 h-6 inline text-red-500 mr-2" />
              <p className="text-gray-700 font-medium">Merci à tous les Toulousains, voisins et amis des animaux !</p>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Transmettez ce site à vos amis du quartier, chaque info compte !
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
