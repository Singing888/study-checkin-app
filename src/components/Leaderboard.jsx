import { useState } from 'react'
import { leaderboard } from '../data/mockData'
import './Leaderboard.css'

const TABS = [
  { key: 'day', label: '日榜' },
  { key: 'week', label: '周榜' },
  { key: 'month', label: '月榜' },
]

function formatMinutes(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0) return `${h}小时${m > 0 ? m + '分' : ''}`
  return `${m}分钟`
}

// 学习时长排行榜：支持日/周/月切换
function Leaderboard() {
  const [activeTab, setActiveTab] = useState('day')
  const list = leaderboard[activeTab]

  return (
    <section className="card leaderboard-card">
      <div className="card-header">
        <h2 className="card-title">学习时长排行榜</h2>
      </div>

      <div className="leaderboard-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ul className="leaderboard-list">
        {list.map((item) => (
          <li
            key={`${activeTab}-${item.rank}`}
            className={`leaderboard-item ${item.isMe ? 'is-me' : ''}`}
          >
            <span className={`rank rank-${item.rank}`}>
              {item.rank <= 3 ? ['🥇', '🥈', '🥉'][item.rank - 1] : item.rank}
            </span>
            <span className="avatar">{item.avatar}</span>
            <span className="name">
              {item.name}
              {item.isMe && <span className="me-tag">我</span>}
            </span>
            <span className="minutes">{formatMinutes(item.minutes)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Leaderboard
