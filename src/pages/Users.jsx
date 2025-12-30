export default function Users({ usersList }) {
  return (
    <div className="users-view">
      <div className="task-grid">
        {usersList.map((u, index) => (
          <div className="stat-card-premium" key={index} style={{ padding: '25px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                background: u.role === 'admin' ? '#eef2ff' : '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                👤
              </div>
              <div>
                <h3 style={{ margin: 0, textTransform: 'uppercase', fontSize: '1.1rem' }}>{u.username}</h3>
                <p style={{ margin: '4px 0', color: '#64748b', fontSize: '0.9rem' }}>{u.email}</p>
                <span className="badge" style={{ 
                  background: u.role === 'admin' ? '#e0e7ff' : '#f1f5f9',
                  color: u.role === 'admin' ? '#4338ca' : '#475569',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  {u.role.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}