"use client";

import { useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Handle,
  Position,
  MarkerType
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Database, Server, Smartphone, Globe, Layers, Zap } from "lucide-react";
import { motion } from "framer-motion";

// Custom Node Types
const CustomNode = ({ data }: any) => {
  return (
    <div className={`px-4 py-3 shadow-lg rounded-xl border ${data.color} bg-zinc-950 text-white min-w-[180px] relative`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-zinc-500 !border-none" />
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${data.bgColor}`}>
          {data.icon}
        </div>
        <div>
          <div className="font-bold text-sm">{data.label}</div>
          <div className="text-xs text-zinc-400">{data.sublabel}</div>
        </div>
      </div>
      {data.status === 'active' && (
        <span className="absolute top-[-4px] right-[-4px] flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      )}
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-zinc-500 !border-none" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: "client-web",
    type: "custom",
    position: { x: 50, y: 50 },
    data: { 
      label: "Web Clients", 
      sublabel: "React / Next.js", 
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      color: "border-blue-500/50",
      bgColor: "bg-blue-500/10",
      status: "active"
    },
  },
  {
    id: "client-mobile",
    type: "custom",
    position: { x: 300, y: 50 },
    data: { 
      label: "Mobile App", 
      sublabel: "Flutter Client", 
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      color: "border-cyan-500/50",
      bgColor: "bg-cyan-500/10",
      status: "active"
    },
  },
  {
    id: "gateway",
    type: "custom",
    position: { x: 175, y: 200 },
    data: { 
      label: "API Gateway", 
      sublabel: "Nginx / Express", 
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      color: "border-purple-500/50",
      bgColor: "bg-purple-500/10",
      status: "active"
    },
  },
  {
    id: "service-realestate",
    type: "custom",
    position: { x: -50, y: 350 },
    data: { 
      label: "Real Estate API", 
      sublabel: "Node.js Microservice", 
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/50",
      bgColor: "bg-emerald-500/10",
      status: "active"
    },
  },
  {
    id: "service-mikrolink",
    type: "custom",
    position: { x: 175, y: 350 },
    data: { 
      label: "MikroLink Delivery", 
      sublabel: "Socket.io / Node.js", 
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      color: "border-amber-500/50",
      bgColor: "bg-amber-500/10",
      status: "active"
    },
  },
  {
    id: "service-hr",
    type: "custom",
    position: { x: 400, y: 350 },
    data: { 
      label: "HR Management", 
      sublabel: "Internal System", 
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/50",
      bgColor: "bg-emerald-500/10",
      status: "active"
    },
  },
  {
    id: "db-mongo",
    type: "custom",
    position: { x: 175, y: 500 },
    data: { 
      label: "MongoDB Cluster", 
      sublabel: "Mongoose ORM", 
      icon: <Database className="w-5 h-5 text-green-500" />,
      color: "border-green-600/50",
      bgColor: "bg-green-600/10",
      status: "active"
    },
  },
];

const animatedEdge = {
  animated: true,
  style: { stroke: '#10b981', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
};

const initialEdges: Edge[] = [
  { id: "e1", source: "client-web", target: "gateway", ...animatedEdge },
  { id: "e2", source: "client-mobile", target: "gateway", ...animatedEdge },
  { id: "e3", source: "gateway", target: "service-realestate", ...animatedEdge },
  { id: "e4", source: "gateway", target: "service-mikrolink", ...animatedEdge },
  { id: "e5", source: "gateway", target: "service-hr", ...animatedEdge },
  { id: "e6", source: "service-realestate", target: "db-mongo", ...animatedEdge },
  { id: "e7", source: "service-mikrolink", target: "db-mongo", ...animatedEdge, style: { stroke: '#f59e0b', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },
  { id: "e8", source: "service-hr", target: "db-mongo", ...animatedEdge },
];

export default function ArchitectureGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  if (!isMounted) return <div className="h-[600px] bg-zinc-900 border border-zinc-800 rounded-2xl animate-pulse"></div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 h-[600px] flex flex-col shadow-xl"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-500" />
          Live Architecture Map
        </h2>
        <span className="text-xs font-mono text-zinc-400 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-md flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          REALTIME
        </span>
      </div>
      <div className="flex-1 w-full rounded-xl bg-zinc-950 border border-zinc-800/50 overflow-hidden relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-zinc-950"
        >
          <Background color="#3f3f46" gap={20} size={1} />
          <Controls className="!bg-zinc-900 !border-zinc-800 !fill-zinc-400 !shadow-none" />
        </ReactFlow>
      </div>
    </motion.div>
  );
}
