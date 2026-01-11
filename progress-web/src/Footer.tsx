const Footer = () => {
  return (
    <footer className="bg-gray-950 py-8 text-center">
      <div className="container mx-auto px-4">
        <p>&copy; 2024 Handball Stats. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://github.com/Haplee/TFG-ASIR" className="hover:text-gray-400">GitHub</a>
          <a href="https://twitter.com/FranVidalMateo" className="hover:text-gray-400">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
