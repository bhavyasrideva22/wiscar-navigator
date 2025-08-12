import { Question } from "@/types/assessment";

export const assessmentQuestions: Question[] = [
  // PSYCHOMETRIC SECTION - Interest Scale
  {
    id: "interest_1",
    type: "likert",
    category: "psychometric",
    subcategory: "interest",
    question: "How excited are you about following social media trends and discovering new influencers?",
    scale: { min: 1, max: 5, labels: ["Not excited at all", "Slightly excited", "Moderately excited", "Very excited", "Extremely excited"] }
  },
  {
    id: "interest_2",
    type: "likert",
    category: "psychometric",
    subcategory: "interest",
    question: "I enjoy analyzing social media engagement metrics and campaign performance data.",
    scale: { min: 1, max: 5, labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] }
  },
  {
    id: "interest_3",
    type: "likert",
    category: "psychometric",
    subcategory: "interest",
    question: "Building relationships with content creators and influencers appeals to me.",
    scale: { min: 1, max: 5, labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] }
  },

  // PSYCHOMETRIC SECTION - Personality Fit
  {
    id: "personality_1",
    type: "likert",
    category: "psychometric",
    subcategory: "personality",
    question: "I am comfortable reaching out to strangers and initiating professional conversations.",
    scale: { min: 1, max: 5, labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] }
  },
  {
    id: "personality_2",
    type: "likert",
    category: "psychometric",
    subcategory: "personality",
    question: "I adapt quickly to new social media platforms and marketing tools.",
    scale: { min: 1, max: 5, labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] }
  },
  {
    id: "personality_3",
    type: "likert",
    category: "psychometric",
    subcategory: "personality",
    question: "I pay close attention to details when reviewing contracts and campaign requirements.",
    scale: { min: 1, max: 5, labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] }
  },

  // PSYCHOMETRIC SECTION - Cognitive Style
  {
    id: "cognitive_1",
    type: "multiple-choice",
    category: "psychometric",
    subcategory: "cognitive",
    question: "When planning an influencer campaign, what's your preferred approach?",
    options: [
      "Create detailed timelines and structured processes",
      "Focus on creative concepts and flexible execution",
      "Balance structure with room for creative adaptation",
      "Let the campaign evolve organically"
    ]
  },
  {
    id: "cognitive_2",
    type: "multiple-choice",
    category: "psychometric",
    subcategory: "cognitive",
    question: "How do you prefer to evaluate campaign success?",
    options: [
      "Primarily through detailed analytics and ROI metrics",
      "Through brand awareness and creative impact",
      "Using a mix of quantitative and qualitative measures",
      "Based on client satisfaction and relationship building"
    ]
  },

  // PSYCHOMETRIC SECTION - Motivation & Persistence
  {
    id: "motivation_1",
    type: "likert",
    category: "psychometric",
    subcategory: "motivation",
    question: "I persist in negotiations even when initial responses are negative.",
    scale: { min: 1, max: 5, labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] }
  },
  {
    id: "motivation_2",
    type: "likert",
    category: "psychometric",
    subcategory: "motivation",
    question: "I'm motivated by seeing measurable results from my marketing efforts.",
    scale: { min: 1, max: 5, labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] }
  },

  // TECHNICAL SECTION - Logical Reasoning
  {
    id: "logic_1",
    type: "multiple-choice",
    category: "technical",
    subcategory: "logical",
    question: "You have a $50,000 campaign budget. Micro-influencers (10k followers) charge $500 per post, while macro-influencers (500k followers) charge $5,000 per post. If you want maximum reach and engagement rates are similar, what's the best strategy?",
    options: [
      "Use 10 macro-influencers for higher individual reach",
      "Use 100 micro-influencers for broader audience diversity",
      "Mix 5 macro and 50 micro-influencers",
      "Focus budget on 2-3 celebrity influencers"
    ],
    correctAnswer: "Use 100 micro-influencers for broader audience diversity",
    explanation: "Micro-influencers typically have higher engagement rates and more targeted audiences, providing better ROI."
  },
  {
    id: "logic_2",
    type: "multiple-choice",
    category: "technical",
    subcategory: "logical",
    question: "An influencer's engagement rate dropped from 6% to 2% over three months. What's the most likely strategic response?",
    options: [
      "Immediately terminate the partnership",
      "Reduce their fee and continue the partnership",
      "Investigate the cause and discuss content strategy adjustments",
      "Ignore the drop if other metrics are stable"
    ],
    correctAnswer: "Investigate the cause and discuss content strategy adjustments",
    explanation: "Understanding the root cause helps determine if it's a temporary issue, algorithm change, or content quality problem."
  },

  // TECHNICAL SECTION - Numerical Ability
  {
    id: "numerical_1",
    type: "multiple-choice",
    category: "technical",
    subcategory: "numerical",
    question: "A campaign generated 2M impressions, 100k clicks, and 5k conversions with a $25k budget. What's the Cost Per Acquisition (CPA)?",
    options: [
      "$5.00",
      "$0.25",
      "$2.50",
      "$0.0125"
    ],
    correctAnswer: "$5.00",
    explanation: "CPA = Total Cost / Conversions = $25,000 / 5,000 = $5.00"
  },
  {
    id: "numerical_2",
    type: "multiple-choice",
    category: "technical",
    subcategory: "numerical",
    question: "If an influencer has 250k followers and gets 15k likes on average, what's their engagement rate?",
    options: [
      "6%",
      "0.6%",
      "16.7%",
      "60%"
    ],
    correctAnswer: "6%",
    explanation: "Engagement Rate = (Likes / Followers) × 100 = (15,000 / 250,000) × 100 = 6%"
  },

  // TECHNICAL SECTION - Domain Knowledge
  {
    id: "domain_1",
    type: "multiple-choice",
    category: "technical",
    subcategory: "domain",
    question: "What's the primary benefit of using micro-influencers over macro-influencers?",
    options: [
      "Lower cost per post",
      "Higher engagement rates and niche audience targeting",
      "Larger follower count",
      "Better brand recognition"
    ],
    correctAnswer: "Higher engagement rates and niche audience targeting",
    explanation: "Micro-influencers typically have more engaged, niche audiences and higher engagement rates."
  },
  {
    id: "domain_2",
    type: "multiple-choice",
    category: "technical",
    subcategory: "domain",
    question: "Which metric is most important for measuring brand awareness campaigns?",
    options: [
      "Click-through rate (CTR)",
      "Cost per click (CPC)",
      "Reach and impressions",
      "Conversion rate"
    ],
    correctAnswer: "Reach and impressions",
    explanation: "Brand awareness campaigns focus on exposing the brand to as many people as possible."
  },
  {
    id: "domain_3",
    type: "multiple-choice",
    category: "technical",
    subcategory: "domain",
    question: "What should be included in an influencer contract?",
    options: [
      "Only payment terms and deliverables",
      "Payment, deliverables, content guidelines, and usage rights",
      "Just the campaign hashtags and mentions",
      "Only the posting schedule"
    ],
    correctAnswer: "Payment, deliverables, content guidelines, and usage rights",
    explanation: "Comprehensive contracts protect both parties and ensure campaign success."
  },

  // TECHNICAL SECTION - Tech Skills
  {
    id: "tech_1",
    type: "self-assessment",
    category: "technical",
    subcategory: "tech",
    question: "Rate your proficiency with social media analytics tools (Instagram Insights, YouTube Analytics, etc.):",
    scale: { min: 1, max: 5, labels: ["Beginner", "Basic", "Intermediate", "Advanced", "Expert"] }
  },
  {
    id: "tech_2",
    type: "self-assessment",
    category: "technical",
    subcategory: "tech",
    question: "Rate your experience with influencer discovery platforms (AspireIQ, Upfluence, Grin, etc.):",
    scale: { min: 1, max: 5, labels: ["No experience", "Basic familiarity", "Some experience", "Experienced", "Expert user"] }
  },

  // WISCAR SECTION - Will (Persistence & Grit)
  {
    id: "will_1",
    type: "likert",
    category: "wiscar",
    subcategory: "will",
    question: "I finish whatever I begin, even when it takes longer than expected.",
    scale: { min: 1, max: 5, labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] }
  },
  {
    id: "will_2",
    type: "scenario",
    category: "wiscar",
    subcategory: "will",
    question: "An influencer stops responding to your emails mid-campaign. What do you do?",
    options: [
      "Move on to find a replacement immediately",
      "Try alternative contact methods and give them a few more days",
      "Contact their management or agency",
      "Persist with daily follow-ups until they respond"
    ]
  },

  // WISCAR SECTION - Interest & Alignment
  {
    id: "wiscar_interest_1",
    type: "likert",
    category: "wiscar",
    subcategory: "interest",
    question: "I actively follow marketing industry news and influencer marketing trends.",
    scale: { min: 1, max: 5, labels: ["Never", "Rarely", "Sometimes", "Often", "Daily"] }
  },

  // WISCAR SECTION - Skill Assessment
  {
    id: "skill_1",
    type: "scenario",
    category: "wiscar",
    subcategory: "skill",
    question: "You need to negotiate a lower rate with an influencer whose initial quote is 50% over budget. How do you approach this?",
    options: [
      "Ask for a direct 50% discount",
      "Offer additional campaign benefits (longer partnership, more creative freedom)",
      "Propose a performance-based payment structure",
      "Find a different influencer within budget"
    ]
  },

  // WISCAR SECTION - Cognitive Readiness
  {
    id: "cognitive_readiness_1",
    type: "scenario",
    category: "wiscar",
    subcategory: "cognitive",
    question: "A campaign's engagement is 30% lower than projected halfway through. What's your analysis approach?",
    options: [
      "Wait until campaign end to evaluate overall performance",
      "Immediately analyze content performance, audience overlap, and timing",
      "Ask the influencer to post more frequently",
      "Blame external factors like algorithm changes"
    ]
  },

  // WISCAR SECTION - Ability to Learn
  {
    id: "learning_1",
    type: "likert",
    category: "wiscar",
    subcategory: "learning",
    question: "I actively seek feedback on my campaigns and adjust my approach based on what I learn.",
    scale: { min: 1, max: 5, labels: ["Never", "Rarely", "Sometimes", "Often", "Always"] }
  },

  // WISCAR SECTION - Real-World Alignment
  {
    id: "alignment_1",
    type: "multiple-choice",
    category: "wiscar",
    subcategory: "alignment",
    question: "What aspect of influencer marketing management excites you most?",
    options: [
      "Building authentic relationships with creators",
      "Analyzing campaign data and optimizing performance",
      "Negotiating deals and managing budgets",
      "Creating innovative campaign concepts"
    ]
  }
];