import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Events = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [eventsRef, eventsVisible] = useScrollAnimation();
  const [upcomingRef, upcomingVisible] = useScrollAnimation();

  const scrollToNextSection = () => {
    const eventsSection = document.querySelector('#upcoming-events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "CodeStorm 2024",
      description: "Annual inter-school programming competition featuring algorithmic challenges, web development, and AI/ML problems.",
      date: "2024-03-15",
      time: "09:00 AM - 06:00 PM",
      location: "School Auditorium",
      participants: "150+",
      tags: ["Competition", "Programming", "Prizes"],
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=300&fit=crop",
      registration: "Open"
    },
    {
      id: 2,
      title: "AI Workshop Series",
      description: "Comprehensive workshop covering machine learning fundamentals, neural networks, and practical AI applications.",
      date: "2024-03-22",
      time: "02:00 PM - 05:00 PM",
      location: "Computer Lab A",
      participants: "50",
      tags: ["Workshop", "AI/ML", "Hands-on"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
      registration: "Open"
    }
  ];

  const pastEvents = [
    {
      id: 3,
      title: "Cybersecurity Bootcamp",
      description: "Intensive bootcamp covering ethical hacking, network security, and digital forensics with industry experts.",
      date: "2024-02-10",
      time: "10:00 AM - 04:00 PM",
      location: "Main Conference Hall",
      participants: "80",
      tags: ["Bootcamp", "Security", "Expert Session"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=300&fit=crop",
      status: "Completed"
    },
    {
      id: 4,
      title: "Web Development Marathon",
      description: "24-hour coding marathon where teams built full-stack web applications from scratch using modern frameworks.",
      date: "2024-01-20",
      time: "12:00 PM - 12:00 PM",
      location: "Innovation Lab",
      participants: "120",
      tags: ["Marathon", "Web Dev", "Team Event"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop",
      status: "Completed"
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
              <span className="text-cyber relative z-10">Our Events</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Discover amazing opportunities to learn, compete, and innovate with fellow tech enthusiasts
            </p>
          </div>
        </div>

        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to events"
        >
          <ChevronDown className="text-primary" size={24} />
        </button>
      </section>

      {/* Upcoming Events */}
      <section id="upcoming-events" className="py-20">
        <div className="container mx-auto px-4">
          <div 
            ref={upcomingRef}
            className={`text-center mb-16 scroll-fade-in ${upcomingVisible ? 'animate' : ''}`}
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-primary">
              Upcoming Events
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          </div>

          <div 
            ref={eventsRef}
            className={`grid md:grid-cols-2 gap-8 mb-20 stagger-children ${eventsVisible ? 'animate' : ''}`}
          >
            {upcomingEvents.map((event) => (
              <Card 
                key={event.id} 
                className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {event.registration}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-orbitron text-primary">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-foreground/80 font-fira text-sm">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} />
                      <span className="font-fira">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={16} />
                      <span className="font-fira">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={16} />
                      <span className="font-fira">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={16} />
                      <span className="font-fira">{event.participants}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs border-secondary/30 text-secondary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-fira">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Past Events */}
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-4xl font-orbitron font-bold mb-4 text-secondary">
              Past Events
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-secondary to-accent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pastEvents.map((event) => (
              <Card 
                key={event.id} 
                className="bg-card/30 border-muted/30 hover:border-muted/50 transition-all duration-300 overflow-hidden opacity-80"
              >
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover grayscale"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-background/80">
                      {event.status}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-orbitron text-muted-foreground">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground font-fira text-sm">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} />
                      <span className="font-fira">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={16} />
                      <span className="font-fira">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={16} />
                      <span className="font-fira">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={16} />
                      <span className="font-fira">{event.participants}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs border-muted/30 text-muted-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
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

export default Events;
