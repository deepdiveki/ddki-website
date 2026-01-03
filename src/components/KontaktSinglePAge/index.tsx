"use client";

import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Loader from "@/components/Common/Loader";
import axios from "axios";

const Kontakt = () => {
  const [formData, setFormData] = useState({ name: "", school: "", email: "", phone: "", licenses: "", message: "", training:"" });
  const [loader, setLoader] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple client-side validation
    if (!formData.name || !formData.school || !formData.email || !formData.message) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    // Phone number validation (optional, allows numbers, spaces, and +)
    if (formData.phone && !/^[\d\s+()-]+$/.test(formData.phone)) {
      toast.error("Bitte geben Sie eine gültige Telefonnummer ein.");
      return;
    }

    // License number validation (optional, must be a valid number)
    if (formData.licenses && !/^\d+$/.test(formData.licenses)) {
      toast.error("Bitte geben Sie eine gültige Zahl für die Anzahl der Lizenzen ein.");
      return;
    }

    setLoader(true);

    try {
      const res = await axios.post("/api/contact", formData);

      if (res.status === 200) {
        toast.success("Nachricht erfolgreich zugestellt!");
        setFormData({ name: "", school: "", email: "", phone: "", licenses: "", message: "", training: "" }); // Reset form on success
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
    <section id="support" className="scroll-mt-17">
      <div className="mx-auto max-w-[1104px] px-4 sm:px-8 xl:px-0">
        <div className="relative z-999 overflow-hidden rounded-[30px] bg-dark px-4 pt-25 sm:px-20 lg:px-27.5">
          {/* Stars and background shapes */}
          <div className="absolute -top-[16%] left-1/2 -z-1 flex w-full max-w-[690px] -translate-x-1/2 justify-center gap-7.5 opacity-40">
            {/* Other layout code */}
          </div>

          <SectionTitle
            subTitle="Können wir helfen?"
            title="Welche Lizenz passt zu Ihrer Schule?"
            paragraph="Kontaktieren Sie uns, wenn Sie Fragen haben oder Hilfe bei der Auswahl einer Lizenz benötigen. Wir helfen Ihnen gerne weiter."
          />

          {/* Support form */}
          <div className="form-box-gradient relative overflow-hidden rounded-[25px] bg-dark p-6 sm:p-8 xl:p-15">
            <form onSubmit={handleSubmit} className="relative z-10">
              <div className="-mx-4 flex flex-wrap xl:-mx-10">
                {/* Name field */}
                <div className="w-full px-4 md:w-1/2 xl:px-5">
                  <div className="mb-9.5">
                    <label htmlFor="name" className="mb-2.5 block font-medium text-white">
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
                      className="w-full rounded-lg border border-white/[0.12] bg-white/[0.05] px-6 py-3 text-white outline-none focus:border-purple"
                    />
                  </div>
                </div>

                {/* School field (new) */}
                <div className="w-full px-4 md:w-1/2 xl:px-5">
                  <div className="mb-9.5">
                    <label htmlFor="school" className="mb-2.5 block font-medium text-white">
                      Name der Schule
                    </label>
                    <input
                      id="school"
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      placeholder="Name Ihrer Schule"
                      required
                      className="w-full rounded-lg border border-white/[0.12] bg-white/[0.05] px-6 py-3 text-white outline-none focus:border-purple"
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="w-full px-4 md:w-1/2 xl:px-5">
                  <div className="mb-9.5">
                    <label htmlFor="email" className="mb-2.5 block font-medium text-white">
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
                      className="w-full rounded-lg border border-white/[0.12] bg-white/[0.05] px-6 py-3 text-white outline-none focus:border-purple"
                    />
                  </div>
                </div>

                {/* Phone field */}
                <div className="w-full px-4 md:w-1/2 xl:px-5">
                  <div className="mb-9.5">
                    <label htmlFor="phone" className="mb-2.5 block font-medium text-white">
                      Telefonnummer (optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+49 123 456 789"
                      className="w-full rounded-lg border border-white/[0.12] bg-white/[0.05] px-6 py-3 text-white outline-none focus:border-purple"
                    />
                  </div>
                </div>

                {/* License field */}
                <div className="w-full px-4 md:w-1/2 xl:px-5">
                  <div className="mb-9.5">
                    <label htmlFor="licenses" className="mb-2.5 block font-medium text-white">
                      Wie viele Lizenzen benötigen Sie?
                    </label>
                    <input
                      id="licenses"
                      type="number"
                      name="licenses"
                      value={formData.licenses}
                      onChange={handleChange}
                      placeholder="Anzahl der Lizenzen"
                      min="1"
                      className="w-full rounded-lg border border-white/[0.12] bg-white/[0.05] px-6 py-3 text-white outline-none focus:border-purple"
                    />
                  </div>
                </div>
                {/* Training selection (new) */}
                <div className="w-full px-4 md:w-1/2 xl:px-5">
                  <div className="mb-9.5">
                    <label htmlFor="training" className="mb-2.5 block font-medium text-white">
                      Kostenlose Einführungsfortbildung dazu buchen?
                    </label>
                    <select
                      id="training"
                      name="training"
                      value={formData.training}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-white/[0.12] bg-white/[0.05] px-6 py-3 text-white outline-none focus:border-purple"
                    >
                      <option value="">Bitte auswählen</option>
                      <option value="yes">Ja, bitte</option>
                      <option value="no">Nein, danke</option>
                    </select>
                  </div>
                </div>

                {/* Message field */}
                <div className="w-full px-4 xl:px-5">
                  <div className="mb-10">
                    <label htmlFor="message" className="mb-2.5 block font-medium text-white">
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
                      className="w-full rounded-lg border border-white/[0.12] bg-white/[0.05] px-6 py-5 outline-none focus:border-purple"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="w-full px-4 xl:px-5">
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={loader}
                      className="hero-button-gradient inline-flex rounded-lg px-7 py-3 font-medium text-white duration-300 ease-in hover:opacity-80"
                    >
                      {loader ? "Sending..." : "Nachricht senden"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kontakt;