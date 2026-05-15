"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import ArtifactPanel from "./ArtifactPanel";
import TopNav from "./TopNav";

export default function Workspace() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [artifactOpen, setArtifactOpen] = useState(false);
  const [artifactContent, setArtifactContent] = useState<{
    code: string;
    language: string;
    title: string;
  } | null>(null);

  const handleArtifactGenerate = (code: string, language: string, title: string) => {
    setArtifactContent({ code, language, title });
    setArtifactOpen(true);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <TopNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="border-r border-gray-200 bg-gray-50"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 flex">
          <ChatArea onArtifactGenerate={handleArtifactGenerate} />
          
          <AnimatePresence mode="wait">
            {artifactOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 500, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="border-l border-gray-200 bg-white"
              >
                {artifactContent && (
                  <ArtifactPanel
                    code={artifactContent.code}
                    language={artifactContent.language}
                    title={artifactContent.title}
                    onClose={() => setArtifactOpen(false)}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
