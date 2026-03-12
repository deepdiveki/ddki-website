import { FooterLink } from "@/types/footerLink";
import { BASE_PATH } from "@/lib/constants";

export const productsLink: FooterLink[] = [
  {
    id: 1,
    title: "DeepChat",
    href: `${BASE_PATH}/ddki-toolbox`,
    newTab: false,
  },
  {
    id: 2,
    title: "KI-Schulbüro",
    href: `${BASE_PATH}/chatbot-fuer-ihre-schule`,
    newTab: false,
  },
  {
    id: 3,
    title: "Fortbildungen",
    href: "/fortbildung",
    newTab: false,
  },
  {
    id: 4,
    title: "Websites",
    href: `${BASE_PATH}/websites`,
    newTab: false,
  },
];

export const companiesLink: FooterLink[] = [
  {
    id: 11,
    title: "Impressum",
    href: `/impressum`,
    newTab: false,
  },
  {
    id: 13,
    title: "Datenschutz",
    href: `/datenschutz`,
    newTab: false,
  },
  {
    id: 14,
    title: "Jobs",
    href: `/jobs`,
    newTab: false,
  },
  {
    id: 15,
    title: "Mentoring",
    href: `${BASE_PATH}/mentoring`,
    newTab: false,
  },
];

export const supportsLink: FooterLink[] = [
  {
    id: 21,
    title: "Kontakt",
    href: `${BASE_PATH}/about#kontakt`,
    newTab: false,
  },
  {
    id: 32,
    title: "Über uns",
    href: `${BASE_PATH}/about`,
    newTab: false,
  },
  {
    id: 33,
    title: "info@deepdive-ki.de",
    href: "mailto:info@deepdive-ki.de",
    newTab: false,
  },
];
