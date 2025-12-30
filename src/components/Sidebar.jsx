export default function Sidebar({ setPage }) {
  return (
    <div className="sidebar">
      <h2>Task Admin</h2>
      <button onClick={() => setPage("dashboard")}>Dashboard</button>
      <button onClick={() => setPage("tasks")}>Tasks</button>
      <button onClick={() => setPage("add")}>Add Task</button>
      <button onClick={() => setPage("users")}>Users</button>
    </div>
  );
}
