import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Target, 
  CheckCircle, 
  Clock,
  ArrowRight,
  Star
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Psychometric Analysis",
      description: "Comprehensive personality and motivation assessment using validated psychological frameworks"
    },
    {
      icon: TrendingUp,
      title: "Technical Skills Evaluation",
      description: "Test your knowledge of influencer marketing, analytics, and industry best practices"
    },
    {
      icon: Target,
      title: "WISCAR Framework",
      description: "Holistic career readiness analysis covering Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment"
    },
    {
      icon: Users,
      title: "Personalized Recommendations",
      description: "Get tailored career guidance and learning paths based on your unique profile"
    }
  ];

  const benefits = [
    "Discover if influencer marketing management is right for you",
    "Identify your strengths and development areas", 
    "Get personalized career path recommendations",
    "Receive a comprehensive WISCAR analysis",
    "Access tailored learning resources and next steps"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            Professional Career Assessment
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Should I Learn<br />
            <span className="text-accent">Influencer Marketing</span><br />
            Management?
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Discover your fit for a career in influencer marketing with our comprehensive assessment. 
            Get personalized insights in just 20-30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="xl" 
              variant="accent"
              onClick={() => navigate('/assessment')}
              className="text-lg font-semibold"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="w-4 h-4" />
              <span>20-30 minutes</span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">30+</div>
              <div className="text-white/80">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">6</div>
              <div className="text-white/80">Assessment Areas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-white/80">Personalized</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* What You'll Get */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What You'll Discover</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our comprehensive assessment provides deep insights into your career readiness and potential
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <Card className="shadow-elegant bg-gradient-to-br from-background to-muted/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Why Take This Assessment?</CardTitle>
              <CardDescription className="text-base">
                Make informed career decisions with data-driven insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Assessment Sections */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Assessment Framework</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three comprehensive sections designed by career experts and psychologists
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="shadow-card border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <CardTitle className="text-primary">Psychometric</CardTitle>
                </div>
                <CardDescription>
                  Personality & Motivation Assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Interest and passion evaluation</li>
                  <li>• Personality fit analysis</li>
                  <li>• Cognitive style assessment</li>
                  <li>• Motivation and persistence testing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card border-l-4 border-l-accent">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <CardTitle className="text-accent">Technical</CardTitle>
                </div>
                <CardDescription>
                  Skills & Knowledge Evaluation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Logical reasoning scenarios</li>
                  <li>• Numerical analysis skills</li>
                  <li>• Industry knowledge quiz</li>
                  <li>• Technology proficiency check</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card border-l-4 border-l-success">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-success" />
                  <CardTitle className="text-success">WISCAR</CardTitle>
                </div>
                <CardDescription>
                  Career Readiness Analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Will and persistence measurement</li>
                  <li>• Interest alignment scoring</li>
                  <li>• Skill evaluation</li>
                  <li>• Learning ability assessment</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="shadow-elegant bg-gradient-hero text-white">
            <CardContent className="py-12">
              <Star className="w-12 h-12 mx-auto mb-6 text-accent" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to Discover Your Career Potential?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Take the first step towards a successful career in influencer marketing management. 
                Get your personalized assessment report today.
              </p>
              <Button 
                size="xl" 
                variant="accent"
                onClick={() => navigate('/assessment')}
                className="text-lg font-semibold"
              >
                Start Your Assessment Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;
