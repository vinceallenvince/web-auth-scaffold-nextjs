import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Log the email details
    console.log('\n🔍 DEBUG EMAIL REQUEST 🔍');
    console.log('Recipient:', body.to);
    console.log('Subject:', body.subject);
    console.log('Body:', body.text || body.html);
    console.log('\n');
    
    // Always return success to simulate email sent
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in debug-email route:', error);
    return NextResponse.json({ error: 'Failed to process email' }, { status: 500 });
  }
} 