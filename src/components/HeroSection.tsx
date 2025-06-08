
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
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
          
          <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-4">
            <span className="text-cyber glitch" data-text="WarP">WarP</span>
          </h1>
          
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
            <Button className="bg-primary hover:bg-primary/80 text-primary-foreground font-fira glow-green">
              Join the Revolution
            </Button>
            <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 font-fira">
              Explore Events
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-primary" size={24} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
