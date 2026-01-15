import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import FeaturesPage from './pages/FeaturesPage';
import RoadmapPage from './pages/RoadmapPage';
import TechPage from './pages/TechPage';
import WebsPage from './pages/WebsPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-blue-500/30 font-sans">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/features" element={<FeaturesPage />} />
                        <Route path="/roadmap" element={<RoadmapPage />} />
                        <Route path="/tech" element={<TechPage />} />
                        <Route path="/webs" element={<WebsPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}
