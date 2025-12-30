export default function TaskList({ tasks, updateStatus }) {
  return (
    <div className="grid">
      {tasks.map(task => (
        <div className="card" key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.desc}</p>
          <small>Assigned to: {task.user}</small>

          <div className="actions">
            <button onClick={()=>updateStatus(task.id,"pending")}>Pending</button>
            <button onClick={()=>updateStatus(task.id,"completed")}>Completed</button>
          </div>
        </div>
      ))}
    </div>
  );
}
