
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, User, Clock, Tag, ArrowRight } from 'lucide-react';

const Blog = () => {
  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="Safety Insights Blog" 
          subtitle="Expert advice, industry news, and best practices for workplace safety"
          className="mb-12"
        />
        
        {/* Featured Article */}
        <div className="relative mb-16 overflow-hidden rounded-xl border border-border">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/30 z-10"></div>
          <div className="bg-[url('/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png')] bg-cover bg-center h-96"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <Badge className="mb-4" variant="info">Featured</Badge>
            <h2 className="text-3xl font-bold text-white mb-2">The Future of AI in Workplace Safety Management</h2>
            <p className="text-white/80 mb-4 max-w-2xl">
              How artificial intelligence is transforming safety compliance and reducing workplace incidents
            </p>
            <div className="flex items-center space-x-4 text-white/70 mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>Dr. Sarah Johnson</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>July 15, 2025</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>8 min read</span>
              </div>
            </div>
            <Button className="bg-white text-blue-900 hover:bg-white/90">
              Read Article
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
            <TabsList>
              <TabsTrigger value="all">All Articles</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="bestpractices">Best Practices</TabsTrigger>
              <TabsTrigger value="industry">Industry Guides</TabsTrigger>
            </TabsList>
            
            <Button variant="outline">Subscribe to Newsletter</Button>
          </div>
          
          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <BlogCard
                title="OSHA's Updated Guidelines for Construction Safety in 2025"
                excerpt="What you need to know about the latest OSHA regulations for construction sites"
                author="Michael Chen"
                date="July 10, 2025"
                category="Compliance"
                readTime="6 min"
                imageUrl="/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png"
              />
              
              <BlogCard
                title="5 Ways AI Can Identify Safety Risks Before They Cause Incidents"
                excerpt="Predictive analytics and machine learning are changing how we approach risk management"
                author="Dr. Emily Rodriguez"
                date="July 5, 2025"
                category="Technology"
                readTime="5 min"
                imageUrl="/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png"
              />
              
              <BlogCard
                title="Creating a Safety-First Culture: Lessons from Industry Leaders"
                excerpt="How top companies are building safety into their organizational DNA"
                author="James Wilson"
                date="June 28, 2025"
                category="Best Practices"
                readTime="7 min"
                imageUrl="/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png"
              />
              
              <BlogCard
                title="Healthcare Safety Compliance: Navigating Complex Regulations"
                excerpt="A comprehensive guide to maintaining compliance in healthcare settings"
                author="Dr. Lisa Thompson"
                date="June 22, 2025"
                category="Industry Guides"
                readTime="9 min"
                imageUrl="/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png"
              />
              
              <BlogCard
                title="The ROI of Safety: How Preventative Measures Impact Your Bottom Line"
                excerpt="A data-driven analysis of how safety investments yield financial returns"
                author="Robert Martinez"
                date="June 15, 2025"
                category="Best Practices"
                readTime="6 min"
                imageUrl="/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png"
              />
              
              <BlogCard
                title="Mobile Safety Management: Tools for Dispersed Workforces"
                excerpt="How mobile technology is enabling better safety management across multiple locations"
                author="Aisha Johnson"
                date="June 8, 2025"
                category="Technology"
                readTime="5 min"
                imageUrl="/public/lovable-uploads/1c8abfb3-eab0-4bfb-a7c6-2739457ac932.png"
              />
            </div>
            
            <div className="flex justify-center mt-10">
              <Button variant="outline">Load More Articles</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="compliance">
            {/* Content for Compliance tab */}
            <div className="text-center py-8">
              <p className="text-muted-foreground">Displaying articles in the Compliance category.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="technology">
            {/* Content for Technology tab */}
            <div className="text-center py-8">
              <p className="text-muted-foreground">Displaying articles in the Technology category.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="bestpractices">
            {/* Content for Best Practices tab */}
            <div className="text-center py-8">
              <p className="text-muted-foreground">Displaying articles in the Best Practices category.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="industry">
            {/* Content for Industry Guides tab */}
            <div className="text-center py-8">
              <p className="text-muted-foreground">Displaying articles in the Industry Guides category.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
}

const BlogCard = ({ title, excerpt, author, date, category, readTime, imageUrl }: BlogCardProps) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="h-48 overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline">{category}</Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>{readTime}</span>
          </div>
        </div>
        <CardTitle className="mb-2">{title}</CardTitle>
        <CardDescription>{excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center text-sm text-muted-foreground">
          <User className="h-3 w-3 mr-1" />
          <span>{author}</span>
          <span className="mx-2">•</span>
          <Calendar className="h-3 w-3 mr-1" />
          <span>{date}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full justify-between">
          Read Article <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Blog;
