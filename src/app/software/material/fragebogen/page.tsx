'use client';
import { useState, Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb";

export default function Leseverständnis() {

    const [result, setResult] = useState<string>("");
    const [average, setAverage] = useState<number | null>(null);

  // We store each question’s answer in a single object:
  const [answers, setAnswers] = useState({
    frage1: "",
    frage2: "",
    frage3: "",
    frage4: "",
    frage5: "",
    frage6: "",
  });

  // This function updates the relevant field whenever a radio button changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAnswers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // You can handle form submission here (e.g., to calculate a score or send to an API)
  const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();

  // Calculate the average and round down to nearest integer
  const sum = Object.values(answers).reduce((acc, val) => acc + parseInt(val || "0"), 0);
  const average = Math.ceil(sum / 6); // Math.floor rounds down

  // Result texts based on the rounded average
  const resultTexts: Record<number, string> = {
    5: "Buchrezensionen bzw. Inhaltsangabe z.B. im Unterricht oder literarisches Quartett",
    4: "Erstellen von Erklärvideos, Podcast, Hörspielen u-ä. im Rahmen des Ganztagstags, der Herausforderungen",
    3: "Erstellen von Erklärvideos, Podcast, Hörspielen u-ä. im Rahmen des Ganztagstags, der Herausforderungen",
    2: "Bücherkiste (Verpflichtung innerhalb eines festgelegten Zeitraums ein selbstgewähltes Buch zu lesen)",
    1: "reines lautes lesen im Rahmen der Lernforderung"
  };

  // Get the result text or a default message
  const resultText = resultTexts[average] || "Keine ausreichende Bewertung vorhanden.";

  // Set the result state
  setResult(resultText);
};


  return (
    <Suspense fallback={<p>Loading...</p>}>
      <section className="relative z-10 pb-18 pt-30 lg:pt-35 xl:pt-40">
      <div className="absolute left-0 top-25 -z-1 flex w-full flex-col gap-3 opacity-50">
        <div className="footer-bg-gradient h-[1.24px] w-full"></div>
        <div className="footer-bg-gradient h-[2.47px] w-full"></div>
        <div className="footer-bg-gradient h-[3.71px] w-full"></div>
        <div className="footer-bg-gradient h-[4.99px] w-full"></div>
        <div className="footer-bg-gradient h-[6.19px] w-full"></div>
        <div className="footer-bg-gradient h-[7.42px] w-full"></div>
        <div className="footer-bg-gradient h-[8.66px] w-full"></div>
        <div className="footer-bg-gradient h-[9.90px] w-full"></div>
        <div className="footer-bg-gradient h-[13px] w-full"></div>
      </div>
      <div className="absolute bottom-0 left-0 -z-1 h-24 w-full bg-gradient-to-b from-dark/0 to-dark"></div>

      <div className="px-4 text-center">
        <h1 className="text-heading-3 font-bold text-white">
          Fragebogen zum Leseverständnis
        </h1>
        <ul className="flex items-center justify-center gap-2">
        </ul>
      </div>
    </section>
    <main style={{ padding: "1rem" }}>
        <form onSubmit={handleSubmit}>
          {/* Frage 1 */}
          <h1 className="flex justify-center items-center text-white font-bold">1. Ich kann den Text lesen.</h1>
          <div className="mt-10 mb-10 flex justify-center items-center text-white gap-20">
          <div>
            <input
              type="radio"
              id="frage1-5"
              name="frage1"
              value="5"
              checked={answers.frage1 === "5"}
              onChange={handleChange}
            />
            <label htmlFor="frage1-5">trifft voll zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage1-4"
              name="frage1"
              value="4"
              checked={answers.frage1 === "4"}
              onChange={handleChange}
            />
            <label htmlFor="frage1-4">trifft zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage1-3"
              name="frage1"
              value="3"
              checked={answers.frage1 === "3"}
              onChange={handleChange}
            />
            <label htmlFor="frage1-3">trifft eher zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage1-2"
              name="frage1"
              value="2"
              checked={answers.frage1 === "2"}
              onChange={handleChange}
            />
            <label htmlFor="frage1-2">trifft eher nicht zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage1-1"
              name="frage1"
              value="1"
              checked={answers.frage1 === "1"}
              onChange={handleChange}
            />
            <label htmlFor="frage1-1">trifft nicht zu</label>
          </div>
          </div>

          <p className="flex justify-center items-center text-white font-bold">Aktuelle Auswahl (Frage 1): {answers.frage1 || "noch nichts ausgewählt"}</p>
          <hr className="my-4 border-gray-500 w-1/2 mx-auto" />

          {/* Frage 2 */}
          <h2 className="mt-20 flex justify-center items-center text-white font-bold">2. Ich kann Texte lesen und verstehen.</h2>
          <div className="mt-10 mb-10 flex justify-center items-center text-white gap-20">
          <div>
            <input
              type="radio"
              id="frage2-5"
              name="frage2"
              value="5"
              checked={answers.frage2 === "5"}
              onChange={handleChange}
            />
            <label htmlFor="frage2-5">trifft voll zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage2-4"
              name="frage2"
              value="4"
              checked={answers.frage2 === "4"}
              onChange={handleChange}
            />
            <label htmlFor="frage2-4">trifft zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage2-3"
              name="frage2"
              value="3"
              checked={answers.frage2 === "3"}
              onChange={handleChange}
            />
            <label htmlFor="frage2-3">trifft eher zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage2-2"
              name="frage2"
              value="2"
              checked={answers.frage2 === "2"}
              onChange={handleChange}
            />
            <label htmlFor="frage2-2">trifft eher nicht zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage2-1"
              name="frage2"
              value="1"
              checked={answers.frage2 === "1"}
              onChange={handleChange}
            />
            <label htmlFor="frage2-1">trifft nicht zu</label>
          </div>
          </div>
          <p className="flex justify-center items-center text-white font-bold">Aktuelle Auswahl (Frage 2): {answers.frage2 || "noch nichts ausgewählt"}</p>
          <hr className="my-4 border-gray-500 w-1/2 mx-auto" />


          {/* Frage 3 */}
          <h2 className="mt-20 flex justify-center items-center text-white font-bold">3. Ich kann den Inhalt des Textes wiedergeben.</h2>
          {/* Gleiche Struktur wie oben, name="frage3" ... */}
          <div className="mt-10 mb-10 flex justify-center items-center text-white gap-20">
          <div>
            <input
              type="radio"
              id="frage3-5"
              name="frage3"
              value="5"
              checked={answers.frage3 === "5"}
              onChange={handleChange}
            />
            <label htmlFor="frage3-5">trifft voll zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage3-4"
              name="frage3"
              value="4"
              checked={answers.frage3 === "4"}
              onChange={handleChange}
            />
            <label htmlFor="frage3-4">trifft zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage3-3"
              name="frage3"
              value="3"
              checked={answers.frage3 === "3"}
              onChange={handleChange}
            />
            <label htmlFor="frage3-3">trifft eher zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage3-2"
              name="frage3"
              value="2"
              checked={answers.frage3 === "2"}
              onChange={handleChange}
            />
            <label htmlFor="frage3-2">trifft eher nicht zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage3-1"
              name="frage3"
              value="1"
              checked={answers.frage3 === "1"}
              onChange={handleChange}
            />
            <label htmlFor="frage3-1">trifft nicht zu</label>
          </div>
          </div>
          <p className="flex justify-center items-center text-white font-bold">Aktuelle Auswahl (Frage 3): {answers.frage3 || "noch nichts ausgewählt"}</p>
          <hr className="my-4 border-gray-500 w-1/2 mx-auto" />

          {/* Frage 4 */}
          <h2 className="mt-20 flex justify-center items-center text-white font-bold">4. Ich kann den Inhalt des Textes auf verschiedene Sachverhalte anwenden.</h2>
          {/* Gleiche Struktur, name="frage4" */}
          <div className="mt-10 mb-10 flex justify-center items-center text-white gap-20">
          <div>
            <input
              type="radio"
              id="frage4-5"
              name="frage4"
              value="5"
              checked={answers.frage4 === "5"}
              onChange={handleChange}
            />
            <label htmlFor="frage4-5">trifft voll zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage4-4"
              name="frage4"
              value="4"
              checked={answers.frage4 === "4"}
              onChange={handleChange}
            />
            <label htmlFor="frage4-4">trifft zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage4-3"
              name="frage4"
              value="3"
              checked={answers.frage4 === "3"}
              onChange={handleChange}
            />
            <label htmlFor="frage4-3">trifft eher zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage4-2"
              name="frage4"
              value="2"
              checked={answers.frage4 === "2"}
              onChange={handleChange}
            />
            <label htmlFor="frage4-2">trifft eher nicht zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage4-1"
              name="frage4"
              value="1"
              checked={answers.frage4 === "1"}
              onChange={handleChange}
            />
            <label htmlFor="frage4-1">trifft nicht zu</label>
          </div>
          </div>
          <p className="flex justify-center items-center text-white font-bold">Aktuelle Auswahl (Frage 4): {answers.frage4 || "noch nichts ausgewählt"}</p>
          <hr className="my-4 border-gray-500 w-1/2 mx-auto" />

          {/* Frage 5 */}
          <h2 className="mt-20 flex justify-center items-center text-white font-bold">5. Ich kann Aufgaben sinnerfassend lesen.</h2>
          {/* Gleiche Struktur, name="frage5" */}
          <div className="mt-10 mb-10 flex justify-center items-center text-white gap-20">
          <div>
            <input
              type="radio"
              id="frage5-5"
              name="frage5"
              value="5"
              checked={answers.frage5 === "5"}
              onChange={handleChange}
            />
            <label htmlFor="frage5-5">trifft voll zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage5-4"
              name="frage5"
              value="4"
              checked={answers.frage5 === "4"}
              onChange={handleChange}
            />
            <label htmlFor="frage5-4">trifft zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage5-3"
              name="frage5"
              value="3"
              checked={answers.frage5 === "3"}
              onChange={handleChange}
            />
            <label htmlFor="frage5-3">trifft eher zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage5-2"
              name="frage5"
              value="2"
              checked={answers.frage5 === "2"}
              onChange={handleChange}
            />
            <label htmlFor="frage5-2">trifft eher nicht zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage5-1"
              name="frage5"
              value="1"
              checked={answers.frage5 === "1"}
              onChange={handleChange}
            />
            <label htmlFor="frage5-1">trifft nicht zu</label>
          </div>
          </div>
          <p className="flex justify-center items-center text-white font-bold">Aktuelle Auswahl (Frage 5): {answers.frage5 || "noch nichts ausgewählt"}</p>
          <hr className="my-4 border-gray-500 w-1/2 mx-auto" />

          {/* Frage 6 */}
          <h2 className="mt-20 flex justify-center items-center text-white font-bold">6. Ich kann die Operatoren/Fragewörter anwenden.</h2>
          {/* Gleiche Struktur, name="frage6" */}
          <div className="mt-10 mb-10 flex justify-center items-center text-white gap-20">
          <div>
            <input
              type="radio"
              id="frage6-5"
              name="frage6"
              value="5"
              checked={answers.frage6 === "5"}
              onChange={handleChange}
            />
            <label htmlFor="frage6-5">trifft voll zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage6-4"
              name="frage6"
              value="4"
              checked={answers.frage6 === "4"}
              onChange={handleChange}
            />
            <label htmlFor="frage6-4">trifft zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage6-3"
              name="frage6"
              value="3"
              checked={answers.frage6 === "3"}
              onChange={handleChange}
            />
            <label htmlFor="frage6-3">trifft eher zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage6-2"
              name="frage6"
              value="2"
              checked={answers.frage6 === "2"}
              onChange={handleChange}
            />
            <label htmlFor="frage6-2">trifft eher nicht zu</label>
          </div>
          <div>
            <input
              type="radio"
              id="frage6-1"
              name="frage6"
              value="1"
              checked={answers.frage6 === "1"}
              onChange={handleChange}
            />
            <label htmlFor="frage6-1">trifft nicht zu</label>
          </div>
          </div>
          <p className="flex justify-center items-center text-white font-bold">Aktuelle Auswahl (Frage 6): {answers.frage6 || "noch nichts ausgewählt"}</p>
          <hr className="my-4 border-gray-500 w-1/2 mx-auto" />

          {/* Submit button */}
        <div className="flex flex-col items-center mt-8 space-y-4">
          <button
            type="submit"
            className="text-white border-2 border-white rounded-full px-6 py-2 hover:bg-white hover:text-black transition duration-300"
          >
            Abschicken
          </button>

          {/* Result display */}
          {result && (
            <div className="text-white text-center p-4 max-w-md">
              <p className="font-bold">Empfehlung:</p>
              <p>{result}</p>
            </div>
          )}
        </div>
        </form>
      </main>
    </Suspense>
  );
}