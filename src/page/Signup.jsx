import { useState } from "react";
import { supabase } from "../supabaseClient";
import {Link, useNavigate} from "react-router-dom"

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    // ✅ Confirm Password Check (Frontend)
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    // ✅ Supabase Auth Sign Up
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    // ✅ Insert additional user data into your `users` table
    const userId = data.user?.id;
    if (userId) {
      await supabase.from("users").insert([
        {
          id: userId,
          name,
          email,
          role: "user", // or "admin" manually
        },
      ]);
    }

    alert("Signup successful! Please check your email to confirm.");
  };

  return (
    <form onSubmit={handleSignUp} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-full mb-3 p-2 border rounded"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full mb-3 p-2 border rounded"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full mb-3 p-2 border rounded"
        required
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="block w-full mb-3 p-2 border rounded"
        required
      />

      {errorMsg && (
        <p className="text-red-500 mb-2">{errorMsg}</p>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sign Up
      </button>
      <p>Already have Account? <Link className="text-blue-400" to="/signin">SignIn</Link></p>
    </form>
  );
}

export default Signup;
