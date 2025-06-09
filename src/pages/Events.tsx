import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';

const Events = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [eventsRef, eventsVisible] = useScrollAnimation();
  const [terminalRef, terminalVisible] = useScrollAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [terminalMousePosition, setTerminalMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredTerminal, setHoveredTerminal] = useState<boolean>(false);

  const handleCardMouseMove = (e: React.MouseEvent, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredCard(index);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
  };

  const handleTerminalMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTerminalMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredTerminal(true);
  };

  const handleTerminalMouseLeave = () => {
    setHoveredTerminal(false);
  };

  const events = [
    {
      title: "WarP Intra '25",
      date: "August 02, 2025",
      type: "Intra School Competition",
      description: "Our premier intra-school technology competition featuring multiple tracks for students to showcase their skills.",
      tracks: [
        "Competitive Programming Contest",
        "Web Development Challenge",
        "AI/ML Innovation Workshop",
        "Cybersecurity Capture The Flag",
        "Mobile App Development",
        "Tech Quiz & Debugging Challenge"
      ],
      status: "Registration Open",
      registerLink: "https://forms.google.com/dummy-registration-form",
      brochureLink: "https://drive.google.com/dummy-brochure-link",
      glowColor: "glow-green"
    },
    {
      title: "WarP Inter '25",
      date: "T.B.D.",
      type: "Inter School Championship",
      description: "The ultimate inter-school technology championship bringing together the brightest minds from across the region.",
      tracks: [
        "48-Hour Hackathon Marathon",
        "Multi-Round Programming Contest",
        "Innovation Showcase & Expo",
        "Tech Talk Series",
        "Networking & Career Fair",
        "Awards & Recognition Ceremony"
      ],
      status: "Coming Soon",
      registerLink: "https://forms.google.com/dummy-registration-form-2",
      brochureLink: "https://drive.google.com/dummy-brochure-link-2",
      glowColor: "glow-blue"
    }
  ];

  return (
    <div className="min-h-screen bg-background" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div 
            ref={titleRef}
            className={`text-center mb-16 scroll-fade-in ${titleVisible ? 'animate' : ''}`}
          >
            <h1 className="text-3xl md:text-5xl font-orbitron font-bold mb-4">
              <span className="text-cyber">Events</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
            <p className="text-lg font-fira text-muted-foreground max-w-2xl mx-auto">
              Competitions that challenge minds and forge the future of technology
            </p>
          </div>

          <div 
            ref={eventsRef}
            className={`space-y-8 max-w-4xl mx-auto stagger-children ${eventsVisible ? 'animate' : ''}`}
          >
            {events.map((event, index) => (
              <Card 
                key={index} 
                className={`bg-card/50 cyber-border hover:${event.glowColor} transition-all duration-300 card-glossy-glow`}
                onMouseMove={(e) => handleCardMouseMove(e, index)}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  '--mouse-x': hoveredCard === index ? `${mousePosition.x}px` : '50%',
                  '--mouse-y': hoveredCard === index ? `${mousePosition.y}px` : '50%',
                } as React.CSSProperties}
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <CardTitle className="text-2xl font-orbitron font-bold text-primary mb-2">
                        {event.title}
                      </CardTitle>
                      <div className="text-secondary font-fira text-sm uppercase tracking-wider">
                        {event.type}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-orbitron font-semibold text-accent mb-1">
                        {event.date}
                      </div>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-fira uppercase tracking-wider ${
                        event.status === 'Registration Open' 
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'bg-muted/20 text-muted-foreground border border-muted/30'
                      }`}>
                        {event.status}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="font-fira text-foreground/80 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div>
                    <h4 className="font-orbitron font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                      Event Tracks:
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {event.tracks.map((track, idx) => (
                        <div key={idx} className="font-fira text-sm text-foreground/70 flex items-center">
                          <span className="w-1 h-1 rounded-full bg-primary mr-3"></span>
                          {track}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      asChild
                      className="bg-primary hover:bg-primary/80 text-primary-foreground font-fira"
                      disabled={event.status === 'Coming Soon'}
                    >
                      <a href={event.registerLink} target="_blank" rel="noopener noreferrer">
                        {event.status === 'Registration Open' ? 'Register Now' : 'Coming Soon'}
                      </a>
                    </Button>
                    <Button 
                      asChild
                      variant="outline" 
                      className="border-secondary text-secondary hover:bg-secondary/10 font-fira"
                    >
                      <a href={event.brochureLink} target="_blank" rel="noopener noreferrer">
                        Learn More
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div 
            ref={terminalRef}
            className={`text-center mt-12 scroll-fade-in ${terminalVisible ? 'animate' : ''}`}
          >
            <div 
              className="terminal-text bg-background/50 border border-accent/30 rounded-lg p-6 max-w-md mx-auto card-glossy-glow"
              onMouseMove={handleTerminalMouseMove}
              onMouseLeave={handleTerminalMouseLeave}
              style={{
                '--mouse-x': hoveredTerminal ? `${terminalMousePosition.x}px` : '50%',
                '--mouse-y': hoveredTerminal ? `${terminalMousePosition.y}px` : '50%',
              } as React.CSSProperties}
            >
              <div className="text-accent mb-2">$ events --upcoming</div>
              <div className="text-muted-foreground text-sm">
                Next Event: WarP Intra '25<br/>
                Registration Status: OPEN<br/>
                Expected Participants: 200+
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
