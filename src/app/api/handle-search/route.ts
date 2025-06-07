import { NextRequest, NextResponse } from 'next/server';
import { searchHandles, getBrandHandles } from '../../../lib/handle-database';

/**
 * Internal handle search API endpoint
 * GET /api/handle-search?q=query&limit=10&brand=brandName
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limitParam = searchParams.get('limit');
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

    if (brandName) {
      // Get all handles for a specific brand
      const brandHandles = await getBrandHandles(brandName);
      results = {
        query: brandName,
        type: 'brand_handles',
        results: brandHandles,
        count: Object.keys(brandHandles).length
      };
    } else {
      // General search
      const searchResults = await searchHandles(query.trim(), limit);
      results = {
        query: query.trim(),
        type: 'search_results',
        results: searchResults,
        count: searchResults.length
      };
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