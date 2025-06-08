/**
 * Brand Matching and Deduplication System
 * Prevents duplicate entries and normalizes brand/person names
 */

export interface BrandMatch {
  canonical_name: string;
  similarity_score: number;
  matched_variations: string[];
}

/**
 * Common brand name variations and normalizations
 */
const BRAND_NORMALIZATIONS: Record<string, string> = {
  // Tech companies
  'apple inc': 'Apple',
  'apple computer': 'Apple',
  'apple inc.': 'Apple',
  'microsoft corp': 'Microsoft',
  'microsoft corporation': 'Microsoft',
  'meta platforms': 'Meta',
  'facebook inc': 'Meta',
  'alphabet inc': 'Google',
  'google llc': 'Google',
  
  // People - common variations
  'elon musk': 'Elon Musk',
  'elon r musk': 'Elon Musk',
  'elon reeve musk': 'Elon Musk',
  'musk elon': 'Elon Musk',
  'jeff bezos': 'Jeff Bezos',
  'jeffrey bezos': 'Jeff Bezos',
  'bill gates': 'Bill Gates',
  'william gates': 'Bill Gates',
  'mark zuckerberg': 'Mark Zuckerberg',
  'mark elliot zuckerberg': 'Mark Zuckerberg',
  
  // Brands - common variations
  'nike inc': 'Nike',
  'nike inc.': 'Nike',
  'the coca cola company': 'Coca-Cola',
  'coca cola': 'Coca-Cola',
  'coca-cola company': 'Coca-Cola',
  'mcdonalds': 'McDonald\'s',
  'mcdonald\'s corporation': 'McDonald\'s',
  'starbucks corporation': 'Starbucks',
  'starbucks coffee': 'Starbucks',
};

/**
 * Normalize brand/person name for matching
 */
export function normalizeBrandName(name: string): string {
  if (!name) return '';
  
  const normalized = name.toLowerCase().trim();
  
  // Check direct mappings first
  if (BRAND_NORMALIZATIONS[normalized]) {
    return BRAND_NORMALIZATIONS[normalized];
  }
  
  // Remove common business suffixes
  const cleaned = normalized
    .replace(/\b(inc|llc|corp|corporation|company|co|ltd|limited)\b\.?/g, '')
    .replace(/\bthe\b/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Capitalize properly
  return cleaned
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Calculate similarity between two brand names using multiple algorithms
 */
export function calculateBrandSimilarity(name1: string, name2: string): number {
  if (!name1 || !name2) return 0;
  
  const norm1 = normalizeBrandName(name1).toLowerCase();
  const norm2 = normalizeBrandName(name2).toLowerCase();
  
  // Exact match
  if (norm1 === norm2) return 1.0;
  
  // Levenshtein distance similarity
  const levenshteinSim = 1 - (levenshteinDistance(norm1, norm2) / Math.max(norm1.length, norm2.length));
  
  // Jaccard similarity (word-based)
  const words1 = new Set(norm1.split(' '));
  const words2 = new Set(norm2.split(' '));
  const intersection = new Set([...words1].filter(word => words2.has(word)));
  const union = new Set([...words1, ...words2]);
  const jaccardSim = intersection.size / union.size;
  
  // Contains similarity (one is substring of another)
  const containsSim = norm1.includes(norm2) || norm2.includes(norm1) ? 0.8 : 0;
  
  // Return the highest similarity score
  return Math.max(levenshteinSim, jaccardSim, containsSim);
}

/**
 * Levenshtein distance algorithm
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Find potential duplicate brands in the database
 */
export function findPotentialDuplicates(
  newBrandName: string, 
  existingBrands: string[], 
  threshold: number = 0.8
): BrandMatch[] {
  const matches: BrandMatch[] = [];
  
  for (const existingBrand of existingBrands) {
    const similarity = calculateBrandSimilarity(newBrandName, existingBrand);
    
    if (similarity >= threshold) {
      const existingMatch = matches.find(m => m.canonical_name === normalizeBrandName(existingBrand));
      
      if (existingMatch) {
        existingMatch.matched_variations.push(newBrandName);
        existingMatch.similarity_score = Math.max(existingMatch.similarity_score, similarity);
      } else {
        matches.push({
          canonical_name: normalizeBrandName(existingBrand),
          similarity_score: similarity,
          matched_variations: [newBrandName, existingBrand]
        });
      }
    }
  }
  
  return matches.sort((a, b) => b.similarity_score - a.similarity_score);
}

/**
 * Suggest canonical brand name from partial input
 */
export function suggestCanonicalBrand(partialName: string, knownBrands: string[]): string[] {
  const normalized = partialName.toLowerCase().trim();
  
  // Find brands that start with or contain the partial name
  const suggestions = knownBrands
    .filter(brand => {
      const brandNorm = brand.toLowerCase();
      return brandNorm.includes(normalized) || 
             normalized.length >= 3 && calculateBrandSimilarity(normalized, brandNorm) > 0.6;
    })
    .map(brand => normalizeBrandName(brand))
    .filter((brand, index, self) => self.indexOf(brand) === index) // Remove duplicates
    .sort((a, b) => {
      // Prioritize exact starts, then contains, then similarity
      const aNorm = a.toLowerCase();
      const bNorm = b.toLowerCase();
      
      if (aNorm.startsWith(normalized) && !bNorm.startsWith(normalized)) return -1;
      if (!aNorm.startsWith(normalized) && bNorm.startsWith(normalized)) return 1;
      
      if (aNorm.includes(normalized) && !bNorm.includes(normalized)) return -1;
      if (!aNorm.includes(normalized) && bNorm.includes(normalized)) return 1;
      
      return calculateBrandSimilarity(normalized, bNorm) - calculateBrandSimilarity(normalized, aNorm);
    });
    
  return suggestions.slice(0, 5); // Return top 5 suggestions
}

/**
 * Extract potential brand name from handle
 */
export function extractBrandFromHandle(handle: string): string | null {
  if (!handle) return null;
  
  // Remove @ and common prefixes/suffixes
  const cleaned = handle
    .replace(/^@/, '')
    .replace(/official$|hq$|corp$|company$|inc$/gi, '')
    .replace(/[0-9]+$/g, '') // Remove trailing numbers
    .trim();
  
  if (cleaned.length < 2) return null;
  
  // Convert camelCase or snake_case to proper words
  const words = cleaned
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase
    .replace(/_/g, ' ') // snake_case
    .replace(/\s+/g, ' ')
    .trim();
  
  return words.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
} 