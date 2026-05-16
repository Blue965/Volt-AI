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
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <TopNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="border-r border-white/20 bg-white/70 backdrop-blur-xl"
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
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="border-l border-white/20 bg-white/80 backdrop-blur-xl"
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
