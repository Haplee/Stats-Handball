// src/components/Timeline.tsx

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
  return (
    <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-6">
      <ul className="space-y-12">
        {events.map((event, index) => (
          <li key={index} className="ml-10">
            {/* El punto en la línea de tiempo */}
            <span className="absolute -left-3.5 flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full ring-8 ring-white dark:ring-gray-900">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
              </svg>
            </span>

            {/* Contenido del hito */}
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              {event.title}
              {/* Etiqueta especial para eventos futuros */}
              {event.date === 'Próximamente' && (
                <span className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 ml-3">
                  Próximamente
                </span>
              )}
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {event.date}
            </time>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              {event.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
