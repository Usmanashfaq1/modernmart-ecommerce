import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error('Missing stripe-signature or webhook secret');
    return NextResponse.json({ error: 'Missing webhook signature or secret' }, { status: 400 });
  }

  try {
    // Verify the webhook event
    const event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('Checkout session completed:', session.id, session); // Debug: Log session details
      // TODO: Save order to Supabase/Prisma
      // Example: Save session.customer, session.amount_total, session.metadata, etc.
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }
}