"use client";

import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import Loader from "@/components/Common/Loader";
import axios from "axios";

const Kontakt = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loader, setLoader] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Example email validation (you can use Zod or another validation library)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoader(true);

    try {
      const res = await axios.post("/api/contact", formData);

      if (res.status === 200) {
        toast.success("Nachricht erfolgreich zugestellt!");
        setFormData({ name: "", email: "", message: "" }); // Reset form on success
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "An error occurred.");
    } finally {
      setLoader(false);
    }
  };


  return (
  <section id="kontakt" className="scroll-mt-17">
    <div className="mx-auto max-w-[1104px] px-4 sm:px-8 xl:px-0">
      <div className="relative z-999 overflow-hidden rounded-[30px] bg-dark px-4 pt-25 sm:px-20 lg:px-27.5">
        {/* Stars and background shapes */}
        <div className="absolute -top-[16%] left-1/2 -z-1 flex w-full max-w-[690px] -translate-x-1/2 justify-center gap-7.5 opacity-40">
          {/* Other layout code */}
        </div>

        <SectionTitle
          subTitle="Können wir helfen?"
          title="Kontaktieren Sie uns"
          paragraph="Kontaktieren Sie uns, wenn Sie Fragen haben oder Hilfe benötigen. Wir helfen Ihnen gerne weiter."
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
                    {loader ? 'Sending...' : 'Nachricht senden'}
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
