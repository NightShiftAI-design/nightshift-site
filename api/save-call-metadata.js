import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: true, // FORCE VERCEL TO PARSE JSON
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Safely parse JSON
    let body = req.body;

    // Handle stringified JSON cases
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: "Invalid JSON body" });
      }
    }

    if (!body || typeof body !== "object") {
      return res.status(400).json({ error: "Missing JSON body" });
    }

    // Validate hotel_id
    if (!body.hotel_id) {
      return res.status(400).json({ error: "hotel_id is required" });
    }

    // Connect to Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Insert metadata
    const { data, error } = await supabase
      .from("call_metadata")
      .insert([
        {
          hotel_id: body.hotel_id,
          caller_number: body.caller_number || null,
          reason: body.reason || null,
          arrival_date: body.arrival_date || null,
          duration_seconds: body.duration_seconds || null,
          audio_url: body.audio_url || null,
          sentiment_score: body.sentiment_score || null,
          tags: body.tags || null,
          risk_flags: body.risk_flags || null,
          summary: body.summary || null,
          outcome: body.outcome || null
        }
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: "Database insert failed", detail: error });
    }

    return res.status(200).json({ success: true, saved: data });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
