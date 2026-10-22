import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const fileEnv = loadEnv(mode, process.cwd(), '');

  // Consolidate values from process.env (system/container environment) and .env files,
  // supporting both VITE_ prefixed and standard names.
  const supabaseUrl = (
    process.env.VITE_SUPABASE_URL ||
    fileEnv.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    fileEnv.SUPABASE_URL ||
    ''
  ).trim();

  const supabaseAnonKey = (
    process.env.VITE_SUPABASE_ANON_KEY ||
    fileEnv.VITE_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_KEY ||
    fileEnv.VITE_SUPABASE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    fileEnv.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_KEY ||
    fileEnv.SUPABASE_KEY ||
    ''
  ).trim();

  const adminEmails = (
    process.env.VITE_ADMIN_EMAILS ||
    fileEnv.VITE_ADMIN_EMAILS ||
    process.env.ADMIN_EMAILS ||
    fileEnv.ADMIN_EMAILS ||
    ''
  ).trim();

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(supabaseAnonKey),
      'import.meta.env.VITE_ADMIN_EMAILS': JSON.stringify(adminEmails),
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
    },
  };
});
