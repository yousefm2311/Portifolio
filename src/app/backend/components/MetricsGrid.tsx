"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const generateData = (count: number, min: number, max: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    time: i,
    value: Math.floor(Math.random() * (max - min + 1) + min),
  }));
};

export default function MetricsGrid() {
  const [requests, setRequests] = useState(generateData(20, 100, 300));
  const [latency, setLatency] = useState(generateData(20, 20, 80));

  useEffect(() => {
    const interval = setInterval(() => {
      setRequests((prev) => [
        ...prev.slice(1),
        { time: prev[prev.length - 1].time + 1, value: Math.floor(Math.random() * 200 + 150) },
      ]);
      setLatency((prev) => [
        ...prev.slice(1),
        { time: prev[prev.length - 1].time + 1, value: Math.floor(Math.random() * 60 + 30) },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Requests */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl"
      >
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-zinc-400 text-sm font-medium">API Requests</h3>
            <div className="text-2xl font-bold text-white mt-1">
              {requests[requests.length - 1].value} <span className="text-sm text-zinc-500 font-normal">req/s</span>
            </div>
          </div>
          <span className="text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded">Normal</span>
        </div>
        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={requests}>
              <defs>
                <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorReq)" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Latency */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl"
      >
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-zinc-400 text-sm font-medium">Global Latency</h3>
            <div className="text-2xl font-bold text-white mt-1">
              {latency[latency.length - 1].value} <span className="text-sm text-zinc-500 font-normal">ms</span>
            </div>
          </div>
          <span className="text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded">Optimal</span>
        </div>
        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={latency}>
              <defs>
                <linearGradient id="colorLat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorLat)" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
