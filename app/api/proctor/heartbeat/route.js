import { db } from "@/utils/db";
import { Heartbeat } from "@/utils/schema";

export async function POST(req) {
  try {
    const body = await req.json();
    await db.insert(Heartbeat).values({
      interviewId: body.interviewId,
      timestamp: new Date(body.ts || Date.now()).toISOString(),
    });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500 });
  }
}
