```tsx
"use client";

import React, { useState } from "react";
import {
  Clock3,
  Flame,
  MapPin,
  Phone,
  Star,
  UtensilsCrossed,
  Check,
} from "lucide-react";

const locations = [
  {
    name: "Express",
    address: "1951 Fort Campbell Blvd",
    phone: "931-378-4089",
    opens: "6 AM",
    note: "Drive-thru convenience. Big Mexican flavor.",
  },
  {
    name: "Taqueria #4",
    address: "3195 Fort Campbell Blvd",
    phone: "931-216-4474",
    opens: "7 AM",
    note: "Your other neighborhood stop for authentic flavor.",
  },
];

const categories = [
  "Birria Specials",
  "Street Tacos",
  "Platos & Caldos",
  "Postres & Drinks",
];

const menu = [
  {
    name: "Birria Quesa Tacos",
    category: "Birria Specials",
    price: "$14.99",
    description: "The birria-and-cheese combination your cravings came for.",
    label: "THE SIGNATURE",
  },
  {
    name: "Pizza Birria",
    category: "Birria Specials",
    price: "$28.67",
    description: "Big birria energy. Made for your next shared feast.",
    label: "GO BIG",
  },
  {
    name: "Street Tacos",
    category: "Street Tacos",
    price: "$5.04",
    description: "Classic Mexican street flavor, one delicious bite at a time.",
    label: "STREET FAVORITE",
  },
  {
    name: "Carne Asada Fries",
    category: "Platos & Caldos",
    price: "$13.26",
    description: "Carne asada meets fries. A serious answer to a serious appetite.",
    label: "COMFORT FOOD",
  },
  {
    name: "Menudo & Pozole",
    category: "Platos & Caldos",
    price: "Market Price",
    description: "Ask your selected branch about today's caldos and availability.",
    label: "ASK THE BRANCH",
  },
  {
    name: "32oz Aguas Frescas",
    category: "Postres & Drinks",
    price: "$6.92",
    description: "A refreshing companion to your Mexican favorites. Ask about today's flavors.",
    label: "COOL IT DOWN",
  },
];

const reviews = [
  {
    author: "Branson D",
    topic: "THE BIRRIA",
    text: "Had the birria tacos, one of the best meals",
  },
  {
    author: "Nichole M",
    topic: "THE DRIVE-THRU",
    text: "didn't have to wait longer than 10 minutes",
  },
  {
    author: "Bobbie S",
    topic: "THE FLAVOR",
    text: "Authentic Mexican food at its finest taste!!",
  },
];

const salsas = [
  { name: "Verde Suave", heat: "Mild & mellow", color: "#82A84B" },
  { name: "Roja Picante", heat: "A little kick", color: "#C8102E" },
  { name: "Habanero Fuego", heat: "Bring the heat", color: "#E57827" },
];

export default function Page() {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Birria Specials");
  const [isDipping, setIsDipping] = useState(false);
  const [selectedSalsa, setSelectedSalsa] = useState(1);

  const loc = locations[selectedLocation];
  const filteredMenu = menu.filter((item) => item.category === activeCategory);

  const flags = [
    "#006341", "#F5E7CF", "#C8102E", "#006341", "#F5E7CF", "#C8102E",
    "#006341", "#F5E7CF", "#C8102E", "#006341", "#F5E7CF", "#C8102E"
  ];

  return (
    <div className="min-h-screen bg-[#110E0C] text-[#F9F6F0] selection:bg-[#C8102E] selection:text-white font-sans">
      {/* Fiesta Top Garland */}
      <div className="w-full overflow-hidden flex justify-center py-2 bg-[#0C0F0E]" aria-hidden="true">
        <div className="flex gap-2 min-w-[700px] justify-around opacity-90">
          {flags.map((color, index) => (
            <div
              key={index}
              className="w-12 h-10 border-b-4 border-dashed border-[#1A1412]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="h-1.5 w-full bg-gradient-to-r from-[#006341] via-[#F5E7CF] to-[#C8102E]" />

      {/* Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#110E0C]/90 border-b border-[#2C231F] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006341] to-[#C8102E] p-0.5 shadow-lg">
              <div className="w-full h-full bg-[#1A1412] rounded-[10px] flex items-center justify-center font-black text-amber-400">
                EG
              </div>
            </div>
            <div>
              <span className="font-black text-xl tracking-wider block leading-tight">EL GRULLO</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#82A84B]">
                Taquería &amp; Birriería
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm font-semibold tracking-wide">
            <a href="#locations" className="hover:text-amber-400 transition-colors">Sucursales</a>
            <a href="#menu" className="hover:text-amber-400 transition-colors">El Menú</a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">Reseñas</a>
          </div>

          <a
            href={"tel:" + loc.phone.replace(/[^0-9]/g, "")}
            className="flex items-center space-x-2 bg-[#C8102E] hover:bg-[#A00B22] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full shadow-lg transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Ordenar: {loc.name}</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-16 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1C1714] border border-[#2F241F] text-xs font-bold text-amber-400">
              <Flame className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Sabor Tradicional de Michoacán en Clarksville</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08]">
              EL VERDADERO SABOR DE LA CALLE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#82A84B] via-[#F5E7CF] to-[#C8102E]">
                QUESABIRRIAS &amp; TACOS.
              </span>
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Tortillas doradas al comal, consomé cocinado a fuego lento por horas y carne tierna servida al momento.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#menu"
                className="bg-[#006341] hover:bg-[#004D32] text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide transition-all shadow-lg flex items-center space-x-2"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Ver Especialidades</span>
              </a>
              <a
                href="#locations"
                className="border border-[#3D302A] bg-[#181310] hover:border-amber-400/50 text-[#F5E7CF] px-6 py-3 rounded-full font-semibold text-sm transition-all flex items-center space-x-2"
              >
                <MapPin className="w-4 h-4 text-[#C8102E]" />
                <span>Ver Ubicaciones</span>
              </a>
            </div>

            <div className="flex items-center space-x-3 pt-3 border-t border-[#261E1A] max-w-md">
              <div className="flex text-amber-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-zinc-200">4.5 Estrellas</span>
              <span className="text-xs text-zinc-500">• Más de 1,360 opiniones en Google</span>
            </div>
          </div>

          {/* Interactive Taco Station */}
          <div className="lg:col-span-5">
            <div className="bg-[#181310] border border-[#2F241F] rounded-3xl p-6 shadow-2xl relative text-center">
              <span className="text-[11px] font-bold tracking-widest uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Estación Interactiva
              </span>
              <h3 className="text-xl font-black mt-2">¡Sumerge Tu Taco en Consomé!</h3>
              <p className="text-xs text-zinc-400">Presiona el botón para probar la experiencia birria</p>

              {/* Visual Taco Component */}
              <div className="relative w-64 h-52 mx-auto flex flex-col items-center justify-center my-4">
                <div
                  className={
                    "text-7xl transition-transform duration-500 select-none " +
                    (isDipping ? "translate-y-10 rotate-6 scale-95" : "hover:-translate-y-2")
                  }
                >
                  🌮
                </div>
                <div className="mt-4 w-40 h-10 bg-[#8F2D1C] rounded-full border-4 border-[#EDB66C] shadow-inner flex items-center justify-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#F5D4A2]">Consomé</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsDipping(true);
                  setTimeout(() => setIsDipping(false), 800);
                }}
                className="w-full py-3 bg-gradient-to-r from-[#C8102E] to-[#A00B22] hover:from-[#A00B22] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                {isDipping ? "¡Dunking con Todo!" : "🌮 Dale un Dip al Consomé"}
              </button>

              <div className="mt-6 pt-4 border-t border-[#261E1A]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-zinc-400 uppercase tracking-wider">Elige tu Salsa:</span>
                  <span className="font-bold" style={{ color: salsas[selectedSalsa].color }}>
                    {salsas[selectedSalsa].name} ({salsas[selectedSalsa].heat})
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {salsas.map((s, idx) => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedSalsa(idx)}
                      className={
                        "text-xs py-2 px-2 rounded-lg font-bold border transition-all cursor-pointer " +
                        (selectedSalsa === idx
                          ? "bg-white/10 border-amber-400 text-white"
                          : "bg-transparent border-[#2F241F] text-zinc-400 hover:border-zinc-600")
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

      {/* Dual Locations Switcher */}
      <section id="locations" className="bg-[#16110F] border-y border-[#261E1A] py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#006341]">Dos Puntos en Clarksville</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">Elige Tu Sucursal</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Selecciona tu local para ver el teléfono directo y horario de servicio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((item, index) => {
              const isSelected = selectedLocation === index;
              return (
                <button
                  key={item.name}
                  onClick={() => setSelectedLocation(index)}
                  className={
                    "text-left p-6 rounded-2xl border transition-all cursor-pointer " +
                    (isSelected
                      ? "bg-[#1E1714] border-[#006341] ring-2 ring-[#006341]/40"
                      : "bg-[#130E0C] border-[#2A201B] hover:border-[#3E3029]")
                  }
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-lg text-white">{item.name}</h3>
                    {isSelected && (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-[#006341] text-white px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" /> Seleccionada
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 mt-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C8102E] shrink-0" />
                    <span>{item.address}, Clarksville, TN</span>
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                    <Clock3 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Abre a las {item.opens} · Drive-thru disponible</span>
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#261E1A] flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-400 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {item.phone}
                    </span>
                    <span className="text-zinc-400 font-semibold">{item.note}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section id="menu" className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C8102E]">
              Especialidades de la Casa
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-1">Antojitos &amp; Platillos</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={
                  "text-xs px-4 py-2 rounded-full font-bold transition-all cursor-pointer " +
                  (activeCategory === cat
                    ? "bg-[#C8102E] text-white shadow-md shadow-[#C8102E]/30"
                    : "bg-[#1C1714] text-zinc-400 hover:text-white border border-[#2F241F]")
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
              className="bg-[#181310] border border-[#2B211C] hover:border-amber-400/40 rounded-2xl p-6 flex flex-col justify-between transition-transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    {item.label}
                  </span>
                  <span className="font-mono font-bold text-lg text-[#82A84B]">
                    {item.price}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#261E1A] flex items-center justify-between">
                <span className="text-xs text-zinc-500">Pídelo en {loc.name}</span>
                <a
                  href={"tel:" + loc.phone.replace(/[^0-9]/g, "")}
                  className="text-xs font-bold text-white bg-white/10 hover:bg-white hover:text-black px-3.5 py-1.5 rounded-lg transition-colors"
                >
                  Llamar y Pedir
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-14 px-6 bg-[#16110F] border-t border-[#261E1A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              La Voz de Clarksville
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">Lo Que Dicen Nuestros Clientes</h2>
            <p className="text-xs text-zinc-400 mt-1">Reseñas de clientes locales en Google</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.author} className="bg-[#181310] border border-[#2F241F] rounded-2xl p-6 relative">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#C8102E] block mb-2">
                  {r.topic}
                </span>
                <p className="text-sm text-zinc-300 italic mb-4 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center justify-between pt-3 border-t border-[#261E1A]">
                  <span className="text-xs font-bold text-white">— {r.author}</span>
                  <div className="flex text-amber-400">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#261E1A] bg-[#0E0B0A] py-10 px-6 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-extrabold text-zinc-300 text-sm">El Grullo Express Taquería</p>
            <p className="mt-0.5">1951 &amp; 3195 Fort Campbell Blvd, Clarksville, TN</p>
          </div>
          <div className="flex space-x-6">
            <span>© {new Date().getFullYear()} El Grullo Express. Todos los derechos reservados.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
