import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from "react-router";
import './index.css'
import Home from './Home';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Resume from './pages/Resume';

createRoot(document.getElementById('root')!).render(
    <HashRouter>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/projects" element={<Projects />} />
			<Route path="/experience" element={<Experience />} />
			<Route path="/resume" element={<Resume />} />
		</Routes>
    </HashRouter>
)
