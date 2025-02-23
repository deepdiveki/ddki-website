import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Über uns",
    newTab: false,
    path: "/about",
  },
  {
    id: 6,
    title: "DDKI ToolBox",
    newTab: false,
    path: "/ddki-toolbox",
    submenu: [
      {
        id: 66,
        title: "Arbeitsblatt Generator",
        newTab: false,
        path: "https://www.deepdive-ki.de/ddki-toolbox",
      },
      {
        id: 67,
        title: "KI-Chat",
        newTab: false,
        path: "https://www.deepdive-ki.de/ddki-toolbox",
      },
      {
        id: 69,
        title: "Persona Chat",
        newTab: false,
        path: "https://www.deepdive-ki.de/ddki-toolbox",
      },
      {
        id: 68,
        title: "Chat mit PDF",
        newTab: false,
        path: "https://www.deepdive-ki.de/ddki-toolbox",
      },
      {
        id: 70,
        title: "QR Code Generator",
        newTab: false,
        path: "https://www.deepdive-ki.de/ddki-toolbox",
      },
      {
        id: 71,
        title: "KI-Assistant erstellen",
        newTab: false,
        path: "https://www.deepdive-ki.de/ddki-toolbox",
      },
    ],
  },
  {
    id: 7,
    title: "ChatBot für Ihre Schule ",
    newTab: false,
    path: "/chatbot-fuer-ihre-schule"
  },
  {
    id: 5,
    title: "Fortbildungen",
    newTab: false,
    path: "/fortbildungen"
  },



];
export default menuData;
