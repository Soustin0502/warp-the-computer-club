import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAPScrollTrigger } from '@/hooks/useGSAPAnimation';

gsap.registerPlugin(TextPlugin);

const AboutSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Title animation
  const titleRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    console.log("Title animation triggered");
    gsap.fromTo(element, 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
      }
    );
  }, { start: "top 80%" });

  // Terminal animation with typing effect
  const terminalRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    const commandElement = element.querySelector('.terminal-command');
    const infoElements = element.querySelectorAll('.terminal-info');
    
    // Initial setup
    gsap.set(element, { opacity: 0, y: 60, scale: 0.9 });
    gsap.set(commandElement, { text: "" });
    gsap.set(infoElements, { opacity: 0 });
    
    const tl = gsap.timeline();
    
    // Slide in terminal
    tl.to(element, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out"
    })
    // Type command
    .to(commandElement, {
      text: "$ about --info",
      duration: 1.5,
      ease: "none"
    })
    // Show info with stagger
    .to(infoElements, {
      opacity: 1,
      duration: 0.3,
      stagger: 0.2,
      ease: "power2.out"
    }, "+=0.5");
  }, { start: "top 80%" });

  // Content cards animation with 3D transforms
  const contentRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    console.log("Content cards animation triggered");
    const cards = element.querySelectorAll('.content-card');
    
    gsap.fromTo(cards,
      {
        opacity: 0,
        x: -100,
        rotationY: -15,
        rotationX: 10,
        z: -100
      },
      {
        opacity: 1,
        x: 0,
        rotationY: 0,
        rotationX: 0,
        z: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out"
      }
    );
  }, { start: "top 70%" });

  // Stats cards animation with enhanced 3D effects and faster timing
  const statsRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    console.log("Stats animation triggered");
    const statCards = element.querySelectorAll('.stat-card');
    console.log("Found stat cards:", statCards.length);
    
    // Log each card for debugging
    statCards.forEach((card, index) => {
      console.log(`Stat card ${index}:`, card);
    });

    // Set initial state immediately
    gsap.set(statCards, {
      opacity: 0,
      y: 100,
      scale: 0.7,
      rotationX: 60,
      rotationY: 20
    });
    
    // Then animate to final state with much faster timing
    gsap.to(statCards, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 0.1,
      onComplete: () => {
        console.log("Stats animation completed");
      }
    });
  }, { start: "top 75%" });

  const handleCardMouseMove = (e: React.MouseEvent, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredCard(index);

    // Enhanced GSAP hover effect with 3D transforms
    gsap.to(e.currentTarget, {
      rotationY: 5,
      rotationX: 2,
      scale: 1.02,
      z: 50,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent) => {
    setHoveredCard(null);
    
    // Reset hover effect
    gsap.to(e.currentTarget, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      z: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <section id="about-us" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className="text-center mb-16 relative"
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative title-glow">
            <span className="text-cyber relative z-10">About Us</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="space-y-6">
            <div 
              className="content-card bg-card cyber-border rounded-lg p-6 card-glossy-glow"
              onMouseMove={(e) => handleCardMouseMove(e, 0)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                '--mouse-x': hoveredCard === 0 ? `${mousePosition.x}px` : '50%',
                '--mouse-y': hoveredCard === 0 ? `${mousePosition.y}px` : '50%',
              } as React.CSSProperties}
            >
              <h3 className="text-xl font-orbitron font-semibold text-primary mb-4">
                Our Mission
              </h3>
              <p className="font-fira text-foreground/80 leading-relaxed">
                To cultivate a community of digital innovators who push the boundaries 
                of technology. We believe in the power of code to transform reality 
                and create solutions for tomorrow's challenges.
              </p>
            </div>

            <div 
              className="content-card bg-card cyber-border rounded-lg p-6 card-glossy-glow"
              onMouseMove={(e) => handleCardMouseMove(e, 1)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                '--mouse-x': hoveredCard === 1 ? `${mousePosition.x}px` : '50%',
                '--mouse-y': hoveredCard === 1 ? `${mousePosition.y}px` : '50%',
              } as React.CSSProperties}
            >
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

          <div ref={statsRef} className="space-y-4">
            <Card 
              className="stat-card bg-card/50 cyber-border hover:glow-green transition-all duration-300 card-glossy-glow"
              onMouseMove={(e) => handleCardMouseMove(e, 2)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                '--mouse-x': hoveredCard === 2 ? `${mousePosition.x}px` : '50%',
                '--mouse-y': hoveredCard === 2 ? `${mousePosition.y}px` : '50%',
              } as React.CSSProperties}
            >
              <CardContent className="p-6">
                <div className="text-3xl font-orbitron font-bold text-primary mb-2">75+</div>
                <div className="text-sm font-fira text-muted-foreground uppercase tracking-wider">Active Members</div>
              </CardContent>
            </Card>

            <Card 
              className="stat-card bg-card/50 cyber-border hover:glow-blue transition-all duration-300 card-glossy-glow"
              onMouseMove={(e) => handleCardMouseMove(e, 3)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                '--mouse-x': hoveredCard === 3 ? `${mousePosition.x}px` : '50%',
                '--mouse-y': hoveredCard === 3 ? `${mousePosition.y}px` : '50%',
              } as React.CSSProperties}
            >
              <CardContent className="p-6">
                <div className="text-3xl font-orbitron font-bold text-secondary mb-2">5</div>
                <div className="text-sm font-fira text-muted-foreground uppercase tracking-wider">Years of Legacy</div>
              </CardContent>
            </Card>

            <Card 
              className="stat-card bg-card/50 cyber-border hover:glow-green transition-all duration-300 card-glossy-glow"
              onMouseMove={(e) => handleCardMouseMove(e, 4)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                '--mouse-x': hoveredCard === 4 ? `${mousePosition.x}px` : '50%',
                '--mouse-y': hoveredCard === 4 ? `${mousePosition.y}px` : '50%',
              } as React.CSSProperties}
            >
              <CardContent className="p-6">
                <div className="text-3xl font-orbitron font-bold text-accent mb-2">2</div>
                <div className="text-sm font-fira text-muted-foreground uppercase tracking-wider">Annual Events</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Terminal Info with Typing Animation - moved below the main content */}
        <div 
          ref={terminalRef}
          className="text-center mt-16"
        >
          <div className="terminal-text bg-background/50 border border-primary/30 rounded-lg p-4 max-w-md mx-auto">
            <div className="terminal-command text-primary mb-2 font-mono"></div>
            <div className="text-muted-foreground text-sm">
              <div className="terminal-info">Section: About WarP Computer Club</div>
              <div className="terminal-info">Mission: Digital Innovation</div>
              <div className="terminal-info">Status: ✓ Active Community</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
