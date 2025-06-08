import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <section id="about-us" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4">
            <span className="text-cyber">About Us</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-card cyber-border rounded-lg p-6">
              <h3 className="text-xl font-orbitron font-semibold text-primary mb-4">
                Our Mission
              </h3>
              <p className="font-fira text-foreground/80 leading-relaxed">
                To cultivate a community of digital innovators who push the boundaries 
                of technology. We believe in the power of code to transform reality 
                and create solutions for tomorrow's challenges.
              </p>
            </div>

            <div className="bg-card cyber-border rounded-lg p-6">
              <h3 className="text-xl font-orbitron font-semibold text-secondary mb-4">
                What We Do
              </h3>
              <p className="font-fira text-foreground/80 leading-relaxed">
                From competitive programming to cutting-edge AI development, 
                we explore every facet of computer science. Our members engage 
                in hackathons, workshops, and collaborative projects that shape the future.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="bg-card/50 cyber-border hover:glow-green transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-3xl font-orbitron font-bold text-primary mb-2">75+</div>
                <div className="text-sm font-fira text-muted-foreground uppercase tracking-wider">Active Members</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 cyber-border hover:glow-blue transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-3xl font-orbitron font-bold text-secondary mb-2">5</div>
                <div className="text-sm font-fira text-muted-foreground uppercase tracking-wider">Years of Legacy</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 cyber-border hover:bg-accent/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-3xl font-orbitron font-bold text-accent mb-2">2</div>
                <div className="text-sm font-fira text-muted-foreground uppercase tracking-wider">Annual Events</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;