import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about-us');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden hero-fade-in">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 20, 147, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 20, 147, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 text-center z-10">
        <div className="mb-8">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg mb-6">
            <span className="text-primary font-fira text-sm">
              &gt; SYSTEM INFILTRATION SUCCESSFUL
            </span>
          </div>
          
          <div className="mb-4">
            <img 
              src="/lovable-uploads/0dfb5592-8b0c-4160-a24d-36d86593dd3a.png" 
              alt="WarP Logo" 
              className="h-24 md:h-32 mx-auto logo-glitch"
            />
          </div>
          
          <h2 className="text-xl md:text-3xl font-orbitron font-light mb-6 text-muted-foreground">
            The Computer Club
          </h2>
          
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg font-fira text-foreground/80 leading-relaxed">
              Welcome to the digital frontier where code meets creativity. 
              We are the architects of tomorrow's technology, the guardians of digital innovation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              className="bg-primary hover:bg-primary/80 text-primary-foreground font-fira glow-pink"
            >
              <a href="/events">Explore Events</a>
            </Button>
            <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 font-fira">
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>

        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="text-primary" size={24} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
