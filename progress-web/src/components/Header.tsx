import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">
          <Link href="/">TFG Análisis de Balonmano con IA</Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-gray-500 dark:hover:text-gray-300">Home</Link></li>
            <li><Link href="/progress" className="hover:text-gray-500 dark:hover:text-gray-300">Progreso</Link></li>
            <li><Link href="/system" className="hover:text-gray-500 dark:hover:text-gray-300">Sistema</Link></li>
            <li><Link href="/results" className="hover:text-gray-500 dark:hover:text-gray-300">Resultados</Link></li>
            <li><Link href="/blog" className="hover:text-gray-500 dark:hover:text-gray-300">Blog</Link></li>
            <li><Link href="/tfg" className="hover:text-gray-500 dark:hover:text-gray-300">TFG</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
