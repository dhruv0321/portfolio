import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './Home';
import About from './About';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
		</Routes>
    </BrowserRouter>
)
