import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, AlertTriangle, Camera, Phone } from "lucide-react"

export default function TipsSection() {
  const tips = [
    {
      icon: <Heart className="w-6 h-6 text-green-600" />,
      title: "Restez calme et doux",
      description: "Ne tentez pas de l'attraper brutalement, Tao est très craintif",
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
      title: "Appelez-le doucement",
      description: "Dites 'Tao, Tao' d'une voix douce, ne courez pas vers lui",
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "Prévenez immédiatement",
      description: "Appelez-nous tout de suite, même si vous n'êtes pas sûr",
    },
    {
      icon: <Camera className="w-6 h-6 text-purple-600" />,
      title: "Prenez une photo de loin",
      description: "Si possible, photographiez-le sans l'effrayer pour confirmer",
    },
  ]

  return (
    <Card className="mb-8 bg-green-50 border-green-200">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800">Si vous voyez Tao</CardTitle>
        <p className="text-gray-600">Voici comment réagir pour maximiser les chances de le récupérer</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-green-200">
              <div className="flex-shrink-0 mt-1">{tip.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">{tip.title}</h4>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-red-800 mb-2">⚠️ Important à retenir</h4>
              <p className="text-sm text-red-700">
                Tao est <strong>doux, câlin et curieux</strong> mais devient{" "}
                <strong>très craintif avec les inconnus</strong> par stress. Ses{" "}
                <strong>oreilles recourbées vers l'arrière</strong> sont son signe le plus distinctif.
                <strong> L'essentiel est de nous prévenir rapidement</strong>, même si vous avez un doute !
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">🔍 Où chercher Tao ?</h4>
              <p className="text-sm text-yellow-700 mb-3">
                Tao peut se cacher dans des endroits sombres et protégés. <strong>Vérifiez minutieusement :</strong>
              </p>
              <ul className="text-sm text-yellow-700 space-y-1 ml-4">
                <li>
                  • <strong>Garages, caves, abris de jardin</strong> (même fermés, il peut s'y faufiler)
                </li>
                <li>
                  • <strong>Serres, cabanons, remises</strong> et tous petits espaces
                </li>
                <li>
                  • <strong>Sous les voitures, terrasses, escaliers</strong>
                </li>
                <li>
                  • <strong>Buissons denses, haies, tas de bois</strong>
                </li>
              </ul>
              <p className="text-sm text-yellow-700 mt-3 font-medium">
                💡 <strong>Astuce :</strong> Laissez vos garages/abris ouverts 30 minutes minimum et surveillez
                discrètement. Tao pourrait sortir de sa cachette une fois rassuré.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
