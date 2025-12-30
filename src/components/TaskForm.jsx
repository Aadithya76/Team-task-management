import { useState } from "react";

export default function TaskForm({ addTask, users }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [user, setUser] = useState(users[0].name);

  const submit = () => {
    if (!title) return;
    addTask({
      id: Date.now(),
      title,
      desc,
      user,
      status: "pending"
    });
  };

  return (
    <div className="card form">
      <input placeholder="Task title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea placeholder="Task description" value={desc} onChange={e=>setDesc(e.target.value)} />
      <select value={user} onChange={e=>setUser(e.target.value)}>
        {users.map(u => <option key={u.id}>{u.name}</option>)}
      </select>
      <button onClick={submit}>Add Task</button>
    </div>
  );
}
