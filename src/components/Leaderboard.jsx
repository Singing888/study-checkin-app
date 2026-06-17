import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import './Leaderboard.css'

const TABS = [
  { key: 'all', label: '总榜' },
  { key: 'week', label: '周榜' },
  { key: 'month', label: '月榜' },
]

function getDateRange(tab) {
  const now = new Date()
  const end = new Date(now)

  if (tab === 'week') {
    const start = new Date(now)
    start.setDate(now.getDate() - 6)
    return {
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
    }
  }

  if (tab === 'month') {
    const start = new Date(now)
    start.setDate(now.getDate() - 29)
    return {
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
    }
  }

  return null
}

// 打卡排行榜：从 Supabase 读取 checkins 表，按 user_id 统计打卡次数
function Leaderboard() {
  const [activeTab, setActiveTab] = useState('all')
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true)

      let query = supabase
        .from('checkins')
        .select('user_id, date, created_at')

      const range = getDateRange(activeTab)

      if (range) {
        query = query.gte('date', range.start).lte('date', range.end)
      }

      const { data, error } = await query

      if (error) {
        console.error('读取排行榜失败：', error)
        setList([])
        setLoading(false)
        return
      }

      const countMap = {}

      data.forEach((item) => {
        if (!item.user_id) return

        if (!countMap[item.user_id]) {
          countMap[item.user_id] = {
            name: item.user_id,
            count: 0,
          }
        }

        countMap[item.user_id].count += 1
      })

      const rankedList = Object.values(countMap)
        .sort((a, b) => b.count - a.count)
        .map((item, index) => ({
          ...item,
          rank: index + 1,
        }))

      setList(rankedList)
      setLoading(false)
    }

    fetchLeaderboard()
  }, [activeTab])

  return (
    <section className="card leaderboard-card">
      <div className="card-header">
        <h2 className="card-title">打卡排行榜</h2>
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

      {loading ? (
        <p className="checkin-hint">正在读取排行榜...</p>
      ) : list.length === 0 ? (
        <p className="checkin-hint">暂无打卡记录</p>
      ) : (
        <ul className="leaderboard-list">
          {list.map((item) => (
            <li
              key={`${activeTab}-${item.name}`}
              className="leaderboard-item"
            >
              <span className={`rank rank-${item.rank}`}>
                {item.rank <= 3 ? ['🥇', '🥈', '🥉'][item.rank - 1] : item.rank}
              </span>
              <span className="avatar">📚</span>
              <span className="name">{item.name}</span>
              <span className="minutes">{item.count}次打卡</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Leaderboard