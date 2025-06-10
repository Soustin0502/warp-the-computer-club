
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cylinder3D from '@/components/Cylinder3D';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Members = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [membersRef, membersVisible] = useScrollAnimation();
  const [terminalRef, terminalVisible] = useScrollAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('main > div:nth-child(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const members = [
    { name: "Soustin Roy", role: "President", expertise: "Full-Stack Development, UI/UX Design", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face" },
    { name: "Deeptanshu Shekhar", role: "President", expertise: "Pitching specialist", image: "" },
    { name: "Girisha Mehra", role: "Vice President", expertise: "Photographer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face" },
    { name: "Aayan Ahmed War", role: "Vice President", expertise: "Data Science", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face" },
    { name: "Ayaan Ali", role: "Senior Executive", expertise: "Videographer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=300&h=400@fit=crop&crop=face" },
    { name: "Rishit Uppal", role: "Senior Executive", expertise: "Cloud Computing", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face" },
    { name: "Ansh Mittal", role: "Executive", expertise: "Mobile Development", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=400&fit=crop&crop=face" },
    { name: "Kunal Kachhawa", role: "Executive", expertise: "UI/UX Design", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop&crop=face" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="container mx-auto px-4 text-center z-10">
          <div 
            ref={titleRef}
            className={`scroll-fade-in ${titleVisible ? 'animate' : ''}`}
          >
            <h1 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative">
              <span className="text-cyber relative z-10">Our Team</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
            <p className="text-lg font-fira text-muted-foreground max-w-2xl mx-auto">
              Meet the digital architects behind WarP Computer Club
            </p>
          </div>
        </div>

        {/* 3D Cylinder */}
        <Cylinder3D text="MEMBERS" />

        {/* Scroll Down Button */}
        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="text-primary" size={24} />
        </button>
      </section>

      <main className="pb-12">
        <div className="container mx-auto px-4">
          <div 
            ref={membersRef}
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto stagger-children ${membersVisible ? 'animate' : ''}`}
          >
            {members.map((member, index) => (
              <Card 
                key={index} 
                className="bg-card/50 cyber-border hover:glow-green transition-all duration-300 member-card group overflow-hidden"
                onMouseMove={(e) => handleCardMouseMove(e, index)}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  '--mouse-x': hoveredCard === index ? `${mousePosition.x}px` : '-200px',
                  '--mouse-y': hoveredCard === index ? `${mousePosition.y}px` : '-200px',
                } as React.CSSProperties}
              >
                <div className="relative h-80 overflow-hidden">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover member-image transition-all duration-500 filter grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <div className="text-6xl font-orbitron font-bold text-primary/80">
                        {getInitials(member.name)}
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#130E0D] via-[#130E0D]/70 to-transparent z-10" />
                </div>
                <div className="relative z-20 p-4">
                  <CardHeader className="p-0 pb-2">
                    <CardTitle className="font-orbitron text-primary text-lg">{member.name}</CardTitle>
                    <div className="text-secondary font-fira text-sm uppercase tracking-wider">{member.role}</div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="text-muted-foreground font-fira text-sm">
                      <strong>Specialization:</strong> {member.expertise}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          <div 
            ref={terminalRef}
            className={`text-center mt-12 scroll-fade-in ${terminalVisible ? 'animate' : ''}`}
          >
            <div className="terminal-text bg-background/50 border border-primary/30 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-primary mb-2">$ members --count</div>
              <div className="text-muted-foreground">
                Total Active Members: 75+<br/>
                Core Team: 8
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Members;
