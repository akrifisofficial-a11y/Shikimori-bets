const SUPABASE_URL = 'https://jgixjjycdnfhtkbzsmlf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnaXhqanljZG5maHRrYnpzbWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNzY4MjQsImV4cCI6MjA5NDY1MjgyNH0.vEY5NV3iQS-7Okg-STQjHW87kVz9ai3cJZgfsW1OJJQ';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const id = new URLSearchParams(location.search).get('id');

document.addEventListener('DOMContentLoaded', loadAnime);

async function loadAnime() {
  try {
    const { data: [anime], error } = await supabase
    .from('anime')
    .select('*')
    .eq('id', id)
    .single();

    if (error ||!anime) {
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
