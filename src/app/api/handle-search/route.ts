import { NextRequest, NextResponse } from 'next/server';
import { searchHandles, getBrandHandles, suggestBrandsFromHandle } from '../../../lib/handle-database';

/**
 * Enhanced bidirectional handle search API endpoint
 * GET /api/handle-search?q=query&limit=10&mode=search|suggest|brand
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limitParam = searchParams.get('limit');
    const mode = searchParams.get('mode') || 'search';
    const brandName = searchParams.get('brand');

    // Validate query parameter
    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required and must be at least 2 characters' },
        { status: 400 }
      );
    }

    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    
    // Validate limit
    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Limit must be a number between 1 and 100' },
        { status: 400 }
      );
    }

    let results;

    switch (mode) {
      case 'brand':
        // Get all handles for a specific brand
        const brandHandles = await getBrandHandles(brandName || query.trim());
        results = {
          query: brandName || query.trim(),
          type: 'brand_handles',
          mode: 'brand',
          results: brandHandles,
          count: Object.keys(brandHandles).length
        };
        break;

      case 'suggest':
        // Bidirectional suggestion: from partial handle to brand suggestions
        const suggestions = await suggestBrandsFromHandle(query.trim());
        results = {
          query: query.trim(),
          type: 'brand_suggestions',
          mode: 'suggest',
          results: suggestions,
          count: suggestions.length,
          message: suggestions.length > 0 
            ? `Found ${suggestions.length} brand suggestions for "${query.trim()}"` 
            : `No brand suggestions found for "${query.trim()}"`
        };
        break;

      case 'search':
      default:
        // Enhanced bidirectional search
        const searchResults = await searchHandles(query.trim(), limit);
        results = {
          query: query.trim(),
          type: 'search_results',
          mode: 'search',
          results: searchResults,
          count: searchResults.length
        };
        break;
    }

    return NextResponse.json(results);

  } catch (error) {
    console.error('Error in handle search API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Not implemented - could be used for adding new handles via API
 */
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'POST method not implemented. Use Target Accounts feature to add handles.' },
    { status: 405 }
  );
} 