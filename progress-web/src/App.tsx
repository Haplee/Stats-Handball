import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatusGrid from './components/StatusGrid';
import Features from './components/Features';
import Roadmap from './components/Roadmap';
import TechStack from './components/TechStack';
import Footer from './components/Footer';

export default function App() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-blue-500/30 scroll-smooth">
            <Navbar />
            <main>
                <Hero />
                <StatusGrid />
                <Features />
                <Roadmap />
                <TechStack />
            </main>
            <Footer />
        </div>
    );
}
