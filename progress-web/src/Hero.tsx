const Hero = () => {
  return (
    <section id="hero" className="h-screen flex items-center justify-center text-center bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1535131749005-78b44c480a1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
      <div className="bg-gray-900 bg-opacity-60 p-10 rounded-lg">
        <h2 className="text-5xl font-bold mb-4">Welcome to Handball Stats</h2>
        <p className="text-xl">The ultimate platform for analyzing handball match videos with AI.</p>
      </div>
    </section>
  );
};

export default Hero;
