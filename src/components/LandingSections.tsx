import { motion } from "motion/react";
import { useState } from "react";
import {
  Film,
  Sparkles,
  MessageCircle,
  BarChart2,
  UserCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const FEATURES = [
  { Icon: Film,          text: "Reels upgrades",       desc: "Next-gen video creation tools" },
  { Icon: Sparkles,      text: "AI camera tools",       desc: "Real-time scene enhancement" },
  { Icon: MessageCircle, text: "New messaging system",  desc: "Reimagined DM experience" },
  { Icon: BarChart2,     text: "Creator analytics",     desc: "Deep audience insights" },
  { Icon: UserCircle,    text: "Profile redesign",      desc: "A fresh look for your profile" },
];

const FAQS = [
  {
    q: "What is this beta?",
    a: "The Instagram Beta Program gives selected users early access to upcoming app features before they're released publicly.",
  },
  {
    q: "How do I join?",
    a: "Log into your Instagram account above and submit your enrollment. Selected users will be notified through the app.",
  },
  {
    q: "Is it free?",
    a: "Yes — completely free. Beta access is an invite-only program with no cost to participants.",
  },
];

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const i = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(i);
  }, []);
  return time;
}

function SectionDivider() {
  return <div className="h-2 bg-[#fafafa] border-y border-[#f0f0f0]" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-[#8e8e8e] tracking-[0.22em] uppercase mb-2">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[20px] font-bold text-[#262626] leading-snug mb-5">
      {children}
    </h2>
  );
}

export default function LandingSections({ onEnroll }: { onEnroll: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col">

      {/* ── HERO ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="px-6 pt-10 pb-10"
      >
        <SectionLabel>Instagram Beta Program</SectionLabel>
        <h1 className="text-[26px] font-black text-[#262626] leading-tight mb-3">
          Instagram Beta
        </h1>
        <p className="text-[14px] text-[#8e8e8e] leading-relaxed mb-8">
          Get early access to upcoming app features before public release. Be among the first to shape the next version of Instagram.
        </p>
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onEnroll}
            className="flex-1 h-[48px] rounded-full text-white font-semibold text-[14px] bg-[#0064e0] active:bg-[#0054c0] transition-colors"
          >
            Login
          </motion.button>
          <button
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            className="flex-1 h-[48px] rounded-full border border-[#dbdbdb] text-[#262626] font-semibold text-[14px] flex items-center justify-center active:bg-[#fafafa] transition-colors"
          >
            View Features
          </button>
        </div>
      </motion.div>

      <SectionDivider />

      {/* ── EARLY ACCESS OVERVIEW ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.4 }}
        className="px-6 pt-10 pb-10"
      >
        <SectionLabel>Early Access</SectionLabel>
        <SectionHeading>What is Beta Testing?</SectionHeading>
        <p className="text-[14px] text-[#8e8e8e] leading-relaxed">
          Beta testers receive exclusive access to new Instagram features weeks before they roll out publicly. Your feedback directly shapes what gets built — making you part of the team behind the product.
        </p>
      </motion.div>

      <SectionDivider />

      {/* ── FEATURES PREVIEW ──────────────────────── */}
      <div id="features" className="px-6 pt-10 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4 }}
        >
          <SectionLabel>Coming to Beta</SectionLabel>
          <SectionHeading>Features Preview</SectionHeading>
        </motion.div>

        <div className="flex flex-col gap-3">
          {FEATURES.map(({ Icon, text, desc }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              className="flex items-center gap-4 px-4 py-4 border border-[#ebebeb] rounded-2xl bg-white"
            >
              <div className="w-10 h-10 rounded-xl bg-[#f5f5f5] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#262626]" strokeWidth={1.8} />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[14px] font-semibold text-[#262626]">{text}</span>
                <span className="text-[12px] text-[#8e8e8e] mt-0.5">{desc}</span>
              </div>
              <span className="text-[11px] font-semibold text-[#0064e0] bg-[#e8f0fd] px-2.5 py-1 rounded-full shrink-0">
                Beta
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* ── FAQ ───────────────────────────────────── */}
      <div className="px-6 pt-10 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4 }}
        >
          <SectionLabel>Help</SectionLabel>
          <SectionHeading>Frequently Asked</SectionHeading>
        </motion.div>

        <div className="flex flex-col gap-2.5">
          {FAQS.map((f, i) => (
            <div key={f.q} className="border border-[#ebebeb] rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-[14px] font-semibold text-[#262626] pr-3">{f.q}</span>
                {openFaq === i
                  ? <ChevronUp className="w-4 h-4 text-[#8e8e8e] shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-[#8e8e8e] shrink-0" />
                }
              </button>
              <motion.div
                initial={false}
                animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden" }}
              >
                <p className="px-5 pb-5 text-[13px] text-[#8e8e8e] leading-relaxed">{f.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* ── FOOTER ────────────────────────────────── */}
      <div className="px-6 pt-8 pb-10 text-center">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
          {["Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy", "Terms",
            "Locations", "Popular", "Instagram Lite", "Threads"].map(l => (
            <span key={l} className="text-[11px] text-[#8e8e8e]">{l}</span>
          ))}
        </div>
        <div className="flex justify-center mb-4 opacity-40">
          <img
            src="https://static.cdninstagram.com/rsrc.php/ys/r/RkrEdst9VSp.webp"
            alt="Meta"
            className="w-[44px]"
          />
        </div>
        <p className="text-[11px] text-[#8e8e8e]">© 2026 Instagram from Meta</p>
      </div>

    </div>
  );
}
