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

// Self-contained SVG artwork and CSS: no external asset dependencies required.
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
] as const;

const categories = [
  "Birria Specials",
  "Street Tacos",
  "Platos & Caldos",
  "Postres & Drinks",
] as const;

type Category = (typeof categories)[number];

type MenuItem = {
  name: string;
  category: Category;
  price: number | null;
  description: string;
  label: string;
};

const menu: MenuItem[] = [
  {
    name: "Birria Quesa Tacos",
    category: "Birria Specials",
    price: 14.99,
    description: "The birria-and-cheese combination your cravings came for.",
    label: "THE SIGNATURE",
  },
  {
    name: "Pizza Birria",
    category: "Birria Specials",
    price: 28.67,
    description: "Big birria energy. Made for your next shared feast.",
    label: "GO BIG",
  },
  {
    name: "Street Tacos",
    category: "Street Tacos",
    price: 5.04,
    description: "Classic Mexican street flavor, one delicious bite at a time.",
    label: "STREET FAVORITE",
  },
  {
    name: "Carne Asada Fries",
    category: "Platos & Caldos",
    price: 13.26,
    description: "Carne asada meets fries. A serious answer to a serious appetite.",
    label: "COMFORT FOOD",
  },
  {
    name: "Menudo & Pozole",
    category: "Platos & Caldos",
    price: null,
    description: "Ask your selected branch about today's caldos and availability.",
    label: "ASK THE BRANCH",
  },
  {
    name: "32oz Aguas Frescas",
    category: "Postres & Drinks",
    price: 6.92,
    description: "A refreshing companion to your Mexican favorites. Ask about today's flavors.",
    label: "COOL IT DOWN",
  },
];

const reviewSources = {
  main: "https://wanderlog.com/place/details/4095347/el-grullo-express",
  birria: "https://wanderlog.com/list/geoCategory/1269369/best-mexican-foods-and-restaurants-in-clarksville",
};

const reviews = [
  {
    author: "Branson D",
    topic: "THE BIRRIA",
    text: "Had the birria tacos, one of the best meals",
    source: reviewSources.birria,
  },
  {
    author: "Nichole M",
    topic: "THE DRIVE-THRU",
    text: "didn't have to wait longer then 10 minutes",
    source: reviewSources.main,
  },
  {
    author: "Bobbie S",
    topic: "THE FLAVOR",
    text: "Authentic Mexican food at its finest taste!!",
    source: reviewSources.main,
  },
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
    <div className="w-full overflow-hidden flex justify-center py-2 bg-[#0C0F0E]" aria-hidden="true">
      <div className="flex gap-2 min-w-[1200px] justify-around opacity-90">
        {Array.from({ length: 18 }, (_, index) => (
          <svg
            key={index}
            viewBox="0 0 90 78"
            className="w-14 h-12 transition-transform hover:-translate-y-1 duration-300"
            style={{
              color: ["#006341", "#F5E7CF", "#C8102E"][index % 3],
            }}
          >
            <defs
