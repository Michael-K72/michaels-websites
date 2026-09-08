"use client";

import { useState } from "react";
import { CONCEPTS } from "@/data/concepts";
import type { ConceptSlug } from "@/types/concept";
import { HomeHero } from "@/components/home/HomeHero";
import { LayerUnfold } from "@/components/home/LayerUnfold";
import { SpatialGallery } from "@/components/home/SpatialGallery";
import { ProjectDetailStory } from "@/components/home/ProjectDetailStory";
import { HomeServices } from "@/components/home/HomeServices";
import "@/components/home/home.css";

export default function HomePage() {
  const [activeSlug, setActiveSlug] = useState<ConceptSlug>(CONCEPTS[0].slug);

  return (
    <div className="home">
      <HomeHero />
      <LayerUnfold />
      <SpatialGallery activeSlug={activeSlug} onActiveChange={setActiveSlug} />
      <ProjectDetailStory activeSlug={activeSlug} />
      <HomeServices />
    </div>
  );
}
