import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

export default function Resume() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <Layout>
      <section className="min-h-screen py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
              My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Resume</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Download my resume or view it below.
            </p>

            <a
              href={resumeUrl}
              download="Dhruv_Arora_CV.pdf"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              <Download size={20} />
              Download PDF
            </a>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xl flex flex-col items-center py-6">
            <Document
              file={resumeUrl}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              className="flex flex-col items-center"
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer
                renderAnnotationLayer
                className="shadow-lg"
                width={Math.min(window.innerWidth - 80, 800)}
              />
            </Document>

            {numPages > 1 && (
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                  disabled={pageNumber <= 1}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-slate-600 dark:text-slate-300 text-sm">
                  Page {pageNumber} of {numPages}
                </span>
                <button
                  onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                  disabled={pageNumber >= numPages}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
