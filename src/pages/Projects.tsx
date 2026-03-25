import { ExternalLink, Code } from 'lucide-react';
import Layout from '../components/Layout';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    image: '🛒',
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates, team workspaces, and project tracking.',
    technologies: ['React', 'Firebase', 'TypeScript', 'Tailwind CSS'],
    image: '✅',
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    description: 'Custom analytics dashboard displaying real-time data visualization and business intelligence metrics.',
    technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Docker'],
    image: '📊',
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    id: 4,
    title: 'AI Chat Application',
    description: 'Intelligent chat application with NLP integration, message history, and conversation management.',
    technologies: ['React', 'OpenAI', 'Node.js', 'Python', 'PostgreSQL'],
    image: '💬',
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    id: 5,
    title: 'Mobile Music Streaming',
    description: 'Cross-platform music streaming service with offline support, playlists, and recommendations.',
    technologies: ['React Native', 'Node.js', 'AWS S3', 'WebSockets', 'Redis'],
    image: '🎵',
    github: 'https://github.com',
    demo: 'https://example.com',
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
              A selection of projects showcasing my full-stack capabilities, from concept to deployment.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Project Image/Icon */}
                <div className="h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {project.image}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <Code size={18} />
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <ExternalLink size={18} />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
