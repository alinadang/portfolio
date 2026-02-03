"use client";
import { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  // contact popouts state (hero + footer)
  const [heroContactOpen, setHeroContactOpen] = useState(false);
  const [footerContactOpen, setFooterContactOpen] = useState(false);

  const heroContactRef = useRef<HTMLDivElement | null>(null);
  const footerContactRef = useRef<HTMLDivElement | null>(null);

  // scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "contact"];
      let current = "home";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= 100) {
            current = id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // helper: close popout only if focus left the wrapper
  const handleBlurChecker =
    (ref: React.RefObject<HTMLElement>, setter: (v: boolean) => void) =>
    () => {
      // small timeout to allow focus to move to a menu item inside the wrapper
      setTimeout(() => {
        if (!ref.current) {
          setter(false);
          return;
        }
        const active = document.activeElement;
        if (!ref.current.contains(active)) setter(false);
      }, 100);
    };

  return (
    <main className="flex flex-col min-h-screen scroll-smooth bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-lg font-bold text-blue-400">Alina Dang</h1>
          <div className="flex items-center gap-6 text-gray-300 font-medium">
            <a
              href="#home"
              className={`transition ${
                activeSection === "home"
                  ? "text-blue-400 font-semibold"
                  : "hover:text-blue-400"
              }`}
            >
              Home
            </a>
            <a
              href="#projects"
              className={`transition ${
                activeSection === "projects"
                  ? "text-blue-400 font-semibold"
                  : "hover:text-blue-400"
              }`}
            >
              Projects
            </a>
            <a
              href="#contact"
              className={`transition ${
                activeSection === "contact"
                  ? "text-blue-400 font-semibold"
                  : "hover:text-blue-400"
              }`}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        id="home"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center max-w-3xl mx-auto px-6 pt-40 pb-24"
      >
        <h1 className="text-6xl font-extrabold tracking-tight mb-6">
          Hi, I’m <span className="text-blue-400">Alina</span>
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          I’m a second-year student at Duke University studying{" "}
          <span className="text-blue-400 font-medium">Computer Science</span>{" "}
          and <span className="text-blue-400 font-medium">Economics</span>. I am
          passionate about building full-stack applications,{" "}
          <span className="text-blue-400 font-medium">product-driven experiences</span>,
          and solving real-world problems using modern, scalable solutions.
        </p>

        {/* Open-to Roles — static badges */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <span className="px-5 py-2 rounded-full bg-white/6 text-white/90 border border-white/8 text-sm shadow-sm">
            Software Engineering
          </span>

          <span className="px-5 py-2 rounded-full bg-white/6 text-white/90 border border-white/8 text-sm shadow-sm">
            Product Management
          </span>
        </div>

        {/* Top action group: Contact (with popout) / GitHub / LinkedIn */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Contact - bordered style to match GitHub/LinkedIn */}
            <div
              ref={heroContactRef}
              className="relative"
              onMouseEnter={() => setHeroContactOpen(true)}
              onMouseLeave={() => setHeroContactOpen(false)}
              onBlur={handleBlurChecker(heroContactRef, setHeroContactOpen)}
            >
              <button
                onFocus={() => setHeroContactOpen(true)}
                aria-haspopup="menu"
                aria-expanded={heroContactOpen}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-lg border border-gray-700 bg-transparent text-white/90 hover:bg-white/3 transition focus:outline-none focus:ring-2 focus:ring-blue-400/30"
              >
                <FaEnvelope size={18} />
                <span>Contact Me</span>
              </button>

              {/* Popout menu */}
              <div
                role="menu"
                aria-label="Contact emails"
                className={`absolute left-1/2 transform -translate-x-1/2 mt-3 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 z-40 transition-opacity ${
                  heroContactOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <a
                  href="mailto:alinadang06@gmail.com"
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                  role="menuitem"
                >
                  Primary: alinadang06@gmail.com
                </a>
                <a
                  href="mailto:ad621@duke.edu"
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                  role="menuitem"
                >
                  Secondary: ad621@duke.edu
                </a>
              </div>
            </div>

            {/* GitHub */}
            <a
              href="https://github.com/alinadang"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg border border-gray-700 bg-transparent text-white/90 hover:bg-white/3 transition"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
              <span>GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/alina-dang-8358692a6/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg border border-gray-700 bg-transparent text-white/90 hover:bg-white/3 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Moved: View Projects (subtle, below the buttons) */}
          <a
            href="#projects"
            className="text-sm text-gray-300 hover:text-blue-400 underline"
          >
            View Projects
          </a>
        </div>
      </motion.section>

      {/* Projects Section */}
      <section
        id="projects"
        className="w-full max-w-5xl mx-auto px-6 py-20 scroll-mt-24"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">
          Projects
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Predicting Student Decisions (Internship)",
              desc: "Developed during my Data+ 2025 Summer Internship. Built machine learning models to predict student decision outcomes using demographic and behavioral data. Focused on model accuracy, interpretability, and actionable insights.",
              poster: "/predicting-student-decisions-poster.pdf",
              link: "https://github.com/Data-2025-Summer-Project/Predicting_Student_Decisions",
              private: true,
            },
            {
              title: "Mini Amazon",
              desc: "A full-stack e-commerce-style application inspired by Amazon. Implements product listings, user interactions, and backend logic with a focus on scalability and clean architecture.",
              link: "https://github.com/alinadang/mini-amazon",
              private: false,
            },
            {
              title: "Email Style Rewriter",
              desc: "A chrome extension that rewrites emails in different tones and styles using AI. Designed to help users quickly refine professional, casual, or persuasive communication.",
              link: "https://github.com/alinadang/email-style-rewriter",
              private: false,
            },
            {
              title: "Portfolio Website",
              desc: "The site you’re looking at right now — built with Next.js and Tailwind CSS, deployed on Vercel.",
              link: "https://github.com/alinadang/portfolio",
              private: false,
            },
          ].map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800 text-gray-100 rounded-2xl shadow-lg p-6 hover:shadow-blue-500/40 hover:-translate-y-1 transition"
            >
              <h3 className="text-2xl font-semibold mb-3">{proj.title}</h3>
              <p className="text-gray-400 mb-4">{proj.desc}</p>
              <div className="flex flex-col gap-2">
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 font-medium hover:underline"
                >
                  {proj.private
                    ? "GitHub (Private Repository)"
                    : "View on GitHub →"}
                </a>

                {proj.poster && (
                  <a
                    href={proj.poster}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 hover:text-blue-400 underline"
                  >
                    View Project Poster (PDF)
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-10 text-sm text-gray-400 border-t border-gray-800 w-full text-center scroll-mt-24"
      >
        <p>© {new Date().getFullYear()} Alina Dang</p>
        <p className="mt-2">
          Primary:{" "}
          <a
            href="mailto:alinadang06@gmail.com"
            className="text-blue-400 hover:underline"
          >
            alinadang06@gmail.com
          </a>
        </p>
        <p>
          Secondary:{" "}
          <a
            href="mailto:ad621@duke.edu"
            className="text-blue-400 hover:underline"
          >
            ad621@duke.edu
          </a>
        </p>

        {/* Footer Buttons (Contact with popout + GitHub + LinkedIn) */}
        <div className="flex justify-center gap-4 mt-4">
          <div
            ref={footerContactRef}
            className="relative"
            onMouseEnter={() => setFooterContactOpen(true)}
            onMouseLeave={() => setFooterContactOpen(false)}
            onBlur={handleBlurChecker(footerContactRef, setFooterContactOpen)}
          >
            <button
              onFocus={() => setFooterContactOpen(true)}
              aria-haspopup="menu"
              aria-expanded={footerContactOpen}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-lg border border-gray-700 bg-transparent text-white/90 hover:bg-white/3 transition focus:outline-none focus:ring-2 focus:ring-blue-400/30"
            >
              <FaEnvelope size={18} />
              <span>Contact Me</span>
            </button>

            <div
              role="menu"
              aria-label="Contact emails"
              className={`absolute left-1/2 transform -translate-x-1/2 mt-3 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 z-40 transition-opacity ${
                footerContactOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <a
                href="mailto:alinadang06@gmail.com"
                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                role="menuitem"
              >
                Primary: alinadang06@gmail.com
              </a>
              <a
                href="mailto:ad621@duke.edu"
                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                role="menuitem"
              >
                Secondary: ad621@duke.edu
              </a>
            </div>
          </div>

          <a
            href="https://github.com/alinadang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-lg border border-gray-700 bg-transparent text-white/90 hover:bg-white/3 transition"
          >
            <FaGithub size={18} />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/alina-dang-8358692a6/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-lg border border-gray-700 bg-transparent text-white/90 hover:bg-white/3 transition"
          >
            <FaLinkedin size={18} />
            <span>LinkedIn</span>
          </a>
        </div>
      </motion.footer>
    </main>
  );
}
