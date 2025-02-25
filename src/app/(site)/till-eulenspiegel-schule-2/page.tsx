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
        <Breadcrumb pageTitle="Willkommen!" />
        <section className="p-6 md:p-12">
          <p>Das ist die Testseite für den ChatBot der TUS Mölln</p>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb pageTitle="Willkommen!" />
      <section className="p-6 md:p-12">
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter the password"
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}
