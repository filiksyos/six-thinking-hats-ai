/**
 * De Bono Creativity Techniques
 * Implements SCAMPER, Random Word, and response deduplication
 */

// Random words for lateral thinking (Green Hat)
const CREATIVE_WORDS = [
  "butterfly", "telescope", "music", "bridge", "forest", "ocean", "clock",
  "mirror", "lightning", "garden", "compass", "rainbow", "volcano", "puzzle",
  "dance", "echo", "spiral", "crystal", "river", "fire", "cloud", "maze",
  "diamond", "wind", "shadow", "wheel", "fountain", "mountain", "star",
  "wave", "flame", "seed", "light", "path", "door", "key", "thread"
];

// SCAMPER prompts for creative thinking
const SCAMPER_PROMPTS = {
  Substitute: "What can you substitute or replace?",
  Combine: "What can you combine with something else?",
  Adapt: "What can you adapt or adjust?",
  Modify: "What can you magnify, minify, or modify?",
  PutToOtherUse: "What else can this be used for?",
  Eliminate: "What can you remove or simplify?",
  Reverse: "What can you reverse or rearrange?",
};

export function generateRandomWord(): string {
  return CREATIVE_WORDS[Math.floor(Math.random() * CREATIVE_WORDS.length)];
}

export function getSCAMPERPrompt(): string {
  const techniques = Object.keys(SCAMPER_PROMPTS);
  const randomTechnique = techniques[Math.floor(Math.random() * techniques.length)] as keyof typeof SCAMPER_PROMPTS;
  return SCAMPER_PROMPTS[randomTechnique];
}

/**
 * Simple similarity check to avoid duplicate responses
 * Uses basic string similarity (Jaccard similarity)
 */
export function calculateSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

export function isDuplicate(newResponse: string, previousResponses: string[], threshold = 0.7): boolean {
  return previousResponses.some(prev => 
    calculateSimilarity(newResponse, prev) > threshold
  );
}

/**
 * Apply De Bono criteria to enhance creativity
 */
export function applyDeBonoCriteria(hatType: string, userInput: string): string {
  let enhancedInput = userInput;
  
  if (hatType === "GREEN") {
    const randomWord = generateRandomWord();
    const scamperPrompt = getSCAMPERPrompt();
    enhancedInput = `${userInput}\n\n[Creative constraints: Random word - "${randomWord}", SCAMPER - ${scamperPrompt}]`;
  }
  
  return enhancedInput;
}

/**
 * Check if response is creative enough (for Green Hat)
 */
export function isCreativeEnough(response: string): boolean {
  const creativityIndicators = [
    'alternative', 'imagine', 'what if', 'could', 'might', 'novel',
    'unique', 'different', 'innovative', 'creative', 'unusual'
  ];
  
  const lowerResponse = response.toLowerCase();
  const count = creativityIndicators.filter(word => lowerResponse.includes(word)).length;
  
  return count >= 2; // Response should have at least 2 creativity indicators
}
