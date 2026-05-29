import { useState } from 'react'
import './CheckInStatus.css'

// 今日打卡状态卡片：显示是否已打卡，并提供打卡按钮
function CheckInStatus({ initialCheckedIn = false, userName = '同学' }) {
  const [checkedIn, setCheckedIn] = useState(initialCheckedIn)
  const [checkInTime, setCheckInTime] = useState(null)

  const handleCheckIn = () => {
    if (checkedIn) return
    const now = new Date()
    const timeStr = now.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    })
    setCheckedIn(true)
    setCheckInTime(timeStr)
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
            <p className="checkin-detail">打卡时间：{checkInTime}</p>
          </>
        ) : (
          <p className="checkin-hint">完成今日学习后，记得来这里打卡哦</p>
        )}
      </div>

      <button
        type="button"
        className={`checkin-btn ${checkedIn ? 'disabled' : ''}`}
        onClick={handleCheckIn}
        disabled={checkedIn}
      >
        {checkedIn ? '今日已打卡 ✓' : '立即打卡'}
      </button>
    </section>
  )
}

export default CheckInStatus
