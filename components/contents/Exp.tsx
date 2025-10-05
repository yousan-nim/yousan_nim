import { style } from "@/style";
import React from "react";

const Exp = () => {
  return (
    <div className={`${style}`}>
      <h1 className="text-white font-semibold uppercase text-[clamp(32px,6vw,56px)] text-start mb-8">
        Experience
      </h1>

      {/* Main Story */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Left: Personal Journey */}
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-[clamp(16px,2.5vw,20px)] leading-relaxed">
              From building computer vision systems for construction safety to
              creating holographic AI assistants for airlines, my journey has
              been about pushing the boundaries of what's possible.
            </p>
            <p className="text-white/80 text-[clamp(16px,2.5vw,20px)] leading-relaxed">
              With a{" "}
              <span className="text-white font-semibold">
                Master's in Electrical Engineering
              </span>{" "}
              from KMUTT and hands-on experience across AI research and
              full-stack development, I specialize in turning complex ideas into
              tangible, user-focused solutions.
            </p>
            <p className="text-white/80 text-[clamp(16px,2.5vw,20px)] leading-relaxed">
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
          <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur p-5 text-center">
            <div className="text-[clamp(32px,5vw,48px)] font-bold text-white mb-1">4+</div>
            <div className="text-white/70 text-[clamp(12px,2vw,16px)] uppercase tracking-wide">
              Years Experience
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur p-5 text-center">
            <div className="text-[clamp(32px,5vw,48px)] font-bold text-white mb-1">10+</div>
            <div className="text-white/70 text-[clamp(12px,2vw,16px)] uppercase tracking-wide">
              Projects Delivered
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur p-5 text-center">
            <div className="text-[clamp(32px,5vw,48px)] font-bold text-white mb-1">2</div>
            <div className="text-white/70 text-[clamp(12px,2vw,16px)] uppercase tracking-wide">
              Research Collaborations
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur p-5 text-center">
            <div className="text-[clamp(32px,5vw,48px)] font-bold text-white mb-1">5+</div>
            <div className="text-white/70 text-[clamp(12px,2vw,16px)] uppercase tracking-wide">
              Cloud Deployments
            </div>
          </div>
        </div>
      </div>

      {/* Career Timeline */}
      <div className="mb-12">
        <h2 className="text-white font-semibold text-[clamp(24px,4vw,36px)] mb-8 text-center">
          Career Journey
        </h2>
        <div className="relative max-w-4xl mx-auto">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/50 via-white/30 to-transparent -translate-x-1/2"></div>

          <div className="space-y-12">
            {/* Timeline Item 1 - Right */}
            <div className="relative grid grid-cols-2 gap-8 items-center">
              {/* Left Empty */}
              <div></div>
              {/* Center Point */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white ring-4 ring-white/20 z-10"></div>
              {/* Right Content */}
              <div className="text-left">
                <div className="text-white/50 text-[clamp(13px,2vw,16px)] mb-1">2024 - Present</div>
                <div className="text-white font-semibold text-[clamp(18px,3vw,24px)] mb-2">
                  Full-Stack Developer @ CREaiVE.ai
                </div>
                <div className="text-white/70 text-[clamp(14px,2.2vw,18px)] leading-relaxed">
                  Building CMS platforms, AI chatbots with holographic displays,
                  and e-commerce solutions. Pioneering AI Human avatar technology.
                </div>
              </div>
            </div>

            {/* Timeline Item 2 - Left */}
            <div className="relative grid grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="text-right">
                <div className="text-white/50 text-[clamp(13px,2vw,16px)] mb-1">2021 - 2024</div>
                <div className="text-white font-semibold text-[clamp(18px,3vw,24px)] mb-2">
                  AI Researcher & Teaching Assistant @ KMUTT
                </div>
                <div className="text-white/70 text-[clamp(14px,2.2vw,18px)] leading-relaxed">
                  Developed computer vision for PPE detection (Panasonic) and
                  speech recognition systems for medical rehabilitation (NSTDA).
                </div>
              </div>
              {/* Center Point */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-gray-300/20 z-10"></div>
              {/* Right Empty */}
              <div></div>
            </div>

            {/* Timeline Item 3 - Right */}
            <div className="relative grid grid-cols-2 gap-8 items-center">
              {/* Left Empty */}
              <div></div>
              {/* Center Point */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-400 ring-4 ring-gray-400/20 z-10"></div>
              {/* Right Content */}
              <div className="text-left">
                <div className="text-white/50 text-[clamp(13px,2vw,16px)] mb-1">2019 - 2020</div>
                <div className="text-white font-semibold text-[clamp(18px,3vw,24px)] mb-2">
                  Engineering Intern @ Seagate Technology
                </div>
                <div className="text-white/70 text-[clamp(14px,2.2vw,18px)] leading-relaxed">
                  Built full-stack inventory management system managing 300+
                  warehouse products with React, Node.js, and SQL.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Focus Areas */}
      <div className="mb-12">
        <h2 className="text-white font-semibold text-[clamp(24px,4vw,36px)] mb-8">
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
        <h2 className="text-white font-semibold text-[clamp(24px,4vw,36px)] mb-8">
          Technical Expertise
        </h2>
        <p className="text-white/80 mb-8 text-[clamp(14px,2.5vw,18px)] leading-relaxed">
          A refined selection of my proficiency in modern development tools and
          technologies
        </p>

        <div className="space-y-6">
          {/* Frontend */}
          <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur p-6">
            <h3 className="font-semibold text-[clamp(16px,2.5vw,20px)] mb-4 text-white">
              Frontend
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "React", icon: "⚛️" },
                { name: "Next.js", icon: "▲" },
                { name: "TypeScript", icon: "TS" },
                { name: "JavaScript", icon: "JS" },
                { name: "HTML5", icon: "🌐" },
                { name: "CSS", icon: "🎨" },
                { name: "Tailwind CSS", icon: "💨" },
                { name: "Three.js", icon: "🎲" },
              ].map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-[clamp(12px,2vw,14px)] font-medium hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all"
                >
                  <span className="text-base">{tech.icon}</span>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur p-6">
            <h3 className="font-semibold text-[clamp(16px,2.5vw,20px)] mb-4 text-white">
              Backend
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Node.js", icon: "🟢" },
                { name: "Express.js", icon: "🚂" },
                { name: "Spring Boot", icon: "🍃" },
                { name: "GraphQL", icon: "◈" },
                { name: "Prisma", icon: "🔷" },
              ].map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-[clamp(12px,2vw,14px)] font-medium hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all"
                >
                  <span className="text-base">{tech.icon}</span>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Database */}
          <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur p-6">
            <h3 className="font-semibold text-[clamp(16px,2.5vw,20px)] mb-4 text-white">
              Database
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "MongoDB", icon: "🍃" },
                { name: "PostgreSQL", icon: "🐘" },
                { name: "MySQL", icon: "🐬" },
                { name: "Elasticsearch", icon: "🔍" },
              ].map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-[clamp(12px,2vw,14px)] font-medium hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all"
                >
                  <span className="text-base">{tech.icon}</span>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* DevOps & Cloud */}
          <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur p-6">
            <h3 className="font-semibold text-[clamp(16px,2.5vw,20px)] mb-4 text-white">
              DevOps & Cloud
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Docker", icon: "🐳" },
                { name: "Kubernetes", icon: "☸️" },
                { name: "AWS", icon: "☁️" },
                { name: "GitLab", icon: "🦊" },
                { name: "Terraform", icon: "🏗️" },
                { name: "Cloudflare", icon: "🔶" },
              ].map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-[clamp(12px,2vw,14px)] font-medium hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all"
                >
                  <span className="text-base">{tech.icon}</span>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur p-6">
            <h3 className="font-semibold text-[clamp(16px,2.5vw,20px)] mb-4 text-white">
              Programming Languages
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "TypeScript", icon: "TS" },
                { name: "JavaScript", icon: "JS" },
                { name: "Go", icon: "🐹" },
                { name: "Rust", icon: "🦀" },
                { name: "Redux", icon: "🔄" },
                { name: "React Query", icon: "🔍" },
              ].map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-[clamp(12px,2vw,14px)] font-medium hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all"
                >
                  <span className="text-base">{tech.icon}</span>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-white/50 mt-8 text-center text-[clamp(12px,2vw,14px)] font-medium italic">
          Constantly refining and expanding my technical skillset.
        </p>
      </div>
    </div>
  );
};

export default Exp;