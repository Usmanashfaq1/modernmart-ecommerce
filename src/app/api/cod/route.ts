import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('COD order received:', body); // Debug: Log COD order
    // TODO: Save to Supabase/Prisma here
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('COD error:', error);
    return NextResponse.json({ error: 'Failed to process COD order' }, { status: 500 });
  }
}