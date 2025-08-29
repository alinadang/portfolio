"use client";
import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

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
        <p className="text-xl text-gray-300 leading-relaxed mb-10">
          I’m a second-year student at Duke University studying{" "}
          <span className="text-blue-400 font-medium">Computer Science</span>{" "}
          and <span className="text-blue-400 font-medium">Economics</span>. I am
          passionate about building full-stack applications and solving
          real-world problems using modern, scalable solutions.
        </p>
        <div className="flex gap-6 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 rounded-xl bg-blue-500 text-white font-medium shadow-lg hover:bg-blue-600 transition"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-xl border border-gray-700 bg-gray-800 font-medium hover:bg-gray-700 transition"
          >
            Contact Me
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
              link: "https://github.com/Data-2025-Summer-Project/Predicting_Student_Decisions",
              private: true,
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

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-4 text-lg">
          <a
            href="https://www.linkedin.com/in/alina-dang-8358692a6/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href="https://github.com/alinadang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition"
          >
            <FaGithub size={28} />
          </a>
        </div>
      </motion.footer>
    </main>
  );
}
