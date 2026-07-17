import { createClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/site-url";
import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) {
    return NextResponse.json(
      { error: "STRIPE_PRICE_ID não configurado" },
      { status: 500 }
    );
  }

  const siteUrl = getSiteUrl();
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${siteUrl}/dashboard?assinatura=sucesso`,
    cancel_url: `${siteUrl}/assinar`,
    customer_email: user.email,
    metadata: { user_id: user.id },
    subscription_data: { trial_period_days: 7 },
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Falha ao criar sessão de checkout" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: session.url });
}
