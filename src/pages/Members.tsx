import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Members = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [membersRef, membersVisible] = useScrollAnimation();

  const scrollToNextSection = () => {
    const aboutSection = document.querySelector('#members-grid');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const members = [
    {
      id: 1,
      name: "Alex Chen",
      role: "President",
      year: "12th Grade",
      skills: ["Full-Stack Development", "AI/ML", "Cybersecurity"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      github: "alexchen",
      linkedin: "alex-chen-dev",
      email: "alex@school.edu",
      bio: "Passionate about creating innovative solutions that bridge the gap between technology and real-world problems."
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Vice President",
      year: "11th Grade",
      skills: ["Frontend Development", "UI/UX Design", "Mobile Apps"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c77?w=400&h=400&fit=crop&crop=face",
      github: "sarahj",
      linkedin: "sarah-johnson-design",
      email: "sarah@school.edu",
      bio: "Dedicated to crafting beautiful, user-centered digital experiences that make technology accessible to everyone."
    },
    {
      id: 3,
      name: "Marcus Williams",
      role: "Technical Lead",
      year: "12th Grade",
      skills: ["Backend Development", "DevOps", "Cloud Computing"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      github: "marcusw",
      linkedin: "marcus-williams-tech",
      email: "marcus@school.edu",
      bio: "Focused on building robust, scalable systems that power the next generation of digital applications."
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Event Coordinator",
      year: "11th Grade",
      skills: ["Project Management", "Community Building", "Content Creation"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      github: "emilyrod",
      linkedin: "emily-rodriguez-pm",
      email: "emily@school.edu",
      bio: "Passionate about bringing people together through technology and creating inclusive learning environments."
    },
    {
      id: 5,
      name: "David Kim",
      role: "Research Head",
      year: "12th Grade",
      skills: ["Machine Learning", "Data Science", "Research"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      github: "davidkim",
      linkedin: "david-kim-research",
      email: "david@school.edu",
      bio: "Exploring the frontiers of artificial intelligence and its applications in solving complex real-world challenges."
    },
    {
      id: 6,
      name: "Lisa Park",
      role: "Workshop Lead",
      year: "11th Grade",
      skills: ["Teaching", "Web Development", "Game Development"],
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      github: "lisapark",
      linkedin: "lisa-park-educator",
      email: "lisa@school.edu",
      bio: "Dedicated to making programming accessible and fun through interactive workshops and collaborative learning."
    },
    {
      id: 7,
      name: "James Thompson",
      role: "Security Specialist",
      year: "12th Grade",
      skills: ["Cybersecurity", "Ethical Hacking", "Network Security"],
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
      github: "jamest",
      linkedin: "james-thompson-security",
      email: "james@school.edu",
      bio: "Committed to understanding and protecting digital infrastructure through ethical security research and education."
    },
    {
      id: 8,
      name: "Maya Patel",
      role: "Community Manager",
      year: "11th Grade",
      skills: ["Social Media", "Content Strategy", "Community Engagement"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      github: "mayapatel",
      linkedin: "maya-patel-community",
      email: "maya@school.edu",
      bio: "Building bridges between technology enthusiasts and fostering a vibrant, inclusive community of learners."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">
          <div 
            ref={titleRef}
            className={`scroll-fade-in ${titleVisible ? 'animate' : ''}`}
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative">
              <span className="text-cyber relative z-10">Our Members</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Meet the brilliant minds driving innovation at WarP Computer Club
            </p>
          </div>
        </div>

        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to members"
        >
          <ChevronDown className="text-primary" size={24} />
        </button>
      </section>

      {/* Members Grid */}
      <section id="members-grid" className="py-20">
        <div className="container mx-auto px-4">
          <div 
            ref={membersRef}
            className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 stagger-children ${membersVisible ? 'animate' : ''}`}
          >
            {members.map((member) => (
              <Card 
                key={member.id} 
                className="member-card bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-48 object-cover member-image transition-all duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-24 member-fade"></div>
                </div>
                
                <CardContent className="p-6 relative">
                  <h3 className="text-xl font-orbitron font-semibold text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-secondary font-fira text-sm mb-1">{member.role}</p>
                  <p className="text-muted-foreground font-fira text-xs mb-4">{member.year}</p>
                  
                  <p className="text-foreground/80 font-fira text-sm mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.skills.slice(0, 2).map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="text-xs border-primary/30 text-primary"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {member.skills.length > 2 && (
                      <Badge variant="outline" className="text-xs border-muted text-muted-foreground">
                        +{member.skills.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <a 
                      href={`https://github.com/${member.github}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                    </a>
                    <a 
                      href={`https://linkedin.com/in/${member.linkedin}`}
                      className="text-muted-foreground hover:text-secondary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={16} />
                    </a>
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Mail size={16} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Members;
