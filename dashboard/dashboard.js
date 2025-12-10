(function () {
  function getCookie(name) {
    return document.cookie.split("; ").find(r => r.startsWith(name + "="));
  }
  if (!getCookie("ns-auth")) {
    window.location.href = "/dashboard/login.html";
  }
})();

import { supabase } from './supabase-client.js';

async function loadDashboard() {

  // ---- DAILY CALL SUMMARY ----
  const { data: calls, error: callsErr } = await supabase
    .from('daily_calls_view')   // FIXED
    .select('*')
    .order('date', { ascending: false })
    .limit(7);

  console.log("Calls:", callsErr || calls);

  document.getElementById("stats-content").innerHTML =
    calls && calls.length
      ? calls.map(c => `<p>${c.date}: ${c.total_calls} calls</p>`).join("")
      : "No data";


  // ---- RESERVATIONS ----
  const { data: reservations, error: resErr } = await supabase
    .from('reservations')       // FIXED
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  console.log("Reservations:", resErr || reservations);

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
