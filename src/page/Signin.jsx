// pages/SignInUser.jsx
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg("Invalid credentials");
      return;
    }

    const userId = data.user.id;

    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (userData.role === "user") {
      navigate("/user/home");
    } else {
      setErrorMsg("Access denied: Not a user.");
    }
  };

  return (
    <form onSubmit={handleSignIn} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">User Sign In</h2>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <input type="email" required placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} className="block w-full mb-3 p-2 border rounded" />
      <input type="password" required placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} className="block w-full mb-3 p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login as User</button>
    </form>
  );
}

export default Signin;
