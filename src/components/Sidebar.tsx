"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Plus,
  Folder,
  Search,
  Clock,
  Star,
  Trash2,
} from "lucide-react";

export default function Sidebar() {
  const [chats] = useState([
    { id: 1, title: "Roblox Script Generator", date: "Today" },
    { id: 2, title: "UI System Design", date: "Yesterday" },
    { id: 3, title: "Gameplay Mechanics", date: "2 days ago" },
  ]);

  return (
    <div className="w-72 h-full flex flex-col bg-gray-50">
      <div className="p-4">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
          <Plus className="w-5 h-5" />
          <span className="font-medium">New Chat</span>
        </button>
      </div>

      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        <div className="mb-4">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Recent
            </span>
          </div>
          {chats.map((chat) => (
            <motion.button
              key={chat.id}
              whileHover={{ x: 4 }}
              className="w-full flex items-start space-x-3 px-3 py-3 rounded-lg hover:bg-gray-200 transition-colors text-left mb-1"
            >
              <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {chat.title}
                </p>
                <p className="text-xs text-gray-500">{chat.date}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Projects
            </span>
            <Plus className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
          <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-200 transition-colors text-left mb-1">
            <Folder className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">My Project</span>
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Favorites
          </span>
          </div>
          <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-200 transition-colors text-left mb-1">
            <Star className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">Script Templates</span>
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Chat History</span>
        </div>
        <button className="w-full flex items-center space-x-2 px-3 py-2 mt-2 rounded-lg hover:bg-gray-200 transition-colors text-left">
          <Trash2 className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Clear History</span>
        </button>
      </div>
    </div>
  );
}
