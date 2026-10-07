"use client";

import { useEffect, useRef, useState } from "react";
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
  Sparkles,
  Star,
  UtensilsCrossed,
  Volume2,
  VolumeX,
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
  "Aguas Frescas de Vitrolero",
] as const;

type Category = (typeof categories)[number];
type Action = "idle" | "sizzle" | "toppings" | "dip";

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
    description: "Rich birria, melty cheese, and a dip worth slowing down for.",
    stamp: "CALIENTITO",
  },
  {
    name: "Pizza Birria para la Banda",
    category: "Birria Specials",
    price: 28.67,
    ingredients: "Birria · queso · made to share",
    description: "Put it in the middle of the table. The whole banda is invited.",
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
    description: "Comfort by the bowl. Call your branch for today's selection.",
    stamp: "COMO EN CASA",
  },
  {
    name: "Aguas Frescas de Vitrolero",
    category: "Aguas Frescas de Vitrolero",
    price: 6.92,
    ingredients: "32 ounces · ask about today's flavors",
    description: "Something cool between the bites. Ask what is pouring today.",
    stamp: "BIEN FRÍAS",
  },
];

const salsas = [
  { name: "Verde Suave", heat: "Suavecita", color: "#8DBD62", flames: 1 },
  { name: "Roja Picante", heat: "Con carácter", color: "#F07869", flames: 2 },
  { name: "Habanero Fuego", heat: "¡Aguas!", color: "#F5B347", flames: 3 },
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
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F59E0B]";

const primary =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#E89167] bg-[#C8102E] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#FFF3DA] shadow-[3px_3px_0_#100B08] transition hover:bg-[#A70E27] " +
  focus;

const secondary =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#B5946B] bg-[#34251B] px-5 py-3 text-sm font-bold text-[#FFF3DA] transition hover:bg-[#483022] " +
  focus;

const phoneLink = (phone: string) => "tel:+1" + phone.replaceAll("-", "");

const directionsLink = (address: string) =>
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(address + ", Clarksville, TN");

const styles = [
  ".noche{color:#F8E7CB;background-color:#1C130E;background-image:radial-gradient(ellipse at 85% 20%,#F59E0B13,transparent 40%),radial-gradient(#F8E7CB08 .65px,transparent .65px),linear-gradient(180deg,#0F172A 0%,#172039 12%,#1C130E 40%,#2A1B14 100%);background-size:100% 100%,5px 5px,100% 100%;}",
  ".noche .rotulo{font-family:Impact,'Arial Black',Haettenschweiler,sans-serif;font-weight:900;text-transform:uppercase;letter-spacing:.025em;}",
  ".noche .painted{font-family:Georgia,'Times New Roman',serif;font-weight:900;}",
  ".noche .script{font-family:Georgia,'Times New Roman',serif;font-style:italic;}",
  ".noche .hero-title{font-size:clamp(3.1rem,7.5vw,6.9rem);line-height:.96;letter-spacing:-.025em;}",
  ".noche .paint-shadow{text-shadow:2px 2px 0 #1C130E,5px 5px 0 #C8102E;}",
  ".noche .green-shadow{text-shadow:2px 2px 0 #1C130E,4px 4px 0 #006341;}",
  ".noche .bulb-sway{transform-box:fill-box;transform-origin:top center;animation:noche-bulb-sway 6s ease-in-out infinite;}",
  ".noche .bulb-glow{animation:noche-glow 5s ease-in-out infinite;}",
  ".noche .papel{transform-origin:top center;animation:noche-flutter 5s ease-in-out infinite;}",
  ".noche .street-card{background-color:#2E2119;background-image:radial-gradient(ellipse at 0 0,#E39A3920,transparent 50%);border:4px double #9E7955;box-shadow:0 14px 32px #0003,inset 0 0 30px #8B2C1210;}",
  ".noche .comal{background:radial-gradient(ellipse at 50% 65%,#484038,#252824 65%,#1C201D);border:7px solid #9B6946;box-shadow:inset 0 0 0 2px #C99C68,0 18px 40px #0005;}",
  ".noche .steam{animation:noche-steam 3s ease-in-out infinite;}",
  ".noche .steam.fast{animation-duration:1s;}",
  ".noche .ember{animation:noche-ember 3s ease-in-out infinite;}",
  ".noche .broth-bubble{transform-box:fill-box;transform-origin:center;animation:noche-bubble 1.8s ease-in-out infinite;}",
  ".noche .taco{transform-origin:215px 150px;}",
  ".noche .taco.dipping{animation:noche-dunk 1.4s ease-in-out both;}",
  ".noche .meat-added{animation:noche-meat-drop .65s ease-out both;}",
  ".noche .sizzle-ring{transform-box:fill-box;transform-origin:center;animation:noche-sizzle 1.3s ease-out both;}",
  ".noche .spice-spark{animation:noche-spark .85s ease-out both;}",
  ".noche .tossed{animation:noche-toss .8s ease-out both;}",
  ".noche .lime-squeeze{transform-origin:292px 87px;animation:noche-lime .9s ease-in-out both;}",
  ".noche .lime-drop{animation:noche-lime-drop .9s ease-in both;}",
  ".noche .splash{animation:noche-splash 1.4s ease-in-out both;}",
  ".noche .chalkboard{background-color:#17372D;background-image:radial-gradient(#FFF3DA0A .8px,transparent .8px);background-size:6px 6px;border:7px solid #9B6946;box-shadow:inset 0 0 0 2px #C99C68,6px 6px 0 #0003;}",
  ".noche .ticket{position:relative;background:#F2E1BE;color:#412B20;box-shadow:8px 8px 0 #0003;}",
  ".noche .ticket:after{content:'';position:absolute;bottom:-10px;left:10px;right:10px;height:10px;background:linear-gradient(135deg,#F2E1BE 25%,transparent 25%) -5px 0/10px 10px,linear-gradient(225deg,#F2E1BE 25%,transparent 25%) -5px 0/10px 10px;}",
  ".noche .barcode{height:23px;background:repeating-linear-gradient(90deg,#412B20 0 2px,transparent 2px 4px,#412B20 4px 5px,transparent 5px 9px);opacity:.6;}",
  "@keyframes noche-bulb-sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}",
  "@keyframes noche-glow{0%,100%{opacity:.75}50%{opacity:1}}",
  "@keyframes noche-flutter{0%,100%{transform:rotate(-3deg) skewX(-1deg)}50%{transform:rotate(3deg) skewX(2deg)}}",
  "@keyframes noche-steam{0%,100%{opacity:.15;transform:translateY(4px)}50%{opacity:.55;transform:translateY(-9px)}}",
  "@keyframes noche-ember{0%,100%{opacity:.35}50%{opacity:.95}}",
  "@keyframes noche-bubble{0%,100%{opacity:.25;transform:scale(.6)}50%{opacity:.8;transform:scale(1.15)}}",
  "@keyframes noche-dunk{0%,100%{transform:translate(0,0) rotate(0)}42%,60%{transform:translate(0,96px) rotate(-9deg)}}",
  "@keyframes noche-meat-drop{0%{opacity:0;transform:translateY(-65px)}65%{opacity:1;transform:translateY(4px)}100%{opacity:1;transform:translateY(0)}}",
  "@keyframes noche-sizzle{0%{opacity:.85;transform:scale(.6)}100%{opacity:0;transform:scale(1.35)}}",
  "@keyframes noche-spark{0%{opacity:0;transform:translate(0,0)}20%{opacity:1}100%{opacity:0;transform:translate(var(--spark-x,0px),-65px)}}",
  "@keyframes noche-toss{0%{opacity:0;transform:translate(15px,-75px) rotate(-12deg)}75%{opacity:1;transform:translate(0,3px) rotate(0)}100%{opacity:1;transform:translate(0,0)}}",
  "@keyframes noche-lime{0%,100%{transform:rotate(-12deg) scale(1)}45%{transform:rotate(8deg) scale(.85)}}",
  "@keyframes noche-lime-drop{0%,20%{opacity:0;transform:translateY(0)}35%{opacity:1}100%{opacity:0;transform:translateY(65px)}}",
  "@keyframes noche-splash{0%,25%,85%,100%{opacity:0;transform:translateY(8px)}45%,60%{opacity:1;transform:translateY(-5px)}}",
  "@media(prefers-reduced-motion:reduce){.noche *,.noche *:before,.noche *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition:none!important;}}",
].join("\n");

function CharroEmblem({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M29 39L36 16Q50 3 64 16L71 39"
        fill="#B66D34"
        stroke="#F4CE85"
        strokeWidth="3"
      />
      <ellipse
        cx="50"
        cy="43"
        rx="43"
        ry="14"
        fill="#D98C40"
        stroke="#F4CE85"
        strokeWidth="3"
      />
      <path d="M14 44Q50 61 86 44" stroke="#006341" strokeWidth="4" />
      <path d="M33 29Q50 36 67 29" stroke="#C8102E" strokeWidth="5" />
      <g fill="#F4CE85">
        <circle cx="26" cy="45" r="2" />
        <circle cx="38" cy="49" r="2" />
        <circle cx="50" cy="50" r="2" />
        <circle cx="62" cy="49" r="2" />
        <circle cx="74" cy="45" r="2" />
      </g>
    </svg>
  );
}

function StreetGarland() {
  const bulbs = Array.from({ length: 13 }, (_, index) => {
    const x = 25 + index * 100;
    const normalized = (x - 625) / 600;
    const y = 17 + 45 * (1 - normalized * normalized);
    return { x, y };
  });

  return (
    <div className="relative h-40 overflow-hidden sm:h-44" aria-hidden="true">
      <svg
        viewBox="0 0 1250 115"
        preserveAspectRatio="xMidYMin slice"
        className="absolute inset-x-0 top-0 h-28 w-full sm:h-32"
      >
        <defs>
          <radialGradient id="noche-light-halo">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity=".45" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity=".12" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M0 14Q625 112 1250 14"
          fill="none"
          stroke="#776E60"
          strokeWidth="2"
        />
        {bulbs.map((bulb, index) => (
          <g key={index}>
            <circle
              className="bulb-glow"
              cx={bulb.x}
              cy={bulb.y + 25}
              r="40"
              fill="url(#noche-light-halo)"
              style={{ animationDelay: index * -.4 + "s" }}
            />
            <g
              className="bulb-sway"
              style={{ animationDelay: index * -.35 + "s" }}
            >
              <path
                d={"M" + bulb.x + " " + bulb.y + "v14"}
                stroke="#776E60"
                strokeWidth="2"
              />
              <rect
                x={bulb.x - 5}
                y={bulb.y + 12}
                width="10"
                height="8"
                rx="2"
                fill="#78644A"
              />
              <path
                d={
                  "M" +
                  (bulb.x - 5) +
                  " " +
                  (bulb.y + 20) +
                  "q-9 10-1 17q6 5 12 0q8-7-1-17Z"
                }
                fill="#FFE0A1"
                stroke="#F5BD60"
                strokeWidth="1"
              />
              <path
                d={"M" + (bulb.x - 2) + " " + (bulb.y + 26) + "l2 7 2-7"}
                fill="none"
                stroke="#FFF9DF"
                strokeWidth="1.5"
              />
            </g>
          </g>
        ))}
      </svg>

      <div className="absolute inset-x-0 top-24 flex justify-center gap-3 border-t border-[#B5946B]/50 sm:top-28">
        {Array.from({ length: 18 }, (_, index) => (
          <svg
            key={index}
            viewBox="0 0 90 78"
            className="papel h-[59px] w-[69px] shrink-0"
            style={{
              color: ["#006341", "#EBD8BA", "#C8102E", "#D99A2C", "#0D9488"][
                index % 5
              ],
              animationDelay: (index % 6) * -.6 + "s",
            }}
          >
            <defs>
              <mask id={"noche-flag-" + index}>
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
              mask={"url(#noche-flag-" + index + ")"}
            />
          </svg>
        ))}
      </div>
    </div>
  );
}

function ComalIllustration({
  action,
  hasMeat,
  withEverything,
}: {
  action: Action;
  hasMeat: boolean;
  withEverything: boolean;
}) {
  return (
    <svg
      viewBox="0 0 430 370"
      className="mx-auto block w-full max-w-[450px]"
      role="img"
      aria-label={
        "Interactive taco illustration on an iron comal" +
        (hasMeat ? ", with birria" : ", ready for birria") +
        (withEverything ? ", cilantro, onion, and lime" : "") +
        (action === "dip" ? ", dipping into consomé" : "")
      }
    >
      <defs>
        <radialGradient id="noche-iron">
          <stop offset="0%" stopColor="#56534B" />
          <stop offset="100%" stopColor="#222521" />
        </radialGradient>
        <radialGradient id="noche-fire">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity=".55" />
          <stop offset="100%" stopColor="#C8102E" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="215" cy="275" rx="178" ry="66" fill="url(#noche-fire)" />
      <g className="ember" fill="#F59E0B">
        <path d="M87 258q-7-17 3-26q2 14 9 21Z" />
        <path d="M151 273q-8-17 1-29q5 14 12 22Z" />
        <path d="M267 270q-6-18 5-27q0 15 9 22Z" />
        <path d="M338 255q-8-15 1-26q4 13 11 21Z" />
      </g>

      <ellipse
        cx="215"
        cy="219"
        rx="170"
        ry="57"
        fill="#171A17"
        stroke="#767064"
        strokeWidth="4"
      />
      <ellipse cx="215" cy="205" rx="170" ry="57" fill="url(#noche-iron)" />
      <ellipse
        cx="215"
        cy="205"
        rx="152"
        ry="45"
        fill="none"
        stroke="#938373"
        strokeWidth="1"
        opacity=".35"
      />

      {action === "sizzle" && (
        <g fill="none" stroke="#F59E0B">
          <ellipse className="sizzle-ring" cx="215" cy="195" rx="100" ry="30" strokeWidth="3" />
          <ellipse
            className="sizzle-ring"
            cx="215"
            cy="195"
            rx="100"
            ry="30"
            strokeWidth="2"
            style={{ animationDelay: ".2s" }}
          />
        </g>
      )}

      <g
        className={action === "sizzle" ? "steam fast" : "steam"}
        fill="none"
        stroke="#F8E7CB"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M133 131q-12-16 0-31t0-29" />
        <path d="M205 105q-12-16 0-31t0-29" />
        <path d="M278 134q-12-16 0-31t0-29" />
      </g>

      <path
        d="M127 296q8 60 88 60t88-60"
        fill="#A8452C"
        stroke="#E9B571"
        strokeWidth="3"
      />
      <ellipse cx="215" cy="296" rx="88" ry="25" fill="#DDA162" />
      <ellipse cx="215" cy="296" rx="78" ry="18" fill="#842617" />
      <g fill="none" stroke="#F5A85D" strokeWidth="2">
        <circle className="broth-bubble" cx="165" cy="296" r="4" />
        <circle
          className="broth-bubble"
          cx="260"
          cy="297"
          r="5"
          style={{ animationDelay: "-.6s" }}
        />
      </g>

      <g className={action === "dip" ? "taco dipping" : "taco"}>
        <path
          d="M121 161q15-85 94-85t94 85q-20 48-94 48t-94-48"
          fill="#D88D36"
          stroke="#F2C26A"
          strokeWidth="3"
        />
        <g fill="#A45B27" opacity=".6">
          <circle cx="168" cy="117" r="4" />
          <circle cx="222" cy="94" r="3" />
          <circle cx="265" cy="128" r="5" />
          <circle cx="204" cy="139" r="3" />
        </g>

        {hasMeat && (
          <g className={action === "sizzle" ? "meat-added" : undefined}>
            <path d="M132 157q82-31 166 0l-9 27q-72 27-148 0Z" fill="#71301D" />
            <g stroke="#BB5D30" strokeWidth="8" strokeLinecap="round">
              <path d="M146 160l23 11m4-15l21 20m12-13l25 13m9-18l27 11m8-10l13 10" />
            </g>
            <path
              d="M146 177l27-7 18 15 21-13 21 13 28-15 19 9"
              fill="none"
              stroke="#F0D28A"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        )}

        {withEverything && (
          <g className={action === "toppings" ? "tossed" : undefined}>
            <g fill="#81B450">
              <path d="M157 162l6-8 6 8-6 7Z" />
              <path d="M209 170l6-8 6 8-6 7Z" />
              <path d="M260 161l6-8 6 8-6 7Z" />
              <circle cx="279" cy="179" r="4" />
            </g>
            <g fill="#FFF4DD">
              <rect x="183" y="157" width="7" height="7" transform="rotate(20 183 157)" />
              <rect x="232" y="170" width="7" height="6" />
              <rect x="249" y="176" width="6" height="6" />
              <rect x="193" y="179" width="6" height="5" />
            </g>
          </g>
        )}

        <path
          d="M124 163q91 31 183 0l-9 24q-81 42-165 0Z"
          fill="#E5A43D"
          stroke="#F2C26A"
          strokeWidth="3"
        />
        <g fill="#A45B27" opacity=".5">
          <circle cx="175" cy="190" r="3" />
          <circle cx="224" cy="197" r="4" />
          <circle cx="261" cy="191" r="3" />
        </g>
      </g>

      {action === "toppings" && (
        <g>
          <g className="lime-squeeze">
            <path d="M266 77q26-31 53 0l-26 18Z" fill="#78A744" stroke="#B6D67B" strokeWidth="3" />
            <path d="M273 77h38l-18 12Z" fill="#D1E89F" />
          </g>
          <g className="lime-drop" fill="#D1E89F">
            <path d="M289 101l-3 7q3 5 6 0Z" />
            <path d="M279 111l-3 7q3 5 6 0Z" />
            <path d="M298 115l-3 7q3 5 6 0Z" />
          </g>
        </g>
      )}

      {action === "sizzle" && (
        <g fill="#F5BD60">
          {[150, 177, 204, 236, 267, 291].map((x, index) => (
            <circle
              key={x}
              className="spice-spark"
              cx={x}
              cy={165 + (index % 2) * 10}
              r={index % 2 === 0 ? 2.5 : 3.5}
              style={{
                animationDelay: index * .06 + "s",
                "--spark-x": (index - 2.5) * 12 + "px",
              } as React.CSSProperties}
            />
          ))}
        </g>
      )}

      <path
        d="M129 307q86 36 172 0q-12 50-86 50t-86-50"
        fill="#A8452C"
        stroke="#E9B571"
        strokeWidth="2"
      />
      <path d="M136 316q79 27 158 0" fill="none" stroke="#F2CE94" strokeWidth="3" />

      {action === "dip" && (
        <g className="splash" fill="#D97535">
          <ellipse cx="141" cy="280" rx="4" ry="8" />
          <ellipse cx="286" cy="278" rx="4" ry="9" />
          <circle cx="266" cy="267" r="4" />
          <circle cx="157" cy="270" r="3" />
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
  const [action, setAction] = useState<Action>("idle");
  const [hasMeat, setHasMeat] = useState(false);
  const [withEverything, setWithEverything] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [stationMessage, setStationMessage] = useState(
    "Your comal is ready. Start with the birria.",
  );

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      const audio = audioRef.current;
      if (audio && audio.state !== "closed") {
        void audio.close().catch(() => undefined);
      }
    };
  }, []);

  const location = locations[branch];
  const salsa = salsas[salsaIndex];
  const review = reviews[reviewIndex];
  const call = phoneLink(location.phone);
  const busy = action !== "idle";

  async function playSizzle() {
    if (!soundEnabled) return;

    try {
      if (!audioRef.current) {
        if (typeof window.AudioContext === "undefined") return;
        audioRef.current = new window.AudioContext();
      }

      const context = audioRef.current;
      if (context.state === "suspended") await context.resume();
      if (context.state !== "running") return;

      const duration = .65;
      const buffer = context.createBuffer(
        1,
        Math.floor(context.sampleRate * duration),
        context.sampleRate,
      );
      const data = buffer.getChannelData(0);

      for (let index = 0; index < data.length; index++) {
        data[index] = (Math.random() * 2 - 1) * .45;
      }

      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();

      source.buffer = buffer;
      filter.type = "highpass";
      filter.frequency.value = 1800;

      const now = context.currentTime;
      gain.gain.setValueAtTime(.0001, now);
      gain.gain.exponentialRampToValueAtTime(.12, now + .04);
      gain.gain.exponentialRampToValueAtTime(.0001, now + duration);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);

      source.onended = () => {
        source.disconnect();
        filter.disconnect();
        gain.disconnect();
      };

      source.start(now);
      source.stop(now + duration);
    } catch {
      // Visual interactions continue if browser audio is unavailable.
    }
  }

  function runAction(nextAction: Exclude<Action, "idle">) {
    if (busy) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    if (nextAction === "sizzle") {
      setHasMeat(true);
      setStationMessage("¡Ese comal ya está cantando! Birria added.");
      void playSizzle();
    }

    if (nextAction === "toppings") {
      setWithEverything(true);
      setStationMessage("¡Con todo! Cilantro, cebolla, and a squeeze of lime.");
    }

    if (nextAction === "dip") {
      setStationMessage("¡Al consomé! " + salsa.name + " on the side.");
    }

    setAction(nextAction);

    timerRef.current = setTimeout(() => {
      setAction("idle");
      timerRef.current = null;

      if (nextAction === "dip") {
        setStationMessage("¡Buen provecho, marchante! Ready for another dip.");
      }
    }, nextAction === "dip" ? 1450 : 1350);
  }

  function resetStation() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setAction("idle");
    setHasMeat(false);
    setWithEverything(false);
    setStationMessage("Fresh taco. Warm comal. Let’s do it again.");
  }

  return (
    <div className="noche min-h-screen overflow-x-hidden font-sans selection:bg-[#C8102E] selection:text-white">
      <style>{styles}</style>

      <a
        href="#main"
        className={"sr-only z-50 rounded-lg bg-[#F5BD60] p-4 text-[#412B20] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 " + focus}
      >
        Skip to content
      </a>

      <StreetGarland />

      <header className="mx-auto max-w-7xl px-5 pb-8 pt-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b-4 border-double border-[#B5946B]/50 pb-6">
          <a href="#main" aria-label="El Grullo Express home" className={"flex items-center gap-3 " + focus}>
            <CharroEmblem className="hidden h-14 w-20 sm:block" />
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[.22em] text-[#E7C69A]">
                Taquería · Clarksville, Tennessee
              </span>
              <span className="rotulo mt-1 block text-3xl text-[#F8E7CB] sm:text-4xl">
                EL GRULLO <span className="text-[#F5B347]">EXPRESS</span>
              </span>
            </span>
          </a>
          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-5 text-xs font-black uppercase tracking-wider">
            <a href="#menu" className={"hover:text-[#F59E0B] " + focus}>La carta</a>
            <a href="#reviews" className={"hover:text-[#F59E0B] " + focus}>La clientela</a>
            <a href="#visit" className={"hover:text-[#F59E0B] " + focus}>Dónde estamos</a>
            <a href={call} className={primary}>
              <Phone size={15} aria-hidden="true" />
              Call to order
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section aria-labelledby="hero-heading" className="mx-auto max-w-7xl px-5 pb-14 sm:px-8">
          <div className="mb-12 flex flex-wrap items-center justify-between gap-6">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D1B595]">
              <MapPin size={16} className="text-[#F5B347]" aria-hidden="true" />
              Fort Campbell Blvd · Dos taquerías
            </p>
            <div role="group" aria-label="Choose your branch" className="flex flex-wrap gap-3">
              {locations.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={branch === index}
                  onClick={() => setBranch(index)}
                  className={
                    "flex items-center gap-3 rounded-sm border-4 border-double px-4 py-3 text-left shadow-[3px_3px_0_#0004] transition " +
                    (branch === index
                      ? "border-[#D2D6AC] bg-[#006341] text-white "
                      : "border-[#987859] bg-[#2E2119] text-[#F8E7CB] hover:bg-[#483022] ") +
                    focus
                  }
                >
                  <ArrowUpRight size={21} aria-hidden="true" />
                  <span>
                    <strong className="rotulo block text-lg">{item.name}</strong>
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
              <span className="rotulo mb-7 inline-block rotate-[-4deg] border-2 border-dashed border-[#8F3218] bg-[#F59E0B] px-4 py-2 text-xl text-[#342117]">
                ¡PÁSELE MARCHANTE!
              </span>
              <h1 id="hero-heading" className="rotulo hero-title">
                REAL STREET
                <br />
                <span className="paint-shadow text-[#F5B347]">TACOS.</span>
                <br />
                <span className="mt-3 inline-block text-[#E7C69A]">LEGENDARY</span>
                <br />
                <span className="green-shadow text-[#F07869]">BIRRIA.</span>
              </h1>
              <p className="script mt-8 max-w-md text-2xl leading-relaxed text-[#F5B347]">
                ¡Pásele joven, marchante, aquí sí hay birria!
              </p>
              <p className="mt-4 max-w-md text-base leading-7 text-[#D1B595]">
                Warm comal. Rising steam. Your favorite people around the table.
                Mexican street-food soul, right here in Clarksville.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <a href="#menu" className={primary}>
                  Find your antojo
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
                <a href="#comal" className={secondary}>
                  <Flame size={17} aria-hidden="true" />
                  Step up to the comal
                </a>
              </div>
              <a
                href={googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className={"mt-8 inline-flex -rotate-2 items-center gap-3 border-2 border-dashed border-[#A7865C] bg-[#34251B] px-4 py-3 " + focus}
              >
                <Star size={23} fill="currentColor" className="text-[#F59E0B]" aria-hidden="true" />
                <span>
                  <strong className="rotulo block text-xl">4.5 ★ ON GOOGLE</strong>
                  <span className="block text-[10px] tracking-wider text-[#D1B595]">
                    EXPRESS · 1,360+ REVIEWS
                  </span>
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>

            <article id="comal" className="comal scroll-mt-6 rounded-[2rem] p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[.2em] text-[#D1B595]">
                    COMAL CALLEJERO
                  </p>
                  <h2 className="rotulo mt-2 text-3xl text-[#F59E0B] sm:text-4xl">
                    Se prepara.<br />Se disfruta.
                  </h2>
                </div>
                <div className="flex h-24 w-24 shrink-0 rotate-[8deg] flex-col items-center justify-center rounded-full border-4 border-double border-[#FFF3DA] bg-[#C8102E] text-white shadow-[0_0_0_3px_#C8102E]">
                  <span className="rotulo text-xs">CALIENTITO</span>
                  <strong className="rotulo text-3xl">$14.99</strong>
                  <span className="text-[8px] font-bold">BIRRIA QUESA TACOS</span>
                </div>
              </div>

              <ComalIllustration action={action} hasMeat={hasMeat} withEverything={withEverything} />

              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-[#B5946B]/50 pb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#E7C69A]">
                  Tu taco. Tu ritual.
                </p>
                <button
                  type="button"
                  aria-pressed={soundEnabled}
                  onClick={() => setSoundEnabled((value) => !value)}
                  className={"flex items-center gap-2 rounded-lg border border-[#B5946B]/60 px-3 py-2 text-[10px] font-bold hover:bg-white/5 " + focus}
                >
                  {soundEnabled ? <Volume2 size={15} aria-hidden="true" /> : <VolumeX size={15} aria-hidden="true" />}
                  {soundEnabled ? "Sizzle sound on" : "Sizzle sound off"}
                </button>
              </div>

              <div className="grid gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => runAction("sizzle")}
                  className={primary + " w-full disabled:cursor-wait disabled:opacity-60"}
                >
                  <Flame size={17} aria-hidden="true" />
                  {action === "sizzle" ? "¡Ssssss! Calientito…" : "01 · Echar Carne al Comal"}
                </button>
                <button
                  type="button"
                  disabled={busy || !hasMeat}
                  onClick={() => runAction("toppings")}
                  className={secondary + " w-full disabled:cursor-not-allowed disabled:opacity-50"}
                >
                  <Leaf size={17} aria-hidden="true" />
                  {action === "toppings" ? "¡Va con todo!" : "02 · Con Todo"}
                  {withEverything && <Check size={16} aria-hidden="true" />}
                </button>
              </div>

              <p className="mb-3 mt-5 text-[10px] font-bold tracking-[.18em] text-[#D1B595]">
                ELIGE TU SALSA
              </p>
              <div role="group" aria-label="Choose salsa heat" className="grid grid-cols-3 gap-2">
                {salsas.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={salsaIndex === index}
                    onClick={() => setSalsaIndex(index)}
                    className={
                      "rounded-lg border-2 px-1 py-3 transition " +
                      (salsaIndex === index
                        ? "bg-[#FFF3DA]/10 "
                        : "border-[#8C755D] bg-black/10 hover:bg-white/5 ") +
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
                    <span className="mt-1 block text-[9px] text-[#D1B595]">{item.heat}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={busy || !hasMeat}
                onClick={() => runAction("dip")}
                className={primary + " mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50"}
              >
                <UtensilsCrossed size={17} aria-hidden="true" />
                {action === "dip" ? "¡Al consomé!" : "03 · Dip al Consomé"}
              </button>

              <p role="status" className="mt-3 min-h-12 text-center text-xs leading-5 text-[#E7C69A]">
                {stationMessage}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={resetStation}
                  className={"text-[10px] font-bold text-[#D1B595] underline underline-offset-4 " + focus}
                >
                  Start a fresh taco
                </button>
                <a href={call} className={"flex items-center gap-2 text-xs font-bold text-[#F59E0B] underline underline-offset-4 " + focus}>
                  Call for the real thing
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
              <p className="mt-4 text-center text-[10px] leading-5 text-[#D1B595]">
                A playful preview. Confirm ingredients and salsa availability with your branch.
                Sound is optional and generated in your browser.
              </p>
            </article>
          </div>

          <div
            aria-live="polite"
            aria-atomic="true"
            className="mt-12 flex flex-wrap justify-between gap-4 border-y-4 border-double border-[#A7865C]/60 py-5 text-xs text-[#D1B595]"
          >
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-[#F5B347]" aria-hidden="true" />
              {location.address} · Clarksville, TN
            </p>
            <p className="flex items-center gap-2">
              <Clock3 size={16} className="text-[#F5B347]" aria-hidden="true" />
              Sun–Thu {location.opens}–10 PM · Fri–Sat {location.opens}–11 PM
            </p>
          </div>
        </section>

        <div className="border-y-4 border-double border-[#E7C69A]/60 bg-[#006341] px-5 py-5 text-center">
          <p className="rotulo text-2xl tracking-wider sm:text-3xl">
            COMAL CALIENTE
            <span className="mx-3 text-[#F59E0B] sm:mx-7">✦</span>
            BARRIO CONTENTO
          </p>
        </div>

        <section id="menu" aria-labelledby="menu-heading" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="script text-2xl text-[#F5B347]">¿Qué le damos, marchante?</p>
              <h2 id="menu-heading" className="rotulo mt-3 text-5xl sm:text-6xl">
                LA CARTA<br /><span className="text-[#F07869]">DEL PUESTO</span>
              </h2>
            </div>
            <span className="rotulo rotate-3 border-2 border-dashed border-[#DDB16D] bg-[#C8102E] px-5 py-3 text-xl">
              ¡Aquí hay antojo!
            </span>
          </div>

          <div role="group" aria-label="Filter menu by category" className="mb-7 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={
                  "rounded-sm border-2 px-4 py-3 text-xs font-black uppercase tracking-wider transition " +
                  (category === item
                    ? "border-[#D2D6AC] bg-[#006341] text-white "
                    : "border-dashed border-[#A7865C] bg-[#2E2119] text-[#E7C69A] hover:bg-[#483022] ") +
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
                ESPECIALIDADES <span className="text-[#F59E0B]">✦</span>
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest">{location.name}</p>
            </div>
            <div aria-live="polite" aria-atomic="true" className="grid gap-x-10 md:grid-cols-2">
              {menu.filter((item) => item.category === category).map((item, index) => (
                <article key={item.name} className="flex flex-col border-b-2 border-dashed border-[#FFF3DA]/30 py-7">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold tracking-[.18em] text-[#BAD0A2]">{item.stamp}</span>
                    <span className="rotulo text-4xl text-[#FFF3DA]/25">0{index + 1}</span>
                  </div>
                  <h3 className="painted text-3xl">{item.name}</h3>
                  <p className="mt-3 text-[11px] uppercase tracking-wider text-[#F5BD60]">{item.ingredients}</p>
                  <p className="mt-4 flex-1 text-sm leading-6 text-[#E4D3B5]">{item.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="rotulo -rotate-3 border-2 border-dashed border-[#F5BD60] px-4 py-2 text-3xl text-[#F59E0B]">
                      {item.price === null ? "Ask us" : "$" + item.price.toFixed(2)}
                    </span>
                    <a
                      href={call}
                      aria-label={"Call " + location.name + " about " + item.name}
                      className={"flex items-center gap-2 text-xs font-black uppercase tracking-wider hover:text-[#F59E0B] " + focus}
                    >
                      Call to order
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="pt-5 text-xs leading-6 text-[#E4D3B5]">
              Prices before tax. Menu, prices, and availability may vary by branch.
              Ask about today&apos;s caldos and desserts.
            </p>
          </div>
        </section>

        <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-8 border-y-2 border-dashed border-[#A7865C]/60 bg-[#2A1B14] py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <CharroEmblem className="mb-4 h-16 w-24" />
              <p className="script text-2xl text-[#F5B347]">La clientela tiene la palabra.</p>
              <h2 id="reviews-heading" className="rotulo mt-4 text-5xl leading-none sm:text-6xl">
                BUEN TACO.<br />
                BUENA CHARLA.<br />
                <span className="text-[#AFC78B]">BUENA ONDA.</span>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-[#D1B595]">
                Real Google review excerpts from Express guests, republished by Wanderlog.
              </p>
              <a
                href={googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className={"mt-6 inline-flex items-center gap-3 border-2 border-dashed border-[#A7865C] bg-[#34251B] px-4 py-3 " + focus}
              >
                <Star size={23} fill="currentColor" className="text-[#F59E0B]" aria-hidden="true" />
                <strong className="rotulo text-2xl">4.5 / 5</strong>
                <span className="text-[10px] font-bold">EXPRESS ON GOOGLE</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>

            <div className="mx-auto w-full max-w-lg">
              <article className="ticket rotate-1 border-2 border-[#C6A37D] p-7 sm:p-9">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="rotulo text-3xl">EL GRULLO</p>
                    <p className="text-[10px] font-bold tracking-widest">EXPRESS · CLARKSVILLE, TN</p>
                  </div>
                  <span className="rotulo -rotate-12 border-2 border-[#006341] px-2 py-1 text-sm text-[#006341]">CON SABOR</span>
                </div>
                <div className="my-5 flex justify-between gap-3 border-y-2 border-dashed border-[#A88763] py-3 font-mono text-[10px]">
                  <span>COMPROBANTE DE CANTINA</span>
                  <span>NO. 00{reviewIndex + 1}</span>
                </div>
                <div aria-live="polite" aria-atomic="true" className="min-h-60">
                  <p className="text-xs font-black tracking-[.18em] text-[#006341]">{review.topic}</p>
                  <blockquote className="painted mt-5 text-3xl leading-snug sm:text-4xl">
                    “{review.quote}”
                  </blockquote>
                  <p className="mt-6 text-sm font-bold">— {review.author}</p>
                  <p className="mt-1 text-[10px] tracking-widest text-[#765338]">GOOGLE REVIEW EXCERPT</p>
                </div>
                <a
                  href={review.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={"mt-5 flex items-center justify-between gap-3 border-t-2 border-dashed border-[#A88763] pt-4 text-[10px] uppercase tracking-widest text-[#765338] " + focus}
                >
                  Read source on Wanderlog
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <p className="script my-5 text-center text-2xl text-[#C8102E]">¡Gracias, vuelva pronto!</p>
                <div className="barcode mx-auto max-w-48" aria-hidden="true" />
              </article>
              <div className="mt-8 flex items-center justify-between gap-4">
                <p className="font-mono text-xs text-[#D1B595]">TICKET 0{reviewIndex + 1} / 0{reviews.length}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous review"
                    onClick={() => setReviewIndex((index) => (index + reviews.length - 1) % reviews.length)}
                    className={"rounded-sm border-2 border-dashed border-[#A7865C] p-3 hover:bg-[#483022] " + focus}
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next review"
                    onClick={() => setReviewIndex((index) => (index + 1) % reviews.length)}
                    className={"rounded-sm border-2 border-dashed border-[#A7865C] p-3 hover:bg-[#483022] " + focus}
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
            <p className="script text-2xl text-[#F5B347]">Aquí lo esperamos.</p>
            <h2 id="visit-heading" className="rotulo mt-3 text-5xl sm:text-6xl">
              NOS VEMOS EN EL GRULLO.
            </h2>
            <p className="mt-4 text-sm text-[#D1B595]">Two Clarksville stops on Fort Campbell Boulevard.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {locations.map((item, index) => (
              <article
                key={item.name}
                className={
                  "street-card rounded-xl p-7 sm:p-8 " +
                  (branch === index ? "ring-2 ring-[#AFC78B] ring-offset-4 ring-offset-[#2A1B14]" : "")
                }
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-[#D1B595]">FORT CAMPBELL BLVD</span>
                  {branch === index && (
                    <span className="flex items-center gap-1 text-[10px] font-black text-[#AFC78B]">
                      <Check size={14} aria-hidden="true" />
                      SELECTED
                    </span>
                  )}
                </div>
                <h3 className="rotulo text-4xl text-[#F5B347]">{item.title}</h3>
                <address className="mt-4 text-sm not-italic leading-7 text-[#D1B595]">
                  {item.address}<br />
                  Clarksville, TN<br />
                  <a href={phoneLink(item.phone)} className={"font-bold text-[#F8E7CB] " + focus}>{item.phone}</a>
                </address>
                <dl className="mt-5 space-y-3 border-y-2 border-dashed border-[#A7865C]/60 py-4 text-xs">
                  <div className="flex justify-between gap-4"><dt>Sunday–Thursday</dt><dd>{item.opens}–10 PM</dd></div>
                  <div className="flex justify-between gap-4"><dt>Friday–Saturday</dt><dd>{item.opens}–11 PM</dd></div>
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
            <a href={directionsLink(location.address)} target="_blank" rel="noopener noreferrer" className={primary}>
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

      <footer className="border-t-4 border-double border-[#E7C69A]/60 bg-[#006341] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <CharroEmblem className="h-12 w-16" />
            <div>
              <p className="rotulo text-3xl">EL GRULLO EXPRESS</p>
              <p className="mt-2 text-[10px] uppercase tracking-widest">Mexican roots. Clarksville appetite.</p>
            </div>
          </div>
          <p className="script flex items-center gap-2 text-2xl text-[#F5BD60]">
            <Sparkles size={20} aria-hidden="true" />
            Del comal al corazón.
          </p>
          <a href="#main" className={"text-xs font-bold uppercase tracking-widest " + focus}>Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
