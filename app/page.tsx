"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Clock3, Flame, MapPin, Phone, Quote, Star, UtensilsCrossed } from "lucide-react";

// Drop into an App Router project with Tailwind CSS and lucide-react installed.
// Contact details, prices, and the 1,360+ count are supplied by the owner.
// Review excerpts are Google reviews republished by Wanderlog (sources below).
// Replace the illustrative food photography with approved restaurant photos.

const locations = [
  { name: "Express", address: "1951 Fort Campbell Blvd", phone: "931-378-4089", opens: "6 AM", note: "Drive-thru convenience. Big Mexican flavor." },
  { name: "El Grullo #4", address: "3195 Fort Campbell Blvd", phone: "931-216-4474", opens: "7 AM", note: "Your other neighborhood stop for authentic flavor." },
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
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400";
const primary = `inline-flex items-center justify-center gap-2 rounded-full bg-[#F59E0B] px-6 py-3 text-sm font-bold text-[#0C0F0E] transition hover:bg-amber-300 ${focus}`;
const secondary = `inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-amber-400 hover:bg-white/5 ${focus}`;

function Stars() {
  return <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#F59E0B]"><Star size={16} aria-hidden="true" />From Google reviews</span>;
}

export default function Page() {
  const [branch, setBranch] = useState(0);
  const [category, setCategory] = useState<Category>("Birria Specials");
  const [reviewIndex, setReviewIndex] = useState(0);
  const [photoFailed, setPhotoFailed] = useState(false);
  const location = locations[branch];
  const review = reviews[reviewIndex];
  const call = `tel:+1${location.phone.replaceAll("-", "")}`;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`El Grullo ${location.address}, Clarksville, TN`)}`;
  const googleReviews = "https://www.google.com/maps/search/?api=1&query=El+Grullo+Express+1951+Fort+Campbell+Blvd+Clarksville+TN";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0C0F0E] font-sans text-white selection:bg-[#006847] selection:text-white">
      <a href="#main" className={`sr-only z-50 rounded bg-amber-400 p-3 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4 ${focus}`}>Skip to content</a>
      <div className="flex h-1" aria-hidden="true"><div className="w-1/3 bg-[#006847]" /><div className="w-1/3 bg-white" /><div className="w-1/3 bg-[#CE1126]" /></div>
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-6 lg:px-10">
          <a href="#" aria-label="El Grullo Express home" className={`flex items-center gap-3 ${focus}`}>
            <span className="rounded-full border border-amber-400/40 p-3 text-amber-400"><UtensilsCrossed size={23} aria-hidden="true" /></span>
            <span className="text-xl font-black uppercase tracking-tight">El Grullo<span className="block text-[10px] font-semibold tracking-[0.38em] text-amber-400">EXPRESS · CLARKSVILLE</span></span>
          </a>
          <nav aria-label="Main navigation" className="flex items-center gap-5 text-sm text-stone-300 sm:gap-8">
            <a className={focus} href="#menu">Menu</a><a className={focus} href="#reviews">Reviews</a><a className={focus} href="#visit">Visit us</a>
            <a href={call} className={`${primary} hidden sm:inline-flex`}><Phone size={16} aria-hidden="true" />Call to order</a>
          </nav>
        </div>
      </header>
      <main id="main">
        <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-10 lg:pt-14" aria-labelledby="hero-heading">
          <div className="pointer-events-none absolute right-0 top-32 h-96 w-96 rounded-full bg-[#006847]/20 blur-3xl" aria-hidden="true" />
          <div className="relative mb-12 flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-400"><MapPin size={15} className="text-amber-400" aria-hidden="true" />Two spots. One authentic taste.</p>
            <div className="flex rounded-full border border-white/10 bg-white/5 p-1" role="group" aria-label="Select a restaurant location">
              {locations.map((item, index) => <button key={item.name} type="button" aria-pressed={branch === index} onClick={() => setBranch(index)} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${focus} ${branch === index ? "bg-[#006847] text-white" : "text-stone-300 hover:bg-white/10"}`}>{item.name}</button>)}
            </div>
          </div>
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-5 flex items-center gap-2 text-xs font-bold tracking-[0.24em] text-amber-400"><Flame size={17} aria-hidden="true" />FROM MEXICO. WITH LOVE.</p>
              <h1 id="hero-heading" className="text-5xl font-black uppercase leading-[0.98] tracking-[-0.055em] sm:text-7xl xl:text-8xl">Real street<br />tacos.<br /><span className="text-[#F59E0B]">Legendary<br />birria.</span></h1>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-stone-300">Bold flavors. Comforting classics. Your next favorite bite is right here on Fort Campbell Boulevard.</p>
              <div className="mt-8 flex flex-wrap gap-3"><a href="#menu" className={primary}>Find your craving<ArrowDown size={16} aria-hidden="true" /></a><a href={call} className={secondary}><Phone size={16} aria-hidden="true" />Call {location.name}</a></div>
              <a href={googleReviews} target="_blank" rel="noopener noreferrer" className={`mt-8 inline-flex flex-wrap items-center gap-3 rounded-full border border-white/10 px-4 py-3 text-xs ${focus}`} aria-label="View El Grullo Express on Google Maps, rated 4.5 out of 5">
                <Star size={17} fill="currentColor" className="text-amber-400" aria-hidden="true" /><strong>4.5 / 5</strong><span className="text-stone-300">Google · Express · 1,360+ reviews</span><ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="absolute -right-3 -top-5 z-10 rotate-6 rounded-full bg-[#CE1126] px-5 py-4 text-center text-xs font-black uppercase shadow-xl sm:-right-5">Dip it.<br />Love it.<br />Repeat.</div>
              <article className="overflow-hidden rounded-[2rem] border border-white/15 bg-[#151B17] shadow-2xl">
                <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-[#006847] via-[#17271c] to-[#CE1126]/30">
                  {photoFailed ? <UtensilsCrossed size={110} className="text-amber-400/60" aria-hidden="true" /> : (
                    // Native image keeps this single-file page free of next.config image rules.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=85" alt="Illustrative Mexican taco photography" width={1200} height={900} fetchPriority="high" onError={() => setPhotoFailed(true)} className="h-full w-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151B17] via-transparent to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-4 left-6 rounded-full bg-black/60 px-3 py-1 text-[10px] text-stone-300">Illustrative photography</span>
                </div>
                <div className="relative px-7 pb-7 pt-3">
                  <p className="mb-3 text-xs font-bold tracking-[0.2em] text-amber-400">THE MAIN EVENT</p>
                  <div className="flex items-start justify-between gap-4"><h2 className="text-3xl font-black tracking-tight">Birria<br />Quesa Tacos</h2><span className="pt-1 text-2xl font-black text-amber-400">$14.99</span></div>
                  <p className="mt-4 text-sm leading-relaxed text-stone-300">Rich birria. Melty cheese. A craving worth making a trip for.</p>
                  <a href={call} className={`${primary} mt-6 w-full`}>Call to order<ArrowUpRight size={17} aria-hidden="true" /></a>
                </div>
              </article>
            </div>
          </div>
          <div className="relative mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-stone-300" aria-live="polite" aria-atomic="true">
            <span className="flex items-center gap-2"><MapPin size={17} className="text-amber-400" aria-hidden="true" />{location.address}, Clarksville, TN</span>
            <span className="flex items-center gap-2"><Clock3 size={17} className="text-amber-400" aria-hidden="true" />Sun–Thu {location.opens}–10 PM · Fri–Sat until 11 PM</span>
          </div>
        </section>
        <div className="border-y border-white/10 bg-[#006847] px-6 py-5 text-center text-xs font-black uppercase tracking-[0.2em] sm:text-sm">Mexican roots <span className="mx-4 text-amber-400">✦</span> Clarksville soul <span className="mx-4 text-amber-400">✦</span> Come hungry</div>
        <section id="menu" aria-labelledby="menu-heading" className="mx-auto max-w-7xl scroll-mt-8 px-6 py-20 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold tracking-[0.2em] text-amber-400">GOOD FOOD. ZERO COMPLICATIONS.</p><h2 id="menu-heading" className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Pick your obsession.</h2></div><p className="max-w-xs text-sm leading-relaxed text-stone-400">A few favorites to get you started. Call your branch for the full menu.</p></div>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter menu by category">
            {categories.map((item) => <button key={item} type="button" aria-pressed={item === category} onClick={() => setCategory(item)} className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${focus} ${item === category ? "border-amber-400 bg-amber-400 text-black" : "border-white/15 text-stone-300 hover:border-white/40"}`}>{item}</button>)}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-live="polite" aria-atomic="true">
            {menu.filter((item) => item.category === category).map((item, index) => <article key={item.name} className="group flex flex-col rounded-3xl border border-white/10 bg-[#151B17] p-7 transition hover:border-amber-400/50">
              <div className="mb-7 flex items-center justify-between"><span className="text-xs font-bold tracking-[0.15em] text-amber-400">{item.label}</span><span className="text-3xl font-black text-white/10">0{index + 1}</span></div>
              <h3 className="text-2xl font-bold tracking-tight">{item.name}</h3><p className="mb-8 mt-3 flex-1 text-sm leading-relaxed text-stone-300">{item.description}</p>
              <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-5"><span className="text-xl font-bold">{item.price === null ? "Call for pricing" : money(item.price)}</span><a href={call} aria-label={`Call ${location.name} about ${item.name}`} className={`rounded-full border border-white/20 p-3 text-amber-400 transition hover:bg-[#006847] ${focus}`}><ArrowUpRight size={19} aria-hidden="true" /></a></div>
            </article>)}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-stone-400">Prices shown before tax. Menu, availability, and prices may vary by location. Ask about today&apos;s desserts.</p>
        </section>
        <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-8 border-y border-white/10 bg-[#121713]">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.4fr] lg:px-10">
            <div><p className="text-xs font-bold tracking-[0.2em] text-amber-400">WORD ON THE STREET</p><h2 id="reviews-heading" className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">The locals<br />get it.</h2><p className="mt-5 max-w-sm text-sm leading-relaxed text-stone-300">Real Google review excerpts for El Grullo Express, republished by Wanderlog.</p><a href={googleReviews} target="_blank" rel="noopener noreferrer" className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 ${focus}`}>Explore Google reviews<ArrowUpRight size={17} aria-hidden="true" /></a></div>
            <div className="rounded-3xl border border-white/10 bg-[#0C0F0E] p-7 sm:p-10">
              <div className="flex items-center justify-between"><Stars /><Quote size={34} className="text-[#006847]" aria-hidden="true" /></div>
              <div aria-live="polite" aria-atomic="true" className="min-h-56 pt-7"><p className="text-xs font-bold tracking-[0.2em] text-stone-400">{review.topic}</p><blockquote className="mt-4 text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl">“{review.text}”</blockquote><p className="mt-5 text-sm font-bold">{review.author}<span className="ml-2 font-normal text-stone-400">· Google review excerpt</span></p><a href={review.source} target="_blank" rel="noopener noreferrer" className={`mt-2 inline-block text-xs text-stone-400 underline underline-offset-4 ${focus}`}>Read source on Wanderlog</a></div>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5"><div className="flex gap-2" role="group" aria-label="Choose review">{reviews.map((item, index) => <button key={item.author} type="button" aria-label={`Show review ${index + 1} by ${item.author}`} aria-pressed={index === reviewIndex} onClick={() => setReviewIndex(index)} className={`flex h-10 w-10 items-center justify-center rounded-full ${focus}`}><span className={`h-2 rounded-full transition-all ${index === reviewIndex ? "w-6 bg-amber-400" : "w-2 bg-stone-500"}`} /></button>)}</div><div className="flex gap-2"><button type="button" aria-label="Previous review" onClick={() => setReviewIndex((index) => (index + reviews.length - 1) % reviews.length)} className={`rounded-full border border-white/20 p-3 hover:bg-white/10 ${focus}`}><ChevronLeft size={18} aria-hidden="true" /></button><button type="button" aria-label="Next review" onClick={() => setReviewIndex((index) => (index + 1) % reviews.length)} className={`rounded-full border border-white/20 p-3 hover:bg-white/10 ${focus}`}><ChevronRight size={18} aria-hidden="true" /></button></div></div>
            </div>
          </div>
        </section>
        <section id="visit" aria-labelledby="visit-heading" className="mx-auto max-w-7xl scroll-mt-8 px-6 py-20 lg:px-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#006847] p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-12 -top-20 h-80 w-80 rounded-full border-[45px] border-white/5" aria-hidden="true" />
            <p className="relative text-xs font-bold tracking-[0.2em] text-amber-300">YOUR NEXT STOP</p><h2 id="visit-heading" className="relative mt-3 text-4xl font-black tracking-tight sm:text-6xl">Less scrolling.<br />More tacos.</h2>
            <div className="relative mt-8 grid gap-8 md:grid-cols-2"><div aria-live="polite" aria-atomic="true"><h3 className="text-xl font-bold">El Grullo {location.name === "Express" ? "Express" : "#4"}</h3><p className="mt-2 text-white/80">{location.note}</p><address className="mt-5 text-sm not-italic leading-7">{location.address}<br />Clarksville, TN<br /><a href={call} className={`font-bold underline underline-offset-4 ${focus}`}>{location.phone}</a></address></div><div><p className="flex items-center gap-2 font-bold"><Clock3 size={18} aria-hidden="true" />Opening hours</p><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between gap-5 border-b border-white/20 pb-3"><dt>Sunday–Thursday</dt><dd>{location.opens}–10 PM</dd></div><div className="flex justify-between gap-5"><dt>Friday–Saturday</dt><dd>{location.opens}–11 PM</dd></div></dl><div className="mt-7 flex flex-wrap gap-3"><a href={maps} target="_blank" rel="noopener noreferrer" className={primary}><MapPin size={16} aria-hidden="true" />Get directions</a><a href={call} className={secondary}><Phone size={16} aria-hidden="true" />Call the branch</a></div></div></div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 px-6 py-8"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs text-stone-400"><p className="font-bold uppercase tracking-[0.15em] text-white">El Grullo Express · Clarksville, TN</p><p>Mexican roots. Made for your appetite.</p><a href="#main" className={`text-amber-400 ${focus}`}>Back to top ↑</a></div></footer>
    </div>
  );
}
