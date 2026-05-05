import { Link } from 'react-router';
import { ArrowRight, Code, Zap } from 'lucide-react';
import Layout from './components/Layout';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-8 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="space-y-6 animate-slide-up">
            {/* Intro Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 backdrop-blur-sm">
              <Zap size={16} className="text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Full Stack Developer</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-7xl font-bold text-white">
              Hi, I&apos;m <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Dhruv</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Full Stack Developer with 3+ years building scalable backend systems and performant frontend applications. Promoted to SDE-II within 3 years.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
              >
                View My Work <ArrowRight size={20} />
              </Link>
              <a
                href="mailto:contact@dhruvarora.co.in"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-slate-400 text-slate-100 font-semibold hover:bg-slate-900 hover:border-blue-400 transition-all"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 pt-20 border-t border-slate-700/50">
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">3+</div>
              <p className="text-slate-400 text-sm mt-2">Years Experience</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">2</div>
              <p className="text-slate-400 text-sm mt-2">Major Products Built</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text">1</div>
              <p className="text-slate-400 text-sm mt-2">Published Research</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Intro Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Full Stack Developer</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                I specialise in building scalable backend systems and performant frontend applications — from native macOS system integrations to real-time collaborative platforms. Currently at Mercer Mettl as Software Developer II.
              </p>
              <div className="flex items-start gap-4">
                <Code className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Core Stack</h3>
                  <p className="text-slate-600 dark:text-slate-400">Java, Spring Boot, React, TypeScript, ElectronJS, PostgreSQL, Redis</p>
                </div>
              </div>
            </div>
            <div className="h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-200 dark:border-blue-900/50 flex items-center justify-center">
              <div className="text-6xl">💻</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
