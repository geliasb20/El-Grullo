"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flame,
  MapPin,
  Phone,
  Star,
  UtensilsCrossed,
} from "lucide-react";

const locations = [
  {
    name: "Express",
    title: "El Grullo Express",
    address: "1951 Fort Campbell Blvd",
    phone: "931-378-4089",
    opens: "6 AM",
  },
  {
    name: "Taquería #4",
    title: "Taquería #4",
    address: "3195 Fort Campbell Blvd",
    phone: "931-216-4474",
    opens: "7 AM",
  },
] as const;

const categories = [
  "Birria Specials",
  "Street Tacos",
  "Platos & Caldos",
  "Bebidas",
] as const;

type Category = (typeof categories)[number];

const menu: {
  name: string;
  category: Category;
  price: number | null;
  ingredients: string;
  description: string;
  badge: string;
}[] = [
  {
    name: "Quesabirrias con Consomé",
    category: "Birria Specials",
    price: 14.99,
    ingredients: "Birria · queso · consomé",
    description: "Rich birria, melty cheese, and a consomé dip worth slowing down for.",
    badge: "EL FAVORITO",
  },
  {
    name: "Pizza Birria",
    category: "Birria Specials",
    price: 28.67,
    ingredients: "Birria · queso · made to share",
    description: "Bring your appetite and your favorite people. This one belongs in the middle of the table.",
    badge: "PARA COMPARTIR",
  },
  {
    name: "1 Street Taco",
    category: "Street Tacos",
    price: 5.04,
    ingredients: "Street-style taco · ask about fillings",
    description: "Big Mexican street flavor in one delicious taco.",
    badge: "DE LA CALLE",
  },
  {
    name: "Carne Asada Fries",
    category: "Platos & Caldos",
    price: 13.26,
    ingredients: "Carne asada · fries",
    description: "A hearty favorite for when a little snack just will not do.",
    badge: "BIEN SERVIDO",
  },
  {
    name: "Menudo y Pozole",
    category: "Platos & Caldos",
    price: null,
    ingredients: "Traditional caldos · ask about availability",
    description: "Comfort by the bowl. Call your selected branch for today's caldos.",
    badge: "COMO EN CASA",
  },
  {
    name: "Aguas Frescas de 32oz",
    category: "Bebidas",
    price: 6.92,
    ingredients: "32 ounces · ask about today's flavors",
    description: "Something cool and refreshing to keep your favorite flavors company.",
    badge: "BIEN FRESQUITAS",
  },
];

const salsas = [
  { name: "Verde Suave", heat: "Mild & mellow", color: "#006341", flames: 1 },
  { name: "Roja Picante", heat: "A little kick", color: "#C8102E", flames: 2 },
  { name: "Habanero Fuego", heat: "Bring the heat", color: "#B45309", flames: 3 },
] as const;

const reviews = [
  {
    author: "Branson D",
    topic: "THE BIRRIA",
    quote: "Had the birria tacos, one of the best meals",
    source: "https://wanderlog.com/list/geoCategory/1269369/best-mexican-foods-and-restaurants-in-clarksville",
  },
  {
    author: "Nichole M",
    topic: "THE DRIVE-THRU",
    quote: "didn't have to wait longer then 10 minutes",
    source: "https://wanderlog.com/place/details/4095347/el-grullo-express",
  },
  {
    author: "Bobbie S",
    topic: "THE FLAVOR",
    quote: "Authentic Mexican food at its finest taste!!",
    source: "https://wanderlog.com/place/details/4095347/el-grullo-express",
  },
] as const;

const googleReviews =
  "https://www.google.com/maps/search/?api=1&query=El+Grullo+Express+1951+Fort+Campbell+Blvd+Clarksville+TN";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006341]";

const card =
  "rounded-3xl border-2 border-[#D8BE9E] bg-[#FFFDF9] shadow-[0_12px_28px_rgba(78,38,14,0.1),inset_0_0_20px_rgba(139,44,18,0.05)]";

const primary =
  "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#9F0D25] bg-[#C8102E] px-5 py-3 text-sm font-bold text-white shadow-[3px_3px_0_#E7C5A3] transition hover:bg-[#A80D27] " +
  focus;

const secondary =
  "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#D8BE9E] bg-[#FFFDF9] px-5 py-3 text-sm font-bold text-[#006341] transition hover:bg-[#F3E8D6] " +
  focus;

const phoneLink = (phone: string) => "tel:+1" + phone.replaceAll("-", "");

const directionsLink = (address: string) =>
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(address + ", Clarksville, TN");

const styles = [
  ".masa-page{background-color:#FDF8F0;background-image:radial-gradient(#9A644817 .7px,transparent .7px);background-size:5px 5px;color:#432D21;}",
  ".masa-page .rustic{font-family:Georgia,'Times New Roman',serif;font-weight:900;letter-spacing:-.035em;}",
  ".masa-page .handwritten{font-family:Georgia,'Times New Roman',serif;font-style:italic;}",
  ".masa-page .hero-lettering{font-size:clamp(2.7rem,6.2vw,5.4rem);line-height:1.02;letter-spacing:-.055em;}",
  ".masa-page .toasted-card{position:relative;background-image:radial-gradient(ellipse at 0 0,#A84E1910,transparent 45%),radial-gradient(ellipse at 100% 100%,#9A45130D,transparent 50%);}",
  ".masa-page .picado-flag{flex-shrink:0;transform-origin:top center;animation:masa-papel-sway 5s ease-in-out infinite;}",
  ".masa-page .taco{transform-origin:180px 110px;}",
  ".masa-page .taco.dipping{animation:masa-taco-dunk 1.25s ease-in-out both;}",
  ".masa-page .steam{animation:masa-steam-rise 3s ease-in-out infinite;}",
  ".masa-page .splash{animation:masa-sauce-splash 1.25s ease-in-out both;}",
  ".masa-page .receipt{position:relative;}",
  ".masa-page .receipt:after{content:'';position:absolute;left:14px;right:14px;bottom:-9px;height:10px;background:linear-gradient(135deg,#FFFDF9 25%,transparent 25%) -5px 0/10px 10px,linear-gradient(225deg,#FFFDF9 25%,transparent 25%) -5px 0/10px 10px;}",
  "@keyframes masa-papel-sway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(3deg)}}",
  "@keyframes masa-taco-dunk{0%,100%{transform:translateY(0) rotate(0)}40%,60%{transform:translateY(64px) rotate(-12deg)}}",
  "@keyframes masa-steam-rise{0%,100%{opacity:.25;transform:translateY(2px)}50%{opacity:.6;transform:translateY(-5px)}}",
  "@keyframes masa-sauce-splash{0%,25%,85%,100%{opacity:0;transform:translateY(8px)}45%,60%{opacity:1;transform:translateY(-4px)}}",
  "@media(prefers-reduced-motion:reduce){.masa-page *,.masa-page *:before,.masa-page *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition:none!important;}}",
].join("\n");

function PapelPicado() {
  return (
    <div
      className="relative flex h-20 justify-center gap-3 overflow-hidden border-t-2 border-[#AD8256] px-2"
      aria-hidden="true"
    >
      {Array.from({ length: 18 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 90 78"
          className="picado-flag h-[66px] w-[76px]"
          style={{
            color: ["#006341", "#FFFDF9", "#C8102E"][index % 3],
            animationDelay: (index % 5) * -0.6 + "s",
            filter: "drop-shadow(0 3px 2px rgba(78,38,14,0.12))",
          }}
        >
          <defs>
            <mask id={"masa-flag-" + index}>
              <rect width="90" height="78" fill="white" />
              <path
                d="M0 70L9 78L18 70L27 78L36 70L45 78L54 70L63 78L72 70L81 78L90 70V78H0Z"
                fill="black"
              />
              <path
                d="M45 14L53 24L45 34L37 24ZM45 42L56 53L45 64L34 53Z"
                fill="black"
              />
              <g fill="black">
                <circle cx="18" cy="21" r="5" />
                <circle cx="72" cy="21" r="5" />
                <circle cx="18" cy="53" r="5" />
                <circle cx="72" cy="53" r="5" />
                <circle cx="29" cy="38" r="4" />
                <circle cx="61" cy="38" r="4" />
              </g>
            </mask>
          </defs>
          <rect
            width="90"
            height="78"
            fill="currentColor"
            mask={"url(#masa-flag-" + index + ")"}
          />
        </svg>
      ))}
    </div>
  );
}

function TacoIllustration({ dipping }: { dipping: boolean }) {
  return (
    <svg
      viewBox="0 0 360 290"
      className="mx-auto block w-full max-w-[350px]"
      role="img"
      aria-label={
        dipping
          ? "Birria taco dipping into consomé"
          : "Illustrated birria taco above a bowl of consomé"
      }
    >
      <ellipse cx="180" cy="266" rx="125" ry="12" fill="#713A1B" opacity=".12" />
      <g
        className="steam"
        fill="none"
        stroke="#A66D42"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M140 163q-12-15 0-29t0-27" />
        <path d="M183 154q-12-15 0-29t0-27" />
        <path d="M226 163q-12-15 0-29t0-27" />
      </g>
      <path
        d="M67 199q8 65 113 65t113-65"
        fill="#B85532"
        stroke="#8D3D25"
        strokeWidth="3"
      />
      <ellipse cx="180" cy="199" rx="113" ry="29" fill="#E4AC68" />
      <ellipse cx="180" cy="199" rx="102" ry="22" fill="#8F2D1C" />
      <g fill="#F59E0B" opacity=".65">
        <ellipse cx="122" cy="202" rx="9" ry="2" />
        <ellipse cx="223" cy="199" rx="12" ry="3" />
        <ellipse cx="178" cy="211" rx="8" ry="2" />
      </g>
      <g className={dipping ? "taco dipping" : "taco"}>
        <path
          d="M88 104q17-81 92-81t92 81q-21 45-92 45t-92-45"
          fill="#D7872F"
          stroke="#A86129"
          strokeWidth="3"
        />
        <path d="M98 100q81-37 164 0l-10 28q-72 30-143 0Z" fill="#6F301E" />
        <g stroke="#D07139" strokeWidth="8" strokeLinecap="round">
          <path d="M112 106l24 9m-3-17l26 20m7-14l22 17m9-22l28 13m7-8l18 8" />
        </g>
        <g stroke="#F3D891" strokeWidth="4" strokeLinecap="round">
          <path d="M113 113l27-6 18 17 22-16 20 15 28-14 20 9" />
          <path d="M130 126l22-7m44 7l26-8" />
        </g>
        <g fill="#59883D">
          <circle cx="121" cy="105" r="5" />
          <circle cx="170" cy="115" r="5" />
          <circle cx="215" cy="103" r="5" />
          <circle cx="235" cy="123" r="4" />
        </g>
        <g fill="#F1DDAB">
          <rect x="140" y="100" width="6" height="6" />
          <rect x="190" y="109" width="7" height="6" />
          <rect x="222" y="116" width="6" height="6" />
        </g>
        <path
          d="M91 105q88 30 177 0l-8 20q-80 41-160 0Z"
          fill="#E5A43D"
          stroke="#B47529"
          strokeWidth="3"
        />
        <g fill="#A86129" opacity=".5">
          <circle cx="139" cy="62" r="4" />
          <circle cx="195" cy="46" r="3" />
          <circle cx="226" cy="72" r="5" />
          <circle cx="157" cy="83" r="3" />
          <circle cx="177" cy="133" r="3" />
        </g>
      </g>
      <path
        d="M70 214q110 42 220 0q-18 51-110 51t-110-51"
        fill="#B85532"
        stroke="#8D3D25"
        strokeWidth="2"
      />
      <path d="M77 219q103 36 207 0" fill="none" stroke="#F5D4A2" strokeWidth="3" />
      {dipping && (
        <g className="splash" fill="#D36330">
          <ellipse cx="99" cy="181" rx="4" ry="8" />
          <ellipse cx="257" cy="174" rx="4" ry="9" />
          <circle cx="240" cy="164" r="4" />
          <circle cx="121" cy="166" r="3" />
        </g>
      )}
    </svg>
  );
}

export default function Page() {
  const [branch, setBranch] = useState(0);
  const [category, setCategory] = useState<Category>("Birria Specials");
  const [salsaIndex, setSalsaIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [dipping, setDipping] = useState(false);
  const [hasDipped, setHasDipped] = useState(false);

  const location = locations[branch];
  const salsa = salsas[salsaIndex];
  const review = reviews[reviewIndex];
  const call = phoneLink(location.phone);

  return (
    <div className="masa-page min-h-screen overflow-x-hidden font-sans selection:bg-[#C8102E] selection:text-white">
      <style>{styles}</style>

      <a
        href="#main"
        className={"sr-only z-50 rounded-xl bg-[#FFFDF9] p-4 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 " + focus}
      >
        Skip to content
      </a>

      <PapelPicado />

      <header className="mx-auto max-w-7xl px-5 pb-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b-2 border-dashed border-[#D8BE9E] pb-6">
          <a href="#main" className={focus} aria-label="El Grullo Express home">
            <span className="block text-[10px] font-bold tracking-[.24em] text-[#006341]">
              TAQUERÍA · CLARKSVILLE, TENNESSEE
            </span>
            <span className="rustic mt-1 block text-3xl text-[#432D21]">
              EL GRULLO <i className="text-[#C8102E]">Express</i>
            </span>
          </a>
          <nav
            aria-label="Main navigation"
            className="flex flex-wrap items-center gap-5 text-xs font-bold uppercase tracking-wider sm:gap-7"
          >
            <a href="#menu" className={"hover:text-[#C8102E] " + focus}>La carta</a>
            <a href="#reviews" className={"hover:text-[#C8102E] " + focus}>La gente</a>
            <a href="#visit" className={"hover:text-[#C8102E] " + focus}>Visítanos</a>
            <a href={call} className={primary}>
              <Phone size={15} aria-hidden="true" />
              Call to order
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section
          aria-labelledby="hero-heading"
          className="mx-auto max-w-7xl px-5 pb-14 pt-2 sm:px-8"
        >
          <div className="mb-12 flex flex-wrap items-center justify-between gap-5">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#765942]">
              <MapPin size={16} className="text-[#006341]" aria-hidden="true" />
              Two stops. One big appetite.
            </p>
            <div
              role="group"
              aria-label="Choose your restaurant branch"
              className="flex flex-wrap gap-2"
            >
              {locations.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={branch === index}
                  onClick={() => setBranch(index)}
                  className={
                    "flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition " +
                    (branch === index
                      ? "border-[#004B31] bg-[#006341] text-white shadow-[3px_3px_0_#D8BE9E] "
                      : "border-[#D8BE9E] bg-[#FFFDF9] text-[#432D21] hover:bg-[#F3E8D6] ") +
                    focus
                  }
                >
                  <ArrowUpRight size={19} aria-hidden="true" />
                  <span>
                    <strong className="rustic block text-base">{item.name}</strong>
                    <span className="block text-[10px]">
                      {index === 0 ? "1951" : "3195"} Ft Campbell Blvd
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="handwritten mb-6 text-2xl text-[#A14E26]">
                ¡Aquí se come rico!
              </p>
              <h1 id="hero-heading" className="rustic hero-lettering">
                REAL STREET
                <br />
                <span className="text-[#006341]">TACOS.</span>
                <br />
                <span className="text-[#A14E26]">LEGENDARY</span>
                <br />
                BIRRIA<span className="text-[#C8102E]">.</span>
              </h1>
              <p className="mt-7 max-w-md text-base leading-7 text-[#765942]">
                A little messy. A little spicy. A whole lot of sabor.
                Pull up for Mexican street-food favorites on Fort Campbell Boulevard.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <a href="#menu" className={primary}>
                  Find your antojo
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
                <a href={call} className={secondary}>
                  <Phone size={17} aria-hidden="true" />
                  Call {location.name}
                </a>
              </div>
              <a
                href={googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className={"mt-8 inline-flex -rotate-2 items-center gap-3 rounded-lg border-2 border-dashed border-[#BD8D5C] bg-[#FAF2E6] px-4 py-3 " + focus}
              >
                <Star size={23} fill="currentColor" className="text-[#D97706]" aria-hidden="true" />
                <span>
                  <strong className="rustic block text-xl">4.5 ★ ON GOOGLE</strong>
                  <span className="block text-[10px] tracking-wider text-[#765942]">
                    EXPRESS · 1,360+ REVIEWS
                  </span>
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>

            <article className={"toasted-card p-5 sm:p-8 " + card}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[.2em] text-[#006341]">
                    THE BIRRIA RITUAL
                  </p>
                  <h2 className="rustic mt-2 text-3xl sm:text-4xl">
                    Dip. Bite. <i className="text-[#A14E26]">Repeat.</i>
                  </h2>
                </div>
                <div className="flex h-24 w-24 shrink-0 rotate-6 flex-col items-center justify-center rounded-full border-4 border-double border-[#FFFDF9] bg-[#C8102E] text-white shadow-[0_0_0_3px_#C8102E]">
                  <span className="text-[9px] font-bold tracking-wider">QUESABIRRIAS</span>
                  <strong className="rustic text-2xl">$14.99</strong>
                  <span className="text-[9px]">EL FAVORITO</span>
                </div>
              </div>

              <div
                className="mt-4 rounded-2xl bg-[#FAF2E6]"
                onAnimationEnd={(event) => {
                  if (event.animationName === "masa-taco-dunk") {
                    setDipping(false);
                  }
                }}
              >
                <TacoIllustration dipping={dipping} />
              </div>

              <p className="mt-4 text-center text-xs font-bold uppercase tracking-widest text-[#A14E26]">
                Quesabirrias con Consomé
              </p>
              <div className="mt-5 border-t-2 border-dashed border-[#D8BE9E] pt-5">
                <h3 className="rustic text-xl">Choose your salsa. Find your fuego.</h3>
                <p className="mt-2 text-xs leading-5 text-[#765942]">
                  Pick your heat and take a virtual dip. Ask your branch for available salsas.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="Choose salsa heat">
                {salsas.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={salsaIndex === index}
                    onClick={() => setSalsaIndex(index)}
                    className={
                      "rounded-xl border-2 px-2 py-3 transition " +
                      (salsaIndex === index
                        ? "bg-[#FAF2E6] shadow-[inset_0_0_12px_rgba(139,44,18,0.06)] "
                        : "border-[#E5D2B9] bg-[#FFFDF9] hover:bg-[#FAF2E6] ") +
                      focus
                    }
                    style={{ borderColor: salsaIndex === index ? item.color : undefined }}
                  >
                    <span className="mb-2 flex justify-center gap-1" style={{ color: item.color }}>
                      {Array.from({ length: item.flames }, (_, flame) => (
                        <Flame key={flame} size={15} fill="currentColor" aria-hidden="true" />
                      ))}
                    </span>
                    <span className="block text-xs font-bold">{item.name}</span>
                    <span className="mt-1 block text-[9px] text-[#765942]">{item.heat}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={dipping}
                onClick={() => {
                  if (!dipping) {
                    setDipping(true);
                    setHasDipped(true);
                  }
                }}
                className={primary + " mt-5 w-full disabled:cursor-wait disabled:opacity-70"}
              >
                {dipping ? "¡A mojar el taco!" : "Dale un Dip al Consomé"}
                <UtensilsCrossed size={17} aria-hidden="true" />
              </button>
              <p role="status" className="mt-3 min-h-10 text-center text-xs leading-5 text-[#765942]">
                {dipping
                  ? "Dipping… " + salsa.name + " on the side!"
                  : hasDipped
                    ? "¡Buen provecho! " + salsa.name + " selected."
                    : "A little consomé makes a big difference."}
              </p>
              <a href={call} className={"flex items-center justify-center gap-2 text-xs font-bold text-[#006341] underline underline-offset-4 " + focus}>
                Call to order the real thing
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </article>
          </div>

          <div
            aria-live="polite"
            aria-atomic="true"
            className="mt-12 flex flex-wrap justify-between gap-4 border-y-2 border-dashed border-[#D8BE9E] py-5 text-xs text-[#765942]"
          >
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-[#006341]" aria-hidden="true" />
              {location.address} · Clarksville, TN
            </p>
            <p className="flex items-center gap-2">
              <Clock3 size={16} className="text-[#A14E26]" aria-hidden="true" />
              Sun–Thu {location.opens}–10 PM · Fri–Sat {location.opens}–11 PM
            </p>
          </div>
        </section>

        <div className="border-y-4 border-double border-[#FDF8F0]/60 bg-[#006341] px-5 py-5 text-center text-[#FFFDF9]">
          <p className="rustic text-xl tracking-wider sm:text-2xl">
            HECHO CON SABOR
            <span className="mx-3 text-[#F5BD60] sm:mx-7">✦</span>
            SERVED WITH SOUL
          </p>
        </div>

        <section id="menu" aria-labelledby="menu-heading" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="handwritten text-2xl text-[#A14E26]">Para quitar el antojo.</p>
              <h2 id="menu-heading" className="rustic mt-3 text-4xl uppercase sm:text-5xl">
                Antojitos &<br />
                <span className="text-[#006341]">Especialidades</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#765942]">
              The favorites. The comforts. The “one more bite” kind of good.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter menu by category">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={
                  "rounded-xl border-2 px-4 py-3 text-sm font-bold transition " +
                  (category === item
                    ? "border-[#004B31] bg-[#006341] text-white shadow-[3px_3px_0_#D8BE9E] "
                    : "border-[#D8BE9E] bg-[#FFFDF9] hover:bg-[#F3E8D6] ") +
                  focus
                }
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2" aria-live="polite" aria-atomic="true">
            {menu.filter((item) => item.category === category).map((item, index) => (
              <article key={item.name} className={"toasted-card flex flex-col p-7 sm:p-8 " + card}>
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[.18em] text-[#006341]">
                    {item.badge}
                  </span>
                  <span className="rustic text-4xl text-[#D8BE9E]">0{index + 1}</span>
                </div>
                <h3 className="rustic text-3xl">{item.name}</h3>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-[#A14E26]">
                  {item.ingredients}
                </p>
                <p className="mt-4 flex-1 text-sm leading-6 text-[#765942]">{item.description}</p>
                <div className="mt-7 flex items-center justify-between gap-4 border-t-2 border-dashed border-[#D8BE9E] pt-5">
                  <span className="rustic -rotate-3 rounded-lg border-2 border-dashed border-[#B77943] bg-[#FAF2E6] px-4 py-2 text-2xl text-[#A14E26]">
                    {item.price === null ? "Ask us" : "$" + item.price.toFixed(2)}
                  </span>
                  <a
                    href={call}
                    aria-label={"Call " + location.name + " about " + item.name}
                    className={"flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006341] " + focus}
                  >
                    Call to order
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-[#765942]">
            Prices before tax. Menu, prices, and availability may vary by branch.
            Ask about today&apos;s caldos and desserts.
          </p>
        </section>

        <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-8 border-y-2 border-dashed border-[#D8BE9E] bg-[#FAF2E6] py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="handwritten text-2xl text-[#A14E26]">La gente dice…</p>
              <h2 id="reviews-heading" className="rustic mt-3 text-4xl uppercase sm:text-5xl">
                Good food.<br />
                Great company.<br />
                <span className="text-[#006341]">Local love.</span>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-[#765942]">
                Real Google review excerpts from Express guests, republished by Wanderlog.
              </p>
              <a
                href={googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className={"mt-6 inline-flex items-center gap-3 rounded-xl border-2 border-dashed border-[#BD8D5C] bg-[#FFFDF9] px-4 py-3 " + focus}
              >
                <Star size={23} fill="currentColor" className="text-[#D97706]" aria-hidden="true" />
                <strong className="rustic text-xl">4.5 / 5</strong>
                <span className="text-[10px] font-bold">EXPRESS ON GOOGLE</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>

            <div className="mx-auto w-full max-w-lg">
              <article className={"receipt toasted-card rotate-1 p-7 sm:p-9 " + card}>
                <div className="text-center">
                  <p className="rustic text-2xl sm:text-3xl">EL GRULLO EXPRESS</p>
                  <p className="mt-2 text-[10px] tracking-[.2em]">CLARKSVILLE, TENNESSEE</p>
                </div>
                <div className="my-5 flex justify-between border-y-2 border-dashed border-[#D8BE9E] py-3 text-[10px] tracking-widest">
                  <span>GUEST CHECK</span>
                  <span>NO. 00{reviewIndex + 1}</span>
                </div>
                <div aria-live="polite" aria-atomic="true" className="min-h-60">
                  <p className="text-xs font-bold tracking-[.18em] text-[#006341]">{review.topic}</p>
                  <blockquote className="rustic mt-5 text-3xl leading-snug sm:text-4xl">
                    “{review.quote}”
                  </blockquote>
                  <p className="mt-6 text-sm font-bold">— {review.author}</p>
                  <p className="mt-1 text-[10px] tracking-widest text-[#765942]">GOOGLE REVIEW EXCERPT</p>
                </div>
                <a
                  href={review.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={"mt-5 flex items-center justify-between gap-3 border-t-2 border-dashed border-[#D8BE9E] pt-4 text-[10px] uppercase tracking-widest text-[#765942] " + focus}
                >
                  Read source on Wanderlog
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <p className="handwritten mt-6 text-center text-2xl text-[#C8102E]">
                  ¡Gracias por visitarnos!
                </p>
              </article>
              <div className="mt-8 flex items-center justify-between gap-4">
                <p className="text-xs text-[#765942]">
                  {reviewIndex + 1} / {reviews.length} · Neighborhood notes
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous review"
                    onClick={() => setReviewIndex((index) => (index + reviews.length - 1) % reviews.length)}
                    className={"rounded-xl border-2 border-[#D8BE9E] bg-[#FFFDF9] p-3 hover:bg-[#F3E8D6] " + focus}
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next review"
                    onClick={() => setReviewIndex((index) => (index + 1) % reviews.length)}
                    className={"rounded-xl border-2 border-[#D8BE9E] bg-[#FFFDF9] p-3 hover:bg-[#F3E8D6] " + focus}
                  >
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="visit" aria-labelledby="visit-heading" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-9 text-center">
            <p className="handwritten text-2xl text-[#A14E26]">Nos vemos pronto.</p>
            <h2 id="visit-heading" className="rustic mt-3 text-4xl uppercase sm:text-5xl">
              Follow the craving.
            </h2>
            <p className="mt-4 text-sm text-[#765942]">
              Two stops on Fort Campbell Boulevard. Pick yours.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {locations.map((item, index) => (
              <article
                key={item.name}
                className={
                  "toasted-card p-7 sm:p-8 " +
                  card +
                  (branch === index ? " ring-2 ring-[#006341] ring-offset-4 ring-offset-[#FDF8F0]" : "")
                }
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold tracking-widest text-[#765942]">
                    CLARKSVILLE, TN
                  </span>
                  {branch === index && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-[#006341]">
                      <Check size={14} aria-hidden="true" />
                      SELECTED
                    </span>
                  )}
                </div>
                <h3 className="rustic text-3xl text-[#006341]">{item.title}</h3>
                <address className="mt-4 text-sm not-italic leading-7 text-[#765942]">
                  {item.address}<br />
                  Clarksville, TN<br />
                  <a href={phoneLink(item.phone)} className={"font-bold text-[#432D21] " + focus}>
                    {item.phone}
                  </a>
                </address>
                <dl className="mt-5 space-y-3 border-y-2 border-dashed border-[#D8BE9E] py-4 text-xs">
                  <div className="flex justify-between gap-4">
                    <dt>Sunday–Thursday</dt>
                    <dd>{item.opens}–10 PM</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Friday–Saturday</dt>
                    <dd>{item.opens}–11 PM</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  aria-pressed={branch === index}
                  onClick={() => setBranch(index)}
                  className={secondary + " mt-6 w-full"}
                >
                  {branch === index ? "Your selected branch" : "Choose this branch"}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href={directionsLink(location.address)}
              target="_blank"
              rel="noopener noreferrer"
              className={primary}
            >
              <MapPin size={17} aria-hidden="true" />
              Directions to {location.name}
            </a>
            <a href={call} className={secondary}>
              <Phone size={17} aria-hidden="true" />
              Call {location.name}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t-4 border-double border-[#D8BE9E] bg-[#F3E6D3] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <div>
            <p className="rustic text-2xl text-[#006341]">EL GRULLO EXPRESS</p>
            <p className="mt-2 text-[10px] uppercase tracking-widest text-[#765942]">
              Mexican roots. Clarksville appetite.
            </p>
          </div>
          <p className="handwritten text-2xl text-[#C8102E]">Con mucho sabor.</p>
          <a href="#main" className={"text-xs font-bold uppercase tracking-widest " + focus}>
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
