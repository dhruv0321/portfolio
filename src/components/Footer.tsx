import { Code, Link2, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Contact Links */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:your.email@example.com"
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Email"
            >
              <Mail size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="GitHub"
            >
              <Code size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="LinkedIn"
            >
              <Link2 size={24} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {currentYear} Dhruv. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
