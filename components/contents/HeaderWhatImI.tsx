import React from "react";

const HeaderWhatImI: React.FC = () => {
  return (
    <section className="absolute z-10 bottom-0 left-0 pb-12 bg-transparent">
      <div className="rounded-xl border border-white/20 bg-transparent backdrop-blur shadow-lg p-8 max-w-lg w-full text-center">
        <h2 className="text-2xl font-semibold mb-4 text-white/90">Who Am I?</h2>
        <p className="text-white/80 text-base">
          I am a Full‑Stack Developer with strong expertise across front‑end and
          back‑end technologies. I hold a Master’s degree specializing in
          Artificial Intelligence, which empowers me to bring advanced,
          intelligent solutions into projects. As a dedicated team player, I
          value collaboration, trust the process, and focus on achieving goals
          with efficiency and excellence.
        </p>
      </div>
    </section>
  );
};

export default HeaderWhatImI;
