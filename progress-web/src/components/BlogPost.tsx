// src/components/BlogPost.tsx

interface BlogPostProps {
  title: string;
  date: string;
  content: string; // El contenido será un string de HTML
}

const BlogPost = ({ title, date, content }: BlogPostProps) => {
  return (
    <article className="border-b border-gray-200 dark:border-gray-700 pb-8">
      <header>
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h2>
        <time className="text-sm text-gray-500 dark:text-gray-400">{new Date(date).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}</time>
      </header>
      <div
        className="prose dark:prose-invert mt-4 max-w-none text-gray-700 dark:text-gray-300"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
};

export default BlogPost;
