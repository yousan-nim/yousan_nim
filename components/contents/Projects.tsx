"use client";

import React from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import Grid, { GridItem } from "@/components/layout/Grid";

const Projects = () => {
  const { t } = useI18n();

  return (
    <>
      <h2 className="text-white text-2xl md:text-3xl font-semibold mb-8">
        {t.projects.title}
      </h2>
      <Grid cols={1} sm={2} md={3} gap="lg">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <GridItem key={n} className="rounded-xl border border-white/10 p-6">
            <div className="h-32 rounded-md bg-white/5 mb-4" />
            <h3 className="text-white font-semibold mb-1">
              {t.projects.title} {n}
            </h3>
            <p className="text-white/70 text-sm">{t.projects.placeholder}</p>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default Projects;
