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
    <div className="min-h-screen text-[#2C1810] font-sans selection:bg-[#C8102E] selection:text-white relative bg-transparent">
      
      {/* ========================================================================= */}
      {/* 100% RAW FIXED FULL-PAGE BACKGROUND VIDEO                                 */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-50">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/mexico-street.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Top Banner (Semi-Transparent) */}
      <div className="w-full bg-[#1B1410]/85 backdrop-blur-md border-b-4 border-[#006847] shadow-sm select-none">
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
      <div className="h-1.5 w-full bg-gradient-to-r from-[#006847] via-white to-[#C8102E] shadow-sm" />

      {/* Glass Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/75 backdrop-blur-md border-b-2 border-white/40 shadow-md px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#006847] via-white to-[#C8102E] p-0.5 shadow-md">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-serif font-black text-xl text-[#8B1A10]">
                EG
              </div>
            </div>
            <div>
              <span className="font-serif font-black text-2xl tracking-tight text-[#2C1810] block leading-none drop-shadow-sm">
                EL GRULLO
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#006847] block mt-0.5">
                Taquería &amp; Birriería Tradicional
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-7 text-xs font-black uppercase tracking-widest text-[#2C1810]">
            <a href="#hero" className="hover:text-[#C8102E] transition-colors">El Comal 3D</a>
            <a href="#locations" className="hover:text-[#C8102E] transition-colors">Las 2 Sucursales</a>
            <a href="#menu" className="hover:text-[#C8102E] transition-colors">El Menú</a>
            <a href="#reviews" className="hover:text-[#C8102E] transition-colors">Opiniones</a>
          </nav>

          <a
            href={"tel:" + loc.phone.replace(/[^0-9]/g, "")}
            className="flex items-center space-x-2 bg-[#C8102E] hover:bg-[#A30D25] text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-full shadow-lg shadow-[#C8102E]/30 transition-transform hover:scale-105"
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-xs font-black text-[#006847] shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006847]" />
              <span>Sabor de Pueblo Tradicional · Clarksville, TN</span>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/60 shadow-xl">
              <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight leading-[1.05] text-[#2C1810]">
                EL VERDADERO <br />
                <span className="text-[#C8102E] underline decoration-wavy decoration-[#006847]">
                  SABOR DEL COMAL.
                </span>
              </h1>

              <p className="text-[#3D2314] text-lg font-semibold leading-relaxed max-w-xl mt-4">
                Inspirado en la calidez de nuestras plazas y pueblos: tortillas pasadas por comal de hierro, carne suave deshebrada en su jugo y consomé hirviendo con aroma a laurel y guajillo.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-1">
              <a
                href="#menu"
                className="bg-[#006847] hover:bg-[#004F36] text-white px-7 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider shadow-xl shadow-[#006847]/40 flex items-center space-x-2 transition-transform hover:-translate-y-0.5"
              >
                <UtensilsCrossed className="w-4 h-4 text-amber-300" />
                <span>Ver Menú del Día</span>
              </a>
              <a
                href="#locations"
                className="bg-white/85 backdrop-blur-md hover:bg-white text-[#2C1810] px-6 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider border-2 border-white/80 shadow-lg flex items-center space-x-2"
              >
                <MapPin className="w-4 h-4 text-[#C8102E]" />
                <span>Nuestras 2 Sucursales</span>
              </a>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="px-4 py-2 rounded-xl bg-white/85 backdrop-blur-md border border-white/80 flex items-center gap-3 shadow-md">
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
              className="w-full max-w-md p-7 rounded-3xl bg-white/85 backdrop-blur-xl border-4 border-[#006847] shadow-[0_25px_50px_rgba(0,0,0,0.25)] transition-transform duration-150 ease-out relative select-none"
            >
              <div className="flex items-center justify-between border-b-2 border-zinc-200 pb-3 mb-4" style={{ transform: "translateZ(30px)" }}>
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
                    "text-8xl transition-
