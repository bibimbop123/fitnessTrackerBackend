import { useState } from "react";
import { registerUser, loginUser } from "../../API/usersAuth";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AuthForm() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let result;
      if (pathname === "/api/users/register") {
        result = await registerUser(username, password);
      } else if (pathname === "/api/users/login") {
        result = await loginUser(username, password);
        alert("you're logged in");
      }
      console.log("Result after login or register: ", result);
      if (result.success) {
        setLoggedIn(true);
        alert("you're registered!");
        console.log("Auth Results", result);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <form onSubmit={handleSubmit}>
          <h2>{pathname === "/register" ? "Register" : "Login"}</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            required
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <p>
          {pathname === "/register"
            ? "Already have an account? "
            : "Don't have an account? "}
          <Link to={pathname === "/register" ? "/register" : "/login"}>
            {pathname === "/login" ? "Sign Up" : "Login Here"}
          </Link>
        </p>
      </div>
    </div>
  );
}
