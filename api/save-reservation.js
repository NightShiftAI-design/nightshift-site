import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      hotel_id,
      guest_name,
      arrival_date,
      nights,
      room_type,
      guest_count,
      pets,
      nightly_rate,
      total_price,
      notes,
    } = req.body;

    // Validate required fields
    if (!hotel_id || !guest_name || !arrival_date || !nights || !room_type) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Insert reservation into Supabase
    const { data, error } = await supabase
      .from("reservations")
      .insert([
        {
          hotel_id,
          guest_name,
          arrival_date,
          nights,
          room_type,
          guest_count,
          pets,
          nightly_rate,
          total_price,
          notes,
          status: "pending",
        },
      ]);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Database insert failed." });
    }

    res.status(200).json({ success: true, reservation: data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error." });
  }
}
