export type NetworkNodeId =
  | "data"
  | "models"
  | "automation"
  | "security"
  | "analytics";

export type NetworkNode = {
  id: NetworkNodeId;
  label: string;
  short: string;
  detail: string;
};

export type Feature = {
  id: string;
  index: string;
  title: string;
  body: string;
  nodeId: NetworkNodeId;
  metric: string;
  metricLabel: string;
};

export type PricingTier = {
  id: string;
  name: string;
  blurb: string;
  monthly: number | null;
  annual: number | null;
  seats: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type DashboardMetric = {
  id: string;
  label: string;
  value: string;
  delta: string;
  positive: boolean;
};

export const NOVA = {
  brand: "NOVA",
  label: "04 / 05 Technology style concept",
  industry: "Technology / AI",
  tagline: "Operational intelligence for teams that ship.",
  heroHeadline: "SYSTEMS THAT\nTHINK WITH YOU",
  heroSupport:
    "Nova connects data, models, and automation into one control surface—so decisions leave the boardroom and enter the pipeline.",
  accent: "#5ED0E8",
  demoEmail: "demo@nova.systems",
} as const;

export const networkNodes: NetworkNode[] = [
  {
    id: "data",
    label: "DATA",
    short: "Ingest & schema",
    detail: "Stream connectors, typed pipelines, and retention policies that keep source truth intact.",
  },
  {
    id: "models",
    label: "MODELS",
    short: "Inference layer",
    detail: "Versioned endpoints with eval gates—promote only what beats the baseline.",
  },
  {
    id: "automation",
    label: "AUTOMATION",
    short: "Workflow runtime",
    detail: "Event-driven jobs with retries, human checkpoints, and audit trails.",
  },
  {
    id: "security",
    label: "SECURITY",
    short: "Access & isolation",
    detail: "Tenant isolation, key rotation, and policy checks on every tool call.",
  },
  {
    id: "analytics",
    label: "ANALYTICS",
    short: "Telemetry",
    detail: "Latency, cost, and outcome metrics wired to the same graph that runs production.",
  },
];

/** Undirected edges between related nodes */
export const networkEdges: [NetworkNodeId, NetworkNodeId][] = [
  ["data", "models"],
  ["data", "analytics"],
  ["models", "automation"],
  ["models", "analytics"],
  ["automation", "security"],
  ["security", "data"],
  ["analytics", "automation"],
];

export const features: Feature[] = [
  {
    id: "pipeline",
    index: "01",
    title: "Typed data pipelines",
    body: "Define schemas once. Nova validates every event before it reaches a model or a downstream job—no silent drift.",
    nodeId: "data",
    metric: "12 ms",
    metricLabel: "p50 ingest lag",
  },
  {
    id: "eval",
    index: "02",
    title: "Model promotion gates",
    body: "Shadow traffic and scored evals decide when a candidate replaces production. Rollbacks are one revision away.",
    nodeId: "models",
    metric: "98.4%",
    metricLabel: "eval pass rate",
  },
  {
    id: "runtime",
    index: "03",
    title: "Deterministic automation",
    body: "Workflows are code-reviewed graphs: idempotent steps, explicit side effects, and pause points for review.",
    nodeId: "automation",
    metric: "4.2k",
    metricLabel: "jobs / hour",
  },
  {
    id: "policy",
    index: "04",
    title: "Policy at the edge",
    body: "Every tool invocation checks tenant scope, data class, and retention before execution continues.",
    nodeId: "security",
    metric: "0",
    metricLabel: "cross-tenant leaks",
  },
  {
    id: "observe",
    index: "05",
    title: "Outcome analytics",
    body: "Trace cost and quality to the same nodes that power the product—not a separate BI warehouse weeks later.",
    nodeId: "analytics",
    metric: "$0.018",
    metricLabel: "avg run cost",
  },
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: "latency",
    label: "Inference p95",
    value: "142 ms",
    delta: "−18 ms",
    positive: true,
  },
  {
    id: "throughput",
    label: "Events / min",
    value: "38.4k",
    delta: "+6.2%",
    positive: true,
  },
  {
    id: "accuracy",
    label: "Task accuracy",
    value: "94.7%",
    delta: "+1.1%",
    positive: true,
  },
  {
    id: "spend",
    label: "Model spend",
    value: "$412",
    delta: "−8%",
    positive: true,
  },
];

/** Weekly throughput for bar chart (Mon–Sun) */
export const throughputBars = [62, 78, 71, 88, 94, 81, 69];

/** 24-point latency series for sparkline / line chart */
export const latencySeries = [
  168, 162, 155, 149, 158, 151, 146, 142, 148, 139, 136, 141, 138, 134, 140, 133,
  131, 137, 129, 132, 128, 135, 130, 126,
];

export const pricingTiers: PricingTier[] = [
  {
    id: "core",
    name: "Core",
    blurb: "For product teams validating their first production graph.",
    monthly: 89,
    annual: 79,
    seats: "Up to 5 seats",
    features: [
      "3 environments",
      "50M events / month",
      "Shared inference pool",
      "Standard SSO",
      "7-day metric retention",
    ],
    cta: "Start Core",
  },
  {
    id: "pro",
    name: "Pro",
    blurb: "For orgs running models in the critical path.",
    monthly: 249,
    annual: 219,
    seats: "Up to 25 seats",
    features: [
      "Unlimited environments",
      "500M events / month",
      "Dedicated throughput caps",
      "SAML + SCIM",
      "90-day retention + exports",
      "Priority eval runners",
    ],
    cta: "Start Pro",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    blurb: "VPC, custom SLAs, and policy packs for regulated stacks.",
    monthly: null,
    annual: null,
    seats: "Custom seats",
    features: [
      "Private networking",
      "Bring-your-own keys",
      "Custom retention & residency",
      "Dedicated success engineer",
      "On-call escalation path",
      "Contracted uptime",
    ],
    cta: "Talk to us",
  },
];

export const enterprisePoints = [
  {
    title: "Deploy where data already lives",
    body: "Private link or customer VPC. No public egress required for inference or storage.",
  },
  {
    title: "Contracts that match your risk",
    body: "DPA, subprocessors, and region locks documented before the first production write.",
  },
  {
    title: "Operators, not just a dashboard",
    body: "Named engineers who know your graph topology—not a shared ticket queue.",
  },
];

export const faqs: FaqItem[] = [
  {
    q: "Does Nova replace our existing warehouse?",
    a: "No. Nova sits on the operational path—ingest, inference, and automation—while exporting metrics and events to the warehouse you already trust.",
  },
  {
    q: "Can we run our own model weights?",
    a: "Yes on Pro and Enterprise. Register an endpoint, attach eval suites, and promote behind the same gates used for hosted models.",
  },
  {
    q: "How is tenant isolation enforced?",
    a: "Every request carries a signed tenant context. Storage partitions, queue namespaces, and tool scopes are checked before side effects execute.",
  },
  {
    q: "What does annual billing include?",
    a: "Two months equivalent discount, locked seat counts for the term, and access to scheduled platform upgrades without migration downtime windows.",
  },
  {
    q: "Is this a real product?",
    a: "Nova is a style concept for Michael Kalachin’s portfolio—designed to show how a technology brand can feel precise, interactive, and credible.",
  },
];

export const demoBullets = [
  "Walk a live graph from ingest to automation",
  "Inspect eval gates and rollback flows",
  "Map pricing to your event volume",
];
