import React from "react";

const Contact = () => {
  // Replace these with your real links/email
  const EMAIL = "you@example.com";
  const LINKEDIN = "https://www.linkedin.com/in/your-handle";
  const GITHUB = "https://github.com/your-handle";

  return (
    <div className="">
      <h2 className="text-white font-semibold text-[clamp(24px,4vw,36px)] mb-4 text-center">
        Get In Touch
      </h2>

      {/* Subtitle */}
      <p className="hidden md:block text-white/70 text-center text-[clamp(14px,2.5vw,18px)] mb-10 max-w-2xl mx-auto">
        I’m open to full‑time roles, contracts, or collaborations. Let’s talk
        about how I can help deliver value to your team.
      </p>
      <p className="md:hidden text-white/70 text-center text-[clamp(12px,3.5vw,16px)] mb-8">
        Open to roles and collabs — let’s talk.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
        <a
          href={`mailto:${EMAIL}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black px-5 py-3 font-semibold hover:bg-white/90 transition"
        >
          <span>Email Me</span>
          <span aria-hidden>✉️</span>
        </a>
        <a
          href="/resume.txt"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 text-white px-5 py-3 font-semibold hover:border-white/40 transition"
        >
          <span>Download Resume</span>
          <span aria-hidden>⬇️</span>
        </a>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        <a
          href={`mailto:${EMAIL}`}
          className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5 hover:border-white/30 transition group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">✉️</div>
            <div className="text-white font-semibold text-[clamp(16px,3vw,18px)]">
              Email
            </div>
          </div>
          <div className="text-white/70 text-[clamp(12px,2.5vw,14px)] truncate">
            {EMAIL}
          </div>
        </a>

        <a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5 hover:border-white/30 transition group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">🔗</div>
            <div className="text-white font-semibold text-[clamp(16px,3vw,18px)]">
              LinkedIn
            </div>
          </div>
          <div className="text-white/70 text-[clamp(12px,2.5vw,14px)] truncate">
            linkedin.com/in/your-handle
          </div>
        </a>

        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5 hover:border-white/30 transition group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">🐙</div>
            <div className="text-white font-semibold text-[clamp(16px,3vw,18px)]">
              GitHub
            </div>
          </div>
          <div className="text-white/70 text-[clamp(12px,2.5vw,14px)] truncate">
            github.com/your-handle
          </div>
        </a>
      </div>

      {/* Note */}
      <p className="text-white/50 mt-8 text-center text-[clamp(12px,2vw,14px)]">
        Prefer email for the fastest response.
      </p>
    </div>
  );
};

export default Contact;
