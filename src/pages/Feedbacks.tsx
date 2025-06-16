import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, User, Calendar, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import FeedbackForm from '@/components/FeedbackForm';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAPScrollTrigger } from '@/hooks/useGSAPAnimation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

gsap.registerPlugin(TextPlugin);

interface Testimonial {
  id: string;
  name: string;
  position?: string;
  feedback: string;
  rating?: number;
  created_at: string;
}

const Feedbacks = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(4);

  // Hero title animation
  const titleRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 60,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      }
    );
  }, { start: "top 80%" });

  // Feedbacks section animation
  const feedbacksRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
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

  // Cards animation using useScrollAnimation hook
  const [cardsRef, cardsVisible] = useScrollAnimation();

  // Form heading animation
  const formHeadingRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }
    );
  }, { start: "top 80%" });

  // Terminal animation with typing effect - same as other pages
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
      text: "$ feedbacks --info",
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Calculate initial display count based on screen width
  useEffect(() => {
    const calculateInitialCount = () => {
      const screenWidth = window.innerWidth;
      let itemsPerRow;
      
      if (screenWidth >= 1280) { // xl
        itemsPerRow = 4;
      } else if (screenWidth >= 1024) { // lg
        itemsPerRow = 3;
      } else if (screenWidth >= 768) { // md
        itemsPerRow = 2;
      } else {
        itemsPerRow = 1;
      }
      
      setDisplayCount(itemsPerRow);
    };

    calculateInitialCount();
    
    const handleResize = () => {
      calculateInitialCount();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      console.log('Fetching testimonials for Feedbacks page...');
      
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      console.log('Supabase response for feedbacks page:', { data, error });

      if (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
      }
      
      if (data) {
        console.log('Testimonials fetched for feedbacks page:', data);
        setTestimonials(data);
      } else {
        console.log('No testimonials data received');
        setTestimonials([]);
      }
    } catch (error) {
      console.error('Error in fetchTestimonials:', error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const scrollToNextSection = () => {
    const testimonialSection = document.getElementById('testimonials');
    if (testimonialSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: testimonialSection, offsetY: 0 },
        ease: "power2.inOut"
      });
    }
  };

  const loadMore = () => {
    const screenWidth = window.innerWidth;
    let itemsPerRow;
    
    if (screenWidth >= 1280) { // xl
      itemsPerRow = 4;
    } else if (screenWidth >= 1024) { // lg
      itemsPerRow = 3;
    } else if (screenWidth >= 768) { // md
      itemsPerRow = 2;
    } else {
      itemsPerRow = 1;
    }
    
    setDisplayCount(prev => prev + itemsPerRow);
  };

  const displayedTestimonials = testimonials.slice(0, displayCount);
  console.log('Displayed testimonials:', displayedTestimonials);
  const hasMore = testimonials.length > displayCount;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">
          <div 
            ref={titleRef}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative heading-glow">
              <span className="text-cyber relative z-10">Feedbacks</span>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              See what our community members say about WarP Computer Club
            </p>
          </div>
        </div>

        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="text-primary" size={24} />
        </button>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div 
            ref={feedbacksRef}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-primary relative heading-glow">
              <span className="text-cyber relative z-10">Community Feedbacks</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          </div>

          {/* Terminal Info with Typing Animation */}
          {loading ? (
            <div className="flex justify-center">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl w-full">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="bg-card/50 cyber-border animate-pulse h-80 card-glossy-glow">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60 font-fira text-lg">
                No feedbacks available yet. Be the first to share your experience!
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-center">
                <div 
                  ref={cardsRef}
                  className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl w-full stagger-children ${cardsVisible ? 'animate' : ''}`}
                >
                  {displayedTestimonials.map((testimonial) => (
                    <div key={testimonial.id}>
                      <Card className="testimonial-card bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 h-80 card-glossy-glow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-orbitron text-primary">
                              {testimonial.name}
                            </CardTitle>
                            {testimonial.rating && (
                              <div className="flex gap-1">
                                {renderStars(testimonial.rating)}
                              </div>
                            )}
                          </div>
                          {testimonial.position && (
                            <Badge variant="outline" className="w-fit">
                              {testimonial.position}
                            </Badge>
                          )}
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar size={14} />
                            <span className="font-fira">
                              {new Date(testimonial.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <p className="text-foreground/80 font-fira text-sm leading-relaxed">
                            "{testimonial.feedback}"
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {hasMore && (
                <div className="text-center mt-12">
                  <Button 
                    onClick={loadMore}
                    className="bg-primary hover:bg-primary/80 text-primary-foreground font-fira"
                  >
                    Load More Feedbacks
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        <div 
            ref={terminalRef}
            className="text-center mb-16"
          >
            <div className="terminal-text bg-background/50 border border-primary/30 rounded-lg p-4 max-w-md mx-auto">
              <div className="terminal-command text-primary mb-2 font-mono"></div>
              <div className="text-muted-foreground text-sm">
                <div className="terminal-info">Total Feedbacks: {testimonials.length}</div>
                <div className="terminal-info">Average Rating: 4.8/5</div>
                <div className="terminal-info">Status: ✓ Community Approved</div>
              </div>
            </div>
          </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div 
            ref={formHeadingRef}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative heading-glow">
              <span className="text-cyber relative z-10">Give your Feedback</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <FeedbackForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Feedbacks;
