import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss'; // Tailwind should be used in PostCSS

export default defineConfig({
  plugins: [react()], // TailwindCSS should be handled via PostCSS
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});