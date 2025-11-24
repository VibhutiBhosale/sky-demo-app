import { NavItem } from "@/types/types";

export const NAV_ITEMS: NavItem[] = [
  {
    key: "Watch",
    url: "/watch",
    submenu: ["Cinema", "Sports", "Kids", "discovery+", "What to watch"],
    position: "left",
  },
  {
    key: "TV",
    url: "/tv",
    submenu: ["Stream", "Glass", "Sky Q", "TV & Broadband"],
    position: "left",
  },
  {
    key: "Glass",
    url: "/glass",
    submenu: ["Glass Gen 2", "Glass Air", "New", "Tech specs", "Switching to Sky Glass"],
    position: "left",
  },
  {
    key: "Broadband",
    url: "/broadband",
    submenu: [
      "Broadband",
      "TV & Broadband",
      "Full Fibre Broadband",
      "Broadband for Gaming",
      "Broadband for Business",
    ],
    position: "left",
  },
  {
    key: "Mobile",
    url: "/mobile",
    submenu: [
      "Sky Mobile",
      "Phones",
      "SIM",
      "Tablets & Laptops",
      "Brands",
      "Accessories",
      "SIM Activation",
      "Manage",
    ],
    position: "left",
  },
  { key: "Protect", url: "/protect", position: "left" },
  { key: "Business", url: "/business", position: "left" },
  { key: "Deals", url: "/deals", position: "left" },
  {
    key: "Help",
    url: "/help",
    submenu: [
      "Help",
      "My Account",
      "Broadband",
      "TV",
      "Mobile",
      "Talk",
      "VIP",
      "Sky Customer Forum",
    ],
    position: "right",
  },
];
