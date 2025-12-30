import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter your name");
    
    // Call login and only clear form if successful
    const success = login(name, role, password);
    if (!success) setPassword(""); 
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-visual">
          <div className="visual-content">
            <h1>TaskPro</h1>
            <p>Master your workflow with our minimalist management suite.</p>
          </div>
        </div>

        <div className="login-form-side">
          <form className="login-box" onSubmit={handleSubmit}>
            <h2>Welcome Back</h2>
            <p className="subtitle">Please enter your details to sign in</p>

            <div className="input-group">
              <label>Username</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={e => setName(e.target.value)} 
                required
              />
            </div>

            <div className="input-group">
              <label>Role</label>
              <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="user">Standard User</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            {/* Conditional Password Field for Admin */}
            {role === "admin" && (
              <div className="input-group fade-in">
                <label>Admin Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={e => setPassword(e.target.value)} 
                  required
                />
              </div>
            )}

            <button type="submit" className="login-btn-main">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}