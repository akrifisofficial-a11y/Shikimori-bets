const SUPABASE_URL = 'https://твой-project.supabase.co';
const SUPABASE_KEY = 'твой-anon-key';

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
