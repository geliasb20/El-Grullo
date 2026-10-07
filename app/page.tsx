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
  Leaf,
  MapPin,
  Phone,
  Plus,
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

type MenuItem = {
  name: string;
  category: Category;
  price: number | null;
  ingredients: string;
  description: string;
  stamp: string;
};

const menu: MenuItem[] = [
  {
    name: "Quesabirrias con Consomé",
    category: "Birria Specials",
    price: 14.99,
    ingredients: "Birria · queso · consomé",
    description:
      "The birria-and-cheese favorite. Give it a dip, then give it your full attention.",
    stamp: "CALIENTITO",
  },
  {
    name: "Pizza Birria para la Banda",
    category: "Birria Specials",
    price: 28.67,
    ingredients: "Birria · queso · made to share",
    description:
      "Put it in the middle of the table. The whole banda is invited.",
    stamp: "PARA COMPARTIR",
  },
  {
    name: "Tacos al Comal",
    category: "Street Tacos",
    price: 5.04,
    ingredients: "1 street taco · ask about fillings",
    description: "A little taco with a whole lot of street-food soul.",
    stamp: "UNO MÁS",
  },
  {
    name: "Carne Asada Fries",
    category: "Platos & Caldos",
    price: 13.26,
    ingredients: "Carne asada · fries",
    description: "For the kind of hunger that means business.",
    stamp: "BIEN SERVIDO",
  },
  {
    name: "Menudo y Pozole",
    category: "Platos & Caldos",
    price: null,
    ingredients: "Traditional caldos · ask about availability",
    description:
      "Comfort by the bowl. Call your branch for today's selection.",
    stamp: "COMO EN CASA",
  },
  {
    name: "Aguas Frescas de Vitrolero",
    category: "Bebidas",
    price: 6.92,
    ingredients: "32 ounces · ask about today's flavors",
    description:
      "Something refreshing for between the bites. Ask which flavors are pouring today.",
    stamp: "BIEN FRÍAS",
  },
];

const salsas = [
  {
    name: "Verde Suave",
    heat: "Suavecita",
    color: "#006341",
    flames: 1,
  },
  {
    name: "Roja Picante",
    heat: "Con carácter",
    color: "#C8102E",
    flames: 2,
  },
  {
    name: "Habanero Fuego",
    heat: "¡Aguas!",
    color: "#B45309",
    flames: 3,
  },
] as const;

const reviews = [
  {
    author: "Branson D",
    topic: "LA BIRRIA",
    quote: "Had the birria tacos, one of the best meals",
    source:
      "https://wanderlog.com/list/geoCategory/1269369/best-mexican-foods-and-restaurants-in-clarksville",
  },
  {
    author: "Nichole M",
    topic: "EL DRIVE-THRU",
    quote: "didn't have to wait longer then 10 minutes",
    source: "https://wanderlog.com/place/details/4095347/el-grullo-express",
  },
  {
    author: "Bobbie S",
    topic: "EL SABOR",
    quote: "Authentic Mexican food at its finest taste!!",
    source: "https://wanderlog.com/place/details/4095347/el-grullo-express",
  },
] as const;

const googleReviews =
  "https://www.google.com/maps/search/?api=1&query=El+Grullo+Express+1951+Fort+Campbell+Blvd+Clarksville+TN";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D9488]";

const primary =
  "inline-flex items-center justify-center gap-2 rounded-sm border-2 border-[#850B20] bg-[#C8102E] px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[4px_4px_0_#AD7950] transition hover:bg-[#AA0D27] " +
  focus;

const secondary =
  "inline-flex items-center justify-center gap-2 rounded-sm border-2 border-dashed border-[#99714E] bg-[#FFF9EC] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#006341] transition hover:bg-[#EBD8BA] " +
  focus;

function phoneLink(phone: string) {
  return "tel:+1" + phone.replaceAll("-", "");
}

function directionsLink(address: string) {
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(address + ", Clarksville, TN")
  );
}

const styles = [
  ".cdmx{background-color:#FAF2E4;background-image:radial-gradient(#91583420 .7px,transparent .7px),linear-gradient(135deg,#FAF2E4,#F3E5CF);background-size:5px 5px,100% 100%;color:#412B20;}",
  ".cdmx .rotulo{font-family:Impact,'Arial Black',Haettenschweiler,sans-serif;font-weight:900;text-transform:uppercase;letter-spacing:.025em;}",
  ".cdmx .painted{font-family:Georgia,'Times New Roman',serif;font-weight:900;}",
  ".cdmx .script{font-family:Georgia,'Times New Roman',serif;font-style:italic;}",
  ".cdmx .hero-title{font-size:clamp(3.1rem,7.6vw,7rem);line-height:.94;letter-spacing:-.025em;}",
  ".cdmx .paint-shadow{text-shadow:2px 2px 0 #FAF2E4,5px 5px 0 #C8102E;}",
  ".cdmx .green-shadow{text-shadow:2px 2px 0 #FAF2E4,4px 4px 0 #006341;}",
  ".cdmx .papel{transform-origin:top center;animation:cdmx-papel 5s ease-in-out infinite;}",
  ".cdmx .scorched{background-image:radial-gradient(ellipse at 0 0,#A75D2518,transparent 45%),radial-gradient(ellipse at 100% 100%,#A75D2512,transparent 50%);box-shadow:0 12px 28px #4E260E1A,inset 0 0 24px #8B2C120D;}",
  ".cdmx .comal{background:radial-gradient(ellipse at center,#4B4236,#252A23 75%);border:7px solid #AA7950;box-shadow:inset 0 0 0 2px #D9B58B,7px 7px 0 #A5784C33;}",
  ".cdmx .chalkboard{background-color:#1E322C;background-image:radial-gradient(#FFF8E80D .8px,transparent .8px);background-size:6px 6px;border:7px solid #AB754D;box-shadow:inset 0 0 0 2px #D7B086,6px 6px 0 #A5784C33;color:#FFF3DA;}",
  ".cdmx .taco{transform-origin:180px 110px;}",
  ".cdmx .taco.dipping{animation:cdmx-dunk 1.3s ease-in-out both;}",
  ".cdmx .steam{animation:cdmx-steam 3s ease-in-out infinite;}",
  ".cdmx .broth-bubble{transform-box:fill-box;transform-origin:center;animation:cdmx-bubble 1.8s ease-in-out infinite;}",
  ".cdmx .splash{animation:cdmx-splash 1.3s ease-in-out both;}",
  ".cdmx .ticket{position:relative;background:#FFF9EC;}",
  ".cdmx .ticket:after{content:'';position:absolute;bottom:-10px;left:10px;right:10px;height:10px;background:linear-gradient(135deg,#FFF9EC 25%,transparent 25%) -5px 0/10px 10px,linear-gradient(225deg,#FFF9EC 25%,transparent 25%) -5px 0/10px 10px;}",
  ".cdmx .barcode{height:25px;background:repeating-linear-gradient(90deg,#412B20 0 2px,transparent 2px 4px,#412B20 4px 5px,transparent 5px 9px);opacity:.65;}",
  "@keyframes cdmx-papel{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(3deg)}}",
  "@keyframes cdmx-dunk{0%,100%{transform:translateY(0) rotate(0)}42%,60%{transform:translateY(65px) rotate(-12deg)}}",
  "@keyframes cdmx-steam{0%,100%{opacity:.2;transform:translateY(3px)}50%{opacity:.55;transform:translateY(-7px)}}",
  "@keyframes cdmx-bubble{0%,100%{opacity:.25;transform:scale(.6)}50%{opacity:.85;transform:scale(1.15)}}",
  "@keyframes cdmx-splash{0%,25%,85%,100%{opacity:0;transform:translateY(8px)}45%,60%{opacity:1;transform:translateY(-5px)}}",
  "@media(prefers-reduced-motion:reduce){.cdmx *,.cdmx *:before,.cdmx *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition:none!important;}}",
].join("\n");

function PapelPicado() {
  return (
    <div
      aria-hidden="true"
      className="flex h-20 justify-center gap-3 overflow-hidden border-t-2 border-[#8F6444]"
    >
      {Array.from({ length: 18 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 90 78"
          className="papel h-[66px] w-[76px] shrink-0"
          style={{
            color: ["#006341", "#FFF9EC", "#C8102E", "#F59E0B", "#0D9488"][
              index % 5
            ],
            animationDelay: (index % 5) * -0.7 + "s",
            filter: "drop-shadow(0 3px 2px rgba(78,38,14,.15))",
          }}
        >
          <defs>
            <mask id={"cdmx-flag-" + index}>
              <rect width="90" height="78" fill="white" />
              <path
                d="M0 70L9 78L18 70L27 78L36 70L45 78L54 70L63 78L72 70L81 78L90 70V78H0Z"
                fill="black"
              />
              <path
                d="M45 13L54 25L45 37L36 25ZM45 44L55 55L45 66L35 55Z"
                fill="black"
              />
              <g fill="black">
                <circle cx="17" cy="21" r="5" />
                <circle cx="73" cy="21" r="5" />
                <circle cx="17" cy="53" r="5" />
                <circle cx="73" cy="53" r="5" />
                <circle cx="28" cy="38" r="4" />
                <circle cx="62" cy="38" r="4" />
              </g>
            </mask>
          </defs>
          <rect
            width="90"
            height="78"
            fill="currentColor"
            mask={"url(#cdmx-flag-" + index + ")"}
          />
        </svg>
      ))}
    </div>
  );
}

function TacoIllustration({
  dipping,
  cilantro,
  cebolla,
}: {
  dipping: boolean;
  cilantro: boolean;
  cebolla: boolean;
}) {
  return (
    <svg
      viewBox="0 0 360 290"
      className="mx-auto block w-full max-w-[360px]"
      role="img"
      aria-label={
        "Illustrated birria taco " +
        (dipping ? "dipping into consomé" : "above bubbling consomé") +
        (cilantro ? ", with cilantro" : ", without cilantro") +
        (cebolla ? " and onion" : " and without onion")
      }
    >
      <ellipse
        cx="180"
        cy="266"
        rx="125"
        ry="12"
        fill="#000"
        opacity=".22"
      />

      <g
        className="steam"
        fill="none"
        stroke="#F0D7A7"
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
        stroke="#E6AB65"
        strokeWidth="3"
      />
      <ellipse cx="180" cy="199" rx="113" ry="29" fill="#E4AC68" />
      <ellipse cx="180" cy="199" rx="102" ry="22" fill="#8F2D1C" />

      <g fill="none" stroke="#EA9952" strokeWidth="2">
        <circle className="broth-bubble" cx="114" cy="200" r="5" />
        <circle
          className="broth-bubble"
          cx="241"
          cy="198"
          r="6"
          style={{ animationDelay: "-.6s" }}
        />
        <circle
          className="broth-bubble"
          cx="190"
          cy="211"
          r="4"
          style={{ animationDelay: "-1.2s" }}
        />
      </g>

      <g className={dipping ? "taco dipping" : "taco"}>
        <path
          d="M88 104q17-81 92-81t92 81q-21 45-92 45t-92-45"
          fill="#D7872F"
          stroke="#F0BD60"
          strokeWidth="3"
        />
        <path
          d="M98 100q81-37 164 0l-10 28q-72 30-143 0Z"
          fill="#6F301E"
        />
        <g stroke="#D07139" strokeWidth="8" strokeLinecap="round">
          <path d="M112 106l24 9m-3-17l26 20m7-14l22 17m9-22l28 13m7-8l18 8" />
        </g>
        <g stroke="#F3D891" strokeWidth="4" strokeLinecap="round">
          <path d="M113 113l27-6 18 17 22-16 20 15 28-14 20 9" />
          <path d="M130 126l22-7m44 7l26-8" />
        </g>

        {cilantro && (
          <g fill="#82B24B">
            <path d="M116 105l5-8 5 8-5 7Z" />
            <path d="M164 114l6-8 6 8-6 7Z" />
            <path d="M209 103l6-8 6 8-6 7Z" />
            <circle cx="235" cy="123" r="4" />
          </g>
        )}

        {cebolla && (
          <g fill="#FFF7DF">
            <rect
              x="140"
              y="100"
              width="7"
              height="7"
              transform="rotate(20 140 100)"
            />
            <rect x="190" y="109" width="7" height="6" />
            <rect x="222" y="116" width="6" height="6" />
            <rect x="153" y="116" width="6" height="5" />
          </g>
        )}

        <path
          d="M91 105q88 30 177 0l-8 20q-80 41-160 0Z"
          fill="#E5A43D"
          stroke="#F0BD60"
          strokeWidth="3"
        />
        <g fill="#A86129" opacity=".6">
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
        stroke="#E6AB65"
        strokeWidth="2"
      />
      <path
        d="M77 219q103 36 207 0"
        fill="none"
        stroke="#F5D4A2"
        strokeWidth="3"
      />

      {dipping && (
        <g className="splash" fill="#E17B39">
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
  const [cilantro, setCilantro] = useState(true);
  const [cebolla, setCebolla] = useState(true);
  const [salsaIndex, setSalsaIndex] = useState(0);
  const [dipping, setDipping] = useState(false);
  const [hasDipped, setHasDipped] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  const location = locations[branch];
  const salsa = salsas[salsaIndex];
  const review = reviews[reviewIndex];
  const call = phoneLink(location.phone);

  function dipTaco() {
    if (dipping) return;
    setDipping(true);
    setHasDipped(true);
  }

  return (
    <div className="cdmx min-h-screen overflow-x-hidden font-sans selection:bg-[#C8102E] selection:text-white">
      <style>{styles}</style>

      <a
        href="#main"
        className={
          "sr-only z-50 bg-[#FFF9EC] p-4 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 " +
          focus
        }
      >
        Skip to content
      </a>

      <PapelPicado />

      <header className="mx-auto max-w-7xl px-5 pb-7 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b-4 border-double border-[#AD7950] pb-6">
          <a
            href="#main"
            aria-label="El Grullo Express home"
            className={focus}
          >
            <span className="block text-[10px] font-bold uppercase tracking-[.22em] text-[#006341]">
              Taquería · Clarksville, Tennessee
            </span>
            <span className="rotulo mt-1 block text-4xl text-[#C8102E]">
              EL GRULLO{" "}
              <span className="text-[#006341]">EXPRESS</span>
            </span>
          </a>

          <nav
            aria-label="Main navigation"
            className="flex flex-wrap items-center gap-5 text-xs font-black uppercase tracking-wider"
          >
            <a
              href="#menu"
              className={"hover:text-[#C8102E] " + focus}
            >
              La carta
            </a>
            <a
              href="#reviews"
              className={"hover:text-[#C8102E] " + focus}
            >
              La clientela
            </a>
            <a
              href="#visit"
              className={"hover:text-[#C8102E] " + focus}
            >
              Dónde estamos
            </a>
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
          className="mx-auto max-w-7xl px-5 pb-14 sm:px-8"
        >
          <div className="mb-12 flex flex-wrap items-center justify-between gap-6">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#765338]">
              <MapPin
                size={16}
                className="text-[#006341]"
                aria-hidden="true"
              />
              Fort Campbell Blvd · Dos taquerías
            </p>

            <div
              role="group"
              aria-label="Choose your branch"
              className="flex flex-wrap gap-3"
            >
              {locations.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={branch === index}
                  onClick={() => setBranch(index)}
                  className={
                    "flex items-center gap-3 rounded-sm border-4 border-double px-4 py-3 text-left shadow-[3px_3px_0_#AD795044] transition " +
                    (branch === index
                      ? "border-[#E7DAB9] bg-[#006341] text-white "
                      : "border-[#006341] bg-[#FFF9EC] text-[#006341] hover:bg-[#EBD8BA] ") +
                    focus
                  }
                >
                  <ArrowUpRight size={21} aria-hidden="true" />
                  <span>
                    <strong className="rotulo block text-lg">
                      {item.name}
                    </strong>
                    <span className="block text-[10px] font-bold tracking-wide">
                      {index === 0 ? "1951" : "3195"} Ft Campbell Blvd
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <span className="rotulo mb-7 inline-block rotate-[-4deg] border-2 border-dashed border-[#923511] bg-[#F59E0B] px-4 py-2 text-xl text-[#432B19]">
                ¡PÁSELE MARCHANTE!
              </span>

              <h1 id="hero-heading" className="rotulo hero-title">
                REAL STREET
                <br />
                <span className="paint-shadow text-[#006341]">
                  TACOS.
                </span>
                <br />
                <span className="mt-3 inline-block text-[#9B4826]">
                  LEGENDARY
                </span>
                <br />
                <span className="green-shadow text-[#C8102E]">
                  BIRRIA.
                </span>
              </h1>

              <p className="script mt-7 text-2xl text-[#9B4826]">
                Del comal al corazón.
              </p>
              <p className="mt-4 max-w-md text-base leading-7 text-[#765338]">
                Street-food soul, right here in Clarksville. Come
                hungry, find your salsa, and make room for one more taco.
              </p>

              <div className="mt-7 flex flex-wrap gap-4">
                <a href="#menu" className={primary}>
                  Échale un ojo al menú
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
                className={
                  "mt-8 inline-flex -rotate-2 items-center gap-3 border-2 border-dashed border-[#0D9488] bg-[#E5EEE5] px-4 py-3 " +
                  focus
                }
              >
                <Star
                  size={23}
                  fill="currentColor"
                  className="text-[#A85F05]"
                  aria-hidden="true"
                />
                <span>
                  <strong className="rotulo block text-xl text-[#006341]">
                    4.5 ★ ON GOOGLE
                  </strong>
                  <span className="block text-[10px] font-bold tracking-wider text-[#765338]">
                    EXPRESS · 1,360+ REVIEWS
                  </span>
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>

            <article className="comal relative rounded-[2rem] p-5 text-[#FFF3DA] sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[.2em] text-[#E7C69A]">
                    THE VIRTUAL TAQUERO
                  </p>
                  <h2 className="rotulo mt-2 text-3xl text-[#F59E0B] sm:text-4xl">
                    Tu taco.
                    <br />
                    Tu manera.
                  </h2>
                </div>

                <div className="flex h-24 w-24 shrink-0 rotate-[8deg] flex-col items-center justify-center rounded-full border-4 border-double border-[#FFF3DA] bg-[#C8102E] text-white shadow-[0_0_0_3px_#C8102E]">
                  <span className="rotulo text-xs">CALIENTITO</span>
                  <strong className="rotulo text-3xl">$14.99</strong>
                  <span className="text-[8px] font-bold">
                    BIRRIA QUESA TACOS
                  </span>
                </div>
              </div>

              <div
                onAnimationEnd={(event) => {
                  if (event.animationName === "cdmx-dunk") {
                    setDipping(false);
                  }
                }}
              >
                <TacoIllustration
                  dipping={dipping}
                  cilantro={cilantro}
                  cebolla={cebolla}
                />
              </div>

              <p className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-[#E7C69A]">
                Quesabirrias con Consomé
              </p>

              <div className="border-t-2 border-dashed border-[#D9B58B]/50 pt-5">
                <p className="mb-3 text-[10px] font-bold tracking-[.18em] text-[#E7C69A]">
                  01 · PONLE LO TUYO
                </p>

                <div
                  className="grid grid-cols-2 gap-3"
                  role="group"
                  aria-label="Choose taco toppings"
                >
                  <button
                    type="button"
                    aria-pressed={cilantro}
                    onClick={() => setCilantro((value) => !value)}
                    className={
                      "flex items-center justify-between gap-2 rounded-lg border-2 px-4 py-3 text-sm font-bold transition " +
                      (cilantro
                        ? "border-[#A5C57D] bg-[#006341] text-white "
                        : "border-[#A99274] bg-[#FFF3DA]/5 text-[#FFF3DA] ") +
                      focus
                    }
                  >
                    <span className="flex items-center gap-2">
                      <Leaf size={16} aria-hidden="true" />
                      Cilantro
                    </span>
                    {cilantro ? (
                      <Check size={16} aria-hidden="true" />
                    ) : (
                      <Plus size={16} aria-hidden="true" />
                    )}
                  </button>

                  <button
                    type="button"
                    aria-pressed={cebolla}
                    onClick={() => setCebolla((value) => !value)}
                    className={
                      "flex items-center justify-between gap-2 rounded-lg border-2 px-4 py-3 text-sm font-bold transition " +
                      (cebolla
                        ? "border-[#FFF3DA] bg-[#EBD8BA] text-[#412B20] "
                        : "border-[#A99274] bg-[#FFF3DA]/5 text-[#FFF3DA] ") +
                      focus
                    }
                  >
                    <span>Cebolla</span>
                    {cebolla ? (
                      <Check size={16} aria-hidden="true" />
                    ) : (
                      <Plus size={16} aria-hidden="true" />
                    )}
                  </button>
                </div>

                <p className="mb-3 mt-5 text-[10px] font-bold tracking-[.18em] text-[#E7C69A]">
                  02 · ¿QUÉ TANTO PICA?
                </p>

                <div
                  role="group"
                  aria-label="Choose salsa heat"
                  className="grid grid-cols-3 gap-2"
                >
                  {salsas.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      aria-pressed={salsaIndex === index}
                      onClick={() => setSalsaIndex(index)}
                      className={
                        "rounded-lg border-2 px-1 py-3 text-[#412B20] transition " +
                        (salsaIndex === index
                          ? "bg-[#FFF3DA] shadow-[0_0_0_2px_#F59E0B] "
                          : "border-[#A99274] bg-[#EBD8BA] ") +
                        focus
                      }
                      style={{
                        borderColor:
                          salsaIndex === index ? item.color : undefined,
                      }}
                    >
                      <span
                        className="mb-2 flex justify-center gap-1"
                        style={{ color: item.color }}
                      >
                        {Array.from(
                          { length: item.flames },
                          (_, flame) => (
                            <Flame
                              key={flame}
                              size={15}
                              fill="currentColor"
                              aria-hidden="true"
                            />
                          ),
                        )}
                      </span>
                      <span className="block text-xs font-bold">
                        {item.name}
                      </span>
                      <span className="mt-1 block text-[9px]">
                        {item.heat}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={dipping}
                  onClick={dipTaco}
                  className={
                    primary +
                    " mt-5 w-full disabled:cursor-wait disabled:opacity-70"
                  }
                >
                  {dipping
                    ? "¡A mojar el taco!"
                    : "Dale un Dip al Consomé"}
                  <UtensilsCrossed size={17} aria-hidden="true" />
                </button>

                <p
                  role="status"
                  className="mt-3 min-h-10 text-center text-xs leading-5 text-[#E7C69A]"
                >
                  {dipping
                    ? "Dipping… " + salsa.name + " on the side!"
                    : hasDipped
                      ? "¡Buen provecho! " + salsa.name + " selected."
                      : "Choose your toppings, pick your salsa, and take a dip."}
                </p>
                <p className="text-center text-[10px] leading-5 text-[#E7C69A]">
                  A playful taco preview. Call your branch to confirm
                  toppings and salsa availability.
                </p>
                <a
                  href={call}
                  className={
                    "mt-3 flex items-center justify-center gap-2 text-xs font-bold text-[#F59E0B] underline underline-offset-4 " +
                    focus
                  }
                >
                  Order the real thing by phone
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </article>
          </div>

          <div
            aria-live="polite"
            aria-atomic="true"
            className="mt-12 flex flex-wrap justify-between gap-4 border-y-4 border-double border-[#AD7950] py-5 text-xs font-bold text-[#765338]"
          >
            <p className="flex items-center gap-2">
              <MapPin
                size={16}
                className="text-[#006341]"
                aria-hidden="true"
              />
              {location.address} · Clarksville, TN
            </p>
            <p className="flex items-center gap-2">
              <Clock3
                size={16}
                className="text-[#C8102E]"
                aria-hidden="true"
              />
              Sun–Thu {location.opens}–10 PM · Fri–Sat {location.opens}
              –11 PM
            </p>
          </div>
        </section>

        <div className="border-y-4 border-double border-[#FFF3DA]/70 bg-[#C8102E] px-5 py-5 text-center text-[#FFF3DA]">
          <p className="rotulo text-2xl tracking-wider sm:text-3xl">
            DEL COMAL
            <span className="mx-3 text-[#F59E0B] sm:mx-7">✦</span>
            A TU MESA
            <span className="mx-3 text-[#F59E0B] sm:mx-7">✦</span>
            CON MUCHO SABOR
          </p>
        </div>

        <section
          id="menu"
          aria-labelledby="menu-heading"
          className="mx-auto max-w-7xl scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="script text-2xl text-[#9B4826]">
                ¿Qué le damos, marchante?
              </p>
              <h2
                id="menu-heading"
                className="rotulo mt-3 text-5xl text-[#006341] sm:text-6xl"
              >
                LA CARTA
                <br />
                <span className="text-[#C8102E]">DEL PUESTO</span>
              </h2>
            </div>
            <span className="rotulo rotate-3 border-2 border-dashed border-[#006341] bg-[#F59E0B] px-5 py-3 text-xl">
              ¡Aquí hay antojo!
            </span>
          </div>

          <div
            role="group"
            aria-label="Filter menu by category"
            className="mb-7 flex flex-wrap gap-2"
          >
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={
                  "border-2 px-4 py-3 text-xs font-black uppercase tracking-wider transition " +
                  (category === item
                    ? "border-[#004B31] bg-[#006341] text-white shadow-[3px_3px_0_#AD7950] "
                    : "border-dashed border-[#99714E] bg-[#FFF9EC] hover:bg-[#EBD8BA] ") +
                  focus
                }
              >
                {item}
              </button>
            ))}
          </div>

          <div className="chalkboard rounded-lg p-5 sm:p-8">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-[#FFF3DA]/40 pb-5">
              <p className="rotulo text-2xl tracking-widest">
                ESPECIALIDADES{" "}
                <span className="text-[#F59E0B]">✦</span>
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest">
                {location.name}
              </p>
            </div>

            <div
              aria-live="polite"
              aria-atomic="true"
              className="grid gap-x-10 md:grid-cols-2"
            >
              {menu
                .filter((item) => item.category === category)
                .map((item, index) => (
                  <article
                    key={item.name}
                    className="flex flex-col border-b-2 border-dashed border-[#FFF3DA]/30 py-7"
                  >
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <span className="text-[10px] font-bold tracking-[.18em] text-[#BAD0A2]">
                        {item.stamp}
                      </span>
                      <span className="rotulo text-4xl text-[#FFF3DA]/25">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="painted text-3xl">{item.name}</h3>
                    <p className="mt-3 text-[11px] uppercase tracking-wider text-[#F5BD60]">
                      {item.ingredients}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-6 text-[#E4D3B5]">
                      {item.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <span className="rotulo -rotate-3 border-2 border-dashed border-[#F5BD60] px-4 py-2 text-3xl text-[#F59E0B]">
                        {item.price === null
                          ? "Ask us"
                          : "$" + item.price.toFixed(2)}
                      </span>
                      <a
                        href={call}
                        aria-label={
                          "Call " + location.name + " about " + item.name
                        }
                        className={
                          "flex items-center gap-2 text-xs font-black uppercase tracking-wider hover:text-[#F59E0B] " +
                          focus
                        }
                      >
                        Call to order
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                ))}
            </div>

            <p className="pt-5 text-xs leading-6 text-[#E4D3B5]">
              Prices before tax. Menu, prices, and availability may vary
              by branch. Ask about today&apos;s caldos and desserts.
            </p>
          </div>
        </section>

        <section
          id="reviews"
          aria-labelledby="reviews-heading"
          className="scroll-mt-8 border-y-2 border-dashed border-[#AD7950] bg-[#EBDDC5] py-16 sm:py-20"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="script text-2xl text-[#9B4826]">
                La clientela tiene la palabra.
              </p>
              <h2
                id="reviews-heading"
                className="rotulo mt-4 text-5xl leading-none sm:text-6xl"
              >
                BUEN TACO.
                <br />
                BUENA CHARLA.
                <br />
                <span className="text-[#006341]">BUENA ONDA.</span>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-[#765338]">
                Real Google review excerpts from Express guests,
                republished by Wanderlog.
              </p>
              <a
                href={googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  "mt-6 inline-flex items-center gap-3 border-2 border-dashed border-[#0D9488] bg-[#FFF9EC] px-4 py-3 " +
                  focus
                }
              >
                <Star
                  size={23}
                  fill="currentColor"
                  className="text-[#A85F05]"
                  aria-hidden="true"
                />
                <strong className="rotulo text-2xl text-[#006341]">
                  4.5 / 5
                </strong>
                <span className="text-[10px] font-bold">
                  EXPRESS ON GOOGLE
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>

            <div className="mx-auto w-full max-w-lg">
              <article className="ticket scorched rotate-1 border-2 border-[#C6A37D] p-7 sm:p-9">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="rotulo text-3xl">EL GRULLO</p>
                    <p className="text-[10px] font-bold tracking-widest">
                      EXPRESS · CLARKSVILLE, TN
                    </p>
                  </div>
                  <span className="rotulo -rotate-12 border-2 border-[#0D9488] px-2 py-1 text-sm text-[#0D9488]">
                    CON SABOR
                  </span>
                </div>

                <div className="my-5 flex justify-between gap-3 border-y-2 border-dashed border-[#C6A37D] py-3 font-mono text-[10px]">
                  <span>COMPROBANTE DE FONDA</span>
                  <span>NO. 00{reviewIndex + 1}</span>
                </div>

                <div
                  aria-live="polite"
                  aria-atomic="true"
                  className="min-h-60"
                >
                  <p className="text-xs font-black tracking-[.18em] text-[#006341]">
                    {review.topic}
                  </p>
                  <blockquote className="painted mt-5 text-3xl leading-snug sm:text-4xl">
                    “{review.quote}”
                  </blockquote>
                  <p className="mt-6 text-sm font-bold">
                    — {review.author}
                  </p>
                  <p className="mt-1 text-[10px] tracking-widest text-[#765338]">
                    GOOGLE REVIEW EXCERPT
                  </p>
                </div>

                <a
                  href={review.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    "mt-5 flex items-center justify-between gap-3 border-t-2 border-dashed border-[#C6A37D] pt-4 text-[10px] uppercase tracking-widest text-[#765338] " +
                    focus
                  }
                >
                  Read source on Wanderlog
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <p className="script my-5 text-center text-2xl text-[#C8102E]">
                  ¡Gracias, vuelva pronto!
                </p>
                <div
                  className="barcode mx-auto max-w-48"
                  aria-hidden="true"
                />
              </article>

              <div className="mt-8 flex items-center justify-between gap-4">
                <p className="font-mono text-xs text-[#765338]">
                  TICKET 0{reviewIndex + 1} / 0{reviews.length}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous review"
                    onClick={() =>
                      setReviewIndex(
                        (index) =>
                          (index + reviews.length - 1) % reviews.length,
                      )
                    }
                    className={
                      "border-2 border-dashed border-[#99714E] bg-[#FFF9EC] p-3 hover:bg-[#F5BD60] " +
                      focus
                    }
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next review"
                    onClick={() =>
                      setReviewIndex(
                        (index) => (index + 1) % reviews.length,
                      )
                    }
                    className={
                      "border-2 border-dashed border-[#99714E] bg-[#FFF9EC] p-3 hover:bg-[#F5BD60] " +
                      focus
                    }
                  >
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="visit"
          aria-labelledby="visit-heading"
          className="mx-auto max-w-7xl scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="mb-9 text-center">
            <p className="script text-2xl text-[#9B4826]">
              Caiga por acá.
            </p>
            <h2
              id="visit-heading"
              className="rotulo mt-3 text-5xl text-[#006341] sm:text-6xl"
            >
              NOS VEMOS EN EL GRULLO.
            </h2>
            <p className="mt-4 text-sm text-[#765338]">
              Two Clarksville stops on Fort Campbell Boulevard.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {locations.map((item, index) => (
              <article
                key={item.name}
                className={
                  "scorched border-4 border-double bg-[#FFF9EC] p-7 sm:p-8 " +
                  (branch === index
                    ? "border-[#006341]"
                    : "border-[#AD7950]")
                }
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-[#765338]">
                    FORT CAMPBELL BLVD
                  </span>
                  {branch === index && (
                    <span className="flex items-center gap-1 text-[10px] font-black text-[#006341]">
                      <Check size={14} aria-hidden="true" />
                      SELECTED
                    </span>
                  )}
                </div>

                <h3 className="rotulo text-4xl text-[#006341]">
                  {item.title}
                </h3>
                <address className="mt-4 text-sm not-italic leading-7 text-[#765338]">
                  {item.address}
                  <br />
                  Clarksville, TN
                  <br />
                  <a
                    href={phoneLink(item.phone)}
                    className={"font-bold text-[#412B20] " + focus}
                  >
                    {item.phone}
                  </a>
                </address>

                <dl className="mt-5 space-y-3 border-y-2 border-dashed border-[#C6A37D] py-4 text-xs">
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
                  {branch === index
                    ? "Your selected branch"
                    : "Choose this branch"}
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

      <footer className="border-t-4 border-double border-[#FFF3DA]/60 bg-[#006341] px-5 py-10 text-[#FFF3DA] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <div>
            <p className="rotulo text-3xl">EL GRULLO EXPRESS</p>
            <p className="mt-2 text-[10px] uppercase tracking-widest">
              Mexican roots. Clarksville appetite.
            </p>
          </div>
          <p className="script text-2xl text-[#F5BD60]">
            Del comal al corazón.
          </p>
          <a
            href="#main"
            className={
              "text-xs font-bold uppercase tracking-widest " + focus
            }
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
