import { Outlet, NavLink } from 'react-router-dom'
import './Layout.css'

// 布局组件：所有页面共用的外壳（顶栏 + 内容区 + 底部导航）
function Layout() {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1 className="layout-title">考研专业课打卡</h1>
        <p className="layout-subtitle">背诵、复盘、周进度，一起稳步推进</p>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      <nav className="layout-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <span className="nav-icon">🏠</span>
          <span>首页</span>
        </NavLink>
        <NavLink to="/weekly-progress" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <span className="nav-icon">📸</span>
          <span>周进度</span>
        </NavLink>
        <NavLink to="/meeting-replay" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <span className="nav-icon">🎬</span>
          <span>回放</span>
        </NavLink>
      </nav>
    </div>
  )
}

export default Layout
