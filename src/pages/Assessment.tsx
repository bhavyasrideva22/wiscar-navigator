import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { ProgressBar } from "@/components/assessment/ProgressBar";
import { assessmentQuestions } from "@/data/questions";
import { AssessmentAnswer } from "@/types/assessment";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Assessment() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

  useEffect(() => {
    if (currentQuestionIndex >= assessmentQuestions.length) {
      setIsComplete(true);
    }
  }, [currentQuestionIndex]);

  const handleAnswer = (questionId: string, answer: string | number, score?: number) => {
    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === questionId);
      const newAnswer: AssessmentAnswer = { questionId, answer, score };
      
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newAnswer;
        return updated;
      } else {
        return [...prev, newAnswer];
      }
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Assessment complete, navigate to results
      localStorage.setItem('assessmentAnswers', JSON.stringify(answers));
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const canProceed = () => {
    return currentAnswer !== undefined;
  };

  const getSectionInfo = () => {
    const psychometricCount = assessmentQuestions.filter(q => q.category === 'psychometric').length;
    const technicalCount = assessmentQuestions.filter(q => q.category === 'technical').length;
    const wiscarCount = assessmentQuestions.filter(q => q.category === 'wiscar').length;
    
    if (currentQuestionIndex < psychometricCount) {
      return { section: 'Personality & Motivation', current: currentQuestionIndex + 1, total: psychometricCount };
    } else if (currentQuestionIndex < psychometricCount + technicalCount) {
      return { section: 'Technical Skills', current: currentQuestionIndex - psychometricCount + 1, total: technicalCount };
    } else {
      return { section: 'Career Readiness', current: currentQuestionIndex - psychometricCount - technicalCount + 1, total: wiscarCount };
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>Assessment Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Redirecting to your results...
            </p>
            <Button onClick={() => navigate('/results')} variant="hero">
              View Results
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sectionInfo = getSectionInfo();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
              Influencer Marketing Manager Assessment
            </h1>
            <p className="text-muted-foreground">
              Discover your fit for a career in influencer marketing management
            </p>
          </div>
          
          <ProgressBar 
            current={currentQuestionIndex + 1} 
            total={assessmentQuestions.length}
            className="mb-4"
          />
          
          <div className="text-center text-sm text-muted-foreground">
            <span className="font-medium">{sectionInfo.section}</span> • 
            Question {sectionInfo.current} of {sectionInfo.total} in this section
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            currentAnswer={currentAnswer?.answer}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="text-sm text-muted-foreground">
            {currentQuestionIndex + 1} of {assessmentQuestions.length}
          </div>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            variant={currentQuestionIndex === assessmentQuestions.length - 1 ? "success" : "default"}
          >
            {currentQuestionIndex === assessmentQuestions.length - 1 ? (
              <>
                Complete Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}