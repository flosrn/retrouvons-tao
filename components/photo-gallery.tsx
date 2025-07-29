"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Camera, X, ZoomIn, Play, Pause } from "lucide-react"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"

export default function PhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const carouselVideoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const modalVideoRef = useRef<HTMLVideoElement>(null)

  const media = [
    {
      src: "/tao-garden.jpg",
      type: "image",
      alt: "Tao dans l'herbe",
      caption: "Dans l'herbe - profil montrant les oreilles et la robe tigrée",
      description:
        "Tao dans son environnement extérieur. Notez la robe gris tigré sur les côtés et les oreilles distinctives.",
    },
    {
      src: "/tao-video-web.mp4",
      type: "video",
      poster: "/tao-video-thumbnail.png", // Image de preview optimized
      alt: "Tao en mouvement",
      caption: "Vidéo de Tao - comportement et mouvement naturels",
      description:
        "Vidéo montrant Tao en mouvement, permettant de voir son comportement naturel et ses caractéristiques distinctives.",
    },
    {
      src: "/tao-main.jpg",
      type: "image",
      alt: "Tao de face",
      caption: "Vue de face - oreilles recourbées très distinctives",
      description:
        "Photo principale montrant clairement les oreilles recourbées vers l'arrière, caractéristique unique de Tao.",
    },
    {
      src: "/tao-chair.jpg",
      type: "image",
      alt: "Tao sur fauteuil",
      caption: "Sur fauteuil - vue trois-quarts, caractère doux et câlin",
      description: "Tao montrant son côté doux et câlin. Vue parfaite pour identifier ses traits faciaux.",
    },
    {
      src: "/tao-desk.jpg",
      type: "image",
      alt: "Tao sur meuble",
      caption: "Perché sur meuble - côté curieux et joueur",
      description: "Tao perché, montrant son caractère curieux et joueur. Oreilles bien visibles.",
    },
    {
      src: "/tao-box.jpg",
      type: "image",
      alt: "Tao dans boîte",
      caption: "Dans une boîte - aime se cacher dans des espaces confinés",
      description:
        "Tao dans une boîte en carton, illustrant parfaitement qu'il aime se cacher dans des espaces confinés.",
    },
  ]

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      const currentIndex = api.selectedScrollSnap()
      setCurrent(currentIndex + 1)
      
      // Auto-play video when it comes into view
      handleVideoAutoplay(currentIndex)
    })
  }, [api])

  const handleVideoAutoplay = (currentIndex: number) => {
    // Pause all carousel videos first
    carouselVideoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause()
        video.currentTime = 0
      }
    })

    // Play current video if it's a video
    const currentMedia = media[currentIndex]
    if (currentMedia?.type === "video" && carouselVideoRefs.current[currentIndex]) {
      const video = carouselVideoRefs.current[currentIndex]
      if (video) {
        video.play().catch(() => {
          // Autoplay failed (browser policy), that's ok
        })
      }
    }
  }

  const openPhoto = (index: number) => {
    setSelectedPhotoIndex(index)
    setIsDialogOpen(true)
  }

  const closePhoto = () => {
    setIsDialogOpen(false)
    setSelectedPhotoIndex(null)
    // Pause video when closing
    if (modalVideoRef.current) {
      modalVideoRef.current.pause()
      setIsVideoPlaying(false)
    }
  }

  const toggleVideo = () => {
    if (modalVideoRef.current) {
      if (isVideoPlaying) {
        modalVideoRef.current.pause()
      } else {
        modalVideoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const renderMediaItem = (item: typeof media[0], index: number, isModal = false) => {
    if (item.type === "video") {
      return (
        <div className="relative group">
          <video
            ref={isModal ? modalVideoRef : (el) => {
              if (carouselVideoRefs.current) {
                carouselVideoRefs.current[index] = el
              }
            }}
            poster={item.poster}
            className={`w-full ${isModal ? 'h-[70vh] object-cover' : 'aspect-square object-cover'} rounded-2xl ${isModal ? '' : 'border-3 border-orange-300 shadow-lg group-hover:shadow-xl transition-shadow'}`}
            controls={isModal}
            preload="metadata"
            playsInline
            webkit-playsinline="true"
            muted={!isModal}
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
          >
            <source src={item.src} type="video/mp4" />
            <source src={item.src} type="video/quicktime" />
            Votre navigateur ne supporte pas les vidéos.
          </video>
          {!isModal && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-2xl transition-all flex items-center justify-center">
              <div className="bg-orange-600 rounded-full p-3 opacity-80 group-hover:opacity-100 transition-opacity">
                <Play className="w-6 h-6 text-white fill-current" />
              </div>
            </div>
          )}
        </div>
      )
    } else {
      return (
        <div className="relative group">
          <Image
            src={item.src}
            alt={item.alt}
            width={isModal ? 800 : 320}
            height={isModal ? 600 : 320}
            className={`w-full object-cover rounded-2xl ${isModal ? 'max-h-[70vh] object-contain' : 'aspect-square border-3 border-orange-300 shadow-lg group-hover:shadow-xl transition-shadow'}`}
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-2xl transition-all flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      )
    }
  }


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
          {/* Carousel principal */}
          <div className="mb-6">
            <Carousel 
              setApi={setApi} 
              className="w-full max-w-sm mx-auto"
              opts={{
                align: "center",
                loop: true
              }}
            >
              <CarouselContent>
                {media.map((item, index) => (
                  <CarouselItem key={`main-${item.src}`}>
                    <div className="cursor-pointer" onClick={() => openPhoto(index)}>
                      {renderMediaItem(item, index, false)}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-6 md:-left-8 bg-white/80 hover:bg-white border-orange-200 h-10 w-10" />
              <CarouselNext className="-right-6 md:-right-8 bg-white/80 hover:bg-white border-orange-200 h-10 w-10" />
            </Carousel>
            
            {/* Photo counter */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 font-semibold">
                Photo {current} sur {count} - <span className="hidden sm:inline">Cliquez pour agrandir</span><span className="sm:hidden">Touchez pour agrandir</span> !
              </p>
              <p className="text-xs text-gray-500 mt-1">
                <span className="hidden sm:inline">Utilisez les flèches ou glissez</span><span className="sm:hidden">Glissez</span> pour naviguer
              </p>
            </div>
          </div>

          {/* Thumbnails carousel */}
          <div className="mt-4">
            <Carousel 
              className="w-full max-w-md mx-auto"
              opts={{
                align: "start",
                dragFree: true
              }}
            >
              <CarouselContent className="-ml-2">
                {media.map((item, index) => (
                  <CarouselItem key={`thumb-${item.src}`} className="pl-2 basis-1/3 md:basis-1/4">
                    <div className="text-center">
                      <div className="relative group cursor-pointer" onClick={() => openPhoto(index)}>
                        {item.type === "video" ? (
                          <div className="relative">
                            <Image
                              src={item.poster || "/tao-main.jpg"}
                              alt={item.alt}
                              width={100}
                              height={100}
                              className="w-full aspect-square object-cover rounded-xl border-2 border-orange-200 shadow-md group-hover:shadow-lg transition-shadow"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
                              <div className="bg-orange-600 rounded-full p-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                <Play className="w-3 h-3 text-white fill-current" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Image
                              src={item.src}
                              alt={item.alt}
                              width={100}
                              height={100}
                              className="w-full aspect-square object-cover rounded-xl border-2 border-orange-200 shadow-md group-hover:shadow-lg transition-shadow"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
                              <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1 font-medium leading-tight truncate">{item.caption}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
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

      {/* Photo Zoom Dialog avec Carousel */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-none">
          <DialogTitle className="sr-only">
            {selectedPhotoIndex !== null && media[selectedPhotoIndex] ? 
              `${media[selectedPhotoIndex].type === "video" ? "Vidéo" : "Photo"} - ${media[selectedPhotoIndex].caption}` : 
              "Aperçu média"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {selectedPhotoIndex !== null && media[selectedPhotoIndex] ? 
              media[selectedPhotoIndex].description : 
              "Visualisation des médias pour identifier Tao"}
          </DialogDescription>
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

            {/* Carousel pour les photos en grand */}
            <Carousel 
              className="w-full" 
              opts={{ 
                startIndex: selectedPhotoIndex || 0,
                loop: true,
                dragFree: false
              }}
            >
              <CarouselContent>
                {media.map((item, index) => (
                  <CarouselItem key={`modal-${item.src}`}>
                    <div className="flex flex-col">
                      <div className="relative">
                        {renderMediaItem(item, index, true)}
                      </div>

                      {/* Media info */}
                      <div className="bg-white p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {item.type === "video" && (
                            <span className="inline-flex items-center mr-2 text-orange-600">
                              <Play className="w-5 h-5 mr-1" />
                              Vidéo
                            </span>
                          )}
                          {item.caption}
                        </h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>

                        {/* Media counter */}
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            {item.type === "video" ? "Vidéo" : "Photo"} {index + 1} sur {media.length}
                          </span>
                          <div className="flex gap-2">
                            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                              Glissez ou utilisez les flèches pour naviguer
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/30 text-white border-white/20" />
              <CarouselNext className="right-4 bg-white/20 hover:bg-white/30 text-white border-white/20" />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
