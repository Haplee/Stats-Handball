import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages (Client App)
import DashboardPage from './pages/DashboardPage';
import TeamsPage from './pages/TeamsPage';
import PlayersPage from './pages/PlayersPage';
import TacticsPage from './pages/TacticsPage';
import SettingsPage from './pages/SettingsPage';
import AnalysisPage from './pages/AnalysisPage';

export default function App() {
    return (
        <Router basename="/app">
            <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-blue-500/30 font-sans">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/teams" element={<TeamsPage />} />
                        <Route path="/players" element={<PlayersPage />} />
                        <Route path="/tactics" element={<TacticsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/analysis/:id" element={<AnalysisPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}
