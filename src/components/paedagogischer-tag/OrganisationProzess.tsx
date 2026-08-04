"use client";

/**
 * Animierter Organisations-Prozess im Grain-Gradient-Look:
 * Ein leuchtender Punkt läuft endlos die Strecke ab, die Stationen
 * aktivieren sich nacheinander (8s-Loop, CSS-Keyframes).
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const STEPS = [
  {
    step: "1",
    title: "Erstgespräch",
    description: "Wir lernen Ihre Schule und Ihre Wünsche kennen.",
  },
  {
    step: "2",
    title: "Konzeption",
    description: "Wir erstellen ein individuelles Programm für Ihren Tag.",
  },
  {
    step: "3",
    title: "Durchführung",
    description: "Unser Team kommt zu Ihnen und führt den Tag vor Ort durch.",
  },
  {
    step: "4",
    title: "Nachbereitung",
    description: "Sie erhalten Materialien und Empfehlungen für die Weiterarbeit.",
  },
];

export default function OrganisationProzess() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-[32px] p-5 shadow-2xl [background:linear-gradient(155deg,#6f8dff_0%,#8b7cf6_45%,#b89bfa_78%,#d6bdfa_100%)] sm:p-8">
      <style>{`
        @keyframes orgaRunner {
          0%   { left: 12.5%; }
          22%  { left: 12.5%; }
          25%  { left: 37.5%; }
          47%  { left: 37.5%; }
          50%  { left: 62.5%; }
          72%  { left: 62.5%; }
          75%  { left: 87.5%; }
          100% { left: 87.5%; }
        }
        @keyframes orgaFill {
          0%   { width: 0%; }
          22%  { width: 0%; }
          25%  { width: 25%; }
          47%  { width: 25%; }
          50%  { width: 50%; }
          72%  { width: 50%; }
          75%  { width: 75%; }
          100% { width: 75%; }
        }
        @keyframes orgaStep {
          0%, 100% { opacity: 1; }
        }
        @keyframes orgaPanel {
          0%       { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.22); transform: translateY(0); }
          3%, 22%  { background: rgba(255,255,255,0.22); border-color: rgba(255,255,255,0.55); transform: translateY(-4px); }
          28%,100% { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.22); transform: translateY(0); }
        }
        @keyframes orgaBadge {
          0%       { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0.0); }
          3%, 22%  { transform: scale(1.12); box-shadow: 0 0 0 6px rgba(255,255,255,0.22); }
          28%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0.0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .orga-runner, .orga-fill { animation: none !important; }
          .orga-panel { animation: none !important; background: rgba(255,255,255,0.16) !important; }
          .orga-badge { animation: none !important; }
        }
      `}</style>

      {/* Grobkörnige Struktur */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: "140px 140px" }}
      />

      <div className="relative">
        {/* Strecke mit Läufer (nur Desktop) */}
        <div className="relative mb-6 hidden h-6 lg:block">
          <div className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-white/25" style={{ left: "12.5%", right: "12.5%" }} />
          <div
            className="orga-fill absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-white/90"
            style={{ left: "12.5%", animation: "orgaFill 8s ease-in-out infinite" }}
          />
          <div
            className="orga-runner absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{
              animation: "orgaRunner 8s ease-in-out infinite",
              boxShadow:
                "0 0 0 5px rgba(255,255,255,0.25), 0 0 24px 6px rgba(255,255,255,0.55)",
            }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item, index) => (
            <div
              key={item.step}
              className="orga-panel rounded-2xl border p-4 backdrop-blur-md"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.22)",
                animation: `orgaPanel 8s ease-in-out ${index * 2}s infinite`,
              }}
            >
              <span
                className="orga-badge flex size-10 items-center justify-center rounded-xl bg-white/90 text-md font-semibold text-primary-darker"
                style={{ animation: `orgaBadge 8s ease-in-out ${index * 2}s infinite` }}
              >
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm font-light leading-relaxed text-white/85">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
