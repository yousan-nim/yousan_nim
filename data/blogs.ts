export type CodeExample = {
  language: string;
  code: string;
};

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  code?: CodeExample[];
};

export type BlogSectionGroup =
  | "Projects"
  | "Patterns & Principles"
  | "System Architecture"
  | "Learn";

export const BLOG_SECTIONS: BlogSectionGroup[] = [
  "Projects",
  "Patterns & Principles",
  "System Architecture",
  "Learn",
];

export type BlogPost = {
  slug: string;
  title: string;
  section: BlogSectionGroup;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  sections: BlogSection[];
  takeaway: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-human-interactive-holovue",
    title: "AI Human Interactive on HOLOVUE",
    section: "Projects",
    category: "AI / Interactive",
    date: "Coming soon",
    readTime: "Draft",
    excerpt:
      "Project write-up coming soon — an AI-driven interactive human experience built on the HOLOVUE platform.",
    tags: ["Coming Soon"],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Details for this project will be added here. Placeholder kept so the section appears in the Projects list while the full case study is being prepared.",
        ],
      },
    ],
    takeaway: "Detailed write-up coming soon.",
  },
  {
    slug: "ecom-api-spring-boot",
    title: "ECOM Platform — Java Spring Boot Microservices",
    section: "Projects",
    category: "Backend / Java",
    date: "May 28, 2026",
    readTime: "11 min read",
    excerpt:
      "A production-grade e-commerce backend built as a Maven multi-module monorepo: four independent Spring Boot services, four PostgreSQL databases, one nginx gateway, and a strict set of rules that keep the system from drifting into a distributed monolith.",
    tags: ["Spring Boot", "Java", "PostgreSQL", "Microservices", "Docker"],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "ECOM Platform is a production-grade e-commerce backend built as a Maven multi-module monorepo that ships four independent Spring Boot services — user, catalog, order, payment — each owning its own PostgreSQL database. The split follows strict database-per-service boundaries: no cross-service joins, no shared schemas, no shared tables. Each service can scale, deploy, and evolve on its own timeline.",
          "The single most consequential rule is the database boundary. No service ever queries another service's tables. Cross-service references travel by public_id (UUID v7) in API payloads, and downstream services snapshot whatever data they depend on (price, product name) into their own tables. That keeps reads fast, ownership unambiguous, and migrations safe.",
          "The whole stack runs under docker compose with separate stacks for local, dev, and prod. Flyway manages append-only migrations per database, nginx fronts everything on port 8080 as the single public entry point, and every service ships its own OpenAPI / Swagger UI. A single Makefile owns every common task — start the stack, run migrations, open a psql shell, build, test, reset volumes.",
        ],
        bullets: [
          "4 Spring Boot services + 4 PostgreSQL databases — strict database-per-service ownership.",
          "nginx API gateway on :8080 as the single public entry point.",
          "JWT auth in user-service; Flyway migrations per DB; Swagger UI on every service.",
          "Docker Compose stacks for local / dev / prod, all behind one Makefile.",
        ],
      },
      {
        heading: "Architecture",
        paragraphs: [
          "The system has four roles, four codebases, four databases. nginx fronts everything on port 8080 and routes by URL prefix to one of the services: user-service (:8084) for auth and accounts, catalog-service (:8081) for vendors, products, variants, and inventory, order-service (:8082) for carts, orders, shipments, coupons, and reviews, and payment-service (:8083) for payments, refunds, payouts, and webhooks.",
          "Each service owns a PostgreSQL database — user_db, catalog_db, order_db, payment_db — and is the sole writer to its tables. Cross-service traffic is HTTP (REST today, events later), never JOINs. When order-service needs product data, it calls catalog over HTTP and snapshots the result into order_items, so subsequent reads never have to reach back across the boundary.",
          "The architecture is deliberately conservative: nginx today, Spring Cloud Gateway tomorrow if routing logic grows; UUID v7 today so public IDs can move across services without rebasing internal foreign keys; an event bus (Kafka or RabbitMQ) is on the roadmap once order ↔ payment ↔ catalog flows justify it.",
        ],
        code: [
          {
            language: "Diagram",
            code: `                            ┌──────────────────────┐
                            │  nginx gateway :8080 │
                            └──────────┬───────────┘
            ┌──────────────┬───────────┴───────────┬──────────────┐
            ▼              ▼                       ▼              ▼
       ┌─────────┐   ┌─────────┐             ┌─────────┐   ┌─────────┐
       │  user   │   │ catalog │             │  order  │   │ payment │
       │  :8084  │   │  :8081  │             │  :8082  │   │  :8083  │
       └────┬────┘   └────┬────┘             └────┬────┘   └────┬────┘
            │             │                       │             │
            ▼             ▼                       ▼             ▼
       ┌────────┐    ┌──────────┐            ┌─────────┐   ┌──────────┐
       │ user_  │    │ catalog_ │            │ order_  │   │ payment_ │
       │   db   │    │    db    │            │    db   │   │    db    │
       └────────┘    └──────────┘            └─────────┘   └──────────┘`,
          },
        ],
      },
      {
        heading: "Tech stack",
        paragraphs: [
          "Runtime is Java 21 LTS — virtual threads ready — on Spring Boot 3.4. Persistence is Spring Data JPA on Hibernate 6 over PostgreSQL 16. Schema migrations are managed by Flyway 10 per database, with append-only V<n>__*.sql files. Build is Maven 3.9 multi-module, where a parent pom.xml at the repo root pins shared versions and plugin configuration.",
          "Auth uses JJWT 0.12 to sign and validate short-lived JWTs in user-service. API docs use springdoc-openapi 2.7, so every service exposes a Swagger UI on its own port. Containers are Docker + docker compose. The gateway is nginx today; the door is intentionally left open to swap in Spring Cloud Gateway when routing logic outgrows static configuration.",
          "Tests use JUnit 5 + Mockito for unit tests and Testcontainers for integration — real PostgreSQL is spun up in Docker so JPA, Flyway, and SQL behavior match production exactly. No H2 dialect surprises, no test-only schema drift.",
        ],
        bullets: [
          "Java 21 (LTS) on Spring Boot 3.4.",
          "PostgreSQL 16 + Flyway 10, one database per service.",
          "JJWT 0.12 for JWT signing; springdoc-openapi 2.7 for Swagger UI on every service.",
          "Build: Maven 3.9 multi-module; Containers: Docker + docker compose.",
          "Tests: JUnit 5 + Mockito + Testcontainers (real PostgreSQL 16 in Docker).",
        ],
      },
      {
        heading: "Repository layout",
        paragraphs: [
          "The repo is a single Maven multi-module monorepo. The parent pom.xml at the root pins shared dependency versions and plugin configuration; each service is its own module under services/<svc>/ with its own Dockerfile, pom.xml, application{,-local,-dev,-prod}.yml profiles, and Flyway migrations.",
          "Infrastructure (nginx config, pgAdmin server pre-registration) lives outside services. Documentation lives in docs/ and is the source of truth for architectural rules, database design conventions, dev workflow, operations, and the long-term roadmap.",
          "Inside each service the package layout is a standard Spring Boot pattern: config/, domain/, repository/, service/, security/ (where applicable), and web/. Resources hold application.yml profiles per environment and Flyway migrations under db/migration/.",
        ],
        bullets: [
          "Parent pom.xml at repo root manages versions; each service module inherits.",
          "Each service: Dockerfile, pom.xml, application{,-local,-dev,-prod}.yml, db/migration/.",
          "Standard Spring layout: config / domain / repository / service / security / web.",
          "docs/ holds architecture.md, database-design.md, development.md, operations.md, roadmap-expert.md.",
        ],
        code: [
          {
            language: "Tree",
            code: `ECOM-SPRING-BOOT/
├── pom.xml                        ← parent POM (multi-module)
├── Makefile                       ← every common task is a target
├── docker-compose.yml             ← base: DBs + services + gateway + pgAdmin
├── docker-compose.local.yml       ← local overrides (IDE-friendly)
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── .env.{example,local,dev,prod}
├── docs/                          ← architecture, database-design, ...
├── services/
│   ├── user-service/              ← auth, users, JWT      :8084
│   ├── catalog-service/           ← vendors, products     :8081
│   ├── order-service/             ← carts, orders         :8082
│   └── payment-service/           ← payments, refunds     :8083
├── infra/
│   └── nginx/nginx.conf           ← API gateway routing
└── docker/
    └── pgadmin/servers.json       ← pre-registers 4 DBs in pgAdmin`,
          },
        ],
      },
      {
        heading: "Key architectural rules",
        paragraphs: [
          "These seven rules are the spine of the system. Breaking any of them creates the kind of distributed monolith microservices were supposed to prevent. They are codified in docs/database-design.md and enforced by code review.",
          "The most non-obvious rule is the public_id / internal id split. Internal joins inside a single service still use BIGSERIAL for compact, cache-friendly keys; UUID v7 is reserved for anything that crosses a service boundary or is exposed through the public API. UUID v7 is monotonic — timestamp prefix — so it indexes well, unlike random v4 UUIDs that fragment B-tree pages.",
          "Money is stored as BIGINT in the smallest unit (satang for THB, cents for USD), with currency in a separate CHAR(3) column. Never float, never DECIMAL on the wire. Timestamps are always TIMESTAMPTZ stored in UTC; presentation handles the user's timezone.",
        ],
        bullets: [
          "No cross-service foreign keys — refer to other services by public_id UUID only.",
          "Snapshot data you depend on — copy price + product_name into order_items, never JOIN back across services.",
          "One database per service — never share a DB; fetch via REST or events instead.",
          "Migrations are append-only — once V<n> is applied, never edit; create V<n+1>__alter_xxx.sql.",
          "Money is BIGINT in the smallest unit; currency is a separate CHAR(3) column.",
          "Timestamps are TIMESTAMPTZ — store UTC, display in user timezone.",
          "Public IDs are UUID v7; internal joins use BIGSERIAL.",
        ],
        code: [
          {
            language: "SQL",
            code: `-- order_items: snapshot of catalog data, captured at order time.
CREATE TABLE order_items (
    id                 BIGSERIAL    PRIMARY KEY,
    order_id           BIGINT       NOT NULL REFERENCES orders(id),

    -- cross-service reference: never a FK, just the public_id.
    product_public_id  UUID         NOT NULL,

    -- snapshot fields: never JOIN back to catalog.
    product_name       VARCHAR(255) NOT NULL,
    unit_price         BIGINT       NOT NULL,   -- satang
    currency           CHAR(3)      NOT NULL,   -- e.g. 'THB'
    quantity           INT          NOT NULL,

    created_at         TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at         TIMESTAMPTZ  NOT NULL DEFAULT now()
);`,
          },
        ],
      },
      {
        heading: "Endpoints and API gateway",
        paragraphs: [
          "All public traffic enters through nginx on port 8080 and is routed to the right service by URL prefix. The gateway is intentionally simple — static rewrites in nginx.conf — so traffic is predictable and the routing layer can be reasoned about offline.",
          "Authentication lives in user-service. POST /api/v1/auth/register creates an account; POST /api/v1/auth/login returns a short-lived JWT signed with JWT_SECRET. Subsequent calls send Authorization: Bearer <token> and any service that needs identity validates the signature with the same secret.",
          "Each service ships its own springdoc-openapi UI for development at /swagger-ui.html on the service's own port. Health and liveness endpoints (/api/v1/ping, /actuator/*) are intentionally not routed through the gateway — operators hit each service directly so a failing gateway never hides a failing service.",
        ],
        bullets: [
          "Single public entry: http://localhost:8080 → nginx → service.",
          "Auth: POST /api/v1/auth/register → POST /api/v1/auth/login → Authorization: Bearer <token>.",
          "OpenAPI UI per service: :8081–:8084 /swagger-ui.html.",
          "Health endpoints (/actuator/*) hit each service directly, not via the gateway.",
        ],
        code: [
          {
            language: "Bash",
            code: `# Register
curl -X POST http://localhost:8080/api/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "alice@example.com",
    "password": "P@ssw0rd!",
    "name": "Alice"
  }'

# Log in -> capture JWT
TOKEN=$(curl -s -X POST http://localhost:8080/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"alice@example.com","password":"P@ssw0rd!"}' \\
  | jq -r '.data.accessToken')

# Authenticated request
curl http://localhost:8080/api/v1/users/me \\
  -H "Authorization: Bearer $TOKEN"`,
          },
        ],
      },
      {
        heading: "Local development workflow",
        paragraphs: [
          "Local development is driven by the Makefile. make up-local starts the four Postgres containers plus pgAdmin; make migrate-all applies every Flyway migration. From there you can either run each service from your IDE (recommended for quick reload and debugging) or bring up everything as containers with make up-local-full.",
          "pgAdmin pre-registers all four databases via docker/pgadmin/servers.json, so the moment the stack is up you can browse user_db, catalog_db, order_db, payment_db without any manual setup. make tables lists tables in every DB, and make psql-<svc> drops you straight into a service's database.",
          "Configuration is environment-scoped: .env.local, .env.dev, .env.prod, each derived from a matching .env.*.example template. The first make up-* run auto-copies the example if no env file exists, so a fresh clone goes from clone to running stack with a single command.",
        ],
        bullets: [
          "make up-local — start 4 Postgres + pgAdmin (no apps).",
          "make up-local-full — build + start all services + gateway.",
          "make migrate-all / make migrate-<svc> — apply Flyway migrations.",
          "make tables — list tables in every DB; make psql-<svc> — open a psql shell.",
          "make build / make test — build all services / run all tests.",
          "make db-reset — DESTRUCTIVE: drop and recreate all DB volumes.",
        ],
        code: [
          {
            language: "Bash",
            code: `# 1) Start the 4 Postgres databases + pgAdmin
make up-local

# 2) Apply Flyway migrations to all 4 databases
make migrate-all

# 3) Verify schema
make tables                # lists tables in every DB
open http://localhost:5050 # pgAdmin (servers pre-registered)

# 4a) Run services from your IDE (recommended)
#     one Spring Boot run config per service

# 4b) ...or run everything in containers
make up-local-full         # build + start all 4 services + gateway`,
          },
        ],
      },
      {
        heading: "Testing",
        paragraphs: [
          "The testing strategy is unit tests for pure business logic and Testcontainers for anything that touches the database. JUnit 5 + Mockito cover services and pure functions; Testcontainers boots a real PostgreSQL 16 container in Docker for integration tests so JPA, Flyway, and SQL behavior match production exactly — no H2 dialect surprises.",
          "Each service can be tested in isolation with mvn -pl services/<svc> -am test. The integration tests do not share a database between services — by design, since the production split forbids it. The result is that a green test on one service really does mean that service is correct, independent of the others.",
          "Docker must be running for integration tests. Testcontainers pulls and starts the postgres:16 image on first use; subsequent runs reuse the cached image and start in a second or two.",
        ],
        bullets: [
          "Unit tests: JUnit 5 + Mockito.",
          "Integration tests: Testcontainers — real Postgres 16 in Docker.",
          "No shared test database between services — mirrors production isolation.",
          "mvn -pl services/<svc> -am test — test a single service.",
        ],
        code: [
          {
            language: "Bash",
            code: `# Run all tests across all services
make test
# or:
mvn -B test

# Run a single service's tests
mvn -B -pl services/user-service -am test

# Single test class
mvn -B -pl services/user-service test -Dtest=AuthServiceTest`,
          },
        ],
      },
      {
        heading: "Deployment and production checklist",
        paragraphs: [
          "Deployment is docker compose with environment-specific overrides. make build compiles every service jar; make up-dev and make up-prod bring up the corresponding stack. Dev rebuilds images on the fly; prod expects images to already exist (pulled from a registry).",
          "The production checklist enforces the boundary between 'works on local' and 'safe to expose'. .env.prod is never committed, JWT_SECRET must be a long random value (256-bit or more), Swagger UI is disabled (no need to advertise the schema externally), and TLS is terminated at the gateway or upstream LB.",
          "Operationally, each Postgres volume has its own backup schedule, logs go from stdout to an aggregator, and /actuator/health is wired to liveness and readiness probes so the orchestrator restarts only the service that is actually unhealthy.",
        ],
        bullets: [
          ".env.prod filled in — never commit; store secrets in a real manager.",
          "JWT_SECRET set to a long random value (256-bit+); rotate DB passwords from defaults.",
          "SWAGGER_ENABLED=false in prod.",
          "TLS at the gateway or upstream LB; all Flyway migrations applied (make migrate-all).",
          "Backups configured per Postgres volume; log shipping to an aggregator.",
          "/actuator/health wired to liveness / readiness probes.",
        ],
        code: [
          {
            language: "Bash",
            code: `# Build all service jars
make build

# Then build & start the dev / prod stack
make up-dev      # builds images on the fly
make up-prod     # expects images to be prebuilt or in registry`,
          },
        ],
      },
      {
        heading: "Roadmap",
        paragraphs: [
          "The shipped pieces are the foundation: a 4-service monorepo, per-service Postgres and Flyway, nginx gateway, Swagger per service, JWT auth in user-service. The next layer is what makes a small e-commerce backend into a robust one.",
          "Inter-service auth (service tokens or mTLS) replaces today's implicit trust between containers. An event bus (Kafka or RabbitMQ) decouples order ↔ payment ↔ catalog flows that today rely on synchronous HTTP. The outbox pattern guarantees that a domain change and its event are published atomically — no lost events, no double-published ones.",
          "The gateway is intentionally provisional. nginx is enough today; Spring Cloud Gateway is the planned upgrade when routing logic outgrows static config. A CI/CD pipeline (GitHub Actions: build → test → push images) and an observability stack (Prometheus + Grafana + Tempo / Loki) round out the production-readiness story.",
        ],
        bullets: [
          "Shipped: 4-service monorepo, per-service Postgres + Flyway, nginx + Swagger, JWT auth.",
          "Next: inter-service auth (service tokens / mTLS).",
          "Event bus (Kafka / RabbitMQ) for order ↔ payment ↔ catalog flows.",
          "Outbox pattern for reliable event publishing.",
          "Swap nginx → Spring Cloud Gateway when routing logic grows.",
          "CI/CD: GitHub Actions for build → test → push images.",
          "Observability: Prometheus + Grafana + Tempo / Loki.",
        ],
      },
    ],
    takeaway:
      "The ECOM Platform is an exercise in keeping microservices honest: four small, single-purpose Spring Boot services, four isolated databases, one gateway, strict rules about IDs, money, and migrations. The real boundary between services is the database, not the codebase — and that one discipline is what stops the system from drifting back into a distributed monolith.",
  },
  {
    slug: "minigames",
    title: "MiniGames",
    section: "Projects",
    category: "Web Games",
    date: "Coming soon",
    readTime: "Draft",
    excerpt:
      "A collection of small, focused web games — full breakdown of mechanics, stack, and design notes coming soon.",
    tags: ["Coming Soon"],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Details for this project will be added here. Placeholder kept so the section appears in the Projects list while the full case study is being prepared.",
        ],
      },
    ],
    takeaway: "Detailed write-up coming soon.",
  },
  {
    slug: "zyta-well-building-monitoring",
    title: "Zyta Well-Building Monitoring",
    section: "Projects",
    category: "IoT / Monitoring",
    date: "Coming soon",
    readTime: "Draft",
    excerpt:
      "Real-time monitoring system for well-building environments under the Zyta platform — case study coming soon.",
    tags: ["Coming Soon"],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Details for this project will be added here. Placeholder kept so the section appears in the Projects list while the full case study is being prepared.",
        ],
      },
    ],
    takeaway: "Detailed write-up coming soon.",
  },
  {
    slug: "caregiver-application",
    title: "CareGiver Application",
    section: "Projects",
    category: "Healthcare App",
    date: "Coming soon",
    readTime: "Draft",
    excerpt:
      "Application supporting caregivers and the people they look after — full write-up of features and architecture coming soon.",
    tags: ["Coming Soon"],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Details for this project will be added here. Placeholder kept so the section appears in the Projects list while the full case study is being prepared.",
        ],
      },
    ],
    takeaway: "Detailed write-up coming soon.",
  },
  {
    slug: "from-research-prototype-to-production-stack",
    title: "From Research Prototype to Production Stack",
    section: "System Architecture",
    category: "Engineering",
    date: "March 16, 2026",
    readTime: "8 min read",
    excerpt:
      "Research code proves an idea. Production code proves the idea can survive real users, real latency, and repeated change.",
    tags: ["Architecture", "Backend", "MLOps", "Delivery"],
    sections: [
      {
        heading: "Prototypes optimize for discovery",
        paragraphs: [
          "During research, speed matters more than elegance. You want fast experiments, rough instrumentation, and enough code to learn whether the idea has value.",
          "That style is correct for exploration, but it becomes expensive if it is promoted into production unchanged.",
        ],
      },
      {
        heading: "Production needs stronger boundaries",
        paragraphs: [
          "The first major shift is separating concerns: inference logic, business rules, storage, and user-facing APIs should not live in one tangled script.",
          "The second shift is operational: version inputs, monitor quality, and make rollback paths routine instead of exceptional.",
        ],
        bullets: [
          "Extract the data contract first.",
          "Add observability before scale exposes the weak points.",
          "Document assumptions that were previously kept in a notebook or in memory.",
        ],
      },
      {
        heading: "Do not over-romanticize the rewrite",
        paragraphs: [
          "A clean rewrite sounds attractive, but teams often lose momentum there. A staged migration usually preserves learning better.",
          "Keep the working prototype alive long enough to compare outputs while the production path becomes trustworthy.",
        ],
      },
    ],
    takeaway:
      "The goal is not to erase prototype code. It is to translate the learning into a system other engineers can maintain with confidence.",
  },
  {
    slug: "what-good-full-stack-decisions-look-like",
    title: "What Good Full-Stack Decisions Look Like",
    section: "Learn",
    category: "Systems",
    date: "February 8, 2026",
    readTime: "6 min read",
    excerpt:
      "Full-stack work is less about touching every layer and more about making coherent tradeoffs between product speed, reliability, and maintainability.",
    tags: ["Full Stack", "Decision Making", "Scaling", "Teamwork"],
    sections: [
      {
        heading: "Choose complexity deliberately",
        paragraphs: [
          "The strongest technical decisions are often the ones that remove moving parts instead of adding them.",
          "A simple server action, a small schema, or a direct integration can be better architecture than a system that looks more advanced on paper.",
        ],
      },
      {
        heading: "Optimize the handoffs",
        paragraphs: [
          "Many product delays do not come from raw implementation difficulty. They come from weak handoffs between design, frontend, backend, and operations.",
          "A good full-stack engineer reduces those seams by making contracts explicit and feedback loops short.",
        ],
      },
      {
        heading: "Think in terms of change",
        paragraphs: [
          "The real question is rarely whether a feature works today. It is whether the team can update it next month without fear.",
          "Naming, boundaries, and predictable data flow are what make speed repeatable instead of accidental.",
        ],
      },
    ],
    takeaway:
      "Good full-stack work creates momentum for the next feature, not just a working demo for the current one.",
  },
  {
    slug: "oop-pillars-in-practice",
    title: "Object-Oriented Programming",
    section: "Patterns & Principles",
    category: "OOP Fundamentals",
    date: "May 20, 2026",
    readTime: "14 min read",
    excerpt:
      "Encapsulation, abstraction, inheritance, polymorphism, and composition — five working ideas that turn loose code into a maintainable object-oriented system.",
    tags: ["OOP", "Encapsulation", "Polymorphism", "Composition", "Architecture"],
    sections: [
      {
        heading: "Encapsulation",
        paragraphs: [
          "Encapsulation is bundling data and the operations that work on that data into a single unit, while hiding the internal state from the outside world. The object owns its data; callers interact with intent-revealing methods instead of touching fields directly.",
          "The point is not secrecy — it is control. By forcing access through methods, the object can validate inputs, enforce invariants, and keep itself in a legal state at all times. Callers depend on what the object does, not on how it stores things, which means internal refactors do not ripple outward.",
          "A common mistake is to add a getter and setter for every private field. That looks like encapsulation but is really a struct in disguise — any caller can still walk the object into an invalid state. Real encapsulation exposes behavior, not raw data: deposit and withdraw, not setBalance.",
        ],
        bullets: [
          "Make state private by default; expose intent through methods, not raw fields.",
          "Validate at the boundary so the object cannot enter an invalid state.",
          "Prefer immutable updates — methods return new state rather than mutating shared references.",
          "If a getter and setter exist for every field, the encapsulation is fake.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `class BankAccount {
  #balance: number;

  constructor(opening: number) {
    if (opening < 0) throw new Error("opening balance must be non-negative");
    this.#balance = opening;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("deposit must be positive");
    this.#balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0 || amount > this.#balance) {
      throw new Error("invalid withdrawal");
    }
    this.#balance -= amount;
  }

  get balance(): number {
    return this.#balance;
  }
}`,
          },
          {
            language: "Go",
            code: `package bank

// 'balance' is lowercase — unexported, invisible to other packages.
type Account struct {
	balance int64
}

func NewAccount(opening int64) (*Account, error) {
	if opening < 0 {
		return nil, errors.New("opening balance must be non-negative")
	}
	return &Account{balance: opening}, nil
}

func (a *Account) Deposit(amount int64) error {
	if amount <= 0 {
		return errors.New("deposit must be positive")
	}
	a.balance += amount
	return nil
}

func (a *Account) Withdraw(amount int64) error {
	if amount <= 0 || amount > a.balance {
		return errors.New("invalid withdrawal")
	}
	a.balance -= amount
	return nil
}

func (a *Account) Balance() int64 { return a.balance }`,
          },
          {
            language: "Java",
            code: `public class BankAccount {
    private long balance;

    public BankAccount(long opening) {
        if (opening < 0)
            throw new IllegalArgumentException("opening balance must be non-negative");
        this.balance = opening;
    }

    public void deposit(long amount) {
        if (amount <= 0)
            throw new IllegalArgumentException("deposit must be positive");
        this.balance += amount;
    }

    public void withdraw(long amount) {
        if (amount <= 0 || amount > balance)
            throw new IllegalArgumentException("invalid withdrawal");
        this.balance -= amount;
    }

    public long getBalance() {
        return balance;
    }
}`,
          },
        ],
      },
      {
        heading: "Abstraction",
        paragraphs: [
          "Abstraction is modeling the essential features of an entity while ignoring details that callers do not care about. An interface should describe what a thing does, not how — the domain vocabulary on the outside, the implementation tucked away on the inside.",
          "Encapsulation and abstraction overlap, but the intent is different. Encapsulation hides data; abstraction hides complexity. The first is about access control, the second is about choosing the right concept for the reader. A class with the right abstraction reads like the business: Cart, Invoice, Reservation — not RowOfStringToObject.",
          "Beware of leaky abstractions. When an interface forces callers to know about HTTP status codes, database error types, or the fact that there's a queue underneath, the abstraction has failed. The test is simple: can you swap the implementation without changing any caller? If not, the boundary is too thin.",
        ],
        bullets: [
          "Name methods after the user's intent, not the implementation step.",
          "Hide collaborators (databases, http clients, queues) behind a domain-language interface.",
          "An abstraction is good when you can swap the implementation without changing callers.",
          "Watch for leaky abstractions — error types, status codes, or quirks that force callers to handle internals.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// Abstraction: domain vocabulary; implementation is irrelevant to callers.
interface Cart {
  add(productId: string, qty: number): void;
  remove(productId: string): void;
  total(): Money;
  checkout(payment: PaymentMethod): Receipt;
}

// One possible implementation — could be backed by Redis, SQL, or in-memory.
class InMemoryCart implements Cart {
  private items = new Map<string, number>();
  add(productId: string, qty: number) { /* ... */ }
  remove(productId: string) { /* ... */ }
  total(): Money { /* ... */ }
  checkout(payment: PaymentMethod): Receipt { /* ... */ }
}`,
          },
          {
            language: "Go",
            code: `// Small interface describing what callers actually care about.
type Cart interface {
	Add(productID string, qty int) error
	Remove(productID string) error
	Total() Money
	Checkout(payment PaymentMethod) (Receipt, error)
}

// One implementation — consumers never have to know which one.
type InMemoryCart struct {
	items map[string]int
}

func (c *InMemoryCart) Add(id string, qty int) error            { /* ... */ return nil }
func (c *InMemoryCart) Remove(id string) error                   { /* ... */ return nil }
func (c *InMemoryCart) Total() Money                             { /* ... */ return Money{} }
func (c *InMemoryCart) Checkout(p PaymentMethod) (Receipt, error) { /* ... */ return Receipt{}, nil }`,
          },
          {
            language: "Java",
            code: `// Abstraction in the consumer's language.
public interface Cart {
    void add(String productId, int qty);
    void remove(String productId);
    Money total();
    Receipt checkout(PaymentMethod payment);
}

// Implementation detail lives on the other side of the interface.
public class InMemoryCart implements Cart {
    private final Map<String, Integer> items = new HashMap<>();

    public void add(String productId, int qty) { /* ... */ }
    public void remove(String productId) { /* ... */ }
    public Money total() { /* ... */ return Money.ZERO; }
    public Receipt checkout(PaymentMethod payment) { /* ... */ return new Receipt(); }
}`,
          },
        ],
      },
      {
        heading: "Inheritance",
        paragraphs: [
          "Inheritance lets a derived class reuse and extend behavior from a base class, establishing an 'is-a' relationship. Every Dog is an Animal, so anything that handles an Animal automatically handles a Dog. That shared contract is what makes subtype polymorphism possible.",
          "The power is code reuse plus a uniform interface. The danger is tight coupling: changes to the base ripple into every subclass, and deep hierarchies become hard to reason about. Many systems that look like they need inheritance are actually better modeled as composition — 'has-a' or 'uses-a' instead of 'is-a'.",
          "Use inheritance when the relationship is genuinely 'is-a' and the subclass honors the Liskov Substitution Principle. If you find yourself overriding a method to throw 'not supported', or checking the concrete type from outside, inheritance is the wrong tool. Keep hierarchies shallow — two levels is usually enough.",
        ],
        bullets: [
          "Inherit only when the subclass truly conforms to the base's contract.",
          "Keep hierarchies shallow — two levels is usually plenty.",
          "Prefer abstract base classes; concrete base classes invite accidental coupling.",
          "If overriding a method means throwing 'not supported', stop inheriting.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `abstract class Animal {
  constructor(protected readonly name: string) {}

  abstract speak(): string;

  introduce(): string {
    return \`Hi, I'm \${this.name}, and I say "\${this.speak()}".\`;
  }
}

class Dog extends Animal {
  speak(): string { return "Woof"; }
}

class Cat extends Animal {
  speak(): string { return "Meow"; }
}

const animals: Animal[] = [new Dog("Rex"), new Cat("Mia")];
animals.forEach((a) => console.log(a.introduce()));`,
          },
          {
            language: "Go",
            code: `// Go has no classical inheritance — it uses interfaces + embedding.
type Animal interface {
	Speak() string
	Name() string
}

// Embedding gives the "shared base" effect without an inheritance tree.
type baseAnimal struct{ name string }

func (b baseAnimal) Name() string { return b.name }

type Dog struct{ baseAnimal }

func (Dog) Speak() string { return "Woof" }

type Cat struct{ baseAnimal }

func (Cat) Speak() string { return "Meow" }

func Introduce(a Animal) string {
	return fmt.Sprintf("Hi, I'm %s, and I say %q.", a.Name(), a.Speak())
}`,
          },
          {
            language: "Java",
            code: `public abstract class Animal {
    protected final String name;

    protected Animal(String name) { this.name = name; }

    public abstract String speak();

    public String introduce() {
        return "Hi, I'm %s, and I say \\"%s\\".".formatted(name, speak());
    }
}

public class Dog extends Animal {
    public Dog(String name) { super(name); }
    @Override public String speak() { return "Woof"; }
}

public class Cat extends Animal {
    public Cat(String name) { super(name); }
    @Override public String speak() { return "Meow"; }
}`,
          },
        ],
      },
      {
        heading: "Polymorphism",
        paragraphs: [
          "Polymorphism is the ability to treat objects of different concrete types through a common interface, with each type responding in its own way. Caller code talks to the abstraction; the runtime picks the right implementation based on the object's actual type.",
          "There are three flavors worth knowing. Subtype polymorphism is the classic one — a Dog used as an Animal. Parametric polymorphism is what generics give you — a Container that works for any T. Ad-hoc polymorphism is overloading or operator dispatch — the same name, different signatures. When most engineers say 'polymorphism' they mean the subtype kind.",
          "Polymorphism is the mechanism that makes the Open/Closed Principle practical. Once callers depend only on the interface, new concrete types can be added without touching existing code. A common smell that polymorphism is missing: long if/else or switch chains that branch on a type field — those almost always want an interface and a few implementations instead.",
        ],
        bullets: [
          "Design the interface first — the right abstraction makes polymorphism feel inevitable, not forced.",
          "Avoid checking the concrete type with 'instanceof' or type switches in business logic.",
          "Prefer composition + small interfaces over wide base classes for polymorphic behavior.",
          "Downcasting is usually a sign the abstraction is wrong.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `interface Shape {
  area(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}
  area() { return Math.PI * this.radius ** 2; }
}

class Rectangle implements Shape {
  constructor(private w: number, private h: number) {}
  area() { return this.w * this.h; }
}

// Caller treats every Shape uniformly; the runtime picks the right area().
function totalArea(shapes: Shape[]): number {
  return shapes.reduce((sum, s) => sum + s.area(), 0);
}`,
          },
          {
            language: "Go",
            code: `type Shape interface {
	Area() float64
}

type Circle struct{ Radius float64 }

func (c Circle) Area() float64 { return math.Pi * c.Radius * c.Radius }

type Rectangle struct{ W, H float64 }

func (r Rectangle) Area() float64 { return r.W * r.H }

// One function, many shapes — that is polymorphism.
func TotalArea(shapes []Shape) float64 {
	var sum float64
	for _, s := range shapes {
		sum += s.Area()
	}
	return sum
}`,
          },
          {
            language: "Java",
            code: `public interface Shape {
    double area();
}

public class Circle implements Shape {
    private final double radius;
    public Circle(double radius) { this.radius = radius; }
    @Override public double area() { return Math.PI * radius * radius; }
}

public class Rectangle implements Shape {
    private final double w, h;
    public Rectangle(double w, double h) { this.w = w; this.h = h; }
    @Override public double area() { return w * h; }
}

public double totalArea(List<Shape> shapes) {
    return shapes.stream().mapToDouble(Shape::area).sum();
}`,
          },
        ],
      },
      {
        heading: "Composition over Inheritance",
        paragraphs: [
          "A long-running rule in object-oriented design: prefer building objects out of smaller collaborators ('has-a') over deriving them from a base class ('is-a'). Composition gives you a system you can rewire; inheritance gives you a system you can only re-derive.",
          "Composition is more flexible because behavior becomes data. Instead of class FastCar extends Car, model class Car { engine: Engine; brakes: Brakes } and pass different implementations in. The same Car can be a sports car, a city car, or an autonomous vehicle just by changing the parts injected into it. Tests can swap a real Engine for a fake one with zero ceremony.",
          "Inheritance still has a place — sealed hierarchies, clear 'is-a' relationships, frameworks that demand a base class — but it should not be the default reach. The question to ask before extending a class is 'do I really mean is, or do I mean has?' If the answer is 'has', the constructor parameter is almost always the better tool than the extends keyword.",
        ],
        bullets: [
          "Ask 'is' or 'has'? 'Has' almost always points to composition.",
          "Pass collaborators in via the constructor; never 'new' them inside the class.",
          "A class that takes 5+ dependencies is doing too much — split it.",
          "When tempted to add a method to a base class, extract a small interface and compose it instead.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// Behavior comes from injected collaborators, not from a parent class.
interface Engine { start(): void; }
interface Brakes { stop(): void; }

class Car {
  constructor(
    private engine: Engine,
    private brakes: Brakes,
  ) {}

  drive() { this.engine.start(); /* ... */ }
  halt()  { this.brakes.stop();  /* ... */ }
}

// Swap any collaborator without subclassing Car.
const sportsCar = new Car(new V8Engine(), new CeramicBrakes());
const cityCar   = new Car(new ElectricEngine(), new RegenerativeBrakes());`,
          },
          {
            language: "Go",
            code: `type Engine interface{ Start() }
type Brakes interface{ Stop() }

type Car struct {
	Engine Engine
	Brakes Brakes
}

func (c Car) Drive() { c.Engine.Start() /* ... */ }
func (c Car) Halt()  { c.Brakes.Stop()  /* ... */ }

// Compose different cars from different parts — no inheritance required.
sports := Car{Engine: V8{},       Brakes: Ceramic{}}
city   := Car{Engine: Electric{}, Brakes: Regen{}}`,
          },
          {
            language: "Java",
            code: `public interface Engine { void start(); }
public interface Brakes { void stop(); }

public class Car {
    private final Engine engine;
    private final Brakes brakes;

    public Car(Engine engine, Brakes brakes) {
        this.engine = engine;
        this.brakes = brakes;
    }

    public void drive() { engine.start(); /* ... */ }
    public void halt()  { brakes.stop();  /* ... */ }
}

// Behavior is configured, not inherited.
var sportsCar = new Car(new V8Engine(), new CeramicBrakes());
var cityCar   = new Car(new ElectricEngine(), new RegenerativeBrakes());`,
          },
        ],
      },
    ],
    takeaway:
      "OOP at its core is about modeling change. Encapsulation owns invariants, abstraction names the domain, inheritance shares contracts when truly 'is-a', polymorphism keeps callers stable, and composition keeps the system flexible. Use them deliberately, not reflexively.",
  },
  {
    slug: "solid-principles-in-practice",
    title: "SOLID Principles",
    section: "Patterns & Principles",
    category: "Design Principles",
    date: "May 24, 2026",
    readTime: "12 min read",
    excerpt:
      "SOLID is not academic trivia. It is five practical rules that keep code easy to read, safe to change, and cheap to extend as a system grows.",
    tags: ["SOLID", "OOP", "Architecture", "Clean Code", "Refactoring"],
    sections: [
      {
        heading: "Single Responsibility Principle (SRP)",
        paragraphs: [
          "A class should have one, and only one, reason to change. In other words, each module should be responsible to a single actor — one stakeholder or one axis of change in the system.",
          "The mistake most teams make is reading SRP as 'a class should only do one thing'. That framing is too vague and leads to over-splitting. The real test is about reasons to change: if a billing rule and a report format live in the same class, two different stakeholders can force edits to the same file, and their changes will collide.",
          "When a class mixes responsibilities, every change carries hidden risk: touching the report logic can accidentally break payroll calculation because they share state and methods. Splitting them means each piece can be tested, deployed, and reasoned about independently.",
        ],
        bullets: [
          "Symptom of violation: a class named with 'And' or 'Manager', or one that imports both UI and database concerns.",
          "Fix: extract each responsibility into its own class, then compose them.",
          "Benefit: smaller diffs, isolated tests, fewer merge conflicts between teams.",
          "Example: split an Invoice class into InvoiceCalculator (math), InvoiceFormatter (presentation), and InvoiceRepository (persistence).",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// Each class has exactly one reason to change.
class InvoiceCalculator {
  total(items: LineItem[]): number {
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }
}

class InvoiceFormatter {
  toText(invoice: Invoice): string {
    return \`Total: \${invoice.total.toFixed(2)}\`;
  }
}

class InvoiceRepository {
  constructor(private db: Database) {}
  save(invoice: Invoice): void {
    this.db.insert("invoices", invoice);
  }
}`,
          },
          {
            language: "Go",
            code: `// Each type owns a single responsibility.
type InvoiceCalculator struct{}

func (InvoiceCalculator) Total(items []LineItem) float64 {
	var sum float64
	for _, i := range items {
		sum += i.Price * float64(i.Qty)
	}
	return sum
}

type InvoiceFormatter struct{}

func (InvoiceFormatter) ToText(inv Invoice) string {
	return fmt.Sprintf("Total: %.2f", inv.Total)
}

type InvoiceRepository struct{ db *sql.DB }

func (r InvoiceRepository) Save(inv Invoice) error {
	_, err := r.db.Exec("INSERT INTO invoices ...", inv.ID)
	return err
}`,
          },
          {
            language: "Java",
            code: `// One responsibility per class.
class InvoiceCalculator {
    double total(List<LineItem> items) {
        return items.stream()
            .mapToDouble(i -> i.price() * i.qty())
            .sum();
    }
}

class InvoiceFormatter {
    String toText(Invoice invoice) {
        return "Total: %.2f".formatted(invoice.total());
    }
}

class InvoiceRepository {
    private final Database db;
    InvoiceRepository(Database db) { this.db = db; }

    void save(Invoice invoice) {
        db.insert("invoices", invoice);
    }
}`,
          },
        ],
      },
      {
        heading: "Open/Closed Principle (OCP)",
        paragraphs: [
          "Software entities should be open for extension but closed for modification. You should be able to add new behavior without editing existing, already-tested code.",
          "The practical mechanism is abstraction plus polymorphism. Instead of a growing switch or if/else chain that you edit every time a new case appears, you define an interface and add a new implementation. The old code never changes, so it never regresses.",
          "A common smell is a function that branches on a type field — handlePayment that checks if type is 'card', else if 'paypal', else if 'crypto'. Every new payment method forces a new branch in the same function. OCP says: define a PaymentMethod interface and let each method implement it; the dispatcher stays untouched.",
        ],
        bullets: [
          "Symptom of violation: editing a long switch/if-else block every time requirements add a case.",
          "Fix: introduce an interface; add new types as new classes implementing it.",
          "Caution: do not abstract prematurely — apply OCP at the axes you have proven will change.",
          "Benefit: new features become additive, and existing tests stay green.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `interface PaymentMethod {
  pay(amount: number): void;
}

class CardPayment implements PaymentMethod {
  pay(amount: number) { /* charge card */ }
}

class PaypalPayment implements PaymentMethod {
  pay(amount: number) { /* charge paypal */ }
}

// Closed for modification: adding CryptoPayment never edits this.
function checkout(method: PaymentMethod, amount: number) {
  method.pay(amount);
}`,
          },
          {
            language: "Go",
            code: `type PaymentMethod interface {
	Pay(amount float64) error
}

type CardPayment struct{}

func (CardPayment) Pay(amount float64) error { /* charge card */ return nil }

type PaypalPayment struct{}

func (PaypalPayment) Pay(amount float64) error { /* charge paypal */ return nil }

// Adding a new method never touches Checkout.
func Checkout(m PaymentMethod, amount float64) error {
	return m.Pay(amount)
}`,
          },
          {
            language: "Java",
            code: `interface PaymentMethod {
    void pay(double amount);
}

class CardPayment implements PaymentMethod {
    public void pay(double amount) { /* charge card */ }
}

class PaypalPayment implements PaymentMethod {
    public void pay(double amount) { /* charge paypal */ }
}

class Checkout {
    // New payment types plug in without editing this method.
    void process(PaymentMethod method, double amount) {
        method.pay(amount);
    }
}`,
          },
        ],
      },
      {
        heading: "Liskov Substitution Principle (LSP)",
        paragraphs: [
          "Subtypes must be substitutable for their base types without altering the correctness of the program. If code works with a base class, it must keep working when handed any subclass.",
          "The classic violation is the Rectangle/Square problem: a Square that extends Rectangle and overrides setWidth to also set height breaks any caller that assumes width and height move independently. The subclass technically inherits, but it lies about its contract.",
          "LSP is really about behavioral contracts, not just method signatures. A subclass must not strengthen preconditions, weaken postconditions, or throw new unexpected exceptions. When you find yourself checking 'if instanceof Subclass' in client code, LSP has usually been broken.",
        ],
        bullets: [
          "Symptom of violation: overridden methods that throw 'not supported', or callers doing type checks before using an object.",
          "Fix: model the real hierarchy — favor composition or separate interfaces over forced inheritance.",
          "Rule of thumb: a subtype may accept more and return less, never the reverse.",
          "Benefit: polymorphism you can actually trust, which is what makes OCP work.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// Model the real hierarchy instead of forcing Square extends Rectangle.
interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(private w: number, private h: number) {}
  area() { return this.w * this.h; }
}

class Square implements Shape {
  constructor(private side: number) {}
  area() { return this.side * this.side; }
}

// Works for any Shape — no instanceof checks needed.
function totalArea(shapes: Shape[]): number {
  return shapes.reduce((sum, s) => sum + s.area(), 0);
}`,
          },
          {
            language: "Go",
            code: `type Shape interface {
	Area() float64
}

type Rectangle struct{ W, H float64 }

func (r Rectangle) Area() float64 { return r.W * r.H }

type Square struct{ Side float64 }

func (s Square) Area() float64 { return s.Side * s.Side }

// Any Shape substitutes cleanly here.
func TotalArea(shapes []Shape) float64 {
	var sum float64
	for _, s := range shapes {
		sum += s.Area()
	}
	return sum
}`,
          },
          {
            language: "Java",
            code: `interface Shape {
    double area();
}

record Rectangle(double w, double h) implements Shape {
    public double area() { return w * h; }
}

record Square(double side) implements Shape {
    public double area() { return side * side; }
}

// No subtype lies about its contract.
double totalArea(List<Shape> shapes) {
    return shapes.stream().mapToDouble(Shape::area).sum();
}`,
          },
        ],
      },
      {
        heading: "Interface Segregation Principle (ISP)",
        paragraphs: [
          "No client should be forced to depend on methods it does not use. Prefer many small, focused interfaces over one large, general-purpose one.",
          "When an interface is too fat, every implementer must provide all of its methods — even the irrelevant ones — usually stubbing them with empty bodies or thrown errors. That is a sign the interface is serving multiple clients with different needs.",
          "A worker robot forced to implement a Worker interface with eat() and sleep() alongside work() is the textbook case. Split it into Workable, Eatable, and Sleepable so each implementer only takes on what it actually supports. ISP keeps LSP honest, because fat interfaces are a frequent source of 'not supported' overrides.",
        ],
        bullets: [
          "Symptom of violation: implementations full of empty methods or 'throw not implemented'.",
          "Fix: break the interface along client lines; let classes implement only what they need.",
          "Benefit: smaller blast radius — changing one capability does not ripple to unrelated implementers.",
          "Tip: design interfaces from the consumer's perspective, not the provider's convenience.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// Small, focused interfaces instead of one fat Worker.
interface Workable { work(): void; }
interface Eatable { eat(): void; }

class Human implements Workable, Eatable {
  work() { /* ... */ }
  eat() { /* ... */ }
}

// Robot only depends on what it actually supports.
class Robot implements Workable {
  work() { /* ... */ }
}`,
          },
          {
            language: "Go",
            code: `// Go favors tiny interfaces by design.
type Workable interface{ Work() }
type Eatable interface{ Eat() }

type Human struct{}

func (Human) Work() {}
func (Human) Eat()  {}

// Robot implements only Workable — no empty Eat() stub.
type Robot struct{}

func (Robot) Work() {}`,
          },
          {
            language: "Java",
            code: `interface Workable { void work(); }
interface Eatable { void eat(); }

class Human implements Workable, Eatable {
    public void work() { /* ... */ }
    public void eat()  { /* ... */ }
}

// No forced empty eat() method here.
class Robot implements Workable {
    public void work() { /* ... */ }
}`,
          },
        ],
      },
      {
        heading: "Dependency Inversion Principle (DIP)",
        paragraphs: [
          "High-level modules should not depend on low-level modules; both should depend on abstractions. And abstractions should not depend on details — details should depend on abstractions.",
          "Concretely: your business logic should not import a specific database driver or HTTP client directly. It should depend on an interface (a repository, a gateway) that the concrete implementation fulfills. The wiring happens at the edges through dependency injection.",
          "This inversion is what makes systems testable and swappable. Because the high-level policy talks to an abstraction, you can pass a fake in tests, switch Postgres for an in-memory store, or replace a payment provider without touching the core. DIP is the principle that ties the other four into a flexible architecture.",
        ],
        bullets: [
          "Symptom of violation: domain logic that 'new's up concrete services or imports infrastructure packages.",
          "Fix: define abstractions owned by the high-level module; inject concrete implementations from outside.",
          "Mechanism: constructor injection, factories, or a DI container at the composition root.",
          "Benefit: the core stays stable while infrastructure stays replaceable.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// Abstraction owned by the high-level module.
interface UserRepository {
  save(user: User): void;
}

class RegistrationService {
  // Depends on the interface, not a concrete database.
  constructor(private repo: UserRepository) {}
  register(user: User) {
    this.repo.save(user);
  }
}

// Detail depends on the abstraction.
class PostgresUserRepository implements UserRepository {
  save(user: User) { /* INSERT INTO users ... */ }
}

// Wire concrete details at the composition root.
const service = new RegistrationService(new PostgresUserRepository());`,
          },
          {
            language: "Go",
            code: `// Abstraction defined where it is consumed.
type UserRepository interface {
	Save(u User) error
}

// High-level module depends on the interface.
type RegistrationService struct {
	repo UserRepository
}

func (s RegistrationService) Register(u User) error {
	return s.repo.Save(u)
}

// Detail implements the abstraction.
type PostgresUserRepository struct{ db *sql.DB }

func (r PostgresUserRepository) Save(u User) error { /* INSERT */ return nil }

// Inject at the composition root.
svc := RegistrationService{repo: PostgresUserRepository{db: db}}`,
          },
          {
            language: "Java",
            code: `interface UserRepository {
    void save(User user);
}

class RegistrationService {
    private final UserRepository repo;
    // Constructor injection of the abstraction.
    RegistrationService(UserRepository repo) { this.repo = repo; }
    void register(User user) { repo.save(user); }
}

class PostgresUserRepository implements UserRepository {
    public void save(User user) { /* INSERT INTO users ... */ }
}

var service = new RegistrationService(new PostgresUserRepository());`,
          },
        ],
      },
    ],
    takeaway:
      "SOLID is a single idea seen from five angles: isolate reasons to change, extend instead of edit, honor contracts, keep interfaces narrow, and depend on abstractions. Applied with judgment — not dogma — they make change cheap.",
  },
  {
    slug: "creational-design-patterns",
    title: "Creational Design Patterns",
    section: "Patterns & Principles",
    category: "Design Patterns",
    date: "May 25, 2026",
    readTime: "14 min read",
    excerpt:
      "Creational patterns give you object-creation mechanisms that increase flexibility and reuse. Here are the five — Factory Method, Abstract Factory, Builder, Prototype, and Singleton — with the problem each one actually solves.",
    tags: ["Design Patterns", "Creational", "OOP", "Architecture", "Refactoring"],
    sections: [
      {
        heading: "Why creational patterns matter",
        paragraphs: [
          "Creational design patterns provide various object creation mechanisms that increase flexibility and reuse of existing code. The shared problem they attack is the same: scattering the 'new' keyword across your codebase couples it to concrete classes, so every new variant forces edits in many places.",
          "Each pattern moves the decision of what to instantiate behind an interface. The client asks for an object and receives one that satisfies a contract — without naming the concrete type. That single move is what makes the code open to extension and safe to change.",
          "The five canonical creational patterns differ in what they control: a single product (Factory Method), a family of matching products (Abstract Factory), a complex step-by-step assembly (Builder), copying an existing instance (Prototype), or guaranteeing exactly one instance (Singleton).",
        ],
        bullets: [
          "Factory Method — provide an interface for creating objects in a superclass, but let subclasses alter the type created.",
          "Abstract Factory — produce families of related objects without specifying their concrete classes.",
          "Builder — construct complex objects step by step, reusing the same construction code for different representations.",
          "Prototype — copy existing objects without making your code depend on their classes.",
          "Singleton — ensure a class has only one instance, with a global access point to it.",
        ],
      },
      {
        heading: "Factory Method",
        paragraphs: [
          "Factory Method provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. Instead of calling a constructor directly, client code calls a factory method that subclasses override.",
          "The problem it solves: when code is tightly coupled to concrete classes, every new product type means hunting down 'new ConcreteType()' calls buried in conditionals. By delegating creation to an overridable method, you add a new product by adding a new subclass — existing, already-tested code never changes.",
          "All products must share a common interface so client code can work with them abstractly. The creator depends on that interface, not on any concrete product.",
        ],
        bullets: [
          "Use when object types and dependencies are not known beforehand, or when extending a library/framework without editing its core.",
          "Also useful for reusing expensive objects via caching or pooling behind the factory method.",
          "Pro: removes tight coupling between creator and concrete products; centralizes creation (SRP); new types are additive (OCP).",
          "Con: introduces extra subclasses; pays off most when you already have a creator hierarchy.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// All products share one interface.
interface Button {
  render(): string;
}

class WindowsButton implements Button {
  render() { return "[ Windows Button ]"; }
}

class HtmlButton implements Button {
  render() { return "<button>Web</button>"; }
}

abstract class Dialog {
  // Factory method — subclasses decide the concrete product.
  abstract createButton(): Button;

  renderDialog(): string {
    const button = this.createButton();
    return button.render();
  }
}

class WindowsDialog extends Dialog {
  createButton() { return new WindowsButton(); }
}

class WebDialog extends Dialog {
  createButton() { return new HtmlButton(); }
}`,
          },
          {
            language: "Go",
            code: `// Product interface.
type Button interface {
	Render() string
}

type WindowsButton struct{}

func (WindowsButton) Render() string { return "[ Windows Button ]" }

type HTMLButton struct{}

func (HTMLButton) Render() string { return "<button>Web</button>" }

// Go favors a creation function as the "factory method".
type Dialog struct {
	CreateButton func() Button
}

func (d Dialog) Render() string {
	return d.CreateButton().Render()
}

func NewWindowsDialog() Dialog {
	return Dialog{CreateButton: func() Button { return WindowsButton{} }}
}

func NewWebDialog() Dialog {
	return Dialog{CreateButton: func() Button { return HTMLButton{} }}
}`,
          },
          {
            language: "Java",
            code: `interface Button {
    String render();
}

class WindowsButton implements Button {
    public String render() { return "[ Windows Button ]"; }
}

class HtmlButton implements Button {
    public String render() { return "<button>Web</button>"; }
}

abstract class Dialog {
    // Factory method overridden by subclasses.
    abstract Button createButton();

    String renderDialog() {
        return createButton().render();
    }
}

class WindowsDialog extends Dialog {
    Button createButton() { return new WindowsButton(); }
}

class WebDialog extends Dialog {
    Button createButton() { return new HtmlButton(); }
}`,
          },
        ],
      },
      {
        heading: "Abstract Factory",
        paragraphs: [
          "Abstract Factory lets you produce families of related objects without specifying their concrete classes. Where Factory Method creates one product, Abstract Factory creates a whole set that is guaranteed to match.",
          "The classic example is a cross-platform UI: a Mac factory builds Mac buttons and Mac checkboxes; a Windows factory builds the Windows equivalents. Because the client only talks to the abstract factory and abstract products, it can never accidentally mix a Mac button with a Windows checkbox.",
          "You define an abstract interface per product type, then a factory interface with a creation method for each. Concrete factories implement the family, and swapping the entire look-and-feel becomes a one-line change of which factory you instantiate.",
        ],
        bullets: [
          "Use when code must work with various families of related products and you want to keep it independent of concrete classes.",
          "Also a good way to extract a class whose many factory methods blur its primary responsibility.",
          "Pro: guarantees products from one factory are compatible; isolates creation (SRP); new variants are additive (OCP).",
          "Con: lots of new interfaces and classes — overkill when you only have one product family.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// Each product type has its own interface.
interface Button { paint(): string; }
interface Checkbox { paint(): string; }

// The abstract factory creates a whole family.
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class MacButton implements Button { paint() { return "Mac button"; } }
class MacCheckbox implements Checkbox { paint() { return "Mac checkbox"; } }

class MacFactory implements GUIFactory {
  createButton() { return new MacButton(); }
  createCheckbox() { return new MacCheckbox(); }
}

class WinButton implements Button { paint() { return "Win button"; } }
class WinCheckbox implements Checkbox { paint() { return "Win checkbox"; } }

class WinFactory implements GUIFactory {
  createButton() { return new WinButton(); }
  createCheckbox() { return new WinCheckbox(); }
}

// Client depends only on the abstract factory.
function renderUI(factory: GUIFactory): string[] {
  return [factory.createButton().paint(), factory.createCheckbox().paint()];
}`,
          },
          {
            language: "Go",
            code: `type Button interface{ Paint() string }
type Checkbox interface{ Paint() string }

// Abstract factory.
type GUIFactory interface {
	CreateButton() Button
	CreateCheckbox() Checkbox
}

type MacButton struct{}

func (MacButton) Paint() string { return "Mac button" }

type MacCheckbox struct{}

func (MacCheckbox) Paint() string { return "Mac checkbox" }

type MacFactory struct{}

func (MacFactory) CreateButton() Button     { return MacButton{} }
func (MacFactory) CreateCheckbox() Checkbox { return MacCheckbox{} }

// Client depends only on the abstract factory.
func RenderUI(f GUIFactory) []string {
	return []string{f.CreateButton().Paint(), f.CreateCheckbox().Paint()}
}`,
          },
          {
            language: "Java",
            code: `interface Button { String paint(); }
interface Checkbox { String paint(); }

interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

class MacFactory implements GUIFactory {
    public Button createButton() { return () -> "Mac button"; }
    public Checkbox createCheckbox() { return () -> "Mac checkbox"; }
}

class WinFactory implements GUIFactory {
    public Button createButton() { return () -> "Win button"; }
    public Checkbox createCheckbox() { return () -> "Win checkbox"; }
}

class Application {
    private final Button button;
    private final Checkbox checkbox;

    Application(GUIFactory factory) {
        this.button = factory.createButton();
        this.checkbox = factory.createCheckbox();
    }
}`,
          },
        ],
      },
      {
        heading: "Builder",
        paragraphs: [
          "Builder lets you construct complex objects step by step. The same construction code can produce different types and representations of an object.",
          "It targets two smells: the telescoping constructor (a dozen overloads, half the arguments null on every call) and the explosion of subclasses created just to capture optional configurations. The builder collects optional steps and produces the finished product only when you call build().",
          "Because each step returns the builder, calls chain fluently and read like a specification. The product can stay immutable — its fields are set once, inside build(), and never mutated afterward.",
        ],
        bullets: [
          "Use to get rid of a telescoping constructor with many optional parameters.",
          "Use to build different representations of a product with the same steps, or to assemble composite/tree structures.",
          "Pro: step-by-step (and reusable) construction; isolates assembly logic (SRP); supports immutable products.",
          "Con: more moving parts — you add a builder class per product.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `interface HttpRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
}

class RequestBuilder {
  private request: HttpRequest = { url: "", method: "GET", headers: {} };

  url(url: string) { this.request.url = url; return this; }
  method(method: string) { this.request.method = method; return this; }
  header(key: string, value: string) {
    this.request.headers[key] = value;
    return this;
  }
  body(body: string) { this.request.body = body; return this; }

  build(): HttpRequest { return this.request; }
}

const request = new RequestBuilder()
  .url("/api/users")
  .method("POST")
  .header("Content-Type", "application/json")
  .body("name=Ada")
  .build();`,
          },
          {
            language: "Go",
            code: `type HttpRequest struct {
	URL     string
	Method  string
	Headers map[string]string
	Body    string
}

type RequestBuilder struct{ req HttpRequest }

func NewRequestBuilder() *RequestBuilder {
	return &RequestBuilder{req: HttpRequest{Method: "GET", Headers: map[string]string{}}}
}

func (b *RequestBuilder) URL(u string) *RequestBuilder    { b.req.URL = u; return b }
func (b *RequestBuilder) Method(m string) *RequestBuilder { b.req.Method = m; return b }
func (b *RequestBuilder) Header(k, v string) *RequestBuilder {
	b.req.Headers[k] = v
	return b
}
func (b *RequestBuilder) Body(s string) *RequestBuilder { b.req.Body = s; return b }
func (b *RequestBuilder) Build() HttpRequest            { return b.req }

func main() {
	req := NewRequestBuilder().
		URL("/api/users").
		Method("POST").
		Header("Content-Type", "application/json").
		Body("name=Ada").
		Build()
	_ = req
}`,
          },
          {
            language: "Java",
            code: `class HttpRequest {
    final String url, method, body;
    final Map<String, String> headers;

    private HttpRequest(Builder b) {
        this.url = b.url;
        this.method = b.method;
        this.headers = b.headers;
        this.body = b.body;
    }

    static class Builder {
        private String url = "", method = "GET", body = null;
        private final Map<String, String> headers = new HashMap<>();

        Builder url(String url) { this.url = url; return this; }
        Builder method(String m) { this.method = m; return this; }
        Builder header(String k, String v) { headers.put(k, v); return this; }
        Builder body(String b) { this.body = b; return this; }
        HttpRequest build() { return new HttpRequest(this); }
    }
}

HttpRequest request = new HttpRequest.Builder()
    .url("/api/users")
    .method("POST")
    .header("Content-Type", "application/json")
    .body("name=Ada")
    .build();`,
          },
        ],
      },
      {
        heading: "Prototype",
        paragraphs: [
          "Prototype lets you copy existing objects without making your code dependent on their classes. The object that does the copying is the one being copied — it exposes a clone() method.",
          "The problem: copying from the outside is unreliable. Some fields are private and invisible to external code, and to copy field by field you must know the concrete class, which couples you to it. Prototype pushes the copy logic inside the object, where it can read every field, including private ones.",
          "This is also a clean alternative to a forest of configuration subclasses: pre-build a few configured prototypes and clone them on demand instead of subclassing for each preset.",
        ],
        bullets: [
          "Use when code should not depend on the concrete classes of objects it copies, or when concrete types are only known through an interface.",
          "Use to cut down subclasses that exist only to hold different initial configurations.",
          "Pro: clones without coupling to concrete classes; removes repetitive initialization; an alternative to inheritance for presets.",
          "Con: cloning objects with circular references is tricky.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `interface Cloneable<T> {
  clone(): T;
}

class Shape implements Cloneable<Shape> {
  constructor(
    public x: number,
    public y: number,
    public color: string,
  ) {}

  clone(): Shape {
    // The object copies itself, including any private fields.
    return new Shape(this.x, this.y, this.color);
  }
}

const original = new Shape(10, 20, "red");
const copy = original.clone();
copy.color = "blue"; // original stays unchanged`,
          },
          {
            language: "Go",
            code: `type Shape struct {
	X, Y  int
	Color string
}

// Clone is owned by the object itself.
func (s Shape) Clone() Shape {
	c := s // value copy of every field
	return c
}

func main() {
	original := Shape{X: 10, Y: 20, Color: "red"}
	clone := original.Clone()
	clone.Color = "blue" // original stays unchanged
	_ = clone
}`,
          },
          {
            language: "Java",
            code: `class Shape implements Cloneable {
    int x, y;
    String color;

    Shape(int x, int y, String color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    @Override
    public Shape clone() {
        // Copy logic lives inside the class, so it can read private state.
        return new Shape(this.x, this.y, this.color);
    }
}

Shape original = new Shape(10, 20, "red");
Shape copy = original.clone();
copy.color = "blue"; // original stays unchanged`,
          },
        ],
      },
      {
        heading: "Singleton",
        paragraphs: [
          "Singleton ensures a class has only one instance while providing a global access point to it. It solves two problems at once — which is also why it is controversial.",
          "The mechanism: make the constructor private so no one can call 'new' from outside, then expose a static accessor that creates the instance on first use and returns the cached one thereafter. That gives you lazy initialization and a single shared object for things like configuration or a connection pool.",
          "Be honest about the costs. Singleton violates the Single Responsibility Principle (it manages both its lifecycle and its real job), it can hide tight coupling, it needs care to be thread-safe, and its global static access makes unit testing harder. Reach for it only when a single instance is a genuine requirement, not just for convenient global access.",
        ],
        bullets: [
          "Use when exactly one instance must be shared by all clients, or when you need tighter control than a plain global variable.",
          "Always handle concurrency — guard the first creation so two threads can not build two instances.",
          "Pro: guarantees one instance; controlled global access; lazy initialization.",
          "Con: violates SRP, can mask bad coupling, complicates testing, needs thread-safety care.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `class Config {
  private static instance: Config;
  private values = new Map<string, string>();

  // Private constructor blocks "new Config()" from outside.
  private constructor() {}

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  set(key: string, value: string) { this.values.set(key, value); }
  get(key: string) { return this.values.get(key); }
}

const a = Config.getInstance();
const b = Config.getInstance();
console.log(a === b); // true — same instance`,
          },
          {
            language: "Go",
            code: `import "sync"

type Config struct {
	values map[string]string
}

var (
	instance *Config
	once     sync.Once
)

// sync.Once makes the single creation safe under concurrency.
func GetInstance() *Config {
	once.Do(func() {
		instance = &Config{values: map[string]string{}}
	})
	return instance
}

func main() {
	a := GetInstance()
	b := GetInstance()
	println(a == b) // true
}`,
          },
          {
            language: "Java",
            code: `class Config {
    private static volatile Config instance;
    private final Map<String, String> values = new HashMap<>();

    private Config() {}

    // Double-checked locking keeps a single instance across threads.
    static Config getInstance() {
        if (instance == null) {
            synchronized (Config.class) {
                if (instance == null) {
                    instance = new Config();
                }
            }
        }
        return instance;
    }
}

Config a = Config.getInstance();
Config b = Config.getInstance();
System.out.println(a == b); // true`,
          },
        ],
      },
    ],
    takeaway:
      "Creational patterns all hide the 'new' behind an interface so the client never names a concrete class. Pick by intent: Factory Method for one product, Abstract Factory for matching families, Builder for step-by-step assembly, Prototype for cloning, and Singleton for a single shared instance — used sparingly.",
  },
  {
    slug: "structural-design-patterns",
    title: "Structural Design Patterns",
    section: "Patterns & Principles",
    category: "Design Patterns",
    date: "May 25, 2026",
    readTime: "16 min read",
    excerpt:
      "Structural patterns explain how to assemble objects and classes into larger structures while keeping them flexible and efficient. Here are all seven — Adapter, Bridge, Composite, Decorator, Facade, Flyweight, and Proxy.",
    tags: ["Design Patterns", "Structural", "OOP", "Architecture", "Composition"],
    sections: [
      {
        heading: "How structural patterns fit together",
        paragraphs: [
          "Structural design patterns explain how to assemble objects and classes into larger structures while keeping those structures flexible and efficient. Where creational patterns are about making objects, structural patterns are about composing them.",
          "Most of them lean on the same lever: favor composition over inheritance. Instead of growing a tall class hierarchy, you wrap, bridge, or compose objects behind a shared interface so each piece can change on its own.",
          "Read them as answers to distinct composition questions: make incompatible interfaces work together (Adapter), split two dimensions that vary independently (Bridge), treat trees like single objects (Composite), add behavior by wrapping (Decorator), hide a messy subsystem (Facade), share memory across many similar objects (Flyweight), and control access to an object (Proxy).",
        ],
        bullets: [
          "Adapter — let objects with incompatible interfaces collaborate.",
          "Bridge — split abstraction and implementation into two hierarchies that vary independently.",
          "Composite — compose objects into trees and treat the tree like a single object.",
          "Decorator — attach new behavior by placing objects inside wrappers.",
          "Facade — provide a simple interface to a complex subsystem.",
          "Flyweight — share common state to fit more objects in memory.",
          "Proxy — provide a placeholder that controls access to another object.",
        ],
      },
      {
        heading: "Adapter",
        paragraphs: [
          "Adapter allows objects with incompatible interfaces to collaborate. It is a translator: it implements the interface your code expects, wraps the foreign object, and converts each call into the form that object understands.",
          "The problem appears whenever you integrate a legacy class or third-party library whose interface does not match your code, and you cannot (or should not) edit it. Rather than bend your codebase around the foreign API, you add a thin adapter that speaks both languages.",
          "Because the conversion lives in one place, your business logic stays clean and you can add more adapters for more services without touching client code.",
        ],
        bullets: [
          "Use when you want to reuse an existing class whose interface is incompatible with the rest of your code.",
          "Use to give several subclasses a missing common behavior without duplicating it in each.",
          "Pro: separates conversion from business logic (SRP); new adapters are additive (OCP).",
          "Con: adds classes; sometimes editing the service directly is simpler.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// Target interface the client expects.
interface JsonLogger {
  log(data: object): void;
}

// Incompatible service we cannot change.
class XmlService {
  writeXml(xml: string) { console.log(xml); }
}

// Adapter makes XmlService usable as a JsonLogger.
class XmlLoggerAdapter implements JsonLogger {
  constructor(private service: XmlService) {}
  log(data: object) {
    const xml = "<log>" + JSON.stringify(data) + "</log>";
    this.service.writeXml(xml);
  }
}

const logger: JsonLogger = new XmlLoggerAdapter(new XmlService());
logger.log({ event: "login" });`,
          },
          {
            language: "Go",
            code: `// Target interface the client expects.
type JsonLogger interface {
	Log(data map[string]any)
}

// Existing service with an incompatible API.
type XmlService struct{}

func (XmlService) WriteXml(xml string) { fmt.Println(xml) }

// Adapter wraps XmlService to satisfy JsonLogger.
type XmlLoggerAdapter struct {
	service XmlService
}

func (a XmlLoggerAdapter) Log(data map[string]any) {
	a.service.WriteXml("<log>...</log>")
}

func main() {
	var logger JsonLogger = XmlLoggerAdapter{}
	logger.Log(map[string]any{"event": "login"})
}`,
          },
          {
            language: "Java",
            code: `interface JsonLogger {
    void log(Map<String, Object> data);
}

class XmlService {
    void writeXml(String xml) { System.out.println(xml); }
}

class XmlLoggerAdapter implements JsonLogger {
    private final XmlService service;
    XmlLoggerAdapter(XmlService service) { this.service = service; }

    public void log(Map<String, Object> data) {
        service.writeXml("<log>" + data + "</log>");
    }
}

JsonLogger logger = new XmlLoggerAdapter(new XmlService());`,
          },
        ],
      },
      {
        heading: "Bridge",
        paragraphs: [
          "Bridge lets you split a large class, or a set of closely related classes, into two separate hierarchies — abstraction and implementation — that can be developed independently.",
          "It solves the class explosion you get from combining dimensions through inheritance. Shapes times colors, remotes times devices, UI times platform: with inheritance, every combination needs a class. Bridge extracts one dimension (the implementation) into its own hierarchy and has the abstraction hold a reference to it.",
          "Now you can add a new device without touching remotes, and a new remote without touching devices. The reference between the two hierarchies is the 'bridge', and it can even be swapped at runtime.",
        ],
        bullets: [
          "Use to divide and organize a monolithic class that has several variants of some functionality.",
          "Use when you must extend a class along several independent dimensions, or switch implementations at runtime.",
          "Pro: client works with high-level abstractions only; abstraction and implementation evolve independently (OCP, SRP).",
          "Con: can over-complicate a class that is already highly cohesive.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// Implementation hierarchy.
interface Device {
  setVolume(percent: number): void;
}

class Tv implements Device {
  setVolume(percent: number) { console.log("TV volume " + percent); }
}

class Radio implements Device {
  setVolume(percent: number) { console.log("Radio volume " + percent); }
}

// Abstraction holds a reference to an implementation (the bridge).
class RemoteControl {
  constructor(protected device: Device) {}
  volumeUp() { this.device.setVolume(50); }
}

// Abstraction can be extended independently of devices.
class AdvancedRemote extends RemoteControl {
  mute() { this.device.setVolume(0); }
}

const remote = new AdvancedRemote(new Tv());
remote.volumeUp();`,
          },
          {
            language: "Go",
            code: `// Implementation side.
type Device interface {
	SetVolume(percent int)
}

type TV struct{}

func (TV) SetVolume(p int) { fmt.Println("TV volume", p) }

type Radio struct{}

func (Radio) SetVolume(p int) { fmt.Println("Radio volume", p) }

// Abstraction side bridges to a Device.
type RemoteControl struct {
	Device Device
}

func (r RemoteControl) VolumeUp() { r.Device.SetVolume(50) }

func main() {
	remote := RemoteControl{Device: TV{}}
	remote.VolumeUp()
}`,
          },
          {
            language: "Java",
            code: `interface Device {
    void setVolume(int percent);
}

class Tv implements Device {
    public void setVolume(int p) { System.out.println("TV volume " + p); }
}

class RemoteControl {
    protected final Device device; // the bridge
    RemoteControl(Device device) { this.device = device; }
    void volumeUp() { device.setVolume(50); }
}

class AdvancedRemote extends RemoteControl {
    AdvancedRemote(Device device) { super(device); }
    void mute() { device.setVolume(0); }
}`,
          },
        ],
      },
      {
        heading: "Composite",
        paragraphs: [
          "Composite lets you compose objects into tree structures and then work with those structures as if they were individual objects.",
          "It fits any model that is naturally recursive: files and folders, UI elements and containers, orders made of products and boxes of products. The trick is a shared interface implemented by both leaves (single items) and composites (containers of items).",
          "Client code calls one method — size(), render(), price() — on the root and lets the tree recurse. It never needs to know whether it holds a single element or a deeply nested branch.",
        ],
        bullets: [
          "Use when your core model can be represented as a tree.",
          "Use when client code should treat simple and composite elements uniformly.",
          "Pro: work with complex trees via polymorphism and recursion; new node types are additive (OCP).",
          "Con: a single shared interface can become over-general when leaf and container behavior diverge.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `interface FileSystemNode {
  size(): number;
}

class FileLeaf implements FileSystemNode {
  constructor(private bytes: number) {}
  size() { return this.bytes; }
}

// A composite holds children of the same interface.
class Folder implements FileSystemNode {
  private children: FileSystemNode[] = [];
  add(node: FileSystemNode) { this.children.push(node); }
  size() {
    return this.children.reduce((sum, c) => sum + c.size(), 0);
  }
}

const root = new Folder();
root.add(new FileLeaf(100));
const sub = new Folder();
sub.add(new FileLeaf(50));
root.add(sub);
console.log(root.size()); // 150`,
          },
          {
            language: "Go",
            code: `type Node interface {
	Size() int
}

type File struct{ Bytes int }

func (f File) Size() int { return f.Bytes }

// Folder is a composite of Nodes.
type Folder struct {
	Children []Node
}

func (f *Folder) Add(n Node) { f.Children = append(f.Children, n) }

func (f *Folder) Size() int {
	total := 0
	for _, c := range f.Children {
		total += c.Size()
	}
	return total
}

func main() {
	root := &Folder{}
	root.Add(File{Bytes: 100})
	sub := &Folder{}
	sub.Add(File{Bytes: 50})
	root.Add(sub)
	fmt.Println(root.Size()) // 150
}`,
          },
          {
            language: "Java",
            code: `interface Node {
    int size();
}

class FileLeaf implements Node {
    private final int bytes;
    FileLeaf(int bytes) { this.bytes = bytes; }
    public int size() { return bytes; }
}

class Folder implements Node {
    private final List<Node> children = new ArrayList<>();
    void add(Node node) { children.add(node); }
    public int size() {
        return children.stream().mapToInt(Node::size).sum();
    }
}`,
          },
        ],
      },
      {
        heading: "Decorator",
        paragraphs: [
          "Decorator lets you attach new behaviors to objects by placing them inside wrapper objects that contain those behaviors.",
          "It replaces the combinatorial explosion of subclasses you get when behaviors can be mixed. Email plus SMS plus Slack notifications would need a subclass per combination; with decorators, each behavior is one wrapper, and you stack them in any order at runtime.",
          "A wrapper implements the same interface as the object it wraps, delegates the core call, and adds work before or after. Because everything shares the interface, the client cannot tell a decorated object from a plain one.",
        ],
        bullets: [
          "Use to add responsibilities to objects at runtime without breaking client code.",
          "Use when extending behavior with inheritance is awkward or impossible (e.g. final classes).",
          "Pro: combine behaviors by stacking wrappers; add or remove them dynamically; splits monolithic classes (SRP).",
          "Con: hard to remove a specific wrapper; behavior can depend on stacking order; many small classes.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `interface Notifier {
  send(message: string): void;
}

class BaseNotifier implements Notifier {
  send(message: string) { console.log("Email: " + message); }
}

// A decorator wraps a Notifier and adds behavior.
class SmsDecorator implements Notifier {
  constructor(private wrappee: Notifier) {}
  send(message: string) {
    this.wrappee.send(message);
    console.log("SMS: " + message);
  }
}

class SlackDecorator implements Notifier {
  constructor(private wrappee: Notifier) {}
  send(message: string) {
    this.wrappee.send(message);
    console.log("Slack: " + message);
  }
}

// Stack behaviors at runtime.
let notifier: Notifier = new BaseNotifier();
notifier = new SmsDecorator(notifier);
notifier = new SlackDecorator(notifier);
notifier.send("Server down");`,
          },
          {
            language: "Go",
            code: `type Notifier interface {
	Send(message string)
}

type BaseNotifier struct{}

func (BaseNotifier) Send(m string) { fmt.Println("Email:", m) }

// Decorator wraps a Notifier.
type SmsDecorator struct{ Wrappee Notifier }

func (d SmsDecorator) Send(m string) {
	d.Wrappee.Send(m)
	fmt.Println("SMS:", m)
}

func main() {
	var n Notifier = BaseNotifier{}
	n = SmsDecorator{Wrappee: n}
	n.Send("Server down")
}`,
          },
          {
            language: "Java",
            code: `interface Notifier {
    void send(String message);
}

class BaseNotifier implements Notifier {
    public void send(String m) { System.out.println("Email: " + m); }
}

// Decorator delegates to the wrapped notifier, then adds work.
class SmsDecorator implements Notifier {
    private final Notifier wrappee;
    SmsDecorator(Notifier wrappee) { this.wrappee = wrappee; }
    public void send(String m) {
        wrappee.send(m);
        System.out.println("SMS: " + m);
    }
}

Notifier notifier = new SmsDecorator(new BaseNotifier());
notifier.send("Server down");`,
          },
        ],
      },
      {
        heading: "Facade",
        paragraphs: [
          "Facade provides a simplified interface to a library, a framework, or any other complex set of classes. It is one class that knows how to drive a tangle of subsystem objects so callers do not have to.",
          "Frameworks often force you to initialize many objects in the right order and understand their dependencies. A facade collapses all of that into a handful of meaningful methods, hiding the moving parts behind a clean entry point.",
          "The client depends only on the facade, which decouples it from the subsystem. Just watch the failure mode: a facade that keeps absorbing responsibilities can grow into a god object coupled to everything.",
        ],
        bullets: [
          "Use when you need a simple entry point into a complex subsystem.",
          "Use to structure a subsystem into layers, with a facade as each layer's entry point.",
          "Pro: isolates client code from subsystem complexity and reduces coupling.",
          "Con: the facade can become a god object tightly coupled to all the classes it hides.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// Complex subsystem.
class VideoFile { constructor(public name: string) {} }
class Codec { decode(file: VideoFile) { return "raw"; } }
class Compressor { compress(raw: string) { return "compressed"; } }

// Facade hides the subsystem behind one method.
class VideoConverter {
  convert(filename: string): string {
    const file = new VideoFile(filename);
    const raw = new Codec().decode(file);
    return new Compressor().compress(raw);
  }
}

const result = new VideoConverter().convert("movie.mov");`,
          },
          {
            language: "Go",
            code: `// Subsystem pieces.
type Codec struct{}

func (Codec) Decode(name string) string { return "raw" }

type Compressor struct{}

func (Compressor) Compress(raw string) string { return "compressed" }

// Facade exposes a single simple entry point.
type VideoConverter struct{}

func (VideoConverter) Convert(filename string) string {
	raw := Codec{}.Decode(filename)
	return Compressor{}.Compress(raw)
}

func main() {
	fmt.Println(VideoConverter{}.Convert("movie.mov"))
}`,
          },
          {
            language: "Java",
            code: `class Codec {
    String decode(String name) { return "raw"; }
}

class Compressor {
    String compress(String raw) { return "compressed"; }
}

// Facade wraps the subsystem behind one call.
class VideoConverter {
    String convert(String filename) {
        String raw = new Codec().decode(filename);
        return new Compressor().compress(raw);
    }
}

String result = new VideoConverter().convert("movie.mov");`,
          },
        ],
      },
      {
        heading: "Flyweight",
        paragraphs: [
          "Flyweight lets you fit more objects into the available RAM by sharing the common parts of state between multiple objects instead of keeping all the data in each one.",
          "The canonical case is a particle system or a forest of trees: thousands of objects that each duplicate the same heavy data (sprite, texture, color). Flyweight splits state in two — intrinsic state that is shared and immutable, and extrinsic state (position, velocity) that stays unique per object.",
          "A factory caches flyweights so identical intrinsic state is created once and reused. Each context object then holds only its own extrinsic data plus a reference to the shared flyweight. It is a deliberate memory-for-CPU trade, so reach for it only under real memory pressure.",
        ],
        bullets: [
          "Use only when you must handle a huge number of similar objects that strain memory.",
          "Use when much of an object's state is duplicate and can be externalized and shared.",
          "Pro: large RAM savings when many objects share intrinsic state.",
          "Con: trades CPU for memory; adds complexity by splitting intrinsic and extrinsic state.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// Intrinsic (shared) state lives in the flyweight.
class TreeType {
  constructor(public name: string, public texture: string) {}
  draw(x: number, y: number) {
    console.log("Draw " + this.name + " at " + x + "," + y);
  }
}

// Factory caches and reuses flyweights.
class TreeFactory {
  private static types = new Map<string, TreeType>();
  static get(name: string, texture: string): TreeType {
    const key = name + ":" + texture;
    if (!TreeFactory.types.has(key)) {
      TreeFactory.types.set(key, new TreeType(name, texture));
    }
    return TreeFactory.types.get(key)!;
  }
}

// Context keeps only extrinsic state plus a flyweight reference.
class Tree {
  constructor(public x: number, public y: number, public type: TreeType) {}
}

const oak = TreeFactory.get("Oak", "oak.png");
const forest = [new Tree(1, 2, oak), new Tree(3, 4, oak)]; // share one TreeType`,
          },
          {
            language: "Go",
            code: `// Shared intrinsic state.
type TreeType struct {
	Name    string
	Texture string
}

// Factory reuses flyweights.
var treeTypes = map[string]*TreeType{}

func GetTreeType(name, texture string) *TreeType {
	key := name + ":" + texture
	if t, ok := treeTypes[key]; ok {
		return t
	}
	t := &TreeType{Name: name, Texture: texture}
	treeTypes[key] = t
	return t
}

// Context holds extrinsic state plus a shared pointer.
type Tree struct {
	X, Y int
	Type *TreeType
}

func main() {
	oak := GetTreeType("Oak", "oak.png")
	forest := []Tree{{1, 2, oak}, {3, 4, oak}} // share one *TreeType
	_ = forest
}`,
          },
          {
            language: "Java",
            code: `class TreeType {
    final String name, texture;
    TreeType(String name, String texture) {
        this.name = name;
        this.texture = texture;
    }
}

class TreeFactory {
    private static final Map<String, TreeType> types = new HashMap<>();
    static TreeType get(String name, String texture) {
        return types.computeIfAbsent(name + ":" + texture,
            k -> new TreeType(name, texture));
    }
}

class Tree {
    final int x, y;
    final TreeType type; // shared flyweight
    Tree(int x, int y, TreeType type) {
        this.x = x; this.y = y; this.type = type;
    }
}`,
          },
        ],
      },
      {
        heading: "Proxy",
        paragraphs: [
          "Proxy provides a substitute or placeholder for another object and controls access to it, letting you run logic before or after a request reaches the real object — all behind the same interface.",
          "Because the proxy and the real service share an interface, the client cannot tell them apart. That makes the proxy a natural home for cross-cutting concerns: lazy initialization of a heavy object, access control, caching, logging, or talking to a remote service.",
          "The example below is a virtual proxy: the expensive object is not built until the first time it is actually used, so creating the placeholder costs almost nothing.",
        ],
        bullets: [
          "Use for lazy initialization of a heavy object, access control, caching, logging, or remote access.",
          "Use when you want to manage a service object's lifecycle without the client knowing.",
          "Pro: controls the service transparently; new proxies are additive (OCP).",
          "Con: more classes; the extra indirection can delay responses.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `interface Image {
  display(): void;
}

class RealImage implements Image {
  constructor(private file: string) {
    console.log("Loading " + file); // expensive work
  }
  display() { console.log("Showing " + this.file); }
}

// Proxy delays creating the heavy object until it is needed.
class LazyImage implements Image {
  private real?: RealImage;
  constructor(private file: string) {}
  display() {
    if (!this.real) this.real = new RealImage(this.file);
    this.real.display();
  }
}

const image: Image = new LazyImage("photo.jpg"); // nothing loaded yet
image.display(); // loads, then shows`,
          },
          {
            language: "Go",
            code: `type Image interface {
	Display()
}

type RealImage struct{ file string }

func NewRealImage(file string) *RealImage {
	fmt.Println("Loading", file) // expensive work
	return &RealImage{file: file}
}

func (r *RealImage) Display() { fmt.Println("Showing", r.file) }

// Proxy controls access and defers loading.
type LazyImage struct {
	file string
	real *RealImage
}

func (p *LazyImage) Display() {
	if p.real == nil {
		p.real = NewRealImage(p.file)
	}
	p.real.Display()
}

func main() {
	var img Image = &LazyImage{file: "photo.jpg"}
	img.Display()
}`,
          },
          {
            language: "Java",
            code: `interface Image {
    void display();
}

class RealImage implements Image {
    private final String file;
    RealImage(String file) {
        this.file = file;
        System.out.println("Loading " + file); // expensive work
    }
    public void display() { System.out.println("Showing " + file); }
}

class LazyImage implements Image {
    private final String file;
    private RealImage real;
    LazyImage(String file) { this.file = file; }
    public void display() {
        if (real == null) real = new RealImage(file);
        real.display();
    }
}`,
          },
        ],
      },
    ],
    takeaway:
      "Structural patterns are seven ways to wire objects together without rigid inheritance: Adapter translates, Bridge separates two axes, Composite builds trees, Decorator wraps in behavior, Facade simplifies, Flyweight shares memory, and Proxy guards access. They all trade a little extra indirection for a lot of flexibility.",
  },
  {
    slug: "behavioral-design-patterns",
    title: "Behavioral Design Patterns",
    section: "Patterns & Principles",
    category: "Design Patterns",
    date: "May 26, 2026",
    readTime: "20 min read",
    excerpt:
      "Behavioral patterns are about how objects talk to each other — who knows what, who triggers what, and how a request flows through the system. Here are all ten, from Chain of Responsibility to Visitor.",
    tags: ["Design Patterns", "Behavioral", "OOP", "Architecture", "Communication"],
    sections: [
      {
        heading: "How behavioral patterns fit together",
        paragraphs: [
          "Behavioral design patterns are concerned with algorithms and the assignment of responsibilities between objects. Where creational patterns answer how objects are made and structural patterns answer how they fit together, behavioral patterns answer how they collaborate.",
          "The shared problem is communication. Tightly-coupled objects that call each other directly are hard to test, hard to extend, and tend to grow long switch statements that mix unrelated concerns. Behavioral patterns push that communication behind an interface — a handler chain, a command object, a mediator, a strategy, an observer list — so each side can change independently.",
          "Read them as answers to specific collaboration questions: pass a request along until something handles it (Chain of Responsibility), turn an action into a first-class object (Command), traverse a collection without exposing it (Iterator), route messages through a single hub (Mediator), snapshot state without leaking internals (Memento), broadcast events to many listeners (Observer), let an object change behavior when its state changes (State), swap an algorithm at runtime (Strategy), share an algorithm skeleton across subclasses (Template Method), and add new operations to a class hierarchy without editing the classes (Visitor).",
        ],
        bullets: [
          "Chain of Responsibility — pass a request along a chain of handlers until one handles it.",
          "Command — turn a request into an object you can pass around, queue, log, and undo.",
          "Iterator — traverse a collection without exposing its representation.",
          "Mediator — replace direct dependencies between objects with a single hub.",
          "Memento — save and restore an object's state without breaking encapsulation.",
          "Observer — subscribe many objects to events on another object.",
          "State — let an object change behavior when its internal state changes.",
          "Strategy — define a family of interchangeable algorithms.",
          "Template Method — fix the algorithm skeleton in a base class; let subclasses fill steps.",
          "Visitor — add new operations to a class hierarchy without modifying the classes.",
        ],
      },
      {
        heading: "Chain of Responsibility",
        paragraphs: [
          "Chain of Responsibility lets you pass a request along a chain of handlers. Each handler either processes the request or forwards it to the next one. The sender does not know — and does not care — which handler ends up doing the work.",
          "It is the cure for the giant 'if auth fails return X; else if rate-limited return Y; else if cached return Z; else run the real handler' pile. Each check becomes its own handler with a clear job. You can reorder them, add a new one, or skip one entirely just by changing how the chain is wired.",
          "Each handler shares a small interface (handle the request, hold a reference to the next handler) and is otherwise free to do whatever it needs. That makes the chain easy to compose at runtime and easy to test one link at a time.",
        ],
        bullets: [
          "Use when your program must handle a variety of requests in several ways, but the exact handler and its order are decided at runtime.",
          "Use when a request must be handled by several handlers in a specific sequence.",
          "Pro: control over the order of handling; separates invoking from handling (SRP); new handlers are additive (OCP).",
          "Con: a request can fall off the end of the chain without being handled if no handler catches it.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `abstract class Handler {
  protected next?: Handler;

  setNext(h: Handler): Handler {
    this.next = h;
    return h;
  }

  // Default behavior: forward to the next handler.
  handle(request: string): string | null {
    return this.next ? this.next.handle(request) : null;
  }
}

class AuthHandler extends Handler {
  handle(req: string): string | null {
    if (!req.includes("token")) return "Auth failed";
    return super.handle(req);
  }
}

class RateLimitHandler extends Handler {
  handle(req: string): string | null {
    if (req.includes("flood")) return "Rate limited";
    return super.handle(req);
  }
}

class BusinessHandler extends Handler {
  handle(req: string) {
    return "OK: " + req;
  }
}

const chain = new AuthHandler();
chain.setNext(new RateLimitHandler()).setNext(new BusinessHandler());
chain.handle("token=abc");`,
          },
          {
            language: "Go",
            code: `type Handler interface {
	Handle(req string) string
}

type AuthHandler struct{ Next Handler }

func (a AuthHandler) Handle(req string) string {
	if !strings.Contains(req, "token") {
		return "Auth failed"
	}
	if a.Next != nil {
		return a.Next.Handle(req)
	}
	return "OK"
}

type RateLimitHandler struct{ Next Handler }

func (r RateLimitHandler) Handle(req string) string {
	if strings.Contains(req, "flood") {
		return "Rate limited"
	}
	if r.Next != nil {
		return r.Next.Handle(req)
	}
	return "OK"
}

type BusinessHandler struct{}

func (BusinessHandler) Handle(req string) string { return "OK: " + req }

func main() {
	chain := AuthHandler{Next: RateLimitHandler{Next: BusinessHandler{}}}
	fmt.Println(chain.Handle("token=abc"))
}`,
          },
          {
            language: "Java",
            code: `abstract class Handler {
    protected Handler next;

    Handler setNext(Handler h) { this.next = h; return h; }

    String handle(String req) {
        return next != null ? next.handle(req) : "";
    }
}

class AuthHandler extends Handler {
    String handle(String req) {
        if (!req.contains("token")) return "Auth failed";
        return super.handle(req);
    }
}

class BusinessHandler extends Handler {
    String handle(String req) { return "OK: " + req; }
}

Handler chain = new AuthHandler();
chain.setNext(new BusinessHandler());
chain.handle("token=abc");`,
          },
        ],
      },
      {
        heading: "Command",
        paragraphs: [
          "Command turns a request into a stand-alone object that contains everything needed to execute it. Once an action is an object, you can pass it as a parameter, queue it, log it, or undo it — none of which is possible with a plain method call.",
          "It cleans up the classic GUI mess where every button knows about the service it calls. Instead, a button holds a Command object and only calls execute() on it. The same command can be triggered by a menu, a keyboard shortcut, or a remote API without duplicating logic.",
          "Because every command shares one interface, an invoker (button, scheduler, undo manager) is decoupled from the receiver (the thing that actually does the work). You add a new action by adding a new command class — no existing code has to change.",
        ],
        bullets: [
          "Use to parameterize objects with operations, like assigning different actions to the same button.",
          "Use to queue, schedule, or send operations over a network — anything that needs a request as data.",
          "Use to implement undo/redo by keeping a history of commands.",
          "Pro: decouples invokers from receivers; new commands are additive (OCP); simple commands compose into macro commands.",
          "Con: adds a layer between sender and receiver; lots of small classes.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `interface Command {
  execute(): void;
}

// Receiver — the thing that does the work.
class Light {
  on() { console.log("light on"); }
  off() { console.log("light off"); }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}
  execute() { this.light.on(); }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}
  execute() { this.light.off(); }
}

// Invoker — holds a Command but knows nothing about the receiver.
class RemoteButton {
  constructor(private command: Command) {}
  press() { this.command.execute(); }
}

const light = new Light();
new RemoteButton(new LightOnCommand(light)).press();`,
          },
          {
            language: "Go",
            code: `type Command interface {
	Execute()
}

type Light struct{}

func (Light) On()  { fmt.Println("light on") }
func (Light) Off() { fmt.Println("light off") }

type LightOnCommand struct{ light Light }

func (c LightOnCommand) Execute() { c.light.On() }

// Invoker holds any Command.
type RemoteButton struct{ cmd Command }

func (r RemoteButton) Press() { r.cmd.Execute() }

func main() {
	RemoteButton{cmd: LightOnCommand{light: Light{}}}.Press()
}`,
          },
          {
            language: "Java",
            code: `interface Command {
    void execute();
}

class Light {
    void on() { System.out.println("light on"); }
    void off() { System.out.println("light off"); }
}

class LightOnCommand implements Command {
    private final Light light;
    LightOnCommand(Light light) { this.light = light; }
    public void execute() { light.on(); }
}

class RemoteButton {
    private final Command command;
    RemoteButton(Command command) { this.command = command; }
    void press() { command.execute(); }
}

Light light = new Light();
new RemoteButton(new LightOnCommand(light)).press();`,
          },
        ],
      },
      {
        heading: "Iterator",
        paragraphs: [
          "Iterator extracts traversal behavior into a separate object, letting clients walk through a collection without seeing how the collection stores its items.",
          "Without it, collections either grow methods for every traversal you can think of, or clients must know if they are dealing with an array, a tree, or a graph in order to walk it. Both options leak the data structure into the rest of the code.",
          "With Iterator, the collection just exposes a way to get an iterator. The iterator carries the position, and clients only ever see hasNext / next. New collections can plug in by providing a new iterator, and you can run two iterations in parallel by creating two iterators.",
        ],
        bullets: [
          "Use when a collection has complex internals you want to hide from clients.",
          "Use to reduce repeated traversal code across the application.",
          "Use to make client code work with any collection through one interface.",
          "Pro: separates traversal from storage (SRP); supports parallel iterations and new traversal types (OCP); iteration can be paused and resumed.",
          "Con: overkill for trivial collections; specialized direct access can be faster.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `interface Iter<T> {
  next(): T | undefined;
  hasNext(): boolean;
}

class NumberCollection {
  constructor(private items: number[]) {}

  iterator(): Iter<number> {
    let index = 0;
    return {
      next: () => this.items[index++],
      hasNext: () => index < this.items.length,
    };
  }
}

const it = new NumberCollection([1, 2, 3]).iterator();
while (it.hasNext()) console.log(it.next());`,
          },
          {
            language: "Go",
            code: `type Iterator interface {
	HasNext() bool
	Next() int
}

type NumberCollection struct{ items []int }

func (c NumberCollection) Iterator() Iterator {
	return &numberIterator{items: c.items}
}

type numberIterator struct {
	items []int
	idx   int
}

func (it *numberIterator) HasNext() bool { return it.idx < len(it.items) }

func (it *numberIterator) Next() int {
	v := it.items[it.idx]
	it.idx++
	return v
}

func main() {
	coll := NumberCollection{items: []int{1, 2, 3}}
	for it := coll.Iterator(); it.HasNext(); {
		fmt.Println(it.Next())
	}
}`,
          },
          {
            language: "Java",
            code: `interface MyIterator<T> {
    boolean hasNext();
    T next();
}

class NumberCollection {
    private final List<Integer> items;
    NumberCollection(List<Integer> items) { this.items = items; }

    MyIterator<Integer> iterator() {
        return new MyIterator<>() {
            int idx = 0;
            public boolean hasNext() { return idx < items.size(); }
            public Integer next() { return items.get(idx++); }
        };
    }
}`,
          },
        ],
      },
      {
        heading: "Mediator",
        paragraphs: [
          "Mediator restricts direct communication between objects and forces them to talk through a single mediator object. Components stop calling each other and start raising events that the mediator routes.",
          "It is the antidote to UI dialogs where a checkbox toggles a text field which enables a submit button which validates a date picker — and every component holds a reference to every other. With a mediator, each component holds only the mediator. All cross-component logic lives in one place: easy to read, easy to change.",
          "The downside is that the mediator can quietly absorb every rule in the dialog and turn into a god object. Use it when the wiring really is many-to-many; for two components, a direct call is fine.",
        ],
        bullets: [
          "Use when a set of classes is tightly coupled and hard to change because of mutual dependencies.",
          "Use when reusing a component is hard because it depends on too many other components.",
          "Use when you find yourself creating tons of subclasses just to reuse logic across configurations.",
          "Pro: centralizes communication; reduces coupling between components; components become easier to reuse.",
          "Con: a mediator can grow into a god object that owns every rule in the system.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `interface DialogMediator {
  notify(sender: string, event: string): void;
}

class Button {
  constructor(private mediator: DialogMediator) {}
  click() { this.mediator.notify("button", "click"); }
}

class TextInput {
  text = "";
  constructor(private mediator: DialogMediator) {}
  clear() { this.text = ""; }
}

// Mediator owns the rules between components.
class LoginDialog implements DialogMediator {
  username = new TextInput(this);
  button = new Button(this);

  notify(sender: string, event: string) {
    if (sender === "button" && event === "click") {
      console.log("submit " + this.username.text);
      this.username.clear();
    }
  }
}

const dialog = new LoginDialog();
dialog.username.text = "ada";
dialog.button.click();`,
          },
          {
            language: "Go",
            code: `type Mediator interface {
	Notify(sender, event string)
}

type Button struct{ M Mediator }

func (b Button) Click() { b.M.Notify("button", "click") }

type TextInput struct {
	M    Mediator
	Text string
}

func (t *TextInput) Clear() { t.Text = "" }

// Concrete mediator coordinates components.
type LoginDialog struct {
	Username *TextInput
}

func (d *LoginDialog) Notify(sender, event string) {
	if sender == "button" && event == "click" {
		fmt.Println("submit", d.Username.Text)
		d.Username.Clear()
	}
}

func main() {
	d := &LoginDialog{}
	d.Username = &TextInput{M: d}
	button := Button{M: d}
	d.Username.Text = "ada"
	button.Click()
}`,
          },
          {
            language: "Java",
            code: `interface DialogMediator {
    void notify(String sender, String event);
}

class Button {
    private final DialogMediator mediator;
    Button(DialogMediator m) { this.mediator = m; }
    void click() { mediator.notify("button", "click"); }
}

class TextInput {
    String text = "";
    private final DialogMediator mediator;
    TextInput(DialogMediator m) { this.mediator = m; }
    void clear() { text = ""; }
}

class LoginDialog implements DialogMediator {
    final TextInput username = new TextInput(this);
    final Button button = new Button(this);

    public void notify(String sender, String event) {
        if (sender.equals("button") && event.equals("click")) {
            System.out.println("submit " + username.text);
            username.clear();
        }
    }
}`,
          },
        ],
      },
      {
        heading: "Memento",
        paragraphs: [
          "Memento lets you save and restore the previous state of an object without exposing its internal structure. It is the textbook answer to the undo problem.",
          "The naive approach — let the history class read private fields — breaks encapsulation. The next refactor of the object will break every place that reads its internals. Memento gives that responsibility back to the object itself.",
          "Three roles work together. The originator (the object you are snapshotting) creates and consumes mementos. The memento is a sealed snapshot of state, readable only by the originator. The caretaker (history stack, transaction manager) holds mementos but never looks inside them.",
        ],
        bullets: [
          "Use to capture and restore an object's state without exposing its internals.",
          "Use when direct access to fields, getters, or setters would break encapsulation.",
          "Pro: state can be saved without breaking encapsulation; the originator stays focused on its own job.",
          "Con: large or frequent snapshots use a lot of memory; caretakers must manage memento lifecycles.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// Immutable snapshot exposing nothing useful to outsiders.
class EditorMemento {
  constructor(public readonly content: string) {}
}

class Editor {
  private content = "";

  type(text: string) { this.content += text; }
  save(): EditorMemento { return new EditorMemento(this.content); }
  restore(m: EditorMemento) { this.content = m.content; }
  get text() { return this.content; }
}

// Caretaker only stores mementos.
class History {
  private stack: EditorMemento[] = [];
  push(m: EditorMemento) { this.stack.push(m); }
  pop() { return this.stack.pop(); }
}

const editor = new Editor();
const history = new History();
editor.type("hello ");
history.push(editor.save());
editor.type("world");
const prev = history.pop();
if (prev) editor.restore(prev);`,
          },
          {
            language: "Go",
            code: `type EditorMemento struct{ content string }

type Editor struct{ content string }

func (e *Editor) Type(s string)           { e.content += s }
func (e *Editor) Save() EditorMemento     { return EditorMemento{content: e.content} }
func (e *Editor) Restore(m EditorMemento) { e.content = m.content }

// Caretaker stores mementos without inspecting them.
type History struct{ stack []EditorMemento }

func (h *History) Push(m EditorMemento) { h.stack = append(h.stack, m) }

func (h *History) Pop() (EditorMemento, bool) {
	if len(h.stack) == 0 {
		return EditorMemento{}, false
	}
	last := len(h.stack) - 1
	m := h.stack[last]
	h.stack = h.stack[:last]
	return m, true
}`,
          },
          {
            language: "Java",
            code: `class Editor {
    private String content = "";

    static class Memento {
        private final String content;
        private Memento(String content) { this.content = content; }
    }

    void type(String s) { content += s; }
    Memento save() { return new Memento(content); }
    void restore(Memento m) { this.content = m.content; }
}

class History {
    private final Deque<Editor.Memento> stack = new ArrayDeque<>();
    void push(Editor.Memento m) { stack.push(m); }
    Editor.Memento pop() { return stack.pop(); }
}`,
          },
        ],
      },
      {
        heading: "Observer",
        paragraphs: [
          "Observer defines a subscription mechanism: a publisher keeps a list of subscribers and notifies them whenever something interesting happens. Subscribers do not have to poll, and the publisher does not need to know who they are.",
          "It models the natural way real-world events flow: a stock ticker emits a new price, every chart that subscribed receives it. Subscribers come and go without the publisher caring; the publisher emits without knowing what each subscriber will do with the event.",
          "All subscribers share the same notification interface, which is what makes this loose coupling work. Add a new subscriber type and the publisher needs no edits.",
        ],
        bullets: [
          "Use when changes to one object require updating others, and the set of others changes at runtime.",
          "Use when some objects must observe others only temporarily or in specific scenarios.",
          "Pro: new subscribers integrate without modifying the publisher (OCP); subscriptions are wired at runtime.",
          "Con: subscribers are notified in an unspecified order; surprise dependencies can creep in via events.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `type Listener<T> = (event: T) => void;

class EventEmitter<T> {
  private listeners = new Set<Listener<T>>();

  subscribe(fn: Listener<T>) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  emit(event: T) {
    this.listeners.forEach((fn) => fn(event));
  }
}

const stock = new EventEmitter<number>();
const unsub = stock.subscribe((price) => console.log("alert " + price));
stock.emit(101); // every listener is notified
unsub();`,
          },
          {
            language: "Go",
            code: `type Listener func(price int)

type StockTicker struct{ subs []Listener }

func (s *StockTicker) Subscribe(l Listener) func() {
	s.subs = append(s.subs, l)
	idx := len(s.subs) - 1
	return func() {
		s.subs = append(s.subs[:idx], s.subs[idx+1:]...)
	}
}

func (s *StockTicker) Emit(price int) {
	for _, l := range s.subs {
		l(price)
	}
}

func main() {
	ticker := &StockTicker{}
	unsub := ticker.Subscribe(func(p int) { fmt.Println("alert", p) })
	ticker.Emit(101)
	unsub()
}`,
          },
          {
            language: "Java",
            code: `interface PriceListener {
    void onPrice(int price);
}

class StockTicker {
    private final List<PriceListener> subs = new ArrayList<>();

    void subscribe(PriceListener l) { subs.add(l); }
    void unsubscribe(PriceListener l) { subs.remove(l); }

    void emit(int price) {
        for (PriceListener l : subs) l.onPrice(price);
    }
}

StockTicker ticker = new StockTicker();
PriceListener alert = p -> System.out.println("alert " + p);
ticker.subscribe(alert);
ticker.emit(101);`,
          },
        ],
      },
      {
        heading: "State",
        paragraphs: [
          "State lets an object alter its behavior when its internal state changes. From the outside it looks as if the object changed its class.",
          "Without it, you end up with methods that switch on a state field: a publish() method that behaves one way in Draft, another in Moderation, another in Published. Every change to the state machine forces edits in every method.",
          "With it, each state becomes its own class implementing a shared state interface. The context delegates calls to the current state object, and the transitions are just 'swap to a new state object'. Adding a new state means adding one class — nothing else has to change.",
        ],
        bullets: [
          "Use when an object behaves very differently depending on its state, and that state-specific code changes often.",
          "Use to replace huge conditionals based on a state field.",
          "Use when duplicate code appears across similar states or transitions.",
          "Pro: state-specific code is isolated (SRP); new states are additive (OCP); the context shrinks dramatically.",
          "Con: overkill for tiny state machines that rarely change.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `interface DocState {
  publish(doc: MyDocument): void;
}

class Draft implements DocState {
  publish(doc: MyDocument) {
    console.log("submitted to moderation");
    doc.setState(new Moderation());
  }
}

class Moderation implements DocState {
  publish(doc: MyDocument) {
    console.log("published");
    doc.setState(new Published());
  }
}

class Published implements DocState {
  publish() { console.log("already public"); }
}

class MyDocument {
  private state: DocState = new Draft();
  setState(s: DocState) { this.state = s; }
  publish() { this.state.publish(this); }
}

const doc = new MyDocument();
doc.publish(); // Draft -> Moderation
doc.publish(); // Moderation -> Published
doc.publish(); // already public`,
          },
          {
            language: "Go",
            code: `type DocState interface {
	Publish(d *Document)
}

type Document struct{ state DocState }

func (d *Document) SetState(s DocState) { d.state = s }
func (d *Document) Publish()            { d.state.Publish(d) }

type Draft struct{}

func (Draft) Publish(d *Document) {
	fmt.Println("submitted to moderation")
	d.SetState(Moderation{})
}

type Moderation struct{}

func (Moderation) Publish(d *Document) {
	fmt.Println("published")
	d.SetState(Published{})
}

type Published struct{}

func (Published) Publish(d *Document) { fmt.Println("already public") }`,
          },
          {
            language: "Java",
            code: `interface DocState {
    void publish(MyDocument doc);
}

class Draft implements DocState {
    public void publish(MyDocument doc) {
        System.out.println("submitted to moderation");
        doc.setState(new Moderation());
    }
}

class Moderation implements DocState {
    public void publish(MyDocument doc) {
        System.out.println("published");
        doc.setState(new Published());
    }
}

class Published implements DocState {
    public void publish(MyDocument doc) {
        System.out.println("already public");
    }
}

class MyDocument {
    private DocState state = new Draft();
    void setState(DocState s) { this.state = s; }
    void publish() { state.publish(this); }
}`,
          },
        ],
      },
      {
        heading: "Strategy",
        paragraphs: [
          "Strategy defines a family of algorithms, puts each one in its own class, and makes them interchangeable. The context (the class that uses the algorithm) holds a reference to a strategy object and delegates the actual work.",
          "It replaces the bloated class with a giant switch picking between car / walk / transit routing, each algorithm hidden in its own class with the same simple interface. The context never knows what kind of strategy it has.",
          "Compared to State (which is similar in shape), Strategy strategies are usually independent of each other — they do not transition between themselves. The client typically picks one and uses it for the whole operation.",
        ],
        bullets: [
          "Use when you want to switch algorithms at runtime.",
          "Use when you have many similar classes that differ only in how they execute a behavior.",
          "Use to isolate the algorithm from the business logic that calls it.",
          "Use to replace a massive conditional that selects among algorithm variants.",
          "Pro: swap algorithms at runtime; isolate algorithm details (SRP); replaces inheritance with composition; new strategies are additive (OCP).",
          "Con: overkill if you only have a couple of strategies that never change; clients must know enough to pick.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `interface RouteStrategy {
  build(from: string, to: string): string;
}

class CarStrategy implements RouteStrategy {
  build(from: string, to: string) {
    return "Driving: " + from + " -> " + to;
  }
}

class WalkStrategy implements RouteStrategy {
  build(from: string, to: string) {
    return "Walking: " + from + " -> " + to;
  }
}

class Navigator {
  constructor(private strategy: RouteStrategy) {}
  setStrategy(s: RouteStrategy) { this.strategy = s; }
  route(from: string, to: string) {
    return this.strategy.build(from, to);
  }
}

const nav = new Navigator(new CarStrategy());
console.log(nav.route("A", "B"));
nav.setStrategy(new WalkStrategy());
console.log(nav.route("A", "B"));`,
          },
          {
            language: "Go",
            code: `type RouteStrategy interface {
	Build(from, to string) string
}

type CarStrategy struct{}

func (CarStrategy) Build(from, to string) string {
	return "Driving: " + from + " -> " + to
}

type WalkStrategy struct{}

func (WalkStrategy) Build(from, to string) string {
	return "Walking: " + from + " -> " + to
}

type Navigator struct{ Strategy RouteStrategy }

func (n Navigator) Route(from, to string) string {
	return n.Strategy.Build(from, to)
}

func main() {
	nav := Navigator{Strategy: CarStrategy{}}
	fmt.Println(nav.Route("A", "B"))
	nav.Strategy = WalkStrategy{}
	fmt.Println(nav.Route("A", "B"))
}`,
          },
          {
            language: "Java",
            code: `interface RouteStrategy {
    String build(String from, String to);
}

class CarStrategy implements RouteStrategy {
    public String build(String from, String to) {
        return "Driving: " + from + " -> " + to;
    }
}

class WalkStrategy implements RouteStrategy {
    public String build(String from, String to) {
        return "Walking: " + from + " -> " + to;
    }
}

class Navigator {
    private RouteStrategy strategy;
    Navigator(RouteStrategy s) { this.strategy = s; }
    void setStrategy(RouteStrategy s) { this.strategy = s; }
    String route(String from, String to) {
        return strategy.build(from, to);
    }
}`,
          },
        ],
      },
      {
        heading: "Template Method",
        paragraphs: [
          "Template Method defines the skeleton of an algorithm in a base class and lets subclasses override individual steps without changing the overall structure.",
          "It is the cure for several classes that all perform 'load, transform, output' in the same order but differ in how each step works. Without the pattern, you copy the orchestration code three times and tweak it slightly in each subclass.",
          "With it, the base class owns the order; subclasses fill in the steps. Optional steps become 'hooks' with a default implementation that subclasses can override when needed.",
        ],
        bullets: [
          "Use when subclasses should extend only a few specific steps of an algorithm, not the whole thing.",
          "Use when several classes share an algorithm with minor variations between steps.",
          "Pro: clients can customize specific steps without touching the algorithm's structure; duplication is consolidated upward.",
          "Con: the fixed skeleton can feel restrictive; overriding steps can quietly violate LSP; many steps make the template hard to read.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `abstract class ReportBuilder {
  // Template method — the algorithm skeleton.
  build(): string {
    const data = this.loadData();
    const body = this.format(data);
    return this.wrap(body);
  }

  protected abstract loadData(): string[];
  protected abstract format(data: string[]): string;

  // Hook with a default; subclasses may override.
  protected wrap(body: string): string {
    return "REPORT\\n" + body;
  }
}

class CsvReport extends ReportBuilder {
  protected loadData() { return ["a,1", "b,2"]; }
  protected format(data: string[]) { return data.join("\\n"); }
}

class JsonReport extends ReportBuilder {
  protected loadData() { return ['{"a":1}']; }
  protected format(data: string[]) { return "[" + data.join(",") + "]"; }
}

console.log(new CsvReport().build());`,
          },
          {
            language: "Go",
            code: `// Go favors composition: the "template" is a function that
// drives an interface with the variable steps.
type ReportBuilder interface {
	LoadData() []string
	Format(data []string) string
}

func Build(b ReportBuilder) string {
	data := b.LoadData()
	body := b.Format(data)
	return "REPORT\\n" + body
}

type CsvReport struct{}

func (CsvReport) LoadData() []string       { return []string{"a,1", "b,2"} }
func (CsvReport) Format(d []string) string { return strings.Join(d, "\\n") }

func main() {
	fmt.Println(Build(CsvReport{}))
}`,
          },
          {
            language: "Java",
            code: `abstract class ReportBuilder {
    // Template method is final so the skeleton cannot be changed.
    final String build() {
        List<String> data = loadData();
        String body = format(data);
        return wrap(body);
    }

    protected abstract List<String> loadData();
    protected abstract String format(List<String> data);

    // Hook with a default implementation.
    protected String wrap(String body) {
        return "REPORT\\n" + body;
    }
}

class CsvReport extends ReportBuilder {
    protected List<String> loadData() { return List.of("a,1", "b,2"); }
    protected String format(List<String> d) { return String.join("\\n", d); }
}`,
          },
        ],
      },
      {
        heading: "Visitor",
        paragraphs: [
          "Visitor lets you separate an algorithm from the objects it operates on. New operations are added as new visitor classes; the element classes do not change.",
          "It is the pattern reached for when you have a stable hierarchy of element types and a growing set of operations on them — exporting to XML, computing area, validating, pricing — and you would rather not edit every element class every time a new operation appears.",
          "The mechanism is double dispatch: each element implements accept(visitor), which calls back the visitor method specific to that element type. The right behavior is selected by the type of both the element and the visitor — something a normal virtual call cannot do.",
        ],
        bullets: [
          "Use to perform an operation across all nodes of a complex object structure.",
          "Use to keep auxiliary behaviors (export, report, validate) out of the core domain classes.",
          "Use when a behavior makes sense only for some classes of a hierarchy.",
          "Pro: new operations are additive without touching elements (OCP); related operations live together (SRP); visitors can accumulate state during traversal.",
          "Con: adding or removing an element type forces updating every visitor; visitors may not see private state of elements.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `interface ShapeVisitor {
  visitCircle(c: Circle): void;
  visitSquare(s: Square): void;
}

interface Shape {
  accept(v: ShapeVisitor): void;
}

class Circle implements Shape {
  constructor(public radius: number) {}
  accept(v: ShapeVisitor) { v.visitCircle(this); }
}

class Square implements Shape {
  constructor(public side: number) {}
  accept(v: ShapeVisitor) { v.visitSquare(this); }
}

// A new operation lives entirely outside the shape classes.
class AreaVisitor implements ShapeVisitor {
  total = 0;
  visitCircle(c: Circle) { this.total += Math.PI * c.radius * c.radius; }
  visitSquare(s: Square) { this.total += s.side * s.side; }
}

const shapes: Shape[] = [new Circle(2), new Square(3)];
const area = new AreaVisitor();
shapes.forEach((s) => s.accept(area));
console.log(area.total);`,
          },
          {
            language: "Go",
            code: `type ShapeVisitor interface {
	VisitCircle(c Circle)
	VisitSquare(s Square)
}

type Shape interface {
	Accept(v ShapeVisitor)
}

type Circle struct{ Radius float64 }

func (c Circle) Accept(v ShapeVisitor) { v.VisitCircle(c) }

type Square struct{ Side float64 }

func (s Square) Accept(v ShapeVisitor) { v.VisitSquare(s) }

// New operation as a separate visitor.
type AreaVisitor struct{ Total float64 }

func (a *AreaVisitor) VisitCircle(c Circle) { a.Total += 3.14159 * c.Radius * c.Radius }
func (a *AreaVisitor) VisitSquare(s Square) { a.Total += s.Side * s.Side }

func main() {
	shapes := []Shape{Circle{Radius: 2}, Square{Side: 3}}
	area := &AreaVisitor{}
	for _, s := range shapes {
		s.Accept(area)
	}
	fmt.Println(area.Total)
}`,
          },
          {
            language: "Java",
            code: `interface ShapeVisitor {
    void visitCircle(Circle c);
    void visitSquare(Square s);
}

interface Shape {
    void accept(ShapeVisitor v);
}

class Circle implements Shape {
    final double radius;
    Circle(double r) { this.radius = r; }
    public void accept(ShapeVisitor v) { v.visitCircle(this); }
}

class Square implements Shape {
    final double side;
    Square(double s) { this.side = s; }
    public void accept(ShapeVisitor v) { v.visitSquare(this); }
}

class AreaVisitor implements ShapeVisitor {
    double total = 0;
    public void visitCircle(Circle c) {
        total += Math.PI * c.radius * c.radius;
    }
    public void visitSquare(Square s) {
        total += s.side * s.side;
    }
}`,
          },
        ],
      },
    ],
    takeaway:
      "Behavioral patterns route requests, events, and algorithms through interfaces so the callers and callees never depend on each other directly. Pick the one that names the problem: a chain of checks, a request-as-object, a traversal, a hub, a snapshot, a subscription, a state machine, an interchangeable algorithm, a fixed skeleton, or a new operation on a fixed hierarchy.",
  },
  {
    slug: "nextjs-rendering-strategies",
    title: "Next.js Rendering Strategies: SSR, SSG, ISR, RSC, PPR, Streaming, Edge, and SSE",
    section: "System Architecture",
    category: "Next.js",
    date: "May 27, 2026",
    readTime: "22 min read",
    excerpt:
      "Next.js gives you eight different ways to ship the same page. Pick wrong and the app is slow, stale, or expensive to run. Here is what each strategy actually does, when to reach for it, and how it looks in code.",
    tags: ["Next.js", "React", "SSR", "SSG", "ISR", "Edge", "Performance"],
    sections: [
      {
        heading: "Why rendering strategy is half your Next.js design",
        paragraphs: [
          "Most of what makes a Next.js app feel fast — or feel slow, or cost a lot to run — comes down to one decision per route: when do we render the HTML, and where? Build time, request time, after the page is on the client, or somewhere in between? Next.js lets you mix all of these in the same app, sometimes in the same page, and the App Router quietly does most of it by default.",
          "The cost of getting it wrong is bigger than it looks. A static marketing page accidentally turned dynamic (because someone read a cookie at the wrong layer) goes from CDN-served in a few milliseconds to hitting an origin server on every visit. A dashboard accidentally cached returns stale numbers to a finance team. A blog rebuilt fully on every deploy can take ten minutes when ISR would have finished it in seconds.",
          "Below is the full set: what each one means, how to opt into it in the App Router, when to use it, and the pitfalls to watch for. The examples all use TypeScript and Next.js 14 / 15 conventions.",
        ],
        bullets: [
          "SSR — render HTML on the server, fresh on every request.",
          "SSG — render HTML once at build time and serve it as static files.",
          "ISR — static, but periodically (or on-demand) regenerated.",
          "CSR — render only on the client with JavaScript.",
          "RSC — React Server Components that run on the server and ship no JS for themselves.",
          "Streaming SSR — flush HTML in chunks using Suspense.",
          "PPR — partial prerendering: static shell plus dynamic islands in one response.",
          "Edge runtime — run server code at the CDN edge instead of a regional origin.",
          "SSE — keep an HTTP stream open and push events from server to client.",
        ],
      },
      {
        heading: "SSR — Server-Side Rendering",
        paragraphs: [
          "SSR means the HTML is generated on the server every time a request comes in. The user gets fully-formed HTML on first paint, which is good for SEO and for any data that has to be fresh per request — a logged-in dashboard, a personalized feed, a real-time price.",
          "In the App Router you do not call a special function for SSR. A page becomes dynamic the moment you read something that varies per request: cookies(), headers(), searchParams, or a fetch() with cache: 'no-store'. You can also force it explicitly with `export const dynamic = 'force-dynamic'`. In the Pages Router the equivalent is getServerSideProps.",
          "The cost is real. Every request runs through your origin, which means slower TTFB than static and more compute on every visit. Use SSR when the data must be correct now and per user — not just because rendering on the server 'feels safer'.",
        ],
        bullets: [
          "Use when the page is personalized, authenticated, or shows data that must not be cached.",
          "App Router opts in automatically when you read cookies, headers, searchParams, or use uncached fetch.",
          "Pages Router uses getServerSideProps.",
          "Pro: always fresh, SEO-friendly, fully server-rendered HTML.",
          "Con: slowest of the server strategies; load scales with traffic; harder to put behind a CDN.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// app/dashboard/page.tsx
import { cookies } from "next/headers";

// Reading cookies forces this page to render per request.
export default async function Dashboard() {
  const session = (await cookies()).get("session")?.value;

  const user = await fetch("https://api.example.com/me", {
    headers: { Authorization: "Bearer " + (session ?? "") },
    cache: "no-store", // explicit opt out of caching
  }).then((r) => r.json());

  return (
    <main>
      <h1>Welcome {user.name}</h1>
      <p>Balance: {user.balance}</p>
    </main>
  );
}`,
          },
        ],
      },
      {
        heading: "SSG — Static Site Generation",
        paragraphs: [
          "SSG renders HTML once, at build time. The output is a plain file the CDN can serve in a few milliseconds, with no server work per request. For pages that change rarely, this is by far the cheapest and fastest option.",
          "In the App Router, a page is statically rendered by default unless something pushes it into dynamic mode. For dynamic routes you describe the set of paths to prerender with generateStaticParams(). The Pages Router equivalent is getStaticProps + getStaticPaths.",
          "The trade-off is freshness: data is frozen at build time. If your CMS publishes a typo correction five minutes after deploy, the live site still shows the typo until you rebuild. ISR (next section) is the usual answer.",
        ],
        bullets: [
          "Use for marketing pages, landing pages, docs, and any blog where rebuilds are acceptable.",
          "App Router: just an async server component with no dynamic inputs; add generateStaticParams() for dynamic routes.",
          "Pages Router: getStaticProps + getStaticPaths.",
          "Pro: fastest possible response; CDN-cacheable; scales for free.",
          "Con: data is only as fresh as your last build.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";

// Tells Next which slugs to prerender at build time.
export async function generateStaticParams() {
  const posts = await fetch("https://cms.example.com/posts").then((r) =>
    r.json(),
  );
  return posts.map((p: { slug: string }) => ({ slug: p.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetch("https://cms.example.com/posts/" + slug, {
    // force-cache is the default at build time; shown here for clarity.
    cache: "force-cache",
  }).then((r) => r.json());

  if (!post) notFound();
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.body}</div>
    </article>
  );
}`,
          },
        ],
      },
      {
        heading: "ISR — Incremental Static Regeneration",
        paragraphs: [
          "ISR is SSG with an expiry. Pages are served statically until their cache entry is older than a configured TTL; the next request after expiry gets the stale version while Next regenerates the page in the background, and the new version replaces the old one. From the user's perspective, the site is always fast; from the operator's perspective, content updates automatically without a redeploy.",
          "In the App Router you control it with `export const revalidate = N` (seconds) at the route level, or per-fetch with `next: { revalidate: N, tags: [...] }`. The Pages Router equivalent is `revalidate` returned from getStaticProps.",
          "ISR also supports on-demand revalidation. When a CMS publishes new content, hit a webhook that calls revalidatePath() or revalidateTag() and the affected pages refresh immediately — no waiting for the TTL, no full rebuild.",
        ],
        bullets: [
          "Use for content that updates predictably (every minute, every hour) or via CMS webhooks.",
          "Time-based: `export const revalidate = 60` or fetch with `next: { revalidate: 60 }`.",
          "Tag-based on-demand: tag your fetches and call revalidateTag('news') from a server action.",
          "Pro: as fast as static, but data stays fresh without rebuilds.",
          "Con: a user can occasionally see a stale page; tags and timings have to be planned.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// app/news/page.tsx
// Whole page is cached and re-generated at most every 60 seconds.
export const revalidate = 60;

export default async function News() {
  const articles = await fetch("https://api.example.com/news", {
    next: { revalidate: 60, tags: ["news"] },
  }).then((r) => r.json());

  return (
    <ul>
      {articles.map((a: { id: string; title: string }) => (
        <li key={a.id}>{a.title}</li>
      ))}
    </ul>
  );
}

// app/api/cms-hook/route.ts — call this from your CMS webhook.
import { revalidateTag } from "next/cache";

export async function POST() {
  revalidateTag("news"); // every fetch tagged "news" is now stale
  return Response.json({ ok: true });
}`,
          },
        ],
      },
      {
        heading: "CSR — Client-Side Rendering",
        paragraphs: [
          "CSR means the server sends a near-empty HTML shell and the browser executes JavaScript to fetch data and render the UI. In Next.js this is what happens inside any component marked `\"use client\"` that fetches data in useEffect or via a library like SWR / React Query.",
          "CSR is the right choice for highly interactive surfaces — dashboards with frequent polling, infinite scroll feeds, real-time editors — where the value of streaming a fully-rendered HTML on first load is small compared to the JS that has to run anyway.",
          "The downside is the loading flash and worse SEO. Search crawlers see the empty shell. Time-to-first-content is held hostage by the network latency of the data call, not by the HTML response. Most Next.js apps use CSR for parts of a page, not the whole page.",
        ],
        bullets: [
          "Use for interactive widgets and pages where the JS has to run anyway.",
          "Implement with `\"use client\"` + useState/useEffect, or a data library like SWR.",
          "Pro: maximum interactivity; light server load; reactive updates feel natural.",
          "Con: empty shell hurts SEO; loading flashes; bigger JS bundle on the client.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `"use client";
import { useEffect, useState } from "react";

export default function LivePrices() {
  const [prices, setPrices] = useState<number[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    const tick = async () => {
      const data = await fetch("/api/prices").then((r) => r.json());
      if (!cancelled) setPrices(data);
    };

    tick();
    const id = setInterval(tick, 5000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (!prices) return <p>Loading...</p>;
  return (
    <ul>
      {prices.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  );
}`,
          },
        ],
      },
      {
        heading: "RSC — React Server Components",
        paragraphs: [
          "React Server Components are the default in the App Router. They run only on the server, can be async, can hit a database or filesystem directly, and ship no JavaScript for themselves to the client. They are the reason an App Router page can fetch from your DB inside the component without an API layer in between.",
          "The mental model: a Server Component is a React component that produces a chunk of HTML (and a small description of any client components inside it). It cannot use useState or onClick because it does not run in the browser. To add interactivity, drop in a Client Component (`\"use client\"`); the server renders around it and the client takes over for that subtree.",
          "Server-only modules (database clients, secrets, file system) live safely inside RSC because the file never reaches the browser. If you accidentally import a server-only module in a client component, Next.js fails the build instead of leaking it.",
        ],
        bullets: [
          "Default in the App Router; opt out with `\"use client\"` at the top of a component file.",
          "Async by default — fetch data inline with await.",
          "Cannot use state, effects, or event handlers; pass data down to client components for those.",
          "Pro: smaller client bundle; data fetching close to the source; safe by construction.",
          "Con: rules around server/client boundaries take time to learn; serializable props only.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// app/users/page.tsx
// No "use client" -> this is a Server Component.
import { db } from "@/lib/db"; // server-only module
import UserActions from "./UserActions"; // a client component

export default async function Users() {
  // Run SQL directly on the server. No JS for this query is ever shipped.
  const users = await db.query("SELECT id, name FROM users LIMIT 50");

  return (
    <ul>
      {users.map((u: { id: number; name: string }) => (
        <li key={u.id}>
          {u.name}
          {/* Client island for interactivity. */}
          <UserActions userId={u.id} />
        </li>
      ))}
    </ul>
  );
}`,
          },
        ],
      },
      {
        heading: "Streaming SSR with Suspense",
        paragraphs: [
          "Streaming is what happens when the server flushes HTML in pieces over a single HTTP response instead of waiting until the whole page is ready. The user sees the static header, navigation, and any already-resolved content immediately; the slow parts arrive a moment later and slot into the placeholders.",
          "In the App Router you get streaming for free by wrapping a slow async server component in <Suspense>. Anything above the boundary is sent first; the component inside resolves on its own timeline and is streamed in as soon as it is ready. The `loading.tsx` file at any route segment is sugar for the same idea — it wraps the segment in a Suspense boundary with that fallback.",
          "Streaming does not change what is rendered; it changes when each piece is flushed. It pairs naturally with the other strategies — you can stream parts of an SSR page, an RSC tree, or a PPR page.",
        ],
        bullets: [
          "Use to ship the fast bits of a page first while slower fetches finish.",
          "Wrap async server components in <Suspense fallback={...}>.",
          "Drop a loading.tsx alongside page.tsx to wrap the whole segment automatically.",
          "Pro: dramatically better perceived performance; no extra code on the client.",
          "Con: streamed fragments can shift layout if fallbacks are not sized; some CDNs need configuration to pass chunked responses through.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// app/dashboard/page.tsx
import { Suspense } from "react";

async function Stats() {
  // Pretend this takes 1.5s.
  const stats = await fetch("https://api.example.com/stats", {
    cache: "no-store",
  }).then((r) => r.json());
  return <pre>{JSON.stringify(stats, null, 2)}</pre>;
}

async function Activity() {
  const activity = await fetch("https://api.example.com/activity").then((r) =>
    r.json(),
  );
  return <pre>{JSON.stringify(activity, null, 2)}</pre>;
}

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This shell is flushed first.</p>

      <Suspense fallback={<p>Loading stats...</p>}>
        <Stats />
      </Suspense>

      <Suspense fallback={<p>Loading activity...</p>}>
        <Activity />
      </Suspense>
    </div>
  );
}`,
          },
        ],
      },
      {
        heading: "PPR — Partial Prerendering",
        paragraphs: [
          "Partial Prerendering, introduced as experimental in Next.js 14 and more stable in 15, is the natural endgame of mixing static and dynamic in the same page. The static shell of a route is prerendered into a single HTML response; everything that depends on the request (cookies, search params, uncached fetches) is rendered dynamically and streamed into Suspense holes in that shell.",
          "The benefit is concrete: the user gets a CDN-fast first byte with the product description, layout, hero image, footer — all the parts that never change per user — and the cart count, recommendations, or live price slot in a moment later. You stop having to choose 'is this whole route static or whole route dynamic' for pages that are clearly both.",
          "Enable PPR in next.config (incremental mode lets you opt in route by route) and add `export const experimental_ppr = true` on the routes that should use it. Wrap the dynamic islands in <Suspense>.",
        ],
        bullets: [
          "Use for pages that are mostly static but have a small dynamic island (cart, user badge, live price).",
          "Turn on `experimental.ppr = 'incremental'` in next.config and `experimental_ppr = true` per route.",
          "Wrap dynamic parts in <Suspense> so the static shell can be prerendered around them.",
          "Pro: best of both worlds — static speed, dynamic correctness — in one response.",
          "Con: still maturing; some debugging surprises around what counts as dynamic; not all hosting providers support it equally.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// next.config.ts
// experimental: { ppr: "incremental" }

// app/product/[id]/page.tsx
import { Suspense } from "react";
import { cookies } from "next/headers";

export const experimental_ppr = true;

async function Cart() {
  // Per-user, per-request — must be dynamic.
  const sid = (await cookies()).get("sid")?.value;
  const items = await fetch("https://api.example.com/cart?sid=" + sid, {
    cache: "no-store",
  }).then((r) => r.json());
  return <aside>Cart: {items.length} items</aside>;
}

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Static product info -> prerendered into the shell.
  const product = await fetch("https://cms.example.com/products/" + id).then(
    (r) => r.json(),
  );

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.description}</p>

      <Suspense fallback={<aside>Loading cart...</aside>}>
        <Cart />
      </Suspense>
    </main>
  );
}`,
          },
        ],
      },
      {
        heading: "Edge Runtime vs Node Runtime",
        paragraphs: [
          "Every route in Next.js runs on one of two runtimes: the Node runtime (a regular Node.js server in one region) or the Edge runtime (a V8 isolate replicated across the CDN's points of presence, closer to your users). You choose with `export const runtime = 'edge'` or `'nodejs'` on a route, middleware, or layout. Middleware always runs on Edge.",
          "Edge is great for routing decisions, geolocation, A/B test bucketing, redirects, and small dynamic responses where latency dominates: it can run within ~30ms of the user. The price is a stripped-down runtime — no Node APIs, no native modules, limited CPU and memory, smaller bundle ceiling. Anything that needs the full Node API (Postgres clients, image processing, large libraries) must stay on the Node runtime.",
          "Edge is not a rendering strategy on its own — it is a deploy target for SSR, RSC, route handlers, and middleware. You can do SSR on Edge or on Node; the rendering logic is the same.",
        ],
        bullets: [
          "Use Edge for small, latency-sensitive code: redirects, geolocation, auth checks, AI proxies, streaming responses.",
          "Stay on Node for heavy work, native modules, or anything needing the full Node API.",
          "Set per-route: `export const runtime = \"edge\";` or `\"nodejs\";`.",
          "Pro: ~30ms to user globally; cheap; auto-scaled by the CDN.",
          "Con: limited APIs and resources; harder to debug; not always cheaper for high CPU work.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// app/api/geo/route.ts
import { NextRequest } from "next/server";

// Run this route on the edge network instead of a Node origin.
export const runtime = "edge";

export async function GET(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country") ?? "unknown";
  const city = req.headers.get("x-vercel-ip-city") ?? "unknown";
  return Response.json({ country, city });
}

// middleware.ts — middleware always runs on Edge.
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country");
  if (country === "TH") {
    return NextResponse.rewrite(new URL("/th" + req.nextUrl.pathname, req.url));
  }
  return NextResponse.next();
}`,
          },
        ],
      },
      {
        heading: "SSE — Server-Sent Events for real-time streaming",
        paragraphs: [
          "SSE is not a rendering strategy — it is a transport. The server keeps a single HTTP response open and pushes a stream of text events to the browser; the browser consumes them with the built-in EventSource API. Compared to WebSockets, SSE is one-way (server → client only), works over normal HTTP, auto-reconnects on disconnect, and is by far the simplest way to push updates.",
          "In Next.js you implement SSE in a Route Handler that returns a Response wrapping a ReadableStream, with Content-Type 'text/event-stream'. Each message follows the SSE wire format: `data: <payload>` followed by a blank line. The client reads `e.data` from EventSource onmessage.",
          "This is the standard way to stream AI tokens (LLM responses) into a chat UI, push live counters into a dashboard, or trickle notifications to a logged-in tab. For two-way communication or binary data, reach for WebSockets instead.",
        ],
        bullets: [
          "Use for one-way server-to-client pushes: AI token streaming, live counters, notifications.",
          "Server: a Route Handler returning a ReadableStream with Content-Type 'text/event-stream'.",
          "Client: const es = new EventSource('/api/stream'); es.onmessage = (e) => ....",
          "Pro: trivial protocol; works through proxies; auto-reconnects; one HTTP connection.",
          "Con: one direction only; some legacy CDNs/proxies buffer streams; not for binary payloads.",
        ],
        code: [
          {
            language: "TypeScript",
            code: `// app/api/stream/route.ts
export const runtime = "nodejs";

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 5; i++) {
        // SSE wire format: "data: <payload>\\n\\n"
        const payload =
          "data: " + JSON.stringify({ tick: i }) + "\\n\\n";
        controller.enqueue(encoder.encode(payload));
        await new Promise((r) => setTimeout(r, 1000));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

// app/ticker/Ticker.tsx — client side.
"use client";
import { useEffect, useState } from "react";

export default function Ticker() {
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const source = new EventSource("/api/stream");
    source.onmessage = (e) => setEvents((prev) => [...prev, e.data]);
    source.onerror = () => source.close();
    return () => source.close();
  }, []);

  return <pre>{events.join("\\n")}</pre>;
}`,
          },
        ],
      },
      {
        heading: "How to choose",
        paragraphs: [
          "Start with what the data needs, not what the framework defaults to. If the page has no per-user data and only changes when content is published, you want SSG or ISR. If it must reflect the current user or current minute, you want SSR or RSC. If it is mostly static with a small live island, PPR fits exactly. If it is interactive enough that the JS has to run anyway, CSR is fine.",
          "Then add streaming wherever a single slow fetch is holding the rest of the page hostage. And use the Edge runtime for tiny, latency-sensitive endpoints — auth checks, AI proxies, geolocation rewrites — but keep heavy work on Node.",
          "A pragmatic default for a new App Router project: RSC + ISR for everything, Suspense around any slow async tree, sprinkle CSR for interactive widgets, and turn on PPR once your hosting platform supports it.",
        ],
        bullets: [
          "Marketing / docs / static blog → SSG (or ISR if content changes via CMS).",
          "CMS-driven pages → ISR with revalidate + tag-based on-demand revalidation.",
          "Personalized dashboard / authenticated views → SSR or RSC with no-store fetch.",
          "Mostly static with a dynamic island (cart, badge) → PPR + Suspense.",
          "Highly interactive widget (editor, infinite feed) → CSR inside a server-rendered shell.",
          "Slow async tree blocking a fast shell → wrap in <Suspense> for streaming.",
          "Tiny latency-critical endpoint (redirect, geo, AI proxy) → Edge runtime.",
          "Real-time push (AI tokens, live counters, notifications) → SSE.",
        ],
      },
    ],
    takeaway:
      "There is no single right rendering strategy in Next.js — only the right one per route, and sometimes per fragment. Match the data's freshness requirements first, layer streaming on top for perceived speed, and only fall back to fully dynamic rendering when something really must run on every request.",
  },
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
