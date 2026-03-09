import { Menu } from "@/types/menu";
import { BASE_PATH } from "@/lib/constants";

const menuData: Menu[] = [
  {
    id: 2,
    title: "DeepChat",
    newTab: false,
    path: `${BASE_PATH}/ddki-toolbox`,
  },
  {
    id: 6,
    title: "KI-Schulbüro ",
    newTab: false,
    path: `${BASE_PATH}/chatbot-fuer-ihre-schule`,
  },
  {
    id: 7,
    title: "Websites",
    newTab: false,
    path: `${BASE_PATH}/websites`,
  },
  {
    id: 8,
    title: "Über uns",
    newTab: false,
    path: `${BASE_PATH}/about`,
  },
  {
    id: 9,
    title: "Kontakt",
    newTab: false,
    path: `${BASE_PATH}/kontakt`,
  },
];
export default menuData;
