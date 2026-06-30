export const PORTFOLIO_CONFIG = {
  globalMetadata: {
    siteName: "Vikas | AI-Augmented Systems Engineer",
    seoDescription: "Top 1% competitive programmer specializing in C++20 HFT, Rust zkML, and Python AI Swarms.",
    ogImage: "/assets/og-image.webp"
  },
  personalProfile: {
    name: "Vikas Tiwari",
    titles: ["Senior Full Stack Engineer", "AI-Augmented Systems Architect"],
    contact: {
      github: "https://github.com/vikas-elite",
      linkedin: "https://linkedin.com/in/vikas-elite",
      email: "vikas@example.com"
    }
  },
  themeEngine: [
    {
      id: "cyberpunk",
      name: "Neon Grid",
      tokens: {
        primary: "#00ff9f",
        background: "#0b0c10",
        surface: "#1f2833",
        accent: "#f50057"
      }
    },
    {
      id: "minimalist",
      name: "Enterprise Light",
      tokens: {
        primary: "#2563eb",
        background: "#ffffff",
        surface: "#f1f5f9",
        accent: "#0f172a"
      }
    },
    {
      id: "matrix",
      name: "Matrix Hacker",
      tokens: {
        primary: "#00ff00",
        background: "#000000",
        surface: "#111111",
        accent: "#ffffff"
      }
    },
    {
      id: "deepspace",
      name: "Deep Space",
      tokens: {
        primary: "#00d2ff",
        background: "#030014",
        surface: "#0a0a2a",
        accent: "#ff007f"
      }
    }
  ],
  certificationGraph: [
    {
      id: "cert_aws_ml",
      title: "AWS Certified Machine Learning – Specialty",
      issuer: "Amazon Web Services",
      date: "2025-10-12",
      tags: ["Cloud", "AI", "Infrastructure"]
    },
    {
      id: "cert_princeton_algos",
      title: "Algorithms, Part I & II",
      issuer: "Princeton University",
      date: "2024-05-10",
      tags: ["Algorithms", "Data Structures"]
    },
    {
      id: "cert_deeplearning",
      title: "Deep Learning Specialization",
      issuer: "DeepLearning.AI",
      date: "2023-11-20",
      tags: ["AI", "Neural Networks"]
    },
    {
      id: "cert_imperial_math",
      title: "Mathematics for Machine Learning",
      issuer: "Imperial College London",
      date: "2023-08-15",
      tags: ["AI", "Math"]
    },
    {
      id: "cert_meta_db",
      title: "Meta Database Engineer",
      issuer: "Meta",
      date: "2023-12-01",
      tags: ["Database", "Infrastructure"]
    },
    {
      id: "cert_duke_mlops",
      title: "MLOps Specialization",
      issuer: "Duke University",
      date: "2024-02-15",
      tags: ["AI", "MLOps"]
    }
    // Note: The rest of the 37 certs can be added here easily
  ],
  projectMatrix: [
    {
      id: "proj_depin",
      title: "DePIN-Agent-Economy",
      status: "Production",
      techStack: ["Rust", "Solidity", "Arbitrum Stylus", "zkML"],
      architectureSummary: "Agentic DePIN powered by zkML and Intent-Centric Smart Accounts. Sub-150ms verification.",
      media: { fallback: "/assets/projects/depin.jpg" }
    },
    {
      id: "proj_hft",
      title: "ultra-low-latency-hft-engine",
      status: "Production",
      techStack: ["C++20", "DPDK", "TensorRT", "Lock-free SPSC"],
      architectureSummary: "Zero-copy High-Frequency Trading execution engine for microsecond-scale deep learning inference.",
      media: { fallback: "/assets/projects/hft.jpg" }
    },
    {
      id: "proj_hybrid_hft",
      title: "hybrid-ai-hft-engine & drl-stock-trading-app",
      status: "Production",
      techStack: ["Rust", "Java 22", "Python", "Aeron IPC"],
      architectureSummary: "Ultra-low-latency DRL stock trading platform with Rust/Aeron backbone and Deep Q-Network.",
      media: { fallback: "/assets/projects/hybrid_hft.jpg" }
    },
    {
      id: "proj_swarm",
      title: "enterprise-agent-swarm",
      status: "Production",
      techStack: ["Java 21", "Spring AI", "Virtual Threads"],
      architectureSummary: "Production-grade multi-agent microservice featuring concurrent orchestration and RAG capabilities.",
      media: { fallback: "/assets/projects/swarm.jpg" }
    },
    {
      id: "proj_job_apply",
      title: "multi-agent-job-apply-eu",
      status: "Production",
      techStack: ["Python", "CrewAI", "Selenium"],
      architectureSummary: "Autonomous AI swarm optimized for European ATS bypassing and immigration compliance.",
      media: { fallback: "/assets/projects/job_apply.jpg" }
    },
    {
      id: "proj_dashboard",
      title: "ai-studio-dashboard",
      status: "Production",
      techStack: ["React", "Vite", "Zustand", "LangGraph"],
      architectureSummary: "A 'God-Tier' AI Agent Dashboard with interactive LangGraph canvas visualizations.",
      media: { fallback: "/assets/projects/dashboard.jpg" }
    },
    {
      id: "proj_youtube",
      title: "Youtube_Final",
      status: "WIP",
      techStack: ["React", "AI Video Processing"],
      architectureSummary: "The Crown Jewel of content creation automation.",
      media: { fallback: "/assets/projects/youtube.jpg" }
    },
    {
      id: "proj_parkour",
      title: "Humanoid Parkour- apex",
      status: "WIP",
      techStack: ["C++", "Reinforcement Learning", "Physics Engine"],
      architectureSummary: "Training humanoid agents to perform complex parkour maneuvers using DRL.",
      media: { fallback: "/assets/projects/parkour.jpg" }
    },
    {
      id: "proj_portfolio",
      title: "elite-dev-portfolio",
      status: "WIP",
      techStack: ["Astro", "React Three Fiber", "Tailwind"],
      architectureSummary: "This very website. A config-driven, WebGL-powered portfolio architecture.",
      media: { fallback: "/assets/projects/portfolio.jpg" }
    }
  ]
};
