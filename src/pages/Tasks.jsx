import { useState } from "react";

export default function Tasks({ tasks, setTasks, isAdmin, currentUser }) {
  const [searchTerm, setSearchTerm] = useState("");

  const updateStatus = (id, newStatus) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  const deleteTask = (id) => {
    if (window.confirm("Delete this task?")) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const filteredTasks = tasks.filter(t => {
    const isVisible = isAdmin || t.user === currentUser;
    return isVisible && t.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="tasks-view">
      <div className="filter-container" style={{ marginBottom: '30px' }}>
        <input 
          className="form-input"
          placeholder="Search by task title..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '15px', borderRadius: '15px' }}
        />
      </div>

      <div className="task-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredTasks.map(task => {
          const canManage = isAdmin || task.user === currentUser;
          const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "completed";

          return (
            <div className={`task-card ${task.status?.toLowerCase().replace(" ", "-")}`} key={task.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                <h3 style={{ margin: 0 }}>{task.title}</h3>
                <span className={`priority-tag ${task.priority?.toLowerCase()}`}>
                  {task.priority}
                </span>
              </div>
              
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '15px' }}>{task.desc}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '0.85rem' }}>
                <span>👤 {task.user}</span>
                <span style={{ color: isOverdue ? '#ef4444' : '#64748b', fontWeight: isOverdue ? 'bold' : 'normal' }}>
                  📅 {task.dueDate} {isOverdue && "(OVERDUE)"}
                </span>
              </div>

              <div className="task-footer" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={`badge ${task.status?.toLowerCase().replace(" ", "-")}`}>{task.status}</span>
                  {canManage && (
                    <div className="actions" style={{ display: 'flex', gap: '8px' }}>
                      <button className="icon-btn" onClick={() => updateStatus(task.id, "Not Started")}>⏳</button>
                      <button className="icon-btn" onClick={() => updateStatus(task.id, "pending")}>🟠</button>
                      <button className="icon-btn" onClick={() => updateStatus(task.id, "completed")}>✅</button>
                      <button className="icon-btn delete-btn" onClick={() => deleteTask(task.id)}>🗑️</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}