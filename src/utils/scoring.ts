import { AssessmentAnswer, AssessmentResults, PsychometricScores, TechnicalScores, WISCARScores } from "@/types/assessment";

export function calculatePsychometricScores(answers: AssessmentAnswer[]): PsychometricScores {
  const interestAnswers = answers.filter(a => a.questionId.includes('interest'));
  const personalityAnswers = answers.filter(a => a.questionId.includes('personality'));
  const cognitiveAnswers = answers.filter(a => a.questionId.includes('cognitive'));
  const motivationAnswers = answers.filter(a => a.questionId.includes('motivation'));

  const interestScale = calculateAverage(interestAnswers) * 20; // Convert to 0-100
  const personalityFit = calculateAverage(personalityAnswers) * 20;
  const cognitiveStyle = calculateCognitiveScore(cognitiveAnswers);
  const motivationPersistence = calculateAverage(motivationAnswers) * 20;

  const overall = Math.round((interestScale + personalityFit + cognitiveStyle + motivationPersistence) / 4);

  return {
    interestScale: Math.round(interestScale),
    personalityFit: Math.round(personalityFit),
    cognitiveStyle: Math.round(cognitiveStyle),
    motivationPersistence: Math.round(motivationPersistence),
    overall
  };
}

export function calculateTechnicalScores(answers: AssessmentAnswer[]): TechnicalScores {
  const logicalAnswers = answers.filter(a => a.questionId.includes('logic'));
  const numericalAnswers = answers.filter(a => a.questionId.includes('numerical'));
  const domainAnswers = answers.filter(a => a.questionId.includes('domain'));
  const techAnswers = answers.filter(a => a.questionId.includes('tech'));

  const logicalReasoning = calculateCorrectAnswerPercentage(logicalAnswers);
  const numericalAbility = calculateCorrectAnswerPercentage(numericalAnswers);
  const domainKnowledge = calculateCorrectAnswerPercentage(domainAnswers);
  const techSkills = calculateAverage(techAnswers) * 20; // Convert to 0-100

  const overall = Math.round((logicalReasoning + numericalAbility + domainKnowledge + techSkills) / 4);

  return {
    logicalReasoning: Math.round(logicalReasoning),
    numericalAbility: Math.round(numericalAbility),
    domainKnowledge: Math.round(domainKnowledge),
    techSkills: Math.round(techSkills),
    overall
  };
}

export function calculateWISCARScores(answers: AssessmentAnswer[]): WISCARScores {
  const willAnswers = answers.filter(a => a.questionId.includes('will'));
  const interestAnswers = answers.filter(a => a.questionId.includes('wiscar_interest'));
  const skillAnswers = answers.filter(a => a.questionId.includes('skill'));
  const cognitiveAnswers = answers.filter(a => a.questionId.includes('cognitive_readiness'));
  const learningAnswers = answers.filter(a => a.questionId.includes('learning'));
  const alignmentAnswers = answers.filter(a => a.questionId.includes('alignment'));

  const will = calculateWillScore(willAnswers);
  const interest = calculateAverage(interestAnswers) * 20;
  const skill = calculateSkillScore(skillAnswers);
  const cognitiveReadiness = calculateCognitiveReadinessScore(cognitiveAnswers);
  const abilityToLearn = calculateAverage(learningAnswers) * 20;
  const realWorldAlignment = calculateAlignmentScore(alignmentAnswers);

  const overall = Math.round((will + interest + skill + cognitiveReadiness + abilityToLearn + realWorldAlignment) / 6);

  return {
    will: Math.round(will),
    interest: Math.round(interest),
    skill: Math.round(skill),
    cognitiveReadiness: Math.round(cognitiveReadiness),
    abilityToLearn: Math.round(abilityToLearn),
    realWorldAlignment: Math.round(realWorldAlignment),
    overall
  };
}

export function generateRecommendation(
  psychometric: PsychometricScores,
  technical: TechnicalScores,
  wiscar: WISCARScores
): AssessmentResults {
  const overallScore = Math.round((psychometric.overall + technical.overall + wiscar.overall) / 3);
  
  let recommendation: 'yes' | 'no' | 'maybe';
  if (overallScore >= 75) {
    recommendation = 'yes';
  } else if (overallScore >= 55) {
    recommendation = 'maybe';
  } else {
    recommendation = 'no';
  }

  const strengths: string[] = [];
  const improvements: string[] = [];

  // Analyze strengths
  if (psychometric.interestScale >= 75) strengths.push("Strong genuine interest in influencer marketing");
  if (psychometric.personalityFit >= 75) strengths.push("Excellent personality fit for client relationships");
  if (technical.domainKnowledge >= 75) strengths.push("Solid understanding of influencer marketing fundamentals");
  if (wiscar.will >= 75) strengths.push("High persistence and determination");
  if (wiscar.skill >= 75) strengths.push("Strong negotiation and relationship-building skills");

  // Analyze improvements
  if (technical.numericalAbility < 60) improvements.push("Improve analytical and numerical skills");
  if (psychometric.cognitiveStyle < 60) improvements.push("Develop structured campaign planning abilities");
  if (technical.techSkills < 60) improvements.push("Gain experience with marketing analytics tools");
  if (wiscar.cognitiveReadiness < 60) improvements.push("Enhance problem-solving and analytical thinking");

  const careerPaths = getCareerPaths(recommendation, overallScore);
  const learningPath = getLearningPath(recommendation, improvements);

  return {
    psychometric,
    technical,
    wiscar,
    overallScore,
    recommendation,
    strengths,
    improvements,
    careerPaths,
    learningPath
  };
}

// Helper functions
function calculateAverage(answers: AssessmentAnswer[]): number {
  if (answers.length === 0) return 0;
  const sum = answers.reduce((acc, answer) => acc + Number(answer.answer), 0);
  return sum / answers.length;
}

function calculateCorrectAnswerPercentage(answers: AssessmentAnswer[]): number {
  if (answers.length === 0) return 0;
  const correctCount = answers.reduce((acc, answer) => {
    return acc + (answer.score === 100 ? 1 : 0);
  }, 0);
  return (correctCount / answers.length) * 100;
}

function calculateCognitiveScore(answers: AssessmentAnswer[]): number {
  // Scoring logic for cognitive style questions
  let score = 0;
  answers.forEach(answer => {
    if (answer.questionId === 'cognitive_1') {
      // Balance structure with creative adaptation scores highest
      const optionIndex = Number(answer.answer);
      score += optionIndex === 2 ? 90 : optionIndex === 0 || optionIndex === 1 ? 70 : 50;
    }
    if (answer.questionId === 'cognitive_2') {
      // Mix of quantitative and qualitative measures scores highest
      const optionIndex = Number(answer.answer);
      score += optionIndex === 2 ? 90 : optionIndex === 0 || optionIndex === 1 ? 70 : 50;
    }
  });
  return answers.length > 0 ? score / answers.length : 0;
}

function calculateWillScore(answers: AssessmentAnswer[]): number {
  let score = 0;
  answers.forEach(answer => {
    if (answer.questionId === 'will_1') {
      score += Number(answer.answer) * 20; // Convert 1-5 to 20-100 scale
    }
    if (answer.questionId === 'will_2') {
      // Trying alternative contact methods shows good persistence
      const optionIndex = Number(answer.answer);
      score += optionIndex === 1 || optionIndex === 2 ? 85 : optionIndex === 0 ? 60 : 40;
    }
  });
  return answers.length > 0 ? score / answers.length : 0;
}

function calculateSkillScore(answers: AssessmentAnswer[]): number {
  let score = 0;
  answers.forEach(answer => {
    if (answer.questionId === 'skill_1') {
      // Offering additional benefits shows good negotiation skills
      const optionIndex = Number(answer.answer);
      score += optionIndex === 1 || optionIndex === 2 ? 85 : optionIndex === 0 ? 60 : 40;
    }
  });
  return answers.length > 0 ? score : 70; // Default if no skill questions
}

function calculateCognitiveReadinessScore(answers: AssessmentAnswer[]): number {
  let score = 0;
  answers.forEach(answer => {
    if (answer.questionId === 'cognitive_readiness_1') {
      // Immediate analysis approach shows good cognitive readiness
      const optionIndex = Number(answer.answer);
      score += optionIndex === 1 ? 90 : optionIndex === 0 ? 70 : 50;
    }
  });
  return answers.length > 0 ? score : 70; // Default if no cognitive readiness questions
}

function calculateAlignmentScore(answers: AssessmentAnswer[]): number {
  let score = 0;
  answers.forEach(answer => {
    if (answer.questionId === 'alignment_1') {
      // All options show good alignment, but relationship building scores highest
      const optionIndex = Number(answer.answer);
      score += optionIndex === 0 ? 90 : 80; // All are good career fits
    }
  });
  return answers.length > 0 ? score : 75; // Default if no alignment questions
}

function getCareerPaths(recommendation: string, score: number): string[] {
  if (recommendation === 'yes') {
    return [
      "Influencer Marketing Manager",
      "Social Media Strategist",
      "Brand Partnership Manager",
      "Digital Campaign Analyst",
      "Content Collaboration Manager"
    ];
  } else if (recommendation === 'maybe') {
    return [
      "Social Media Coordinator",
      "Community Manager",
      "Content Marketing Assistant",
      "Digital Marketing Analyst"
    ];
  } else {
    return [
      "Social Media Coordinator",
      "Community Manager",
      "Content Creator",
      "Customer Relations Specialist"
    ];
  }
}

function getLearningPath(recommendation: string, improvements: string[]): string[] {
  const basePath = [
    "Social media fundamentals",
    "Influencer marketing basics",
    "Campaign planning essentials"
  ];

  if (recommendation === 'yes') {
    return [
      ...basePath,
      "Advanced campaign management",
      "Analytics and ROI optimization",
      "Negotiation tactics",
      "Brand collaboration strategies"
    ];
  } else if (recommendation === 'maybe') {
    return [
      ...basePath,
      "Communication skills development",
      "Basic analytics training",
      "Project management fundamentals"
    ];
  } else {
    return [
      "Digital marketing foundations",
      "Social media platform training",
      "Basic communication skills",
      "Customer service fundamentals"
    ];
  }
}