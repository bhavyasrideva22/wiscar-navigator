export interface AssessmentAnswer {
  questionId: string;
  answer: string | number;
  score?: number;
}

export interface PsychometricScores {
  interestScale: number;
  personalityFit: number;
  cognitiveStyle: number;
  motivationPersistence: number;
  overall: number;
}

export interface TechnicalScores {
  logicalReasoning: number;
  numericalAbility: number;
  domainKnowledge: number;
  techSkills: number;
  overall: number;
}

export interface WISCARScores {
  will: number;
  interest: number;
  skill: number;
  cognitiveReadiness: number;
  abilityToLearn: number;
  realWorldAlignment: number;
  overall: number;
}

export interface AssessmentResults {
  psychometric: PsychometricScores;
  technical: TechnicalScores;
  wiscar: WISCARScores;
  overallScore: number;
  recommendation: 'yes' | 'no' | 'maybe';
  strengths: string[];
  improvements: string[];
  careerPaths: string[];
  learningPath: string[];
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'likert' | 'scenario' | 'self-assessment';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  question: string;
  options?: string[];
  scale?: { min: number; max: number; labels: string[] };
  correctAnswer?: string;
  explanation?: string;
}