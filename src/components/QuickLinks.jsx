import { Link } from 'react-router-dom'
import './QuickLinks.css'

// 快捷入口：周进度打卡、腾讯会议回放
function QuickLinks() {
  return (
    <section className="quick-links">
      <Link to="/weekly-progress" className="quick-link-card">
        <span className="quick-link-icon">📸</span>
        <div className="quick-link-text">
          <h3>专业课周进度</h3>
          <p>上传思维导图或分级大纲</p>
        </div>
        <span className="quick-link-arrow">›</span>
      </Link>

      <Link to="/meeting-replay" className="quick-link-card">
        <span className="quick-link-icon">🎬</span>
        <div className="quick-link-text">
          <h3>专业课回放</h3>
          <p>跳转腾讯会议回放链接</p>
        </div>
        <span className="quick-link-arrow">›</span>
      </Link>
    </section>
  )
}

export default QuickLinks
