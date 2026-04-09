import webpush from "web-push";

const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

if (vapidPublicKey && vapidPrivateKey && vapidPublicKey !== "BA...") {
  webpush.setVapidDetails(
    "mailto:hello@busiapastries.co.ke",
    vapidPublicKey,
    vapidPrivateKey
  );
}

export interface PushPayload {
  title: string;
  body: string;
  url?: string;
  icon?: string;
}

export async function sendPushNotification(
  subscription: { endpoint: string; p256dh: string; auth: string },
  payload: PushPayload
) {
  if (!vapidPublicKey || vapidPublicKey === "BA...") {
    console.log("[WebPush] Skipped — VAPID keys not configured.");
    return;
  }

  try {
    await webpush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.p256dh,
          auth: subscription.auth,
        },
      },
      JSON.stringify(payload)
    );
  } catch (err: unknown) {
    const error = err as { statusCode?: number };
    // 410 Gone / 404 = subscription expired, caller should delete it
    if (error?.statusCode === 410 || error?.statusCode === 404) {
      throw new Error("SUBSCRIPTION_EXPIRED");
    }
    throw err;
  }
}
