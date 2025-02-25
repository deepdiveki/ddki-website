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
                <p>Hier können Sie den ChatBot ausprobieren:</p>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Geben Sie hier das Passwort ein."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Submit
          </button>
        </form>
      </div>
    </section>
    </>
  );
}
