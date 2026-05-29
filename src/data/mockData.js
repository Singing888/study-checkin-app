// 模拟数据：后端接口未接入前，用假数据让页面能正常展示

export const currentUser = {
  id: 'u1',
  name: '小明',
  avatar: '明',
  checkedInToday: false,
  todayMinutes: 0,
}

export const leaderboard = {
  day: [
    { rank: 1, name: '学姐阿琳', minutes: 380, avatar: '琳' },
    { rank: 2, name: '研友小张', minutes: 320, avatar: '张' },
    { rank: 3, name: '努力鸭', minutes: 285, avatar: '鸭' },
    { rank: 4, name: '小明', minutes: 0, avatar: '明', isMe: true },
    { rank: 5, name: '夜猫子', minutes: 210, avatar: '猫' },
  ],
  week: [
    { rank: 1, name: '学姐阿琳', minutes: 2180, avatar: '琳' },
    { rank: 2, name: '研友小张', minutes: 1950, avatar: '张' },
    { rank: 3, name: '努力鸭', minutes: 1720, avatar: '鸭' },
    { rank: 4, name: '夜猫子', minutes: 1580, avatar: '猫' },
    { rank: 5, name: '小明', minutes: 420, avatar: '明', isMe: true },
  ],
  month: [
    { rank: 1, name: '学姐阿琳', minutes: 8920, avatar: '琳' },
    { rank: 2, name: '研友小张', minutes: 7650, avatar: '张' },
    { rank: 3, name: '努力鸭', minutes: 7100, avatar: '鸭' },
    { rank: 4, name: '夜猫子', minutes: 6420, avatar: '猫' },
    { rank: 5, name: '小明', minutes: 3200, avatar: '明', isMe: true },
  ],
}

export const latestHomework = [
  {
    id: 'h1',
    title: '英语阅读精讲 · Unit 5',
    course: '英语',
    deadline: '2026-05-28 23:59',
    status: 'pending',
  },
  {
    id: 'h2',
    title: '高数习题册 · 第三章定积分',
    course: '数学',
    deadline: '2026-05-29 18:00',
    status: 'pending',
  },
  {
    id: 'h3',
    title: '政治时政热点整理',
    course: '政治',
    deadline: '2026-05-30 12:00',
    status: 'submitted',
  },
]

export const meetingReplays = [
  {
    id: 'm1',
    title: '英语长难句精讲',
    date: '2026-05-25',
    duration: '1小时32分',
    url: '#',
  },
  {
    id: 'm2',
    title: '数学概率论串讲',
    date: '2026-05-22',
    duration: '2小时05分',
    url: '#',
  },
]
