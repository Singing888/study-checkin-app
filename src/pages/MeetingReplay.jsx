import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { meetingReplays } from '../data/mockData'
import './PlaceholderPage.css'

// 腾讯会议回放页：优先读取 Supabase 配置的真实回放链接
function MeetingReplay() {
  const [replays, setReplays] = useState(meetingReplays)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReplays() {
      const { data, error } = await supabase
        .from('meeting_replays')
        .select('id, title, replay_date, duration, url, is_active')
        .eq('is_active', true)
        .order('replay_date', { ascending: false })

      if (error) {
        console.error('读取课程回放失败：', error)
        setLoading(false)
        return
      }

      if (data && data.length > 0) {
        setReplays(data.map((item) => ({
          id: item.id,
          title: item.title,
          date: item.replay_date,
          duration: item.duration || '时长待补充',
          url: item.url,
        })))
      }

      setLoading(false)
    }

    fetchReplays()
  }, [])

  return (
    <div className="placeholder-page">
      <div className="page-intro">
        <h2>专业课回放</h2>
        <p>点击腾讯会议回放链接，回看专业课直播内容。</p>
      </div>

      {loading && <p className="checkin-hint">正在读取课程回放...</p>}

      <ul className="replay-list">
        {replays.map((item) => (
          <li key={item.id} className="replay-item">
            <div className="replay-thumb">▶</div>
            <div className="replay-info">
              <h3>{item.title}</h3>
              <p>
                {item.date} · {item.duration}
              </p>
            </div>
            <a
              href={item.url}
              className={`replay-btn ${item.url === '#' ? 'disabled' : ''}`}
              target="_blank"
              rel="noreferrer"
            >
              观看
            </a>
          </li>
        ))}
      </ul>

      <p className="dev-note">
        管理者可在 Supabase 的 meeting_replays 表中维护腾讯会议回放链接。
      </p>
    </div>
  )
}

export default MeetingReplay
