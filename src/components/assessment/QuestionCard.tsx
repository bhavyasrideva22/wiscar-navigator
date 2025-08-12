import { Question } from "@/types/assessment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface QuestionCardProps {
  question: Question;
  onAnswer: (questionId: string, answer: string | number, score?: number) => void;
  currentAnswer?: string | number;
}

export function QuestionCard({ question, onAnswer, currentAnswer }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>(
    currentAnswer?.toString() || ""
  );

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
    
    let score: number | undefined;
    
    // Calculate score for technical questions with correct answers
    if (question.correctAnswer && question.type === 'multiple-choice') {
      const selectedOption = question.options?.[parseInt(value)];
      score = selectedOption === question.correctAnswer ? 100 : 0;
    }
    
    onAnswer(question.id, value, score);
  };

  const getSectionColor = () => {
    switch (question.category) {
      case 'psychometric':
        return 'border-l-primary';
      case 'technical':
        return 'border-l-accent';
      case 'wiscar':
        return 'border-l-success';
      default:
        return 'border-l-primary';
    }
  };

  const getSectionTitle = () => {
    switch (question.category) {
      case 'psychometric':
        return 'Personality & Motivation Assessment';
      case 'technical':
        return 'Technical Skills & Knowledge';
      case 'wiscar':
        return 'Career Readiness Analysis';
      default:
        return 'Assessment';
    }
  };

  return (
    <Card className={`shadow-card border-l-4 ${getSectionColor()}`}>
      <CardHeader>
        <CardDescription className="text-sm font-medium text-primary">
          {getSectionTitle()}
        </CardDescription>
        <CardTitle className="text-lg leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {question.type === 'multiple-choice' && question.options && (
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 cursor-pointer text-sm leading-relaxed"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {(question.type === 'likert' || question.type === 'self-assessment') && question.scale && (
          <div className="space-y-3">
            <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
              {question.scale.labels.map((label, index) => {
                const value = (index + 1).toString();
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={value} id={`scale-${index}`} />
                    <Label 
                      htmlFor={`scale-${index}`} 
                      className="flex-1 cursor-pointer text-sm"
                    >
                      <span className="font-medium">{index + 1}.</span> {label}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        )}

        {question.type === 'scenario' && question.options && (
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={index.toString()} id={`scenario-${index}`} />
                <Label 
                  htmlFor={`scenario-${index}`} 
                  className="flex-1 cursor-pointer text-sm leading-relaxed"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.explanation && selectedAnswer && (
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm text-primary">
              <span className="font-medium">Explanation:</span> {question.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}