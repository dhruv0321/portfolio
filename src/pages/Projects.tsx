import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router';
import Layout from '../components/Layout';

interface Project {
  id: number;
  title: string;
  description: string;
  bullets: string[];
  technologies: string[];
  image: string;
  context: string;
  link?: string;
  demoRoute?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Mettl Secure Browser',
    description: 'A macOS secure browser for proctored assessments, built on ElectronJS with deep native system integration via custom Node.js addons.',
    bullets: [
      'Core security features built as native Node.js addons using NAPI in C++ and Objective-C.',
      'Observer/notification-based event handling instead of polling — near-instant system event response with minimal CPU overhead.',
      'Security controls: screen capture/share detection, VM detection, overlay prevention, app blacklisting/whitelisting, keystroke monitoring.',
    ],
    technologies: ['ElectronJS', 'C++', 'Objective-C', 'NAPI', 'Node.js', 'macOS'],
    image: '🔒',
    context: 'Mercer Mettl',
  },
  {
    id: 2,
    title: 'Real-time Collaborative Editors',
    description: 'A suite of real-time collaborative editors built with CRDT-based sync using YJS, delivered as pluggable React components in a dedicated UI library.',
    bullets: [
      'Whiteboard (Excalidraw), Diagram Tool (draw.io), and Coding Tool (Monaco Editor) — each with custom YJS adapters.',
      'Service-level logic abstracted into a separate TypeScript library; components published to an internal UI library.',
    ],
    technologies: ['YJS (CRDT)', 'React', 'TypeScript', 'Excalidraw', 'draw.io', 'Monaco Editor'],
    image: '🤝',
    context: 'Mercer Mettl — Interviews Platform',
  },
  {
    id: 3,
    title: 'framepack — Binary WebSocket Protocol',
    description: 'A compact binary framing library for WebSocket: custom 2-byte header, MessagePack for JSON payloads, UTF-8 for text, zero-copy pass-through for binary.',
    bullets: [
      'Custom bit-flag header byte for type + presence flags; second byte encodes payload encoding (binary/text/json/none).',
      'FrameView class reads directly from the raw ArrayBuffer without allocation — zero-copy lazy decoding for hot paths.',
      'Optional SocketClient with exponential-backoff reconnection, heartbeat/dead-timeout, and user-supplied WebSocket constructor.',
    ],
    technologies: ['WebSockets', 'MessagePack', 'TypeScript', 'Vite', 'ESM'],
    image: '⚡',
    context: 'Open Source',
    demoRoute: '/framepack',
  },
  {
    id: 4,
    title: "Parkinson's Disease Detection",
    description: 'Machine learning research on clinical detection of Parkinson\'s disease, presented at ICISS 2022.',
    bullets: [
      'Developed ML models for both binary and multi-class classification of Parkinson\'s disease from clinical datasets.',
      'Published and presented at the International Conference on Intelligent Systems and Signal Processing (ICISS 2022).',
    ],
    technologies: ['Machine Learning', 'Python', 'Classification', 'Healthcare AI'],
    image: '🧠',
    context: 'Research — ICISS 2022',
    link: 'https://doi.org/10.1007/978-981-19-2894-9_15',
  },
];

export default function Projects() {
  return (
    <Layout>
      <section className="min-h-screen py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 animate-slide-up">
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl">
              Significant technical initiatives from my professional work and research.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Project Image/Icon */}
                <div className="h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-between px-6">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{project.image}</span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 text-right">{project.context}</span>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="space-y-1.5 mb-5">
                    {project.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                        <span className="text-blue-500 mt-1 shrink-0">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {(project.link || project.demoRoute) && (
                    <div className="pt-3 flex gap-4">
                      {project.demoRoute && (
                        <Link
                          to={project.demoRoute}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink size={13} />
                          Live Demo
                        </Link>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <ExternalLink size={13} />
                          View Paper
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
