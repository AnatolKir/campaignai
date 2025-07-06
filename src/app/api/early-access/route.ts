import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { email, consented_to_marketing } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingSignup } = await supabase
      .from('early_access_signups')
      .select('id')
      .eq('email', email)
      .single();

    if (existingSignup) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist!' },
        { status: 400 }
      );
    }

    // Get current count for signup order
    const { count } = await supabase
      .from('early_access_signups')
      .select('*', { count: 'exact', head: true });

    const signupOrder = (count || 0) + 1;

    // Insert new signup
    const { data, error } = await supabase
      .from('early_access_signups')
      .insert({
        email,
        consented_to_marketing: consented_to_marketing || false,
        signup_order: signupOrder,
        source: 'coming_soon_page',
        metadata: {
          userAgent: request.headers.get('user-agent'),
          referer: request.headers.get('referer'),
        }
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save signup. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      signupOrder,
      message: `You're #${signupOrder} on the waitlist!`
    });

  } catch (error) {
    console.error('Early access signup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}