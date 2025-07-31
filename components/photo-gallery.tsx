"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Play } from "lucide-react";
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

// Memoized media configuration to prevent re-creation on each render
const mediaConfig = [
  {
    src: "/tao-garden.jpg",
    type: "image" as const,
    alt: "Tao dans l'herbe",
    caption: "Dans l'herbe - profil montrant les oreilles et la robe tigrée",
    description:
      "Tao dans son environnement extérieur. Notez la robe gris tigré sur les côtés et les oreilles distinctives.",
  },

  {
    src: "/tao-profile.jpg",
    type: "image" as const,
    alt: "Tao de profil",
    caption: "Vue de profil - caractéristiques distinctives",
    description:
      "Vue de profil de Tao montrant ses caractéristiques uniques et son expression.",
  },
  {
    src: "/tao-chair.jpg",
    type: "image" as const,
    alt: "Tao sur fauteuil",
    caption: "Sur fauteuil - vue trois-quarts, caractère doux et câlin",
    description:
      "Tao montrant son côté doux et câlin. Vue parfaite pour identifier ses traits faciaux.",
  },
  {
    src: "/tao-desk.jpg",
    type: "image" as const,
    alt: "Tao sur meuble",
    caption: "Perché sur meuble - côté curieux et joueur",
    description:
      "Tao perché, montrant son caractère curieux et joueur. Oreilles bien visibles.",
  },
  {
    src: "/tao-box.jpg",
    type: "image" as const,
    alt: "Tao dans boîte",
    caption: "Dans une boîte - aime se cacher dans des espaces confinés",
    description:
      "Tao dans une boîte en carton, illustrant parfaitement qu'il aime se cacher dans des espaces confinés.",
  },
  {
    src: "/tao-main.jpg",
    type: "image" as const,
    alt: "Tao de face",
    caption: "Vue de face - oreilles recourbées très distinctives",
    description:
      "Photo principale montrant clairement les oreilles recourbées vers l'arrière, caractéristique unique de Tao.",
  },
  {
    src: "/tao-video-web.mp4",
    type: "video" as const,
    poster: "/tao-video-thumbnail.png",
    alt: "Tao en mouvement",
    caption: "Comportement et mouvement naturels",
    description:
      "Vidéo montrant Tao en mouvement, permettant de voir son comportement naturel et ses caractéristiques distinctives.",
  },
];

// Memoized video component for performance
const VideoComponent = memo(
  ({
    item,
    isModal,
    onPlay,
    onPause,
    videoRef,
  }: {
    item: (typeof mediaConfig)[0];
    isModal: boolean;
    onPlay: () => void;
    onPause: () => void;
    videoRef: (el: HTMLVideoElement | null) => void;
  }) => (
    <video
      ref={videoRef}
      src={item.src}
      poster={item.poster}
      className={`${
        isModal
          ? "max-w-full max-h-full w-auto h-auto object-contain shadow-xl rounded-lg"
          : "w-full aspect-square object-cover rounded-xl border-2 border-orange-200"
      }`}
      controls={false}
      preload="metadata"
      playsInline
      webkit-playsinline="true"
      muted
      onPlay={onPlay}
      onPause={onPause}
    >
      <source src={item.src} type="video/mp4" />
      <source src={item.src} type="video/quicktime" />
      Votre navigateur ne supporte pas les vidéos.
    </video>
  )
);

VideoComponent.displayName = "VideoComponent";

// Memoized image component for performance
const ImageComponent = memo(
  ({
    item,
    index,
    isModal,
  }: {
    item: (typeof mediaConfig)[0];
    index: number;
    isModal: boolean;
  }) => {
    return (
      <Image
        src={item.src}
        alt={item.alt}
        width={isModal ? 800 : 320}
        height={isModal ? 600 : 320}
        className={`${
          isModal
            ? "max-w-full max-h-full w-auto h-auto object-contain shadow-xl rounded-lg"
            : "w-full aspect-square object-cover rounded-xl border-2 border-orange-200"
        }`}
        priority={isModal || index === 0}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }
);

ImageComponent.displayName = "ImageComponent";

// Memoized thumbnail component for performance
const ThumbnailComponent = memo(
  ({
    item,
    index,
    onOpen,
    isSelected = false,
  }: {
    item: (typeof mediaConfig)[0];
    index: number;
    onOpen: (index: number) => void;
    isSelected?: boolean;
  }) => {
    const handleClick = useCallback(() => onOpen(index), [index, onOpen]);

    return (
      <CarouselItem
        key={`thumb-${item.src}`}
        className="pl-2 basis-1/3 md:basis-1/4"
      >
        <div className="text-center p-2">
          <div
            className={`relative group cursor-pointer transition-all duration-200 ${
              isSelected 
                ? "ring-2 ring-orange-500 ring-offset-2 rounded-lg scale-105" 
                : "hover:scale-105"
            }`}
            onClick={handleClick}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            tabIndex={0}
            role="button"
            aria-label={`Sélectionner ${
              item.type === "video" ? "la vidéo" : "la photo"
            } : ${item.caption}`}
          >
            {item.type === "video" ? (
              <div className="relative">
                <Image
                  src={item.poster || "/tao-main.jpg"}
                  alt={item.alt}
                  width={100}
                  height={100}
                  className="w-full aspect-square object-cover rounded-lg border border-gray-200"
                  loading="lazy"
                />
                <div className="absolute bottom-1 right-1">
                  <div className="bg-orange-600 rounded-full p-1">
                    <Play className="w-3 h-3 text-white fill-current" />
                  </div>
                </div>
              </div>
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                width={100}
                height={100}
                className="w-full aspect-square object-cover rounded-lg border border-gray-200"
                loading="lazy"
              />
            )}
          </div>
          <p className="text-xs text-gray-600 mt-1 font-medium leading-tight truncate">
            {item.caption}
          </p>
        </div>
      </CarouselItem>
    );
  }
);

ThumbnailComponent.displayName = "ThumbnailComponent";

function PhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const carouselVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const modalVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [modalApi, setModalApi] = useState<CarouselApi>();
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0);
  
  // API pour le carousel de thumbnails
  const [thumbApi, setThumbApi] = useState<CarouselApi>();

  // Use stable reference to media config
  const media = useMemo(() => mediaConfig, []);

  // Memoized callbacks for video autoplay
  const handleVideoAutoplay = useCallback(
    (currentIndex: number) => {
      // Pause all carousel videos first
      carouselVideoRefs.current.forEach((video, index) => {
        if (video && index !== currentIndex) {
          video.pause();
          video.currentTime = 0;
        }
      });

      // Play current video if it's a video
      const currentMedia = media[currentIndex];

      if (
        currentMedia?.type === "video" &&
        carouselVideoRefs.current[currentIndex]
      ) {
        const video = carouselVideoRefs.current[currentIndex];

        if (video) {
          // Wait for video to be ready
          const attemptPlay = () => {
            if (video.readyState >= 3) {
              // HAVE_FUTURE_DATA or better
              // Only attempt autoplay if user has interacted or video is muted
              if (hasUserInteracted || video.muted) {
                video.play().catch(() => {
                  // Autoplay failed (browser policy), that's ok
                });
              }
            } else {
              // Wait a bit more for video to load
              setTimeout(attemptPlay, 100);
            }
          };

          // Reset video to start and attempt autoplay
          video.currentTime = 0;
          attemptPlay();
        }
      }
    },
    [hasUserInteracted, media]
  );

  const handleModalVideoAutoplay = useCallback(
    (currentIndex: number) => {
      // Pause all modal videos first
      modalVideoRefs.current.forEach((video, index) => {
        if (video && index !== currentIndex) {
          video.pause();
          video.currentTime = 0;
        }
      });

      // Play current video if it's a video
      const currentMedia = media[currentIndex];

      if (
        currentMedia?.type === "video" &&
        modalVideoRefs.current[currentIndex]
      ) {
        const video = modalVideoRefs.current[currentIndex];

        if (video) {
          // Wait for video to be ready
          const attemptPlay = () => {
            if (video.readyState >= 3) {
              // HAVE_FUTURE_DATA or better
              // Only attempt autoplay if user has interacted or video is muted
              if (hasUserInteracted || video.muted) {
                video.play().catch(() => {
                  // Autoplay failed (browser policy), that's ok
                });
              }
            } else {
              // Wait a bit more for video to load
              setTimeout(attemptPlay, 100);
            }
          };

          // Reset video to start and attempt autoplay
          video.currentTime = 0;
          attemptPlay();
        }
      }
    },
    [hasUserInteracted, media]
  );

  const openPhoto = useCallback(
    (index: number) => {
      setSelectedPhotoIndex(index);
      setIsDialogOpen(true);

      // Auto-trigger video autoplay when modal opens on video slide
      if (media[index]?.type === "video") {
        // Give more time for modal and carousel to fully render
        setTimeout(() => {
          handleModalVideoAutoplay(index);
        }, 500);
      }
    },
    [media, handleModalVideoAutoplay]
  );

  // Fonction pour changer la photo depuis les thumbnails (sans ouvrir le dialog)
  const handleThumbnailClick = useCallback(
    (index: number) => {
      // Synchroniser le carousel principal
      if (api) {
        api.scrollTo(index);
      }
      // Centrer le thumbnail sélectionné
      if (thumbApi) {
        thumbApi.scrollTo(index);
      }
    },
    [api, thumbApi]
  );


  const renderMediaItem = useCallback(
    (item: (typeof media)[0], index: number, isModal = false) => {
      if (item.type === "video") {
        return (
          <VideoComponent
            item={item}
            isModal={isModal}
            onPlay={() => {}}
            onPause={() => {}}
            videoRef={
              isModal
                ? (el) => {
                    if (modalVideoRefs.current) {
                      modalVideoRefs.current[index] = el;
                    }
                  }
                : (el) => {
                    if (carouselVideoRefs.current) {
                      carouselVideoRefs.current[index] = el;
                    }
                  }
            }
          />
        );
      } else {
        return <ImageComponent item={item} index={index} isModal={isModal} />;
      }
    },
    [media]
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      const currentIndex = api.selectedScrollSnap();
      setCurrent(currentIndex + 1);

      // Centrer le thumbnail sélectionné dans le carousel
      if (thumbApi) {
        thumbApi.scrollTo(currentIndex);
      }

      // Auto-play video when it comes into view
      handleVideoAutoplay(currentIndex);
    });

    // Enable autoplay after first user interaction
    const enableAutoplay = () => {
      setHasUserInteracted(true);
    };

    document.addEventListener("click", enableAutoplay, { once: true });
    document.addEventListener("touchstart", enableAutoplay, { once: true });

    // Cleanup
    return () => {
      document.removeEventListener("click", enableAutoplay);
      document.removeEventListener("touchstart", enableAutoplay);
    };
  }, [api, thumbApi, handleVideoAutoplay]);

  // Modal carousel state and autoplay
  useEffect(() => {
    if (!modalApi) {
      return;
    }

    setModalCurrentIndex(modalApi.selectedScrollSnap());

    modalApi.on("select", () => {
      const currentIndex = modalApi.selectedScrollSnap();
      setModalCurrentIndex(currentIndex);
      handleModalVideoAutoplay(currentIndex);
    });

    // Auto-play video when modal opens on a video
    const initialIndex = selectedPhotoIndex || 0;
    setModalCurrentIndex(initialIndex);
    handleModalVideoAutoplay(initialIndex);

    return () => {
      modalApi.off("select", () => {});
    };
  }, [modalApi, selectedPhotoIndex, handleModalVideoAutoplay]);

  return (
    <>
      <Card className="mb-8 bg-white border-gray-200">
        <CardHeader className="text-center pb-4 relative overflow-hidden">
          <CardTitle className="text-xl font-semibold text-gray-800">
            <Eye className="w-5 h-5 inline mr-2 text-orange-600" />
            Reconnaître Tao
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Enhanced Carousel with empathy design */}
          <div className="relative">
            <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-4">
              <Carousel
                setApi={setApi}
                className="w-full max-w-sm mx-auto"
                opts={{
                  align: "center",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {media.map((item, index) => (
                    <CarouselItem key={`main-${item.src}`} className="group">
                      <div
                        className="cursor-pointer relative"
                        onClick={() => openPhoto(index)}
                        onKeyDown={(e) => e.key === "Enter" && openPhoto(index)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Ouvrir ${
                          item.type === "video" ? "la vidéo" : "la photo"
                        } en plein écran : ${item.caption}`}
                      >
                        <div className="relative">
                          {renderMediaItem(item, index, false)}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="-left-4 rounded-full bg-orange-500 text-white border-0 h-10 w-10" />
                <CarouselNext className="-right-4 rounded-full bg-orange-500 text-white border-0 h-10 w-10" />
              </Carousel>
            </div>

            {/* Enhanced photo counter with progress */}
            <div className="text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mx-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-2xl">📸</span>
                  <div className="flex flex-col">
                    <p className="text-base font-bold text-gray-800">
                      Photo {current} sur {count}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      <span className="hidden sm:inline">
                        👆 Cliquez pour agrandir
                      </span>
                      <span className="sm:hidden">
                        👆 Touchez pour agrandir
                      </span>
                    </p>
                  </div>
                  <span className="text-2xl">🔍</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-300 shadow-sm"
                    style={{ width: `${(current / count) * 100}%` }}
                  ></div>
                </div>

                <p className="text-xs text-gray-500">
                  <span className="hidden sm:inline">
                    ⌨️ Utilisez les flèches ou glissez
                  </span>
                  <span className="sm:hidden">👈👉 Glissez</span> pour naviguer
                </p>
              </div>
            </div>
          </div>

          {/* Thumbnails carousel */}
          <div className="mt-4">
            <Carousel
              setApi={setThumbApi}
              className="w-full max-w-md mx-auto"
              opts={{
                align: "center",
                dragFree: true,
                containScroll: "trimSnaps",
              }}
            >
              <CarouselContent className="-ml-2">
                {media.map((item, index) => (
                  <ThumbnailComponent
                    key={`thumb-${item.src}`}
                    item={item}
                    index={index}
                    onOpen={handleThumbnailClick}
                    isSelected={current - 1 === index}
                  />
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Enhanced distinctive signs section */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="text-center mb-6">
              <h4 className="font-semibold text-lg text-gray-800 mb-2">
                Signes distinctifs de Tao
              </h4>
              <p className="text-purple-700 font-semibold text-sm bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
                ✨ Mémorisez ces caractéristiques uniques pour l'identifier ✨
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3 border border-gray-200 text-left">
                <div className="flex gap-2 mb-2">
                  <span className="font-black text-base text-gray-800">
                    Oreilles :
                  </span>
                </div>
                <span className="text-orange-700 leading-relaxed">
                  Très particulières,{" "}
                  <strong className="text-red-600">
                    recourbées vers l'arrière
                  </strong>
                  <br />
                  <span className="text-purple-600 font-bold">
                    (signe le PLUS distinctif !)
                  </span>
                </span>
              </div>

              <div className="bg-white rounded-lg p-3 border border-gray-200 text-left">
                <div className="flex gap-2 mb-2">
                  <span className="font-black text-base text-gray-800">
                    Robe :
                  </span>
                </div>
                <span className="leading-relaxed">
                  <strong className="text-gray-600">Gris tigré</strong> sur les
                  côtés
                  <br />
                  <strong className="text-gray-600">Tacheté</strong> sur le
                  dessus
                </span>
              </div>

              <div className="bg-white rounded-lg p-3 border border-gray-200 text-left">
                <div className="flex gap-2 mb-2">
                  <span className="font-black text-base text-gray-800">
                    Caractère :
                  </span>
                </div>
                <span className="leading-relaxed">
                  Doux, câlin, curieux, joueur
                  <br />
                  <span className="text-sm text-gray-600">
                    Un amour de chat ! 🥰
                  </span>
                </span>
              </div>

              <div className="bg-white rounded-lg p-3 border border-gray-200 text-left">
                <div className="flex gap-2 mb-2">
                  <span className="font-black text-base text-gray-800">
                    Comportement :
                  </span>
                </div>
                <span className="leading-relaxed">
                  Craintif avec les inconnus
                  <br />
                  <span className="text-sm text-gray-600">
                    Approchez-vous doucement 🤗
                  </span>
                </span>
              </div>
            </div>

            {/* Enhanced identification badge */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold border border-green-200">
                <span className="text-xl">🔬</span>
                <span>Pucé (pas de collier, pas de tatouage)</span>
                <span className="text-xl">✅</span>
              </div>
              <p className="text-xs text-gray-600 mt-2 font-medium">
                💡 La puce électronique permettra une identification certaine
                chez le vétérinaire
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal avec CSS Grid - Design playful avec arrondis */}
      <Dialog 
        open={isDialogOpen} 
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setSelectedPhotoIndex(null);
            // Pause all modal videos when closing
            modalVideoRefs.current.forEach((video) => {
              if (video) {
                video.pause();
                video.currentTime = 0;
              }
            });
          }
        }}
      >
        <DialogContent className="sm:max-w-4xl w-full max-w-[95vw] h-[90vh] p-0 gap-0 rounded-3xl overflow-hidden shadow-2xl">
          {/* Structure CSS Grid avec hauteurs fixes garanties */}
          <div
            className="h-full grid grid-rows-[auto_1fr_auto] bg-white"
            style={{
              gridTemplateRows: "120px 1fr 80px", // Hauteurs fixes GARANTIES
            }}
          >
            {/* Header - hauteur fixe 120px avec arrondis supérieurs */}
            <div className="p-6 pb-4 bg-gradient-to-b from-white to-gray-50 overflow-hidden rounded-t-3xl">
              <DialogTitle className="text-lg font-semibold mb-1 line-clamp-1 text-gray-800">
                {modalCurrentIndex < media.length
                  ? `${
                      media[modalCurrentIndex].type === "video"
                        ? "Vidéo"
                        : "Photo"
                    } - ${media[modalCurrentIndex].caption}`
                  : "Aperçu média"}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 line-clamp-2">
                {modalCurrentIndex < media.length
                  ? media[modalCurrentIndex].description
                  : "Visualisation des médias pour identifier Tao"}
              </DialogDescription>
            </div>

            {/* Zone média - avec arrondis intérieurs playful et overflow contrôlé */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden m-4 rounded-2xl">
              {/* Container avec arrondis garantis pour les médias */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Carousel
                  setApi={setModalApi}
                  className="w-full h-full flex items-center justify-center rounded-2xl"
                  opts={{
                    startIndex: selectedPhotoIndex || 0,
                    loop: true,
                  }}
                >
                  <CarouselContent className="h-full">
                    {media.map((item, index) => (
                      <CarouselItem
                        key={`modal-${item.src}-${index}`}
                        className="h-full flex items-center justify-center w-full"
                      >
                        <div className="w-full h-full flex items-center justify-center p-2">
                          {renderMediaItem(item, index, true)}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Navigation avec boutons arrondis playful - style uniforme */}
                  <CarouselPrevious className="left-4 rounded-full bg-white border-0 shadow" />
                  <CarouselNext className="right-4 rounded-full bg-white border-0 shadow" />
                </Carousel>
              </div>
            </div>

            {/* Footer - hauteur fixe avec arrondis inférieurs */}
            <div className="p-4 bg-gradient-to-t from-white to-gray-50 flex items-center justify-center rounded-b-3xl">
              <div className="text-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-2xl">
                <p className="text-lg font-medium text-gray-800">
                  {media[modalCurrentIndex]?.type === "video" ? "📹" : "📸"}{" "}
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
  );
}

export default memo(PhotoGallery);
