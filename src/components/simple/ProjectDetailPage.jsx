import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectsData from "../../data/projects.json";
import ProjectDetail from "./ProjectDetail";
import SEO from "../common/SEO";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
        <SEO title="Project Not Found | Abdulwarith" />
        <h2 className="text-2xl font-bold text-black">Project Not Found</h2>
        <p className="text-sm text-gray-500">
          The project you are looking for does not exist or has been relocated.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all"
        >
          ← Back to Homepage
        </button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${project.title} | Case Study`}
        description={
          project.shortDescription ||
          `Case study of ${project.title} by Abdulwarith.`
        }
      />
      <ProjectDetail project={project} onClose={() => navigate("/")} />
    </>
  );
};

export default ProjectDetailPage;
