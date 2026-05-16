import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import Logo from "./components/Logo";
import EnrollmentForm from "./components/EnrollmentForm";
import LandingSections from "./components/LandingSections";
import { LANGUAGES } from "./constants";

export default function App() {
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const loginRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  const scrollToLogin = () => {
    loginRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollDown = () => {
    sectionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <main className="w-full max-w-[430px] bg-white min-h-screen flex flex-col">

        {/* ── Login hero — full viewport ── */}
        <div ref={loginRef} className="relative flex flex-col" style={{ minHeight: "100dvh" }}>
          <Logo selectedLang={currentLang} onLangChange={setCurrentLang} />
          <EnrollmentForm selectedLang={currentLang} />

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-1">
            <motion.button
              onClick={scrollDown}
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1 text-[#8e8e8e] active:opacity-60"
            >
              <span className="text-[11px] font-medium tracking-widest uppercase">Scroll</span>
              <ChevronDown className="w-4 h-4" strokeWidth={1.8} />
            </motion.button>
          </div>
        </div>

        {/* ── Landing sections ── */}
        <div ref={sectionsRef}>
          <div className="h-2 bg-[#fafafa] border-y border-[#f0f0f0]" />
          <LandingSections onEnroll={scrollToLogin} />
        </div>

      </main>
    </div>
  );
}
