"use client";

import { motion } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import axios from "axios";

const Kontakt = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loader, setLoader] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Bitte füllen Sie alle Felder aus.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    setLoader(true);

    try {
      const res = await axios.post("/api/contact", formData);

      if (res.status === 200) {
        toast.success("Nachricht erfolgreich zugestellt!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Ein Fehler ist aufgetreten.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <section id="kontakt" className="scroll-mt-17">
      <motion.div
        className="mx-auto max-w-[1104px] px-4 sm:px-8 xl:px-0"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="sw-card-glow relative z-10 overflow-hidden rounded-[30px] border border-border-tertiary bg-white/65 px-4 pb-10 pt-25 shadow-sm backdrop-blur-sm sm:px-20 sm:pb-14 lg:px-27.5">
          {/* Grid pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 sw-grid-pattern-lg"
            style={{ opacity: 0.4 }}
            aria-hidden="true"
          />

          {/* Decorative glow at top */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-48 w-[500px] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse, rgba(140,113,246,0.12) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            <SectionTitle
              subTitle="Können wir helfen?"
              title="Kontaktieren Sie uns"
              paragraph="Kontaktieren Sie uns, wenn Sie Fragen haben oder Hilfe benötigen. Wir helfen Ihnen gerne weiter."
            />

            <div className="relative overflow-hidden rounded-[25px] border border-border-tertiary bg-white/50 p-6 backdrop-blur-sm sm:p-8 xl:p-15">
              <form onSubmit={handleSubmit} className="relative z-10">
                <div className="-mx-4 flex flex-wrap xl:-mx-10">
                  {/* Name field */}
                  <div className="w-full px-4 md:w-1/2 xl:px-5">
                    <div className="mb-9.5">
                      <label htmlFor="name" className="mb-2.5 block text-sm font-medium text-text-primary">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Vor und Nachname"
                        required
                        className="w-full rounded-xl border border-border-tertiary bg-white/80 px-6 py-3 text-sm text-text-primary outline-none backdrop-blur-sm transition-colors focus:border-primary-base focus:ring-2 focus:ring-primary-base/20"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="w-full px-4 md:w-1/2 xl:px-5">
                    <div className="mb-9.5">
                      <label htmlFor="email" className="mb-2.5 block text-sm font-medium text-text-primary">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ihre Email-Adresse"
                        required
                        className="w-full rounded-xl border border-border-tertiary bg-white/80 px-6 py-3 text-sm text-text-primary outline-none backdrop-blur-sm transition-colors focus:border-primary-base focus:ring-2 focus:ring-primary-base/20"
                      />
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="w-full px-4 xl:px-5">
                    <div className="mb-10">
                      <label htmlFor="message" className="mb-2.5 block text-sm font-medium text-text-primary">
                        Nachricht
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Ihre Nachricht...."
                        rows={6}
                        required
                        className="w-full rounded-xl border border-border-tertiary bg-white/80 px-6 py-5 text-sm text-text-primary outline-none backdrop-blur-sm transition-colors focus:border-primary-base focus:ring-2 focus:ring-primary-base/20"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="w-full px-4 xl:px-5">
                    <div className="pb-10 text-center">
                      <button
                        type="submit"
                        disabled={loader}
                        className="inline-flex rounded-lg bg-primary-darker px-7 py-3 font-medium text-white shadow-md duration-300 ease-in hover:bg-primary-dark hover:shadow-lg disabled:opacity-60"
                      >
                        {loader ? 'Wird gesendet...' : 'Nachricht senden'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Kontakt;
