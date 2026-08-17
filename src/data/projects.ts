export interface ProjectCard {
  title: string;
  description: string;
  tech: string[];
  metric: string;
}

export const projects: ProjectCard[] = [
  {
    title: "Sustain ERP",
    description:
      "Multi-service ERP platform managing client-to-invoice lifecycle, risk approvals, and financials for a global consulting firm. Built with DDD architecture.",
    tech: ["FastAPI", "Protean", "Celery", "Redis", "Azure"],
    metric: "4 microservices · ~2.5k daily requests",
  },
  {
    title: "DIWE",
    description:
      "Rules-driven approval matrix engine computing required gate approvers, delegations, and permissions from region, currency, and risk profiles.",
    tech: ["FastAPI", "Azure SQL", "Redis"],
    metric: "~2.5k requests/day",
  },
  {
    title: "Notification Engine",
    description:
      "Event-driven multi-channel notification service handling email and in-app notifications across distributed systems.",
    tech: ["Azure Event Hub", "CosmosDB", "Python"],
    metric: "~20k notifications/month",
  },
  {
    title: "Symbiosys",
    description:
      "Campaign management platform for advertising across five ad networks with BigQuery analytics over 50M+ rows.",
    tech: ["FastAPI", "BigQuery", "MySQL", "GCP"],
    metric: "50M+ rows · 5 ad networks",
  },
  {
    title: "Evopay",
    description:
      "Parking management platform for malls and public areas across Kenya with mobile payments and real-time availability.",
    tech: ["Django", "DRF", "PostgreSQL"],
    metric: "Real-time allocation & payments",
  },
  {
    title: "FileTransfer",
    description:
      "Secure file-sharing application handling multi-GB transfers with drag-and-drop uploads, auto-deletion, and ZIP downloads.",
    tech: ["Django", "Dropzone.js", "Bootstrap"],
    metric: "Multi-GB secure transfers",
  },
  {
    title: "7D Seven Dimension",
    description:
      "Multi-store Odoo e-commerce platform in Qatar with 4–5 themed websites running concurrently, each supporting three languages. Integrated POS, invoicing, inventory, and sales modules with role-based admin access.",
    tech: ["Odoo", "Python", "PostgreSQL", "POS"],
    metric: "4–5 stores · 3 languages",
  },
];
