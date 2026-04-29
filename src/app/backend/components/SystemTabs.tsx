"use client";

import { motion } from "framer-motion";

type Props = {
  tabs: { id: string; name: string }[];
  activeTab: string;
  onChange: (id: string) => void;
};

export default function SystemTabs({ tabs, activeTab, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 bg-[#111] border border-zinc-800/80 rounded-xl p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === tab.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTabBg"
              className="absolute inset-0 bg-zinc-800/80 rounded-lg border border-zinc-700/50"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{tab.name}</span>
        </button>
      ))}
    </div>
  );
}
