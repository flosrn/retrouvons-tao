"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { useState } from "react"

export default function PhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const photos = [
    {
      src: "/tao-main.jpg",
      alt: "Tao de face",
      caption: "Vue de face - oreilles recourbées très distinctives",
      description:
        "Photo principale montrant clairement les oreilles recourbées vers l'arrière, caractéristique unique de Tao.",
    },
    {
      src: "/tao-garden.jpg",
      alt: "Tao dans l'herbe",
      caption: "Dans l'herbe - profil montrant les oreilles et la robe tigrée",
      description:
        "Tao dans son environnement extérieur. Notez la robe gris tigré sur les côtés et les oreilles distinctives.",
    },
    {
      src: "/tao-chair.jpg",
      alt: "Tao sur fauteuil",
      caption: "Sur fauteuil - vue trois-quarts, caractère doux et câlin",
      description: "Tao montrant son côté doux et câlin. Vue parfaite pour identifier ses traits faciaux.",
    },
    {
      src: "/tao-desk.jpg",
      alt: "Tao sur meuble",
      caption: "Perché sur meuble - côté curieux et joueur",
      description: "Tao perché, montrant son caractère curieux et joueur. Oreilles bien visibles.",
    },
    {
      src: "/tao-box.jpg",
      alt: "Tao dans boîte",
      caption: "Dans une boîte - aime se cacher dans des espaces confinés",
      description:
        "Tao dans une boîte en carton, illustrant parfaitement qu'il aime se cacher dans des espaces confinés.",
    },
  ]

  const openPhoto = (index: number) => {
    setSelectedPhotoIndex(index)
    setIsDialogOpen(true)
  }

  const closePhoto = () => {
    setIsDialogOpen(false)
    setSelectedPhotoIndex(null)
  }

  const navigatePhoto = (direction: "prev" | "next") => {
    if (selectedPhotoIndex === null) return

    if (direction === "prev") {
      setSelectedPhotoIndex(selectedPhotoIndex > 0 ? selectedPhotoIndex - 1 : photos.length - 1)
    } else {
      setSelectedPhotoIndex(selectedPhotoIndex < photos.length - 1 ? selectedPhotoIndex + 1 : 0)
    }
  }

  const selectedPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null

  return (
    <>
      <Card className="mb-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-300">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">
            <Camera className="w-6 h-6 inline mr-2 text-orange-600" />
            Reconnaître Tao
          </CardTitle>
          <p className="text-gray-600 font-medium">Cliquez sur les photos pour les agrandir et mieux identifier Tao</p>
        </CardHeader>
        <CardContent>
          {/* Photo principale en grand */}
          <div className="text-center mb-6">
            <div className="relative group cursor-pointer" onClick={() => openPhoto(1)}>
              <img
                src="/tao-garden.jpg"
                alt="Tao - Photo principale"
                className="w-64 h-64 rounded-2xl object-cover border-3 border-orange-300 shadow-lg mx-auto group-hover:shadow-xl transition-shadow"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-2xl transition-all flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2 font-semibold">
              Photo principale - Cliquez pour agrandir et voir les détails !
            </p>
          </div>

          {/* Galerie des autres photos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[0, 2, 3, 4].map((photoIndex, gridIndex) => (
              <div key={gridIndex} className="text-center">
                <div className="relative group cursor-pointer" onClick={() => openPhoto(photoIndex)}>
                  <img
                    src={photos[photoIndex].src || "/placeholder.svg"}
                    alt={photos[photoIndex].alt}
                    className="w-full aspect-square object-cover rounded-xl border-2 border-orange-200 shadow-md group-hover:shadow-lg transition-shadow"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2 font-medium leading-tight">{photos[photoIndex].caption}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-orange-100 border border-orange-300 rounded-lg p-4">
            <h4 className="font-bold text-orange-800 mb-3 text-center">🔍 Signes distinctifs de Tao</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-white rounded-lg p-3 border border-orange-200">
                <span className="font-semibold text-orange-800">👂 Oreilles :</span>
                <br />
                <span className="text-orange-700">
                  Très particulières, recourbées vers l'arrière (signe le plus distinctif)
                </span>
              </div>
              <div className="bg-white rounded-lg p-3 border border-orange-200">
                <span className="font-semibold text-orange-800">🎨 Robe :</span>
                <br />
                <span className="text-orange-700">Gris tigré sur les côtés, tacheté sur le dessus</span>
              </div>
              <div className="bg-white rounded-lg p-3 border border-orange-200">
                <span className="font-semibold text-orange-800">💝 Caractère :</span>
                <br />
                <span className="text-orange-700">Doux, câlin, curieux, joueur</span>
              </div>
              <div className="bg-white rounded-lg p-3 border border-orange-200">
                <span className="font-semibold text-orange-800">⚠️ Comportement :</span>
                <br />
                <span className="text-orange-700">Craintif avec les inconnus</span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                🔬 Pucé (pas de collier, pas de tatouage visible)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Zoom Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-none">
          <div className="relative">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/30 text-white rounded-full"
              onClick={closePhoto}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 text-white rounded-full"
              onClick={() => navigatePhoto("prev")}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 text-white rounded-full"
              onClick={() => navigatePhoto("next")}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Photo and details */}
            {selectedPhoto && (
              <div className="flex flex-col">
                <div className="relative">
                  <img
                    src={selectedPhoto.src || "/placeholder.svg"}
                    alt={selectedPhoto.alt}
                    className="w-full max-h-[70vh] object-contain"
                  />
                </div>

                {/* Photo info */}
                <div className="bg-white p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedPhoto.caption}</h3>
                  <p className="text-gray-600 mb-4">{selectedPhoto.description}</p>

                  {/* Photo counter */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Photo {(selectedPhotoIndex || 0) + 1} sur {photos.length}
                    </span>
                    <div className="flex gap-2">
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                        Cliquez et faites glisser pour naviguer
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
