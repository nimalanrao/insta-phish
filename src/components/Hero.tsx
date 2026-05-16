import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const SCREENS = [
  { bg: "linear-gradient(135deg,#E1306C,#833AB4)", label: "AI Reels Studio", icon: "🎬" },
  { bg: "linear-gradient(135deg,#405DE6,#5851DB)", label: "AI Camera", icon: "✨" },
  { bg: "linear-gradient(135deg,#F77737,#FCAF45)", label: "New DM Design", icon: "💬" },
  { bg: "linear-gradient(135deg,#833AB4,#405DE6)", label: "Creator Analytics", icon: "📊" },
];

export default function Hero({ onEnroll }: { onEnroll: () => void }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % SCREENS.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-white text-center select-none">
      {/* Badge */}
      <motion.div initial={{ opacity:0,y:-16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.15 }}
        className="glass flex items-center gap-2 px-4 py-1.5 rounded-full mb-5">
        <span className="badge-glow text-[#7090ff] text-sm font-bold">✓</span>
        <span className="text-white/75 text-[11px] font-semibold tracking-[0.25em] uppercase">Official Beta Program</span>
      </motion.div>

      {/* Wordmark */}
      <motion.div initial={{ opacity:0,scale:0.82 }} animate={{ opacity:1,scale:1 }} transition={{ delay:0.28,type:"spring",stiffness:120 }}>
        <h1 className="gradient-text text-[38px] font-black tracking-tight leading-none" style={{ fontFamily:"Outfit,sans-serif" }}>
          Instagram
        </h1>
        <p className="text-white/80 text-[13px] font-semibold tracking-[0.32em] uppercase mt-1">Beta Enrollment</p>
      </motion.div>

      <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.42 }}
        className="text-white/40 text-[12px] mt-2 mb-5">
        The next generation of social is almost here.
      </motion.p>

      {/* Phone mockup */}
      <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.35,type:"spring" }}
        className="phone-float mb-5">
        <div style={{ width:130,height:230,borderRadius:28,background:'#0d0d0d',border:'2px solid rgba(255,255,255,0.14)',boxShadow:'0 28px 56px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.08)',position:'relative',overflow:'hidden' }}>
          {/* Dynamic Island */}
          <div style={{ position:'absolute',top:10,left:'50%',transform:'translateX(-50%)',width:46,height:13,background:'#000',borderRadius:20,zIndex:10 }} />
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity:0,x:28 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-28 }} transition={{ duration:0.38 }}
              style={{ position:'absolute',inset:0,background:SCREENS[idx].bg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8 }}>
              <span style={{ fontSize:32 }}>{SCREENS[idx].icon}</span>
              <span style={{ fontSize:10,fontWeight:700,color:'white',padding:'0 10px',textAlign:'center' }}>{SCREENS[idx].label}</span>
            </motion.div>
          </AnimatePresence>
          {/* Dots */}
          <div style={{ position:'absolute',bottom:10,left:0,right:0,display:'flex',justifyContent:'center',gap:4,zIndex:10 }}>
            {SCREENS.map((_,i) => (
              <div key={i} style={{ width:i===idx?14:5,height:5,borderRadius:3,background:'rgba(255,255,255,0.75)',transition:'width 0.3s ease' }} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.55 }} className="mb-4">
        <h2 className="text-white text-[19px] font-black leading-snug">
          Get Early Access<br />Before Anyone Else.
        </h2>
        <p className="text-white/45 text-[12px] mt-1">Join creators testing tomorrow's features.</p>
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ opacity:0,scale:0.88 }} animate={{ opacity:1,scale:1 }} transition={{ delay:0.65,type:"spring" }}
        whileTap={{ scale:0.95 }} onClick={onEnroll}
        className="shimmer-btn glow-btn w-full max-w-[300px] h-[52px] rounded-full text-white font-bold text-[16px] mb-3"
        style={{ background:'linear-gradient(135deg,#F77737,#E1306C 35%,#833AB4 65%,#405DE6)',backgroundSize:'200% auto' }}>
        Enroll Now ✨
      </motion.button>

      {/* Slots bar */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }} className="w-full max-w-[300px]">
        <div className="flex justify-between mb-1">
          <span className="text-white/40 text-[11px]">Beta slots remaining</span>
          <span className="text-white/70 text-[11px] font-bold">247 / 1,000</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.1)' }}>
          <motion.div initial={{ width:0 }} animate={{ width:'24.7%' }} transition={{ delay:1,duration:1.2,ease:"easeOut" }}
            className="h-full rounded-full" style={{ background:'linear-gradient(90deg,#E1306C,#833AB4)' }} />
        </div>
      </motion.div>
    </div>
  );
}
