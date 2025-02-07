"use client";
import PreviewGeneratedText from "@/components/AiTools/PreviewGeneratedText";
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { integrations, messages } from "../../../../../integrations.config";

const dataSchema = z.object({
  vom_user_eingefügter_link: z.string(),
});

const SpreadsheetGeneratorPage = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  const [data, setData] = useState({
    vom_user_eingefügter_link: "",
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

    const validation = dataSchema.safeParse(data);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    // Setze den Inhalt für den QR-Code
    setGeneratedContent(data.vom_user_eingefügter_link);

    setData({
      vom_user_eingefügter_link: "",
    });
  };

  return (
    <>
      <title>
        Spreadsheet Generator | AI Tool - Next.js Template for AI Tools
      </title>
      <meta
        name="vom_user_eingefügter_link"
        content="This is AI Examples page for AI Tool"
      />
      <Breadcrumb pageTitle="QR Code Generator" />

      <section className="pb-17.5 lg:pb-22.5 xl:pb-27.5">
        <div className="mx-auto grid max-w-[1170px] gap-8 px-4 sm:px-8 lg:grid-cols-12 xl:px-0">
          <div className="gradient-box rounded-lg bg-dark-8 p-8 lg:col-span-4 ">
            <h2 className="pb-2 text-2xl font-bold text-white">
              QR Code Generator
            </h2>
            <p className="pb-6">Erstelle einen QR Code für deinen Unterricht</p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="vom_user_eingefügter_link" className="pb-4">
                  Füge hier deinen Link ein
                </label>

                <textarea
                  onChange={handleChange}
                  value={data.vom_user_eingefügter_link}
                  name="vom_user_eingefügter_link"
                  placeholder="Link einfügen"
                  className="min-h-[160px] rounded-lg border border-white/[0.12] bg-dark-7 px-5 py-3 text-white outline-none focus:border-purple"
                  required
                />
              </div>

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
              height={262}
              showQrCode={true} // QR-Code aktivieren
          />
        </div>
      </section>
    </>
  );
};

export default SpreadsheetGeneratorPage;