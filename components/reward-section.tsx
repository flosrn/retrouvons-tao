import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Euro, CheckCircle, Shield, HelpCircle } from "lucide-react";

export default function RewardSection() {
  return (
    <Card className="mb-8 bg-gradient-to-r border-gray-200">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-semibold text-gray-800">
          <Euro className="w-5 h-5 inline mr-2 text-orange-600" />
          Comment fonctionne la récompense ?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Explication principale */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-start gap-3 mb-4">
            <Badge className="bg-green-100 text-green-800 border border-green-200 px-3 py-1">
              <CheckCircle className="w-4 h-4 mr-1" />
              Récompense réelle
            </Badge>
          </div>

          <div className="space-y-3 text-base">
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 rounded-full size-3 flex items-center justify-center p-3 mt-1">
                <span className="text-orange-600 font-bold text-sm">1</span>
              </div>
              <p className="text-gray-500 text-left">
                <strong className="text-orange-600">Vous signalez</strong> avec
                photo et localisation précise
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-orange-100 rounded-full size-3 flex items-center justify-center p-3 mt-1">
                <span className="text-orange-600 font-bold text-sm">2</span>
              </div>
              <p className="text-gray-500 text-left">
                <strong className="text-orange-600">Nous vérifions</strong>{" "}
                rapidement votre signalement
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-orange-100 rounded-full size-3 flex items-center justify-center p-3 mt-1">
                <span className="text-orange-600 font-bold text-sm">3</span>
              </div>
              <p className="text-gray-500 text-left">
                <strong className="text-orange-600">Si c'est Tao</strong>, nous
                vous contactons pour organiser la récupération
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-green-100 rounded-full size-3 flex items-center justify-center p-3 mt-1">
                <span className="text-green-600 font-bold text-sm">4</span>
              </div>
              <p className="text-gray-500 text-left">
                <strong className="text-green-600">Récompense remise</strong> en
                espèces ou virement sécurisé
              </p>
            </div>
          </div>
        </div>

        {/* Mini FAQ */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-600" />
            Questions fréquentes
          </h3>

          <div className="space-y-3">
            <details className="rounded-lg border border-gray-200">
              <summary className="p-4 cursor-pointer font-medium text-gray-700 text-left">
                La récompense de 500€ est-elle vraiment réelle ?
              </summary>
              <div className="px-4 pb-4 text-gray-600 text-left">
                Oui, absolument ! La récompense est garantie et sera remise à la
                personne qui permettra de retrouver Tao. Nous pouvons fournir
                une preuve de provision si nécessaire.
              </div>
            </details>

            <details className="rounded-lg border border-gray-200">
              <summary className="p-4 cursor-pointer font-medium text-gray-700 text-left">
                Que se passe-t-il si plusieurs personnes signalent ?
              </summary>
              <div className="px-4 pb-4 text-gray-600 text-left ">
                La récompense revient à la personne dont le signalement permet
                effectivement de récupérer Tao. Tous les signalements utiles
                seront remerciés.
              </div>
            </details>

            <details className="rounded-lg border border-gray-200">
              <summary className="p-4 cursor-pointer font-medium text-gray-700 text-left">
                Comment être sûr que c'est bien Tao ?
              </summary>
              <div className="px-4 pb-4 text-gray-600 text-left">
                Tao a des{" "}
                <strong>
                  oreilles très particulières recourbées vers l'arrière
                </strong>{" "}
                - c'est unique ! Sa robe est{" "}
                <strong>
                  gris tigré sur les côtés et tacheté sur le dessus
                </strong>
                . Il est <strong>pucé</strong> (vérifiable chez un vétérinaire)
                mais n'a pas de collier.
              </div>
            </details>
          </div>
        </div>

        {/* Sécurité */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-800">
              Paiement sécurisé
            </span>
          </div>
          <p className="text-sm text-blue-700 text-left">
            La récompense peut être remise en espèces, par virement bancaire ou
            via PayPal selon votre préférence.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
