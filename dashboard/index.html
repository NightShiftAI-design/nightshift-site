<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NightShift Dashboard</title>
  <link rel="stylesheet" href="style.css" />
</head>

<body>

  <h1>NightShift Dashboard</h1>

  <section>
    <h2>Last 7 Days – Call Summary</h2>
    <div id="stats-content">Loading...</div>
  </section>

  <section>
    <h2>Latest Reservations</h2>
    <div id="reservations-list">Loading...</div>
  </section>

  <button id="logout">Logout</button>

  <!-- Load Supabase v1 (IMPORTANT) -->
  <script type="module">
    import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@1.35.7/dist/esm/supabase.js";

    const supabase = createClient(
      "https://sbzdnzouoyxmawuhdvdi.supabase.co",
      "YOUR_ANON_KEY_HERE"
    );

    async function loadDashboard() {
      // calls
      let { data: calls } = await supabase
        .from("daily_calls_view")
        .select("*")
        .order("date", { ascending: false })
        .limit(7);

      document.getElementById("stats-content").innerHTML =
        calls && calls.length
          ? calls.map(c => `<p>${c.date} — ${c.total_calls} calls</p>`).join("")
          : "No data";

      // reservations
      let { data: reservations } = await supabase
        .from("reservations")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      document.getElementById("reservations-list").innerHTML =
        reservations && reservations.length
          ? reservations.map(r => `
              <div class="reservation-card">
                <strong>${r.guest_name}</strong><br>
                ${r.room_type} — ${r.arrival_date}<br>
                Total: $${r.total_due}
              </div>
            `).join("")
          : "No reservations yet.";
    }

    loadDashboard();

    document.getElementById("logout").addEventListener("click", () => {
      document.cookie = "ns-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/dashboard/login.html";
    });
  </script>

</body>
</html>
