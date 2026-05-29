import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite 配置文件：告诉构建工具使用 React 插件、开发服务器端口等
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
})
