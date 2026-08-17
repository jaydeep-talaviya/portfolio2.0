export interface SkillGroup {
  name: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    skills: ["Python", "SQL", "JavaScript", "HTML", "CSS"],
  },
  {
    name: "Frameworks",
    skills: ["FastAPI", "Django", "DRF", "Protean (DDD)", "Odoo"],
  },
  {
    name: "Backend",
    skills: [
      "Microservices",
      "REST API",
      "Event-driven",
      "WebSockets",
      "Celery",
      "Redis",
      "JWT Auth",
    ],
  },
  {
    name: "Databases",
    skills: [
      "PostgreSQL",
      "MySQL",
      "Azure SQL",
      "MongoDB",
      "CosmosDB",
      "BigQuery",
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: ["Azure", "AWS", "GCP", "Docker", "Git", "Linux", "Grafana"],
  },
  {
    name: "Frontend",
    skills: ["React / Next.js", "Bootstrap", "Material UI"],
  },
];

export const certifications = [
  {
    name: "Programming for Everybody (Getting Started with Python)",
    issuer: "University of Michigan — Coursera",
    url: "https://coursera.org/share/331d54b0002435f6c02133fdf030b83f",
  },
  {
    name: "Crash Course on Python",
    issuer: "Google — Coursera",
    url: "https://coursera.org/share/f0b5578bd2dbe06066ae5e4ede2e8cef",
  },
  {
    name: "How Google does Machine Learning",
    issuer: "Google Cloud — Coursera",
    url: "https://coursera.org/share/4b912550dd7bea87ac5d8d032a76a553",
  },
  {
    name: "AWS Fundamentals: Going Cloud-Native",
    issuer: "Amazon Web Services — Coursera",
    url: "https://coursera.org/share/9b904670fbfea49594d42fe9a1815898",
  },
  {
    name: "Introduction to Git and GitHub",
    issuer: "University of Michigan — Coursera",
    url: "https://coursera.org/share/d85cc3e70c2929c3e5efac7fbdf7d264",
  },
  {
    name: "Django for Everybody (4 Courses Specialization)",
    issuer: "University of Michigan — Coursera",
    url: "https://coursera.org/share/b29bd2ea0fa073f985b3f3d07c95658c",
  },
  {
    name: "Machine Learning with Python",
    issuer: "IBM — Coursera",
    url: "https://coursera.org/share/6f1e831e6042b5b078c627e8474d5ba7",
  },
  {
    name: "Python (Basic) Certificate",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/iframe/c2107717a0a2",
  },
  {
    name: "JavaScript (Basic) Certificate",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/iframe/fd5fa0e9bf58",
  },
  {
    name: "SQL (Basic) Certificate",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/iframe/e78992fe28e9",
  },
];
