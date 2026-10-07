"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Clock3,
  Flame,
  MapPin,
  Phone,
  Star,
  UtensilsCrossed,
  Check,
  Sparkles,
} from "lucide-react";

const locations = [
  {
    name: "Sucursal Express",
    badge: "Auto-Servicio Rápido",
    address: "1951 Fort Campbell Blvd",
    phone: "931-378-4089",
    opens: "6:00 AM",
    vibe: "Drive-thru al instante con el aroma del comal directo a tu auto.",
  },
  {
    name: "Taquería El Grullo #4",
    badge: "Tradición y Familia",
    address: "3195 Fort Campbell Blvd",
    phone: "931-216-4474",
    opens: "7:00 AM",
    vibe: "Mesa lista para disfrutar los caldos y tacos en familia.",
  },
];

const categories = [
  "Lo Mero Bueno (Birria)",
  "Tacos al Comal",
  "Especialidades",
  "Aguas Frescas",
];

const menu = [
  {
    name: "Quesabirrias con Consomé",
    category: "Lo Mero Bueno (Birria)",
    price: "$14.99",
    badge: "LA ESPECIALIDAD",
    desc: "Tres tortillas de maíz pasadas por el adobo y doradas al comal, quesillo fundido, res deshebrada tierna, cebolla, cilantro y consomé caliente.",
    prep: "Doradas al comal",
  },
  {
    name: "Pizza Birria Artesanal",
    category: "Lo Mero Bueno (Birria)",
    price: "$28.67",
    badge: "PARA COMPARTIR",
    desc: "Costra crujiente de maíz rellena de carne birria sazonada con laurel y chile guajillo, queso fundido y tazón grande de consomé.",
    prep: "Rinde para 3-4 personas",
  },
  {
    name: "Tacos al Comal Callejero",
    category: "Tacos al Comal",
    price: "$5.04",
    badge: "TRADICIÓN PURA",
    desc: "Carne picada al momento (Asada, Pastor o Carnitas) sobre doble tortilla de comal con copete de cilantro fresco y cebolla picadita.",
    prep: "Con copia y con todo",
  },
  {
    name: "Carne Asada Fries",
    category: "Especialidades",
    price: "$13.26",
    badge: "BIEN CARGADO",
    desc: "Cama de papas crujientes con fajitas de carne asada, guacamole casero machacado, crema fresca y queso derretido.",
    prep: "Porción generosa",
  },
  {
    name: "Menudo y Pozole Tradicional",
    category: "Especialidades",
    price: "Precio del Día",
    badge: "RECETA DE OLLA",
    desc: "Caldos preparados con maíz cacahuazintle, guajillo, orégano, rábanos y tortillas calientitas hechas al momento.",
    prep: "Especial del día",
  },
  {
    name: "Aguas de Vitrolero (32oz)",
    category: "Aguas Frescas",
    price: "$6.92",
    badge: "NATURAL Y FRÍA",
    desc: "Servida bien fría: Horchata cremosa con canela molida, Jamaica natural agridulce, Piña colada o Melón fresco.",
    prep: "32 onzas de fruta real",
  },
];

const reviews = [
  {
    author: "Branson D.",
    hood: "Vecino de Fort Campbell",
    text: "The birria tacos are authentic and packed with flavor. The consomé is rich, seasoned with genuine Mexican spices.",
  },
  {
    author: "Nichole M.",
    hood: "Clarksville, TN",
    text: "Super fast drive-thru! Piping hot quesabirrias with crispy edges in under 10 minutes flat.",
  },
  {
    author: "Bobbie S.",
    hood: "Cliente Frecuente",
    text: "Generous portions, genuine hospitality, and the true flavor of traditional Mexican street food.",
  },
];

const salsas = [
  { name: "Verde Tomatillo", color: "#16A34A", heat: "Suavecita" },
  { name: "Roja de Árbol", color: "#DC2626", heat: "Picante sabroso" },
  { name: "Habanero Asado", color: "#D97706", heat: "¡Puro fuego!" },
];

export default function Page() {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Lo Mero Bueno (Birria)");
  const [isDipping, setIsDipping] = useState(false);
  const [isSizzling, setIsSizzling] = useState(false);
  const [salsaIndex, setSalsaIndex] = useState(1);
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });

  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const loc = locations[selectedLocation];
  const filteredMenu = menu.filter((item) => item.category === activeCategory);

  // Guarantee seamless background video autoplay on all devices
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardRotation({
      x: -(y / rect.height) * 18,
      y: (x / rect.width) * 18,
    });
  };

  const handleMouseLeave = () => {
    setCardRotation({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen text-[#2C1810] font-sans selection:bg-[#C8102E] selection:text-white relative">
      
      {/* ========================================================================= */}
      {/* FULL BACKGROUND VIDEO (Loaded from public/mexico-street.mp4)               */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover filter contrast-[1.08] saturate-[1.15] brightness-[0.96]"
        >
          <source src="/mexico-street.mp4" type="video/mp4" />
        </video>

        {/* Ambient Mexican Daylight & Stone Tint: balances video motion with text contrast */}
        <div className="absolute inset-0 bg-[#FBF7F0]/80 backdrop-blur-[1.5px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF7F0]/90 via-[#FBF7F0]/65 to-[#FBF7F0]/95" />
      </div>

      {/* Top Banner */}
      <div className="w-full bg-[#1B1410] border-b-4 border-[#006847] shadow-sm select-none">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between text-xs text-[#EAD8C7] font-semibold">
          <div className="flex items-center gap-2">
            <span className="text-base">🇲🇽</span>
            <span className="tracking-wide uppercase font-bold">Tradición y Sabor Auténtico de México</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] font-bold">
            <span className="text-[#4ADE80]">★ COMAL TRADICIONAL</span>
            <span className="text-[#FBBF24]">★ TORTILLAS DE MAÍZ</span>
            <span className="text-[#F87171]">★ DOS SUCURSALES EN CLARKSVILLE</span>
          </div>
        </div>
      </div>

      {/* Tricolor Ribbon Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#006847] via-[#FFF] to-[#C8102E] shadow-sm" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b-2 border-[#E7D6C3] shadow-md px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#006847] via-[#FFF] to-[#C8102E] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#FFFDF9] rounded-[14px] flex items-center justify-center font-serif font-black text-xl text-[#8B1A10]">
                EG
              </div>
            </div>
            <div>
              <span className="font-serif font-black text-2xl tracking-tight text-[#2C1810] block leading-none">
                EL GRULLO
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#006847] block mt-0.5">
                Taquería &amp; Birriería Tradicional
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-7 text-xs font-black uppercase tracking-widest text-[#69432E]">
            <a href="#hero" className="hover:text-[#C8102E] transition-colors">El Comal 3D</a>
            <a href="#locations" className="hover:text-[#C8102E] transition-colors">Las 2 Sucursales</a>
            <a href="#menu" className="hover:text-[#C8102E] transition-colors">El Menú</a>
            <a href="#reviews" className="hover:text-[#C8102E] transition-colors">Opiniones</a>
          </nav>

          <a
            href={"tel:" + loc.phone.replace(/[^0-9]/g, "")}
            className="flex items-center space-x-2 bg-[#C8102E] hover:bg-[#A30D25] text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-full shadow-lg shadow-[#C8102E]/25 transition-transform hover:scale-105"
          >
            <Phone className="w-3.5 h-3.5 text-amber-300" />
            <span>Ordenar: {loc.name.split(" ")[1]}</span>
          </a>
        </div>
      </header>

      {/* Hero Section with Interactive 3D Showcase Card */}
      <section id="hero" className="relative px-6 py-14 flex items-center">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9]/90 backdrop-blur border border-[#DECDBB] text-xs font-black text-[#006847] shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006847]" />
              <span>Sabor de Pueblo Tradicional · Clarksville, TN</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight leading-[1.05] text-[#2C1810]">
              EL VERDADERO <br />
              <span className="text-[#C8102E] underline decoration-wavy decoration-[#006847]">
                SABOR DEL COMAL.
              </span>
            </h1>

            <p className="text-[#5C3925] text-lg font-medium leading-relaxed max-w-xl">
              Inspirado en la calidez de nuestras plazas y pueblos: tortillas pasadas por comal de hierro, carne suave deshebrada en su jugo y consomé hirviendo con aroma a laurel y guajillo.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#menu"
                className="bg-[#006847] hover:bg-[#004F36] text-white px-7 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-[#006847]/25 flex items-center space-x-2 transition-transform hover:-translate-y-0.5"
              >
                <UtensilsCrossed className="w-4 h-4 text-amber-300" />
                <span>Ver Menú del Día</span>
              </a>
              <a
                href="#locations"
                className="bg-[#FFFDF9] hover:bg-[#F3EAE0] text-[#2C1810] px-6 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider border-2 border-[#D9C4AB] shadow-sm flex items-center space-x-2"
              >
                <MapPin className="w-4 h-4 text-[#C8102E]" />
                <span>Nuestras 2 Sucursales</span>
              </a>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="px-4 py-2 rounded-xl bg-[#FFFDF9]/90 backdrop-blur border border-[#D9C4AB] flex items-center gap-3 shadow-sm">
                <div className="flex text-amber-500">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-black text-xs text-[#2C1810]">4.5 Estrellas (1,360+ opiniones)</span>
              </div>
            </div>
          </div>

          {/* Interactive 3D Perspective Card */}
          <div className="lg:col-span-6 flex justify-center [perspective:1000px]">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)`,
                transformStyle: "preserve-3d",
              }}
              className="w-full max-w-md p-7 rounded-3xl bg-[#FFFDF9]/95 backdrop-blur-xl border-4 border-[#006847] shadow-[0_20px_40px_rgba(44,24,16,0.18)] transition-transform duration-150 ease-out relative select-none"
            >
              <div className="flex items-center justify-between border-b-2 border-[#EADAC8] pb-3 mb-4" style={{ transform: "translateZ(30px)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌮</span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#006847]">
                      SHOWCASE 3D EN VIVO
                    </span>
                    <h3 className="font-serif font-black text-xl text-[#2C1810]">Birria Quesa Taco</h3>
                  </div>
                </div>
                <span className="text-xs font-black text-white bg-[#006847] px-2.5 py-1 rounded-full shadow-sm">
                  $14.99
                </span>
              </div>

              <div className="relative py-6 text-center" style={{ transform: "translateZ(50px)" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex space-x-3 pointer-events-none opacity-60">
                  <span className="text-xl animate-bounce delay-100">♨️</span>
                  <span className="text-xl animate-bounce delay-300">♨️</span>
                  <span className="text-xl animate-bounce delay-200">♨️</span>
                </div>

                <div
                  onClick={() => {
                    setIsSizzling(true);
                    setTimeout(() => setIsSizzling(false), 850);
                  }}
                  className={
                    "text-8xl transition-all duration-300 inline-block cursor-pointer drop-shadow-xl " +
                    (isSizzling ? "scale-115 rotate-[-12deg]" : "hover:scale-105") +
                    (isDipping ? " translate-y-12 rotate-12 scale-95" : "")
                  }
                >
                  🌮
                </div>

                <div
                  className="mt-5 mx-auto w-52 h-14 bg-gradient-to-r from-[#991B1B] via-[#7F1D1D] to-[#991B1B] rounded-full border-4 border-[#FBBF24] shadow-md flex items-center justify-center relative overflow-hidden"
                  style={{ transform: "translateZ(25px)" }}
                >
                  <span className="text-xs font-black uppercase tracking-widest text-[#FEF3C7] drop-shadow z-10">
                    Consomé Hirviendo
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4" style={{ transform: "translateZ(40px)" }}>
                <button
                  onClick={() => {
                    setIsSizzling(true);
                    setTimeout(() => setIsSizzling(false), 850);
                  }}
                  className="py-3 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  🔥 Chillar al Comal
                </button>
                <button
                  onClick={() => {
                    setIsDipping(true);
                    setTimeout(() => setIsDipping(false), 800);
                  }}
                  className="py-3 bg-[#C8102E] hover:bg-[#A00B22] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  🌮 Dip al Consomé
                </button>
              </div>

              <div className="mt-5 pt-3 border-t-2 border-[#EADAC8]" style={{ transform: "translateZ(20px)" }}>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-black text-[#5C3925] uppercase">Salsa Tradicional:</span>
                  <span className="font-black" style={{ color: salsas[salsaIndex].color }}>
                    {salsas[salsaIndex].name} ({salsas[salsaIndex].heat})
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {salsas.map((s, idx) => (
                    <button
                      key={s.name}
                      onClick={() => setSalsaIndex(idx)}
                      className={
                        "text-[10px] py-1.5 px-1 rounded-lg font-black border-2 transition-all cursor-pointer " +
                        (salsaIndex === idx
                          ? "bg-[#FFF] border-[#006847] text-[#006847] shadow-sm font-bold"
                          : "bg-[#F3EAE0] border-[#DECDBB] text-[#7A543A] hover:bg-[#FFF]")
                      }
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Locations Section */}
      <section id="locations" className="bg-[#FFFDF9]/90 backdrop-blur-md border-y-2 border-[#DECDBB] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#006847] bg-[#E2F0EA] border border-[#B6DEC9] px-3 py-1 rounded-full">
              Puntos de Encuentro
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#2C1810] mt-3">
              ¿En Cuál Sucursal Te Vemos?
            </h2>
            <p className="text-sm text-[#7A543A] font-medium mt-1">
              Ambas con autoservicio rápido y la misma receta auténtica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((item, index) => {
              const isSelected = selectedLocation === index;
              return (
                <button
                  key={item.name}
                  onClick={() => setSelectedLocation(index)}
                  className={
                    "text-left p-7 rounded-3xl border-2 transition-all cursor-pointer relative shadow-sm " +
                    (isSelected
                      ? "bg-[#FFFDF9] border-[#006847] ring-2 ring-[#006847]/40 shadow-md"
                      : "bg-[#FBF7F0] border-[#DECDBB] hover:bg-[#FFFDF9]")
                  }
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#C8102E] bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                      <h3 className="font-serif font-black text-2xl text-[#2C1810] mt-2">{item.name}</h3>
                    </div>
                    {isSelected && (
                      <span className="text-xs font-black uppercase tracking-wider bg-[#006847] text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Activa
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#5C3925] font-semibold mt-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C8102E] shrink-0" />
                    <span>{item.address}, Clarksville, TN</span>
                  </p>
                  <p className="text-xs text-[#7A543A] font-medium mt-1.5 flex items-center gap-2">
                    <Clock3 className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span>Abre a las {item.opens} · Autoservicio al instante</span>
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#E8DAC8] flex items-center justify-between">
                    <span className="font-black text-lg text-[#C8102E] flex items-center gap-1">
                      <Phone className="w-4 h-4" /> {item.phone}
                    </span>
                    <span className="text-xs font-black uppercase text-[#006847] underline">
                      Llamar Directo
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#C8102E] bg-red-50 border border-red-200 px-3 py-1 rounded-full">
              Sabor Tradicional
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#2C1810] mt-3">
              La Carta del Comal
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={
                  "text-xs px-5 py-2.5 rounded-full font-black uppercase tracking-wider transition-all cursor-pointer " +
                  (activeCategory === cat
                    ? "bg-[#C8102E] text-white shadow-md shadow-[#C8102E]/30"
                    : "bg-[#FFFDF9] text-[#7A543A] hover:text-[#2C1810] border border-[#DECDBB]")
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <div
              key={item.name}
              className="bg-[#FFFDF9]/95 backdrop-blur border-2 border-[#DECDBB] hover:border-[#006847] rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E2F0EA] text-[#006847] border border-[#B6DEC9]">
                    {item.badge}
                  </span>
                  <span className="font-serif font-black text-2xl text-[#006847]">
                    {item.price}
                  </span>
                </div>
                <h3 className="font-serif font-black text-2xl text-[#2C1810]">{item.name}</h3>
                <p className="text-xs font-black text-[#C8102E] mt-1 uppercase tracking-wider">
                  {item.prep}
                </p>
                <p className="text-sm text-[#5C3925] font-medium mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DAC8] flex items-center justify-between">
                <span className="text-xs text-[#7A543A]">Sucursal: {loc.name.split(" ")[1]}</span>
                <a
                  href={"tel:" + loc.phone.replace(/[^0-9]/g, "")}
                  className="text-xs font-black uppercase tracking-wider bg-[#006847] hover:bg-[#004F36] text-white px-4 py-2 rounded-xl transition-all shadow-sm"
                >
                  Pedir al Auto
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="py-16 px-6 bg-[#FFFDF9]/90 backdrop-blur-md border-t-2 border-[#DECDBB]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#D97706] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              La Fama de Fort Campbell
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#2C1810] mt-3">
              Lo Que Dice la Gente
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, idx) => (
              <div
                key={r.author}
                className={
                  "bg-[#FFFDF9] border-2 border-[#DECDBB] rounded-3xl p-6 shadow-sm relative " +
                  (idx % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]")
                }
              >
                <div className="flex text-amber-500 mb-3">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#4A2612] font-medium italic mb-4 leading-relaxed">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="pt-3 border-t border-[#E8DAC8] flex items-center justify-between text-xs">
                  <span className="font-black text-[#2C1810]">{r.author}</span>
                  <span className="text-[11px] font-bold text-[#006847]">{r.hood}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#DECDBB] bg-[#1E140F] py-12 px-6 text-xs text-[#DECDBB]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-serif font-black text-lg text-white">El Grullo Express Taquería</p>
            <p className="mt-0.5 text-[#A8917F]">1951 &amp; 3195 Fort Campbell Blvd, Clarksville, TN</p>
          </div>
          <div className="flex space-x-6 text-[#4ADE80] font-bold">
            <span>© {new Date().getFullYear()} El Grullo Express. Sabor Tradicional Mexicano.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
