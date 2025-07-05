
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, ChevronDown, Target, Trophy } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SkillsDisplay from '@/components/SkillsDisplay';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

interface Event {
  id: string;
  title: string;
  description: string;
  event_type: string;
  event_date: string | null;
  venue: string | null;
  max_participants: number | null;
  current_participants: number | null;
  status: string | null;
  featured_image_url: string | null;
  registration_link: string | null;
  registration_deadline: string | null;
  created_at: string;
}

const Events = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [eventsRef, eventsVisible] = useScrollAnimation();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;

      const now = new Date();
      const upcoming: Event[] = [];
      const past: Event[] = [];

      data?.forEach((event) => {
        if (event.status === 'upcoming' || (event.event_date && new Date(event.event_date) > now)) {
          upcoming.push(event);
        } else {
          past.push(event);
        }
      });

      setUpcomingEvents(upcoming);
      setPastEvents(past);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToNextSection = () => {
    const eventsSection = document.querySelector('#upcoming-events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getEventTags = (eventType: string) => {
    switch (eventType.toLowerCase()) {
      case 'intra':
        return ['Competition', 'Programming', 'Intra School'];
      case 'inter':
        return ['Inter School', 'Competition', 'Tech Expo'];
      case 'workshop':
        return ['Workshop', 'Learning', 'Skills'];
      case 'competition':
        return ['Competition', 'Programming', 'Prizes'];
      default:
        return ['Event', 'Tech'];
    }
  };

  const getDefaultImage = (eventType: string) => {
    const images = [
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=300&fit=crop",
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=300&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop"
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">
          <div 
            ref={titleRef}
            className={`scroll-fade-in ${titleVisible ? 'animate' : ''} mb-8`}
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative heading-glow">
              <span className="text-cyber relative z-10">Our Events</span>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Discover amazing opportunities to learn, compete, and innovate with fellow tech enthusiasts
            </p>
          </div>

          {/* Hero Stats Cards with Descriptions */}
          <div className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
            <Card className="bg-card/30 cyber-border hover:border-primary/60 transition-all duration-300">
              <CardHeader className="text-center pb-2 pt-4">
                <div className="flex items-center justify-center mb-2">
                  <Target className="text-primary" size={24} />
                </div>
                <CardTitle className="text-xl font-orbitron font-bold text-primary">
                  {upcomingEvents.length}
                </CardTitle>
                <p className="text-muted-foreground font-fira text-xs">Upcoming Events</p>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <p className="text-center font-fira text-xs text-foreground/80">
                  Exciting competitions and workshops planned for this year to challenge and inspire our community.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 cyber-border hover:border-secondary/60 transition-all duration-300">
              <CardHeader className="text-center pb-2 pt-4">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="text-secondary" size={24} />
                </div>
                <CardTitle className="text-xl font-orbitron font-bold text-secondary">
                  370+
                </CardTitle>
                <p className="text-muted-foreground font-fira text-xs">Total Participants</p>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <p className="text-center font-fira text-xs text-foreground/80">
                  Years of organizing memorable events that have shaped the tech community at our school.
                </p>
              </CardContent>
            </Card>
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
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative title-glow persist-glow">
              <span className="text-cyber relative z-10">Upcoming Events</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          </div>

          <div 
            ref={eventsRef}
            className={`grid md:grid-cols-2 gap-8 mb-20 stagger-children ${eventsVisible ? 'animate' : ''} max-w-6xl mx-auto`}
          >
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="bg-card/50 cyber-border animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <Card 
                key={event.id} 
                className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={event.featured_image_url || getDefaultImage(event.event_type)} 
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {event.registration_link ? 'Open' : 'TBD'}
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
                      <span className="font-fira">
                        {event.event_date ? new Date(event.event_date).toLocaleDateString() : 'TBD'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={16} />
                      <span className="font-fira">
                        {event.event_date ? new Date(event.event_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'TBD'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={16} />
                      <span className="font-fira">{event.venue || 'TBD'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={16} />
                      <span className="font-fira">{event.max_participants || 'Open'}</span>
                    </div>
                  </div>

                  <SkillsDisplay 
                    skills={getEventTags(event.event_type)} 
                    maxVisible={3} 
                    primaryColor="secondary"
                  />

                  {event.registration_link ? (
                    <Button 
                      asChild
                      className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-fira"
                    >
                      <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                        Register Now
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      disabled
                      className="w-full bg-primary/50 text-primary-foreground font-fira"
                    >
                      Registration TBD
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/60 font-fira text-lg">
                No upcoming events at the moment. Check back soon!
              </p>
            </div>
          )}
          </div>

          {/* Past Events */}
          <div className="text-center mb-16 relative">
            <h3 className="text-2xl md:text-4xl font-orbitron font-bold mb-4 relative title-glow persist-glow">
              <span className="text-cyber relative z-10">Past Events</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-accent/20 to-primary/20 blur-xl -z-10 scale-110"></div>
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pastEvents.length > 0 ? pastEvents.map((event) => (
              <Card 
                key={event.id} 
                className="bg-card/30 border-muted/30 hover:border-muted/50 transition-all duration-300 overflow-hidden opacity-80"
              >
                <div className="relative">
                  <img 
                    src={event.featured_image_url || getDefaultImage(event.event_type)} 
                    alt={event.title}
                    className="w-full h-48 object-cover grayscale"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-background/80">
                      {event.status || 'Completed'}
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
                      <span className="font-fira">
                        {event.event_date ? new Date(event.event_date).toLocaleDateString() : 'TBD'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={16} />
                      <span className="font-fira">
                        {event.event_date ? new Date(event.event_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'TBD'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={16} />
                      <span className="font-fira">{event.venue || 'TBD'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={16} />
                      <span className="font-fira">{event.max_participants || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {getEventTags(event.event_type).map((tag) => (
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
            )) : (
              <div className="text-center py-12">
                <p className="text-foreground/60 font-fira text-lg">
                  No past events recorded yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
