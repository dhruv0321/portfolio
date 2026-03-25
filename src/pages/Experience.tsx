import Layout from '../components/Layout';
import { Briefcase, Award } from 'lucide-react';

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

interface Skill {
  category: string;
  items: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    role: 'Software Developer 2',
    company: 'Current Company',
    period: '2023 - Present',
    description: 'Leading fullstack development initiatives, architecting scalable microservices, and mentoring junior developers on best practices.',
  },
  {
    id: 2,
    role: 'Software Developer 1',
    company: 'Previous Company',
    period: '2021 - 2023',
    description: 'Built and maintained multiple React applications and Node.js APIs, implemented CI/CD pipelines, and contributed to system architecture discussions.',
  },
  {
    id: 3,
    role: 'Junior Developer',
    company: 'Starting Company',
    period: '2020 - 2021',
    description: 'Developed frontend components with React, fixed bugs, and learned fullstack development practices through mentorship and real-world projects.',
  },
];

const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'React Router', 'Tailwind CSS', 'Next.js', 'Vue.js'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs'],
  },
  {
    category: 'DevOps & Tools',
    items: ['Docker', 'AWS', 'Git', 'CI/CD', 'Linux', 'Kubernetes'],
  },
  {
    category: 'Other',
    items: ['System Design', 'Agile', 'WebSockets', 'GraphQL', 'Testing', 'Performance Optimization'],
  },
];

export default function Experience() {
  return (
    <Layout>
      <section className="min-h-screen py-20 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 animate-slide-up">
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Experience & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              My professional journey and technical expertise.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Work Experience Timeline */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <Briefcase className="text-blue-600" size={32} />
                Work Experience
              </h2>

              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    {/* Timeline Line */}
                    {index !== experiences.length - 1 && (
                      <div className="absolute left-6 top-16 w-1 h-16 bg-gradient-to-b from-blue-600 to-purple-600"></div>
                    )}

                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>

                    {/* Content */}
                    <div className="ml-20 bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                          <p className="text-blue-600 dark:text-blue-400 font-semibold">{exp.company}</p>
                        </div>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{exp.period}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <Award className="text-purple-600" size={32} />
                Skills
              </h2>

              <div className="space-y-8">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.category}>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm hover:shadow-lg transition-shadow"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
