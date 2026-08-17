export interface Project {
  name: string;
  description: string;
  tech: string[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  highlights: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    company: "Upforce Tech",
    role: "Python Developer",
    period: "Jan 2025 – Present",
    current: true,
    highlights: [
      "Designed and shipped 4 FastAPI microservices using DDD architecture (aggregates, domain events, handlers) for a multi-service ERP platform",
      "Migrated legacy .NET services to Python/FastAPI with dual-write consistency, reducing infrastructure costs",
      "Built an approval matrix engine processing ~2.5k rule evaluations daily with Redis-backed caching",
    ],
  },
  {
    company: "9Series Solutions",
    role: "Python Developer",
    period: "Jan 2023 – Jul 2024",
    highlights: [
      "Built a multi-channel campaign management platform integrating Google Ads, Meta Ads, Bing Ads, and Pinterest APIs",
      "Implemented BigQuery analytics pipeline handling 50M+ rows of campaign performance data",
      "Designed a parking management system for Kenya with mobile payment integration and real-time allocation",
    ],
  },
  {
    company: "SecureMetaSys Infotech",
    role: "Python Developer",
    period: "May 2022 – Jan 2023",
    highlights: [
      "Created a secure file-sharing platform supporting multi-GB transfers with drag-and-drop uploads and auto-deletion",
      "Implemented multi-email sharing with ZIP download functionality and role-based access control",
    ],
  },
  {
    company: "Techultra Solutions",
    role: "Python / Odoo Developer",
    period: "Feb 2021 – Apr 2022",
    highlights: [
      "Customized Odoo modules (CRM, Sales, Inventory, POS, Website) for utility management and e-commerce platforms",
      "Built a multi-store e-commerce platform in Qatar with 4–5 themed websites running concurrently in 3 languages",
      "Configured role-based workflows for maintenance, procurement, and warehouse stock allocation",
    ],
  },
];
