"use client";

import { useState } from "react";
import { Search, Bell, ChevronDown, Plus, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function TopBar() {
  const [timeframe, setTimeframe] = useState("Last 24 Hours");
  const [showDropdown, setShowDropdown] = useState(false);

  const timeframes = ["Last 24 Hours", "Last 7 Days", "Last 30 Days"];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800/60"
    >
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-zinc-500">Portfolio</span>
          <span className="text-zinc-600">/</span>
          <span className="text-white font-semibold">Backend Control Center</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 ml-3">
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs text-emerald-400 font-medium">All Systems Operational</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search services..."
            className="bg-[#111] border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 w-44 transition-colors"
          />
        </div>

        {/* Timeframe */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 bg-[#111] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
          >
            {timeframe}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {showDropdown && (
            <div className="absolute top-full mt-1 right-0 bg-[#151515] border border-zinc-800 rounded-lg py-1 z-50 min-w-[160px] shadow-xl">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => { setTimeframe(tf); setShowDropdown(false); }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    tf === timeframe ? "text-white bg-zinc-800/50" : "text-zinc-400 hover:text-white hover:bg-zinc-800/30"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification */}
        <button className="relative p-2 bg-[#111] border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* CTA */}
        <button className="flex items-center gap-2 bg-white/5 border border-zinc-700 rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors">
          <Activity className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Test API</span>
        </button>
      </div>
    </motion.div>
  );
}
