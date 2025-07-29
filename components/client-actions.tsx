"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Share2 } from "lucide-react"

interface ClientActionsProps {
  phoneNumber: string
  shareText: string
}

export default function ClientActions({ phoneNumber, shareText }: ClientActionsProps) {
  const [shareUrl, setShareUrl] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setShareUrl(window.location.href)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-4">
        {/* Skeleton for phone button */}
        <div className="w-full h-14 bg-gray-200 animate-pulse rounded-xl" />
        {/* Skeleton for share button */}
        <div className="w-full h-10 bg-gray-200 animate-pulse rounded" />
      </div>
    )
  }

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
    <div className="space-y-4">
      <Button
        onClick={handleCall}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-xl font-bold rounded-xl shadow-lg"
        size="lg"
      >
        <Phone className="w-6 h-6 mr-3" />
        {phoneNumber}
      </Button>

      <Button
        onClick={handleShare}
        variant="outline"
        className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Partager ce site
      </Button>
    </div>
  )
}