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
  | "Pattern Design"
  | "System Architecture"
  | "Learn";

export const BLOG_SECTIONS: BlogSectionGroup[] = [
  "Projects",
  "Pattern Design",
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
    slug: "shipping-ai-products-without-fake-magic",
    title: "Shipping AI Products Without Fake Magic",
    section: "Projects",
    category: "AI Product",
    date: "May 12, 2026",
    readTime: "7 min read",
    excerpt:
      "The fastest way to lose trust in an AI feature is to promise intelligence when the product still behaves like a demo.",
    tags: ["OpenAI", "UX", "RAG", "Product Strategy"],
    sections: [
      {
        heading: "Start with the workflow, not the model",
        paragraphs: [
          "Most AI features fail because the team starts by picking a model and only later asks what user problem it should solve.",
          "A stronger approach is to map the exact moment where a user is blocked, then decide whether AI should summarize, classify, generate, or retrieve the next useful step.",
        ],
        bullets: [
          "Define the user action that must become faster or clearer.",
          "Limit the first version to one obvious job.",
          "Measure whether the output reduces manual work.",
        ],
      },
      {
        heading: "Design for verification",
        paragraphs: [
          "Good AI UX does not pretend the answer is always correct. It gives users enough context to verify the response quickly.",
          "That means clear citations, visible source data, and interfaces that make editing the draft easier than rewriting it from scratch.",
        ],
      },
      {
        heading: "Production quality is mostly systems work",
        paragraphs: [
          "Once the demo is approved, the real effort starts: prompt versioning, fallback handling, latency budgets, logging, and safe retries.",
          "Teams that treat these concerns as core product work ship slower at first, but they avoid the expensive rewrite that usually follows a flashy prototype.",
        ],
      },
    ],
    takeaway:
      "Useful AI feels dependable before it feels impressive. The product should help users judge the answer, not just admire it.",
  },
  {
    slug: "why-portfolios-should-feel-fast",
    title: "Why Portfolios Should Feel Fast Before They Feel Fancy",
    section: "Pattern Design",
    category: "Frontend",
    date: "April 28, 2026",
    readTime: "5 min read",
    excerpt:
      "A portfolio is a product pitch. If it stutters, hides the message, or makes the reader work too hard, it undercuts the case immediately.",
    tags: ["Next.js", "Performance", "Motion", "Design"],
    sections: [
      {
        heading: "The first screen carries the argument",
        paragraphs: [
          "A visitor decides within seconds whether the site feels serious. Typography, spacing, and load behavior communicate more than a long introduction ever will.",
          "The hero should answer three things quickly: who you are, what you build, and why the work matters.",
        ],
      },
      {
        heading: "Motion needs a job",
        paragraphs: [
          "Animation is valuable when it guides attention or reinforces hierarchy. It becomes noise when it delays reading or competes with the actual message.",
          "Parallax, video, and layered backgrounds can work well, but only if the text remains stable and easy to parse.",
        ],
        bullets: [
          "Keep the content readable during motion.",
          "Prefer subtle depth over constant movement.",
          "Treat loading states as part of the brand impression.",
        ],
      },
      {
        heading: "Structured content beats decorative content",
        paragraphs: [
          "Case studies, measurable outcomes, and clearly grouped experience sections make the strongest portfolios easier to scan.",
          "When the content model is solid, the visual layer can become more expressive without losing clarity.",
        ],
      },
    ],
    takeaway:
      "A portfolio should look deliberate, but its main job is to make confidence easy for the reader.",
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
    slug: "solid-principles-in-practice",
    title: "SOLID Principles in Practice",
    section: "Pattern Design",
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
    section: "Pattern Design",
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
    section: "Pattern Design",
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
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
