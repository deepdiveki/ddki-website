"use client";
import Options from "@/components/AiTools/Options";
import PreviewGeneratedText from "@/components/AiTools/PreviewGeneratedText";
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { integrations, messages } from "../../../../../integrations.config";

const ContentGeneratorSchema = z.object({
  thema: z.string(),
  fach: z.string(),
  schulform: z.string(),
  altersstufe: z.string(),
  sprache: z.string(),
});

const fach = ["Biologie","Deutsch","Englisch", "Französisch", "Geschichte", "PGW", "Informatik", "Kunst" ]; //Fach 
const schulform = ["Grundschule", "Gymnasium", "Berufliche Schule", "Förderschule", "Stadtteilschule"];  //Schulform 
const altersstufe = ["1./2. Klasse", "3./4. Klasse", "Unterstufe", "Mittelstufe", "Oberstufe"];  //altersstufe
const sprache = ["Deutsche", "Englisch", "Italienisch", "Spanisch", "Französisch", "Russisch", "Ukrainisch"];  //sprache

const ContentGeneratorPage = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  const [data, setData] = useState({
    thema: "",
    fach: "",
    schulform: "",
    altersstufe: "",
    sprache: "",
  });

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!integrations?.isOpenAIEnabled) {
      toast.error(messages.opanAi);
      return;
    }

    const validation = ContentGeneratorSchema.safeParse(data);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setGeneratedContent("Loading....");

// the prompt
const prompt = [
  {
    role: "system",
    content:
      "Du bist ein KI-gestütztes Tool, das personalisierte Arbeitsblätter für den Schulunterricht erstellt. Dein Ziel ist es, ein Arbeitsblatt basierend auf den Vorgaben zu erstellen.",
  },
  {
    role: "user",
    content: `Thema: ${data.thema} \nFach: ${data.fach} \nSchulform: ${data.schulform} \nAltersstufe: ${data.altersstufe} \nSprache: ${data.sprache}`,
  },
  {
    role: "user",
    content:
      "Erstelle ein Arbeitsblatt zu diesem Thema. Halte dich an die gewählte Altersstufe und Schulform. Entferne alle Überschriften der Absätze und füge nach jedem Absatz einen Zeilenumbruch hinzu. Das Arbeitsblatt soll kreativ, lehrreich und leicht verständlich sein.",
  },
];



    //for the demo
    const apiKey = localStorage.getItem("apiKey");

    try {
      const response = await axios.post(
        "/api/generate-content",
        { apiKey, prompt },
        {
          headers: {
            "Content-Type": "application/json", // Adjust headers as needed
          },
        },
      );
      setGeneratedContent(response.data);
      console.log(response.data);
    } catch (error: any) {
      setGeneratedContent("Please Add the API Key!");
      console.error("Error:", error?.message);
    }

    setData({
      thema: "",
      fach: "",
      schulform: "",
      altersstufe: "",
      sprache: "",
    });
  };

  return (
    <>
      <title>Content Generator| AI Tool - Next.js Template for AI Tools</title>
      <meta name="description" content="This is AI Examples page for AI Tool" />
      <Breadcrumb pageTitle="Arbeitsblatt mit KI" />

      <section className="pb-17.5 lg:pb-22.5 xl:pb-27.5">
        {/* <div className="gradient-box">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            bibendum, lorem vel tincidunt imperdiet, nibh elit laoreet felis, a
            bibendum nisl tortor non orci. Donec pretium fermentum felis, quis
            aliquet est rutrum ut. Integer quis massa ut lacus viverra pharetra
            in eu lacus. Aliquam tempus odio adipiscing diam pellentesque
            rhoncus. Curabitur a bibendum est.{" "}
          </p>
        </div> */}

        <div className="mx-auto grid max-w-[1170px] gap-8 px-4 sm:px-8 lg:grid-cols-12 xl:px-0">
          <div className="gradient-box rounded-lg bg-dark-8 p-8 lg:col-span-4">
            <h2 className="pb-2 text-2xl font-bold text-white">
              Arbeitsblatt mit KI erstellen
            </h2>
            <p className="pb-6">Thema oder Fragestellung</p>
            <form onSubmit={handleSubmit}>
              <textarea
                value={data.thema}
                name="thema"
                onChange={handleChange}
                className="min-h-[160px] w-full rounded-lg border border-white/[0.12] bg-dark-7 p-5 text-white outline-none focus:border-purple"
                placeholder="Nenne die wesentlichen Punkte, die in dem Text behandelt werden sollen"
                required
              />

              <Options
                values={fach}
                title={"Fach auswählen"}
                name={"fach"}
                handleChange={handleChange}
                selected={data.fach}
              />

              <Options
                values={schulform}
                title={"Schulform auswählen"}
                name={"schulform"}
                handleChange={handleChange}
                selected={data.schulform}
              />

              <Options
                values={altersstufe}
                title={"Altersstufe auswählen"}
                name={"altersstufe"}
                handleChange={handleChange}
                selected={data.altersstufe}
              />
<Options
                values={sprache}
                title={"Sprache auswählen"}
                name={"sprache"}
                handleChange={handleChange}
                selected={data.sprache}
              />


              <button
                type="submit"
                className="hero-button-gradient mt-5 w-full rounded-lg px-7 py-3 text-center font-medium text-white duration-300 ease-in hover:opacity-80 "
              >
                Generieren
              </button>
            </form>
          </div>

          <PreviewGeneratedText
            generatedContent={generatedContent}
            height={442}
          />
        </div>
      </section>
    </>
  );
};

export default ContentGeneratorPage;
