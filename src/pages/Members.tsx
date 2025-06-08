
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Members = () => {
  const members = [
    { name: "Alex Chen", role: "President", expertise: "Full-Stack Development" },
    { name: "Sarah Kim", role: "Vice President", expertise: "AI/ML Engineering" },
    { name: "Marcus Johnson", role: "Secretary", expertise: "Cybersecurity" },
    { name: "Priya Patel", role: "Treasurer", expertise: "Data Science" },
    { name: "David Rodriguez", role: "Event Coordinator", expertise: "Game Development" },
    { name: "Emily Zhang", role: "Tech Lead", expertise: "Cloud Computing" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-orbitron font-bold mb-4">
              <span className="text-cyber">Our Team</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
            <p className="text-lg font-fira text-muted-foreground max-w-2xl mx-auto">
              Meet the digital architects behind WarP Computer Club
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <Card key={index} className="bg-card/50 cyber-border hover:glow-green transition-all duration-300">
                <CardHeader>
                  <CardTitle className="font-orbitron text-primary">{member.name}</CardTitle>
                  <div className="text-secondary font-fira text-sm uppercase tracking-wider">{member.role}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground font-fira text-sm">
                    Specialization: {member.expertise}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="terminal-text bg-background/50 border border-primary/30 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-primary mb-2">$ members --count</div>
              <div className="text-muted-foreground">
                Total Active Members: 50+<br/>
                Core Team: 6<br/>
                Status: ✓ Recruiting New Talent
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Members;
