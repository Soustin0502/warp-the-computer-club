import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Members = () => {
  const members = [
    { name: "Soustin Roy", role: "President", expertise: "Full-Stack Development", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    { name: "Deeptanshu Shekhar", role: "President", expertise: "AI/ML Engineering", image: "https://images.unsplash.com/photo-1494790108755-2616b612b788?w=150&h=150&fit=crop&crop=face" },
    { name: "Girisha Mehra", role: "Vice President", expertise: "Cybersecurity", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    { name: "Aayan Ahmed War", role: "Vice President", expertise: "Data Science", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
    { name: "Ayaan Ali", role: "Executive", expertise: "Game Development", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
    { name: "Rishit Uppal", role: "Executive", expertise: "Cloud Computing", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
    { name: "Ansh Mittal", role: "Executive", expertise: "Mobile Development", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face" },
    { name: "Kunal Kachhawa", role: "Executive", expertise: "UI/UX Design", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face" },
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((member, index) => (
              <Card key={index} className="bg-card/50 cyber-border hover:glow-green transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="text-lg font-orbitron">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="font-orbitron text-primary text-lg">{member.name}</CardTitle>
                  <div className="text-secondary font-fira text-sm uppercase tracking-wider">{member.role}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground font-fira text-sm text-center">
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
                Total Active Members: 75+<br/>
                Core Team: 8
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Members;