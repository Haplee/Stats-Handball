import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Documentation from "./components/Documentation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/HeroSection";
import Roadmap from "./components/Roadmap";

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Roadmap />
        <Dashboard />
        <Documentation />
      </main>
      <Footer />
    </div>
  );
}

export default App;
