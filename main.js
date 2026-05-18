const SUPABASE_URL = 'https://jgixjjycdnfhtkbzsmlf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnaXhqanljZG5maHRrYnpzbWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNzY4MjQsImV4cCI6MjA5NDY1MjgyNH0.vEY5NV3iQS-7Okg-STQjHW87kVz9ai3cJZgfsW1OJJQ';

document.addEventListener('DOMContentLoaded', loadAnime);

async function loadAnime() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/anime?select=*&order=created_at.desc`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });

  const data = await res.json();
  const grid = document.getElementById('anime-grid');
  document.getElementById('loading').style.display = 'none';

  grid.innerHTML = data.map(a => `
    <a href="/anime.html?id=${a.id}" class="card">
      <img src="${a.cover}" alt="${a.title}" loading="lazy">
      <div class="card-body">
        <div class="card-title">${a.title}</div>
      </div>
    </a>
  `).join('');
}
