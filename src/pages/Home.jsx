import { useState } from 'react'
import CheckInStatus from '../components/CheckInStatus'
import Leaderboard from '../components/Leaderboard'
import HomeworkList from '../components/HomeworkList'
import QuickLinks from '../components/QuickLinks'
import '../components/Card.css'
import './Home.css'

// localStorage 的 key
const USER_NAME_KEY = 'study_checkin_user_name'

// 首页：学生信息录入 + 打卡系统 + 学习模块
function Home() {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem(USER_NAME_KEY) || ''
  })

  const [inputName, setInputName] = useState('')

  // 提交姓名
  const handleSubmitName = (event) => {
    event.preventDefault()

    const trimmedName = inputName.trim()

    if (!trimmedName) {
      alert('请输入你的姓名')
      return
    }

    localStorage.setItem(USER_NAME_KEY, trimmedName)
    setUserName(trimmedName)
  }

  // 切换用户
  const handleChangeUser = () => {
    localStorage.removeItem(USER_NAME_KEY)
    setUserName('')
    setInputName('')
  }

  // ========== 没有用户：显示录入页 ==========
  if (!userName) {
    return (
      <div className="home">
        <div className="home-container">

          <section className="card student-card">
            <div className="card-header">
              <h2 className="card-title">📚 考研学习打卡系统</h2>
            </div>

            <p className="student-card-desc">
              请输入你的姓名，用于记录每日学习打卡与排行榜数据
            </p>

            <form className="student-form" onSubmit={handleSubmitName}>
              <label className="student-label" htmlFor="student-name">
                学生姓名
              </label>

              <input
                id="student-name"
                className="student-input"
                type="text"
                placeholder="例如：张三"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />

              <button className="student-submit-btn" type="submit">
                开始使用
              </button>
            </form>
          </section>

        </div>
      </div>
    )
  }

  // ========== 已有用户：主页面 ==========
  return (
    <div className="home">
      <div className="home-container">

        {/* 用户信息栏 */}
        <section className="card student-welcome-card">
          <div>
            <p className="student-welcome-text">👋 你好，{userName}</p>
            <p className="student-welcome-subtitle">
              今天也要稳稳推进学习，加油
            </p>
          </div>

          <button
            type="button"
            className="student-change-btn"
            onClick={handleChangeUser}
          >
            切换学生
          </button>
        </section>

        {/* 核心功能模块 */}
        <CheckInStatus userName={userName} />
        <Leaderboard />
        <HomeworkList />
        <QuickLinks />

      </div>
    </div>
  )
}

export default Home