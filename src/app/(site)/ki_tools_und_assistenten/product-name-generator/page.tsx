"use client";
import PreviewGeneratedText from "@/components/AiTools/PreviewGeneratedText";
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { integrations, messages } from "../../../../../integrations.config";

const dataSchema = z.object({
  description: z.string(),
  seedWords: z.string(),
});

const ProductNameGeneratorPage = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  const [data, setData] = useState({
    description: "",
    seedWords: "",
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

    setGeneratedContent("Loading....");

    // the prompt
    const prompt = [
      {
        role: "system",
        content:
          "You will be provided with a product description and seed words, and your task is to generate product names. \n",
      },
      {
        role: "user",
        content: `Product description: ${data.description} \n Language: ${data.seedWords}`,
      },
    ];

    //for the demo
    const apiKey = localStorage.getItem("apiKey");

    try {
      const response = await axios.post(
        "/api/generate-content",
        { prompt, apiKey },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setGeneratedContent(response.data);
    } catch (error: any) {
      setGeneratedContent("Please Add the API Key!");
      console.error("Error:", error?.message);
    }

    setData({
      description: "",
      seedWords: "",
    });
  };

  return (
    <>
      <title>
        Persona Chat
      </title>
      <meta name="description" content="This is AI Examples page for AI Tool" />
      <Breadcrumb pageTitle="Persona Chat" />

      <section className="pb-17.5 lg:pb-22.5 xl:pb-27.5">
        <div className="mx-auto grid max-w-[1170px] gap-8 px-4 sm:px-8 lg:grid-cols-12 xl:px-0">
          <div className="gradient-box rounded-lg bg-dark-8 p-8 lg:col-span-4">
            <h2 className="pb-2 text-2xl font-bold text-white">
              Persona Chat
            </h2>
            <p className="pb-6">Mit welcher Persönlichkeit möchtest du Chatten?</p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="description" className="pb-4">
                  Wähle hier aus: 
                </label>
                <select
                  onChange={handleChange}
                  value={data.description}
                  name="description"
                  className="rounded-lg border border-white/[0.12] bg-dark-7 px-5 py-3 text-white outline-none focus:border-purple"
                  required
                >
                  <option value="" disabled>
                    Wähle eine Persönlichkeit
                  </option>
                  <option value="Angela Merkel">Angela Merkel</option>
                  <option value="Sophie Scholl">Sophie Scholl</option>
                  <option value="Olaf Scholz">Olaf Scholz</option>
                  <option value="Barack Obama">Barack Obama</option>
                  <option value="Donald Trump">Donald Trump</option>
                  <option value="Hermann Hesse">Hermann Hesse</option>
                </select>
              </div>

              <div className="flex flex-col pt-5">
                <label htmlFor="seedWords" className="pb-4">
                  Wähle die Sprache:
                </label>
                <select
                  onChange={handleChange}
                  value={data.seedWords}
                  name="seedWords"
                  className="rounded-lg border border-white/[0.12] bg-dark-7 px-5 py-3 text-white outline-none focus:border-purple"
                  required
                >
                  <option value="" disabled>
                    Wähle eine Sprache
                  </option>
                  <option value="Deutsch">Deutsch</option>
                  <option value="Englisch">Englisch</option>
                </select>
              </div>

              <button
                type="submit"
                className="hero-button-gradient mt-5 w-full rounded-lg px-7 py-3 text-center font-medium text-white duration-300 ease-in hover:opacity-80 "
              >
                Generate
              </button>
            </form>
          </div>

          <PreviewGeneratedText
            generatedContent={generatedContent}
            height={262}
          />
        </div>
      </section>
    </>
  );
};

export default ProductNameGeneratorPage;