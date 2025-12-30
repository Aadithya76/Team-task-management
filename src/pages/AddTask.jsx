import { useState } from "react";

export default function AddTask({ tasks, setTasks, setPage, currentUser }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (title.trim().length < 3) return alert("Title must be at least 3 characters.");
    if (!dueDate) return alert("Please set a deadline.");

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      desc: desc.trim(),
      priority, // Required by Functional Requirement 1
      dueDate,  // Required by UI Requirement 1
      status: "Not Started",
      user: currentUser
    };

    setTasks([newTask, ...tasks]);
    setPage("tasks");
  };

  return (
    <div className="glass-card" style={{ maxWidth: '600px', margin: '20px auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Assign New Task</h2>
      <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="input-group">
          <label>Task Title</label>
          <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea className="form-textarea" rows="3" value={desc} onChange={e => setDesc(e.target.value)} />
        </div>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem' }}>Priority</label>
            <select className="form-select" value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem' }}>Deadline</label>
            <input type="date" className="form-input" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
          </div>
        </div>
        
        <button type="submit" className="login-btn-main">Create & Assign Task</button>
      </form>
    </div>
  );
}