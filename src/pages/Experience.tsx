import Layout from '../components/Layout';
import { Briefcase, Award, BookOpen, GraduationCap } from 'lucide-react';

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

interface Skill {
  category: string;
  items: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    role: 'Software Developer II',
    company: 'Mercer Mettl',
    period: 'July 2022 – Present',
    bullets: [
      'Full stack developer contributing across the entire stack — backend services, frontend interfaces, system design, and architecture discussions.',
      'Mettl Secure Browser (MacOS): Leading end-to-end development alongside a junior developer, owning architecture, implementation, and delivery.',
      'Built core security features as native Node.js addons using NAPI in C++ and Objective-C, enabling deep macOS system integration within the ElectronJS shell.',
      'Implemented observer/notification-based event handling instead of polling, reducing CPU overhead with near-instant system event response.',
      'Security controls include screen capture/share detection, VM detection, overlay prevention, app blacklisting/whitelisting, and keystroke monitoring.',
      'Interviews Platform: Consolidated two Redis Pub/Sub microservices into one unified messaging server, reducing infrastructure costs and simplifying scaling.',
      'Designed a custom binary WebSocket protocol using bit-flag headers and length-prefixed fields; JSON payloads further compressed via MessagePack. Shipped as an npm package and Java module, each with a custom serialiser/deserialiser.',
      'Built a suite of real-time collaborative editors using custom YJS adapters — Whiteboard (Excalidraw), Diagram Tool (draw.io), and Coding Tool (Monaco Editor) — each as pluggable React components.',
      'Improved frontend performance through bundle size reduction and code splitting, cutting initial Time to First Display (TTFD).',
    ],
  },
  {
    id: 2,
    role: 'Senior Analyst (Intern)',
    company: 'Capgemini',
    period: 'January 2022 – May 2022',
    bullets: [
      'Worked with SAP Process Integration/Process Orchestration (PI/PO) and SAP Cloud Platform Integration (CPI) to design and implement data integration workflows.',
    ],
  },
];

const skills: Skill[] = [
  {
    category: 'Backend',
    items: ['Java', 'Spring Boot', 'PostgreSQL', 'Elasticsearch', 'Redis', 'WebSockets'],
  },
  {
    category: 'Frontend',
    items: ['TypeScript', 'React.js', 'ElectronJS', 'Vanilla JavaScript'],
  },
  {
    category: 'Systems',
    items: ['C++', 'Objective-C', 'Node Addon API (NAPI)'],
  },
  {
    category: 'Libraries & Tools',
    items: ['YJS (CRDT)', 'Excalidraw', 'draw.io', 'Monaco Editor', 'MessagePack'],
  },
  {
    category: 'Domains',
    items: ['Real-time Collaboration', 'Secure Browser Engineering', 'Microservices'],
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
            <div className="lg:col-span-2 space-y-16">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                  <Briefcase className="text-blue-600" size={32} />
                  Work Experience
                </h2>

                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    <div key={exp.id} className="relative">
                      {index !== experiences.length - 1 && (
                        <div className="absolute left-6 top-16 w-1 bg-gradient-to-b from-blue-600 to-purple-600" style={{ height: 'calc(100% + 2rem)' }}></div>
                      )}

                      <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>

                      <div className="ml-20 bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                            <p className="text-blue-600 dark:text-blue-400 font-semibold">{exp.company}</p>
                          </div>
                          <span className="text-sm text-slate-500 dark:text-slate-400 shrink-0 ml-4">{exp.period}</span>
                        </div>
                        <ul className="space-y-2">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i} className="flex gap-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                              <span className="text-blue-500 mt-1.5 shrink-0">▸</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                  <GraduationCap className="text-blue-600" size={32} />
                  Education
                </h2>
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">B.Tech in Computer Science</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">Manipal University Jaipur</p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">CGPA: 9.2 / 10</p>
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">2018 – 2022</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">High School (XII)</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">Delhi Public School, Faridabad</p>
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">2018</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Publications */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                  <BookOpen className="text-blue-600" size={32} />
                  Publications
                </h2>
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    Machine Learning-Assisted Binary and Multi-Class Parkinson's Disease Detection
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-2">ICISS 2022</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Developed machine learning models to enhance clinical detection of Parkinson's disease across binary and multi-class datasets.
                  </p>
                </div>
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
