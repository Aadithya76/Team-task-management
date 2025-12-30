import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import Users from "./pages/Users";
import { useAuth } from "./auth/AuthContext";
import "./App.css";

export default function App() {
  const { user, logout } = useAuth();
  const [page, setPage] = useState("dashboard");

  // Track the list of users who have logged in
  const [allUsers, setAllUsers] = useState(() => {
    const savedUsers = localStorage.getItem("app_users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Capture new users upon login
  useEffect(() => {
    if (user) {
      setAllUsers(prev => {
        const exists = prev.find(u => u.username === user.username);
        if (!exists) {
          const updated = [...prev, { 
            username: user.username, 
            role: user.role, 
            email: `${user.username.toLowerCase().replace(/\s+/g, '')}@taskpro.com` 
          }];
          localStorage.setItem("app_users", JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  if (!user) return <Login />;

  const isAdmin = user.role === 'admin';

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>TaskPro</h2>
        <div className="nav-menu">
          {/* Navigation Guard: Users item is only mapped if isAdmin is true */}
          {['dashboard', 'tasks', 'add', 'users'].map((item) => {
            if (item === 'users' && !isAdmin) return null;
            
            const icons = { dashboard: '📊', tasks: '📋', add: '➕', users: '👥' };
            return (
              <button key={item} className={page === item ? "active" : "nav-item"} onClick={() => setPage(item)}>
                <span className="nav-icon">{icons[item]}</span>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            );
          })}
        </div>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>

      <main className="main-content">
        <header className="content-header">
          <h1>{page.charAt(0).toUpperCase() + page.slice(1)}</h1>
          <p>Welcome, <strong>{user.username}</strong></p>
        </header>
        
        <section className="page-view fade-in">
          {page === "dashboard" && <Dashboard tasks={tasks} setTasks={setTasks} isAdmin={isAdmin} currentUser={user.username} />}
          {page === "tasks" && <Tasks tasks={tasks} setTasks={setTasks} isAdmin={isAdmin} currentUser={user.username} />}
          {page === "add" && <AddTask tasks={tasks} setTasks={setTasks} setPage={setPage} currentUser={user.username} />}
          
          {/* Strict Rendering Guard: Standard users can NEVER render the Users component */}
          {page === "users" && (
            isAdmin ? <Users usersList={allUsers} /> : <div className="glass-card">⚠️ Access Denied: Admin only.</div>
          )}
        </section>
      </main>
    </div>
  );
}