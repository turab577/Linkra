'use client'

import {
  MessageCircle, TrendingUp, Globe, MousePointerClick, Activity, Instagram, Phone, ArrowUpRight, Clock
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'

const engagementData = [
  { name: 'Mon', clicks: 400, messages: 240 },
  { name: 'Tue', clicks: 300, messages: 139 },
  { name: 'Wed', clicks: 550, messages: 380 },
  { name: 'Thu', clicks: 450, messages: 390 },
  { name: 'Fri', clicks: 600, messages: 480 },
  { name: 'Sat', clicks: 750, messages: 520 },
  { name: 'Sun', clicks: 680, messages: 430 },
]

const sourceData = [
  { name: 'Instagram', value: 400, color: '#E1306C' },
  { name: 'WhatsApp', value: 350, color: '#25D366' },
  { name: 'Telegram', value: 250, color: '#0088cc' },
  { name: 'Web Direct', value: 200, color: '#00C2FF' },
]

const recentActivity = [
  { id: 1, user: 'Sarah Jenkins', action: 'Sent a message via WhatsApp', time: '2 mins ago', icon: <Phone size={14} className="text-[#25D366]" /> },
  { id: 2, user: 'Mike Ross', action: 'Clicked on Campaign Link A', time: '15 mins ago', icon: <MousePointerClick size={14} className="text-[#00C2FF]" /> },
  { id: 3, user: 'Elena Gilbert', action: 'Sent a message via Instagram', time: '1 hour ago', icon: <Instagram size={14} className="text-[#E1306C]" /> },
  { id: 4, user: 'System', action: 'Weekly Analytics Report Generated', time: '2 hours ago', icon: <Activity size={14} className="text-purple-400" /> },
]

export default function DashboardOverviewPage() {
  return (
    <div className="p-4 md:p-8 space-y-8  pb-20">

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard Overview</h1>
          <p className="text-gray-400">Track your links, messages, and platform health in real-time.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            All Systems Operational
          </span>
        </div>
      </header>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Clicks', value: '45.2K', trend: '+12.5%', isUp: true, icon: <MousePointerClick className="text-white" /> },
          { title: 'Inbound Messages', value: '3,842', trend: '+8.2%', isUp: true, icon: <MessageCircle className="text-white" /> },
          { title: 'Conversion Rate', value: '8.4%', trend: '-1.2%', isUp: false, icon: <TrendingUp className="text-white" /> },
          { title: 'Global Reach', value: '142', trend: '+5 new', isUp: true, icon: <Globe className="text-white" />, suffix: 'Countries' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0A1628]/60 p-6 rounded-2xl border border-white/5 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
              {stat.icon}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-white/5 rounded-xl">{stat.icon}</div>
              <h3 className="text-sm text-gray-400 font-medium">{stat.title}</h3>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              {stat.suffix && <span className="text-sm text-gray-500 mb-1">{stat.suffix}</span>}
            </div>
            <div className={`mt-3 text-xs font-medium flex items-center gap-1 ${stat.isUp ? 'text-green-400' : 'text-red-400'}`}>
              {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowUpRight size={14} className="transform rotate-90" />}
              {stat.trend} from last month
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#0A1628]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Engagement Overview</h2>
              <p className="text-xs text-gray-400">Clicks vs Messages (Last 7 Days)</p>
            </div>
            <select className="bg-white/5 border border-white/10 text-xs rounded-lg px-3 py-1.5 text-gray-300 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C2FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00C2FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorMsgs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickMargin={10} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f1f35', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff', fontSize: '13px' }}
                />
                <Area type="monotone" dataKey="clicks" stroke="#00C2FF" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
                <Area type="monotone" dataKey="messages" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorMsgs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources Pie */}
        <div className="bg-[#0A1628]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-md flex flex-col">
          <div className="mb-2">
            <h2 className="text-lg font-bold text-white">Traffic Sources</h2>
            <p className="text-xs text-gray-400">Where your audience comes from</p>
          </div>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f1f35', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff', fontSize: '13px' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Full Width */}
      <div className="bg-[#0A1628]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock size={18} className="text-[#00C2FF]" />
            Recent Activity
          </h2>
          <button className="text-xs text-[#00C2FF] hover:underline">View All</button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-white/5 rounded-xl transition-colors border border-white/5">
              <div className="mt-1 p-2 bg-[#050D1A] rounded-full border border-white/5">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">{activity.user}</p>
                <p className="text-sm text-gray-400">{activity.action}</p>
              </div>
              <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
