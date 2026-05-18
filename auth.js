const SUPABASE_URL = 'https://jgixjjycdnfhtkbzsmlf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnaXhqanljZG5maHRrYnpzbWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNzY4MjQsImV4cCI6MjA5NDY1MjgyNH0.vEY5NV3iQS-7Okg-STQjHW87kVz9ai3cJZgfsW1OJJQ';

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
