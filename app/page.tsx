"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock3, Flame, MapPin, Phone, Star, UtensilsCrossed } from "lucide-react";

// Interactive client page. Global styles are defined in app/globals.css.
// Contact details, prices, and the 1,360+ count are supplied by the owner.
// Review excerpts are Google reviews republished by Wanderlog (sources below).
// Self-contained SVG artwork and CSS: no image assets or font downloads required.

const locations = [
  { name: "Express", address: "1951 Fort Campbell Blvd", phone: "931-378-4089", opens: "6 AM", note: "Drive-thru convenience. Big Mexican flavor." },
  { name: "Taquería #4", address: "3195 Fort Campbell Blvd", phone: "931-216-4474", opens: "7 AM", note: "Your other neighborhood stop for authentic flavor." },
] as const;
const categories = ["Birria Specials", "Street Tacos", "Platos & Caldos", "Postres & Drinks"] as const;
type Category = (typeof categories)[number];
type MenuItem = { name: string; category: Category; price: number | null; description: string; label: string; };
const menu: MenuItem[] = [
  { name: "Birria Quesa Tacos", category: "Birria Specials", price: 14.99, description: "The birria-and-cheese combination your cravings came for.", label: "THE SIGNATURE" },
  { name: "Pizza Birria", category: "Birria Specials", price: 28.67, description: "Big birria energy. Made for your next shared feast.", label: "GO BIG" },
  { name: "1 Street Taco", category: "Street Tacos", price: 5.04, description: "Classic Mexican street flavor, one delicious bite at a time.", label: "STREET FAVORITE" },
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
  "1 Street Taco": { title: "1 Taco de la Calle", detail: "Street-style tacos · ask about fillings" },
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

export default function Page() {
  const [branch, setBranch] = useState(0);
  const [category, setCategory] = useState<Category>("Birria Specials");
  const [reviewIndex, setReviewIndex] = useState(0);
  const [salsaIndex, setSalsaIndex] = useState(0);
  const [dipping, setDipping] = useState(false);
  const [hasDipped, setHasDipped] = useState(false);
  const location = locations[branch];
  const salsa = salsas[salsaIndex];
  const review = reviews[reviewIndex];
  const call = `tel:+1${location.phone.replaceAll("-", "")}`;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.address}, Clarksville, TN`)}`;
  const googleReviews = "https://www.google.com/maps/search/?api=1&query=El+Grullo+Express+1951+Fort+Campbell+Blvd+Clarksville+TN";
  const dipTaco = () => {
    if (dipping) return;
    setDipping(true);
    setHasDipped(true);
  };

  return (
    <div className="grullo min-h-screen overflow-x-hidden bg-[#110E0C] text-[#F5E7CF] selection:bg-[#C8102E] selection:text-white">
      <a href="#main" className={`sr-only z-50 bg-[#F59E0B] p-3 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4 ${focus}`}>Skip to content</a>
      <PapelPicado />
      <header className="mx-auto max-w-7xl px-5 pb-5 pt-7 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-5 border-b-2 border-dashed border-[#F5E7CF]/20 pb-6">
          <a href="#main" className={`wordmark ${focus}`} aria-label="El Grullo Express home"><span className="block text-[10px] font-bold tracking-[.3em] text-[#F59E0B]">TAQUERÍA • CLARKSVILLE, TN</span><span className="rustic block text-3xl">EL GRULLO <i className="text-[#C8102E]">Express</i></span></a>
          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-[.12em] sm:gap-8"><a href="#menu" className={`hover:text-[#F59E0B] ${focus}`}>La carta</a><a href="#reviews" className={`hover:text-[#F59E0B] ${focus}`}>La gente</a><a href="#visit" className={`hover:text-[#F59E0B] ${focus}`}>Encuéntranos</a><a href={call} className={`sign-button small ${focus}`}><Phone size={15} aria-hidden="true" />Call to order</a></nav>
        </div>
      </header>
      <main id="main">
        <section className="mx-auto max-w-7xl px-5 pb-14 pt-5 sm:px-8" aria-labelledby="hero-heading">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
            <p className="flex items-center gap-2 text-xs font-bold tracking-[.1em] text-[#C4AE91]"><MapPin size={16} className="text-[#82A84B]" aria-hidden="true" />FORT CAMPBELL BLVD · DOS TAQUERÍAS</p>
            <div className="road-switch" role="group" aria-label="Choose your branch">{locations.map((item, index) => <button key={item.name} type="button" aria-pressed={branch === index} onClick={() => setBranch(index)} className={`road-option ${branch === index ? "selected" : ""} ${focus}`}><ArrowUpRight size={18} aria-hidden="true" /><span>{item.name}<small>{index === 0 ? "1951" : "3195"} Ft Campbell Blvd</small></span></button>)}</div>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="relative pb-3">
              <div className="mb-6 flex items-center gap-4"><span className="h-px w-10 bg-[#C8102E]" /><p className="handwritten text-2xl text-[#F59E0B]">¡Aquí se come rico!</p></div>
              <h1 id="hero-heading" className="rustic hero-type">REAL STREET<br /><span className="text-[#F59E0B]">TACOS.</span><br /><span className="hero-outline">LEGENDARY</span><br />BIRRIA<span className="text-[#C8102E]">.</span></h1>
              <p className="mt-7 max-w-md text-base leading-7 text-[#D3BEA3]">A little messy. A little spicy. A whole lot of sabor. Pull up for Mexican street-food favorites on Fort Campbell Boulevard.</p>
              <div className="mt-7 flex flex-wrap gap-4"><a href="#menu" className={`sign-button ${focus}`}>Antojitos & especialidades<ArrowDown size={17} aria-hidden="true" /></a><a href={call} className={`outline-button ${focus}`}><Phone size={17} aria-hidden="true" />Call {location.name}</a></div>
              <a href={googleReviews} target="_blank" rel="noopener noreferrer" className={`rating-stamp mt-8 inline-flex items-center gap-3 ${focus}`}><Star size={22} fill="currentColor" aria-hidden="true" /><span><strong className="rustic text-xl">4.5 ★ ON GOOGLE</strong><small className="block text-[10px] tracking-[.1em]">EXPRESS · 1,360+ REVIEWS</small></span><ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
            <div className="relative">
              <div className="price-seal absolute -right-2 -top-5 z-10 sm:-right-4"><span className="text-[10px] font-bold uppercase tracking-widest">Birria quesa tacos</span><strong className="rustic text-3xl">$14.99</strong><span className="text-[10px]">EL MERO MERO</span></div>
              <article className="sauce-board">
                <p className="text-center text-[10px] font-bold uppercase tracking-[.24em] text-[#C4AE91]">THE BIRRIA RITUAL</p>
                <h2 className="rustic mt-2 text-center text-3xl sm:text-4xl">Dip. Bite. <i className="text-[#F59E0B]">Repeat.</i></h2>
                <div onAnimationEnd={(event) => { if (event.animationName.includes("taco-dunk")) setDipping(false); }}><TacoIllustration dipping={dipping} /></div>
                <p className="mb-5 text-center text-xs uppercase tracking-[.15em] text-[#D3BEA3]">Quesabirrias con consomé</p>
                <div className="border-t border-dashed border-[#F5E7CF]/25 pt-5"><h3 className="rustic text-xl">Order Combinación & Sauce Bar</h3><p className="mt-2 text-xs leading-5 text-[#C4AE91]">Pick your heat. Take a virtual dip. Ask your branch for available salsas when you order.</p></div>
                <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="Choose salsa for the interactive showcase">{salsas.map((item, index) => <button key={item.name} type="button" aria-pressed={index === salsaIndex} onClick={() => setSalsaIndex(index)} className={`salsa-choice ${index === salsaIndex ? "active" : ""} ${focus}`} style={{ borderColor: index === salsaIndex ? item.color : undefined }}><span className="mb-2 flex items-center justify-center gap-1" style={{ color: item.color }}>{Array.from({ length: item.flameCount }, (_, flame) => <Flame key={flame} size={15} fill="currentColor" aria-hidden="true" />)}</span><span className="block text-xs font-bold">{item.name}</span><span className="mt-1 block text-[9px] text-[#C4AE91]">{item.heat}</span></button>)}</div>
                <button type="button" disabled={dipping} onClick={dipTaco} className={`sign-button mt-5 w-full disabled:cursor-wait disabled:opacity-70 ${focus}`}>{dipping ? "¡A mojar el taco!" : "Dale un Dip al Consomé"}<UtensilsCrossed size={17} aria-hidden="true" /></button>
                <p className="mt-3 min-h-5 text-center text-xs text-[#D3BEA3]" role="status">{dipping ? `Dipping… ${salsa.name} on the side!` : hasDipped ? `¡Buen provecho! ${salsa.name} selected.` : "A little consomé makes a big difference."}</p>
                <a href={call} className={`mt-3 flex items-center justify-center gap-2 text-xs font-bold text-[#F59E0B] underline underline-offset-4 ${focus}`}>Hungry? Call to order the real thing<ArrowUpRight size={14} aria-hidden="true" /></a>
              </article>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-dashed border-[#F5E7CF]/20 py-5 text-xs text-[#D3BEA3]" aria-live="polite" aria-atomic="true"><p className="flex items-center gap-2"><MapPin size={16} className="text-[#82A84B]" aria-hidden="true" />{location.address} · Clarksville, TN</p><p className="flex items-center gap-2"><Clock3 size={16} className="text-[#F59E0B]" aria-hidden="true" />Sun–Thu {location.opens}–10 PM · Fri–Sat {location.opens}–11 PM</p></div>
        </section>
        <div className="fiesta-strip py-5 text-center"><p className="rustic px-5 text-xl tracking-widest sm:text-2xl">HECHO CON SABOR <span className="mx-3 text-[#F59E0B] sm:mx-7">✦</span> SERVED WITH SOUL</p></div>
        <section id="menu" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="menu-heading">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-6"><div><p className="handwritten text-2xl text-[#82A84B]">Para quitar el antojo.</p><h2 id="menu-heading" className="rustic mt-3 text-4xl uppercase sm:text-5xl">Antojitos &<br /><span className="text-[#F59E0B]">Especialidades</span></h2></div><p className="max-w-xs text-sm leading-6 text-[#C4AE91]">The favorites. The comforts. The “one more bite” kind of good. Choose your craving below.</p></div>
          <div className="menu-filters" role="group" aria-label="Filter menu by category">{categories.map((item, index) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)} className={`menu-filter ${category === item ? "chosen" : ""} ${focus}`}><span className="mr-2 text-xs opacity-60">0{index + 1}</span>{item}</button>)}</div>
          <div className="menu-board mt-7" aria-live="polite" aria-atomic="true"><div className="mb-2 flex items-center justify-between border-b-2 border-double border-[#F5E7CF]/25 pb-5"><p className="rustic text-lg uppercase tracking-widest">La carta <span className="ml-2 text-[#82A84B]">✦</span></p><p className="text-[10px] font-bold uppercase tracking-widest text-[#C4AE91]">{location.name} · Made for your appetite</p></div>
            <div className="grid md:grid-cols-2">{menu.filter((item) => item.category === category).map((item, index) => <article key={item.name} className="menu-item"><div className="mb-5 flex items-center gap-3"><span className="rustic text-4xl text-[#F5E7CF]/20">0{index + 1}</span><span className="text-[9px] font-bold tracking-[.2em] text-[#82A84B]">{item.label}</span></div><h3 className="rustic max-w-xs text-3xl">{menuTitles[item.name].title}</h3><p className="mt-2 text-[11px] uppercase tracking-wider text-[#F59E0B]">{menuTitles[item.name].detail}</p><p className="mt-4 max-w-sm text-sm leading-6 text-[#C4AE91]">{item.description}</p><div className="mt-6 flex items-center justify-between gap-4"><span className="menu-price rustic">{item.price === null ? "Ask us" : money(item.price)}</span><a href={call} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:text-[#F59E0B] ${focus}`} aria-label={`Call ${location.name} about ${item.name}`}>Call to order<ArrowUpRight size={16} aria-hidden="true" /></a></div></article>)}</div>
            <p className="border-t border-dashed border-[#F5E7CF]/20 pt-5 text-xs leading-6 text-[#C4AE91]">Prices before tax. Menu, prices, and availability may vary by branch. Ask about today&apos;s caldos and desserts.</p>
          </div>
        </section>
        <section id="reviews" className="reviews-wall scroll-mt-8 py-16 sm:py-20" aria-labelledby="reviews-heading"><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr]"><div><p className="handwritten text-2xl text-[#F59E0B]">La gente dice…</p><h2 id="reviews-heading" className="rustic mt-3 text-4xl uppercase sm:text-5xl">Good food.<br />Great company.<br /><span className="text-[#82A84B]">Local love.</span></h2><p className="mt-6 max-w-sm text-sm leading-7 text-[#C4AE91]">A few words from people who pulled up hungry. Real Google review excerpts for Express, republished by Wanderlog.</p><a href={googleReviews} target="_blank" rel="noopener noreferrer" className={`rating-stamp mt-6 inline-flex items-center gap-3 ${focus}`}><Star size={22} fill="currentColor" aria-hidden="true" /><span><strong className="rustic text-xl">4.5 / 5</strong><small className="ml-3 text-[10px] font-bold">EXPRESS ON GOOGLE</small></span><ArrowUpRight size={16} aria-hidden="true" /></a></div>
          <div className="relative mx-auto w-full max-w-lg"><article className="guest-check"><div className="receipt-top"><p className="rustic text-3xl">EL GRULLO EXPRESS</p><p className="mt-1 text-[10px] tracking-[.2em]">CLARKSVILLE, TENNESSEE</p></div><div className="my-5 flex justify-between border-y border-dashed border-[#51382A]/40 py-3 text-[10px] tracking-widest"><span>GUEST CHECK</span><span>NO. 00{reviewIndex + 1}</span></div><div aria-live="polite" aria-atomic="true" className="min-h-60"><p className="text-xs font-bold tracking-[.18em] text-[#006341]">{review.topic}</p><blockquote className="rustic mt-5 text-3xl leading-snug sm:text-4xl">“{review.text}”</blockquote><p className="mt-6 text-sm font-bold">— {review.author}</p><p className="mt-1 text-[10px] tracking-widest">GOOGLE REVIEW EXCERPT</p></div><a href={review.source} target="_blank" rel="noopener noreferrer" className={`mt-5 flex items-center justify-between border-t border-dashed border-[#51382A]/40 pt-4 text-[10px] uppercase tracking-widest ${focus}`}>Read the source on Wanderlog<ArrowUpRight size={14} aria-hidden="true" /></a><p className="handwritten mt-6 text-center text-2xl text-[#C8102E]">¡Gracias por visitarnos!</p></article><div className="mt-7 flex items-center justify-between"><p className="text-xs text-[#C4AE91]">{reviewIndex + 1} / {reviews.length} · Notes from the neighborhood</p><div className="flex gap-3"><button type="button" onClick={() => setReviewIndex((index) => (index + reviews.length - 1) % reviews.length)} aria-label="Previous review" className={`receipt-arrow ${focus}`}><ChevronLeft size={18} aria-hidden="true" /></button><button type="button" onClick={() => setReviewIndex((index) => (index + 1) % reviews.length)} aria-label="Next review" className={`receipt-arrow ${focus}`}><ChevronRight size={18} aria-hidden="true" /></button></div></div></div>
        </div></section>
        <section id="visit" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="visit-heading"><div className="mb-9 text-center"><p className="handwritten text-2xl text-[#F59E0B]">Nos vemos pronto.</p><h2 id="visit-heading" className="rustic mt-3 text-4xl uppercase sm:text-5xl">Follow the craving.</h2><p className="mt-4 text-sm text-[#C4AE91]">Two stops on Fort Campbell Boulevard. Pick yours.</p></div><div className="grid gap-6 md:grid-cols-2">{locations.map((item, index) => <article key={item.name} className={`location-sign ${branch === index ? "location-selected" : ""}`}><div className="mb-6 flex items-center justify-between gap-3"><p className="text-[10px] uppercase tracking-[.2em] text-[#D3BEA3]">CLARKSVILLE, TN · {index === 0 ? "1951" : "3195"}</p>{branch === index && <span className="flex items-center gap-1 text-[10px] font-bold text-[#B9D88A]"><Check size={13} aria-hidden="true" />SELECTED</span>}</div><h3 className="rustic text-3xl sm:text-4xl">{index === 0 ? "El Grullo Express" : "Taquería #4"}</h3><address className="mt-4 text-sm not-italic leading-7 text-[#D3BEA3]">{item.address}<br />Clarksville, TN<br /><a href={`tel:+1${item.phone.replaceAll("-", "")}`} className={`text-base font-bold text-[#F5E7CF] ${focus}`}>{item.phone}</a></address><dl className="mt-5 space-y-2 border-y border-dashed border-[#F5E7CF]/30 py-4 text-xs"><div className="flex justify-between gap-4"><dt>Sunday–Thursday</dt><dd>{item.opens}–10 PM</dd></div><div className="flex justify-between gap-4"><dt>Friday–Saturday</dt><dd>{item.opens}–11 PM</dd></div></dl><button type="button" onClick={() => setBranch(index)} aria-pressed={branch === index} className={`outline-button mt-6 w-full ${focus}`}>{branch === index ? "Your selected branch" : "Choose this branch"}<ArrowUpRight size={16} aria-hidden="true" /></button></article>)}</div><div className="mt-8 flex flex-wrap items-center justify-center gap-4"><a href={maps} target="_blank" rel="noopener noreferrer" className={`sign-button ${focus}`}><MapPin size={17} aria-hidden="true" />Directions to {location.name}</a><a href={call} className={`outline-button ${focus}`}><Phone size={17} aria-hidden="true" />Call {location.name}</a></div></section>
      </main>
      <footer className="footer-fiesta px-5 py-10 sm:px-8"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5"><div><p className="rustic text-2xl">EL GRULLO EXPRESS</p><p className="mt-2 text-[10px] uppercase tracking-[.2em]">Mexican roots. Clarksville appetite.</p></div><p className="handwritten text-2xl text-[#F59E0B]">Con mucho sabor.</p><a href="#main" className={`text-xs uppercase tracking-widest ${focus}`}>Back to top ↑</a></div></footer>
    </div>
  );
}
