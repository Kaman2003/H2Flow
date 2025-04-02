import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'bundle-stats.html'
    })
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Set higher warning threshold (in kB)
    rollupOptions: {
      external: ["@material-tailwind/react"],
      output: {
        manualChunks: {
          // Group React and related libraries
          react: ['react', 'react-dom', 'react-router-dom'],
          
          // Group UI libraries
          ui: ['react-toastify', 'react-loading-skeleton'],
          
          // Group charting libraries
          charts: ['chart.js', 'react-chartjs-2'],
          
          // Group Font Awesome
          icons: [
            '@fortawesome/react-fontawesome',
            '@fortawesome/free-solid-svg-icons'
          ],
          
          // Group utility libraries
          utilities: ['date-fns', 'lodash', 'axios']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  }
});