import { NavItem, SubmenuItem } from "@/types/types";

export const NAV_ITEMS: NavItem[] = [
  {
    key: "Watch",
    url: "/watch",
    position: "left",
    submenu: [
      { label: "Cinema", url: "/watch/cinema" },
      { label: "Sports", url: "/watch/sports" },
      { label: "Kids", url: "/watch/kids" },
      { label: "discovery+", url: "/watch/discovery" },
      { label: "What to watch", url: "/watch/guide" },
    ],
  },
  {
    key: "TV",
    url: "/tv",
    position: "left",
    submenu: [
      { label: "Stream", url: "/watch/cinema" },
      { label: "Glass", url: "/watch/cinema" },
      { label: "Sky Q", url: "/watch/cinema" },
      { label: "TV & Broadband", url: "/watch/cinema" },
    ],
  },
  {
    key: "Glass",
    url: "/glass",
    position: "left",
    submenu: [
      { label: "Glass Gen 2", url: "/watch/cinema" },
      { label: "Glass Air", url: "/watch/cinema" },
      { label: "New", url: "/watch/cinema" },
      { label: "Tech specs", url: "/watch/cinema" },
      { label: "Switching to Sky Glass", url: "/watch/cinema" },
    ],
  },
  {
    key: "Broadband",
    url: "/broadband",
    position: "left",
    submenu: [
      { label: "Broadband", url: "/watch/cinema" },
      { label: "TV & Broadband", url: "/watch/cinema" },
      { label: "Full Fibre Broadband", url: "/watch/cinema" },
      { label: "Broadband for Gaming2", url: "/watch/cinema" },
      { label: "Broadband for Business", url: "/watch/cinema" },
    ],
  },
  {
    key: "Mobile",
    url: "/mobile",
    position: "left",
    submenu: [
      { label: "Sky Mobile", url: "/mobile" },
      { label: "Phones", url: "/mobile/phones" },
      { label: "SIM", url: "/shop/mobile/plans" },
      { label: "Tablets & Laptops", url: "/mobile/tablets" },
      { label: "Brands", url: "/mobile/brands" },
      { label: "Accessories", url: "/mobile/accessories" },
      { label: "SIM Activation", url: "/shop/mobile/activate-sim" },
      { label: "Manage", url: "/mobile/manage" },
    ],
  },
  { key: "Protect", url: "/protect", position: "left" },
  { key: "Business", url: "/business", position: "left" },
  { key: "Deals", url: "/deals", position: "left" },
  {
    key: "Help",
    url: "/help",
    position: "right",
    submenu: [
      { label: "Help", url: "/help" },
      { label: "My Account", url: "/help/account" },
      { label: "Broadband", url: "/help/broadband" },
      { label: "TV", url: "/help/tv" },
      { label: "Mobile", url: "/help/mobile" },
      { label: "Talk", url: "/help/talk" },
      { label: "VIP", url: "/help/vip" },
      { label: "Sky Customer Forum", url: "/help/forum" },
    ],
  },
];
