
const SchoolSection = () => {
  return (
    <section id="about-school" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-6">
            <span className="text-cyber">About Our School</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
          
          <div className="bg-card/50 cyber-border rounded-lg p-8 mb-8">
            <p className="text-lg font-fira text-foreground/80 leading-relaxed mb-6">
              Delhi Public School Mathura Road stands at the forefront of technological education, 
              fostering innovation and critical thinking. With state-of-the-art facilities 
              and a curriculum designed for the digital age, we prepare students to excel 
              in an increasingly connected world.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-orbitron font-bold text-primary mb-2">Excellence</div>
                <div className="text-sm font-fira text-muted-foreground">In Education</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-orbitron font-bold text-secondary mb-2">Innovation</div>
                <div className="text-sm font-fira text-muted-foreground">Through Technology</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-orbitron font-bold text-accent mb-2">Future</div>
                <div className="text-sm font-fira text-muted-foreground">Ready Leaders</div>
              </div>
            </div>
          </div>

          <div className="terminal-text text-left bg-background/50 border border-primary/30 rounded-lg p-4">
            <div className="text-primary mb-2">$ school --info</div>
            <div className="text-muted-foreground">
              Name: Delhi Public School Mathura Road<br/>
              Established: 1949<br/>
              Status: ✓ Digitally Enhanced Learning Environment
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolSection;
