"use client";
import APIkeyModal from "@/components/AiTools/APIkeyModal";
import AiToolExample from "@/components/AiTools/AiToolExample";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { useEffect, useState } from "react";
import Inhalte_teilen from "@/components/AiTools/Inhalte_teilen";
import Material_erstellen from "@/components/AiTools/Material_erstellen";
import KI_Tools_für_Leistungsbewertung_und_kriterienbasiertes_Feedback from "@/components/AiTools/KI_Tools_für_Leistungsbewertung_und_kriterienbasiertes_Feedback";
import KI_Tools_und_Assistenten from "@/components/AiTools/KI_Tools_und_Assistenten";




const AiToolPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isKeyAvailable, setIsKeyAvailable] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveKey = () => {
    localStorage.removeItem("apiKey");
    setIsKeyAvailable(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (isOpen && !event.target.closest(".modal-content")) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    const key = localStorage.getItem("apiKey");
    if (key) {
      setIsKeyAvailable(true);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <title>DeepDive KI ToolBox und KI Fortbildungens</title>
      <meta name="description" content="This is AI Examples page for AI Tool" />

      <Breadcrumb pageTitle="DDKI ToolBox" />

      <section className="pb-25 pt-3">
        <div className="z-10 mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          

          {/* Horizontal Divider for "KI Tools" */}
          <div className="my-8">
            <hr className="border-t border-gray-500" />
            <div className="mt-4 text-center">
              <p className="text-xl font-semibold text-gray-300">
                KI Tools und Assistenten
              </p>
            </div>
          </div>

          {/* First Set of AI Tools */}
          <KI_Tools_und_Assistenten />

          {/* Horizontal Divider for "KI Leistungsbewertung" */}
          <div className="my-8">
            <hr className="border-t border-gray-500" />
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-gray-300">
                KI Tools für Leistungsbewertung und kriterienbasiertes Feedback
              </p>
            </div>
          </div>

          {/* Second Set of AI Tools */}
          <KI_Tools_für_Leistungsbewertung_und_kriterienbasiertes_Feedback />

          {/* Horizontal Divider for "Material erstellen" */}
          <div className="my-8">
            <hr className="border-t border-gray-500" />
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-gray-300">
                Material erstellen
              </p>
            </div>
          </div>

          {/* Third Set of AI Tools */}
          <Material_erstellen />

          {/* Horizontal Divider for "Inhalte teilen" */}
          <div className="my-8">
            <hr className="border-t border-gray-500" />
            <div className="mt-4 text-center">
              <p className="text-xl font-semibold text-gray-300">
                Inhalte teilen
              </p>
            </div>
          </div>

          {/* Fourth Set of AI Tools */}
          <Inhalte_teilen />
        </div>

        {isOpen && <APIkeyModal handleModal={handleModal} />}
      </section>
    </>
  );
};

export default AiToolPage;