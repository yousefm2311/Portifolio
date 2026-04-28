"use client";

import { motion } from "framer-motion";
import { Database, Truck, Briefcase } from "lucide-react";

const systems = [
  {
    name: "MikroLink Delivery",
    role: "Real-time Socket.io",
    status: "Active",
    icon: <Truck className="w-5 h-5 text-amber-500" />,
    bgClass: "bg-amber-500/10 group-hover:bg-amber-500/20"
  },
  {
    name: "Real Estate API",
    role: "Express REST API",
    status: "Active",
    icon: <Database className="w-5 h-5 text-blue-500" />,
    bgClass: "bg-blue-500/10 group-hover:bg-blue-500/20"
  },
  {
    name: "HR Management",
    role: "Internal Microservice",
    status: "Active",
    icon: <Briefcase className="w-5 h-5 text-emerald-500" />,
    bgClass: "bg-emerald-500/10 group-hover:bg-emerald-500/20"
  }
];

export default function SystemCards() {
  return (
    <div className="space-y-4">
      {systems.map((system, i) => (
        <motion.div
          key={system.name}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between shadow-lg group hover:border-zinc-700 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl transition-colors ${system.bgClass}`}>
              {system.icon}
            </div>
            <div>
              <h4 className="text-white font-semibold">{system.name}</h4>
              <p className="text-zinc-400 text-xs">{system.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 px-2 py-1 rounded text-xs font-medium text-emerald-500 border border-emerald-500/20 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {system.status}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
