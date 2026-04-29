import { Globe, Smartphone, Layers, Server, Database, Zap, Shield, Bell, MessageSquare, Briefcase, Building, Users, FileText, BarChart3 } from "lucide-react";

export type SystemNode = {
  id: string;
  label: string;
  sublabel: string;
  iconName: string;
  color: string;
  bgColor: string;
  status: "healthy" | "warning" | "down";
  metric: string;
  position: { x: number; y: number };
  description?: string;
  endpoints?: string[];
  dependencies?: string[];
  avgLatency?: string;
  requestVolume?: string;
};

export type SystemEdge = {
  id: string;
  source: string;
  target: string;
  label?: string;
  color?: string;
};

export type PipelineSection = {
  title: string;
  items: { label: string; value: string; badge?: string; badgeColor?: string }[];
};

export type SystemData = {
  id: string;
  name: string;
  description: string;
  nodes: SystemNode[];
  edges: SystemEdge[];
  metrics: { label: string; value: string; change: string; changeType: "up" | "down" | "neutral"; color: string }[];
  pipeline: PipelineSection[];
};

export const systemsData: SystemData[] = [
  {
    id: "mikrolink",
    name: "MikroLink System",
    description: "Real-time delivery & logistics backend",
    nodes: [
      { id: "flutter", label: "Flutter App", sublabel: "Mobile Client", iconName: "Smartphone", color: "border-cyan-500/50", bgColor: "bg-cyan-500/10", status: "healthy", metric: "2.4k users", position: { x: 250, y: 0 }, description: "Flutter mobile client for drivers and customers", endpoints: ["/auth", "/trips", "/tracking"], dependencies: ["gateway"], avgLatency: "120ms", requestVolume: "14k/day" },
      { id: "gateway", label: "API Gateway", sublabel: "Nginx / Express", iconName: "Layers", color: "border-purple-500/50", bgColor: "bg-purple-500/10", status: "healthy", metric: "14k req/day", position: { x: 250, y: 120 }, description: "Central API gateway handling routing and load balancing", endpoints: ["/api/v1/*"], dependencies: ["auth", "trips", "drivers", "socket", "notifications"], avgLatency: "12ms", requestVolume: "14k/day" },
      { id: "auth", label: "JWT Auth Service", sublabel: "Authentication", iconName: "Shield", color: "border-yellow-500/50", bgColor: "bg-yellow-500/10", status: "healthy", metric: "45ms avg", position: { x: 0, y: 250 }, description: "JWT-based authentication and authorization service", endpoints: ["/login", "/register", "/refresh", "/verify"], dependencies: ["mongodb"], avgLatency: "45ms", requestVolume: "3.2k/day" },
      { id: "trips", label: "Trips Service", sublabel: "Core Logic", iconName: "Zap", color: "border-amber-500/50", bgColor: "bg-amber-500/10", status: "healthy", metric: "890 active", position: { x: 200, y: 250 }, description: "Manages trip lifecycle: creation, assignment, tracking, completion", endpoints: ["/trips/start", "/trips/complete", "/trips/assign"], dependencies: ["mongodb", "socket"], avgLatency: "88ms", requestVolume: "5.6k/day" },
      { id: "drivers", label: "Driver Service", sublabel: "Fleet Mgmt", iconName: "Users", color: "border-blue-500/50", bgColor: "bg-blue-500/10", status: "healthy", metric: "120 online", position: { x: 400, y: 250 }, description: "Driver management, availability tracking, and assignment", endpoints: ["/drivers/status", "/drivers/location", "/drivers/assign"], dependencies: ["mongodb"], avgLatency: "22ms", requestVolume: "8.1k/day" },
      { id: "socket", label: "Socket.io Server", sublabel: "Realtime", iconName: "Zap", color: "border-green-500/50", bgColor: "bg-green-500/10", status: "healthy", metric: "340 conn", position: { x: 500, y: 120 }, description: "Real-time WebSocket server for live tracking and chat", endpoints: ["trip_update", "driver_location", "chat_message"], dependencies: [], avgLatency: "12ms", requestVolume: "45k events/day" },
      { id: "notifications", label: "Notification Engine", sublabel: "Push / SMS", iconName: "Bell", color: "border-rose-500/50", bgColor: "bg-rose-500/10", status: "warning", metric: "1.2k/day", position: { x: 0, y: 120 }, description: "Push notifications and SMS delivery engine", endpoints: ["/notify/push", "/notify/sms"], dependencies: ["mongodb"], avgLatency: "200ms", requestVolume: "1.2k/day" },
      { id: "mongodb", label: "MongoDB Atlas", sublabel: "Primary DB", iconName: "Database", color: "border-green-600/50", bgColor: "bg-green-600/10", status: "healthy", metric: "22ms avg", position: { x: 250, y: 380 }, description: "MongoDB Atlas cluster with replica set for data persistence", endpoints: ["users", "trips", "drivers", "notifications"], dependencies: [], avgLatency: "22ms", requestVolume: "32k queries/day" },
    ],
    edges: [
      { id: "e1", source: "flutter", target: "gateway", label: "HTTPS" },
      { id: "e2", source: "gateway", target: "auth", label: "verify" },
      { id: "e3", source: "gateway", target: "trips", label: "REST" },
      { id: "e4", source: "gateway", target: "drivers", label: "REST" },
      { id: "e5", source: "flutter", target: "socket", label: "WS", color: "#22c55e" },
      { id: "e6", source: "trips", target: "mongodb" },
      { id: "e7", source: "drivers", target: "mongodb" },
      { id: "e8", source: "auth", target: "mongodb" },
      { id: "e9", source: "notifications", target: "gateway", label: "events" },
      { id: "e10", source: "trips", target: "socket", label: "emit", color: "#22c55e" },
    ],
    metrics: [
      { label: "APIs Served", value: "1.2M+", change: "+15%", changeType: "up", color: "blue" },
      { label: "Avg Response Time", value: "82ms", change: "-8%", changeType: "down", color: "purple" },
      { label: "Active Services", value: "8", change: "stable", changeType: "neutral", color: "green" },
      { label: "Realtime Connections", value: "340", change: "+22%", changeType: "up", color: "amber" },
    ],
    pipeline: [
      { title: "INGRESS", items: [{ label: "Endpoint", value: "/api/v1" }, { label: "Method", value: "POST / GET" }, { label: "Auth", value: "Bearer Token", badge: "Strict", badgeColor: "green" }, { label: "Rate Limit", value: "100 req/min per IP" }] },
      { title: "PRE-PROCESSING", items: [{ label: "Input Validation", value: "Zod Schema" }, { label: "JWT Decode", value: "RS256" }, { label: "Role Check", value: "RBAC", badge: "Active", badgeColor: "green" }, { label: "Sanitization", value: "XSS + SQL Injection" }] },
      { title: "ROUTING", items: [{ label: "/trips/*", value: "→ TripService" }, { label: "/drivers/*", value: "→ DriverService" }, { label: "WS events", value: "→ Socket Server" }, { label: "/notify/*", value: "→ Notification Engine" }] },
      { title: "SECURITY", items: [{ label: "JWT Guard", value: "Middleware", badge: "Active", badgeColor: "green" }, { label: "Role Middleware", value: "admin / driver / user" }, { label: "IP Throttling", value: "100/min", badge: "Enforced", badgeColor: "yellow" }, { label: "Suspicious Activity", value: "Auto-block after 5 fails", badge: "Monitor", badgeColor: "blue" }] },
      { title: "DATA LAYER", items: [{ label: "MongoDB Cluster", value: "Atlas M10", badge: "Healthy", badgeColor: "green" }, { label: "Collections", value: "users, trips, drivers, logs" }, { label: "Query Avg", value: "22ms" }, { label: "Replica", value: "3-node replica set", badge: "Synced", badgeColor: "green" }] },
    ],
  },
  {
    id: "realestate",
    name: "Real Estate Backend",
    description: "Property management & listing platform",
    nodes: [
      { id: "web", label: "Web Client", sublabel: "React / Next.js", iconName: "Globe", color: "border-blue-500/50", bgColor: "bg-blue-500/10", status: "healthy", metric: "3.1k visits", position: { x: 100, y: 0 }, description: "Web frontend for property browsing and management", endpoints: ["/properties", "/search", "/admin"], dependencies: ["gateway"], avgLatency: "95ms", requestVolume: "8k/day" },
      { id: "mobile", label: "Flutter App", sublabel: "Mobile Client", iconName: "Smartphone", color: "border-cyan-500/50", bgColor: "bg-cyan-500/10", status: "healthy", metric: "1.8k users", position: { x: 400, y: 0 }, description: "Flutter mobile app for property search and viewing", endpoints: ["/auth", "/properties", "/favorites"], dependencies: ["gateway"], avgLatency: "110ms", requestVolume: "6k/day" },
      { id: "gateway", label: "API Gateway", sublabel: "Express.js", iconName: "Layers", color: "border-purple-500/50", bgColor: "bg-purple-500/10", status: "healthy", metric: "14k req/day", position: { x: 250, y: 120 }, description: "Express.js API gateway with rate limiting", endpoints: ["/api/v1/*"], dependencies: ["auth", "properties", "uploads", "admin"], avgLatency: "15ms", requestVolume: "14k/day" },
      { id: "auth", label: "Auth Service", sublabel: "JWT + Roles", iconName: "Shield", color: "border-yellow-500/50", bgColor: "bg-yellow-500/10", status: "healthy", metric: "38ms avg", position: { x: 50, y: 250 }, description: "Authentication with multi-role support (admin, agent, user)", endpoints: ["/login", "/register", "/roles"], dependencies: ["mongodb"], avgLatency: "38ms", requestVolume: "2.8k/day" },
      { id: "properties", label: "Property API", sublabel: "CRUD + Search", iconName: "Building", color: "border-emerald-500/50", bgColor: "bg-emerald-500/10", status: "healthy", metric: "4.2k listings", position: { x: 250, y: 250 }, description: "Property CRUD operations with advanced search and filtering", endpoints: ["/properties", "/search", "/branches"], dependencies: ["mongodb"], avgLatency: "65ms", requestVolume: "9.3k/day" },
      { id: "uploads", label: "Media Uploads", sublabel: "Cloudinary", iconName: "FileText", color: "border-orange-500/50", bgColor: "bg-orange-500/10", status: "healthy", metric: "2.1k files", position: { x: 450, y: 250 }, description: "Image and media upload service via Cloudinary", endpoints: ["/upload", "/media"], dependencies: [], avgLatency: "350ms", requestVolume: "800/day" },
      { id: "mongodb", label: "MongoDB Atlas", sublabel: "Primary DB", iconName: "Database", color: "border-green-600/50", bgColor: "bg-green-600/10", status: "healthy", metric: "18ms avg", position: { x: 250, y: 380 }, description: "MongoDB Atlas for property and user data", endpoints: ["properties", "users", "branches"], dependencies: [], avgLatency: "18ms", requestVolume: "28k queries/day" },
    ],
    edges: [
      { id: "e1", source: "web", target: "gateway", label: "HTTPS" },
      { id: "e2", source: "mobile", target: "gateway", label: "HTTPS" },
      { id: "e3", source: "gateway", target: "auth" },
      { id: "e4", source: "gateway", target: "properties" },
      { id: "e5", source: "gateway", target: "uploads" },
      { id: "e6", source: "auth", target: "mongodb" },
      { id: "e7", source: "properties", target: "mongodb" },
    ],
    metrics: [
      { label: "Total Listings", value: "4,200+", change: "+120", changeType: "up", color: "blue" },
      { label: "Avg Query Time", value: "18ms", change: "-12%", changeType: "down", color: "green" },
      { label: "Active Users", value: "1,840", change: "+8%", changeType: "up", color: "purple" },
      { label: "Media Uploads", value: "2.1k", change: "+45/day", changeType: "up", color: "orange" },
    ],
    pipeline: [
      { title: "INGRESS", items: [{ label: "Endpoint", value: "/api/v1" }, { label: "Method", value: "GET / POST / PATCH" }, { label: "Auth", value: "Bearer JWT", badge: "Required", badgeColor: "green" }, { label: "Rate Limit", value: "200 req/min" }] },
      { title: "PRE-PROCESSING", items: [{ label: "Validation", value: "Zod Schemas" }, { label: "Image Resize", value: "Auto-optimize on upload" }, { label: "Role Check", value: "admin / agent / user", badge: "RBAC", badgeColor: "blue" }] },
      { title: "ROUTING", items: [{ label: "/properties/*", value: "→ PropertyService" }, { label: "/auth/*", value: "→ AuthService" }, { label: "/upload/*", value: "→ MediaService" }, { label: "/admin/*", value: "→ AdminPanel" }] },
      { title: "DATA LAYER", items: [{ label: "MongoDB Cluster", value: "Atlas M10", badge: "Healthy", badgeColor: "green" }, { label: "Collections", value: "properties, users, branches" }, { label: "Indexes", value: "geo2d, text search" }, { label: "Query Avg", value: "18ms" }] },
    ],
  },
  {
    id: "hr",
    name: "HR Management Backend",
    description: "Internal HR & recruitment system",
    nodes: [
      { id: "admin", label: "Admin Panel", sublabel: "React Dashboard", iconName: "Globe", color: "border-blue-500/50", bgColor: "bg-blue-500/10", status: "healthy", metric: "45 admins", position: { x: 250, y: 0 }, description: "Internal admin dashboard for HR management", endpoints: ["/dashboard", "/reports", "/employees"], dependencies: ["gateway"], avgLatency: "85ms", requestVolume: "3.2k/day" },
      { id: "gateway", label: "API Gateway", sublabel: "Express.js", iconName: "Layers", color: "border-purple-500/50", bgColor: "bg-purple-500/10", status: "healthy", metric: "6.8k req/day", position: { x: 250, y: 120 }, description: "Express.js API with role-based access control", endpoints: ["/api/v1/*"], dependencies: ["auth", "applications", "reports", "exports"], avgLatency: "10ms", requestVolume: "6.8k/day" },
      { id: "auth", label: "Auth + RBAC", sublabel: "JWT + Permissions", iconName: "Shield", color: "border-yellow-500/50", bgColor: "bg-yellow-500/10", status: "healthy", metric: "32ms avg", position: { x: 50, y: 250 }, description: "Role-based authentication for HR admin, manager, employee", endpoints: ["/login", "/permissions", "/roles"], dependencies: ["mongodb"], avgLatency: "32ms", requestVolume: "1.5k/day" },
      { id: "applications", label: "Job Applications", sublabel: "Recruitment", iconName: "Briefcase", color: "border-emerald-500/50", bgColor: "bg-emerald-500/10", status: "healthy", metric: "280 pending", position: { x: 250, y: 250 }, description: "Job application tracking and recruitment workflow", endpoints: ["/applications", "/interviews", "/offers"], dependencies: ["mongodb"], avgLatency: "55ms", requestVolume: "2.1k/day" },
      { id: "reports", label: "Reports Engine", sublabel: "Analytics", iconName: "BarChart3", color: "border-indigo-500/50", bgColor: "bg-indigo-500/10", status: "healthy", metric: "12 reports", position: { x: 450, y: 250 }, description: "Report generation for attendance, performance, payroll", endpoints: ["/reports/generate", "/reports/export"], dependencies: ["mongodb"], avgLatency: "420ms", requestVolume: "200/day" },
      { id: "mongodb", label: "MongoDB Atlas", sublabel: "Primary DB", iconName: "Database", color: "border-green-600/50", bgColor: "bg-green-600/10", status: "healthy", metric: "15ms avg", position: { x: 250, y: 380 }, description: "MongoDB cluster for employee and application data", endpoints: ["employees", "applications", "attendance", "payroll"], dependencies: [], avgLatency: "15ms", requestVolume: "18k queries/day" },
    ],
    edges: [
      { id: "e1", source: "admin", target: "gateway", label: "HTTPS" },
      { id: "e2", source: "gateway", target: "auth" },
      { id: "e3", source: "gateway", target: "applications" },
      { id: "e4", source: "gateway", target: "reports" },
      { id: "e5", source: "auth", target: "mongodb" },
      { id: "e6", source: "applications", target: "mongodb" },
      { id: "e7", source: "reports", target: "mongodb" },
    ],
    metrics: [
      { label: "Total Employees", value: "450+", change: "+12", changeType: "up", color: "blue" },
      { label: "Pending Applications", value: "280", change: "+35", changeType: "up", color: "amber" },
      { label: "Reports Generated", value: "1.2k", change: "+8%", changeType: "up", color: "purple" },
      { label: "System Uptime", value: "99.98%", change: "stable", changeType: "neutral", color: "green" },
    ],
    pipeline: [
      { title: "INGRESS", items: [{ label: "Endpoint", value: "/api/v1" }, { label: "Method", value: "GET / POST / PATCH / DELETE" }, { label: "Auth", value: "JWT + Permissions", badge: "Strict", badgeColor: "green" }, { label: "Rate Limit", value: "50 req/min" }] },
      { title: "PRE-PROCESSING", items: [{ label: "Permission Check", value: "Granular RBAC" }, { label: "Input Sanitization", value: "XSS prevention" }, { label: "Audit Log", value: "All mutations logged", badge: "Active", badgeColor: "blue" }] },
      { title: "ROUTING", items: [{ label: "/employees/*", value: "→ EmployeeService" }, { label: "/applications/*", value: "→ RecruitmentService" }, { label: "/reports/*", value: "→ ReportsEngine" }, { label: "/admin/*", value: "→ AdminService" }] },
      { title: "DATA LAYER", items: [{ label: "MongoDB Cluster", value: "Atlas M10", badge: "Healthy", badgeColor: "green" }, { label: "Collections", value: "employees, applications, attendance" }, { label: "Query Avg", value: "15ms" }, { label: "Backups", value: "Daily automated", badge: "Active", badgeColor: "green" }] },
    ],
  },
];

export const logTemplates = [
  { time: "10:42 AM", service: "Auth Service", event: "POST /api/login", status: 200, latency: "45ms", action: "SUCCESS" as const },
  { time: "10:41 AM", service: "MikroLink API", event: "POST /api/trips/start", status: 201, latency: "88ms", action: "SUCCESS" as const },
  { time: "10:40 AM", service: "Socket Server", event: "EMIT trip_update", status: null, latency: "12ms", action: "REALTIME" as const },
  { time: "10:39 AM", service: "MongoDB", event: "QUERY users collection", status: null, latency: "31ms", action: "DB" as const },
  { time: "10:38 AM", service: "API Gateway", event: "GET /api/driver/profile", status: 404, latency: "120ms", action: "ERROR" as const },
  { time: "10:37 AM", service: "Security Layer", event: "IP blocked", status: 429, latency: "—", action: "BLOCKED" as const },
  { time: "10:36 AM", service: "Property API", event: "GET /api/properties", status: 200, latency: "65ms", action: "SUCCESS" as const },
  { time: "10:35 AM", service: "HR Service", event: "POST /api/applications", status: 201, latency: "55ms", action: "SUCCESS" as const },
  { time: "10:34 AM", service: "Auth Service", event: "POST /api/register", status: 201, latency: "92ms", action: "SUCCESS" as const },
  { time: "10:33 AM", service: "Socket Server", event: "EMIT driver_location", status: null, latency: "8ms", action: "REALTIME" as const },
  { time: "10:32 AM", service: "MongoDB", event: "INDEX rebuild trips", status: null, latency: "340ms", action: "DB" as const },
  { time: "10:31 AM", service: "Notification Engine", event: "PUSH trip_assigned", status: 200, latency: "200ms", action: "SUCCESS" as const },
  { time: "10:30 AM", service: "API Gateway", event: "GET /api/v1/health", status: 200, latency: "5ms", action: "SUCCESS" as const },
  { time: "10:29 AM", service: "Security Layer", event: "JWT expired", status: 401, latency: "—", action: "BLOCKED" as const },
  { time: "10:28 AM", service: "Reports Engine", event: "GET /api/reports/export", status: 200, latency: "420ms", action: "SUCCESS" as const },
];
