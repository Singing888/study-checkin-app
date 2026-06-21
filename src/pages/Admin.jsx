import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import './Admin.css'

function formatTime(value) {
  if (!value) return '时间未知'

  return new Date(value).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function countByUser(records) {
  const map = {}

  records.forEach((item) => {
    if (!item.user_id) return
    map[item.user_id] = (map[item.user_id] || 0) + 1
  })

  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

function Admin() {
  const today = new Date().toISOString().slice(0, 10)
  const [checkins, setCheckins] = useState([])
  const [weeklyProgress, setWeeklyProgress] = useState([])
  const [tasks, setTasks] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [taskContent, setTaskContent] = useState('')
  const [taskDeadline, setTaskDeadline] = useState('')
  const [taskSubmitting, setTaskSubmitting] = useState(false)
  const [taskMessage, setTaskMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    async function fetchAdminData() {
      setLoading(true)
      const nextErrors = []

      const { data: checkinData, error: checkinError } = await supabase
        .from('checkins')
        .select('id, user_id, date, created_at')
        .order('created_at', { ascending: false })

      if (checkinError) {
        console.error('管理页读取打卡失败：', checkinError)
        nextErrors.push('打卡记录读取失败，请检查 checkins 表的 SELECT 权限。')
      } else {
        setCheckins(checkinData || [])
      }

      const { data: progressData, error: progressError } = await supabase
        .from('weekly_progress')
        .select('id, user_id, note, images, created_at')
        .order('created_at', { ascending: false })

      if (progressError) {
        console.error('管理页读取周进度失败：', progressError)
        nextErrors.push('周进度读取失败，请检查 weekly_progress 表是否已创建。')
      } else {
        setWeeklyProgress(progressData || [])
      }

      const { data: taskData, error: taskError } = await supabase
        .from('study_tasks')
        .select('id, title, content, deadline, is_active, created_at')
        .order('created_at', { ascending: false })

      if (taskError) {
        console.error('管理页读取任务失败：', taskError)
        nextErrors.push('专业课任务读取失败，请检查 study_tasks 表是否已创建。')
      } else {
        setTasks(taskData || [])
      }

      setErrors(nextErrors)
      setLoading(false)
    }

    fetchAdminData()
  }, [])

  const todayCheckins = useMemo(
    () => checkins.filter((item) => item.date === today),
    [checkins, today],
  )

  const ranking = useMemo(() => countByUser(checkins), [checkins])

  const handleCreateTask = async (event) => {
    event.preventDefault()

    const title = taskTitle.trim()
    const content = taskContent.trim()

    if (!title || !content) {
      setTaskMessage('请填写任务标题和任务内容。')
      return
    }

    setTaskSubmitting(true)
    setTaskMessage('')

    const { data, error } = await supabase
      .from('study_tasks')
      .insert([
        {
          title,
          content,
          deadline: taskDeadline || null,
          is_active: true,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('发布专业课任务失败：', error)
      setTaskMessage('发布失败：请检查 study_tasks 表和 INSERT 权限。')
      setTaskSubmitting(false)
      return
    }

    setTasks((prev) => [data, ...prev])
    setTaskTitle('')
    setTaskContent('')
    setTaskDeadline('')
    setTaskMessage('专业课任务已发布，学生首页会显示。')
    setTaskSubmitting(false)
  }

  return (
    <div className="admin-page">
      <div className="admin-intro">
        <h2>管理者后台</h2>
        <p>查看专业课打卡、累计排行和周进度图片记录。</p>
      </div>

      <p className="admin-warning">
        MVP 临时管理视图：当前还没有登录鉴权，正式给学生使用前需要加管理员权限。
      </p>

      {loading ? (
        <p className="admin-loading">正在读取管理数据...</p>
      ) : (
        <>
          {errors.map((error) => (
            <p key={error} className="admin-error">{error}</p>
          ))}

          <section className="admin-stats">
            <div className="admin-stat-card">
              <span>今日打卡</span>
              <strong>{todayCheckins.length}</strong>
            </div>
            <div className="admin-stat-card">
              <span>累计打卡</span>
              <strong>{checkins.length}</strong>
            </div>
            <div className="admin-stat-card">
              <span>周进度</span>
              <strong>{weeklyProgress.length}</strong>
            </div>
          </section>

          <section className="admin-section">
            <h3>发布专业课任务</h3>
            <form className="admin-task-form" onSubmit={handleCreateTask}>
              <label>
                任务标题
                <input
                  type="text"
                  placeholder="例如：第 2 章核心概念背诵"
                  value={taskTitle}
                  onChange={(event) => setTaskTitle(event.target.value)}
                />
              </label>

              <label>
                任务内容
                <textarea
                  placeholder="写清楚本次专业课需要背诵、整理或复盘的内容。"
                  value={taskContent}
                  onChange={(event) => setTaskContent(event.target.value)}
                  rows={4}
                />
              </label>

              <label>
                截止时间（选填）
                <input
                  type="datetime-local"
                  value={taskDeadline}
                  onChange={(event) => setTaskDeadline(event.target.value)}
                />
              </label>

              <button type="submit" disabled={taskSubmitting}>
                {taskSubmitting ? '发布中...' : '发布任务'}
              </button>

              {taskMessage && <p className="admin-task-message">{taskMessage}</p>}
            </form>
          </section>

          <section className="admin-section">
            <h3>已发布任务</h3>
            {tasks.length === 0 ? (
              <p className="admin-empty">暂无专业课任务</p>
            ) : (
              <ul className="admin-task-list">
                {tasks.map((item) => (
                  <li key={item.id}>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.content}</p>
                      <time>截止：{item.deadline || '待通知'}</time>
                    </div>
                    <span>{item.is_active ? '显示中' : '已隐藏'}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="admin-section">
            <h3>今日已打卡</h3>
            {todayCheckins.length === 0 ? (
              <p className="admin-empty">今天暂无打卡记录</p>
            ) : (
              <ul className="admin-list">
                {todayCheckins.map((item) => (
                  <li key={item.id}>
                    <span>{item.user_id || '未命名同学'}</span>
                    <time>{formatTime(item.created_at)}</time>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="admin-section">
            <h3>累计排行榜</h3>
            {ranking.length === 0 ? (
              <p className="admin-empty">暂无累计打卡记录</p>
            ) : (
              <ul className="admin-list">
                {ranking.map((item, index) => (
                  <li key={item.name}>
                    <span>{index + 1}. {item.name}</span>
                    <strong>{item.count} 次</strong>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="admin-section">
            <h3>周进度图片记录</h3>
            {weeklyProgress.length === 0 ? (
              <p className="admin-empty">暂无周进度提交</p>
            ) : (
              <div className="admin-progress-list">
                {weeklyProgress.map((item) => (
                  <article key={item.id} className="admin-progress-card">
                    <div className="admin-progress-head">
                      <strong>{item.user_id || '未命名同学'}</strong>
                      <time>{formatTime(item.created_at)}</time>
                    </div>
                    {item.note && <p>{item.note}</p>}
                    {Array.isArray(item.images) && item.images.length > 0 && (
                      <div className="admin-image-grid">
                        {item.images.map((image) => (
                          <a
                            key={image.path || image.url}
                            href={image.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img src={image.url} alt="专业课周进度" />
                          </a>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}

export default Admin
