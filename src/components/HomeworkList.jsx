import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { latestHomework } from '../data/mockData'
import './HomeworkList.css'

const STATUS_MAP = {
  pending: { label: '待完成', className: 'status-pending' },
  submitted: { label: '已提交', className: 'status-done' },
}

// 专业课任务列表
function HomeworkList() {
  const [tasks, setTasks] = useState(latestHomework)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTasks() {
      const { data, error } = await supabase
        .from('study_tasks')
        .select('id, title, content, deadline, is_active, created_at')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('读取专业课任务失败：', error)
        setLoading(false)
        return
      }

      if (data && data.length > 0) {
        setTasks(data.map((item) => ({
          id: item.id,
          title: item.title,
          content: item.content,
          course: '专业课',
          deadline: item.deadline || '待通知',
          status: 'pending',
        })))
      }

      setLoading(false)
    }

    fetchTasks()
  }, [])

  return (
    <section className="card homework-card">
      <div className="card-header">
        <h2 className="card-title">专业课任务</h2>
        <span className="card-more">{loading ? '读取中' : '已同步'}</span>
      </div>

      <ul className="homework-list">
        {tasks.map((item) => {
          const status = STATUS_MAP[item.status] || STATUS_MAP.pending
          return (
            <li key={item.id} className="homework-item">
              <div className="homework-info">
                <span className="homework-course">{item.course}</span>
                <h3 className="homework-title">{item.title}</h3>
                {item.content && (
                  <p className="homework-content">{item.content}</p>
                )}
                <p className="homework-deadline">截止：{item.deadline}</p>
              </div>
              <span className={`homework-status ${status.className}`}>
                {status.label}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default HomeworkList
