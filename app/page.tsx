"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
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
  "Especialidades",
  "Aguas Frescas",
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
    category: "Especialidades",
    price: 13.26,
    ingredients: "Carne asada · fries",
    description: "For the kind of hunger that means business.",
    stamp: "BIEN SERVIDO",
  },
  {
    name: "Menudo y Pozole",
    category: "Especialidades",
    price: null,
    ingredients: "Traditional caldos · ask about availability",
    description: "Comfort by the bowl. Call your branch for today's selection.",
    stamp: "COMO EN CASA",
  },
  {
    name: "Aguas Frescas de Vitrolero",
    category: "Aguas Frescas",
    price: 6.92,
    ingredients: "32 ounces · ask about today's flavors",
    description: "Something cool between the bites. Ask what is pouring today.",
    stamp: "BIEN FRÍAS",
  },
];

const salsas = [
  { name: "Verde Suave", heat: "Suavecita", color: "#006341", flames: 1 },
  { name: "Roja Picante", heat: "Con carácter", color: "#C8102E", flames: 2 },
  { name: "Habanero Fuego", heat: "¡Aguas!", color: "#B45309", flames: 3 },
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
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006341]";

const glass =
  "rounded-3xl border border-white/60 bg-white/80 backdrop-blur-md shadow-[0_12px_35px_rgba(30,25,20,0.12)]";

const primary =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-[#C8102E]/35 bg-[#C8102E]/90 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-[#A70E27]/95 " +
  focus;

const secondary =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-white/60 bg-white/70 px-5 py-3 text-sm font-bold text-[#006341] backdrop-blur-md transition hover:bg-white/80 " +
  focus;

const phoneLink = (phone: string) => "tel:+1" + phone.replaceAll("-", "");

const directionsLink = (address: string) =>
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(address + ", Clarksville, TN");

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const styles = [
  ".spatial-taqueria{color:#35291F;}",
  ".spatial-taqueria .rotulo{font-family:Impact,'Arial Black',Haettenschweiler,sans-serif;font-weight:900;text-transform:uppercase;letter-spacing:.02em;}",
  ".spatial-taqueria .painted{font-family:Georgia,'Times New Roman',serif;font-weight:900;}",
  ".spatial-taqueria .script{font-family:Georgia,'Times New Roman',serif;font-style:italic;}",
  ".spatial-taqueria .hero-title{font-size:clamp(2.8rem,6.5vw,5.9rem);line-height:1;letter-spacing:-.025em;}",
  ".spatial-taqueria .paint-shadow{text-shadow:1px 1px 0 #FFFFFF,3px 3px 0 #C8102E55;}",
  ".spatial-taqueria .spatial-anchor{perspective:1100px;perspective-origin:50% 50%;min-width:0;}",
  ".spatial-taqueria .spatial-scroll{height:100%;transform-origin:50% 50%;transform-style:preserve-3d;transform:translate3d(0,var(--scroll-y,0px),var(--scroll-z,0px)) rotateX(var(--scroll-pitch,0deg)) scale(var(--scroll-scale,1));}",
  ".spatial-taqueria .spatial-float{height:100%;transform-style:preserve-3d;transform:translate3d(0,var(--float-y,0px),var(--float-z,0px));}",
  ".spatial-taqueria .spatial-cursor{height:100%;transform-style:preserve-3d;transform:rotateX(var(--cursor-x,0deg)) rotateY(var(--cursor-y,0deg));transition:transform .22s cubic-bezier(.2,.7,.2,1);}",
  ".spatial-taqueria .spatial-content{height:100%;}",
  ".spatial-taqueria .papel{transform-origin:top center;animation:spatial-papel 5s ease-in-out infinite;}",
  ".spatial-taqueria .bulb-sway{transform-box:fill-box;transform-origin:top center;animation:spatial-bulb 6s ease-in-out infinite;}",
  ".spatial-taqueria .steam{animation:spatial-steam 3s ease-in-out infinite;}",
  ".spatial-taqueria .steam.fast{animation-duration:1s;}",
  ".spatial-taqueria .ember{animation:spatial-ember 3s ease-in-out infinite;}",
  ".spatial-taqueria .bubble{transform-box:fill-box;transform-origin:center;animation:spatial-bubble 1.8s ease-in-out infinite;}",
  ".spatial-taqueria .taco{transform-origin:215px 150px;}",
  ".spatial-taqueria .taco.dipping{animation:spatial-dunk 1.4s ease-in-out both;}",
  ".spatial-taqueria .meat-added{animation:spatial-meat .65s ease-out both;}",
  ".spatial-taqueria .sizzle-ring{transform-box:fill-box;transform-origin:center;animation:spatial-sizzle 1.3s ease-out both;}",
  ".spatial-taqueria .spice-spark{animation:spatial-spark .85s ease-out both;}",
  ".spatial-taqueria .tossed{animation:spatial-toss .8s ease-out both;}",
  ".spatial-taqueria .lime-squeeze{transform-origin:292px 87px;animation:spatial-lime .9s ease-in-out both;}",
  ".spatial-taqueria .lime-drop{animation:spatial-lime-drop .9s ease-in both;}",
  ".spatial-taqueria .splash{animation:spatial-splash 1.4s ease-in-out both;}",
  ".spatial-taqueria .barcode{height:23px;background:repeating-linear-gradient(90deg,#412B20 0 2px,transparent 2px 4px,#412B20 4px 5px,transparent 5px 9px);opacity:.5;}",
  "@keyframes spatial-papel{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}",
  "@keyframes spatial-bulb{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}",
  "@keyframes spatial-steam{0%,100%{opacity:.2;transform:translateY(4px)}50%{opacity:.65;transform:translateY(-9px)}}",
  "@keyframes spatial-ember{0%,100%{opacity:.4}50%{opacity:1}}",
  "@keyframes spatial-bubble{0%,100%{opacity:.25;transform:scale(.6)}50%{opacity:.85;transform:scale(1.15)}}",
  "@keyframes spatial-dunk{0%,100%{transform:translate(0,0) rotate(0)}42%,60%{transform:translate(0,96px) rotate(-9deg)}}",
  "@keyframes spatial-meat{0%{opacity:0;transform:translateY(-65px)}65%{opacity:1;transform:translateY(4px)}100%{opacity:1;transform:translateY(0)}}",
  "@keyframes spatial-sizzle{0%{opacity:.85;transform:scale(.6)}100%{opacity:0;transform:scale(1.35)}}",
  "@keyframes spatial-spark{0%{opacity:0;transform:translate(0,0)}20%{opacity:1}100%{opacity:0;transform:translate(var(--spark-x,0px),-65px)}}",
  "@keyframes spatial-toss{0%{opacity:0;transform:translate(15px,-75px) rotate(-12deg)}75%{opacity:1;transform:translate(0,3px) rotate(0)}100%{opacity:1;transform:translate(0,0)}}",
  "@keyframes spatial-lime{0%,100%{transform:rotate(-12deg) scale(1)}45%{transform:rotate(8deg) scale(.85)}}",
  "@keyframes spatial-lime-drop{0%,20%{opacity:0;transform:translateY(0)}35%{opacity:1}100%{opacity:0;transform:translateY(65px)}}",
  "@keyframes spatial-splash{0%,25%,85%,100%{opacity:0;transform:translateY(8px)}45%,60%{opacity:1;transform:translateY(-5px)}}",
  "@media(prefers-reduced-motion:reduce){.spatial-taqueria *,.spatial-taqueria *:before,.spatial-taqueria *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition:none!important;}.spatial-taqueria .spatial-scroll,.spatial-taqueria .spatial-float,.spatial-taqueria .spatial-cursor{transform:none!important;}}",
].join("\n");

type SpatialItem = {
  anchor: HTMLElement;
  layer: HTMLElement;
  center: number;
  height: number;
  speed: number;
  float: number;
  phase: number;
  y: number;
  z: number;
  pitch: number;
  scale: number;
};

function useSpatialScroll(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let items: SpatialItem[] = [];
    let frame = 0;
    let dirty = true;
    let rebuild = true;
    let scrollY = window.scrollY;
    let viewportHeight = window.innerHeight;
    let previousTime = 0;

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            dirty = true;
          })
        : null;

    function rebuildItems() {
      const previous = new Map(items.map((item) => [item.anchor, item]));
      resizeObserver?.disconnect();

      items = Array.from(
        root!.querySelectorAll<HTMLElement>("[data-spatial-anchor]"),
      ).flatMap((anchor, index) => {
        const layer = anchor.querySelector<HTMLElement>("[data-spatial-layer]");
        if (!layer) return [];

        const saved = previous.get(anchor);
        resizeObserver?.observe(anchor);

        return [{
          anchor,
          layer,
          center: saved?.center ?? 0,
          height: saved?.height ?? 0,
          speed: Number(anchor.dataset.speed ?? "0.035"),
          float: Number(anchor.dataset.float ?? "0"),
          phase: Number(anchor.dataset.phase ?? index * 0.8),
          y: saved?.y ?? 0,
          z: saved?.z ?? 0,
          pitch: saved?.pitch ?? 0,
          scale: saved?.scale ?? 1,
        }];
      });

      resizeObserver?.observe(root!);
      rebuild = false;
      dirty = true;
    }

    function measure() {
      scrollY = window.scrollY;
      viewportHeight = window.innerHeight;

      for (const item of items) {
        const bounds = item.anchor.getBoundingClientRect();
        item.center = bounds.top + scrollY + bounds.height / 2;
        item.height = bounds.height;
      }

      dirty = false;
    }

    function renderFrame(time: number) {
      frame = 0;
      if (document.hidden || motionPreference.matches) return;

      if (rebuild) rebuildItems();
      if (dirty) measure();

      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16.67;
      const smoothing = 1 - Math.exp(-elapsed / 105);
      previousTime = time;
      const viewportCenter = scrollY + viewportHeight / 2;

      for (const item of items) {
        const offset = item.center - viewportCenter;
        const range = viewportHeight / 2 + item.height / 2;
        const normalized = clamp(offset / Math.max(range, 1), -1, 1);
        const distance = Math.abs(normalized);

        if (Math.abs(offset) > range + 180) {
          item.layer.style.willChange = "auto";
          continue;
        }

        const pitchTarget = normalized >= 0 ? normalized * 4 : normalized * 2;
        const zTarget = -20 * distance;
        const scaleTarget = 1 - distance * .02;
        const yTarget = clamp(-offset * item.speed, -24, 24);

        item.y += (yTarget - item.y) * smoothing;
        item.z += (zTarget - item.z) * smoothing;
        item.pitch += (pitchTarget - item.pitch) * smoothing;
        item.scale += (scaleTarget - item.scale) * smoothing;

        const seconds = time / 1000;
        const floatingY =
          Math.sin(seconds * .85 + item.phase) * item.float;
        const floatingZ =
          Math.cos(seconds * .65 + item.phase) * item.float * .6;

        const style = item.layer.style;
        style.willChange = "transform";
        style.setProperty("--scroll-y", item.y.toFixed(3) + "px");
        style.setProperty("--scroll-z", item.z.toFixed(3) + "px");
        style.setProperty("--scroll-pitch", item.pitch.toFixed(3) + "deg");
        style.setProperty("--scroll-scale", item.scale.toFixed(5));
        style.setProperty("--float-y", floatingY.toFixed(3) + "px");
        style.setProperty("--float-z", floatingZ.toFixed(3) + "px");
      }

      frame = requestAnimationFrame(renderFrame);
    }

    function start() {
      if (!frame && !document.hidden && !motionPreference.matches) {
        previousTime = 0;
        frame = requestAnimationFrame(renderFrame);
      }
    }

    function onScroll() {
      scrollY = window.scrollY;
      start();
    }

    function onResize() {
      dirty = true;
      start();
    }

    function onVisibilityChange() {
      if (document.hidden) {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
      } else {
        dirty = true;
        start();
      }
    }

    function onMotionChange() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;

      if (motionPreference.matches) {
        for (const item of items) {
          item.layer.style.willChange = "auto";
        }
      } else {
        dirty = true;
        start();
      }
    }

    const mutationObserver = new MutationObserver(() => {
      rebuild = true;
      start();
    });

    mutationObserver.observe(root, { childList: true, subtree: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionPreference.addEventListener("change", onMotionChange);
    start();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionPreference.removeEventListener("change", onMotionChange);
    };
  }, [rootRef]);
}

function SpatialCard({
  children,
  className = "",
  anchorClassName = "",
  speed = .035,
  float = 0,
  phase = 0,
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  anchorClassName?: string;
  speed?: number;
  float?: number;
  phase?: number;
  tilt?: boolean;
}) {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const pointerFrameRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      if (pointerFrameRef.current) {
        cancelAnimationFrame(pointerFrameRef.current);
      }
    };
  }, []);

  function movePointer(event: PointerEvent<HTMLDivElement>) {
    if (
      !tilt ||
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: clamp((event.clientX - bounds.left) / bounds.width - .5, -.5, .5),
      y: clamp((event.clientY - bounds.top) / bounds.height - .5, -.5, .5),
    };

    if (pointerFrameRef.current) return;

    pointerFrameRef.current = requestAnimationFrame(() => {
      pointerFrameRef.current = 0;
      const layer = cursorRef.current;
      if (!layer) return;

      layer.style.setProperty("--cursor-x", -pointerRef.current.y * 6 + "deg");
      layer.style.setProperty("--cursor-y", pointerRef.current.x * 6 + "deg");
    });
  }

  function resetPointer() {
    if (pointerFrameRef.current) {
      cancelAnimationFrame(pointerFrameRef.current);
      pointerFrameRef.current = 0;
    }

    cursorRef.current?.style.setProperty("--cursor-x", "0deg");
    cursorRef.current?.style.setProperty("--cursor-y", "0deg");
  }

  return (
    <div
      data-spatial-anchor=""
      data-speed={speed}
      data-float={float}
      data-phase={phase}
      className={"spatial-anchor " + anchorClassName}
      onPointerMove={movePointer}
      onPointerLeave={resetPointer}
      onPointerCancel={resetPointer}
    >
      <div data-spatial-layer="" className="spatial-scroll">
        <div className="spatial-float">
          <div ref={cursorRef} className="spatial-cursor">
            <div className={"spatial-content " + className}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CharroEmblem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 64" className={className} fill="none" aria-hidden="true">
      <path d="M29 39L36 16Q50 3 64 16L71 39" fill="#B66D34" stroke="#E7B669" strokeWidth="3" />
      <ellipse cx="50" cy="43" rx="43" ry="14" fill="#D98C40" stroke="#8A4E2A" strokeWidth="3" />
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
  return (
    <div className="relative h-36 overflow-hidden sm:h-40" aria-hidden="true">
      <svg viewBox="0 0 1200 100" preserveAspectRatio="xMidYMin slice" className="absolute inset-x-0 top-0 h-24 w-full">
        <defs>
          <radialGradient id="spatial-light-halo">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity=".55" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M0 10Q600 92 1200 10" fill="none" stroke="#76604A" strokeWidth="2" />
        {Array.from({ length: 12 }, (_, index) => {
          const x = 50 + index * 100;
          const normalized = (x - 600) / 600;
          const y = 10 + 41 * (1 - normalized * normalized);

          return (
            <g key={index}>
              <circle cx={x} cy={y + 24} r="30" fill="url(#spatial-light-halo)" />
              <g className="bulb-sway" style={{ animationDelay: index * -.4 + "s" }}>
                <path d={"M" + x + " " + y + "v13"} stroke="#76604A" strokeWidth="2" />
                <rect x={x - 4} y={y + 11} width="8" height="7" rx="2" fill="#76604A" />
                <ellipse cx={x} cy={y + 26} rx="7" ry="10" fill="#FFE0A1" stroke="#D99A2C" />
                <path d={"M" + (x - 2) + " " + (y + 23) + "l2 7 2-7"} fill="none" stroke="#FFF9DF" strokeWidth="1.5" />
              </g>
            </g>
          );
        })}
      </svg>

      <div className="absolute inset-x-0 top-20 flex justify-center gap-3 border-t border-[#947557]/50 sm:top-24">
        {Array.from({ length: 18 }, (_, index) => (
          <svg
            key={index}
            viewBox="0 0 90 78"
            className="papel h-[58px] w-[68px] shrink-0"
            style={{
              color: ["#006341", "#FFF9EC", "#C8102E", "#E5A12B", "#0D9488"][index % 5],
              animationDelay: (index % 6) * -.6 + "s",
            }}
          >
            <defs>
              <mask id={"spatial-flag-" + index}>
                <rect width="90" height="78" fill="white" />
                <path d="M0 70L9 78L18 70L27 78L36 70L45 78L54 70L63 78L72 70L81 78L90 70V78H0Z" fill="black" />
                <path d="M45 13L54 25L45 37L36 25ZM45 44L55 55L45 66L35 55Z" fill="black" />
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
            <rect width="90" height="78" fill="currentColor" mask={"url(#spatial-flag-" + index + ")"} />
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
        "Taco on an iron comal" +
        (hasMeat ? ", with birria" : ", ready for birria") +
        (withEverything ? ", cilantro, onion, and lime" : "") +
        (action === "dip" ? ", dipping into consomé" : "")
      }
    >
      <defs>
        <radialGradient id="spatial-iron">
          <stop offset="0%" stopColor="#56534B" />
          <stop offset="100%" stopColor="#222521" />
        </radialGradient>
        <radialGradient id="spatial-fire">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity=".5" />
          <stop offset="100%" stopColor="#C8102E" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="215" cy="275" rx="178" ry="66" fill="url(#spatial-fire)" />
      <g className="ember" fill="#F59E0B">
        <path d="M87 258q-7-17 3-26q2 14 9 21Z" />
        <path d="M151 273q-8-17 1-29q5 14 12 22Z" />
        <path d="M267 270q-6-18 5-27q0 15 9 22Z" />
        <path d="M338 255q-8-15 1-26q4 13 11 21Z" />
      </g>
      <ellipse cx="215" cy="219" rx="170" ry="57" fill="#171A17" stroke="#767064" strokeWidth="4" />
      <ellipse cx="215" cy="205" rx="170" ry="57" fill="url(#spatial-iron)" />
      <ellipse cx="215" cy="205" rx="152" ry="45" fill="none" stroke="#938373" opacity=".35" />

      {action === "sizzle" && (
        <g fill="none" stroke="#F59E0B">
          <ellipse className="sizzle-ring" cx="215" cy="195" rx="100" ry="30" strokeWidth="3" />
          <ellipse className="sizzle-ring" cx="215" cy="195" rx="100" ry="30" strokeWidth="2" style={{ animationDelay: ".2s" }} />
        </g>
      )}

      <g className={action === "sizzle" ? "steam fast" : "steam"} fill="none" stroke="#8B7057" strokeWidth="3" strokeLinecap="round">
        <path d="M133 131q-12-16 0-31t0-29" />
        <path d="M205 105q-12-16 0-31t0-29" />
        <path d="M278 134q-12-16 0-31t0-29" />
      </g>

      <path d="M127 296q8 60 88 60t88-60" fill="#A8452C" stroke="#E9B571" strokeWidth="3" />
      <ellipse cx="215" cy="296" rx="88" ry="25" fill="#DDA162" />
      <ellipse cx="215" cy="296" rx="78" ry="18" fill="#842617" />
      <g fill="none" stroke="#F5A85D" strokeWidth="2">
        <circle className="bubble" cx="165" cy="296" r="4" />
        <circle className="bubble" cx="260" cy="297" r="5" style={{ animationDelay: "-.6s" }} />
      </g>

      <g className={action === "dip" ? "taco dipping" : "taco"}>
        <path d="M121 161q15-85 94-85t94 85q-20 48-94 48t-94-48" fill="#D88D36" stroke="#F2C26A" strokeWidth="3" />
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
            <path d="M146 177l27-7 18 15 21-13 21 13 28-15 19 9" fill="none" stroke="#F0D28A" strokeWidth="4" strokeLinecap="round" />
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
        <path d="M124 163q91 31 183 0l-9 24q-81 42-165 0Z" fill="#E5A43D" stroke="#F2C26A" strokeWidth="3" />
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
          <g className="lime-drop" fill="#84A344">
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
              } as CSSProperties}
            />
          ))}
        </g>
      )}
      <path d="M129 307q86 36 172 0q-12 50-86 50t-86-50" fill="#A8452C" stroke="#E9B571" strokeWidth="2" />
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
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

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

  useSpatialScroll(rootRef);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let active = true;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const tryPlayback = () => {
      if (!active || document.hidden) return;
      video.muted = true;
      const playback = video.play();
      if (playback) void playback.catch(() => undefined);
    };

    const onVisibilityChange = () => {
      if (!document.hidden) tryPlayback();
    };

    tryPlayback();
    video.addEventListener("loadeddata", tryPlayback);
    video.addEventListener("canplay", tryPlayback);
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("pointerdown", tryPlayback);
    document.addEventListener("keydown", tryPlayback);

    return () => {
      active = false;
      video.removeEventListener("loadeddata", tryPlayback);
      video.removeEventListener("canplay", tryPlayback);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("pointerdown", tryPlayback);
      document.removeEventListener("keydown", tryPlayback);
    };
  }, []);

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
      const samples = buffer.getChannelData(0);

      for (let index = 0; index < samples.length; index++) {
        samples[index] = (Math.random() * 2 - 1) * .45;
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
      // Visual interactions continue when browser audio is unavailable.
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
    <div
      ref={rootRef}
      className="spatial-taqueria relative isolate min-h-screen overflow-x-clip bg-transparent font-sans selection:bg-[#C8102E] selection:text-white"
    >
      <style>{styles}</style>

      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full -z-50 pointer-events-none object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/mexico-street.mp4" type="video/mp4" />
      </video>

      <a
        href="#main"
        className={"sr-only z-50 rounded-xl bg-white/80 p-4 backdrop-blur-md focus:not-sr-only focus:fixed focus:left-4 focus:top-4 " + focus}
      >
        Skip to content
      </a>

      <div className="border-b border-white/60 bg-white/70 px-4 py-2 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 text-center text-[10px] font-bold uppercase tracking-[.14em] sm:text-xs">
          <span className="flex h-4 w-7 overflow-hidden rounded-sm border border-[#35291F]/15" aria-label="Mexican flag colors">
            <span className="w-1/3 bg-[#006341]" />
            <span className="w-1/3 bg-white" />
            <span className="w-1/3 bg-[#C8102E]" />
          </span>
          <span>El Grullo Express</span>
          <span className="text-[#C8102E]">✦</span>
          <span>Mexican roots. Clarksville appetite.</span>
        </div>
      </div>

      <StreetGarland />

      <header className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
        <div className={glass + " p-5 sm:p-6"}>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <a href="#main" aria-label="El Grullo Express home" className={"flex items-center gap-3 " + focus}>
              <CharroEmblem className="hidden h-12 w-16 sm:block" />
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[.2em] text-[#006341]">
                  Taquería · Clarksville, Tennessee
                </span>
                <span className="rotulo mt-1 block text-3xl text-[#C8102E]">
                  EL GRULLO <span className="text-[#006341]">EXPRESS</span>
                </span>
              </span>
            </a>
            <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-5 text-xs font-bold uppercase tracking-wider">
              <a href="#menu" className={"hover:text-[#C8102E] " + focus}>La carta</a>
              <a href="#reviews" className={"hover:text-[#C8102E] " + focus}>La clientela</a>
              <a href="#visit" className={"hover:text-[#C8102E] " + focus}>Visítanos</a>
              <a href={call} className={primary}>
                <Phone size={15} aria-hidden="true" />
                Call {location.name}
              </a>
            </nav>
          </div>

          <SpatialCard speed={.018} float={1.2} phase={.5} tilt={false} anchorClassName="mt-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#35291F]/15 pt-4">
              <p className="flex items-center gap-2 text-xs font-bold text-[#69503C]">
                <MapPin size={16} className="text-[#006341]" aria-hidden="true" />
                Two branches. One big appetite.
              </p>
              <div role="group" aria-label="Choose your branch" className="flex flex-wrap gap-2">
                {locations.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={branch === index}
                    onClick={() => setBranch(index)}
                    className={
                      "flex items-center gap-3 rounded-xl border px-4 py-3 text-left backdrop-blur-md transition " +
                      (branch === index
                        ? "border-[#006341]/40 bg-[#006341]/85 text-white "
                        : "border-white/60 bg-white/70 text-[#006341] hover:bg-white/80 ") +
                      focus
                    }
                  >
                    <ArrowUpRight size={18} aria-hidden="true" />
                    <span>
                      <strong className="block text-sm">{item.name}</strong>
                      <span className="block text-[10px]">
                        {index === 0 ? "1951" : "3195"} Ft Campbell Blvd
                      </span>
                    </span>
                    {branch === index && <Check size={15} aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </div>
          </SpatialCard>
        </div>
      </header>

      <main id="main">
        <section aria-labelledby="hero-heading" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
            <SpatialCard speed={.024} float={1.4} phase={.3} className={glass + " p-6 sm:p-9"}>
              <span className="rotulo mb-7 inline-block rotate-[-3deg] rounded-lg border border-[#B45309]/30 bg-[#F59E0B]/75 px-4 py-2 text-lg">
                ¡PÁSELE MARCHANTE!
              </span>
              <h1 id="hero-heading" className="rotulo hero-title">
                REAL STREET<br />
                <span className="paint-shadow text-[#006341]">TACOS.</span><br />
                <span className="mt-3 inline-block text-[#A34E2C]">LEGENDARY</span><br />
                <span className="text-[#C8102E]">BIRRIA.</span>
              </h1>
              <p className="script mt-7 text-2xl leading-relaxed text-[#9B4826]">
                ¡Pásele joven, marchante, aquí sí hay birria!
              </p>
              <p className="mt-4 max-w-md text-base leading-7 text-[#69503C]">
                Warm comal. Rising steam. Your favorite people around the table.
                Mexican street-food soul, right here in Clarksville.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#menu" className={primary}>
                  Find your antojo
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
                <a href="#comal" className={secondary}>
                  <Flame size={17} aria-hidden="true" />
                  Step up to the comal
                </a>
              </div>
              <a href={googleReviews} target="_blank" rel="noopener noreferrer" className={"mt-7 inline-flex items-center gap-3 rounded-xl border border-white/60 bg-white/70 px-4 py-3 backdrop-blur-md " + focus}>
                <Star size={22} fill="currentColor" className="text-[#B45309]" aria-hidden="true" />
                <span>
                  <strong className="rotulo block text-xl">4.5 ★ ON GOOGLE</strong>
                  <span className="block text-[10px] tracking-wider text-[#69503C]">
                    EXPRESS · 1,360+ REVIEWS
                  </span>
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </SpatialCard>

            <div id="comal" className="scroll-mt-8">
              <SpatialCard speed={.065} float={3.5} phase={1.7} className={glass + " p-5 sm:p-7"}>
                <article>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold tracking-[.18em] text-[#006341]">COMAL CALLEJERO</p>
                      <h2 className="rotulo mt-2 text-3xl sm:text-4xl">Birria Quesa Taco</h2>
                      <p className="script mt-2 text-lg text-[#9B4826]">Tu taco. Tu ritual.</p>
                    </div>
                    <div className="flex h-24 w-24 shrink-0 rotate-[7deg] flex-col items-center justify-center rounded-full border-4 border-double border-white/80 bg-[#C8102E]/90 text-white backdrop-blur-md">
                      <span className="rotulo text-xs">CALIENTITO</span>
                      <strong className="rotulo text-3xl">$14.99</strong>
                      <span className="text-[8px] font-bold">BIRRIA QUESA TACOS</span>
                    </div>
                  </div>

                  <ComalIllustration action={action} hasMeat={hasMeat} withEverything={withEverything} />

                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#35291F]/15 pb-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#69503C]">Se prepara. Se disfruta.</p>
                    <button
                      type="button"
                      aria-pressed={soundEnabled}
                      onClick={() => setSoundEnabled((value) => !value)}
                      className={"flex items-center gap-2 rounded-lg border border-white/60 bg-white/60 px-3 py-2 text-[10px] font-bold backdrop-blur-md hover:bg-white/80 " + focus}
                    >
                      {soundEnabled ? <Volume2 size={15} aria-hidden="true" /> : <VolumeX size={15} aria-hidden="true" />}
                      {soundEnabled ? "Sizzle sound on" : "Sizzle sound off"}
                    </button>
                  </div>

                  <div className="grid gap-2">
                    <button type="button" disabled={busy} onClick={() => runAction("sizzle")} className={primary + " w-full disabled:cursor-wait disabled:opacity-60"}>
                      <Flame size={17} aria-hidden="true" />
                      {action === "sizzle" ? "¡Ssssss! Calientito…" : "01 · Echar Carne al Comal"}
                    </button>
                    <button type="button" disabled={busy || !hasMeat} onClick={() => runAction("toppings")} className={secondary + " w-full disabled:cursor-not-allowed disabled:opacity-50"}>
                      <Leaf size={17} aria-hidden="true" />
                      {action === "toppings" ? "¡Va con todo!" : "02 · Con Todo"}
                      {withEverything && <Check size={16} aria-hidden="true" />}
                    </button>
                  </div>

                  <p className="mb-3 mt-5 text-[10px] font-bold tracking-[.18em] text-[#69503C]">ELIGE TU SALSA</p>
                  <div role="group" aria-label="Choose salsa heat" className="grid grid-cols-3 gap-2">
                    {salsas.map((item, index) => (
                      <button
                        key={item.name}
                        type="button"
                        aria-pressed={salsaIndex === index}
                        onClick={() => setSalsaIndex(index)}
                        className={
                          "rounded-xl border-2 bg-white/60 px-1 py-3 backdrop-blur-md transition hover:bg-white/80 " +
                          (salsaIndex === index ? "shadow-[0_3px_12px_rgba(30,25,20,0.1)] " : "border-white/60 ") +
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
                        <span className="mt-1 block text-[9px] text-[#69503C]">{item.heat}</span>
                      </button>
                    ))}
                  </div>

                  <button type="button" disabled={busy || !hasMeat} onClick={() => runAction("dip")} className={primary + " mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50"}>
                    <UtensilsCrossed size={17} aria-hidden="true" />
                    {action === "dip" ? "¡Al consomé!" : "03 · Dip al Consomé"}
                  </button>

                  <p role="status" className="mt-3 min-h-12 text-center text-xs leading-5 text-[#69503C]">{stationMessage}</p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button type="button" onClick={resetStation} className={"text-[10px] font-bold text-[#69503C] underline underline-offset-4 " + focus}>
                      Start a fresh taco
                    </button>
                    <a href={call} className={"flex items-center gap-2 text-xs font-bold text-[#006341] underline underline-offset-4 " + focus}>
                      Call for the real thing
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                  <p className="mt-4 text-center text-[10px] leading-5 text-[#69503C]">
                    A playful preview. Confirm ingredients and salsa availability with your branch.
                    Sound is optional and generated in your browser.
                  </p>
                </article>
              </SpatialCard>
            </div>
          </div>

          <div aria-live="polite" aria-atomic="true" className={glass + " mt-12 flex flex-wrap justify-between gap-4 px-5 py-4 text-xs font-bold text-[#69503C]"}>
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-[#006341]" aria-hidden="true" />
              {location.address} · Clarksville, TN
            </p>
            <p className="flex items-center gap-2">
              <Clock3 size={16} className="text-[#C8102E]" aria-hidden="true" />
              Sun–Thu {location.opens}–10 PM · Fri–Sat {location.opens}–11 PM
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SpatialCard speed={.02} tilt={false} className={glass + " px-5 py-5 text-center"}>
            <p className="rotulo text-2xl tracking-wider text-[#006341] sm:text-3xl">
              COMAL CALIENTE
              <span className="mx-3 text-[#C8102E] sm:mx-7">✦</span>
              BARRIO CONTENTO
            </p>
          </SpatialCard>
        </div>

        <section id="menu" aria-labelledby="menu-heading" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-20 sm:px-8">
          <SpatialCard speed={.022} tilt={false} className={glass + " flex flex-wrap items-end justify-between gap-6 p-6 sm:p-8"}>
            <div>
              <p className="script text-2xl text-[#9B4826]">¿Qué le damos, marchante?</p>
              <h2 id="menu-heading" className="rotulo mt-3 text-4xl text-[#006341] sm:text-5xl">
                LA CARTA <span className="text-[#C8102E]">DEL PUESTO</span>
              </h2>
            </div>
            <span className="rotulo rotate-2 rounded-lg border border-[#C8102E]/30 bg-[#C8102E]/85 px-5 py-3 text-xl text-white backdrop-blur-md">¡Aquí hay antojo!</span>
          </SpatialCard>

          <div role="group" aria-label="Filter menu by category" className="mb-9 mt-8 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={
                  "rounded-xl border px-4 py-3 text-xs font-bold uppercase tracking-wider backdrop-blur-md transition " +
                  (category === item
                    ? "border-[#006341]/40 bg-[#006341]/85 text-white "
                    : "border-white/60 bg-white/70 text-[#35291F] hover:bg-white/80 ") +
                  focus
                }
              >
                {item}
              </button>
            ))}
          </div>

          <div aria-live="polite" aria-atomic="true" className="grid gap-8 md:grid-cols-2">
            {menu.filter((item) => item.category === category).map((item, index) => (
              <SpatialCard
                key={item.name}
                speed={index % 2 === 0 ? .035 : .048}
                float={2.1}
                phase={index * 1.7 + .9}
                className={glass + " flex flex-col p-6 sm:p-8"}
              >
                <article className="flex h-full flex-col">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold tracking-[.18em] text-[#006341]">{item.stamp}</span>
                    <span className="rotulo text-4xl text-[#8B7057]/50">0{index + 1}</span>
                  </div>
                  <h3 className="painted text-3xl">{item.name}</h3>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-[#9B4826]">{item.ingredients}</p>
                  <p className="mt-4 flex-1 text-sm leading-6 text-[#69503C]">{item.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#35291F]/15 pt-5">
                    <span className="rotulo -rotate-2 rounded-lg border border-white/60 bg-white/60 px-4 py-2 text-3xl text-[#9B4826] backdrop-blur-md">
                      {item.price === null ? "Ask us" : "$" + item.price.toFixed(2)}
                    </span>
                    <a href={call} aria-label={"Call " + location.name + " about " + item.name} className={"flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006341] " + focus}>
                      Call to order
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </SpatialCard>
            ))}
          </div>
          <p className={glass + " mt-8 px-5 py-3 text-xs leading-6 text-[#69503C]"}>
            Prices before tax. Menu, prices, and availability may vary by branch.
            Ask about today&apos;s caldos and desserts.
          </p>
        </section>

        <section id="reviews" aria-labelledby="reviews-heading" className="mx-auto max-w-7xl scroll-mt-8 px-5 pb-20 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
            <SpatialCard speed={.026} float={1.1} phase={2} className={glass + " p-6 sm:p-8"}>
              <CharroEmblem className="mb-4 h-16 w-24" />
              <p className="script text-2xl text-[#9B4826]">La clientela tiene la palabra.</p>
              <h2 id="reviews-heading" className="rotulo mt-4 text-4xl leading-none sm:text-5xl">
                BUEN TACO.<br />
                BUENA CHARLA.<br />
                <span className="text-[#006341]">BUENA ONDA.</span>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-[#69503C]">
                Real Google review excerpts from Express guests, republished by Wanderlog.
              </p>
              <a href={googleReviews} target="_blank" rel="noopener noreferrer" className={"mt-6 inline-flex items-center gap-3 rounded-xl border border-white/60 bg-white/60 px-4 py-3 backdrop-blur-md " + focus}>
                <Star size={23} fill="currentColor" className="text-[#B45309]" aria-hidden="true" />
                <strong className="rotulo text-2xl">4.5 / 5</strong>
                <span className="text-[10px] font-bold">EXPRESS ON GOOGLE</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </SpatialCard>

            <div className="mx-auto w-full max-w-lg">
              <SpatialCard speed={.05} float={2.7} phase={3.4} className={glass + " p-7 sm:p-9"}>
                <article>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="rotulo text-3xl">EL GRULLO</p>
                      <p className="text-[10px] font-bold tracking-widest">EXPRESS · CLARKSVILLE, TN</p>
                    </div>
                    <span className="rotulo -rotate-12 rounded-sm border-2 border-[#006341]/60 px-2 py-1 text-sm text-[#006341]">CON SABOR</span>
                  </div>
                  <div className="my-5 flex justify-between gap-3 border-y border-dashed border-[#69503C]/40 py-3 font-mono text-[10px]">
                    <span>COMPROBANTE DE CANTINA</span>
                    <span>NO. 00{reviewIndex + 1}</span>
                  </div>
                  <div aria-live="polite" aria-atomic="true" className="min-h-60">
                    <p className="text-xs font-bold tracking-[.18em] text-[#006341]">{review.topic}</p>
                    <blockquote className="painted mt-5 text-3xl leading-snug sm:text-4xl">“{review.quote}”</blockquote>
                    <p className="mt-6 text-sm font-bold">— {review.author}</p>
                    <p className="mt-1 text-[10px] tracking-widest text-[#69503C]">GOOGLE REVIEW EXCERPT</p>
                  </div>
                  <a href={review.source} target="_blank" rel="noopener noreferrer" className={"mt-5 flex items-center justify-between gap-3 border-t border-dashed border-[#69503C]/40 pt-4 text-[10px] uppercase tracking-widest text-[#69503C] " + focus}>
                    Read source on Wanderlog
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                  <p className="script my-5 text-center text-2xl text-[#C8102E]">¡Gracias, vuelva pronto!</p>
                  <div className="barcode mx-auto max-w-48" aria-hidden="true" />
                </article>
              </SpatialCard>
              <div className="mt-8 flex items-center justify-between gap-4">
                <p className="rounded-lg border border-white/60 bg-white/70 px-3 py-2 font-mono text-xs backdrop-blur-md">
                  TICKET 0{reviewIndex + 1} / 0{reviews.length}
                </p>
                <div className="flex gap-2">
                  <button type="button" aria-label="Previous review" onClick={() => setReviewIndex((index) => (index + reviews.length - 1) % reviews.length)} className={"rounded-xl border border-white/60 bg-white/70 p-3 backdrop-blur-md hover:bg-white/80 " + focus}>
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <button type="button" aria-label="Next review" onClick={() => setReviewIndex((index) => (index + 1) % reviews.length)} className={"rounded-xl border border-white/60 bg-white/70 p-3 backdrop-blur-md hover:bg-white/80 " + focus}>
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="visit" aria-labelledby="visit-heading" className="mx-auto max-w-7xl scroll-mt-8 px-5 pb-20 sm:px-8">
          <SpatialCard speed={.02} tilt={false} className={glass + " p-6 text-center sm:p-8"}>
            <p className="script text-2xl text-[#9B4826]">Aquí lo esperamos.</p>
            <h2 id="visit-heading" className="rotulo mt-3 text-4xl text-[#006341] sm:text-5xl">NOS VEMOS EN EL GRULLO.</h2>
            <p className="mt-4 text-sm text-[#69503C]">Two Clarksville stops on Fort Campbell Boulevard.</p>
          </SpatialCard>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {locations.map((item, index) => (
              <SpatialCard
                key={item.name}
                speed={index === 0 ? .032 : .044}
                float={1.6}
                phase={index * 2 + 1}
                className={glass + " p-7 sm:p-8 " + (branch === index ? "ring-2 ring-[#006341]/65" : "")}
              >
                <article>
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] tracking-widest text-[#69503C]">FORT CAMPBELL BLVD</span>
                    {branch === index && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#006341]">
                        <Check size={14} aria-hidden="true" />SELECTED
                      </span>
                    )}
                  </div>
                  <h3 className="rotulo text-4xl text-[#006341]">{item.title}</h3>
                  <address className="mt-4 text-sm not-italic leading-7 text-[#69503C]">
                    {item.address}<br />Clarksville, TN<br />
                    <a href={phoneLink(item.phone)} className={"font-bold text-[#35291F] " + focus}>{item.phone}</a>
                  </address>
                  <dl className="mt-5 space-y-3 border-y border-dashed border-[#69503C]/40 py-4 text-xs">
                    <div className="flex justify-between gap-4"><dt>Sunday–Thursday</dt><dd>{item.opens}–10 PM</dd></div>
                    <div className="flex justify-between gap-4"><dt>Friday–Saturday</dt><dd>{item.opens}–11 PM</dd></div>
                  </dl>
                  <button type="button" aria-pressed={branch === index} onClick={() => setBranch(index)} className={secondary + " mt-6 w-full"}>
                    {branch === index ? "Your selected branch" : "Choose this branch"}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                </article>
              </SpatialCard>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={directionsLink(location.address)} target="_blank" rel="noopener noreferrer" className={primary}>
              <MapPin size={17} aria-hidden="true" />Directions to {location.name}
            </a>
            <a href={call} className={secondary}>
              <Phone size={17} aria-hidden="true" />Call {location.name}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/60 bg-white/70 px-5 py-9 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <CharroEmblem className="h-12 w-16" />
            <div>
              <p className="rotulo text-3xl text-[#006341]">EL GRULLO EXPRESS</p>
              <p className="mt-2 text-[10px] uppercase tracking-widest text-[#69503C]">Mexican roots. Clarksville appetite.</p>
            </div>
          </div>
          <p className="script flex items-center gap-2 text-2xl text-[#9B4826]">
            <Sparkles size={20} aria-hidden="true" />Del comal al corazón.
          </p>
          <a href="#main" className={"text-xs font-bold uppercase tracking-widest text-[#006341] " + focus}>Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
