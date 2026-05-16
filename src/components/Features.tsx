import { motion } from "motion/react";
import { useState, useEffect } from "react";

const FEATURES = [
  { icon:"🎬", title:"AI Reels Studio", desc:"Auto-edit with AI music sync" },
  { icon:"✨", title:"AI Camera", desc:"Real-time scene enhancement" },
  { icon:"💬", title:"DM Redesign", desc:"Cinematic message threads" },
  { icon:"📊", title:"Creator Analytics", desc:"Deep audience insights" },
];

const TESTIMONIALS = [
  { text:"This feels like the future of Instagram.", name:"@alex.creates", avatar:"🧑‍🎨" },
  { text:"The AI camera alone is worth enrolling for.", name:"@studio.lens", avatar:"📸" },
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
  const [t, setT] = useState(calc);
  useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, []);
  return t;
}

export default function Features() {
  const cd = useCountdown(new Date("2026-07-04T00:00:00"));

  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-4 text-white overflow-hidden">
      {/* Heading */}
      <motion.div initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }} transition={{ duration:0.5 }} className="text-center mb-4">
        <p className="text-white/40 text-[11px] tracking-[0.3em] uppercase font-semibold mb-1">What's Coming</p>
        <h2 className="text-[22px] font-black leading-tight">Beta-Exclusive<br />Features</h2>
      </motion.div>

      {/* Feature cards 2x2 */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {FEATURES.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:i*0.08,duration:0.4 }}
            whileTap={{ scale:0.97 }}
            className="glass rounded-2xl p-3.5 flex flex-col gap-1.5">
            <span className="text-2xl">{f.icon}</span>
            <p className="text-white font-bold text-[13px] leading-tight">{f.title}</p>
            <p className="text-white/45 text-[11px] leading-snug">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Countdown */}
      <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ delay:0.3 }}
        className="glass rounded-2xl px-4 py-3 mb-4">
        <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase font-semibold text-center mb-2">Beta Launch Countdown</p>
        <div className="flex justify-center gap-3">
          {[["d","Days"],["h","Hrs"],["m","Min"],["s","Sec"]].map(([k,label]) => (
            <div key={k} className="flex flex-col items-center">
              <span className="countdown-num text-[26px] font-black leading-none tabular-nums gradient-text">
                {String((cd as Record<string,number>)[k]).padStart(2,"0")}
              </span>
              <span className="text-white/35 text-[9px] uppercase tracking-wider mt-0.5">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials */}
      <div className="flex flex-col gap-2">
        {TESTIMONIALS.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity:0,x:-16 }} whileInView={{ opacity:1,x:0 }} transition={{ delay:0.1*i,duration:0.4 }}
            className="glass rounded-xl px-3.5 py-2.5 flex items-center gap-3">
            <span className="text-xl shrink-0">{t.avatar}</span>
            <div>
              <p className="text-white/80 text-[12px] leading-snug">"{t.text}"</p>
              <p className="text-white/35 text-[10px] mt-0.5 font-medium">{t.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
