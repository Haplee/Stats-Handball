const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-8 mt-16">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} - Nombre del Alumno</p>
        <p className="mt-2">
          Proyecto Fin de Grado (TFG) - ASIR
        </p>
        <div className="mt-4">
          <a
            href="https://github.com/your-username/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600"
          >
            Ver el proyecto en GitHub
          </a>
        </div>
        <div className="mt-2">
          <a
            href="mailto:tu-email@example.com"
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600"
          >
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
