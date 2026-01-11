const Roadmap = () => {
  return (
    <section id="roadmap" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Project Roadmap</h2>
        <div className="flex justify-center">
          <ul className="list-disc list-inside">
            <li className="mb-2">Phase 1: Project Setup & UI - Complete</li>
            <li className="mb-2">Phase 2: Video Upload & Processing - In Progress</li>
            <li className="mb-2">Phase 3: AI Model Integration for Player Detection</li>
            <li className="mb-2">Phase 4: Ball Tracking & Event Recognition</li>
            <li className="mb-2">Phase 5: Statistics Generation & Dashboard</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
