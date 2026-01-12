const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-50 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Handball Stats</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#about" className="hover:text-gray-400">About</a></li>
            <li><a href="#roadmap" className="hover:text-gray-400">Roadmap</a></li>
            <li><a href="#dashboard" className="hover:text-gray-400">Dashboard</a></li>
            <li><a href="#documentation" className="hover:text-gray-400">Documentation</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
