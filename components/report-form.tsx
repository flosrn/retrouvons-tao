"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UploadDropzone } from "@/lib/uploadthing"
import { Camera, CheckCircle, MapPin, MessageCircle, Phone, Send, User, Upload } from "lucide-react"
import type React from "react"
import { useState, useCallback, memo } from "react"

// Success message component - memoized for performance
const SuccessMessage = memo(() => (
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
));

SuccessMessage.displayName = 'SuccessMessage';

// Photo upload component - memoized for performance
const PhotoUploadSection = memo(({ formData, setFormData }: {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const handlePhotoUpload = useCallback((res: any) => {
    if (res && res[0]) {
      setFormData((prev: any) => ({ 
        ...prev, 
        photoUrl: res[0].key ? `https://utfs.io/f/${res[0].key}` : res[0].url,
        photoName: res[0].name || 'photo.jpg'
      }))
      console.log('Photo uploaded successfully:', res[0]);
    }
  }, [setFormData]);

  const handleUploadError = useCallback((error: Error) => {
    console.error('Upload error details:', error);
    
    let errorMessage = error.message;
    
    // Handle specific UploadThing errors
    if (errorMessage.includes('Invalid token')) {
      errorMessage = 'Erreur de configuration du service d\'upload. Veuillez réessayer ou nous contacter directement.';
    } else if (errorMessage.includes('Network')) {
      errorMessage = 'Problème de connexion. Vérifiez votre connexion internet et réessayez.';
    } else if (errorMessage.includes('Something went wrong')) {
      errorMessage = 'Erreur du service d\'upload. Veuillez réessayer dans quelques instants.';
    }
    
    alert(`Erreur lors de l'upload: ${errorMessage}`);
  }, []);

  const clearPhoto = useCallback(() => {
    setFormData((prev: any) => ({ ...prev, photoUrl: "", photoName: "" }));
  }, [setFormData]);

  if (formData.photoUrl) {
    return (
      <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            <div>
              <p className="text-green-700 font-medium">Photo uploadée avec succès !</p>
              <p className="text-sm text-green-600">{formData.photoName}</p>
            </div>
          </div>
          <img 
            src={formData.photoUrl} 
            alt="Photo uploadée" 
            className="w-16 h-16 object-cover rounded-lg"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2 text-orange-600 border-orange-300 hover:bg-orange-50"
          onClick={clearPhoto}
        >
          Changer la photo
        </Button>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 bg-orange-50 text-center">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={handlePhotoUpload}
        onUploadError={handleUploadError}
        onUploadBegin={() => {
          console.log('Upload started');
        }}
        appearance={{
          container: "w-full h-auto border-0 bg-transparent p-0",
          uploadIcon: "text-orange-500 mb-2",
          label: "text-gray-700 font-medium text-base mb-1",
          allowedContent: "text-gray-500 text-sm mb-4",
          button: "!bg-orange-600 !text-white !rounded-lg !px-6 !py-3 !font-semibold !text-lg !border-0 hover:!bg-orange-700 !transition-all !duration-200 !cursor-pointer !shadow-md hover:!shadow-lg active:!scale-95 !min-h-[50px] !w-auto !inline-flex !items-center !justify-center"
        }}
        content={{
          uploadIcon: () => <Camera className="w-12 h-12" />,
          label: () => <span>Uploadez une photo du chat</span>,
          allowedContent: () => <span>Photo obligatoire pour valider le signalement</span>,
          button: ({ ready, isUploading }) => {
            if (isUploading) return "Upload en cours...";
            if (ready) return "Choisir une photo";
            return "Préparation...";
          }
        }}
      />
    </div>
  );
});

PhotoUploadSection.displayName = 'PhotoUploadSection';

function ReportForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    photoUrl: "",
    photoName: "",
    location: "",
    name: "",
    contact: "",
    message: "",
  })

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate that photo is uploaded
    if (!formData.photoUrl) {
      alert('Veuillez d\'abord uploader une photo avant de soumettre le formulaire.')
      return
    }

    try {
      // Submit to API with JSON data
      const response = await fetch('/api/sightings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.contact,
          location: formData.location,
          message: formData.message,
          photoUrl: formData.photoUrl,
          photoName: formData.photoName,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi du signalement')
      }

      console.log("Signalement envoyé avec succès:", result)
      setIsSubmitted(true)
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      alert(`Erreur lors de l'envoi du signalement: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
    }
  }, [formData])

  // Form field change handlers - memoized for performance
  const handleLocationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, location: e.target.value }));
  }, []);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  }, []);

  const handleContactChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, contact: e.target.value }));
  }, []);

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, message: e.target.value }));
  }, []);

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Upload Photo */}
      <div>
        <Label className="text-base font-semibold text-gray-700 mb-2 block text-left">
          <Camera className="w-5 h-5 inline mr-2 text-orange-600 " />
          Photo du chat vu <span className="text-red-500">*</span>
        </Label>
        <PhotoUploadSection formData={formData} setFormData={setFormData} />
      </div>

      {/* Localisation */}
      <div>
        <Label htmlFor="location" className="text-base font-semibold text-gray-700 mb-2 block text-left">
          <MapPin className="w-5 h-5 inline mr-2 text-orange-600" />
          Où l'avez-vous vu ? <span className="text-red-500">*</span>
        </Label>
        <Input
          id="location"
          type="text"
          placeholder="Ex: chemin des Clautasses"
          value={formData.location}
          onChange={handleLocationChange}
          className="text-sm py-3"
          required
        />
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-base font-semibold text-gray-700 mb-2 block text-left">
            <User className="w-5 h-5 inline mr-2 text-orange-600" />
            Votre nom <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Prénom Nom"
            value={formData.name}
            onChange={handleNameChange}
            className="text-sm py-3"
            required
          />
        </div>

        <div>
          <Label htmlFor="contact" className="text-base font-semibold text-gray-700 mb-2 block text-left">
            <Phone className="w-5 h-5 inline mr-2 text-orange-600" />
            Téléphone <span className="text-red-500">*</span>
          </Label>
          <Input
            id="contact"
            type="tel"
            placeholder="06 12 34 56 78"
            value={formData.contact}
            onChange={handleContactChange}
            className="text-sm py-3"
            required
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message" className="text-base font-semibold text-gray-700 mb-2 block text-left">
          <MessageCircle className="w-5 h-5 inline mr-2 text-orange-600" />
          Détails utiles
        </Label>
        <Textarea
          id="message"
          placeholder="Racontez ce que vous avez vu : comportement du chat, heure, circonstances..."
          value={formData.message}
          onChange={handleMessageChange}
          className="text-sm min-h-[100px]"
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

export default memo(ReportForm);
