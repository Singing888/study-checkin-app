import { latestHomework } from '../data/mockData'
import './HomeworkList.css'

const STATUS_MAP = {
  pending: { label: '待完成', className: 'status-pending' },
  submitted: { label: '已提交', className: 'status-done' },
}

// 最新作业列表
function HomeworkList() {
  return (
    <section className="card homework-card">
      <div className="card-header">
        <h2 className="card-title">最新作业</h2>
        <span className="card-more">查看全部</span>
      </div>

      <ul className="homework-list">
        {latestHomework.map((item) => {
          const status = STATUS_MAP[item.status] || STATUS_MAP.pending
          return (
            <li key={item.id} className="homework-item">
              <div className="homework-info">
                <span className="homework-course">{item.course}</span>
                <h3 className="homework-title">{item.title}</h3>
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
