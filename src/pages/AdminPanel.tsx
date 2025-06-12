import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Calendar, MessageSquare, BookOpen, Plus, Edit, Trash2, MapPin, ChevronDown, X } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const AdminPanel = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [cardsRef, cardsVisible] = useScrollAnimation();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalEvents: 0,
    totalTestimonials: 0,
    totalBlogPosts: 0
  });
  
  const scrollToNextSection = () => {
    const adminSection = document.getElementById('admin');
    if (adminSection) {
      adminSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [eventFormData, setEventFormData] = useState({
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

  const [blogFormData, setBlogFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    published: false
  });

  useEffect(() => {
    fetchStats();
    fetchEvents();
    fetchBlogPosts();
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

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order('created_at', { ascending: false });
      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  const handleSectionToggle = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
    setShowEventForm(false);
    setShowBlogForm(false);
    setEditingEvent(null);
    setEditingBlog(null);
  };

  const resetEventForm = () => {
    setEventFormData({
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
    setShowEventForm(false);
  };

  const resetBlogForm = () => {
    setBlogFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      published: false
    });
    setEditingBlog(null);
    setShowBlogForm(false);
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const eventData = {
        title: eventFormData.title,
        description: eventFormData.description,
        event_date: eventFormData.eventDate || null,
        venue: eventFormData.venue,
        event_type: eventFormData.eventType,
        max_participants: eventFormData.maxParticipants ? parseInt(eventFormData.maxParticipants) : null,
        featured_image_url: eventFormData.imageUrl,
        registration_link: eventFormData.registrationLink,
        brochure_link: eventFormData.brochureLink,
        status: eventFormData.status,
      };

      if (editingEvent) {
        const { error } = await supabase
          .from("events")
          .update(eventData)
          .eq("id", editingEvent.id);
        if (error) throw error;
        toast({ title: "Success", description: "Event updated successfully!" });
      } else {
        const { error } = await supabase
          .from("events")
          .insert([{ ...eventData, current_participants: 0 }]);
        if (error) throw error;
        toast({ title: "Success", description: "Event created successfully!" });
      }
      
      resetEventForm();
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

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const blogData = {
        title: blogFormData.title,
        excerpt: blogFormData.excerpt,
        content: blogFormData.content,
        author: blogFormData.author,
        category: blogFormData.category,
        published: blogFormData.published,
      };

      if (editingBlog) {
        const { error } = await supabase
          .from("blog_posts")
          .update(blogData)
          .eq("id", editingBlog.id);
        if (error) throw error;
        toast({ title: "Success", description: "Blog post updated successfully!" });
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([blogData]);
        if (error) throw error;
        toast({ title: "Success", description: "Blog post created successfully!" });
      }
      
      resetBlogForm();
      fetchBlogPosts();
      fetchStats();
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save blog post. Please try again.",
      });
    }
  };

  const handleEventEdit = (event: Event) => {
    setEditingEvent(event);
    setEventFormData({
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
    setShowEventForm(true);
  };

  const handleBlogEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      published: blog.published
    });
    setShowBlogForm(true);
  };

  const handleEventDelete = async (eventId: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const { error } = await supabase.from("events").delete().eq("id", eventId);
      if (error) throw error;
      toast({ title: "Success", description: "Event deleted successfully!" });
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

  const handleBlogDelete = async (blogId: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", blogId);
      if (error) throw error;
      toast({ title: "Success", description: "Blog post deleted successfully!" });
      fetchBlogPosts();
      fetchStats();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
      });
    }
  };

  const adminSections = [
    {
      id: "members",
      title: "Members Management",
      description: "Manage club members and their roles",
      icon: Users,
      count: stats.totalMembers,
      color: "primary",
      link: "/members"
    },
    {
      id: "events",
      title: "Events Management",
      description: "Create and manage club events",
      icon: Calendar,
      count: stats.totalEvents,
      color: "secondary"
    },
    {
      id: "testimonials",
      title: "Testimonials",
      description: "Review and approve testimonials",
      icon: MessageSquare,
      count: stats.totalTestimonials,
      color: "accent",
      link: "/feedbacks"
    },
    {
      id: "blogs",
      title: "Blog Posts",
      description: "Manage blog content and posts",
      icon: BookOpen,
      count: stats.totalBlogPosts,
      color: "primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">
          <div 
            ref={titleRef}
            className={`mb-8 scroll-fade-in ${titleVisible ? 'animate' : ''}`}
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative heading-glow">
              <span className="text-cyber relative z-10">Admin Panel</span>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Manage your WarP Computer Club operations and content
            </p>
          </div>
        </div>

        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to admin section"
        >
          <ChevronDown className="text-primary" size={24} />
        </button>
      </section>

      {/* Admin Management Cards */}
      <section id="admin" className="py-20">
        <div className="container mx-auto px-4">
          <div 
            ref={cardsRef}
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16 stagger-children ${cardsVisible ? 'animate' : ''}`}
          >
            {adminSections.map((section) => (
              <Card 
                key={section.id}
                className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 card-glossy-glow"
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
                  {section.link ? (
                    <Button 
                      asChild 
                      className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-fira"
                    >
                      <a href={section.link}>Manage</a>
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleSectionToggle(section.id)}
                      className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-fira"
                    >
                      {activeSection === section.id ? 'Close' : 'Manage'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Expandable Management Sections */}
          <div className="max-w-6xl mx-auto">
            {/* Events Management Section */}
            {activeSection === 'events' && (
              <div className="animate-fade-in">
                <Card className="bg-card/50 cyber-border mb-8">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-orbitron text-primary">
                      Events Management
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveSection(null)}
                    >
                      <X size={20} />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <Button 
                        onClick={() => setShowEventForm(!showEventForm)} 
                        className="bg-primary hover:bg-primary/80 text-primary-foreground font-fira"
                      >
                        <Plus className="mr-2" size={16} />
                        {showEventForm ? 'Cancel' : 'Add New Event'}
                      </Button>
                    </div>

                    {/* Event Form */}
                    {showEventForm && (
                      <Card className="bg-background/50 border border-primary/30 mb-6">
                        <CardHeader>
                          <CardTitle className="text-xl font-orbitron text-primary">
                            {editingEvent ? 'Edit Event' : 'Create New Event'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={handleEventSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="title">Event Title</Label>
                                <Input
                                  id="title"
                                  value={eventFormData.title}
                                  onChange={(e) => setEventFormData({...eventFormData, title: e.target.value})}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="eventType">Event Type</Label>
                                <Select value={eventFormData.eventType} onValueChange={(value) => setEventFormData({...eventFormData, eventType: value})}>
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
                                  value={eventFormData.eventDate}
                                  onChange={(e) => setEventFormData({...eventFormData, eventDate: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="venue">Venue</Label>
                                <Input
                                  id="venue"
                                  value={eventFormData.venue}
                                  onChange={(e) => setEventFormData({...eventFormData, venue: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="maxParticipants">Max Participants</Label>
                                <Input
                                  id="maxParticipants"
                                  type="number"
                                  value={eventFormData.maxParticipants}
                                  onChange={(e) => setEventFormData({...eventFormData, maxParticipants: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="status">Status</Label>
                                <Select value={eventFormData.status} onValueChange={(value) => setEventFormData({...eventFormData, status: value})}>
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
                                  value={eventFormData.imageUrl}
                                  onChange={(e) => setEventFormData({...eventFormData, imageUrl: e.target.value})}
                                  placeholder="https://example.com/image.jpg"
                                />
                              </div>
                              <div>
                                <Label htmlFor="registrationLink">Registration Link</Label>
                                <Input
                                  id="registrationLink"
                                  value={eventFormData.registrationLink}
                                  onChange={(e) => setEventFormData({...eventFormData, registrationLink: e.target.value})}
                                  placeholder="https://forms.google.com/..."
                                />
                              </div>
                              <div className="md:col-span-2">
                                <Label htmlFor="brochureLink">Brochure Link</Label>
                                <Input
                                  id="brochureLink"
                                  value={eventFormData.brochureLink}
                                  onChange={(e) => setEventFormData({...eventFormData, brochureLink: e.target.value})}
                                  placeholder="https://example.com/brochure.pdf"
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                id="description"
                                value={eventFormData.description}
                                onChange={(e) => setEventFormData({...eventFormData, description: e.target.value})}
                                rows={4}
                                required
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button type="submit" className="bg-primary hover:bg-primary/80">
                                {editingEvent ? 'Update Event' : 'Create Event'}
                              </Button>
                              <Button type="button" variant="outline" onClick={resetEventForm}>
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </CardContent>
                      </Card>
                    )}

                    {/* Events List */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                  onClick={() => handleEventEdit(event)}
                                  className="flex-1"
                                >
                                  <Edit size={14} className="mr-1" />
                                  Edit
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive" 
                                  onClick={() => handleEventDelete(event.id)}
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Blog Management Section */}
            {activeSection === 'blogs' && (
              <div className="animate-fade-in">
                <Card className="bg-card/50 cyber-border mb-8">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-orbitron text-primary">
                      Blog Management
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveSection(null)}
                    >
                      <X size={20} />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <Button 
                        onClick={() => setShowBlogForm(!showBlogForm)} 
                        className="bg-primary hover:bg-primary/80 text-primary-foreground font-fira"
                      >
                        <Plus className="mr-2" size={16} />
                        {showBlogForm ? 'Cancel' : 'Add New Blog Post'}
                      </Button>
                    </div>

                    {/* Blog Form */}
                    {showBlogForm && (
                      <Card className="bg-background/50 border border-primary/30 mb-6">
                        <CardHeader>
                          <CardTitle className="text-xl font-orbitron text-primary">
                            {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={handleBlogSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="blogTitle">Title</Label>
                                <Input
                                  id="blogTitle"
                                  value={blogFormData.title}
                                  onChange={(e) => setBlogFormData({...blogFormData, title: e.target.value})}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="author">Author</Label>
                                <Input
                                  id="author"
                                  value={blogFormData.author}
                                  onChange={(e) => setBlogFormData({...blogFormData, author: e.target.value})}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="category">Category</Label>
                                <Select value={blogFormData.category} onValueChange={(value) => setBlogFormData({...blogFormData, category: value})}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="announcement">Announcement</SelectItem>
                                    <SelectItem value="social">Social</SelectItem>
                                    <SelectItem value="event">Event</SelectItem>
                                    <SelectItem value="tech">Tech</SelectItem>
                                    <SelectItem value="news">News</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  id="published"
                                  type="checkbox"
                                  checked={blogFormData.published}
                                  onChange={(e) => setBlogFormData({...blogFormData, published: e.target.checked})}
                                />
                                <Label htmlFor="published">Published</Label>
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="excerpt">Excerpt</Label>
                              <Textarea
                                id="excerpt"
                                value={blogFormData.excerpt}
                                onChange={(e) => setBlogFormData({...blogFormData, excerpt: e.target.value})}
                                rows={3}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="content">Content</Label>
                              <Textarea
                                id="content"
                                value={blogFormData.content}
                                onChange={(e) => setBlogFormData({...blogFormData, content: e.target.value})}
                                rows={8}
                                required
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button type="submit" className="bg-primary hover:bg-primary/80">
                                {editingBlog ? 'Update Post' : 'Create Post'}
                              </Button>
                              <Button type="button" variant="outline" onClick={resetBlogForm}>
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </CardContent>
                      </Card>
                    )}

                    {/* Blog Posts List */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {blogPosts.map((post) => (
                        <Card key={post.id} className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg font-orbitron text-primary line-clamp-2">
                              {post.title}
                            </CardTitle>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{post.author}</span>
                              <span className={`px-2 py-1 rounded ${post.published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {post.published ? 'Published' : 'Draft'}
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-sm text-foreground/80 line-clamp-3">{post.excerpt}</p>
                            <div className="flex gap-2 pt-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleBlogEdit(post)}
                                className="flex-1"
                              >
                                <Edit size={14} className="mr-1" />
                                Edit
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                onClick={() => handleBlogDelete(post.id)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminPanel;
