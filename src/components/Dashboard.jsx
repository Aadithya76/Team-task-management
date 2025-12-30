export default function Dashboard({ tasks }) {
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status === "pending").length;

  return (
    <div className="grid">
      <div className="card">
        <h3>Total Tasks</h3>
        <p>{tasks.length}</p>
      </div>

      <div className="card">
        <h3>Completed</h3>
        <p>{completed}</p>
      </div>

      <div className="card">
        <h3>Pending</h3>
        <p>{pending}</p>
      </div>
    </div>
  );
}
