import { useState } from "react";
import { Gamepad2, Keyboard, Layers, Sparkles, type LucideIcon } from "lucide-react";
import { Modal } from "./Modal";

type Step = { Icon: LucideIcon; title: string; body: string };

const STEPS: Step[] = [
  {
    Icon: Sparkles,
    title: "Willkommen im Cell Explorer",
    body: "Erkunden Sie sieben interaktive Zellpräparate, betrachten Sie ihre Zellbestandteile und vergleichen Sie, wie zelluläre Strukturen unterschiedliche biologische Aufgaben unterstützen.",
  },
  {
    Icon: Layers,
    title: "Stöbern und lernen",
    body: "Suchen Sie in der Leiste oben, öffnen Sie die Galerie für die Gesamtübersicht, speichern Sie Favoriten und lernen Sie Namen und Merkmale mit den Lernkarten.",
  },
  {
    Icon: Gamepad2,
    title: "Wissen testen",
    body: "Spielen Sie das Quiz im entspannten Modus, auf Zeit, im Eintipp- oder im Überlebensmodus. Sammeln Sie Serien und XP, steigen Sie auf und schalten Sie Erfolge frei. Ein täglicher Besuch bringt einen Bonus.",
  },
  {
    Icon: Keyboard,
    title: "Tipps",
    body: "Mit ? sehen Sie jederzeit die Tastenkürzel (Pfeiltasten wechseln das Präparat). Die Akzentfarbe wählen Sie im Benutzermenü. Viel Freude!",
  },
];

export function WelcomeTour({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const { Icon } = current;

  function finish() {
    setStep(0);
    onClose();
  }

  return (
    <Modal open={open} onClose={finish} label="Willkommen" panelClassName="welcome-modal">
      <div className="welcome-art">
        <Icon size={40} />
      </div>
      <h2 className="welcome-title">{current.title}</h2>
      <p className="welcome-body">{current.body}</p>

      <div className="welcome-dots" aria-hidden="true">
        {STEPS.map((_, i) => (
          <span key={i} className={`welcome-dot ${i === step ? "is-active" : ""}`} />
        ))}
      </div>

      <div className="welcome-actions">
        {step > 0 ? (
          <button type="button" className="quiz-secondary" onClick={() => setStep((s) => s - 1)}>
            Zurück
          </button>
        ) : (
          <button type="button" className="quiz-secondary" onClick={finish}>
            Überspringen
          </button>
        )}
        {isLast ? (
          <button type="button" className="quiz-primary" onClick={finish}>
            Loslegen
          </button>
        ) : (
          <button type="button" className="quiz-primary" onClick={() => setStep((s) => s + 1)}>
            Weiter
          </button>
        )}
      </div>
    </Modal>
  );
}
