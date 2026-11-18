import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const projects = [
  {
    index: "01",
    title: "Async LLM Gateway",
    eyebrow: "Distributed AI infrastructure",
    description: "An asynchronous reverse-proxy gateway that routes chat workloads across OpenAI, Anthropic, and Groq with graceful provider failover.",
    tags: ["FastAPI", "Redis", "Asyncio", "Pydantic"],
    accent: "teal",
  },
  {
    index: "02",
    title: "AegisRAG",
    eyebrow: "Secure document intelligence",
    description: "An enterprise ingestion API that parses, chunks, sanitizes, and indexes knowledge while redacting PII and filtering prompt injection.",
    tags: ["Python", "FAISS", "LangChain", "Ragas"],
    accent: "violet",
  },
  {
    index: "03",
    title: "Tree Retrieval Engine",
    eyebrow: "Vectorless retrieval",
    description: "A hierarchical retrieval backend that uses tree-based summaries and contextual traversal rather than a conventional vector database.",
    tags: ["LLMs", "Python", "AWS S3", "REST API"],
    accent: "orange",
  },
];

const skillGroups = [
  { label: "Languages", items: ["Python", "Java", "JavaScript", "SQL", "C++"] },
  { label: "Frameworks", items: ["Django", "FastAPI", "React", "Spring Boot", "LangChain"] },
  { label: "Systems", items: ["PostgreSQL", "Docker", "Git", "Jenkins", "Linux"] },
];

function Arrow({ diagonal = false }) {
  return <span className={diagonal ? "arrow diagonal" : "arrow"} aria-hidden="true">↗</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });
    try {
      const response = await fetch(import.meta.env.VITE_API_URL || "http://localhost:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Something went wrong.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus({ type: "success", message: data.detail });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to send your message. Please email me directly." });
    }
  };

  return (
    <main>
      <nav className="nav container">
        <button className="brand" onClick={() => scrollTo("top")} aria-label="Back to top">GR<span>.</span></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu <span>+</span></button>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <button onClick={() => scrollTo("work")}>Work</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
        </div>
      </nav>

      <section className="hero container" id="top">
        <div className="hero-copy">
          <p className="eyebrow reveal">Full-stack engineer · India</p>
          <h1 className="reveal delay-1">Building systems<br />that <em>think</em> clearly.</h1>
          <p className="hero-intro reveal delay-2">I’m Gobinath — a full-stack engineer focused on reliable backend architecture, intelligent products, and thoughtful developer experiences.</p>
          <div className="hero-actions reveal delay-3">
            <button className="button primary" onClick={() => scrollTo("work")}>Explore my work <Arrow /></button>
            <a className="text-link" href="https://github.com/gobinathr-it" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
          </div>
        </div>
        <div className="hero-art reveal delay-2" aria-hidden="true">
          <div className="grid-orb"><div className="orb-core" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><span className="node node-a" /><span className="node node-b" /><span className="node node-c" /></div>
          <p>Systematic<br /><i>by design</i></p>
        </div>
        <div className="hero-meta reveal delay-3"><span>Scroll to discover</span><span className="line" /><span>2026</span></div>
      </section>

      <section className="statement" id="about">
        <div className="container statement-inner">
          <p className="section-label">01 / About</p>
          <div>
            <h2>Complex problems deserve <em>calm</em> systems.</h2>
            <p className="body-copy">I enjoy translating fuzzy ideas into robust services — from secure API layers and relational schemas to LLM workflows that earn a place in production. My approach balances useful intelligence with dependable engineering.</p>
            <div className="about-facts"><span>Python / Django / FastAPI</span><span>React / JavaScript</span><span>AI &amp; Retrieval Systems</span></div>
          </div>
        </div>
      </section>

      <section className="work container" id="work">
        <div className="section-head"><p className="section-label">02 / Selected work</p><p>Projects shaped around performance, safety, and useful AI.</p></div>
        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card ${project.accent}`} key={project.title}>
              <div className="project-top"><span>{project.index}</span><span className="project-glyph">✦</span></div>
              <div><p className="project-eyebrow">{project.eyebrow}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p></div>
              <div className="project-bottom"><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href="https://github.com/gobinathr-it" target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}><Arrow diagonal /></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience">
        <div className="container experience-inner">
          <p className="section-label">03 / Experience</p>
          <div className="experience-entry"><div><p className="date">Jun 2026 — Sep 2026</p><p className="place">Delhi, India</p></div><div><h3>Python Developer Intern</h3><p className="company">Uptoskills</p><p>Built FastAPI modules and secure REST APIs for business workflows. Led backend development for an AI medical-report summarizer, turning unstructured PDFs into machine-readable, translated clinical data.</p></div></div>
          <div className="education-row"><span>Education</span><span>B.Tech, Information Technology</span><span>J.K.K. Nataraja College of Engineering &amp; Technology</span><span>2024 — 2028</span></div>
        </div>
      </section>

      <section className="skills container">
        <div className="section-head"><p className="section-label">04 / Toolkit</p><p>A practical stack for shipping resilient products.</p></div>
        <div className="skill-grid">{skillGroups.map((group) => <div className="skill-group" key={group.label}><p>{group.label}</p>{group.items.map((item) => <span key={item}>{item}</span>)}</div>)}</div>
      </section>

      <section className="contact" id="contact">
        <div className="container contact-grid">
          <div><p className="section-label">05 / Contact</p><h2>Let’s build something with <em>intent.</em></h2><p>Have a backend challenge, AI idea, or product to shape? I’d love to hear about it.</p><a className="email-link" href="mailto:gobinathr.tech@gmail.com">gobinathr.tech@gmail.com <Arrow diagonal /></a><div className="socials"><a href="https://linkedin.com/in/gobinathrit" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/gobinathr-it" target="_blank" rel="noreferrer">GitHub</a></div></div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /></label>
            <label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label>
            <label>Subject<input required value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="What’s on your mind?" /></label>
            <label>Message<textarea required rows="4" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell me a little about the project..." /></label>
            <button className="button primary" disabled={status.type === "loading"}>{status.type === "loading" ? "Sending..." : <>Send message <Arrow /></>}</button>
            {status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}
          </form>
        </div>
      </section>

      <footer className="footer container"><span>© 2026 Gobinath R</span><span>Designed &amp; engineered with intent.</span><button onClick={() => scrollTo("top")}>Back to top ↑</button></footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
