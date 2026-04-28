"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

const LOG_TEMPLATES = [
  { type: "info", msg: "Incoming request from Flutter Client (IP: 192.168.x.x)" },
  { type: "success", msg: "MongoDB query executed successfully in 12ms" },
  { type: "info", msg: "Socket.io: User connected to MikroLink namespace" },
  { type: "warning", msg: "Cache miss for RealEstate API, fetching from DB" },
  { type: "info", msg: "Health check passed for HR Management Service" },
  { type: "success", msg: "Delivery assigned via Socket event" },
  { type: "error", msg: "Rate limit approached for IP 10.0.0.45" },
];

export default function LiveLogsTerminal() {
  const [logs, setLogs] = useState<{ id: number; time: string; type: string; msg: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let idCounter = 0;
    
    // Initial logs
    const initialLogs = Array.from({ length: 5 }).map(() => {
      const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
      return {
        id: idCounter++,
        time: new Date().toLocaleTimeString([], { hour12: false }),
        ...template
      };
    });
    
    setLogs(initialLogs);

    const interval = setInterval(() => {
      const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
      const newLog = {
        id: idCounter++,
        time: new Date().toLocaleTimeString([], { hour12: false }),
        ...template
      };
      
      setLogs((prev) => {
        const next = [...prev, newLog];
        if (next.length > 50) return next.slice(next.length - 50);
        return next;
      });
      
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 1200 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0c0c0c] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[400px]"
    >
      <div className="bg-zinc-900/80 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-sm">
          <Terminal className="w-4 h-4" />
          <span>system.log</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
          <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
          <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
        </div>
      </div>
      
      <div ref={scrollRef} className="p-4 overflow-y-auto font-mono text-xs flex-1 space-y-2 scroll-smooth">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3 leading-relaxed"
            >
              <span className="text-zinc-600 shrink-0">[{log.time}]</span>
              <span className={`font-bold w-10 shrink-0
                ${log.type === 'info' ? 'text-blue-500' : ''}
                ${log.type === 'success' ? 'text-emerald-500' : ''}
                ${log.type === 'warning' ? 'text-amber-500' : ''}
                ${log.type === 'error' ? 'text-red-500' : ''}
              `}>
                {log.type === 'info' && 'INFO'}
                {log.type === 'success' && 'OK'}
                {log.type === 'warning' && 'WARN'}
                {log.type === 'error' && 'ERR'}
              </span>
              <span className="text-zinc-300 break-words">{log.msg}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
