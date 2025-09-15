import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Request body:', body); // Debug: Log the incoming request body
    const { items, shipping } = body;

    // Validate shipping data (optional for Stripe)
    if (shipping && (!shipping.name || !shipping.email || !shipping.address)) {
      throw new Error('Incomplete shipping fields provided');
    }

    // Calculate total from items (same logic as cart)
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const shippingCost = subtotal > 50 ? 0 : 9.99;
    const total = subtotal + tax + shippingCost;

    // Create a Stripe Customer if shipping data is provided
    let customer;
    if (shipping) {
      customer = await stripe.customers.create({
        email: shipping.email,
        name: shipping.name,
        address: {
          line1: shipping.address.line1,
          city: shipping.address.city,
          state: shipping.address.state,
          postal_code: shipping.address.postal_code,
          country: shipping.address.country,
        },
      });
      console.log('Created Stripe Customer:', customer.id); // Debug: Log customer ID
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd', // Change to 'pkr' if preferred
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: {
              size: item.size,
              color: item.color,
            },
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: {
        subtotal: subtotal.toString(),
        tax: tax.toString(),
        shipping: shippingCost.toString(),
        total: total.toString(),
      },
      customer: customer?.id, // Use customer if created
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'PK'], // Added PK for Pakistan
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: Math.round(shippingCost * 100),
              currency: 'usd', // Change to 'pkr' if preferred
            },
            display_name: shippingCost === 0 ? 'Free Shipping' : 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}