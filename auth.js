const SUPABASE_URL = 'https://твой-project.supabase.co';
const SUPABASE_KEY = 'твой-anon-key';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkAdmin() {
  const { data: { user } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single();

  return profile?.role === 'admin';
}

async function logout() {
  await supabase.auth.signOut();
  location.href = '/';
}
