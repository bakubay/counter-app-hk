import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { env } from "~/env.mjs";
import { db } from "~/server/db";

const webhookSecret = env.CLERK_WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (_) {
    // If the verification fails, return a 400 error
    return res.status(400).json({});
  }
  const clerkData = evt.data;
  const eventType = evt.type;
  try {
    if (eventType === "user.created") {
      const clerkUserData = clerkData as UserJSON;
      const userData = await db.user.create({
        data: {
          clekr_id: clerkUserData.id,
          name: clerkUserData.first_name + clerkUserData.last_name
        }
      })
      res.status(201).json({});
    }
  } catch (error) {
    console.error(error, "Error occured while processing webhook.");
  }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
