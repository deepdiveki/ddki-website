"use client"
import React, { useState } from 'react';
import Breadcrumb from "@/components/Breadcrumb";

export default function ProtectedPage() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const secretPassword = 'hktJ)cZ%xy!hh#B-';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === secretPassword) {
      setIsAuthorized(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  if (isAuthorized) {
    return (
      <>
        <Breadcrumb pageTitle="ChatBot für die Till-Eulenspiegel-Schule" />
        <section className="p-6 md:p-12">
            <div className="max-w-4xl mx-auto text-lg space-y-6">
                <p>Hier können Sie den ChatBot ausprobieren.</p>
                <iframe
                    src="https://tester.osc-fr1.scalingo.io/"
                    width="100%"
                    height="600px"
                    title="TUS ChatBot"
                    style={{ border: 'none' }}
                  />
            </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb pageTitle="ChatBot für die Till-Eulenspiegel-Schule" />
      <section className="p-6 md:p-12">
        <div className="max-w-4xl mx-auto text-lg space-y-6">
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Geben Sie hier das Password ein."
              />
              <button type="submit">Submit</button>
            </form>
        </div>
      </section>
    </>
  );
}
