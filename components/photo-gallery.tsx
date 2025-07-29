"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Camera, Play, X, ZoomIn } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function PhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const carouselVideoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const modalVideoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [modalApi, setModalApi] = useState<CarouselApi>()
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0)
  const [modalCount, setModalCount] = useState(0)

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

    // Enable autoplay after first user interaction
    const enableAutoplay = () => {
      setHasUserInteracted(true)
    }
    
    document.addEventListener('click', enableAutoplay, { once: true })
    document.addEventListener('touchstart', enableAutoplay, { once: true })
    
    // Cleanup
    return () => {
      document.removeEventListener('click', enableAutoplay)
      document.removeEventListener('touchstart', enableAutoplay)
    }
  }, [api])

  // Modal carousel state and autoplay
  useEffect(() => {
    if (!modalApi) {
      return
    }

    setModalCount(modalApi.scrollSnapList().length)
    setModalCurrentIndex(modalApi.selectedScrollSnap())

    modalApi.on("select", () => {
      const currentIndex = modalApi.selectedScrollSnap()
      setModalCurrentIndex(currentIndex)
      handleModalVideoAutoplay(currentIndex)
    })

    // Auto-play video when modal opens on a video
    const initialIndex = selectedPhotoIndex || 0
    setModalCurrentIndex(initialIndex)
    handleModalVideoAutoplay(initialIndex)
    
    return () => {
      modalApi.off("select")
    }
  }, [modalApi, selectedPhotoIndex])

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
        // Wait for video to be ready
        const attemptPlay = () => {
          if (video.readyState >= 3) { // HAVE_FUTURE_DATA or better
            // Only attempt autoplay if user has interacted or video is muted
            if (hasUserInteracted || video.muted) {
              video.play().catch(() => {
                // Autoplay failed (browser policy), that's ok
              })
            }
          } else {
            // Wait a bit more for video to load
            setTimeout(attemptPlay, 100)
          }
        }
        
        // Reset video to start and attempt autoplay
        video.currentTime = 0
        attemptPlay()
      }
    }
  }

  const handleModalVideoAutoplay = (currentIndex: number) => {
    // Pause all modal videos first
    modalVideoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause()
        video.currentTime = 0
      }
    })

    // Play current video if it's a video
    const currentMedia = media[currentIndex]
    
    if (currentMedia?.type === "video" && modalVideoRefs.current[currentIndex]) {
      const video = modalVideoRefs.current[currentIndex]
      
      if (video) {
        // Wait for video to be ready
        const attemptPlay = () => {
          if (video.readyState >= 3) { // HAVE_FUTURE_DATA or better
            // Only attempt autoplay if user has interacted or video is muted
            if (hasUserInteracted || video.muted) {
              video.play().catch(() => {
                // Autoplay failed (browser policy), that's ok
              })
            }
          } else {
            // Wait a bit more for video to load
            setTimeout(attemptPlay, 100)
          }
        }
        
        // Reset video to start and attempt autoplay
        video.currentTime = 0
        attemptPlay()
      }
    }
  }

  const openPhoto = (index: number) => {
    setSelectedPhotoIndex(index)
    setIsDialogOpen(true)
    
    // Auto-trigger video autoplay when modal opens on video slide
    if (media[index]?.type === "video") {
      // Give more time for modal and carousel to fully render
      setTimeout(() => {
        handleModalVideoAutoplay(index)
      }, 500)
    }
  }

  const closePhoto = () => {
    setIsDialogOpen(false)
    setSelectedPhotoIndex(null)
    // Pause all modal videos when closing
    modalVideoRefs.current.forEach((video) => {
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    })
    setIsVideoPlaying(false)
  }


  const renderMediaItem = (item: typeof media[0], index: number, isModal = false) => {
    if (item.type === "video") {
      return (
        <div className="relative group w-full h-full">
          <video
            ref={isModal ? (el) => {
              if (modalVideoRefs.current) {
                modalVideoRefs.current[index] = el
              }
            } : (el) => {
              if (carouselVideoRefs.current) {
                carouselVideoRefs.current[index] = el
              }
            }}
            src={item.src}
            poster={item.poster}
            className={`${
              isModal 
                ? 'w-full h-full object-contain shadow-xl' 
                : 'w-full aspect-square object-cover rounded-3xl border-3 border-orange-300 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105'
            }`}
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
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-3xl transition-all duration-300 flex items-center justify-center">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200 shadow-lg">
                <Play className="w-6 h-6 text-white fill-current" />
              </div>
            </div>
          )}
        </div>
      )
    } else {
      return (
        <div className="relative group w-full h-full">
          <Image
            src={item.src}
            alt={item.alt}
            width={isModal ? 800 : 320}
            height={isModal ? 600 : 320}
            className={`${
              isModal 
                ? 'w-full h-full object-contain shadow-xl' 
                : 'w-full aspect-square object-cover rounded-3xl border-3 border-orange-300 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105'
            }`}
            priority={isModal || index === 0}
          />
          {!isModal && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-3xl transition-all duration-300 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200 shadow-lg">
                <ZoomIn className="w-8 h-8 text-gray-700" />
              </div>
            </div>
          )}
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
                    <div 
                      className="cursor-pointer" 
                      onClick={() => openPhoto(index)}
                      onKeyDown={(e) => e.key === 'Enter' && openPhoto(index)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Ouvrir ${item.type === 'video' ? 'la vidéo' : 'la photo'} : ${item.caption}`}
                    >
                      {renderMediaItem(item, index, false)}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-6 md:-left-8 rounded-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 h-10 w-10" />
              <CarouselNext className="-right-6 md:-right-8 rounded-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 h-10 w-10" />
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
                      <div 
                        className="relative group cursor-pointer" 
                        onClick={() => openPhoto(index)}
                        onKeyDown={(e) => e.key === 'Enter' && openPhoto(index)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Ouvrir ${item.type === 'video' ? 'la vidéo' : 'la photo'} : ${item.caption}`}
                      >
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

      {/* Modal avec CSS Grid - Design playful avec arrondis */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-4xl w-full max-w-[95vw] h-[90vh] p-0 gap-0 rounded-3xl overflow-hidden shadow-2xl">
          {/* Structure CSS Grid avec hauteurs fixes garanties */}
          <div 
            className="h-full grid grid-rows-[auto_1fr_auto] bg-white"
            style={{ 
              gridTemplateRows: '120px 1fr 80px' // Hauteurs fixes GARANTIES
            }}
          >
            {/* Header - hauteur fixe 120px avec arrondis supérieurs */}
            <div className="p-6 pb-4 bg-gradient-to-b from-white to-gray-50 overflow-hidden rounded-t-3xl">
              <DialogTitle className="text-lg font-semibold mb-1 line-clamp-1 text-gray-800">
                {modalCurrentIndex < media.length ? 
                  `${media[modalCurrentIndex].type === "video" ? "Vidéo" : "Photo"} - ${media[modalCurrentIndex].caption}` : 
                  "Aperçu média"}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 line-clamp-2">
                {modalCurrentIndex < media.length ? 
                  media[modalCurrentIndex].description : 
                  "Visualisation des médias pour identifier Tao"}
              </DialogDescription>
            </div>
            
            {/* Zone média - avec arrondis intérieurs playful et overflow contrôlé */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden m-4 rounded-2xl">
              {/* Container avec arrondis garantis pour les médias */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Carousel 
                  setApi={setModalApi}
                  className="w-full h-full rounded-2xl" 
                  opts={{ 
                    startIndex: selectedPhotoIndex || 0,
                    loop: true
                  }}
                >
                  <CarouselContent className="h-full">
                    {media.map((item, index) => (
                      <CarouselItem key={`modal-${item.src}-${index}`} className="h-full">
                        <div className="h-full flex items-center justify-center p-1">
                          {renderMediaItem(item, index, true)}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  
                  {/* Navigation avec boutons arrondis playful - style uniforme */}
                  <CarouselPrevious className="left-4 rounded-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white hover:scale-110 transition-all duration-200" />
                  <CarouselNext className="right-4 rounded-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white hover:scale-110 transition-all duration-200" />
                </Carousel>
              </div>
            </div>
            
            {/* Footer - hauteur fixe avec arrondis inférieurs */}
            <div className="p-4 bg-gradient-to-t from-white to-gray-50 flex items-center justify-center rounded-b-3xl">
              <div className="text-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-2xl">
                <p className="text-lg font-medium text-gray-800">
                  {media[modalCurrentIndex]?.type === "video" ? "📹" : "📸"} 
                  {modalCurrentIndex + 1} sur {media.length}
                </p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                  {media[modalCurrentIndex]?.caption}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
