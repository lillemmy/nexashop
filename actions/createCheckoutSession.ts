"use server";

import { imageUrl } from "@/lib/imagesUrl";
import stripe from "@/lib/stripe";
import { CartItem } from "@/store/store";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedCartItem = {
  product: CartItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedCartItem[],
  metadata: Metadata
) {
  try {
    const itemsWithoutPrice = items.filter((item) => item.product.price == null);
if (itemsWithoutPrice.length > 0) {
  console.error("❌ Items missing prices:", itemsWithoutPrice);
  throw new Error("Some items do not have a price.");
}


    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const baseUrl = process.env.NODE_FNV ==='production'
    ? `https//${process.env.VERCEL_URL}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}`;

    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

    const cancelUrl = `${baseUrl}/cart`; 

    console.log("SUCCESS URL <<<<<",successUrl);
    console.log("CANCEL URL <<<<<",cancelUrl);


    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl ,
      line_items: items.map((item) => ({
        price_data: {
          currency: "USD",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: `Product ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.image
              ? [imageUrl(item.product.image).url()]
              : undefined,
          },
        },
        quantity: item.quantity,
      })),
    });

    return session.url;

  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error(`Checkout session creation failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
  
}
