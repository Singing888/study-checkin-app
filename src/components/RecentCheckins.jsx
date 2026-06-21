import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import './RecentCheckins.css'

function formatTime(value) {
  if (!value) return '时间未知'

  return new Date(value).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function RecentCheckins() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecentCheckins() {
      const { data, error } = await supabase
        .from('checkins')
        .select('id, user_id, date, created_at')
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) {
        console.error('读取近期打卡失败：', error)
        setRecords([])
        setLoading(false)
        return
      }

      setRecords(data || [])
      setLoading(false)
    }

    fetchRecentCheckins()
  }, [])

  return (
    <section className="card recent-checkins-card">
      <div className="card-header">
        <h2 className="card-title">同学打卡动态</h2>
      </div>

      {loading ? (
        <p className="checkin-hint">正在读取近期打卡...</p>
      ) : records.length === 0 ? (
        <p className="checkin-hint">暂无同学打卡记录</p>
      ) : (
        <ul className="recent-checkins-list">
          {records.map((item) => (
            <li key={item.id} className="recent-checkins-item">
              <span className="recent-checkins-avatar">专</span>
              <div>
                <p className="recent-checkins-text">
                  <strong>{item.user_id || '未命名同学'}</strong> 完成了专业课学习打卡
                </p>
                <p className="recent-checkins-time">
                  {item.date} · {formatTime(item.created_at)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default RecentCheckins
