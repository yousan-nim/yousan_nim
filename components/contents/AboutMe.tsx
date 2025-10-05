import { style } from "@/style";
import React from "react";

const AboutMe = () => {
  return (
    <div className={``}>
      <h1 className="text-white font-semibold uppercase text-[clamp(32px,6vw,56px)] text-start mb-8">
        About Me
      </h1>

      {/* Main Story */}
      <div className="grid lg:grid-cols-2 gap-4 mb-12">
        {/* Left: Personal Journey */}
        <div className="space-y-6 rounded-lg border border-white/10 bg-white/2 backdrop-blur p-5">
          <div className="prose prose-invert max-w-none">
            <p className="text-white text-[clamp(16px,2.5vw,20px)] leading-relaxed text- indent-8">
              From building computer vision systems for construction safety to
              creating holographic AI assistants for airlines, my journey has
              been about pushing the boundaries of what's possible.
            </p>
            <p className="text-white text-[clamp(16px,2.5vw,20px)] leading-relaxed text- indent-8">
              With a{" "}
              <span className="text-white font-semibold">
                Master's in Electrical Engineering
              </span>{" "}
              from KMUTT and hands-on experience across AI research and
              full-stack development, I specialize in turning complex ideas into
              tangible, user-focused solutions.
            </p>
            <p className="text-white text-[clamp(16px,2.5vw,20px)] leading-relaxed text- indent-8">
              I've collaborated with industry leaders like{" "}
              <span className="text-gray-300">Panasonic</span> and{" "}
              <span className="text-gray-300">NSTDA</span> on AI research,
              built CMS platforms serving high-profile clients, and pioneered{" "}
              <span className="text-gray-300">
                holographic AI avatar technology
              </span>{" "}
              for the airline and hospitality industries.
            </p>
          </div>
        </div>

        {/* Right: Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-white/10 bg-white/2 backdrop-blur p-5 text-center">
            <div className="text-[clamp(32px,5vw,48px)] font-bold text-gray-100/98 mb-1">2+</div>
            <div className="text-white text-[clamp(12px,2vw,16px)] uppercase tracking-wide">
              Years Experience
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/2 backdrop-blur p-5 text-center">
            <div className="text-[clamp(32px,5vw,48px)] font-bold text-gray-100/98 mb-1">10+</div>
            <div className="text-white text-[clamp(12px,2vw,16px)] uppercase tracking-wide">
              Projects Delivered
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/2 backdrop-blur p-5 text-center">
            <div className="text-[clamp(32px,5vw,48px)] font-bold text-gray-100/98 mb-1">2</div>
            <div className="text-white text-[clamp(12px,2vw,16px)] uppercase tracking-wide">
              Research Collaborations
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/2 backdrop-blur p-5 text-center">
            <div className="text-[clamp(32px,5vw,48px)] font-bold text-gray-100/98 mb-1">5+</div>
            <div className="text-white text-[clamp(12px,2vw,16px)] uppercase tracking-wide">
              Cloud Deployments
            </div>
          </div>
        </div>
      </div>

      {/* Software Development Lifecycle */}
      <div className="mb-12">
        <h2 className="text-white font-semibold text-[clamp(24px,4vw,36px)] mb-8 text-center">
          My Development Process
        </h2>
        <p className="text-white/70 text-center text-[clamp(14px,2.5vw,18px)] mb-12 max-w-3xl mx-auto">
          A systematic approach to building scalable, production-ready applications
        </p>

        <div className="relative max-w-5xl mx-auto">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/50 via-white/30 to-transparent -translate-x-1/2"></div>

          <div className="space-y-12">
            {/* Step 1 - Planning - Right */}
            <div className="relative grid grid-cols-2 gap-10 items-center">
              <div></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white ring-6 ring-white/20 z-10 flex items-center justify-center text-black text-base font-bold">1</div>
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur p-6">
                <div className="text-white font-semibold text-[clamp(18px,3vw,22px)] mb-2">
                  Planning & Design 📋
                </div>
                <div className="text-white/70 text-[clamp(14px,2.2vw,18px)] leading-relaxed mb-3">
                  Define requirements, architecture, and tech stack selection
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded bg-white/5 text-white/60">User Stories</span>
                  <span className="text-xs px-3 py-1 rounded bg-white/5 text-white/60">Database</span>
                  <span className="text-xs px-3 py-1 rounded bg-white/5 text-white/60">API Design</span>
                </div>
              </div>
            </div>

            {/* Step 2 - Development - Left */}
            <div className="relative grid grid-cols-2 gap-10 items-center">
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur p-6">
                <div className="text-white font-semibold text-[clamp(18px,3vw,22px)] mb-2 text-right">
                  Development 💻
                </div>
                <div className="text-white/70 text-[clamp(14px,2.2vw,18px)] leading-relaxed mb-3 text-right">
                  Build frontend, backend APIs, and integrate features
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                  <span className="text-xs px-3 py-1 rounded bg-white/5 text-white/60">Components</span>
                  <span className="text-xs px-3 py-1 rounded bg-white/5 text-white/60">APIs</span>
                  <span className="text-xs px-3 py-1 rounded bg-white/5 text-white/60">State Mgmt</span>
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-300 ring-6 ring-gray-300/20 z-10 flex items-center justify-center text-black text-base font-bold">2</div>
              <div></div>
            </div>

            {/* Step 3 - Testing - Right */}
            <div className="relative grid grid-cols-2 gap-10 items-center">
              <div></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-400 ring-6 ring-gray-400/20 z-10 flex items-center justify-center text-black text-base font-bold">3</div>
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur p-6">
                <div className="text-white font-semibold text-[clamp(18px,3vw,22px)] mb-2">
                  Testing & QA 🧪
                </div>
                <div className="text-white/70 text-[clamp(14px,2.2vw,18px)] leading-relaxed mb-3">
                  Comprehensive testing and quality assurance
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded bg-white/5 text-white/60">Unit Tests</span>
                  <span className="text-xs px-3 py-1 rounded bg-white/5 text-white/60">Integration</span>
                  <span className="text-xs px-3 py-1 rounded bg-white/5 text-white/60">E2E</span>
                </div>
              </div>
            </div>

            {/* Step 4 - Deployment - Left */}
            <div className="relative grid grid-cols-2 gap-10 items-center">
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur p-6">
                <div className="text-white font-semibold text-[clamp(18px,3vw,22px)] mb-2 text-right">
                  Deployment 🚀
                </div>
                <div className="text-white/70 text-[clamp(14px,2.2vw,18px)] leading-relaxed mb-3 text-right">
                  CI/CD pipelines and cloud deployment setup
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                  <span className="text-xs px-3 py-1 rounded bg-white/5 text-white/60">Docker</span>
                  <span className="text-xs px-3 py-1 rounded bg-white/5 text-white/60">CI/CD</span>
                  <span className="text-xs px-3 py-1 rounded bg-white/5 text-white/60">AWS/Vultr</span>
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-500 ring-6 ring-gray-500/20 z-10 flex items-center justify-center text-white text-base font-bold">4</div>
              <div></div>
            </div>

            {/* Step 5 - Monitoring - Right */}
            <div className="relative grid grid-cols-2 gap-10 items-center">
              <div></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-200 ring-6 ring-gray-200/20 z-10 flex items-center justify-center text-black text-base font-bold">5</div>
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur p-6">
                <div className="text-white font-semibold text-[clamp(18px,3vw,22px)] mb-2">
                  Monitoring 📊
                </div>
                <div className="text-white/70 text-[clamp(14px,2.2vw,18px)] leading-relaxed mb-3">
                  Track performance and continuously optimize
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded bg-white/5 text-white/60">Analytics</span>
                  <span className="text-xs px-3 py-1 rounded bg-white/5 text-white/60">Performance</span>
                  <span className="text-xs px-3 py-1 rounded bg-white/5 text-white/60">Iteration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Focus Areas */}
      <div className="mb-12">
        <h2 className="text-white font-semibold text-[clamp(24px,4vw,36px)] mb-8 text-center">
          Current Focus Areas
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6 hover:border-white/30 transition">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-white font-semibold text-[clamp(18px,3vw,22px)] mb-3">
              AI Integration
            </h3>
            <p className="text-white/70 text-[clamp(14px,2.2vw,16px)] leading-relaxed">
              OpenAI LLM, RAG pipelines, chatbots, and holographic AI avatars
              for immersive experiences.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6 hover:border-white/30 transition">
            <div className="text-3xl mb-3">☁️</div>
            <h3 className="text-white font-semibold text-[clamp(18px,3vw,22px)] mb-3">
              Cloud Architecture
            </h3>
            <p className="text-white/70 text-[clamp(14px,2.2vw,16px)] leading-relaxed">
              AWS/Vultr deployment, Docker, Kubernetes, CI/CD pipelines for
              scalable production systems.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6 hover:border-white/30 transition">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-white font-semibold text-[clamp(18px,3vw,22px)] mb-3">
              Digital Transformation
            </h3>
            <p className="text-white/70 text-[clamp(14px,2.2vw,16px)] leading-relaxed">
              Building end-to-end solutions that bridge technology and business
              impact through innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Expertise */}
      <div>
        <h2 className="text-white font-semibold text-[clamp(24px,4vw,36px)] mb-4 text-center">
          Technical Expertise
        </h2>
        <p className="text-white/80 mb-12 text-[clamp(14px,2.5vw,18px)] leading-relaxed text-center max-w-3xl mx-auto">
          A refined selection of my proficiency in modern development tools and technologies
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full mx-auto">
          {/* Frontend Card */}
          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-transparent backdrop-blur p-6 hover:border-white/40 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="text-3xl">⚛️</div>
                <h3 className="font-bold text-[clamp(18px,3vw,22px)] text-white">
                  Frontend
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind", "Three.js"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white/90 text-[clamp(12px,2vw,14px)] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Backend Card */}
          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-transparent backdrop-blur p-6 hover:border-white/40 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="text-3xl">🚂</div>
                <h3 className="font-bold text-[clamp(18px,3vw,22px)] text-white">
                  Backend
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Express", "Spring Boot", "Python", "Flask"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white/90 text-[clamp(12px,2vw,14px)] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Database Card */}
          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-transparent backdrop-blur p-6 hover:border-white/40 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="text-3xl">🗄️</div>
                <h3 className="font-bold text-[clamp(18px,3vw,22px)] text-white">
                  Database
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["MongoDB", "PostgreSQL", "MySQL", "Elasticsearch"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white/90 text-[clamp(12px,2vw,14px)] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* DevOps & Cloud Card */}
          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-transparent backdrop-blur p-6 hover:border-white/40 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="text-3xl">☁️</div>
                <h3 className="font-bold text-[clamp(18px,3vw,22px)] text-white">
                  DevOps & Cloud
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Docker", "Kubernetes", "AWS", "Vultr", "GitHub Actions"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white/90 text-[clamp(12px,2vw,14px)] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI & ML Card */}
          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-transparent backdrop-blur p-6 hover:border-white/40 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="text-3xl">🤖</div>
                <h3 className="font-bold text-[clamp(18px,3vw,22px)] text-white">
                  AI & ML
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["PyTorch", "OpenAI", "RAG", "Computer Vision", "ASR"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white/90 text-[clamp(12px,2vw,14px)] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tools & Others Card */}
          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-transparent backdrop-blur p-6 hover:border-white/40 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="text-3xl">🛠️</div>
                <h3 className="font-bold text-[clamp(18px,3vw,22px)] text-white">
                  Tools & Others
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Git", "VS Code", "Figma", "Postman", "Jira"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white/90 text-[clamp(12px,2vw,14px)] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-white/50 mt-10 text-center text-[clamp(12px,2vw,14px)] font-medium italic">
          Constantly refining and expanding my technical skillset.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
