import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from "react-router";
import './index.css'
import PageLoader from './components/PageLoader';
import ScrollToTop from './components/ScrollToTop';

const Home = lazy(() => import('./Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Experience = lazy(() => import('./pages/Experience'));
const Resume = lazy(() => import('./pages/Resume'));
const FramepackDemo = lazy(() => import('./pages/FramepackDemo'));

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <ScrollToTop />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/framepack" element={<FramepackDemo />} />
      </Routes>
    </Suspense>
  </HashRouter>
)
