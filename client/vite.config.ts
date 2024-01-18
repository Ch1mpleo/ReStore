import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  //Chỉnh port được host sang 3000
  server: {
    port: 3000
  },
  plugins: [react()],
})
