import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";

export default function Dashboard({ tasks, isAdmin, currentUser }) {
  // Logic for Global vs Personal Data
  const myTasks = tasks.filter(t => t.user === currentUser);
  const displayTasks = isAdmin ? tasks : myTasks;

  const stats = [
    { label: "Total Tasks", value: displayTasks.length, color: "#6366f1", icon: "📋" },
    { label: "Completed", value: displayTasks.filter(t => t.status === "completed").length, color: "#22c55e", icon: "✅" },
    { label: "High Priority", value: displayTasks.filter(t => t.priority === "High").length, color: "#ef4444", icon: "🔥" },
    { label: "Pending", value: displayTasks.filter(t => t.status === "pending").length, color: "#f97316", icon: "⏳" },
  ];

  const statusData = [
    { name: "Done", value: displayTasks.filter(t => t.status === "completed").length },
    { name: "Pending", value: displayTasks.filter(t => t.status === "pending").length },
    { name: "Waiting", value: displayTasks.filter(t => t.status === "Not Started").length },
  ];

  const priorityData = [
    { name: "High", count: displayTasks.filter(t => t.priority === "High").length },
    { name: "Med", count: displayTasks.filter(t => t.priority === "Medium").length },
    { name: "Low", count: displayTasks.filter(t => t.priority === "Low").length },
  ];

  const COLORS = ["#22c55e", "#f97316", "#94a3b8"];

  return (
    <div className="dashboard-container fade-in">
      {/* 1. Metric Grid */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div className="stat-card-premium" key={i}>
            <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>{stat.icon}</div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <h2 className="stat-value">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-main-grid">
        {/* 2. Status Distribution (Pie) */}
        <div className="glass-card chart-section">
          <h3>Task Status Distribution</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {statusData.map((_, index) => <Cell key={index} fill={COLORS[index]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Priority Analytics (Bar) */}
        <div className="glass-card chart-section">
          <h3>Priority Overview</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={priorityData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                  {priorityData.map((entry, index) => (
                    <Cell key={index} fill={entry.name === "High" ? "#ef4444" : entry.name === "Med" ? "#f97316" : "#22c55e"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Efficiency Progress Bar */}
      <div className="glass-card" style={{ marginTop: '25px' }}>
        <h3>Overall Progress Percentage</h3>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${(statusData[0].value / displayTasks.length) * 100 || 0}%` }}></div>
        </div>
        <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#64748b' }}>
          {Math.round((statusData[0].value / displayTasks.length) * 100 || 0)}% of tracked tasks are completed.
        </p>
      </div>
    </div>
  );
}