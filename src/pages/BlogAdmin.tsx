import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SkeletonLoader from "@/components/SkeletonLoader";

const BlogAdmin = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    imageUrl: "", // maps to featured_image_url
    excerpt: "",
    published: false
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch posts. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("blog_posts")
        .insert([{
          title: formData.title,
          content: formData.content,
          author: formData.author,
          category: formData.category,
          featured_image_url: formData.imageUrl,
          excerpt: formData.excerpt,
          published: formData.published,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);
      if (error) throw error;
      toast({
        title: "Success",
        description: "Post created successfully!",
      });
      setFormData({
        title: "",
        content: "",
        author: "",
        category: "",
        imageUrl: "",
        excerpt: "",
        published: false
      });
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create post. Please try again.",
      });
    }
  };

  const handleEdit = (postId: string) => {
    navigate(`/admin/blog/edit/${postId}`);
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", postId);
      if (error) throw error;
      toast({
        title: "Success",
        description: "Post deleted successfully!",
      });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete post. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">
          <motion.div 
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative">
              <span className="text-cyber relative z-10">Admin Panel</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Create and manage blog posts for WarP Computer Club
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Form Section */}
      <section id="blog-form" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-primary relative inline-block">
              Create New Post
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-150"></div>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          </div>

          <div>
            <Card className="bg-card/50 cyber-border">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-primary">Blog Post Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) =>
                        setFormData({ ...formData, excerpt: e.target.value })
                      }
                      placeholder="Brief summary of the post"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      required
                      className="min-h-[200px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="cybersecurity">
                          Cybersecurity
                        </SelectItem>
                        <SelectItem value="ai">Artificial Intelligence</SelectItem>
                        <SelectItem value="events">Events</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="imageUrl">Featured Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, published: checked as boolean })
                      }
                    />
                    <Label htmlFor="published">Publish immediately</Label>
                  </div>
                  <Button type="submit" className="w-full">
                    Create Post
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Existing Posts Section */}
      <section id="existing-posts" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-16 text-center text-primary relative inline-block">
            Manage Existing Posts
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-150"></div>
          </h2>
          {loading ? (
            <SkeletonLoader count={3} />
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="bg-card/50 cyber-border">
                  <CardHeader>
                    <CardTitle className="text-xl font-orbitron text-primary flex justify-between items-center">
                      <span>{post.title}</span>
                      <span className={`text-sm px-2 py-1 rounded ${post.published ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80 mb-2">
                      <span className="font-semibold">Author:</span> {post.author}
                    </p>
                    <p className="text-sm text-foreground/80 mb-2">
                      <span className="font-semibold">Category:</span> {post.category}
                    </p>
                    <p className="text-sm text-foreground/80 mb-4">
                      {post.excerpt || post.content.substring(0, 200)}...
                    </p>
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(post.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogAdmin;
