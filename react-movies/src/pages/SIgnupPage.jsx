import { useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const SignupPage = () => {
  const { signup, user, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (user) return <Navigate to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, password);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Sign up</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Create account</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
