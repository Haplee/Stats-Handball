import About from "./About";
import Dashboard from "./Dashboard";
import Documentation from "./Documentation";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Roadmap from "./Roadmap";

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
