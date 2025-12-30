import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) return <h2>Unauthorized</h2>;
  if (role && user.role !== role) return <h2>Access Denied</h2>;

  return children;
}
