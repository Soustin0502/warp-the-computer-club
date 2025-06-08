import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send email directly using Gmail API or similar service
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'gmail',
          template_id: 'template_contact',
          user_id: 'your_user_id',
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: 'warp.dpsmr@gmail.com'
          }
        })
      });

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you soon.",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      // Fallback to mailto if direct sending fails
      const mailtoLink = `mailto:warp.dpsmr@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      window.location.href = mailtoLink;
      
      toast({
        title: "Email client opened",
        description: "Your default email client should open with the message pre-filled.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-orbitron font-bold mb-4">
              <span className="text-cyber">Contact Us</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
            <p className="text-lg font-fira text-muted-foreground max-w-2xl mx-auto">
              Ready to connect with the digital revolution? Get in touch with us.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="bg-card/50 cyber-border">
              <CardHeader>
                <CardTitle className="font-orbitron text-2xl text-primary">
                  Send Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-fira text-muted-foreground mb-2">Name</label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name" 
                      className="bg-background/50 border-primary/30 focus:border-primary font-fira"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-fira text-muted-foreground mb-2">Email</label>
                    <Input 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email" 
                      className="bg-background/50 border-primary/30 focus:border-primary font-fira"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-fira text-muted-foreground mb-2">Subject</label>
                    <Input 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Message subject" 
                      className="bg-background/50 border-primary/30 focus:border-primary font-fira"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-fira text-muted-foreground mb-2">Message</label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message..." 
                      className="bg-background/50 border-primary/30 focus:border-primary font-fira min-h-[120px]"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-fira"
                    style={{ boxShadow: '0 0 20px hsl(320 100% 65% / 0.4)' }}
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-card/50 cyber-border">
                <CardHeader>
                  <CardTitle className="font-orbitron text-xl text-secondary">
                    Club Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="terminal-text bg-background/50 border border-primary/30 rounded-lg p-4">
                    <div className="text-primary mb-2">$ club --info</div>
                    <div className="text-muted-foreground text-sm space-y-1">
                      <div>Name: WarP Computer Club</div>
                      <div>Founded: 2020</div>
                      <div>Members: 75+</div>
                      <div>Events: 2 Annual</div>
                      <div>Status: ✓ Active</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 cyber-border">
                <CardHeader>
                  <CardTitle className="font-orbitron text-xl text-accent">
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 font-fira text-sm">
                    <div>
                      <div className="text-muted-foreground uppercase tracking-wider mb-1">Email</div>
                      <div className="text-foreground">warp.dpsmr@gmail.com</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground uppercase tracking-wider mb-1">Meeting Times</div>
                      <div className="text-foreground">Mon to Fri, 08:00 AM to 01:00 PM</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground uppercase tracking-wider mb-1">Location</div>
                      <div className="text-foreground">Computer Lab 1/2/3, Senior School Building, Ground Floor</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;