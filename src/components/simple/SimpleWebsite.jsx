import React from "react";
import { useNavigate } from "react-router-dom";
import SimpleHeader from "./SimpleHeader";
import SimpleHero from "./SimpleHero";
import SimpleProjects from "./SimpleProjects";
import SkillsCapabilities from "./SkillsCapabilities";
import SimpleAbout from "./SimpleAbout";
import SimpleContact from "./SimpleContact";
import SimpleFooter from "./SimpleFooter";
import SEO from "../common/SEO";

const SimpleWebsite = () => {
  const navigate = useNavigate();

  const handleProjectSelect = (project) => {
    if (project.id === "nylon" || project.paperUrl || project.reportUrl) {
      navigate("/technical-reports/nylon-tokenizer");
      return;
    }
    navigate(`/projects/${project.id}`);
  };

  return (
    <div
      className="min-h-screen w-full bg-white text-black"
      style={{ fontFamily: "'Geom', sans-serif" }}
    >
      <SEO
        title="Abdulwarith | Software Engineer"
        description="Software engineer focused on AI systems, backend infrastructure, and cross-platform mobile products."
      />
      <SimpleHeader />
      <main>
        <SimpleHero />
        <SimpleProjects onProjectSelect={handleProjectSelect} />
        <SkillsCapabilities onProjectSelect={handleProjectSelect} />
        <SimpleAbout />
        <SimpleContact />
      </main>
      <SimpleFooter />
    </div>
  );
};

export default SimpleWebsite;
