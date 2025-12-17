import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // 1. Warning limit thodi badha di taake choti files par warning na aaye
    chunkSizeWarningLimit: 1000,
    
    // 2. Rollup Options (Yahan magic hota hai)
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Logic: Agar koi file "node_modules" folder se aa rahi hai...
          if (id.includes('node_modules')) {
            // ...toh usay "vendor" naam ki alag file mein daal do.
            return 'vendor';
          }
        },
      },
    },
  },
});