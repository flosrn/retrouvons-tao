"use client";

import { Button } from "@/components/ui/button";
import { Phone, Share2 } from "lucide-react";
import { useCallback, useEffect, useState, memo } from "react";

interface ClientActionsProps {
  phoneNumber: string;
  shareText: string;
}

function ClientActions({
  phoneNumber,
  shareText,
}: ClientActionsProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [mounted, setMounted] = useState(false);

  // All hooks must be at the top level - before any conditional returns
  const handleCall = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${phoneNumber.replace(/\s/g, "")}`;
    }
  }, [phoneNumber]);

  const handleShare = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        navigator.share({
          title: "Chat perdu - Tao - Toulouse",
          text: shareText,
          url: shareUrl,
        });
      } else {
        // Fallback pour les navigateurs qui ne supportent pas l'API Share
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
          `${shareText} ${shareUrl}`
        )}`;
        window.open(whatsappUrl, "_blank");
      }
    }
  }, [shareText, shareUrl]);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-4">
        {/* Skeleton for phone button */}
        <div className="w-full h-14 bg-gray-200 animate-pulse rounded-xl" />
        {/* Skeleton for share button */}
        <div className="w-full h-10 bg-gray-200 animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={handleCall}
        className="w-full bg-green-600 text-white py-4 text-xl font-bold hover:bg-green-600 focus:bg-green-600 active:bg-green-700"
        size="lg"
      >
        <Phone className="w-6 h-6 mr-3" />
        {phoneNumber}
      </Button>

      <Button
        onClick={handleShare}
        variant="outline"
        className="w-full border-orange-300 text-orange-600 bg-orange-50 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 focus:bg-orange-50 active:bg-orange-100"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Partager ce site
      </Button>
    </div>
  );
}

export default memo(ClientActions);
