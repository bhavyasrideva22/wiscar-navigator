import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreCard } from "@/components/assessment/ScoreCard";
import { RadarChart } from "@/components/assessment/RadarChart";
import { AssessmentAnswer, AssessmentResults } from "@/types/assessment";
import { 
  calculatePsychometricScores, 
  calculateTechnicalScores, 
  calculateWISCARScores, 
  generateRecommendation 
} from "@/utils/scoring";
import { ArrowLeft, Download, Share2, Trophy, Target, BookOpen, TrendingUp } from "lucide-react";

export default function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const answersData = localStorage.getItem('assessmentAnswers');
    if (!answersData) {
      navigate('/');
      return;
    }

    try {
      const answers: AssessmentAnswer[] = JSON.parse(answersData);
      
      // Calculate scores
      const psychometric = calculatePsychometricScores(answers);
      const technical = calculateTechnicalScores(answers);
      const wiscar = calculateWISCARScores(answers);
      
      // Generate recommendations
      const assessmentResults = generateRecommendation(psychometric, technical, wiscar);
      
      setResults(assessmentResults);
      setLoading(false);
    } catch (error) {
      console.error('Error processing results:', error);
      navigate('/');
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Analyzing your responses...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>No Results Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Please complete the assessment first.
            </p>
            <Button onClick={() => navigate('/')} variant="hero">
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'yes': return 'bg-gradient-success text-success-foreground';
      case 'maybe': return 'bg-gradient-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRecommendationText = (rec: string) => {
    switch (rec) {
      case 'yes': return 'Highly Recommended';
      case 'maybe': return 'Consider with Development';
      default: return 'Not Recommended Currently';
    }
  };

  const getRecommendationMessage = (rec: string, score: number) => {
    switch (rec) {
      case 'yes':
        return `Excellent! With a score of ${score}%, you show strong potential for success as an Influencer Marketing Manager. Your profile indicates good alignment with the skills and mindset needed in this field.`;
      case 'maybe':
        return `Good potential! With a score of ${score}%, you have a solid foundation but could benefit from developing some key areas before pursuing this career path.`;
      default:
        return `With a score of ${score}%, this career path may not be the best fit currently. Consider exploring alternative roles or developing foundational skills first.`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">
              Your Assessment Results
            </h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of your fit for Influencer Marketing Management
            </p>
          </div>
        </div>

        {/* Overall Recommendation */}
        <Card className="mb-8 shadow-elegant">
          <CardHeader className={`text-center ${getRecommendationColor(results.recommendation)} rounded-t-lg`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-6 h-6" />
              <CardTitle className="text-xl">
                {getRecommendationText(results.recommendation)}
              </CardTitle>
            </div>
            <div className="text-3xl font-bold">
              {results.overallScore}%
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground leading-relaxed">
              {getRecommendationMessage(results.recommendation, results.overallScore)}
            </p>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <ScoreCard
            title="Personality & Motivation"
            score={results.psychometric.overall}
            description="Interest, personality fit, cognitive style, and motivation for influencer marketing"
            color="primary"
          />
          <ScoreCard
            title="Technical Readiness"
            score={results.technical.overall}
            description="Domain knowledge, logical reasoning, numerical ability, and tech skills"
            color="accent"
          />
          <ScoreCard
            title="Career Readiness"
            score={results.wiscar.overall}
            description="WISCAR analysis of will, interest, skill, cognitive readiness, learning ability, and alignment"
            color="success"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* WISCAR Radar Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                WISCAR Framework Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadarChart scores={results.wiscar} />
            </CardContent>
          </Card>

          {/* Detailed Scores */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Detailed Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Psychometric Assessment</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Interest Scale</span>
                    <span className="font-medium">{results.psychometric.interestScale}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Personality Fit</span>
                    <span className="font-medium">{results.psychometric.personalityFit}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cognitive Style</span>
                    <span className="font-medium">{results.psychometric.cognitiveStyle}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Motivation</span>
                    <span className="font-medium">{results.psychometric.motivationPersistence}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Technical Assessment</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Logical Reasoning</span>
                    <span className="font-medium">{results.technical.logicalReasoning}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Numerical Ability</span>
                    <span className="font-medium">{results.technical.numericalAbility}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domain Knowledge</span>
                    <span className="font-medium">{results.technical.domainKnowledge}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tech Skills</span>
                    <span className="font-medium">{results.technical.techSkills}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strengths and Improvements */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <Trophy className="w-5 h-5" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.strengths.length > 0 ? (
                <div className="space-y-2">
                  {results.strengths.map((strength, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2 border-success text-success">
                      {strength}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Complete the assessment to discover your strengths!
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent">
                <Target className="w-5 h-5" />
                Areas for Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.improvements.length > 0 ? (
                <div className="space-y-2">
                  {results.improvements.map((improvement, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2 border-accent text-accent">
                      {improvement}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Great job! No major development areas identified.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Career Paths and Learning Path */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Recommended Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.careerPaths.map((path, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{path}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Learning Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.learningPath.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="hero" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="w-4 h-4 mr-2" />
            Share Results
          </Button>
          <Button 
            variant="accent" 
            size="lg"
            onClick={() => navigate('/assessment')}
          >
            Retake Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}