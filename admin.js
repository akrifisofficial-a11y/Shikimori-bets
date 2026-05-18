const SUPABASE_URL = 'https://jgixjjycdnfhtkbzsmlf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnaXhqanljZG5maHRrYnpzbWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNzY4MjQsImV4cCI6MjA5NDY1MjgyNH0.vEY5NV3iQS-7Okg-STQjHW87kVz9ai3cJZgfsW1OJJQ';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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
    document.getElementById('save-btn').dataset.slug = d.url.replace('/animes/', '');
  })
.catch(() => alert('Не удалось загрузить данные'));
}

async function saveAnime() {
  const { data: { session } = await supabase.auth.getSession();
  if (!session) return alert('Не авторизован');

  const body = {
    title: document.getElementById('title').value,
    shiki_id: document.getElementById('shiki_id').value,
    slug: document.getElementById('save-btn').dataset.slug,
    cover: document.getElementById('cover').value,
    genres: document.getElementById('genres').value.split(',').map(s => s.trim()),
    description: document.getElementById('description').value
  };

  if (!body.slug ||!body.title) return alert('Заполни все поля');

  const { error } = await supabase.from('anime').insert(body);

  document.getElementById('msg').textContent = error? 'Ошибка: ' + error.message : 'Сохранено!';
}
