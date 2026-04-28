import { Metadata } from "next";
import DashboardHeader from "./components/DashboardHeader";
import ArchitectureGraph from "./components/ArchitectureGraph";
import MetricsGrid from "./components/MetricsGrid";
import LiveLogsTerminal from "./components/LiveLogsTerminal";
import SystemCards from "./components/SystemCards";

export const metadata: Metadata = {
  title: "Backend Control Center | Yousef Mohamed",
  description: "Live real-time AI/API Monitoring Dashboard for backend systems.",
};

export default function BackendDashboard() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-emerald-500/30 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 relative z-10">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Architecture - takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <ArchitectureGraph />
            <MetricsGrid />
          </div>
          
          {/* Sidebar - takes 1 column on large screens */}
          <div className="space-y-6 flex flex-col">
            <LiveLogsTerminal />
            <SystemCards />
          </div>
        </div>
      </div>
    </div>
  );
}
