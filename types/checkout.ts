export type FulfillmentMode = "DELIVERY" | "PICKUP";

export interface CheckoutFormData {
  fulfillment: FulfillmentMode;
  deliveryArea: string;
  deliveryLandmark: string;
  notes: string;
  fullName: string;
  email: string;
  phone: string;
  saveDetails: boolean;
  paymentMethod: "MPESA" | "CASH";
}
