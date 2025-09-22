import "server-only";

export interface SupplierOrderPayload {
  orderId: string;
  lineItems: Array<{
    sku: string;
    quantity: number;
  }>;
  customer: {
    name: string;
    email: string;
    address: string;
  };
}

export interface SupplierOrderResponse {
  referenceId: string;
  status: "queued" | "processing" | "fulfilled" | "cancelled";
}

export async function submitDropshipOrder(payload: SupplierOrderPayload): Promise<SupplierOrderResponse> {
  // This function is a placeholder to demonstrate how a supplier API could be integrated.
  // Implementations can call Shopify, WooCommerce, or a bespoke supplier endpoint here.
  console.info("Dropshipping payload prepared", payload);
  return { referenceId: payload.orderId, status: "queued" };
}
