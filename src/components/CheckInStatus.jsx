import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import './CheckInStatus.css'

// 今日打卡状态卡片：显示是否已打卡，并提供打卡按钮
function CheckInStatus({ initialCheckedIn = false, userName = '同学' }) {
  const [checkedIn, setCheckedIn] = useState(initialCheckedIn)
  const [checkInTime, setCheckInTime] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const today = new Date().toISOString().slice(0, 10)

  // 暂时先用 userName 作为 user_id
  // 后面接入登录后，可以换成真正的用户 ID
  const userId = userName

  useEffect(() => {
    async function fetchTodayCheckIn() {
      const { data, error } = await supabase
        .from('checkins')
        .select('*')
        .eq('user_id', userId)
        .eq('date', today)
        .maybeSingle()

      if (error) {
        console.error('查询今日打卡失败：', error)
        setLoading(false)
        return
      }

      if (data) {
        setCheckedIn(true)

        if (data.created_at) {
          const timeStr = new Date(data.created_at).toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
          })
          setCheckInTime(timeStr)
        }
      }

      setLoading(false)
    }

    fetchTodayCheckIn()
  }, [today, userId])

  const handleCheckIn = async () => {
    if (checkedIn || submitting) return

    setSubmitting(true)

    const { data, error } = await supabase
      .from('checkins')
      .insert([
        {
          user_id: userId,
          date: today,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('打卡失败：', error)
      alert('打卡失败，请检查 Supabase 设置')
      setSubmitting(false)
      return
    }

    setCheckedIn(true)

    const timeStr = new Date(data.created_at).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    })

    setCheckInTime(timeStr)
    setSubmitting(false)
  }

  if (loading) {
    return (
      <section className="checkin-card">
        <p className="checkin-hint">正在读取今日打卡状态...</p>
      </section>
    )
  }

  return (
    <section className="checkin-card">
      <div className="checkin-card-header">
        <span className="checkin-label">今日是否已打卡</span>
        <span className={`checkin-badge ${checkedIn ? 'done' : 'pending'}`}>
          {checkedIn ? '已打卡' : '未打卡'}
        </span>
      </div>

      <div className="checkin-body">
        {checkedIn ? (
          <>
            <p className="checkin-greeting">太棒了，{userName}！</p>
            <p className="checkin-detail">
              打卡时间：{checkInTime || '今日已完成'}
            </p>
          </>
        ) : (
          <p className="checkin-hint">完成今日学习后，记得来这里打卡哦</p>
        )}
      </div>

      <button
        type="button"
        className={`checkin-btn ${checkedIn ? 'disabled' : ''}`}
        onClick={handleCheckIn}
        disabled={checkedIn || submitting}
      >
        {checkedIn ? '今日已打卡 ✓' : submitting ? '打卡中...' : '立即打卡'}
      </button>
    </section>
  )
}

export default CheckInStatus