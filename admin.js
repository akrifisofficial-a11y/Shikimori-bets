const SUPABASE_URL = 'https://твой-project.supabase.co';
const SUPABASE_KEY = 'твой-anon-key';

document.getElementById('load-btn').onclick = loadFromShiki;
document.getElementById('save-btn').onclick = saveAnime;

function loadFromShiki() {
  const url = document.getElementById('shiki_url').value;
  const match = url.match(/animes\/(\d+)/);
  if (!match) return alert('Неверная ссылка');

  const id = match[1];
  document.getElementById('shiki_id').value = id;

  fetch(`https://shikimori.one/api/animes/${id}`)
   .then(r => r.json())
   .then(d => {
      document.getElementById('title').value = d.russian || d.name;
      document.getElementById('cover').value = `https://shikimori.one${d.image.original}`;
      document.getElementById('genres').value = d.genres.map(g => g.russian).join(', ');
      document.getElementById('description').value = d.description_html?.replace(/<[^>]*>/g, '') || '';
    });
}

async function saveAnime() {
  const body = {
    title: document.getElementById('title').value,
    shiki_id: document.getElementById('shiki_id').value,
    cover: document.getElementById('cover').value,
    genres: document.getElementById('genres').value.split(',').map(s => s.trim()),
    description: document.getElementById('description').value
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/anime`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  document.getElementById('msg').textContent = res.ok? 'Сохранено!' : 'Ошибка';
        }
