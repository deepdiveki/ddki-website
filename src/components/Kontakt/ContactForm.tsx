"use client";

import { useState } from "react";
import Button from "@/components/ui/button-fortbildung";
import { Input } from "@/components/ui/input-fortbildung";
import { Textarea } from "@/components/ui/textarea-fortbildung";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          subject: data.subject,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const json = await res.json().catch(() => ({}));
        alert(json.error || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      }
    } catch {
      alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white p-5 md:p-8 lg:w-142">
      {submitted && (
        <div className="mb-4 rounded-xl bg-primary-light/30 p-4 text-sm text-primary-darker">
          Vielen Dank für Ihre Nachricht! Wir melden uns zeitnah bei Ihnen.
        </div>
      )}
      <form
        className="flex flex-col gap-y-4 md:gap-y-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 md:flex-row md:gap-5">
          <div className="w-full">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              required
              aria-required="true"
              placeholder="Ihr Name"
              className="font-light text-text-primary placeholder:text-text-secondary"
              disabled={isLoading}
            />
          </div>

          <div className="w-full">
            <label htmlFor="email" className="sr-only">
              E-Mail-Adresse
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              required
              aria-required="true"
              placeholder="E-Mail-Adresse"
              className="font-light text-text-primary placeholder:text-text-secondary"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="sr-only">
            Betreff
          </label>
          <Input
            type="text"
            id="subject"
            name="subject"
            required
            aria-required="true"
            placeholder="Betreff"
            className="font-light text-text-primary placeholder:text-text-secondary"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="message" className="sr-only">
            Nachricht
          </label>
          <Textarea
            id="message"
            name="message"
            required
            aria-required="true"
            placeholder="Ihre Nachricht..."
            className="min-h-40 resize-y font-light text-text-primary placeholder:text-text-secondary"
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full cursor-pointer"
        >
          Nachricht senden
        </Button>
      </form>
    </div>
  );
}
