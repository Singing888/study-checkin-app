import CheckInStatus from '../components/CheckInStatus'
import Leaderboard from '../components/Leaderboard'
import HomeworkList from '../components/HomeworkList'
import QuickLinks from '../components/QuickLinks'
import { currentUser } from '../data/mockData'
import '../components/Card.css'
import './Home.css'

// 首页：打卡状态 + 排行榜 + 作业 + 快捷入口
function Home() {
  return (
    <div className="home">
      <CheckInStatus
        initialCheckedIn={currentUser.checkedInToday}
        userName={currentUser.name}
      />
      <Leaderboard />
      <HomeworkList />
      <QuickLinks />
    </div>
  )
}

export default Home
