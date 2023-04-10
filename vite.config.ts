import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
// const path = require('path')

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})


// import { defineConfig } from 'vite'
// import path from 'path'

// export default defineConfig({
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// })
