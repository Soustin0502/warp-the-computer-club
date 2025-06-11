
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Calendar, MessageSquare, BookOpen, Settings, BarChart3, Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string | null;
  venue: string | null;
  event_type: string;
  status: string | null;
  max_participants: number | null;
  current_participants: number | null;
  featured_image_url: string | null;
  registration_link: string | null;
  brochure_link: string | null;
  created_at: string;
  updated_at: string;
}

const AdminPanel = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalEvents: 0,
    totalTestimonials: 0,
    totalBlogPosts: 0
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    venue: "",
    eventType: "",
    maxParticipants: "",
    imageUrl: "",
    registrationLink: "",
    brochureLink: "",
    status: "upcoming"
  });

  useEffect(() => {
    fetchStats();
    fetchEvents();
  }, []);

  const fetchStats = async () => {
    try {
      const [events, testimonials, blogPosts] = await Promise.all([
        supabase.from('events').select('id', { count: 'exact' }),
        supabase.from('testimonials').select('id', { count: 'exact' }),
        supabase.from('blog_posts').select('id', { count: 'exact' })
      ]);

      setStats({
        totalMembers: 8, // Static count from Members page
        totalEvents: events.count || 0,
        totalTestimonials: testimonials.count || 0,
        totalBlogPosts: blogPosts.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order('created_at', { ascending: false });
      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch events. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      eventDate: "",
      venue: "",
      eventType: "",
      maxParticipants: "",
      imageUrl: "",
      registrationLink: "",
      brochureLink: "",
      status: "upcoming"
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        event_date: formData.eventDate || null,
        venue: formData.venue,
        event_type: formData.eventType,
        max_participants: formData.maxParticipants ? parseInt(formData.maxParticipants) : null,
        featured_image_url: formData.imageUrl,
        registration_link: formData.registrationLink,
        brochure_link: formData.brochureLink,
        status: formData.status,
      };

      if (editingEvent) {
        const { error } = await supabase
          .from("events")
          .update(eventData)
          .eq("id", editingEvent.id);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Event updated successfully!",
        });
      } else {
        const { error } = await supabase
          .from("events")
          .insert([{ ...eventData, current_participants: 0 }]);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Event created successfully!",
        });
      }
      
      resetForm();
      fetchEvents();
      fetchStats();
    } catch (error) {
      console.error("Error saving event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save event. Please try again.",
      });
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      eventDate: event.event_date ? event.event_date.split('T')[0] : "",
      venue: event.venue || "",
      eventType: event.event_type,
      maxParticipants: event.max_participants?.toString() || "",
      imageUrl: event.featured_image_url || "",
      registrationLink: event.registration_link || "",
      brochureLink: event.brochure_link || "",
      status: event.status || "upcoming"
    });
    setShowForm(true);
  };

  const handleDelete = async (eventId: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId);
      if (error) throw error;
      toast({
        title: "Success",
        description: "Event deleted successfully!",
      });
      fetchEvents();
      fetchStats();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete event. Please try again.",
      });
    }
  };

  const adminSections = [
    {
      title: "Members Management",
      description: "Manage club members and their roles",
      icon: Users,
      count: stats.totalMembers,
      color: "primary",
      link: "/members"
    },
    {
      title: "Events Management",
      description: "Create and manage club events",
      icon: Calendar,
      count: stats.totalEvents,
      color: "secondary",
      link: "/events/admin"
    },
    {
      title: "Testimonials",
      description: "Review and approve testimonials",
      icon: MessageSquare,
      count: stats.totalTestimonials,
      color: "accent",
      link: "/feedbacks"
    },
    {
      title: "Blog Posts",
      description: "Manage blog content and posts",
      icon: BookOpen,
      count: stats.totalBlogPosts,
      color: "primary",
      link: "/blog/admin"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">
          <motion.div 
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative heading-glow">
              <span className="text-cyber relative z-10">Admin Panel</span>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Manage your WarP Computer Club operations and content
            </p>
          </motion.div>
        </div>
      </section>

      {/* Admin Stats and Management */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={statsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative heading-glow">
              <span className="text-cyber relative z-10">Events Management</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          </motion.div>

          {/* Add New Event Button */}
          <div className="text-center mb-8">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-primary hover:bg-primary/80 text-primary-foreground font-fira"
            >
              <Plus className="mr-2" size={16} />
              {showForm ? 'Cancel' : 'Add New Event'}
            </Button>
          </div>

          {/* Event Form */}
          {showForm && (
            <Card className="bg-card/50 cyber-border mb-8 max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-primary">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventType">Event Type</Label>
                      <Select value={formData.eventType} onValueChange={(value) => setFormData({...formData, eventType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Intra School Competition">Intra School Competition</SelectItem>
                          <SelectItem value="Inter School Competition">Inter School Competition</SelectItem>
                          <SelectItem value="Workshop">Workshop</SelectItem>
                          <SelectItem value="Seminar">Seminar</SelectItem>
                          <SelectItem value="Hackathon">Hackathon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="eventDate">Event Date</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="venue">Venue</Label>
                      <Input
                        id="venue"
                        value={formData.venue}
                        onChange={(e) => setFormData({...formData, venue: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxParticipants">Max Participants</Label>
                      <Input
                        id="maxParticipants"
                        type="number"
                        value={formData.maxParticipants}
                        onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="imageUrl">Featured Image URL</Label>
                      <Input
                        id="imageUrl"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="registrationLink">Registration Link</Label>
                      <Input
                        id="registrationLink"
                        value={formData.registrationLink}
                        onChange={(e) => setFormData({...formData, registrationLink: e.target.value})}
                        placeholder="https://forms.google.com/..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="brochureLink">Brochure Link</Label>
                      <Input
                        id="brochureLink"
                        value={formData.brochureLink}
                        onChange={(e) => setFormData({...formData, brochureLink: e.target.value})}
                        placeholder="https://example.com/brochure.pdf"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-primary hover:bg-primary/80">
                      {editingEvent ? 'Update Event' : 'Create Event'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Events List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <Card key={i} className="bg-card/50 cyber-border animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              events.map((event) => (
                <Card key={event.id} className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300">
                  {event.featured_image_url && (
                    <div className="relative h-48">
                      <img 
                        src={event.featured_image_url} 
                        alt={event.title}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-orbitron text-primary line-clamp-1">
                      {event.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      <span>{event.event_date ? new Date(event.event_date).toLocaleDateString() : "TBD"}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-foreground/80 line-clamp-2">{event.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{event.venue || "TBD"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>{event.max_participants || "N/A"}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleEdit(event)}
                        className="flex-1"
                      >
                        <Edit size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleDelete(event.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {adminSections.map((section, index) => (
              <Card 
                key={section.title}
                className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300"
              >
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <section.icon className={`text-${section.color}`} size={48} />
                  </div>
                  <CardTitle className={`text-2xl font-orbitron font-bold text-${section.color}`}>
                    {section.count}
                  </CardTitle>
                  <p className="text-muted-foreground font-fira text-sm">{section.title}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-center font-fira text-sm text-foreground/80 mb-4">
                    {section.description}
                  </p>
                  <Button 
                    asChild 
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-fira"
                  >
                    <a href={section.link}>Manage</a>
                  </Button>
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

export default AdminPanel;
