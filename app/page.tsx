import AboutMe from "@/components/contents/AboutMe";
import Contact from "@/components/contents/Contact";
import EducationLazy from "@/components/contents/EducationLazy";
import Exp from "@/components/contents/Experience";
import HeaderCoolWord from "@/components/contents/HeaderCoolWord";
import HeaderWhatImI from "@/components/contents/HeaderWhatImI";
import Grid, { GridItem } from "@/components/layout/Grid";

export default function Home() {
  return (
    <main className="relative">
      {/* Hero */}
      <HeaderCoolWord />

      {/* About Me */}
      <section
        id="about"
        className="relative scroll-mt-24 md:scroll-mt-28 py-20 md:py-28 min-h-screen"
      >
        <div className="w-[95%] md:w-[80%] xl:max-w-screen-2xl mx-auto">
          <AboutMe />
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="scroll-mt-24 md:scroll-mt-28 py-20 md:py-28 bg-white/5 min-h-screen"
      >
        <div className="w-[95%] md:w-[80%] xl:max-w-screen-2xl mx-auto">
          <Exp />
        </div>
      </section>
      {/* Education */}
      <section
        id="education"
        className="scroll-mt-24 md:scroll-mt-28 py-20 md:py-28 min-h-screen"
      >
        <div className="w-[95%] md:w-[80%] xl:max-w-screen-5xl mx-auto">
          <EducationLazy />
        </div>
      </section>
      {/* Vocation */}
      {/* <section
        id="vocation"
        className="scroll-mt-24 md:scroll-mt-28 py-20 md:py-28 bg-white/5 min-h-screen"
      >
        <div className="w-[95%] md:w-[80%] xl:max-w-screen-2xl mx-auto">
          <h2 className="text-white text-2xl md:text-3xl font-semibold mb-8">
            Vocation
          </h2>
          <Grid cols={2} md={3} lg={4} gap="md">
            {[
              "JavaScript/TypeScript",
              "React/Next.js",
              "Node.js",
              "Python",
              "PostgreSQL",
              "TailwindCSS",
              "AI/ML",
              "Cloud & CI/CD",
            ].map((skill) => (
              <GridItem
                key={skill}
                className="rounded-md border border-white/10 px-4 py-3 text-white/80"
              >
                {skill}
              </GridItem>
            ))}
          </Grid>
        </div>
      </section> */}
      {/* Projects */}
      <section
        id="projects"
        className="scroll-mt-24 md:scroll-mt-28 py-20 md:py-28 min-h-screen"
      >
        <div className="w-[95%] md:w-[80%] xl:max-w-screen-2xl mx-auto">
          <h2 className="text-white text-2xl md:text-3xl font-semibold mb-8">
            Projects
          </h2>
          <Grid cols={1} sm={2} md={3} gap="lg">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <GridItem
                key={n}
                className="rounded-xl border border-white/10 p-6"
              >
                <div className="h-32 rounded-md bg-white/5 mb-4" />
                <h3 className="text-white font-semibold mb-1">Project {n}</h3>
                <p className="text-white/70 text-sm">
                  Short description goes here.
                </p>
              </GridItem>
            ))}
          </Grid>
        </div>
      </section>
      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-24 md:scroll-mt-28 py-20 md:py-28 bg-white/5 px-4 lg:px-0"
      >
        <Contact />
      </section>
    </main>
  );
}
