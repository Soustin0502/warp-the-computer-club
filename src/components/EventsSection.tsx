
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EventsSection = () => {
  const events = [
    {
      title: "WarP Intra '25",
      type: "Intra School Event",
      description: "Our flagship intra-school competition where students showcase their programming prowess, innovative thinking, and technical skills across multiple domains.",
      features: [
        "Competitive Programming",
        "Web Development Challenge",
        "AI/ML Workshop",
        "Cybersecurity CTF"
      ],
      color: "primary"
    },
    {
      title: "WarP Inter '25",
      type: "Inter School Event",
      description: "The ultimate battleground where schools compete in the digital arena. A prestigious event that brings together the brightest minds from across the region.",
      features: [
        "Multi-School Competition",
        "Hackathon Marathon",
        "Tech Expo & Showcase",
        "Networking Sessions"
      ],
      color: "secondary"
    }
  ];

  return (
    <section className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4">
            <span className="text-cyber">Our Events</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-lg font-fira text-muted-foreground max-w-2xl mx-auto">
            Two flagship events that define our commitment to excellence in technology education
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <Card key={index} className={`bg-card/50 cyber-border hover:glow-${event.color === 'primary' ? 'green' : 'blue'} transition-all duration-300 group`}>
              <CardHeader>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-fira uppercase tracking-wider mb-2 ${
                  event.color === 'primary' 
                    ? 'bg-primary/20 text-primary border border-primary/30' 
                    : 'bg-secondary/20 text-secondary border border-secondary/30'
                }`}>
                  {event.type}
                </div>
                <CardTitle className="text-2xl font-orbitron font-bold">
                  <span className={event.color === 'primary' ? 'text-primary' : 'text-secondary'}>
                    {event.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-fira text-foreground/80 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-orbitron font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {event.features.map((feature, idx) => (
                      <li key={idx} className="font-fira text-sm text-foreground/70 flex items-center">
                        <span className={`w-1 h-1 rounded-full mr-3 ${
                          event.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                        }`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant="outline" 
                  className={`w-full font-fira ${
                    event.color === 'primary' 
                      ? 'border-primary text-primary hover:bg-primary/10' 
                      : 'border-secondary text-secondary hover:bg-secondary/10'
                  }`}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="terminal-text bg-background/50 border border-accent/30 rounded-lg p-4 max-w-md mx-auto">
            <div className="text-accent mb-1">$ events --schedule</div>
            <div className="text-muted-foreground text-sm">
              WarP Intra '25: February 2025<br/>
              WarP Inter '25: April 2025
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
