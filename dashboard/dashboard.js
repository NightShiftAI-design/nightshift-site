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
  const { data: calls } = await supabase
    .from('public_daily_calls_view')
    .select('*')
    .order('date', { ascending: false })
    .limit(7);

  document.getElementById("stats-content").innerHTML =
    calls && calls.length
      ? calls.map(c => `<p>${c.date}: ${c.total_calls} calls</p>`).join("")
      : "No data";

  const { data: reservations } = await supabase
    .from('public_reservations')
    .select('*')
    .order('created_at', { ascending: false })
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
