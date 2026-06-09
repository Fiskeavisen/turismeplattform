import Stripe from "stripe";
import type { PaymentProvider } from "@/lib/types";

export type CheckoutInput = {
  bookingId: string;
  amount: number;
  currency: "NOK";
  customerEmail: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
};

export type CheckoutResult = {
  provider: PaymentProvider;
  checkoutUrl?: string;
  reference: string;
  status: "created" | "manual" | "unconfigured";
};

export async function createCheckout(
  provider: PaymentProvider,
  input: CheckoutInput,
): Promise<CheckoutResult> {
  if (provider === "stripe") {
    return createStripeCheckout(input);
  }

  if (provider === "vipps") {
    return createVippsPlaceholder(input);
  }

  return {
    provider: "manual",
    reference: input.bookingId,
    status: "manual",
  };
}

async function createStripeCheckout(input: CheckoutInput): Promise<CheckoutResult> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return {
      provider: "stripe",
      reference: input.bookingId,
      status: "unconfigured",
    };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: input.customerEmail,
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    metadata: {
      bookingId: input.bookingId,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: input.currency.toLowerCase(),
          unit_amount: input.amount * 100,
          product_data: {
            name: input.description,
          },
        },
      },
    ],
  });

  return {
    provider: "stripe",
    checkoutUrl: session.url ?? undefined,
    reference: session.id,
    status: "created",
  };
}

async function createVippsPlaceholder(input: CheckoutInput): Promise<CheckoutResult> {
  const isConfigured =
    process.env.VIPPS_CLIENT_ID &&
    process.env.VIPPS_CLIENT_SECRET &&
    process.env.VIPPS_SUBSCRIPTION_KEY &&
    process.env.VIPPS_MERCHANT_SERIAL_NUMBER;

  return {
    provider: "vipps",
    reference: input.bookingId,
    status: isConfigured ? "created" : "unconfigured",
  };
}
