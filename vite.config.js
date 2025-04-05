import { defineConfig,loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  // Load environment variables based on mode
  const env = loadEnv(mode, process.cwd(), '');
  

  return {
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:5002',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    base: '/',
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: ["@material-tailwind/react"],
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          ui: ['react-toastify', 'react-loading-skeleton'],
          charts: ['chart.js', 'react-chartjs-2'],
          icons: [
            '@fortawesome/react-fontawesome',
            '@fortawesome/free-solid-svg-icons'
          ],
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
  },
  plugins: [react()],
  define: {
    'process.env': process.env
  }
}


});