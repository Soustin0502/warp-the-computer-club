import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import SkeletonLoader from "@/components/SkeletonLoader";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url?: string;
}

const Events = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [eventsRef, eventsVisible] = useScrollAnimation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });
      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-background/90 z-10" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-1/2 w-[100rem] h-[100rem] bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -right-1/2 w-[100rem] h-[100rem] bg-secondary/20 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-20">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative inline-block">
              <span className="text-cyber relative z-10">Events</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-[100px] scale-150" />
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto">
              Join us for exciting tech events and workshops
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />
      </section>

      {/* Events Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            ref={eventsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={eventsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative inline-block">
              <span className="text-cyber relative z-10">Upcoming Events</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-[100px] scale-150" />
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
          </motion.div>

          {loading ? (
            <SkeletonLoader count={3} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="bg-card/50 cyber-border">
                  {event.image_url && (
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-orbitron text-primary mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-foreground/80 mb-4">
                      {event.description}
                    </p>
                    <div className="flex flex-col space-y-2 text-sm text-foreground/60">
                      <p>
                        <span className="font-semibold">Date:</span>{" "}
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-semibold">Location:</span>{" "}
                        {event.location}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
