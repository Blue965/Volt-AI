"use client";

import { motion } from "framer-motion";
import { Sparkles, Code, Zap, Shield, Users, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LandingPage() {
  const { user, signInWithGoogle, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">Volt AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Documentation
              </a>
              {user ? (
                <>
                  <span className="text-sm text-gray-600">Welcome, {user.displayName}</span>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Sign Out
                  </button>
                  <a href="/workspace" className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                    Workspace
                  </a>
                </>
              ) : (
                <>
                  <button
                    onClick={signInWithGoogle}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Sign In with Google
                  </button>
                  <button
                    onClick={signInWithGoogle}
                    className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-700 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by AI for Roblox Creators
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Build Better Games
              <br />
              <span className="text-gray-600">with AI</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              The ultimate AI-powered workspace for Roblox developers. Generate scripts,
              debug code, and create amazing experiences faster than ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/workspace" className="px-8 py-4 text-lg font-medium bg-black text-white rounded-xl hover:bg-gray-800 transition-all hover:scale-105 shadow-lg">
                Start Building Free
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </a>
              <a href="/pricing" className="px-8 py-4 text-lg font-medium bg-white text-gray-900 rounded-xl border border-gray-300 hover:border-gray-400 transition-all hover:scale-105">
                View Pricing
              </a>
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="bg-gradient-to-b from-gray-100 to-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
              <div className="bg-gray-900 px-4 py-3 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="p-8 bg-white">
                <div className="flex gap-4">
                  <div className="w-64 bg-gray-50 rounded-lg border border-gray-200 h-96" />
                  <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 h-96" />
                  <div className="w-80 bg-gray-50 rounded-lg border border-gray-200 h-96" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful AI tools designed specifically for Roblox development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Script Generation",
                description: "Generate clean, optimized Lua scripts for any Roblox system with natural language.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Get instant responses and code suggestions powered by advanced AI models.",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your code and projects are encrypted and never shared with third parties.",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work together with your team in real-time with shared workspaces.",
              },
              {
                icon: Sparkles,
                title: "Smart Debugging",
                description: "AI-powered debugging that identifies and fixes issues automatically.",
              },
              {
                icon: Code,
                title: "Artifact System",
                description: "Preview, edit, and download generated code with our advanced editor.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium text-gray-500 mb-8">TRUSTED BY ROBLOX CREATORS WORLDWIDE</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {["Roblox", "Unity", "Unreal", "Godot", "Cocos"].map((brand) => (
              <div key={brand} className="text-2xl font-bold text-gray-400">{brand}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Join thousands of Roblox creators using Volt AI to build better games.
            </p>
            <a href="/workspace" className="px-8 py-4 text-lg font-medium bg-black text-white rounded-xl hover:bg-gray-800 transition-all hover:scale-105 shadow-lg">
              Get Started for Free
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-semibold">Volt AI</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © 2024 Volt AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
