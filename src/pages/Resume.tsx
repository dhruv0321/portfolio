import { Download, FileText } from 'lucide-react';
import Layout from '../components/Layout';

export default function Resume() {
  return (
    <Layout>
      <section className="min-h-screen py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
              My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Resume</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Download my complete resume or view it below.
            </p>

            {/* Download Button */}
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              <Download size={20} />
              Download PDF
            </a>
          </div>

          {/* Resume Preview Container */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xl">
            {/* Resume Content */}
            <div className="p-12 space-y-8">
              {/* Header */}
              <div className="border-b-2 border-slate-200 dark:border-slate-700 pb-6">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Dhruv</h2>
                <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">Software Developer 2</p>
                <div className="flex gap-4 text-slate-600 dark:text-slate-400 mt-2">
                  <span>📧 your.email@example.com</span>
                  <span>📱 +1 (555) 123-4567</span>
                  <span>🔗 github.com/yourprofile</span>
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText size={24} className="text-blue-600" />
                  Professional Summary
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Experienced Software Developer 2 with 5+ years of fullstack development expertise. Specialized in building scalable web applications using React, Node.js, and cloud technologies. Proven track record of delivering high-quality solutions and leading cross-functional teams.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Experience</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">Software Developer 2</p>
                        <p className="text-blue-600 dark:text-blue-400">Current Company</p>
                      </div>
                      <span className="text-slate-600 dark:text-slate-400">2023 - Present</span>
                    </div>
                    <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mt-2 space-y-1">
                      <li>Led development of microservices architecture handling 10M+ daily requests</li>
                      <li>Mentored 3+ junior developers on fullstack best practices</li>
                      <li>Improved API performance by 40% through optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">Frontend</p>
                    <p className="text-slate-700 dark:text-slate-300">React, TypeScript, Tailwind CSS, Next.js, Vue.js</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">Backend</p>
                    <p className="text-slate-700 dark:text-slate-300">Node.js, Express, PostgreSQL, MongoDB, REST APIs</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">DevOps</p>
                    <p className="text-slate-700 dark:text-slate-300">Docker, AWS, CI/CD, Linux, Kubernetes</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">Other</p>
                    <p className="text-slate-700 dark:text-slate-300">System Design, Agile, Git, Performance Optimization</p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Education</h3>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Bachelor of Science in Computer Science</p>
                  <p className="text-slate-600 dark:text-slate-400">University Name • Graduation: 2020</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900">
            <p className="text-slate-700 dark:text-slate-300">
              💡 <strong>Tip:</strong> This is a placeholder resume. Update it with your actual experience, qualifications, and achievements.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
