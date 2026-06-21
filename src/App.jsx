import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import WeeklyProgress from './pages/WeeklyProgress'
import MeetingReplay from './pages/MeetingReplay'
import Admin from './pages/Admin'

// 路由配置：不同 URL 显示不同页面
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="weekly-progress" element={<WeeklyProgress />} />
        <Route path="meeting-replay" element={<MeetingReplay />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}

export default App
