import { Link } from 'react-router-dom'
import './QuickLinks.css'

// 快捷入口：周进度打卡、腾讯会议回放
function QuickLinks() {
  return (
    <section className="quick-links">
      <Link to="/weekly-progress" className="quick-link-card">
        <span className="quick-link-icon">📸</span>
        <div className="quick-link-text">
          <h3>每周进度打卡</h3>
          <p>上传本周学习进度截图</p>
        </div>
        <span className="quick-link-arrow">›</span>
      </Link>

      <Link to="/meeting-replay" className="quick-link-card">
        <span className="quick-link-icon">🎬</span>
        <div className="quick-link-text">
          <h3>腾讯会议回放</h3>
          <p>回看往期直播课程</p>
        </div>
        <span className="quick-link-arrow">›</span>
      </Link>
    </section>
  )
}

export default QuickLinks
