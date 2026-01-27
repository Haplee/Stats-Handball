import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages (Client App)
import DashboardPage from './pages/DashboardPage';

export default function App() {
    return (
        <Router basename="/app">
            <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-blue-500/30 font-sans">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}
