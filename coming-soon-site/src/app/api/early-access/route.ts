import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import type { EarlyAccessSignup } from '../../../types/early-access';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const { count } = await supabase
      .from('early_access_signups')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      count: count || 0
    });
  } catch (error) {
    console.error('Error fetching waitlist count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist count' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'email', 'firstName', 'lastName', 'companyName', 'role',
      'companySize', 'monthlySpend', 'weeklyHours', 'teamSize',
      'biggestChallenge', 'primaryGoal'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Validate consent to marketing (required for 3 free months)
    if (!formData.consentedToMarketing) {
      return NextResponse.json(
        { error: 'You must consent to marketing emails to receive 3 free months' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingSignup } = await supabase
      .from('early_access_signups')
      .select('id')
      .eq('email', formData.email)
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

    // Prepare data for database insertion
    const signupData: Omit<EarlyAccessSignup, 'id' | 'created_at' | 'updated_at'> = {
      email: formData.email.toLowerCase().trim(),
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      company_name: formData.companyName.trim(),
      role: formData.role,
      company_size: formData.companySize,
      monthly_marketing_spend: formData.monthlySpend,
      weekly_hours_on_social: formData.weeklyHours,
      team_size: formData.teamSize,
      current_tools: formData.currentTools || [],
      biggest_challenge: formData.biggestChallenge.trim(),
      primary_goal: formData.primaryGoal.trim(),
      consented_to_marketing: formData.consentedToMarketing,
      signup_order: signupOrder,
      source: 'coming_soon_page',
      metadata: {
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        timestamp: new Date().toISOString()
      }
    };

    // Insert new signup
    const { data, error } = await supabase
      .from('early_access_signups')
      .insert(signupData)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save signup. Please try again.' },
        { status: 500 }
      );
    }

    // Send thank you email
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'Campaign AI <noreply@campaign.ai>',
        to: formData.email,
        subject: `Welcome to Campaign AI - You're #${signupOrder}!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #6B46C1; text-align: center;">Welcome to Campaign AI!</h2>
            <p>Hi ${formData.firstName},</p>
            <p>Thank you for joining our waitlist! You're <strong>#${signupOrder}</strong> in line.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #6B46C1; margin-top: 0;">What's Next?</h3>
              <p>As one of our early supporters, you'll get:</p>
              <ul style="padding-left: 20px;">
                <li><strong>3 months free</strong> when we launch (because you consented to marketing updates)</li>
                <li>Early access to new features before anyone else</li>
                <li>Direct input on product development</li>
                <li>Priority customer support</li>
              </ul>
            </div>
            
            <p>We're building Campaign AI specifically for ${formData.role === 'other' ? 'professionals like you' : formData.role.replace('_', ' ')} at ${formData.companySize === 'solopreneur' ? 'solo businesses' : 'companies with ' + formData.companySize + ' employees'}.</p>
            
            <p>We'll keep you updated on our progress and let you know as soon as we're ready to onboard you.</p>
            
            <p>Best regards,<br><strong>The Campaign AI Team</strong></p>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="font-size: 12px; color: #6c757d;">
                You're receiving this email because you signed up for Campaign AI early access at soon.campaign.ai
              </p>
            </div>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the signup if email fails
    }

    return NextResponse.json({
      success: true,
      signupOrder,
      message: `Welcome aboard! You're #${signupOrder} on the waitlist.`
    });

  } catch (error) {
    console.error('Early access signup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}