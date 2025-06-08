
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
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
              Ready to join the digital revolution? Get in touch with us.
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
                <div>
                  <label className="block text-sm font-fira text-muted-foreground mb-2">Name</label>
                  <Input 
                    placeholder="Enter your name" 
                    className="bg-background/50 border-primary/30 focus:border-primary font-fira"
                  />
                </div>
                <div>
                  <label className="block text-sm font-fira text-muted-foreground mb-2">Email</label>
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-background/50 border-primary/30 focus:border-primary font-fira"
                  />
                </div>
                <div>
                  <label className="block text-sm font-fira text-muted-foreground mb-2">Subject</label>
                  <Input 
                    placeholder="Message subject" 
                    className="bg-background/50 border-primary/30 focus:border-primary font-fira"
                  />
                </div>
                <div>
                  <label className="block text-sm font-fira text-muted-foreground mb-2">Message</label>
                  <Textarea 
                    placeholder="Your message..." 
                    className="bg-background/50 border-primary/30 focus:border-primary font-fira min-h-[120px]"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-fira glow-green">
                  Send Message
                </Button>
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
                      <div>Members: 50+</div>
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
                      <div className="text-foreground">warp.computerclub@school.edu</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground uppercase tracking-wider mb-1">Meeting Times</div>
                      <div className="text-foreground">Every Tuesday & Thursday, 3:30 PM</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground uppercase tracking-wider mb-1">Location</div>
                      <div className="text-foreground">Computer Lab - Block C, Room 201</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 cyber-border">
                <CardHeader>
                  <CardTitle className="font-orbitron text-xl text-primary">
                    Join Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-fira text-foreground/80 text-sm leading-relaxed mb-4">
                    Interested in joining WarP? We welcome students passionate about technology, 
                    programming, and innovation. No prior experience required - just bring your curiosity!
                  </p>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 font-fira">
                    Membership Form
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
