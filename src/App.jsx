import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SimpleWebsite from "./components/simple/SimpleWebsite";
import ProjectDetailPage from "./components/simple/ProjectDetailPage";
import ResearchIndexPage from "./components/research/ResearchIndexPage";
import NylonPaperPage from "./components/research/NylonPaperPage";
import DataCurationPaperPage from "./components/research/DataCurationPaperPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SimpleWebsite />} />
        {/* Technical Reports */}
        <Route path="/technical-reports" element={<ResearchIndexPage />} />
        <Route path="/technical-reports/nylon-tokenizer" element={<NylonPaperPage />} />
        <Route path="/technical-reports/nylon-data-curation" element={<DataCurationPaperPage />} />

        {/* Projects */}
        <Route path="/projects/nylon" element={<NylonPaperPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="*" element={<SimpleWebsite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
