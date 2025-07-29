"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, MapPin, User, Phone, Send, CheckCircle } from "lucide-react"

export default function ReportForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    photo: null as File | null,
    location: "",
    name: "",
    contact: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulation d'envoi (en réalité, vous intégreriez avec votre backend)
    console.log("Signalement envoyé:", formData)

    // Simulation d'un délai d'envoi
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }))
    }
  }

  if (isSubmitted) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Merci pour votre signalement !</h3>
          <p className="text-green-700 mb-4">
            Nous avons bien reçu votre message. Nous vous contacterons rapidement pour vérifier les informations.
          </p>
          <p className="text-sm text-green-600">Si c'est bien Tao, la récompense de 500€ vous sera remise !</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Upload Photo */}
      <div>
        <Label htmlFor="photo" className="text-base font-semibold text-gray-700 mb-2 block">
          <Camera className="w-5 h-5 inline mr-2 text-orange-600" />
          Photo du chat vu <span className="text-red-500">*</span>
        </Label>
        <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center bg-orange-50">
          <input
            type="file"
            id="photo"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoChange}
            className="hidden"
            required
          />
          <label htmlFor="photo" className="cursor-pointer">
            <Camera className="w-12 h-12 text-orange-400 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">
              {formData.photo ? formData.photo.name : "Touchez pour prendre une photo"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Photo obligatoire pour valider le signalement</p>
          </label>
        </div>
      </div>

      {/* Localisation */}
      <div>
        <Label htmlFor="location" className="text-base font-semibold text-gray-700 mb-2 block">
          <MapPin className="w-5 h-5 inline mr-2 text-orange-600" />
          Où l'avez-vous vu ? <span className="text-red-500">*</span>
        </Label>
        <Input
          id="location"
          type="text"
          placeholder="Ex: Rue du Taur, Place du Capitole, Jardin des Plantes..."
          value={formData.location}
          onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
          className="text-base py-3"
          required
        />
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-base font-semibold text-gray-700 mb-2 block">
            <User className="w-5 h-5 inline mr-2 text-orange-600" />
            Votre nom <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Prénom Nom"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="text-base py-3"
            required
          />
        </div>

        <div>
          <Label htmlFor="contact" className="text-base font-semibold text-gray-700 mb-2 block">
            <Phone className="w-5 h-5 inline mr-2 text-orange-600" />
            Téléphone <span className="text-red-500">*</span>
          </Label>
          <Input
            id="contact"
            type="tel"
            placeholder="06 12 34 56 78"
            value={formData.contact}
            onChange={(e) => setFormData((prev) => ({ ...prev, contact: e.target.value }))}
            className="text-base py-3"
            required
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message" className="text-base font-semibold text-gray-700 mb-2 block">
          Détails utiles
        </Label>
        <Textarea
          id="message"
          placeholder="Racontez ce que vous avez vu : comportement du chat, heure, circonstances..."
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
          className="text-base min-h-[100px]"
          rows={4}
        />
      </div>

      {/* RGPD */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Confidentialité :</strong> Vos données ne sont utilisées que pour la recherche de Tao. Aucune revente,
          conformément au RGPD.
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 text-xl font-bold rounded-xl shadow-lg"
        size="lg"
      >
        <Send className="w-6 h-6 mr-3" />
        Je signale une piste
      </Button>
    </form>
  )
}
