"use client";

import { motion } from "framer-motion";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

const Timeline = ({ events }: { events: TimelineEvent[] }) => {
  return (
    <div className="relative border-l-2 border-blue-500">
      {events.map((event, index) => (
        <motion.div
          key={index}
          className="mb-8 ml-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className="absolute -left-[11px] h-5 w-5 rounded-full bg-blue-500"></div>
          <p className="text-sm text-gray-400">{event.date}</p>
          <h3 className="text-xl font-bold">{event.title}</h3>
          <p className="text-gray-300">{event.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
