"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock3, Flame, MapPin, Phone, Star, UtensilsCrossed } from "lucide-react";

// Drop into an App Router project with Tailwind CSS and lucide-react installed.
// Contact details, prices, and the 1,360+ count are supplied by the owner.
// Review excerpts are Google reviews republished by Wanderlog (sources below).
// Self-contained SVG artwork and CSS: no image assets or font downloads required.

const locations = [
  { name: "Express", address: "1951 Fort Campbell Blvd", phone: "931-378-4089", opens: "6 AM", note: "Drive-thru convenience. Big Mexican flavor." },
  { name: "Taqueria #4", address: "3195 Fort Campbell Blvd", phone: "931-216-4474", opens: "7 AM", note: "Your other neighborhood stop for authentic flavor." },
] as const;
const categories = ["Birria Specials", "Street Tacos", "Platos & Caldos", "Postres & Drinks"] as const;
type Category = (typeof categories)[number];
type MenuItem = { name: string; category: Category; price: number | null; description: string; label: string; };
const menu: MenuItem[] = [
  { name: "Birria Quesa Tacos", category: "Birria Specials", price: 14.99, description: "The birria-and-cheese combination your cravings came for.", label: "THE SIGNATURE" },
  { name: "Pizza Birria", category: "Birria Specials", price: 28.67, description: "Big birria energy. Made for your next shared feast.", label: "GO BIG" },
  { name: "Street Tacos", category: "Street Tacos", price: 5.04, description: "Classic Mexican street flavor, one delicious bite at a time.", label: "STREET FAVORITE" },
  { name: "Carne Asada Fries", category: "Platos & Caldos", price: 13.26, description: "Carne asada meets fries. A serious answer to a serious appetite.", label: "COMFORT FOOD" },
  { name: "Menudo & Pozole", category: "Platos & Caldos", price: null, description: "Ask your selected branch about today's caldos and availability.", label: "ASK THE BRANCH" },
  { name: "32oz Aguas Frescas", category: "Postres & Drinks", price: 6.92, description: "A refreshing companion to your Mexican favorites. Ask about today's flavors.", label: "COOL IT DOWN" },
];
const reviewSources = {
  main: "https://wanderlog.com/place/details/4095347/el-grullo-express",
  birria: "https://wanderlog.com/list/geoCategory/1269369/best-mexican-foods-and-restaurants-in-clarksville",
};
const reviews = [
  { author: "Branson D", topic: "THE BIRRIA", text: "Had the birria tacos, one of the best meals", source: reviewSources.birria },
  { author: "Nichole M", topic: "THE DRIVE-THRU", text: "didn't have to wait longer then 10 minutes", source: reviewSources.main },
  { author: "Bobbie S", topic: "THE FLAVOR", text: "Authentic Mexican food at its finest taste!!", source: reviewSources.main },
] as const;
const money = (value: number) => `$${value.toFixed(2)}`;

const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F59E0B]";
const salsas = [
  { name: "Verde Suave", heat: "Mild & mellow", color: "#82A84B", flameCount: 1 },
  { name: "Roja Picante", heat: "A little kick", color: "#C8102E", flameCount: 2 },
  { name: "Habanero Fuego", heat: "Bring the heat", color: "#E57827", flameCount: 3 },
] as const;
const menuTitles: Record<string, { title: string; detail: string }> = {
  "Birria Quesa Tacos": { title: "Quesabirrias con Consomé", detail: "Birria · queso · consomé" },
  "Pizza Birria": { title: "Pizza Birria", detail: "Birria · queso · made to share" },
  "Street Tacos": { title: "Tacos de la Calle", detail: "Street-style tacos · ask about fillings" },
  "Carne Asada Fries": { title: "Carne Asada Fries", detail: "Carne asada · fries" },
  "Menudo & Pozole": { title: "Menudo y Pozole", detail: "Traditional caldos · ask about availability" },
  "32oz Aguas Frescas": { title: "Aguas Frescas de 32oz", detail: "32 ounces · ask about today's flavors" },
};

function PapelPicado() {
  return (
    <div className="picado" aria-hidden="true">
      <div className="picado-string" />
      {Array.from({ length: 18 }, (_, index) => (
        <svg key={index} viewBox="0 0 90 78" className="picado-flag" style={{ color: ["#006341", "#F5E7CF", "#C8102E"][index % 3], animationDelay: `${(index % 5) * -0.6}s` }}>
          <defs>
            <mask id={`flag-cut-${index}`}>
              <rect width="90" height="78" fill="white" />
              <path d="M0 70L9 78L18 70L27 78L36 70L45 78L54 70L63 78L72 70L81 78L90 70V78H0Z" fill="black" />
              <path d="M45 14L53 24L45 34L37 24ZM45 42L56 53L45 64L34 53Z" fill="black" />
              <g fill="black"><circle cx="18" cy="21" r="5" /><circle cx="72" cy="21" r="5" /><circle cx="18" cy="53" r="5" /><circle cx="72" cy="53" r="5" /><circle cx="29" cy="38" r="4" /><circle cx="61" cy="38" r="4" /></g>
            </mask>
          </defs>
          <path d="M0 0H90V78H0Z" fill="currentColor" mask={`url(#flag-cut-${index})`} />
        </svg>
      ))}
    </div>
  );
}

function TacoIllustration({ dipping }: { dipping: boolean }) {
  return (
    <svg viewBox="0 0 360 290" className="taco-scene" role="img" aria-label={dipping ? "Taco dipping into consomé" : "Illustration of a birria taco above a bowl of consomé"}>
      <ellipse cx="180" cy="264" rx="128" ry="12" fill="#000" opacity=".3" />
      <g className="steam" fill="none" stroke="#EED8AC" strokeWidth="3" strokeLinecap="round" opacity=".4"><path d="M140 162q-12-15 0-29t0-27" /><path d="M183 153q-12-15 0-29t0-27" /><path d="M226 162q-12-15 0-29t0-27" /></g>
      <path d="M67 199q8 65 113 65t113-65" fill="#B85532" stroke="#EDB66C" strokeWidth="3" />
      <ellipse cx="180" cy="199" rx="113" ry="29" fill="#E4AC68" />
      <ellipse cx="180" cy="199" rx="102" ry="22" fill="#8F2D1C" />
      <g fill="#F59E0B" opacity=".65"><ellipse cx="122" cy="202" rx="9" ry="2" /><ellipse cx="223" cy="199" rx="12" ry="3" /><ellipse cx="178" cy="211" rx="8" ry="2" /></g>
      <g className={dipping ? "taco dipping" : "taco"}>
        <path d="M88 104q17-81 92-81t92 81q-21 45-92 45t-92-45" fill="#D7872F" stroke="#F0BD60" strokeWidth="4" />
        <path d="M98 100q81-37 164 0l-10 28q-72 30-143 0Z" fill="#6F301E" />
        <g stroke="#D07139" strokeWidth="8" strokeLinecap="round"><path d="M112 106l24 9m-3-17l26 20m7-14l22 17m9-22l28 13m7-8l18 8" /></g>
        <g stroke="#F3D891" strokeWidth="4" strokeLinecap="round"><path d="M113 113l27-6 18 17 22-16 20 15 28-14 20 9" /><path d="M130 126l22-7m44 7l26-8" /></g>
        <g fill="#82A84B"><circle cx="121" cy="105" r="5" /><circle cx="170" cy="115" r="5" /><circle cx="215" cy="103" r="5" /><circle cx="235" cy="123" r="4" /></g>
        <g fill="#F1DDAB"><rect x="140" y="100" width="6" height="6" transform="rotate(20 140 100)" /><rect x="190" y="109" width="7" height="6" /><rect x="222" y="116" width="6" height="6" /></g>
        <path d="M91 105q88 30 177 0l-8 20q-80 41-160 0Z" fill="#E5A43D" stroke="#F0BD60" strokeWidth="3" />
        <g fill="#A86129" opacity=".5"><circle cx="139" cy="62" r="4" /><circle cx="195" cy="46" r="3" /><circle cx="226" cy="72" r="5" /><circle cx="157" cy="83" r="3" /><circle cx="177" cy="133" r="3" /></g>
      </g>
      <path d="M77 219q103 36 207 0" fill="none" stroke="#F5D4A2" strokeWidth="3" />
      {dipping && <g className="splash" fill="#D36330"><ellipse cx="99" cy="181" rx="4" ry="8" /><ellipse cx="257" cy="174" rx="4" ry="9" /><circle cx="240" cy="164" r="4" /><circle cx="121" cy="166" r="3" /></g>}
    </svg>
  );
}
