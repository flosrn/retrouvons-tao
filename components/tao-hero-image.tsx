export default function TaoHeroImage() {
  return (
    <div className="relative inline-block">
      {/* Circular orange gradient background */}
      <div className="w-64 h-64 rounded-full bg-gradient-to-b from-orange-600 to-orange-200 shadow-2xl relative">
        {/* Inner glow effect */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-b from-orange-500/50 to-orange-100/50 shadow-inner"></div>

        {/* Tao positioned to overflow the circle */}
        <div className="absolute -top-8 -left-4 w-72 h-72">
          <img
            src="/tao-transparent.png"
            alt="Tao, chat perdu"
            className="w-full h-full object-contain"
            style={{
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
            }}
          />
        </div>

        {/* Overlay to hide parts that should be behind the circle */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(circle at center, 
                transparent 0%, 
                transparent 75%, 
                #f97316 76%, 
                #ea580c 100%
              )
            `,
          }}
        ></div>
      </div>
    </div>
  )
}
