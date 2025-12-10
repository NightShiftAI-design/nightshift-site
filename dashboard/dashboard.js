// Protect dashboard (simple cookie check)
(function () {
  if (!document.cookie.includes("ns-auth=")) {
    window.location.href = "/dashboard/login.html";
  }
})();

// Import supabase client
import { supabase } from "./supabase-client.js";

// Wait until DOM is fully ready
document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
  setupLogout();
});

// Load stats + reservations
async function loadDashboard() {
  try {
    // --- CALL SUMMARY ---
    const { data: calls, error: callError } = await supabase
      .from("public_daily_calls_view")
      .select("*")
      .order("date", { ascending: false })
      .limit(7);

    if (callError) {
      console.error("Call summary error:", callError);
      document.getElementById("stats-content").innerHTML = "Error loading calls.";
    } else {
      document.getElementById("stats-content").innerHTML =
        calls?.length
          ? calls
              .map((c) => `<p>${c.date}: ${c.total_calls} calls</p>`)
              .join("")
          : "No call data.";
    }

    // --- RESERVATIONS ---
    const { data: reservations, error: resError } = await supabase
      .from("public_reservations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (resError) {
      console.error("Reservation error:", resError);
      document.getElementById("reservations-list").innerHTML =
        "Error loading reservations.";
    } else {
      document.getElementById("reservations-list").innerHTML =
        reservations?.length
          ? reservations
              .map(
                (r) => `
            <div class="reservation-card">
              <strong>${r.guest_name}</strong><br>
              ${r.room_type} — ${r.arrival_date}<br>
              Total: $${r.total_due}
            </div>
          `
              )
              .join("")
          : "No reservations yet.";
    }
  } catch (err) {
    console.error("Dashboard load error:", err);
  }
}

// Logout button
function setupLogout() {
  const btn = document.getElementById("logout-btn");
  if (!btn) return;

  btn.onclick = () => {
    document.cookie =
      "ns-auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
    window.location.href = "/dashboard/login.html";
  };
}
