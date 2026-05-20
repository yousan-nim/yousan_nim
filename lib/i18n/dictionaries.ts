export const LOCALES = ["en", "th", "zh", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  th: "ภาษาไทย",
  zh: "中文",
  ja: "日本語",
};

type Dict = {
  nav: {
    about: string;
    experience: string;
    education: string;
    projects: string;
    blogs: string;
    contact: string;
    signIn: string;
  };
  hero: {
    line1: string;
    line2: string;
    tagline: string;
    role: string;
    contact: string;
    projects: string;
    github: string;
  };
  about: {
    title: string;
    p1: string;
    p2pre: string;
    p2highlight: string;
    p2post: string;
    p3pre: string;
    p3mid: string;
    p3highlight: string;
    p3post: string;
    statYears: string;
    statProjects: string;
    statResearch: string;
    statCloud: string;
    processTitle: string;
    processSubtitle: string;
    processSubtitleMobile: string;
    step: string;
    steps: {
      title: string;
      desc: string;
      descMobile: string;
      tags: string[];
    }[];
    focusTitle: string;
    focus: { title: string; desc: string }[];
    techTitle: string;
    techSubtitle: string;
    techCards: string[];
    techFooter: string;
  };
  experience: {
    title: string;
    subtitle: string;
    items: { period: string; role: string; company: string; desc: string }[];
  };
  education: {
    title: string;
    items: { degree: string; school: string; years: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
    subtitleMobile: string;
    emailMe: string;
    downloadResume: string;
    email: string;
    linkedin: string;
    github: string;
    note: string;
  };
  projects: {
    title: string;
    placeholder: string;
  };
  preloader: { loading: string };
};

const en: Dict = {
  nav: {
    about: "About Me",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    blogs: "Blogs",
    contact: "Contact",
    signIn: "Sign In",
  },
  hero: {
    line1: "Crafting code into",
    line2: "experiences",
    tagline:
      "I merge creativity with logic to build solutions that inspire and endure.",
    role: "Full-Stack Developer & AI Engineer",
    contact: "Contact",
    projects: "Projects",
    github: "GitHub",
  },
  about: {
    title: "About Me",
    p1: "From building computer vision systems for construction safety to creating holographic AI assistants for airlines, my journey has been about pushing the boundaries of what's possible.",
    p2pre: "With a ",
    p2highlight: "Master's in Electrical Engineering",
    p2post:
      " from KMUTT and hands-on experience across AI research and full-stack development, I specialize in turning complex ideas into tangible, user-focused solutions.",
    p3pre: "I've collaborated with industry leaders like Panasonic and NSTDA on AI research, built CMS platforms serving high-profile clients, and pioneered ",
    p3mid: "",
    p3highlight: "holographic AI avatar technology",
    p3post: " for the airline and hospitality industries.",
    statYears: "Years Experience",
    statProjects: "Projects Delivered",
    statResearch: "Research Collaborations",
    statCloud: "Cloud Deployments",
    processTitle: "My Development Process",
    processSubtitle:
      "A systematic approach to building scalable, production-ready applications",
    processSubtitleMobile: "From idea to production — fast and reliable",
    step: "Step",
    steps: [
      {
        title: "Planning & Design 📋",
        desc: "Define requirements, architecture, and tech stack selection",
        descMobile: "Plan scope, architecture, stack",
        tags: ["User Stories", "Database", "API Design"],
      },
      {
        title: "Development 💻",
        desc: "Build frontend, backend APIs, and integrate features",
        descMobile: "Build UI, APIs, features",
        tags: ["Components", "APIs", "State Mgmt"],
      },
      {
        title: "Testing & QA 🧪",
        desc: "Comprehensive testing and quality assurance",
        descMobile: "Unit, integration, E2E",
        tags: ["Unit Tests", "Integration", "E2E"],
      },
      {
        title: "Deployment 🚀",
        desc: "CI/CD pipelines and cloud deployment setup",
        descMobile: "Automate and deploy to cloud",
        tags: ["Docker", "CI/CD", "AWS/Vultr"],
      },
      {
        title: "Monitoring 📊",
        desc: "Track performance and continuously optimize",
        descMobile: "Monitor, analyze, iterate",
        tags: ["Analytics", "Performance", "Iteration"],
      },
    ],
    focusTitle: "Performance Highlights",
    focus: [
      {
        title: "75% Faster Backend",
        desc: "Optimized Smart Building APIs from ~8s to ~2s under load, with JWT guards and rate limiting hardening the platform.",
      },
      {
        title: "-33% Frontend API Calls",
        desc: "Cut redundant traffic through request deduplication and smart caching — lighter backend, snappier UI.",
      },
      {
        title: "86\" Holographic AI Human",
        desc: "Pioneered an OpenAI + RAG-powered AI assistant deployed on a Holovue display at FOOD & HOSPITALITY THAILAND 2025.",
      },
    ],
    techTitle: "Technical Expertise",
    techSubtitle:
      "A refined selection of my proficiency in modern development tools and technologies",
    techCards: [
      "Frontend",
      "Backend",
      "Database",
      "DevOps & Cloud",
      "AI & ML",
      "Tools & Others",
    ],
    techFooter: "Constantly refining and expanding my technical skillset.",
  },
  experience: {
    title: "Experience",
    subtitle: "Career Journey",
    items: [
      {
        period: "Apr 2026 - Present",
        role: "Senior Full-Stack Developer",
        company: "@ BPS Technology",
        desc: "Smart Building IoT (Zyta) + multi-vendor BLE healthcare app. Cut backend latency ~8s → ~2s, reduced frontend API calls by 33%, shipped to 3 B2B clients and both major app stores.",
      },
      {
        period: "Oct 2025 - Feb 2026",
        role: "Full-Stack Developer",
        company: "@ Prime Media Co., Ltd.",
        desc: "Led a 3-engineer team on a Discovery Influencer Platform (Next.js + Elysia + PostgreSQL on Google Cloud) for large-scale KOL/KOC campaigns. Also shipped IPPS Payment Solutions' corporate site and a fintech-aligned cosmetics e-commerce platform.",
      },
      {
        period: "Jul 2024 - Oct 2025",
        role: "Full-Stack Developer",
        company: "@ CREaiVE.ai",
        desc: "Built CMS platforms for high-profile clients and pioneered AI Human technology — an 86\" OpenAI + RAG holographic assistant deployed at FOOD & HOSPITALITY THAILAND 2025.",
      },
      {
        period: "2021 - 2024",
        role: "AI Researcher & Teaching Assistant",
        company: "@ KMUTT",
        desc: "Computer vision PPE detection with Panasonic Singapore, and Wav2Vec2-based speech recognition with NSTDA to help laryngeal-damage patients communicate.",
      },
      {
        period: "2019 - 2020",
        role: "Electrical Engineering Intern",
        company: "@ Seagate Technology Thailand",
        desc: "Built a full-stack inventory management system handling 300+ warehouse products with React, Node.js/Express, and SQL.",
      },
    ],
  },
  education: {
    title: "Education",
    items: [
      {
        degree: "Master of Electrical Engineering",
        school: "King Mongkut's University of Technology Thonburi (KMUTT)",
        years: "2021 – 2025",
      },
      {
        degree: "Bachelor of Electronics and Telecommunication Engineering",
        school: "King Mongkut's University of Technology Thonburi (KMUTT)",
        years: "2017 – 2021",
      },
      {
        degree: "High School",
        school: "Pomnakarachsawatyanon Hight School",
        years: "2014 – 2017",
      },
    ],
  },
  contact: {
    title: "Get In Touch",
    subtitle:
      "I'm open to full-time roles, contracts, or collaborations. Let's talk about how I can help deliver value to your team.",
    subtitleMobile: "Open to roles and collabs — let's talk.",
    emailMe: "Email Me",
    downloadResume: "Download Resume",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    note: "Prefer email for the fastest response.",
  },
  projects: {
    title: "Projects",
    placeholder: "Short description goes here.",
  },
  preloader: { loading: "Loading…" },
};

const th: Dict = {
  nav: {
    about: "เกี่ยวกับฉัน",
    experience: "ประสบการณ์",
    education: "การศึกษา",
    projects: "ผลงาน",
    blogs: "บทความ",
    contact: "ติดต่อ",
    signIn: "เข้าสู่ระบบ",
  },
  hero: {
    line1: "เปลี่ยนโค้ดให้กลายเป็น",
    line2: "ประสบการณ์",
    tagline:
      "ผมผสานความคิดสร้างสรรค์กับตรรกะ เพื่อสร้างโซลูชันที่สร้างแรงบันดาลใจและคงทน",
    role: "นักพัฒนา Full-Stack และวิศวกร AI",
    contact: "ติดต่อ",
    projects: "ผลงาน",
    github: "GitHub",
  },
  about: {
    title: "เกี่ยวกับฉัน",
    p1: "จากการสร้างระบบคอมพิวเตอร์วิทัศน์เพื่อความปลอดภัยในงานก่อสร้าง ไปจนถึงการสร้างผู้ช่วย AI แบบโฮโลแกรมสำหรับสายการบิน เส้นทางของผมคือการผลักดันขีดจำกัดของสิ่งที่เป็นไปได้",
    p2pre: "ด้วย",
    p2highlight: "ปริญญาโทด้านวิศวกรรมไฟฟ้า",
    p2post:
      "จาก KMUTT และประสบการณ์ลงมือทำจริงทั้งด้านการวิจัย AI และการพัฒนา Full-Stack ผมเชี่ยวชาญในการแปลงแนวคิดที่ซับซ้อนให้เป็นโซลูชันที่จับต้องได้และเน้นผู้ใช้เป็นศูนย์กลาง",
    p3pre:
      "ผมได้ร่วมงานกับผู้นำในอุตสาหกรรมอย่าง Panasonic และ NSTDA ในงานวิจัย AI สร้างแพลตฟอร์ม CMS ให้กับลูกค้าระดับองค์กร และบุกเบิก",
    p3mid: "",
    p3highlight: "เทคโนโลยีอวาตาร์ AI แบบโฮโลแกรม",
    p3post: "สำหรับอุตสาหกรรมสายการบินและการบริการ",
    statYears: "ปีของประสบการณ์",
    statProjects: "โปรเจกต์ที่ส่งมอบ",
    statResearch: "ความร่วมมือด้านวิจัย",
    statCloud: "การดีพลอยบนคลาวด์",
    processTitle: "กระบวนการพัฒนาของผม",
    processSubtitle:
      "แนวทางที่เป็นระบบในการสร้างแอปพลิเคชันที่ขยายได้และพร้อมใช้งานจริง",
    processSubtitleMobile: "จากไอเดียสู่การใช้งานจริง — รวดเร็วและเชื่อถือได้",
    step: "ขั้นตอน",
    steps: [
      {
        title: "วางแผนและออกแบบ 📋",
        desc: "กำหนดความต้องการ สถาปัตยกรรม และเลือกเทคโนโลยี",
        descMobile: "วางขอบเขต สถาปัตยกรรม เทคสแตก",
        tags: ["User Stories", "ฐานข้อมูล", "ออกแบบ API"],
      },
      {
        title: "พัฒนา 💻",
        desc: "สร้างฟรอนต์เอนด์ แบ็กเอนด์ API และผสานฟีเจอร์ต่าง ๆ",
        descMobile: "สร้าง UI, API, ฟีเจอร์",
        tags: ["Components", "APIs", "State Mgmt"],
      },
      {
        title: "ทดสอบและประกันคุณภาพ 🧪",
        desc: "การทดสอบอย่างครอบคลุมและการประกันคุณภาพ",
        descMobile: "Unit, integration, E2E",
        tags: ["Unit Tests", "Integration", "E2E"],
      },
      {
        title: "ดีพลอย 🚀",
        desc: "ตั้งค่าไปป์ไลน์ CI/CD และการดีพลอยบนคลาวด์",
        descMobile: "ทำให้อัตโนมัติและดีพลอยขึ้นคลาวด์",
        tags: ["Docker", "CI/CD", "AWS/Vultr"],
      },
      {
        title: "ติดตามผล 📊",
        desc: "ติดตามประสิทธิภาพและปรับปรุงอย่างต่อเนื่อง",
        descMobile: "ติดตาม วิเคราะห์ ปรับปรุง",
        tags: ["Analytics", "Performance", "Iteration"],
      },
    ],
    focusTitle: "ผลงานเชิงประสิทธิภาพ",
    focus: [
      {
        title: "Backend เร็วขึ้น 75%",
        desc: "ปรับ Smart Building API จาก ~8s เหลือ ~2s ภายใต้โหลด พร้อมเสริมความปลอดภัยด้วย JWT และ rate limiting",
      },
      {
        title: "ลด API call ฝั่ง frontend 33%",
        desc: "ตัดทราฟฟิกซ้ำซ้อนด้วย request deduplication และ caching ที่เหมาะสม — ลดภาระ backend ทำให้ UI ตอบสนองเร็วขึ้น",
      },
      {
        title: "AI Human โฮโลแกรม 86 นิ้ว",
        desc: "บุกเบิกผู้ช่วย AI (OpenAI + RAG) บนจอ Holovue ในงาน FOOD & HOSPITALITY THAILAND 2025",
      },
    ],
    techTitle: "ความเชี่ยวชาญทางเทคนิค",
    techSubtitle:
      "การคัดสรรความชำนาญของผมในเครื่องมือและเทคโนโลยีการพัฒนาสมัยใหม่",
    techCards: [
      "Frontend",
      "Backend",
      "ฐานข้อมูล",
      "DevOps และ Cloud",
      "AI และ ML",
      "เครื่องมืออื่น ๆ",
    ],
    techFooter: "พัฒนาและขยายทักษะทางเทคนิคอย่างต่อเนื่อง",
  },
  experience: {
    title: "ประสบการณ์",
    subtitle: "เส้นทางอาชีพ",
    items: [
      {
        period: "เม.ย. 2026 - ปัจจุบัน",
        role: "Senior Full-Stack Developer",
        company: "@ BPS Technology",
        desc: "Smart Building IoT (Zyta) และแอป BLE ด้าน healthcare ลดเวลา backend จาก ~8s เหลือ ~2s ลด API call ฝั่ง frontend 33% ส่งมอบ B2B 3 ราย และขึ้นทั้ง App Store / Google Play",
      },
      {
        period: "ต.ค. 2025 - ก.พ. 2026",
        role: "Full-Stack Developer",
        company: "@ Prime Media Co., Ltd.",
        desc: "นำทีมวิศวกร 3 คนพัฒนา Discovery Influencer Platform (Next.js + Elysia + PostgreSQL บน Google Cloud) สำหรับแคมเปญ KOL/KOC ขนาดใหญ่ พร้อมส่งมอบเว็บไซต์ IPPS Payment Solutions และแพลตฟอร์มอีคอมเมิร์ซเครื่องสำอางที่เชื่อมกับโซลูชันการชำระเงิน",
      },
      {
        period: "ก.ค. 2024 - ต.ค. 2025",
        role: "Full-Stack Developer",
        company: "@ CREaiVE.ai",
        desc: "สร้างแพลตฟอร์ม CMS ให้ลูกค้าระดับองค์กร และบุกเบิกเทคโนโลยี AI Human — รวมถึงผู้ช่วย AI โฮโลแกรม 86 นิ้วบน OpenAI + RAG ที่ใช้งานจริงในงาน FOOD & HOSPITALITY THAILAND 2025",
      },
      {
        period: "2021 - 2024",
        role: "นักวิจัย AI และผู้ช่วยสอน",
        company: "@ KMUTT",
        desc: "คอมพิวเตอร์วิทัศน์สำหรับตรวจจับ PPE ร่วมกับ Panasonic Singapore และระบบรู้จำเสียงพูดด้วย Wav2Vec2 ช่วยผู้ป่วยที่มีปัญหาเส้นเสียงร่วมกับ NSTDA",
      },
      {
        period: "2019 - 2020",
        role: "นักศึกษาฝึกงานวิศวกรรมไฟฟ้า",
        company: "@ Seagate Technology Thailand",
        desc: "ระบบจัดการคลังสินค้าแบบ Full-Stack ดูแลสินค้ากว่า 300 รายการ ด้วย React, Node.js/Express และ SQL",
      },
    ],
  },
  education: {
    title: "การศึกษา",
    items: [
      {
        degree: "ปริญญาโท วิศวกรรมไฟฟ้า",
        school: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (KMUTT)",
        years: "2021 – 2025",
      },
      {
        degree: "ปริญญาตรี วิศวกรรมอิเล็กทรอนิกส์และโทรคมนาคม",
        school: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (KMUTT)",
        years: "2017 – 2021",
      },
      {
        degree: "มัธยมศึกษา",
        school: "โรงเรียนพรหมนครราชสวัสดิยานนท์",
        years: "2014 – 2017",
      },
    ],
  },
  contact: {
    title: "ติดต่อ",
    subtitle:
      "ผมเปิดรับงานประจำ งานสัญญาจ้าง หรือการร่วมงาน มาคุยกันว่าผมจะช่วยสร้างคุณค่าให้ทีมของคุณได้อย่างไร",
    subtitleMobile: "เปิดรับงานและการร่วมงาน — มาคุยกัน",
    emailMe: "ส่งอีเมลถึงผม",
    downloadResume: "ดาวน์โหลดเรซูเม่",
    email: "อีเมล",
    linkedin: "LinkedIn",
    github: "GitHub",
    note: "ส่งอีเมลมาจะตอบกลับเร็วที่สุด",
  },
  projects: {
    title: "ผลงาน",
    placeholder: "คำอธิบายสั้น ๆ ตรงนี้",
  },
  preloader: { loading: "กำลังโหลด…" },
};

const zh: Dict = {
  nav: {
    about: "关于我",
    experience: "工作经历",
    education: "教育背景",
    projects: "项目",
    blogs: "博客",
    contact: "联系",
    signIn: "登录",
  },
  hero: {
    line1: "将代码打造成",
    line2: "体验",
    tagline: "我将创造力与逻辑融合，构建鼓舞人心且持久的解决方案。",
    role: "全栈开发者 & AI 工程师",
    contact: "联系",
    projects: "项目",
    github: "GitHub",
  },
  about: {
    title: "关于我",
    p1: "从为建筑安全构建计算机视觉系统，到为航空公司打造全息 AI 助手，我的旅程一直在不断突破可能的边界。",
    p2pre: "凭借 KMUTT 的",
    p2highlight: "电气工程硕士学位",
    p2post:
      "，以及在 AI 研究和全栈开发方面的实战经验，我擅长将复杂的想法转化为以用户为中心、切实可行的解决方案。",
    p3pre:
      "我曾与 Panasonic 和 NSTDA 等行业领军者合作开展 AI 研究，为重要客户构建 CMS 平台，并率先开创了",
    p3mid: "",
    p3highlight: "全息 AI 虚拟形象技术",
    p3post: "，应用于航空和酒店服务行业。",
    statYears: "年经验",
    statProjects: "已交付项目",
    statResearch: "研究合作",
    statCloud: "云端部署",
    processTitle: "我的开发流程",
    processSubtitle: "构建可扩展、可投入生产应用的系统化方法",
    processSubtitleMobile: "从构想到生产 — 快速且可靠",
    step: "步骤",
    steps: [
      {
        title: "规划与设计 📋",
        desc: "明确需求、架构并选择技术栈",
        descMobile: "规划范围、架构、技术栈",
        tags: ["用户故事", "数据库", "API 设计"],
      },
      {
        title: "开发 💻",
        desc: "构建前端、后端 API 并集成功能",
        descMobile: "构建 UI、API、功能",
        tags: ["组件", "API", "状态管理"],
      },
      {
        title: "测试与质量保证 🧪",
        desc: "全面的测试与质量保证",
        descMobile: "单元、集成、端到端",
        tags: ["单元测试", "集成测试", "端到端"],
      },
      {
        title: "部署 🚀",
        desc: "CI/CD 流水线与云端部署配置",
        descMobile: "自动化并部署至云端",
        tags: ["Docker", "CI/CD", "AWS/Vultr"],
      },
      {
        title: "监控 📊",
        desc: "追踪性能并持续优化",
        descMobile: "监控、分析、迭代",
        tags: ["分析", "性能", "迭代"],
      },
    ],
    focusTitle: "性能亮点",
    focus: [
      {
        title: "后端提速 75%",
        desc: "将智能建筑 API 在高负载下从约 8 秒优化至约 2 秒，并通过 JWT 与速率限制强化平台。",
      },
      {
        title: "前端 API 调用减少 33%",
        desc: "通过请求去重与智能缓存削减冗余流量，降低后端压力并提升前端响应速度。",
      },
      {
        title: "86 寸全息 AI 数字人",
        desc: "在 FOOD & HOSPITALITY THAILAND 2025 上首创基于 OpenAI + RAG 的 AI 助手，并部署于 Holovue 全息屏。",
      },
    ],
    techTitle: "技术专长",
    techSubtitle: "精选我在现代开发工具与技术方面的能力",
    techCards: ["前端", "后端", "数据库", "DevOps 与云", "AI 与机器学习", "工具与其他"],
    techFooter: "持续打磨并拓展我的技术能力。",
  },
  experience: {
    title: "工作经历",
    subtitle: "职业历程",
    items: [
      {
        period: "2026 年 4 月 - 至今",
        role: "高级全栈开发者",
        company: "@ BPS Technology",
        desc: "智能建筑 IoT（Zyta）与多厂商 BLE 健康应用。后端延迟由约 8 秒优化至 2 秒，前端 API 调用减少 33%，已交付 3 家 B2B 客户并上线 Google Play 与 App Store。",
      },
      {
        period: "2025 年 10 月 - 2026 年 2 月",
        role: "全栈开发者",
        company: "@ Prime Media Co., Ltd.",
        desc: "带领 3 人工程团队打造 Discovery 影响者平台（Next.js + Elysia + PostgreSQL，部署于 Google Cloud），支撑大规模 KOL/KOC 营销活动。同时交付 IPPS Payment Solutions 企业营销网站与对接金融科技的化妆品电商平台。",
      },
      {
        period: "2024 年 7 月 - 2025 年 10 月",
        role: "全栈开发者",
        company: "@ CREaiVE.ai",
        desc: "为重要客户构建 CMS 平台，开创 AI 数字人技术 —— 在 FOOD & HOSPITALITY THAILAND 2025 部署 86 寸 OpenAI + RAG 全息助手。",
      },
      {
        period: "2021 - 2024",
        role: "AI 研究员 & 助教",
        company: "@ KMUTT",
        desc: "与 Panasonic Singapore 合作开发 PPE 检测计算机视觉，并与 NSTDA 合作打造基于 Wav2Vec2 的语音识别系统，辅助喉部受损患者沟通。",
      },
      {
        period: "2019 - 2020",
        role: "电气工程实习生",
        company: "@ Seagate Technology Thailand",
        desc: "使用 React、Node.js/Express 和 SQL 构建管理 300 多种仓库产品的全栈库存管理系统。",
      },
    ],
  },
  education: {
    title: "教育背景",
    items: [
      {
        degree: "电气工程硕士",
        school: "国王科技大学吞武里分校 (KMUTT)",
        years: "2021 – 2025",
      },
      {
        degree: "电子与电信工程学士",
        school: "国王科技大学吞武里分校 (KMUTT)",
        years: "2017 – 2021",
      },
      {
        degree: "高中",
        school: "Pomnakarachsawatyanon 高中",
        years: "2014 – 2017",
      },
    ],
  },
  contact: {
    title: "取得联系",
    subtitle:
      "我接受全职、合同或合作机会。让我们聊聊我如何为您的团队创造价值。",
    subtitleMobile: "接受职位与合作 — 欢迎联系。",
    emailMe: "给我发邮件",
    downloadResume: "下载简历",
    email: "邮箱",
    linkedin: "领英",
    github: "GitHub",
    note: "邮件联系可获得最快回复。",
  },
  projects: {
    title: "项目",
    placeholder: "简短描述放在这里。",
  },
  preloader: { loading: "加载中…" },
};

const ja: Dict = {
  nav: {
    about: "私について",
    experience: "経歴",
    education: "学歴",
    projects: "プロジェクト",
    blogs: "ブログ",
    contact: "お問い合わせ",
    signIn: "サインイン",
  },
  hero: {
    line1: "コードを",
    line2: "体験へ",
    tagline:
      "創造性とロジックを融合し、人を惹きつけ長く使われるソリューションを構築します。",
    role: "フルスタック開発者 & AI エンジニア",
    contact: "お問い合わせ",
    projects: "プロジェクト",
    github: "GitHub",
  },
  about: {
    title: "私について",
    p1: "建設現場の安全のためのコンピュータービジョンシステムから、航空会社向けのホログラフィック AI アシスタントの開発まで、私の歩みは可能性の限界を押し広げることでした。",
    p2pre: "KMUTT の",
    p2highlight: "電気工学修士",
    p2post:
      "と、AI 研究およびフルスタック開発における実践的な経験を活かし、複雑なアイデアをユーザー中心の具体的なソリューションへと変えることを得意としています。",
    p3pre:
      "Panasonic や NSTDA といった業界のリーダーと AI 研究で協業し、主要なクライアント向けの CMS プラットフォームを構築し、",
    p3mid: "",
    p3highlight: "ホログラフィック AI アバター技術",
    p3post: "を航空・ホスピタリティ業界向けに切り拓いてきました。",
    statYears: "年の経験",
    statProjects: "納品プロジェクト",
    statResearch: "研究協業",
    statCloud: "クラウド展開",
    processTitle: "私の開発プロセス",
    processSubtitle:
      "スケーラブルで本番対応のアプリケーションを構築する体系的なアプローチ",
    processSubtitleMobile: "アイデアから本番まで — 高速かつ確実に",
    step: "ステップ",
    steps: [
      {
        title: "計画と設計 📋",
        desc: "要件、アーキテクチャ、技術スタックの選定",
        descMobile: "範囲・構成・スタックを計画",
        tags: ["ユーザーストーリー", "データベース", "API 設計"],
      },
      {
        title: "開発 💻",
        desc: "フロントエンド、バックエンド API を構築し機能を統合",
        descMobile: "UI・API・機能を構築",
        tags: ["コンポーネント", "API", "状態管理"],
      },
      {
        title: "テストと QA 🧪",
        desc: "包括的なテストと品質保証",
        descMobile: "ユニット・統合・E2E",
        tags: ["ユニットテスト", "統合テスト", "E2E"],
      },
      {
        title: "デプロイ 🚀",
        desc: "CI/CD パイプラインとクラウド展開の構築",
        descMobile: "自動化してクラウドへ展開",
        tags: ["Docker", "CI/CD", "AWS/Vultr"],
      },
      {
        title: "モニタリング 📊",
        desc: "パフォーマンスを追跡し継続的に最適化",
        descMobile: "監視・分析・改善",
        tags: ["分析", "パフォーマンス", "改善"],
      },
    ],
    focusTitle: "パフォーマンスのハイライト",
    focus: [
      {
        title: "バックエンド 75% 高速化",
        desc: "スマートビル API を負荷時に約 8 秒から約 2 秒へ短縮し、JWT とレート制限でプラットフォームを堅牢化。",
      },
      {
        title: "フロントエンド API 呼び出し -33%",
        desc: "リクエストの重複排除とキャッシュで冗長な通信を削減し、バックエンド負荷を軽減して UX を向上。",
      },
      {
        title: "86 インチ ホログラフィック AI ヒューマン",
        desc: "FOOD & HOSPITALITY THAILAND 2025 にて OpenAI + RAG ベースの AI アシスタントを Holovue に展開。",
      },
    ],
    techTitle: "技術的専門性",
    techSubtitle: "最新の開発ツールと技術における私の習熟度の厳選",
    techCards: [
      "フロントエンド",
      "バックエンド",
      "データベース",
      "DevOps & クラウド",
      "AI & ML",
      "ツールその他",
    ],
    techFooter: "技術スキルを絶えず磨き、広げ続けています。",
  },
  experience: {
    title: "経歴",
    subtitle: "キャリアの歩み",
    items: [
      {
        period: "2026 年 4 月 - 現在",
        role: "シニアフルスタック開発者",
        company: "@ BPS Technology",
        desc: "スマートビル IoT（Zyta）とマルチベンダー BLE ヘルスケアアプリ。バックエンド遅延を約 8 秒→2 秒、フロント API 呼び出しを 33% 削減し、3 つの B2B クライアントと両主要ストアへリリース。",
      },
      {
        period: "2025 年 10 月 - 2026 年 2 月",
        role: "フルスタック開発者",
        company: "@ Prime Media Co., Ltd.",
        desc: "3 名のエンジニアチームを率い、Next.js + Elysia + PostgreSQL（Google Cloud）で大規模 KOL/KOC キャンペーン向け Discovery インフルエンサープラットフォームを構築。IPPS Payment Solutions のコーポレートサイトと、決済ソリューションと連携する化粧品 EC プラットフォームも納品。",
      },
      {
        period: "2024 年 7 月 - 2025 年 10 月",
        role: "フルスタック開発者",
        company: "@ CREaiVE.ai",
        desc: "主要クライアント向け CMS プラットフォームを構築し、AI ヒューマン技術を開拓 —— FOOD & HOSPITALITY THAILAND 2025 にて 86 インチ OpenAI + RAG ホログラフィックアシスタントを展開。",
      },
      {
        period: "2021 - 2024",
        role: "AI 研究員 & ティーチングアシスタント",
        company: "@ KMUTT",
        desc: "Panasonic Singapore と PPE 検出のコンピュータビジョンを、NSTDA と Wav2Vec2 ベースの音声認識を共同開発し、喉頭損傷患者のコミュニケーションを支援。",
      },
      {
        period: "2019 - 2020",
        role: "電気工学インターン",
        company: "@ Seagate Technology Thailand",
        desc: "React、Node.js/Express、SQL で 300 以上の倉庫製品を管理するフルスタックの在庫管理システムを構築。",
      },
    ],
  },
  education: {
    title: "学歴",
    items: [
      {
        degree: "電気工学修士",
        school: "モンクット王工科大学トンブリー校 (KMUTT)",
        years: "2021 – 2025",
      },
      {
        degree: "電子・通信工学学士",
        school: "モンクット王工科大学トンブリー校 (KMUTT)",
        years: "2017 – 2021",
      },
      {
        degree: "高校",
        school: "Pomnakarachsawatyanon 高校",
        years: "2014 – 2017",
      },
    ],
  },
  contact: {
    title: "お問い合わせ",
    subtitle:
      "フルタイム、契約、または協業を歓迎しています。あなたのチームにどう貢献できるか、ぜひお話ししましょう。",
    subtitleMobile: "求人・協業を歓迎 — お気軽にどうぞ。",
    emailMe: "メールを送る",
    downloadResume: "履歴書をダウンロード",
    email: "メール",
    linkedin: "LinkedIn",
    github: "GitHub",
    note: "最も早い返信はメールでお願いします。",
  },
  projects: {
    title: "プロジェクト",
    placeholder: "ここに簡単な説明が入ります。",
  },
  preloader: { loading: "読み込み中…" },
};

export const dictionaries: Record<Locale, Dict> = { en, th, zh, ja };
