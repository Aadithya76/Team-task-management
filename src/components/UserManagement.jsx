export default function UserManagement({ users }) {
  return (
    <div className="grid">
      {users.map(u => (
        <div className="card" key={u.id}>
          <h3>{u.name}</h3>
          <p>Role: {u.role}</p>
        </div>
      ))}
    </div>
  );
}
