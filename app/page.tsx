"use client"

import { Phone, Camera, Heart, Share2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import TaoHeroImage from "@/components/tao-hero-image"
import dynamic from "next/dynamic"

const ReportForm = dynamic(() => import("@/components/report-form"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
})
const PhotoGallery = dynamic(() => import("@/components/photo-gallery"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
})
const RewardSection = dynamic(() => import("@/components/reward-section"))
const TipsSection = dynamic(() => import("@/components/tips-section"))

export default function FindTaoPage() {
  const phoneNumber = "06 24 04 61 95"
  const shareText = "Aidez-nous à retrouver Tao, chat perdu à Toulouse ! 500€ de récompense"
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, "")}`
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Chat perdu - Tao - Toulouse",
        text: shareText,
        url: shareUrl,
      })
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
      window.open(whatsappUrl, "_blank")
    }
  }

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
              <Button
                onClick={handleCall}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-xl font-bold rounded-xl shadow-lg"
                size="lg"
              >
                <Phone className="w-6 h-6 mr-3" />
                {phoneNumber}
              </Button>
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

            <Button
              onClick={handleShare}
              variant="outline"
              className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partager ce site
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
