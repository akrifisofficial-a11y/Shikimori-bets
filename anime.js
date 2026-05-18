const SUPABASE_URL = 'https://твой-project.supabase.co';
const SUPABASE_KEY = 'твой-anon-key';

const id = new URLSearchParams(location.search).get('id');

document.addEventListener('DOMContentLoaded', loadAnime);

async function loadAnime() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/anime?id=eq.${id}&select=*`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });

    const [anime] = await res.json();
    if (!anime) {
      document.getElementById('loading').textContent = 'Аниме не найдено';
      return;
    }

    document.title = anime.title;

    document.getElementById('anime-cover').src = anime.cover;
    document.getElementById('anime-cover').alt = anime.title;
    document.getElementById('anime-title').textContent = anime.title;
    document.getElementById('anime-genres').textContent = anime.genres?.join(', ');
    document.getElementById('anime-description').textContent = anime.description || 'Описание отсутствует';

    const shikiUrl = `https://shikimori.io/animes/${anime.slug}`;
    document.getElementById('shiki-link').href = shikiUrl;
    document.getElementById('player-link').href = `${shikiUrl}/watch`;

    document.getElementById('loading').style.display = 'none';
    document.getElementById('anime-content').style.display = 'flex';

  } catch (e) {
    document.getElementById('loading').textContent = 'Ошибка загрузки';
    console.error(e);
  }
}
