"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { OrderStatus, PaymentStatus } from "@/types/product";

interface OrderStatusData {
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  updatedAt: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export function useOrderStatus(orderId: string, token: string) {
  const [data, setData] = useState<OrderStatusData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId || !token) return;

    // Initial fetch
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `/api/orders/${orderId}/payment-status?token=${token}`
        );
        if (!res.ok) throw new Error("Order not found");
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();

    // Supabase Realtime subscription
    if (!supabaseUrl || !supabaseAnonKey) return;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const channel = supabase
      .channel(`order-${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Order",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          const updated = payload.new as {
            status: OrderStatus;
            paymentStatus: PaymentStatus;
            updatedAt: string;
          };
          setData({
            status: updated.status,
            paymentStatus: updated.paymentStatus,
            updatedAt: updated.updatedAt,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId, token]);

  return { data, isLoading, error };
}
