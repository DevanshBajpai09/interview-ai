import { db } from "@/utils/db"; // your existing db util
import { ProctorLog } from "@/utils/schema"; // we'll add this model below

export async function POST(req) {
  try {
    const body = await req.json();
    await db.insert(ProctorLog).values({
      interviewId: body.interviewId,
      reason: body.reason,
      meta: JSON.stringify(body.extra || {}),
      timestamp: new Date(body.ts || Date.now()).toISOString(),
    });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500 });
  }
}
