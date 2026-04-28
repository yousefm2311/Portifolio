"use client";

import { motion } from "framer-motion";
import { Activity, Server } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardHeader() {
  const [uptime, setUptime] = useState(99.99);

  useEffect(() => {
    // Fake slight fluctuations in uptime
    const interval = setInterval(() => {
      setUptime((prev) => (Math.random() > 0.8 ? 99.98 : 99.99));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <Server className="w-8 h-8 text-emerald-500" />
          Backend Control Center
        </h1>
        <p className="text-zinc-400 mt-1">Live monitoring and system architecture overview.</p>
      </div>

      <div className="flex items-center gap-4 text-sm font-medium">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 flex items-center gap-3 shadow-lg">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="text-emerald-500">All Systems Operational</span>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
          <Activity className="w-4 h-4 text-zinc-400" />
          <span className="text-zinc-200">{uptime}% Uptime</span>
        </div>
      </div>
    </div>
  );
}
