import { meetingReplays } from '../data/mockData'
import './PlaceholderPage.css'

// 腾讯会议回放页（预留）：展示回放列表
function MeetingReplay() {
  return (
    <div className="placeholder-page">
      <div className="page-intro">
        <h2>腾讯会议回放</h2>
        <p>回看往期直播课程，温故知新。</p>
      </div>

      <ul className="replay-list">
        {meetingReplays.map((item) => (
          <li key={item.id} className="replay-item">
            <div className="replay-thumb">▶</div>
            <div className="replay-info">
              <h3>{item.title}</h3>
              <p>
                {item.date} · {item.duration}
              </p>
            </div>
            <a href={item.url} className="replay-btn">
              观看
            </a>
          </li>
        ))}
      </ul>

      <p className="dev-note">
        💡 当前链接为占位符。接入腾讯会议回放 API 或后台配置的真实 URL 后即可播放。
      </p>
    </div>
  )
}

export default MeetingReplay
