import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const body = await req.json();
    // Mark interview complete/suspicious
    await db.update(MockInterview)
      .set({ completed: true, completedReason: body.reason || "auto_submitted_by_proctor" })
      .where(eq(MockInterview.mockId, body.interviewId));
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500 });
  }
}
